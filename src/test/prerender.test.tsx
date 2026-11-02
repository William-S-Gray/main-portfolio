import { act } from "react";
import { hydrateRoot } from "react-dom/client";
import { BrowserRouter, matchRoutes } from "react-router-dom";
import App from "@/App";
import { routes } from "@/routes";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

// jsdom has no IntersectionObserver (Framer Motion's whileInView needs one).
globalThis.IntersectionObserver ??= class {
  observe() {}
  unobserve() {}
  disconnect() {}
} as unknown as typeof IntersectionObserver;

const URLS = ["/", "/projects", "/projects/classroot", "/about", "/blog", "/resume"];
let html: Record<string, string> = {};
// Render with the same SSR build the real prerender uses, in its own process: in-process (or via
// vite-node) the server render gets a different copy of React Router than the code under test.
beforeAll(() => {
  const out = path.resolve("node_modules/.cache/prerender-test"); // inside the project, so externals resolve
  execFileSync("node_modules/.bin/vite", ["build", "--ssr", "src/entry-server.tsx", "--outDir", out, "--logLevel", "error"]);
  const script = `const { render } = await import(${JSON.stringify(path.join(out, "entry-server.js"))});
    const out = {}; for (const u of ${JSON.stringify(URLS)}) out[u] = await render(u); process.stdout.write(JSON.stringify(out));`;
  html = JSON.parse(execFileSync(process.execPath, ["--input-type=module", "-e", script], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }));
  fs.rmSync(out, { recursive: true, force: true });
}, 60_000);

// Hydrates a route's prerendered HTML the way main.tsx does; returns the root and any hydration errors.
async function hydrate(url: string) {
  window.history.pushState({}, "", url);
  const root = document.createElement("div");
  root.innerHTML = html[url];
  document.body.replaceChildren(root);
  await matchRoutes(routes, url)?.[0]?.route.Page.preload?.();

  const errors: string[] = [];
  const spy = vi.spyOn(console, "error").mockImplementation((...a) => {
    const msg = a.map(String).join(" ");
    if (!/not configured to support act|fetchPriority/.test(msg)) errors.push(msg);
  });
  let unmount = () => {};
  await act(async () => {
    const r = hydrateRoot(
      root,
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}><App /></BrowserRouter>,
      { onRecoverableError: (e) => errors.push(String(e)) }
    );
    unmount = () => r.unmount();
    await new Promise((r) => setTimeout(r, 300));
  });
  spy.mockRestore();
  return { root, errors, unmount };
}

// The prerendered HTML must hydrate cleanly, or React throws it away and re-renders the page.
it.each(URLS)("%s prerenders and hydrates cleanly", async (url) => {
  const { root, errors, unmount } = await hydrate(url);
  expect(root.textContent!.length).toBeGreaterThan(200);
  expect(errors).toEqual([]);
  act(unmount);
});

it("navigates to a not-yet-loaded lazy page after hydration", async () => {
  const { root, unmount } = await hydrate("/");
  await act(async () => {
    root.querySelector<HTMLAnchorElement>('a[href="/certificates"]')!.click();
    await new Promise((r) => setTimeout(r, 300));
  });
  expect(window.location.pathname).toBe("/certificates");
  // The navigation is a transition: the old page stays up until the chunk arrives.
  await vi.waitFor(() => expect(root.querySelector("h1")?.textContent).toMatch(/certif/i), { timeout: 5000 });
  act(unmount);
});

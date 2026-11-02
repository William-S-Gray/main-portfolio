// Fills each route's dist/**/index.html (written by the staticFeeds plugin) with its
// server-rendered markup, so crawlers and AI tools that don't run JavaScript see the page.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const dist = path.resolve("dist");
const { render } = await import(pathToFileURL(path.resolve("dist-ssr/entry-server.js")).href);

const pages = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return pages(p);
    return e.name === "index.html" ? [p] : [];
  });

let count = 0;
for (const file of pages(dist)) {
  const url = "/" + path.relative(dist, path.dirname(file)).split(path.sep).join("/");
  const html = fs.readFileSync(file, "utf8");
  if (!html.includes('<div id="root"></div>')) throw new Error(`${file}: no empty #root to fill`);
  fs.writeFileSync(file, html.replace('<div id="root"></div>', `<div id="root">${await render(url)}</div>`));
  count++;
}
fs.rmSync("dist-ssr", { recursive: true, force: true });
console.log(`prerendered ${count} pages`);

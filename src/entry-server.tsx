import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Writable } from "node:stream";
import App from "./App";

/** Renders a route to HTML once every lazy page has loaded. Used by scripts/prerender.mjs. */
export function render(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let html = "";
    const sink = new Writable({
      write(chunk, _enc, done) {
        html += chunk;
        done();
      },
      final(done) {
        resolve(html);
        done();
      },
    });
    const stream = renderToPipeableStream(
      <StaticRouter location={url} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <App />
      </StaticRouter>,
      { onAllReady: () => stream.pipe(sink), onShellError: reject, onError: reject }
    );
  });
}

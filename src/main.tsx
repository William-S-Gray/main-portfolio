import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter, matchRoutes } from "react-router-dom";
import App from "./App.tsx";
import { routes } from "./routes";
import "./index.css";

const root = document.getElementById("root")!;
const app = (
  <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
    <App />
  </BrowserRouter>
);

// Load this route's page first: nothing may suspend outside a transition (App has no Suspense boundary).
// Pages are prerendered at build time (scripts/prerender.mjs); 404.html is not.
const page = matchRoutes(routes, window.location)?.[0]?.route.Page;
Promise.resolve(page?.preload?.()).then(() => {
  if (root.hasChildNodes()) hydrateRoot(root, app);
  else createRoot(root).render(app);
});

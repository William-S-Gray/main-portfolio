import { lazy, type ComponentType } from "react";

/**
 * React.lazy that renders synchronously once `preload()` has resolved. main.tsx preloads the
 * current route's page before hydrating, so no Suspense boundary is still pending during
 * hydration (an update reaching one makes React discard the prerendered HTML).
 */
export function lazyPage(load: () => Promise<{ default: ComponentType }>) {
  let Loaded: ComponentType | undefined;
  const preload = () => load().then((m) => (Loaded = m.default));
  const Lazy = lazy(() => preload().then((C) => ({ default: C })));
  const Page = () => (Loaded ? <Loaded /> : <Lazy />);
  Page.preload = preload;
  return Page;
}

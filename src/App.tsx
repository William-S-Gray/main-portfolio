import { Toaster as Sonner } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import Layout from "./components/Layout";
import { routes } from "./routes";

/** The router is supplied by the caller: BrowserRouter in main.tsx, StaticRouter in entry-server.tsx. */
const App = () => (
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
    <Sonner />
    <Analytics />
    <SpeedInsights />
    <Layout>
      {/* No Suspense boundary: one still hydrating when next-themes updates its context makes React
          discard the prerendered HTML. main.tsx loads the first page before rendering, and later
          navigations are transitions (v7_startTransition), which keep the old page up while a chunk loads. */}
      <Routes>
        {routes.map(({ path, Page }) => (
          <Route key={path} path={path} element={<Page />} />
        ))}
      </Routes>
    </Layout>
  </ThemeProvider>
);

export default App;

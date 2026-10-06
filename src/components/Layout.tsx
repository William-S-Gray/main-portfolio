import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CommandPalette from "./CommandPalette";
import AskAI from "./AskAI";

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen flex flex-col">
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-clay focus:bg-primary focus:text-primary-foreground focus:font-semibold"
    >
      Skip to content
    </a>
    <Navbar />
    <main id="main" className="flex-1 pt-24 print:pt-0">{children}</main>
    <Footer />
    <CommandPalette />
    <AskAI />
  </div>
);

export default Layout;

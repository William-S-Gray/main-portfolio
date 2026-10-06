import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CommandPalette from "./CommandPalette";
import AskAI from "./AskAI";
import BackToTop from "./BackToTop";

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen flex flex-col">
    <a
      href="#main"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-clay focus:bg-primary focus:text-primary-foreground focus:font-semibold"
    >
      Skip to content
    </a>
    <Navbar />
    <main id="main" tabIndex={-1} className="flex-1 pt-24 print:pt-0 outline-none">{children}</main>
    <Footer />
    <CommandPalette />
    <AskAI />
    <BackToTop />
  </div>
);

export default Layout;

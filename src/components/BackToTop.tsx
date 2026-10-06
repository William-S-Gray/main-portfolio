import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/** Floating "back to top" button, shown after scrolling past the first screen. */
const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    document.getElementById("main")?.focus({ preventScroll: true });
  };

  return (
    <button
      onClick={toTop}
      aria-label="Back to top"
      title="Back to top"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`print:hidden fixed bottom-5 left-5 z-[140] flex h-11 w-11 items-center justify-center rounded-clay clay-sm bg-background text-primary transition-all duration-300 hover:-translate-y-0.5 ${
        visible ? "opacity-100" : "pointer-events-none opacity-0 translate-y-3"
      }`}
    >
      <ArrowUp size={20} />
    </button>
  );
};

export default BackToTop;

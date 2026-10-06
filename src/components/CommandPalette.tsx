import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Home,
  User,
  Wrench,
  FolderGit2,
  Award,
  Newspaper,
  Mail,
  FileText,
  Copy,
  Sun,
  Moon,
  Github,
  Linkedin,
  CornerDownLeft,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { toast } from "sonner";
import { projects } from "@/data/projects";
import { categoryLabel } from "@/lib/categories";

const EMAIL = "graywilliamwiltino@gmail.com";

type CommandItem = {
  id: string;
  label: string;
  hint?: string;
  group: "Pages" | "Projects" | "Actions";
  icon: React.ReactNode;
  keywords?: string;
  run: () => void;
};

/**
 * Global ⌘K / Ctrl-K command palette: fuzzy nav + quick actions.
 * Mounted once in Layout so it is available on every route.
 */
const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
  }, []);

  const go = useCallback(
    (to: string) => {
      navigate(to);
      close();
    },
    [navigate, close]
  );

  const commands = useMemo<CommandItem[]>(() => {
    const pages: CommandItem[] = [
      { id: "home", label: "Home", group: "Pages", icon: <Home size={16} />, run: () => go("/") },
      { id: "about", label: "About", group: "Pages", icon: <User size={16} />, run: () => go("/about") },
      { id: "services", label: "Services", group: "Pages", icon: <Wrench size={16} />, run: () => go("/services") },
      { id: "projects", label: "Projects", group: "Pages", icon: <FolderGit2 size={16} />, run: () => go("/projects") },
      { id: "certificates", label: "Certificates", group: "Pages", icon: <Award size={16} />, run: () => go("/certificates") },
      { id: "blog", label: "Blog", group: "Pages", icon: <Newspaper size={16} />, run: () => go("/blog") },
      { id: "contact", label: "Contact", group: "Pages", icon: <Mail size={16} />, run: () => go("/contact") },
      { id: "resume", label: "Résumé", group: "Pages", icon: <FileText size={16} />, keywords: "resume cv curriculum vitae pdf experience", run: () => go("/resume") },
    ];

    const projectItems: CommandItem[] = projects.map((p) => ({
      id: `project-${p.id}`,
      label: p.title,
      hint: categoryLabel(p.category),
      group: "Projects",
      icon: <FolderGit2 size={16} />,
      keywords: `${p.description} ${p.techStack.join(" ")} ${p.category}`,
      run: () => go(`/projects/${p.id}`),
    }));

    const actions: CommandItem[] = [
      {
        id: "copy-email",
        label: "Copy email address",
        hint: EMAIL,
        group: "Actions",
        icon: <Copy size={16} />,
        keywords: "mail contact gmail",
        run: () => {
          navigator.clipboard?.writeText(EMAIL).then(
            () => toast.success("Email copied to clipboard"),
            () => toast.error("Couldn't copy — " + EMAIL)
          );
          close();
        },
      },
      {
        id: "toggle-theme",
        label: theme === "dark" ? "Switch to light theme" : "Switch to dark theme",
        group: "Actions",
        icon: theme === "dark" ? <Sun size={16} /> : <Moon size={16} />,
        keywords: "dark light mode appearance",
        run: () => {
          setTheme(theme === "dark" ? "light" : "dark");
          close();
        },
      },
      {
        id: "github",
        label: "Open GitHub",
        group: "Actions",
        icon: <Github size={16} />,
        keywords: "code repos source",
        run: () => {
          window.open("https://github.com/William-S-Gray", "_blank", "noopener,noreferrer");
          close();
        },
      },
      {
        id: "linkedin",
        label: "Open LinkedIn",
        group: "Actions",
        icon: <Linkedin size={16} />,
        keywords: "profile network",
        run: () => {
          window.open(
            "https://www.linkedin.com/in/william-wiltino-gray-577254253/",
            "_blank",
            "noopener,noreferrer"
          );
          close();
        },
      },
    ];

    return [...pages, ...projectItems, ...actions];
  }, [go, theme, setTheme, close]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) =>
      `${c.label} ${c.hint ?? ""} ${c.keywords ?? ""} ${c.group}`.toLowerCase().includes(q)
    );
  }, [commands, query]);

  // Global open shortcut (⌘K / Ctrl-K) + "/" when nothing is focused.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const openEvent = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", openEvent);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", openEvent);
    };
  }, []);

  // Focus the input when opened.
  useEffect(() => {
    if (open) {
      setActive(0);
      // Delay so the element is mounted before focusing.
      const t = setTimeout(() => inputRef.current?.focus(), 20);
      return () => clearTimeout(t);
    }
  }, [open]);

  // Keep active index in range as the list shrinks.
  useEffect(() => {
    setActive((a) => Math.min(a, Math.max(0, filtered.length - 1)));
  }, [filtered.length]);

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[active]?.run();
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    }
  };

  // Scroll the active row into view.
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-idx="${active}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [active]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          onMouseDown={close}
          role="presentation"
        >
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="clay-lg relative w-full max-w-lg overflow-hidden bg-background"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            onMouseDown={(e) => e.stopPropagation()}
            onKeyDown={onListKey}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 border-b border-border/60 px-4 py-3">
              <Search size={18} className="text-muted-foreground flex-shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search pages, projects, actions…"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                aria-label="Search commands"
                autoComplete="off"
                spellCheck={false}
              />
              <kbd className="hidden sm:inline text-[10px] font-medium text-muted-foreground border border-border rounded px-1.5 py-0.5">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div ref={listRef} className="max-h-[52vh] overflow-y-auto py-2">
              {filtered.length === 0 ? (
                <p className="px-4 py-6 text-center text-sm text-muted-foreground">
                  No matches for “{query}”.
                </p>
              ) : (
                (["Pages", "Projects", "Actions"] as const).map((group) => {
                  const rows = filtered.filter((c) => c.group === group);
                  if (rows.length === 0) return null;
                  return (
                    <div key={group} className="mb-1">
                      <p className="px-4 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                        {group}
                      </p>
                      {rows.map((c) => {
                        const idx = filtered.indexOf(c);
                        const isActive = idx === active;
                        return (
                          <button
                            key={c.id}
                            data-idx={idx}
                            onMouseEnter={() => setActive(idx)}
                            onClick={c.run}
                            className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
                              isActive ? "bg-primary/10 text-foreground" : "text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            <span className={isActive ? "text-primary" : "text-muted-foreground"}>{c.icon}</span>
                            <span className="flex-1 font-medium">{c.label}</span>
                            {c.hint && (
                              <span className="text-xs text-muted-foreground/70">{c.hint}</span>
                            )}
                            {isActive && <CornerDownLeft size={14} className="text-muted-foreground" />}
                          </button>
                        );
                      })}
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer hint */}
            <div className="flex items-center gap-4 border-t border-border/60 px-4 py-2 text-[11px] text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <ArrowUp size={11} />
                <ArrowDown size={11} /> navigate
              </span>
              <span className="inline-flex items-center gap-1">
                <CornerDownLeft size={11} /> open
              </span>
              <span className="ml-auto hidden sm:inline">
                <kbd className="border border-border rounded px-1 py-0.5">⌘</kbd>
                <kbd className="border border-border rounded px-1 py-0.5 ml-0.5">K</kbd> anywhere
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default CommandPalette;

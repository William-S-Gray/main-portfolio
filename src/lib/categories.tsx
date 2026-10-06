import {
  Stethoscope,
  LayoutDashboard,
  ShoppingBag,
  Music,
  Bot,
  ShoppingCart,
  ShieldCheck,
  Siren,
} from "lucide-react";

// Category badge icons + gradients shared by project cards and case studies.
export const categoryIcons: Record<string, React.ReactNode> = {
  healthcare: <Stethoscope size={22} />,
  management: <LayoutDashboard size={22} />,
  marketplace: <ShoppingBag size={22} />,
  entertainment: <Music size={22} />,
  ai: <Bot size={22} />,
  retail: <ShoppingCart size={22} />,
  security: <ShieldCheck size={22} />,
  emergency: <Siren size={22} />,
};

export const categoryColors: Record<string, string> = {
  healthcare: "from-emerald-500 to-teal-600",
  management: "from-blue-500 to-indigo-600",
  marketplace: "from-orange-400 to-amber-500",
  entertainment: "from-purple-500 to-pink-500",
  ai: "from-cyan-500 to-sky-600",
  retail: "from-green-500 to-emerald-600",
  security: "from-orange-500 to-red-600",
  emergency: "from-red-500 to-rose-600",
};

export const statusBadge = {
  "in-development": {
    label: "In development",
    detail: "In development — not yet deployed",
    className: "bg-amber-500/15 text-amber-800 dark:text-amber-300",
  },
  concept: {
    label: "Concept",
    detail: "Concept build — not a production deployment",
    className: "bg-muted text-muted-foreground",
  },
} as const;

/** Display name for a category id ("ai" → "AI", "healthcare" → "Healthcare"). */
export const categoryLabel = (c: string) => (c === "ai" ? "AI" : c.charAt(0).toUpperCase() + c.slice(1));

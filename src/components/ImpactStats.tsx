import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Boxes, Layers, Award, Users } from "lucide-react";
import { projects } from "@/data/projects";
import { certificates } from "@/data/certificates";

// Concept builds are excluded: these numbers should hold up to a recruiter checking them.
const built = projects.filter((p) => p.status !== "concept");
const industries = new Set(built.map((p) => p.category)).size;

interface Stat {
  value: number;
  suffix?: string;
  label: string;
  sub?: string;
  icon: React.ReactNode;
}

const stats: Stat[] = [
  { value: built.length, label: "Systems built", sub: "with case studies", icon: <Boxes size={22} /> },
  { value: industries, label: "Industries", sub: "healthcare, edtech, retail & more", icon: <Layers size={22} /> },
  { value: certificates.length, suffix: "+", label: "Certifications", icon: <Award size={22} /> },
  { value: 100, suffix: "+", label: "Developers led", sub: "as GDSC President", icon: <Users size={22} /> },
];

/** Counts from `from`→`to` once, easing out. Respects reduced-motion. */
const useCountUp = (to: number, run: boolean, duration = 1200) => {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setN(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setN(Math.round(eased * to));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, run, duration]);
  return n;
};

const StatCard = ({ stat, run, delay }: { stat: Stat; run: boolean; delay: number }) => {
  const n = useCountUp(stat.value, run);
  return (
    <motion.div
      className="clay-sm flex flex-col items-center gap-1.5 px-4 py-6 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={run ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      <span className="text-primary mb-1">{stat.icon}</span>
      <span className="text-3xl sm:text-4xl font-extrabold tabular-nums">
        {n}
        {stat.suffix}
      </span>
      <span className="text-sm font-semibold">{stat.label}</span>
      {stat.sub && <span className="text-[11px] text-muted-foreground">{stat.sub}</span>}
    </motion.div>
  );
};

/** Homepage band of animated, data-derived impact numbers. */
const ImpactStats = () => {
  const ref = useRef<HTMLElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRun(true);
          obs.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} aria-label="Impact by the numbers" className="px-4 py-16">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <StatCard key={s.label} stat={s} run={run} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Send, ArrowRight } from "lucide-react";
import { answerQuestion, suggestedQuestions, type AssistantReply } from "@/data/assistant";

interface Message {
  id: number;
  role: "user" | "assistant";
  text: string;
  cta?: AssistantReply["cta"];
}

const GREETING: Message = {
  id: 0,
  role: "assistant",
  text:
    "👋 Hi! I'm William's AI assistant. Ask me about his background, projects, skills, AI work, or how to get in touch.",
};

/**
 * "Ask William's AI" — a floating chat widget answering questions about
 * William from a local knowledge base (no network / LLM call). Offline,
 * instant, and free. See src/data/assistant.ts for the knowledge + matcher.
 */
const AskAI = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(1);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  const send = (raw: string) => {
    const text = raw.trim();
    if (!text || typing) return;
    const userMsg: Message = { id: nextId.current++, role: "user", text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);

    // Small delay so it reads like a considered reply, not an instant lookup.
    const reply = answerQuestion(text);
    window.setTimeout(() => {
      setMessages((m) => [
        ...m,
        { id: nextId.current++, role: "assistant", text: reply.answer, cta: reply.cta },
      ]);
      setTyping(false);
    }, 450);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    send(input);
  };

  const showStarters = messages.length <= 1;

  return (
    <>
      {/* Launcher */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close AI assistant" : "Ask my AI"}
        className="fixed bottom-5 right-5 z-[150] inline-flex items-center gap-2 rounded-clay bg-primary text-primary-foreground px-4 py-3 font-semibold text-sm shadow-lg clay-hover"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, type: "spring", bounce: 0.4 }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
      >
        {open ? <X size={18} /> : <Sparkles size={18} />}
        <span className="hidden sm:inline">{open ? "Close" : "Ask my AI"}</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Ask William's AI"
            className="fixed bottom-20 right-5 z-[150] flex w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-clay-lg bg-background clay-lg"
            style={{ height: "min(560px, calc(100vh - 7rem))" }}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-border/60 px-4 py-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-clay bg-primary/15 text-primary">
                <Sparkles size={18} />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-bold">Ask William's AI</p>
                <p className="text-[11px] text-muted-foreground">Instant answers about William</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="ml-auto p-1.5 rounded-clay text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} role="log" aria-live="polite" className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m) => (
                <div key={m.id} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                  <div
                    className={`max-w-[85%] rounded-clay px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "clay-sm text-foreground"
                    }`}
                  >
                    <p>{m.text}</p>
                    {m.cta &&
                      (m.cta.external ? (
                        <a
                          href={m.cta.to}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                        >
                          {m.cta.label} <ArrowRight size={13} />
                        </a>
                      ) : (
                        <Link
                          to={m.cta.to}
                          onClick={() => setOpen(false)}
                          className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                        >
                          {m.cta.label} <ArrowRight size={13} />
                        </Link>
                      ))}
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex justify-start">
                  <div className="clay-sm rounded-clay px-4 py-3">
                    <span className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="h-1.5 w-1.5 rounded-full bg-muted-foreground"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                        />
                      ))}
                    </span>
                  </div>
                </div>
              )}

              {/* Starter questions */}
              {showStarters && (
                <div className="space-y-1.5 pt-1">
                  {suggestedQuestions.map((q) => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      className="block w-full rounded-clay clay-sm px-3 py-2 text-left text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={onSubmit} className="border-t border-border/60 p-3">
              <div className="flex items-center gap-2 rounded-clay clay-sm px-3 py-1.5">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about William…"
                  aria-label="Ask a question about William"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  autoComplete="off"
                  maxLength={600}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || typing}
                  aria-label="Send"
                  className="flex-shrink-0 text-primary disabled:text-muted-foreground/40 transition-colors"
                >
                  <Send size={17} />
                </button>
              </div>
              <p className="mt-1.5 text-center text-[10px] text-muted-foreground/70">
                Runs locally on this site — no data leaves your browser.
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AskAI;

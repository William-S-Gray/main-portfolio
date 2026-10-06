import { describe, expect, it } from "vitest";
import { answerQuestion } from "@/data/assistant";

describe("offline assistant routing", () => {
  it.each([
    ["Is William available?", "Get in touch"],
    ["Does he do freelance or contract work?", "Get in touch"],
    ["Is he open to full-time roles?", "Get in touch"],
    ["What projects has he built?", "Browse projects"],
    ["Where is he based?", "About"],
    ["What time zone is he in?", "About"],
    ["How do I contact him?", "Contact page"],
    ["What certifications does he have?", "View certificates"],
    ["What work experience does he have?", "Open résumé"],
    ["Did he intern anywhere?", "Open résumé"],
    ["Can I see his CV?", "Open résumé"],
    ["Was he a GDSC lead?", "More on leadership"],
    ["Does he do AI work?", "See AI projects"],
    ["Does he work with AI?", "See AI projects"],
    ["Has he done any machine learning?", "See AI projects"],
    ["Tell me about PathoGuide", "PathoGuide case study"],
    ["What is ClaimGuard?", "ClaimGuard 360° case study"],
    ["tell me about the sacred heart system", "Sacred Heart School Management System case study"],
    ["Is Zoe campus live?", "4Life Zoe Digital Campus case study"],
    ["What is his strongest project?", "Browse projects"],
  ])("%s → %s", (q, cta) => {
    expect(answerQuestion(q).cta?.label).toBe(cta);
  });
});

describe("offline assistant honesty", () => {
  it("counts and lists only built projects, not concepts", () => {
    const a = answerQuestion("What projects has he built?").answer;
    expect(a).not.toMatch(/EchoStream|MediFlow|AgriConnect|MediTriage/);
    expect(answerQuestion("What tech does he use?").answer).not.toMatch(/Stripe|Twilio|Supabase|OpenAI/);
  });

  it("flags concept projects when asked about one", () => {
    expect(answerQuestion("what's echostream").answer).toContain("early concept build");
  });
});

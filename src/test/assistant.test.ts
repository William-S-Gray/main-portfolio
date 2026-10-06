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
  ])("%s → %s", (q, cta) => {
    expect(answerQuestion(q).cta?.label).toBe(cta);
  });
});

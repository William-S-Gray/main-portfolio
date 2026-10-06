import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { projects } from "@/data/projects";

// ProjectCard's srcSet expects an 800px variant (-sm) next to every project screenshot.
describe("project images", () => {
  it.each(projects.filter((p) => p.image).map((p) => [p.id, p.image!]))("%s has full and small versions", (_, image) => {
    expect(image).toMatch(/\.webp$/);
    expect(existsSync(resolve("public" + image))).toBe(true);
    expect(existsSync(resolve("public" + image.replace(/\.webp$/, "-sm.webp")))).toBe(true);
  });
});

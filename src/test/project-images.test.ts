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

describe("walkthrough videos", () => {
  it.each(projects.filter((p) => p.video).map((p) => [p.id, p.video!]))("%s has an MP4 and a poster", (_, video) => {
    expect(video).toMatch(/^\/projects\/walkthroughs\/.+\.mp4$/);
    expect(existsSync(resolve("public" + video))).toBe(true);
    expect(existsSync(resolve("public" + video.replace(/\.mp4$/, ".jpg")))).toBe(true);
  });
});

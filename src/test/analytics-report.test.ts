import { afterEach, describe, expect, it } from "vitest";
import { GET, buildReport } from "../../api/analytics-report";

const base = {
  since: new Date("2026-10-05T07:00:00Z"),
  until: new Date("2026-10-12T07:00:00Z"),
  week: { visitors: 120, pageviews: 300 },
  previous: { visitors: 100, pageviews: 300 },
  pages: [{ requestPath: "/", pageviews: 150 }, { requestPath: "/resume", count: 40 }],
  countries: null,
};

describe("weekly analytics email", () => {
  it("summarises the week with changes and breakdowns", () => {
    const { subject, message } = buildReport(base);
    expect(subject).toBe("williamgray.dev weekly: 120 visitors, 300 page views");
    expect(message).toContain("Visitors:   120  (+20% vs previous week)");
    expect(message).toContain("Page views: 300  (+0% vs previous week)");
    expect(message).toContain("1. / — 150 views");
    expect(message).toContain("2. /resume — 40 views");
    expect(message).toContain("Top countries:\n  (unavailable this week)");
  });

  it("handles a first week with no previous data", () => {
    const { message } = buildReport({ ...base, previous: { visitors: 0, pageviews: 0 }, pages: [] });
    expect(message).toContain("(new vs previous week)");
    expect(message).toContain("Top pages:\n  (no data)");
  });
});

describe("cron endpoint", () => {
  afterEach(() => {
    delete process.env.CRON_SECRET;
  });

  it("rejects calls without the cron secret", async () => {
    process.env.CRON_SECRET = "s3cret";
    const res = await GET(new Request("http://x/api/analytics-report", { headers: { authorization: "Bearer wrong" } }));
    expect(res.status).toBe(401);
  });

  it("rejects everything when no secret is configured", async () => {
    const res = await GET(new Request("http://x/api/analytics-report"));
    expect(res.status).toBe(401);
  });
});

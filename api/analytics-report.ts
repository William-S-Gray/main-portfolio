/**
 * GET /api/analytics-report — weekly Web Analytics email, run by Vercel Cron
 * (see "crons" in vercel.json). Pulls last week's numbers from the Vercel Web
 * Analytics API and emails them through EmailJS using the contact-form
 * template, which already delivers to William's inbox.
 *
 * Env (Vercel project settings): CRON_SECRET, VERCEL_TOKEN, EMAILJS_PRIVATE_KEY.
 * VERCEL_PROJECT_ID is provided by Vercel automatically.
 */

const TEAM_ID = "team_WpvON2vh5JDg6hgKeOTh9of2";
const EMAILJS = { service: "service_os2g7yx", template: "template_f2gatm5", publicKey: "v3g-7vFdAFIegC_Hz" };
const DAY = 24 * 60 * 60 * 1000;

type Count = { pageviews: number; visitors: number };
type Row = Record<string, unknown>;

export interface ReportData {
  since: Date;
  until: Date;
  week: Count;
  previous: Count;
  pages: Row[] | null;
  countries: Row[] | null;
}

const change = (now: number, before: number) =>
  before === 0 ? (now === 0 ? "no change" : "new") : `${now >= before ? "+" : ""}${Math.round(((now - before) / before) * 100)}%`;

const views = (r: Row) => Number(r.pageviews ?? r.count ?? 0);

const list = (rows: Row[] | null, key: string) =>
  !rows
    ? "  (unavailable this week)"
    : rows.length === 0
      ? "  (no data)"
      : rows.map((r, i) => `  ${i + 1}. ${String(r[key] ?? "unknown")} — ${views(r)} views`).join("\n");

/** Plain-text email body. Pure, so it's unit-tested without network. */
export function buildReport(d: ReportData): { subject: string; message: string } {
  const range = `${d.since.toISOString().slice(0, 10)} → ${d.until.toISOString().slice(0, 10)}`;
  return {
    subject: `williamgray.dev weekly: ${d.week.visitors} visitors, ${d.week.pageviews} page views`,
    message: [
      `Weekly analytics for williamgray.dev (${range})`,
      "",
      `Visitors:   ${d.week.visitors}  (${change(d.week.visitors, d.previous.visitors)} vs previous week)`,
      `Page views: ${d.week.pageviews}  (${change(d.week.pageviews, d.previous.pageviews)} vs previous week)`,
      "",
      "Top pages:",
      list(d.pages, "requestPath"),
      "",
      "Top countries:",
      list(d.countries, "country"),
      "",
      "Full dashboard: https://vercel.com/graywilliamwiltino-9906s-projects/main-portfolio/analytics",
    ].join("\n"),
  };
}

async function query<T>(path: string, params: Record<string, string>): Promise<T> {
  const url = new URL(`https://api.vercel.com/v1/query/web-analytics/visits/${path}`);
  url.searchParams.set("projectId", process.env.VERCEL_PROJECT_ID ?? "main-portfolio");
  url.searchParams.set("teamId", TEAM_ID);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  const res = await fetch(url, { headers: { Authorization: `Bearer ${process.env.VERCEL_TOKEN}` } });
  if (!res.ok) throw new Error(`analytics ${path}: ${res.status} ${await res.text()}`);
  return ((await res.json()) as { data: T }).data;
}

const top = (by: string, since: Date, until: Date) =>
  query<Row[]>("aggregate", { by, since: since.toISOString(), until: until.toISOString(), limit: "5" }).catch(
    (e) => (console.error(e), null) // a breakdown failing shouldn't stop the email
  );

export async function GET(request: Request) {
  if (!process.env.CRON_SECRET || request.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }
  if (!process.env.VERCEL_TOKEN || !process.env.EMAILJS_PRIVATE_KEY) {
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  const until = new Date();
  const since = new Date(until.getTime() - 7 * DAY);
  const before = new Date(since.getTime() - 7 * DAY);

  try {
    const [week, previous, pages, countries] = await Promise.all([
      query<Count>("count", { since: since.toISOString(), until: until.toISOString() }),
      query<Count>("count", { since: before.toISOString(), until: since.toISOString() }),
      top("requestPath", since, until),
      top("country", since, until),
    ]);
    const { subject, message } = buildReport({ since, until, week, previous, pages, countries });

    const sent = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        service_id: EMAILJS.service,
        template_id: EMAILJS.template,
        user_id: EMAILJS.publicKey,
        accessToken: process.env.EMAILJS_PRIVATE_KEY,
        template_params: { name: "Portfolio analytics", email: "graywilliamwiltino@gmail.com", subject, message },
      }),
    });
    if (!sent.ok) throw new Error(`emailjs: ${sent.status} ${await sent.text()}`);
    return Response.json({ sent: true, subject });
  } catch (error) {
    console.error("analytics report failed:", error);
    return Response.json({ error: String(error) }, { status: 502 });
  }
}

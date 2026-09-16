// Fire-and-forget "someone opened your portfolio" email notification.
// Uses Web3Forms — the same service the contact form posts to.
//
// Volume control matters here: without it, every page load and every refresh
// would be another email. A visitor triggers at most one notification per
// browser session, and at most one per COOLDOWN_MS across sessions.
//
// Failures are swallowed on purpose — a notification must never break the page
// or be visible to the visitor.

// Falls back to the contact-form key. Prefer a SEPARATE key (see .env.example)
// so visit pings can't eat the quota real contact messages need.
const ACCESS_KEY =
  import.meta.env.VITE_WEB3FORMS_VISIT_KEY ||
  "adf85693-ddc5-40e0-b699-f8fac4054df4";

const COOLDOWN_MS = 6 * 60 * 60 * 1000; // 6 hours per returning visitor
const LAST_SENT_KEY = "pf_visit_notified_at";
const SESSION_KEY = "pf_visit_notified";

// Guards React StrictMode, which runs effects twice in development.
let firedThisLoad = false;

// Storage throws in some privacy modes — never let that bubble up.
const safeGet = (store, key) => {
  try {
    return store.getItem(key);
  } catch {
    return null;
  }
};

const safeSet = (store, key, value) => {
  try {
    store.setItem(key, value);
  } catch {
    /* ignore */
  }
};

// Deliberately coarse: enough to be useful, not enough to identify anyone.
const deviceType = () =>
  /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)
    ? "Mobile"
    : "Desktop";

// ── Source detection ──────────────────────────────────────────────────────────
// Referrers alone are unreliable: PDFs (your resume) send none, and the
// LinkedIn/Instagram apps strip them. So the most reliable signal is a tag you
// add to each link you share, e.g. https://yoursite.com/?src=resume
const SOURCE_PARAMS = ["src", "ref", "utm_source"];

const REFERRER_NAMES = [
  [/^mail\.google\.com$/, "Gmail"], // before the generic Google match
  [/(^|\.)linkedin\.com$|^lnkd\.in$/, "LinkedIn"],
  [/(^|\.)github\.com$/, "GitHub"],
  [/^t\.co$|(^|\.)x\.com$|(^|\.)twitter\.com$/, "X / Twitter"],
  [/(^|\.)instagram\.com$/, "Instagram"],
  [/(^|\.)takeuforward\.org$/, "TakeUForward"],
  [/(^|\.)google\.[a-z.]+$/, "Google Search"],
  [/(^|\.)bing\.com$/, "Bing"],
  [/(^|\.)duckduckgo\.com$/, "DuckDuckGo"],
];

const IN_APP_BROWSERS = [
  [/LinkedInApp/i, "LinkedIn app"],
  [/Instagram/i, "Instagram app"],
  [/FBAN|FBAV/i, "Facebook app"],
  [/Snapchat/i, "Snapchat app"],
];

// Query text lands in your inbox, so keep it short and plain.
const cleanTag = (raw) =>
  (raw || "").replace(/[^\w\s.-]/g, "").trim().slice(0, 40);

function readSourceTag() {
  const params = new URLSearchParams(window.location.search);
  for (const key of SOURCE_PARAMS) {
    const tag = cleanTag(params.get(key));
    if (tag) return tag;
  }
  return null;
}

// Remove the tag from the address bar, so a visitor who copies the URL and
// shares it doesn't pass your "resume" tag on to someone else.
function stripSourceTag() {
  const url = new URL(window.location.href);
  const had = SOURCE_PARAMS.filter((key) => url.searchParams.has(key));
  if (!had.length) return;
  had.forEach((key) => url.searchParams.delete(key));
  window.history.replaceState(
    window.history.state, // keep React Router's history entry intact
    "",
    url.pathname + url.search + url.hash
  );
}

// Pure, so it can be checked without a real visit.
// Priority: tagged link → named referrer → in-app browser → direct.
export function detectSource({ tag, referrer, userAgent, ownHost }) {
  if (tag) return `${tag} (tagged link)`;

  if (referrer) {
    try {
      const host = new URL(referrer).hostname.replace(/^www\./, "");
      if (host !== ownHost.replace(/^www\./, "")) {
        const match = REFERRER_NAMES.find(([pattern]) => pattern.test(host));
        return match ? match[1] : host;
      }
    } catch {
      /* malformed referrer — fall through */
    }
  }

  const inApp = IN_APP_BROWSERS.find(([pattern]) => pattern.test(userAgent));
  if (inApp) return `${inApp[1]} (in-app browser)`;

  return "Direct / unknown (typed URL, bookmark, PDF, or untagged link)";
}

export default async function notifyVisit() {
  if (firedThisLoad) return;
  firedThisLoad = true;

  // Read the tag before stripping it; strip even when no email goes out.
  const source = detectSource({
    tag: readSourceTag(),
    referrer: document.referrer,
    userAgent: navigator.userAgent,
    ownHost: window.location.hostname,
  });
  stripSourceTag();

  // Don't email yourself while running the dev server.
  if (!import.meta.env.PROD) return;

  if (safeGet(sessionStorage, SESSION_KEY)) return;

  const lastSent = Number(safeGet(localStorage, LAST_SENT_KEY) || 0);
  if (lastSent && Date.now() - lastSent < COOLDOWN_MS) return;

  // Mark before sending, so a slow or failed request can't cause a retry storm.
  safeSet(sessionStorage, SESSION_KEY, "1");
  safeSet(localStorage, LAST_SENT_KEY, String(Date.now()));

  const when = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  try {
    await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: ACCESS_KEY,
        subject: "Someone just opened your portfolio",
        from_name: "Portfolio Visit Alert",
        botcheck: false,
        message: [
          "Someone just opened your portfolio.",
          "",
          `Time:   ${when} IST`,
          `Page:   ${window.location.pathname}`,
          `Source: ${source}`,
          `Device: ${deviceType()}`,
        ].join("\n"),
      }),
    });
  } catch {
    /* notifications are best-effort */
  }
}

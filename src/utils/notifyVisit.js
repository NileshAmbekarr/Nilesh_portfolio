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

const trafficSource = () => {
  if (!document.referrer) return "Direct / unknown";
  try {
    return new URL(document.referrer).hostname;
  } catch {
    return "Unknown";
  }
};

export default async function notifyVisit() {
  if (firedThisLoad) return;
  firedThisLoad = true;

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
          `Source: ${trafficSource()}`,
          `Device: ${deviceType()}`,
        ].join("\n"),
      }),
    });
  } catch {
    /* notifications are best-effort */
  }
}

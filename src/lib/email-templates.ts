import type { EmailTemplateContent } from "@/lib/email";

export const EMAIL_SETTING_KEYS = [
  "venue_address",
  "venue_parking",
  "venue_start_time",
  "prework_extra",
  "day1_what_to_bring",
] as const;

export type EmailSettingKey = (typeof EMAIL_SETTING_KEYS)[number];

export const EMAIL_TEMPLATE_KEYS = ["prework", "venue", "day1_prep"] as const;
export type EmailTemplateKey = (typeof EMAIL_TEMPLATE_KEYS)[number];

export type EmailSettingsMap = Map<string, string>;

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getSetting(
  settings: EmailSettingsMap,
  key: EmailSettingKey,
  fallback = "",
) {
  const raw = settings.get(key);
  return raw?.trim() || fallback;
}

export function getTemplateLabel(key: EmailTemplateKey) {
  const labels: Record<EmailTemplateKey, string> = {
    prework: "Prework Reminder",
    venue: "Venue Details",
    day1_prep: "Day 1 Prep",
  };
  return labels[key];
}

export function requiredSettingsForTemplate(
  key: EmailTemplateKey,
): EmailSettingKey[] {
  if (key === "prework") return [];
  if (key === "venue") return ["venue_address", "venue_start_time"];
  return ["venue_address", "venue_start_time"];
}

export function validateTemplateSettings(
  key: EmailTemplateKey,
  settings: EmailSettingsMap,
) {
  const required = requiredSettingsForTemplate(key);
  return required.filter((settingKey) => !getSetting(settings, settingKey));
}

function wrapHtml(body: string) {
  return `<div style="font-family: IBM Plex Sans, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif; color: #1f2030; line-height: 1.55; font-size: 16px;">${body}</div>`;
}

export function buildPreworkEmail(
  settings: EmailSettingsMap,
  params: { firstName: string },
): EmailTemplateContent {
  const safeFirstName = escapeHtml(params.firstName.trim() || "there");
  const preworkExtra = getSetting(settings, "prework_extra");
  const extraText = preworkExtra ? `\n- ${preworkExtra}` : "";
  const extraHtml = preworkExtra ? `<li>${escapeHtml(preworkExtra)}</li>` : "";

  return {
    subject: "Prework checklist for Zero-to-Agent",
    text: [
      `Hi ${params.firstName.trim() || "there"},`,
      "",
      "Prework checklist:",
      "- Install Node 20+",
      "- Install Python 3.11+",
      "- Install Git",
      "- Install VS Code",
      "- Choose one workflow to automate",
      "- Bring your laptop + charger",
      extraText,
      "",
      "Reply here if you need help before the workshop.",
    ].join("\n"),
    html: wrapHtml(`
      <p>Hi ${safeFirstName},</p>
      <p>Prework checklist:</p>
      <ul>
        <li>Install Node 20+</li>
        <li>Install Python 3.11+</li>
        <li>Install Git</li>
        <li>Install VS Code</li>
        <li>Choose one workflow to automate</li>
        <li>Bring your laptop + charger</li>
        ${extraHtml}
      </ul>
      <p>Reply here if you need help before the workshop.</p>
    `),
  };
}

export function buildVenueEmail(
  settings: EmailSettingsMap,
  params: { firstName: string },
): EmailTemplateContent {
  const safeFirstName = escapeHtml(params.firstName.trim() || "there");
  const venueAddress = getSetting(settings, "venue_address", "[Not yet configured]");
  const venueParking = getSetting(settings, "venue_parking", "[Not yet configured]");
  const venueStartTime = getSetting(
    settings,
    "venue_start_time",
    "[Not yet configured]",
  );
  const whatToBring = getSetting(
    settings,
    "day1_what_to_bring",
    "Laptop + charger",
  );

  return {
    subject: "Venue details for Zero-to-Agent - Feb 28",
    text: [
      `Hi ${params.firstName.trim() || "there"},`,
      "",
      "Venue details:",
      `Address: ${venueAddress}`,
      `Parking: ${venueParking}`,
      `Arrive by: ${venueStartTime}`,
      `Bring: ${whatToBring}`,
      "",
      "Reply here if you have questions.",
    ].join("\n"),
    html: wrapHtml(`
      <p>Hi ${safeFirstName},</p>
      <p><strong>Venue details</strong></p>
      <p>Address: ${escapeHtml(venueAddress)}<br/>Parking: ${escapeHtml(venueParking)}<br/>Arrive by: ${escapeHtml(venueStartTime)}<br/>Bring: ${escapeHtml(whatToBring)}</p>
      <p>Reply here if you have questions.</p>
    `),
  };
}

export function buildDay1PrepEmail(
  settings: EmailSettingsMap,
  params: { firstName: string },
): EmailTemplateContent {
  const safeFirstName = escapeHtml(params.firstName.trim() || "there");
  const venueAddress = getSetting(settings, "venue_address", "[Not yet configured]");
  const venueStartTime = getSetting(
    settings,
    "venue_start_time",
    "[Not yet configured]",
  );
  const whatToBring = getSetting(
    settings,
    "day1_what_to_bring",
    "Laptop + charger",
  );

  return {
    subject: `Tomorrow: Zero-to-Agent starts at ${venueStartTime}`,
    text: [
      `Hi ${params.firstName.trim() || "there"},`,
      "",
      "Quick Day 1 prep:",
      `Arrive by: ${venueStartTime}`,
      `Address: ${venueAddress}`,
      `Bring: ${whatToBring}`,
      "",
      "See you tomorrow.",
    ].join("\n"),
    html: wrapHtml(`
      <p>Hi ${safeFirstName},</p>
      <p><strong>Quick Day 1 prep</strong></p>
      <p>Arrive by: ${escapeHtml(venueStartTime)}<br/>Address: ${escapeHtml(venueAddress)}<br/>Bring: ${escapeHtml(whatToBring)}</p>
      <p>See you tomorrow.</p>
    `),
  };
}

export function buildTemplate(
  key: EmailTemplateKey,
  settings: EmailSettingsMap,
  params: { firstName: string },
) {
  if (key === "prework") return buildPreworkEmail(settings, params);
  if (key === "venue") return buildVenueEmail(settings, params);
  return buildDay1PrepEmail(settings, params);
}

export function defaultEmailSettings(): Array<{ key: EmailSettingKey; value: string }> {
  return EMAIL_SETTING_KEYS.map((key) => ({ key, value: "" }));
}

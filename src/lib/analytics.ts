export type AnalyticsValue = string | number | boolean | null;

type AnalyticsPayload = {
  name: string;
  properties: Record<string, AnalyticsValue>;
  path: string;
  timestamp: string;
};

const ANALYTICS_ENDPOINT = "/api/analytics";

function buildPayload(
  name: string,
  properties: Record<string, AnalyticsValue>,
): AnalyticsPayload {
  const path =
    typeof window === "undefined"
      ? ""
      : `${window.location.pathname}${window.location.search}`;

  return {
    name,
    properties,
    path,
    timestamp: new Date().toISOString(),
  };
}

export function trackEvent(
  name: string,
  properties: Record<string, AnalyticsValue> = {},
) {
  if (typeof window === "undefined") return;

  const payload = buildPayload(name, properties);
  const body = JSON.stringify(payload);

  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([body], { type: "application/json" });
      navigator.sendBeacon(ANALYTICS_ENDPOINT, blob);
      return;
    }
  } catch {
    // Fall through to fetch keepalive.
  }

  void fetch(ANALYTICS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    keepalive: true,
  }).catch(() => {});
}

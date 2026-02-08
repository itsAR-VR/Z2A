import process from "node:process";

function usage() {
  console.log(
    [
      "Usage:",
      "  node scripts/create-test-checkout-url.mjs [--base-url <url>] [--email <email>] [--network-code <code>]",
      "",
      "Examples:",
      "  node scripts/create-test-checkout-url.mjs",
      "  node scripts/create-test-checkout-url.mjs --network-code ABC123",
      "  node scripts/create-test-checkout-url.mjs --base-url https://zerotoagent.com --email you@example.com",
    ].join("\n"),
  );
}

const args = process.argv.slice(2);
function getArg(name) {
  const idx = args.indexOf(name);
  if (idx === -1) return null;
  const value = args[idx + 1];
  if (!value || value.startsWith("--")) return null;
  return value;
}

if (args.includes("--help") || args.includes("-h")) {
  usage();
  process.exit(0);
}

const baseUrl = getArg("--base-url") || "http://localhost:3000";
const email =
  getArg("--email") ||
  `qa+${Date.now()}@example.com`;
const networkCode = getArg("--network-code") || null;

const payload = {
  firstName: "Test",
  lastName: "Checkout",
  email,
  roleTitle: "QA",
  useCase: "Verify the end-to-end deposit + webhook flow.",
  ...(networkCode ? { networkCode } : {}),
};

const res = await fetch(`${baseUrl}/api/apply`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});

const text = await res.text();
let data = null;
try {
  data = JSON.parse(text);
} catch {
  // leave as null
}

if (!res.ok) {
  console.error(`[create-checkout] ${res.status} ${res.statusText}`);
  console.error(data ?? text);
  process.exit(1);
}

if (!data?.checkoutUrl) {
  console.error("[create-checkout] Missing checkoutUrl in response");
  console.error(data ?? text);
  process.exit(1);
}

console.log(data.checkoutUrl);

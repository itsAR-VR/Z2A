import { test, expect } from "@playwright/test";

test.describe("Admin Auth", () => {
  test("requires basic auth for /admin", async ({ request }) => {
    const res = await request.get("/admin");
    expect(res.status()).toBe(401);

    const headers = res.headers();
    expect(headers["www-authenticate"]).toContain("Basic");
  });
});


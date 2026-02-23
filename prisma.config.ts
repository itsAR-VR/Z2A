import { config as loadEnv } from "dotenv";
import { defineConfig } from "prisma/config";

// Local dev: Next.js uses `.env.local` by default; load it for Prisma CLI too.
loadEnv({ path: ".env.local" });

// Build/CI safety: prefer DIRECT_URL, but gracefully fall back so `prisma generate`
// can run in environments that only provide DATABASE_URL (or none at all).
const directUrl =
  process.env.DIRECT_URL ??
  process.env.DATABASE_URL ??
  "postgresql://dummy:dummy@localhost:5432/dummy";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  // Prisma ORM v7: connection URLs live here (not in schema.prisma).
  datasource: {
    url: directUrl,
  },
});


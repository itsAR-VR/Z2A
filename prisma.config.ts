import { config as loadEnv } from "dotenv";
import { defineConfig, env } from "prisma/config";

// Local dev: Next.js uses `.env.local` by default; load it for Prisma CLI too.
loadEnv({ path: ".env.local" });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  // Prisma ORM v7: connection URLs live here (not in schema.prisma).
  // Use DIRECT_URL for CLI/migrations (non-pooled connection string).
  datasource: {
    url: env("DIRECT_URL"),
  },
});


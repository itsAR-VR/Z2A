import {
  PrismaClient as PrismaClientCtor,
  type PrismaClient as PrismaClientType,
} from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

import { env } from "@/lib/env";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientType | undefined;
};

const adapter = new PrismaPg({ connectionString: env.DATABASE_URL });

// Prisma v7 generates a TS entrypoint with `@ts-nocheck`, so we type the
// constructor and instance explicitly to preserve strong typing downstream.
const PrismaClient = PrismaClientCtor as unknown as new (
  options: unknown,
) => PrismaClientType;

export const prisma: PrismaClientType =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

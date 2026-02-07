import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Prevent Next.js from inferring the wrong workspace root when multiple
  // lockfiles exist outside this repo (can impact Turbopack resolution/caching).
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;

import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project; a stray pnpm-lock.yaml in the home
  // directory otherwise makes Next infer the wrong root.
  outputFileTracingRoot: path.join(__dirname),
};

export default nextConfig;

import type { NextConfig } from "next";

/** Allow public R2 images (r2.dev or a custom domain from env) */
function r2Patterns() {
  const patterns: { protocol: "https"; hostname: string; pathname: string }[] = [
    { protocol: "https", hostname: "**.r2.dev", pathname: "/**" },
  ];
  const custom = process.env.R2_PUBLIC_BASE_URL;
  if (custom) {
    try {
      const { hostname } = new URL(custom);
      if (hostname && !hostname.endsWith(".r2.dev")) {
        patterns.push({ protocol: "https", hostname, pathname: "/**" });
      }
    } catch {
      /* invalid URL - ignore */
    }
  }
  return patterns;
}

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/vi/**",
      },
      ...r2Patterns(),
    ],
  },
};

export default nextConfig;

// next.config.mjs

import createNextIntlPlugin from "next-intl/plugin";
import intlConfig from "./next-intl.config.mjs";
import nextPWA from "next-pwa";

// Plugin: Internationalization
const withNextIntl = createNextIntlPlugin(intlConfig);

// Plugin: Progressive Web App
const withPWA = nextPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development", // Disable in dev
});

// Your base config
const nextConfig = {
  compress: true,
  swcMinify: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ghchart.rshah.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "eluminoustechnologies.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/id/**",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        pathname: "/**",
      },
    ],
  },
};

// ✅ Compose the plugins in the correct order
export default withPWA(withNextIntl(nextConfig));

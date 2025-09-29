// next.config.mjs
import createNextIntlPlugin from "next-intl/plugin";
import intlConfig from "./next-intl.config.mjs";

const withNextIntl = createNextIntlPlugin(intlConfig);

/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["local-origin.dev", "*.local-origin.dev"],
  compress: true,
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
  reactStrictMode: true,
};

export default withNextIntl(nextConfig);

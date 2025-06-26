// next.config.mjs atau next.config.ts
import createNextIntlPlugin from "next-intl/plugin";
import intlConfig from "./next-intl.config.mjs";
//pakai ES module export

const withNextIntl = createNextIntlPlugin(intlConfig);

const nextConfig = {
  images: {
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

export default withNextIntl(nextConfig);

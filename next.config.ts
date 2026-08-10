import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Legacy paths from the AMRabbits site, where the guardian dogs used to live.
      { source: "/farm/livestock-guardian-dogs", destination: "/dogs/breed", permanent: true },
      { source: "/livestock-dogs", destination: "/dogs/breed", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      { source: "/available-puppies", destination: "/puppies", permanent: true },
    ];
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            new URL('https://randomuser.me/api/portraits/women/**'),
            new URL('https://randomuser.me/api/portraits/men/**')
        ],
    },
  /* config options here */
};

export default nextConfig;

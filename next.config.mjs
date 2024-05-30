import makeWithPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV !== "development", // Remove console.log in production
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://yuriybl.github.io/projects/calculator/' : '',
};

const withPWA = makeWithPWA({
  dest: "public", // Destination directory for the PWA files
  disable: process.env.NODE_ENV === "development", // Disable PWA in development mode
  register: true, // Register the PWA service worker
  skipWaiting: true, // Skip waiting for service worker activation
});

export default withPWA(nextConfig);

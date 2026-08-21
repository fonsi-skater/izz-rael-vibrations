/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Lint config isn't fully pinned to this Next.js version yet —
    // don't let it block production builds. Re-enable once eslint
    // and eslint-config-next versions are aligned.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://placehold.co/**"),
      { protocol: "https", hostname: "images.unsplash.com", port: "" },
      { protocol: "https", hostname: "res.cloudinary.com", port: "" },
    ],
    dangerouslyAllowSVG: true,
  },
  experimental: {
    
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  serverExternalPackages: ["bcryptjs", "jsonwebtoken"],
};

export default nextConfig;

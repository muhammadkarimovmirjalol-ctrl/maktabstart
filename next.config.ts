import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "localhost:3000",
    "127.0.0.1:3000",
    "*.serveousercontent.com",
    "bd695fee7bec0e79-144-124-196-109.serveousercontent.com",
    "8b99a2d63cec5df8-144-124-196-109.serveousercontent.com",
  ],
};

export default nextConfig;

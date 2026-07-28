import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 defaults qualities to [75] only; allow 90 so high-quality
    // photos (e.g. the "Enjoy" step image) aren't coerced back down to 75.
    qualities: [75, 90],
  },
  // Serve the app-association files as application/json. Apple and Google both
  // require these exact paths return JSON; the static files in public/.well-known
  // would otherwise be served with a non-JSON default content type.
  async headers() {
    return [
      {
        source: "/.well-known/apple-app-site-association",
        headers: [{ key: "Content-Type", value: "application/json" }],
      },
      {
        source: "/.well-known/assetlinks.json",
        headers: [{ key: "Content-Type", value: "application/json" }],
      },
    ];
  },
};

export default nextConfig;

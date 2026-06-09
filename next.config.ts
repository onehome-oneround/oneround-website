import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 defaults qualities to [75] only; allow 90 so high-quality
    // photos (e.g. the "Enjoy" step image) aren't coerced back down to 75.
    qualities: [75, 90],
  },
};

export default nextConfig;

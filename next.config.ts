import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // 掲載宿が増えるたびに許可ドメインを追加するのは漏れの温床になる (27宿追加時に全滅した)
    // ため、https の全ホストを許可する。掲載画像は公式サイト由来のURLのみ使用する運用。
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;

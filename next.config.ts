import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 全画像をブラウザ直読みにする (最適化オフ)。
    // 理由: ①掲載宿の多くが海外IPを遮断するJPホスティングで、Vercelの最適化サーバー(米国IP)が
    // 元画像を取得できない ②カスタムローダー方式は最適化エンドポイント自体が無効化され全滅した。
    // 根本解は画像の自前ホスティング (public/ 配下) — 移行時にこの設定を戻す。
    unoptimized: true,
  },
};

export default nextConfig;

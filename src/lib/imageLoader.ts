/**
 * カスタム画像ローダー。
 * 日本の中小ホスティング (Xserver等) は海外IPからのアクセスを遮断していることが多く、
 * Vercelの画像最適化サーバー (米国IP) が元画像を取得できずカードが崩れる。
 * → 該当ドメインは最適化を迂回してブラウザから直接読み込む。
 * それ以外 (imgur / ikyu / wixstatic 等のCDN) は従来どおり /_next/image で最適化する。
 */
const DIRECT_HOSTS = new Set([
    "theclub919.com",
    "privatevilla-chiba.com",
    "dogresort-chibatorami.com",
    "yamanashi-dogresort.com",
    "ang-ns.com",
    "forest-hills.jp",
    "angel-hotels.com",
    "izu-dogresort.com",
    "kamome-slow-hotel.jp",
    "doggywood.jp",
    "resort-villaawaji.com",
    "dog-oceansuite.com",
    "doggysresort-amanohashidate.com",
    "private-dogresort.com",
    "dogglamping-iseshima.com",
    "itoshima-villa.com",
    "1co.co.jp",
    "kosugiresort.com",
    "adan-resort.com",
]);

export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
    try {
        const host = new URL(src).hostname.replace(/^www\./, "");
        if (DIRECT_HOSTS.has(host)) return src;
    } catch {
        /* 相対パス等はそのまま最適化へ */
    }
    return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality ?? 75}`;
}

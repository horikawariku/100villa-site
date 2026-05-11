import { siteMeta } from "@/data/siteMeta";

/**
 * 全宿の本日のpage view数を1回だけfetchするモジュールキャッシュ。
 * 複数のPropertyCardから呼ばれても重複fetchしない。
 *
 * - URL に `_t=<ページロード時のtimestamp>` を付けて、別タブ/別セッション間で
 *   CDN/ブラウザキャッシュを共有しないようにする (フルリロードで増加が見える)。
 * - サーバー側も max-age=10 まで短縮済み。
 */
let countsPromise: Promise<Record<string, number>> | null = null;
const sessionTs = typeof window !== "undefined" ? Date.now() : 0;

export function fetchAllPropertyViews(): Promise<Record<string, number>> {
    if (countsPromise) return countsPromise;
    const url = `${siteMeta.trackerOrigin}/api/property-views-today?_t=${sessionTs}`;
    countsPromise = fetch(url, { cache: "no-store" })
        .then((r) => (r.ok ? r.json() : {}))
        .catch(() => ({}));
    return countsPromise;
}

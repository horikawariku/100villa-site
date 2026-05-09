import { siteMeta } from "@/data/siteMeta";

/**
 * 全宿の本日のpage view数を1回だけfetchするモジュールキャッシュ。
 * 複数のPropertyCardから呼ばれても重複fetchしない。
 */
let countsPromise: Promise<Record<string, number>> | null = null;

export function fetchAllPropertyViews(): Promise<Record<string, number>> {
    if (countsPromise) return countsPromise;
    countsPromise = fetch(`${siteMeta.trackerOrigin}/api/property-views-today`)
        .then((r) => (r.ok ? r.json() : {}))
        .catch(() => ({}));
    return countsPromise;
}

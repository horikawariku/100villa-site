/** サイト全体のメタ情報 */
export const siteMeta = {
    name: "100 VILLA",
    tagline: "予約が取れない100棟",
    description: "サウナ、貸切、絶景、古民家。日本全国の一棟貸しヴィラ・宿を厳選して紹介。次に泊まりたい一棟がここに。",
    url: "https://trip-trend.vercel.app",
    ogImage: "https://i.imgur.com/5fv3XpV.png",
    /** Hero背景ローテ用 (実物件の写真) */
    heroImages: [
        "https://i.imgur.com/3YSUYco.png", // gozahills オーシャンビュー
        "https://i.imgur.com/LL2QPJp.png", // AO 夕焼け
        "https://hotel-mysa.com/wp-content/uploads/2022/10/s_myh_50-1.jpg", // mysa hakone 外観
        "https://villa-saison-fuji.com/wp-content/uploads/2024/05/topintro_600_05.jpg", // VILLA SAISON FUJI 外観
        "https://i.imgur.com/5fv3XpV.png", // AO サウナ室
    ],
    tiktok: "https://www.tiktok.com/@triptrend.com",
    /** 掲載・お問い合わせ先 */
    contactEmail: "koloha.ec@gmail.com",
    /** redirect-tracker のオリジン */
    trackerOrigin: "https://redirect-tracker-eta.vercel.app",
};

/** redirect-tracker 経由の予約URL生成 */
export function bookingUrl(opts: { propertyId: string; source?: string; cta?: string; campaign?: string }) {
    const params = new URLSearchParams();
    params.set("p", opts.propertyId);
    params.set("s", opts.source ?? "100villa");
    if (opts.cta) params.set("cta", opts.cta);
    if (opts.campaign) params.set("c", opts.campaign);
    return `${siteMeta.trackerOrigin}/api/redirect?${params.toString()}`;
}

/**
 * mysa ブランドの4宿は、Beds24直ではなく mysa-site の宿ページへ送客する。
 * mysa-site 側の track.js が utm_source を拾い、最終的なBeds24予約を
 * /api/redirect(s=<utm_source>) 経由にするため、100villa の成果として計上される。
 * mysa宿でなければ null（通常の bookingUrl を使う）。
 */
export const MYSA_SITE_ORIGIN = "https://mysa-site.100villa.workers.dev";
const MYSA_SITE_PATH: Record<string, string> = {
    "mysa-hakone": "/hakone/",
    "mysa-fuji": "/fuji/",
    "mysa-yamanakako": "/yamanakako/",
    "the-time-fuji": "/the-time-fuji/",
};
export function mysaSiteUrl(propertyId: string, source = "100villa"): string | null {
    const path = MYSA_SITE_PATH[propertyId];
    if (!path) return null;
    return `${MYSA_SITE_ORIGIN}${path}?utm_source=${encodeURIComponent(source)}`;
}

/**
 * クリック時に呼ぶ: 100villa の訪問者ID (page_views と同じID) を遷移先URLに付与し、
 * クロスドメインでも同一訪問者として行動が繋がるようにする。
 * - redirect 経由URL → `v` パラメータ (click_logs の click_id に採用される)
 * - mysa-site 直リンク → `rt_vid` パラメータ (mysa 側 track.js が引き継ぐ)
 * SSR時・cookie未発行時は元のURLをそのまま返す (計測が1段浅くなるだけで無害)。
 */
export function withVisitorId(url: string): string {
    if (typeof document === "undefined") return url;
    const m =
        document.cookie.match(/(?:^|; )_rt_site_vid=([^;]+)/) ||
        document.cookie.match(/(?:^|; )_rt_cid=([^;]+)/);
    if (!m) return url;
    const vid = decodeURIComponent(m[1]);
    if (!/^[0-9a-f-]{16,64}$/i.test(vid)) return url;
    const sep = url.includes("?") ? "&" : "?";
    const key = url.includes("/api/redirect") ? "v" : "rt_vid";
    return `${url}${sep}${key}=${encodeURIComponent(vid)}`;
}

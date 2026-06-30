/** サイト全体のメタ情報 */
export const siteMeta = {
    name: "100 VILLA",
    tagline: "予約が取れない100棟",
    description: "フォロワー15万人の編集部が選ぶ、日本中の極上ヴィラ・宿。サウナ、貸切、絶景、古民家。次に泊まりたい一棟がここに。",
    url: "https://100villa.vercel.app",
    ogImage: "https://i.imgur.com/5fv3XpV.png",
    /** Hero背景ローテ用 (実物件の写真) */
    heroImages: [
        "https://i.imgur.com/3YSUYco.png", // gozahills オーシャンビュー
        "https://i.imgur.com/LL2QPJp.png", // AO 夕焼け
        "https://hotel-mysa.com/wp-content/uploads/2022/10/s_myh_50-1.jpg", // mysa hakone 外観
        "https://villa-saison-fuji.com/wp-content/uploads/2024/05/topintro_600_05.jpg", // VILLA SAISON FUJI 外観
        "https://i.imgur.com/5fv3XpV.png", // AO サウナ室
    ],
    instagram: "https://www.instagram.com/",  // TODO: 実アカウント
    tiktok: "https://www.tiktok.com/",         // TODO: 実アカウント
    line: "https://line.me/",                  // TODO: 実OA
    /** メディアの数値訴求 */
    stats: {
        followers: 150000,
        properties: 100,
        prefectures: 25,
    },
    /** 編集者プロフィール */
    editor: {
        name: "堀河大陸",
        title: "編集長",
    },
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

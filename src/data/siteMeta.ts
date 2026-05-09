/** サイト全体のメタ情報 */
export const siteMeta = {
    name: "100 VILLA",
    tagline: "予約が取れない100棟",
    description: "フォロワー15万人の編集部が選ぶ、日本中の極上ヴィラ・宿。サウナ、貸切、絶景、古民家。次に泊まりたい一棟がここに。",
    url: "https://100villa.vercel.app",
    ogImage: "https://i.imgur.com/5fv3XpV.png",
    /** Hero背景ローテ用の写真 (複数枚 5秒ずつクロスフェード) */
    heroImages: [
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1920&q=80",
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1920&q=80",
        "https://images.unsplash.com/photo-1610527003928-47afd7d4f8a0?w=1920&q=80",
        "https://images.unsplash.com/photo-1518733057094-95b53143d2a7?w=1920&q=80",
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

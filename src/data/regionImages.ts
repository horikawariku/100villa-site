import type { Region } from "./types";

/**
 * リージョン別代表写真。
 * 物件のある関東・中部・近畿は自社物件の実写真を使用。
 * 物件のない地域は Unsplash の地域代表写真。
 */
export const REGION_IMAGE: Record<Region, string> = {
    // 北海道: 雪原 (Unsplash)
    hokkaido: "https://images.unsplash.com/photo-1542556398-95fb5b9ed3a4?w=800&q=80",
    // 東北: 桜・紅葉 (Unsplash)
    tohoku: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800&q=80",
    // 関東: mysa hakone 外観 (実物件)
    kanto: "https://hotel-mysa.com/wp-content/uploads/2022/10/s_myh_50-1.jpg",
    // 中部: VILLA SAISON FUJI 外観 (富士山ビュー、実物件)
    chubu: "https://villa-saison-fuji.com/wp-content/uploads/2024/05/topintro_600_05.jpg",
    // 近畿: gozahills オーシャンビュー (実物件、三重志摩)
    kansai: "https://i.imgur.com/3YSUYco.png",
    // 中国: 厳島神社系 (Unsplash)
    chugoku: "https://images.unsplash.com/photo-1492571350019-22de08371fd3?w=800&q=80",
    // 四国: 自然風景 (Unsplash)
    shikoku: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=800&q=80",
    // 九州: 阿蘇山系 (Unsplash)
    kyushu: "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=800&q=80",
    // 沖縄: ビーチ (Unsplash)
    okinawa: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
};

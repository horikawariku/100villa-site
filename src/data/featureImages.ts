import type { FeatureTag } from "./types";

/** 体験タグ別代表写真 (全てUnsplash, HEAD 200確認済み). */
export const FEATURE_IMAGE: Record<FeatureTag, string> = {
    // Wikimedia Commons (CC) — alt verified
    sauna: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/Sauna_of_the_spa_at_Amantaka_luxury_Resort_%26_Hotel_in_Luang_Prabang_Laos.jpg/1280px-Sauna_of_the_spa_at_Amantaka_luxury_Resort_%26_Hotel_in_Luang_Prabang_Laos.jpg",
    private: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
    pool: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&q=80",
    "ocean-view": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    "lake-view": "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",
    "mountain-view": "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    onsen: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Tsurunoyu_onsen_rotenburo2.JPG/1280px-Tsurunoyu_onsen_rotenburo2.JPG",
    bbq: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
    fire: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Campfire_at_Bramble_Bield.jpg/1280px-Campfire_at_Bramble_Bield.jpg",
    kominka: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Gassho-zukuri_farmhouse-01.jpg/1280px-Gassho-zukuri_farmhouse-01.jpg",
    modern: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80",
    luxury: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
    "pet-ok": "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80",
    anniversary: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
};

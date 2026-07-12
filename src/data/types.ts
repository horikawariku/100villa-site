/** 物件データ型定義 */

export type Region =
    | "hokkaido"
    | "tohoku"
    | "kanto"
    | "chubu"
    | "kansai"
    | "chugoku"
    | "shikoku"
    | "kyushu"
    | "okinawa";

export type FeatureTag =
    | "sauna"          // サウナ
    | "private"        // 貸切
    | "pool"           // プール
    | "ocean-view"     // オーシャンビュー
    | "lake-view"      // レイクビュー
    | "mountain-view"  // 山景
    | "onsen"          // 温泉
    | "bbq"            // BBQ
    | "fire"           // 焚き火
    | "kominka"        // 古民家
    | "modern"         // モダン
    | "luxury"         // ラグジュアリー
    | "pet-ok"         // ペット可
    | "anniversary";   // 記念日向け

export type UseCase =
    | "friends"        // 友人グループ
    | "family"         // 家族
    | "couple"         // カップル
    | "corporate"      // 法人合宿
    | "solo";          // ひとり

export interface GalleryImage {
    src: string;
    caption?: string;
    category?: string;
}

export interface Property {
    /** URL slug */
    id: string;
    name: string;
    /** 1行キャッチ */
    catchcopy: string;
    area: {
        region: Region;
        prefecture: string;
        city: string;
    };
    capacity: { min: number; max: number };
    /** 1棟あたり最低価格 (円) */
    pricePerNightFrom?: number;
    /** 1人あたり最低価格 (円)。公式サイトに価格の静的記載がない宿は undefined (表示側で非表示) */
    pricePerPersonFrom?: number;
    features: FeatureTag[];
    useCases: UseCase[];
    /** リスト・カード用メイン写真 */
    mainPhoto: string;
    /** 物件ページ用ギャラリー */
    gallery: GalleryImage[];
    /** 1-2段落の紹介 */
    description: string;
    /** 仕様情報 */
    specs: {
        checkIn?: string;
        checkOut?: string;
        cancellation?: string;
        sauna?: { tempMax?: number; tempMin?: number; selfRoukyu?: boolean; chairs?: number; entertainment?: string };
        bedroom?: string;
        amenities?: string[];
    };
    address: string;
    mapEmbedUrl?: string;
    accessNotes?: string[];
    /** TikTok動画URL (任意) */
    tiktokVideoUrl?: string;
    /** 公式サイトURL — redirect-tracker 経由するため別途 redirectId 必要 */
    officialSiteUrl: string;
    /** redirect-tracker の property_id */
    redirectId: string;
    /** 成果報酬契約あり */
    isClient: boolean;
    /** トップ・編集おすすめに掲載 */
    featured: boolean;
    /** 公開日 (新着順ソート用) */
    publishedAt: string;
}

/** リージョンの日本語ラベル */
export const REGION_LABEL: Record<Region, string> = {
    hokkaido: "北海道",
    tohoku: "東北",
    kanto: "関東",
    chubu: "中部",
    kansai: "近畿",
    chugoku: "中国",
    shikoku: "四国",
    kyushu: "九州",
    okinawa: "沖縄",
};

/** 特徴タグの日本語ラベル */
export const FEATURE_LABEL: Record<FeatureTag, string> = {
    sauna: "サウナ",
    private: "貸切",
    pool: "プール",
    "ocean-view": "オーシャンビュー",
    "lake-view": "レイクビュー",
    "mountain-view": "山景",
    onsen: "温泉",
    bbq: "BBQ",
    fire: "焚き火",
    kominka: "古民家",
    modern: "モダン",
    luxury: "ラグジュアリー",
    "pet-ok": "ペット可",
    anniversary: "記念日",
};

/** ユースケースの日本語ラベル */
export const USE_CASE_LABEL: Record<UseCase, string> = {
    friends: "友人グループ",
    family: "家族",
    couple: "カップル",
    corporate: "法人合宿",
    solo: "ひとり",
};

import type { FeatureTag } from "./types";

/**
 * 体験タグ別代表写真。
 * 自社物件の実写真をできる限り使用 (タイトル⇔画像のマッチを優先)。
 * 該当がない体験のみ Unsplash プレースホルダ。
 */
export const FEATURE_IMAGE: Record<FeatureTag, string> = {
    sauna: "https://i.imgur.com/5fv3XpV.png", // AO サウナ室
    private: "https://i.imgur.com/1we6EPK.png", // AO 外観 (一棟貸切)
    pool: "https://villa-saison-fuji.com/wp-content/uploads/2024/05/topsouna_600_01.jpg", // VILLA SAISON FUJI プール
    "ocean-view": "https://i.imgur.com/3YSUYco.png", // gozahills オーシャンビュー
    "lake-view": "https://i.imgur.com/oRJfIV9.png", // AO 湖近く (高島市)
    "mountain-view": "https://hotel-mysa-fuji.com/wp-content/uploads/2023/11/2.jpeg", // mysa fuji 富士山ビュー
    onsen: "https://www.img-ikyu.com/contents/common/image/acc0/00052530/2/org/14032584.jpg", // hiire OLIVE 温泉
    bbq: "https://i.imgur.com/wyo1DAc.png", // AO BBQエリア
    fire: "https://i.imgur.com/MYmWcpX.png", // AO 焚き火
    kominka: "https://i.imgur.com/ngZvKs6.png", // AO 玄関 (古民家)
    modern: "https://hotel-mysa-fuji.com/wp-content/uploads/2023/11/6.jpeg", // mysa fuji リビング
    luxury: "https://villa-saison-fuji.com/wp-content/uploads/2024/05/stay_750_03.jpg", // VILLA SAISON FUJI リビング
    "pet-ok": "https://j1wellness.com/images/index-images/vacation-img02.jpg", // J1 客室
    anniversary: "https://villa-saison-fuji.com/wp-content/uploads/2024/05/wedding_900_03.jpg", // VILLA SAISON FUJI ウェディング
};

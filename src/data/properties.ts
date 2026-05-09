import type { Property, GalleryImage } from "./types";

/** ダミー画像プール (Unsplash villa/lodging) */
const IMG = {
    villa1: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600&q=80",
    villa2: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1600&q=80",
    living1: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1600&q=80",
    living2: "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=1600&q=80",
    pool1: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1600&q=80",
    pool2: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=1600&q=80",
    bed1: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1600&q=80",
    bed2: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1600&q=80",
    sauna1: "https://images.unsplash.com/photo-1610527003928-47afd7d4f8a0?w=1600&q=80",
    sauna2: "https://images.unsplash.com/photo-1591343395082-e120087004b4?w=1600&q=80",
    beach: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1600&q=80",
    mountain: "https://images.unsplash.com/photo-1518733057094-95b53143d2a7?w=1600&q=80",
    onsen: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1600&q=80",
    fire: "https://images.unsplash.com/photo-1571417228-d6dc1a8f5dd4?w=1600&q=80",
    kominka: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?w=1600&q=80",
    modern: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80",
};

/** ヘルパー: ダミーギャラリー (5枚) */
function dummyGallery(...urls: string[]): GalleryImage[] {
    return urls.map((src) => ({ src }));
}

/**
 * 物件マスタ。
 * 月20件ペースで追加していく。50件超えたら microCMS に移行を検討。
 */
export const PROPERTIES: Property[] = [
    {
        id: "ao-villa",
        name: "サウナヴィラ-碧-",
        catchcopy: "都会ではできない、大音量サウナ",
        area: { region: "kansai", prefecture: "滋賀県", city: "高島市" },
        capacity: { min: 4, max: 10 },
        pricePerNightFrom: 49000,
        pricePerPersonFrom: 9800,
        features: ["sauna", "private", "lake-view", "kominka", "bbq"],
        useCases: ["friends", "corporate", "family"],
        mainPhoto: "https://i.imgur.com/5fv3XpV.png",
        gallery: [
            { src: "https://i.imgur.com/5fv3XpV.png", category: "サウナ" },
            { src: "https://i.imgur.com/iVuXj5q.png", category: "サウナ" },
            { src: "https://i.imgur.com/x3PluMu.png", category: "サウナ" },
            { src: "https://i.imgur.com/oRJfIV9.png", category: "サウナ" },
            { src: "https://i.imgur.com/syOuYkr.png", category: "リビング" },
            { src: "https://i.imgur.com/MYmWcpX.png", category: "リビング" },
            { src: "https://i.imgur.com/o1cZ8Id.png", category: "ベッドルーム" },
            { src: "https://i.imgur.com/FoMkPmK.png", category: "ベッドルーム" },
            { src: "https://i.imgur.com/1we6EPK.png", category: "外観" },
            { src: "https://i.imgur.com/wyo1DAc.png", category: "外観" },
        ],
        description:
            "古民家をサウナ付きラグジュアリー宿にフルリフォーム。最高100℃のサウナでは、好きな音楽やライブ映像を爆音で。周辺に住宅がないため、24時間音楽OK。仲間と、家族と、ここでしかできない体験を。",
        specs: {
            checkIn: "15:00",
            checkOut: "10:00",
            cancellation: "2週間前まで無料 / それ以降100%",
            sauna: { tempMax: 100, tempMin: 14, selfRoukyu: true, chairs: 5, entertainment: "YouTube / Netflix 視聴可" },
            bedroom: "セミダブル × 7 + 和室布団 × 3",
            amenities: ["フルキッチン", "75型TV", "BBQ可 (オプション)", "Wi-Fi", "駐車場"],
        },
        address: "〒520-1601 滋賀県高島市今津町日置前1332-1",
        mapEmbedUrl:
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d136.0145722!3d35.4243012!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x600193036b47b653%3A0xae4ce47a9fda2c78!2sSauna+Private+Villa+AO!5e0!3m2!1sja!2sjp",
        accessNotes: ["京都から車 約1.5h", "大阪から車 約2h", "JR近江今津駅から車 9分"],
        tiktokVideoUrl: "https://vt.tiktok.com/ZS9Wu9jMX/",
        officialSiteUrl: "https://ao-villa.vercel.app",
        redirectId: "ao",
        isClient: true,
        featured: true,
        publishedAt: "2026-04-20",
    },
    {
        id: "gozahills",
        name: "GOZAHILLS",
        catchcopy: "360度絶景のプライベートヴィラ",
        area: { region: "kansai", prefecture: "三重県", city: "志摩市" },
        capacity: { min: 4, max: 12 },
        pricePerNightFrom: 50320,
        pricePerPersonFrom: 12580,
        features: ["sauna", "private", "ocean-view", "fire", "bbq", "luxury"],
        useCases: ["friends", "family", "couple"],
        mainPhoto: "https://i.imgur.com/3YSUYco.png",
        gallery: [
            { src: "https://i.imgur.com/3YSUYco.png", category: "リビング" },
        ],
        description:
            "三重県志摩市、英虞湾を望む高台に佇む一棟貸しのプライベートヴィラ。フィンランドサウナ、水風呂、露天ジャグジーで非日常の整いを。BALMUDA家電・75型TV・BOSEオーディオ完備。",
        specs: {
            checkIn: "15:00",
            checkOut: "10:00",
            cancellation: "1ヶ月前まで無料 / 1ヶ月前〜15日前 50% / 14日前〜当日 100%",
            sauna: { selfRoukyu: true, entertainment: "アロマロウリュ" },
            bedroom: "シングルベッド4台 × 2室 + マットレス4枚",
            amenities: ["Weberガスグリル", "BALMUDA家電", "75型TV", "BOSEオーディオ", "焚き火台 (薪3束無料)"],
        },
        address: "〒517-0705 三重県志摩市志摩町御座457-1",
        accessNotes: ["名古屋から車 約2.5h", "大阪から車 約3h"],
        tiktokVideoUrl: "https://vt.tiktok.com/ZS9WuxTvy/",
        officialSiteUrl: "https://gozahills.vercel.app",
        redirectId: "gozahills",
        isClient: true,
        featured: true,
        publishedAt: "2026-04-15",
    },
    /* ---------- 実データ (リアル物件) ---------- */
    {
        id: "the-villa-j1",
        name: "The Villa J1",
        catchcopy: "館山の貸切ウェルネス別荘",
        area: { region: "kanto", prefecture: "千葉県", city: "館山市" },
        capacity: { min: 2, max: 16 },
        pricePerNightFrom: 35000,
        pricePerPersonFrom: 5000,
        features: ["sauna", "private", "onsen", "bbq", "pet-ok", "luxury", "modern"],
        useCases: ["friends", "family", "couple", "corporate"],
        mainPhoto: "https://j1wellness.com/images/index-images/concept-img.jpg",
        gallery: [
            { src: "https://j1wellness.com/images/index-images/concept-img.jpg", category: "外観" },
            { src: "https://j1wellness.com/images/index-images/vacation-img01.jpg", category: "客室" },
            { src: "https://j1wellness.com/images/index-images/vacation-img02.jpg", category: "客室" },
            { src: "https://j1wellness.com/images/index-images/vacation-img03.jpg", category: "客室" },
            { src: "https://j1wellness.com/images/index-images/activity-img01.jpg", category: "ウェルネス" },
            { src: "https://j1wellness.com/images/index-images/activity-img02.jpg", category: "ウェルネス" },
            { src: "https://j1wellness.com/images/index-images/food-img01.jpg", category: "食事" },
            { src: "https://j1wellness.com/images/index-images/food-img02.jpg", category: "食事" },
        ],
        description: "千葉県館山市、JR館山駅徒歩6分の1棟貸切ヴィラ。半露天檜風呂・岩盤浴・BBQテラス完備、最大16名対応でペット可。",
        specs: {
            checkIn: "15:00 - 18:00",
            checkOut: "10:00",
            cancellation: "予約サイト規定に準ずる",
            sauna: { selfRoukyu: true, entertainment: "遠赤ドームサウナ無料利用 (グループ施設)" },
            bedroom: "鳳凰館 + 別邸A棟 + 別邸B棟 (3棟構成)",
            amenities: ["半露天檜風呂", "岩盤浴", "中庭BBQテラス", "対面キッチン", "全身マッサージシャワー × 2", "グループジム/水素サロン無料", "出張シェフ手配可", "Wi-Fi"],
        },
        address: "〒294-0045 千葉県館山市北条1897-31",
        accessNotes: ["JR内房線「館山駅」徒歩約6分", "富浦ICより車約10分"],
        officialSiteUrl: "https://j1wellness.com/",
        redirectId: "the-villa-j1",
        isClient: false,
        featured: false,
        publishedAt: "2026-05-09",
    },
    {
        id: "hiire-olive",
        name: "Hiire IZU OLIVE",
        catchcopy: "伊豆高原 OLIVE 囲炉裏ヴィラ",
        area: { region: "chubu", prefecture: "静岡県", city: "伊東市" },
        capacity: { min: 1, max: 8 },
        pricePerNightFrom: 50280,
        pricePerPersonFrom: 17500,
        features: ["sauna", "private", "onsen", "fire", "mountain-view", "pet-ok", "modern", "luxury"],
        useCases: ["friends", "family", "couple", "corporate"],
        mainPhoto: "https://www.img-ikyu.com/contents/common/image/acc0/00052530/0/org/14029914.jpg",
        gallery: [
            { src: "https://www.img-ikyu.com/contents/common/image/acc0/00052530/0/org/14029914.jpg", category: "外観" },
            { src: "https://www.img-ikyu.com/contents/common/image/acc0/00052530/0/org/14030098.jpg", category: "外観" },
            { src: "https://www.img-ikyu.com/contents/common/image/acc0/00052530/1/org/14030300.jpg", category: "客室" },
            { src: "https://www.img-ikyu.com/contents/common/image/acc0/00052530/1/org/14031784.jpg", category: "客室" },
            { src: "https://www.img-ikyu.com/contents/common/image/acc0/00052530/2/org/14031756.jpg", category: "サウナ" },
            { src: "https://www.img-ikyu.com/contents/common/image/acc0/00052530/2/org/14031779.jpg", category: "サウナ" },
            { src: "https://www.img-ikyu.com/contents/common/image/acc0/00052530/2/org/14032584.jpg", category: "温泉" },
            { src: "https://www.img-ikyu.com/contents/common/image/acc0/00052530/3/org/14043661.jpg", category: "囲炉裏" },
            { src: "https://www.img-ikyu.com/contents/common/image/acc0/00052530/4/org/14029574.jpg", category: "周辺" },
            { src: "https://www.img-ikyu.com/contents/common/image/acc0/00052530/4/org/14029585.jpg", category: "周辺" },
        ],
        description: "静岡県伊東市八幡野、最大8名の貸切セルフオーベルジュ。エストニア製サウナ・温泉・囲炉裏を備え、中型犬1匹同伴可。伊豆高原駅徒歩10分。",
        specs: {
            checkIn: "16:00 - 24:00",
            checkOut: "11:00",
            cancellation: "プラン詳細参照",
            sauna: { selfRoukyu: true, entertainment: "エストニア製サウナ" },
            bedroom: "寝室複数",
            amenities: ["温泉", "エストニア製サウナ", "囲炉裏 (溶岩)", "フルキッチン", "洗濯機", "Wi-Fi", "駐車場3台", "ペット可 (中型犬1匹・有料)", "バリアフリー対応"],
        },
        address: "〒413-0232 静岡県伊東市八幡野1136-10",
        accessNotes: ["伊豆急行線「伊豆高原駅」徒歩約10分 / 車約3分"],
        tiktokVideoUrl: "https://vt.tiktok.com/ZS9WP81mK/",
        officialSiteUrl: "https://hi-ire.com/",
        redirectId: "hiire-olive",
        isClient: false,
        featured: false,
        publishedAt: "2026-05-09",
    },
    {
        id: "hiire-omuro",
        name: "Hiire IZU OMURO",
        catchcopy: "伊豆高原 OMURO 囲炉裏ヴィラ",
        area: { region: "chubu", prefecture: "静岡県", city: "伊東市" },
        capacity: { min: 1, max: 6 },
        pricePerNightFrom: 48840,
        pricePerPersonFrom: 17500,
        features: ["sauna", "private", "onsen", "fire", "mountain-view", "modern", "luxury"],
        useCases: ["friends", "family", "couple", "corporate"],
        mainPhoto: "https://www.img-ikyu.com/contents/common/image/acc1/00052531/0/org/14031939.jpg",
        gallery: [
            { src: "https://www.img-ikyu.com/contents/common/image/acc1/00052531/0/org/14031939.jpg", category: "外観" },
            { src: "https://www.img-ikyu.com/contents/common/image/acc1/00052531/1/org/14032099.jpg", category: "客室" },
            { src: "https://www.img-ikyu.com/contents/common/image/acc1/00052531/1/org/14032104.jpg", category: "客室" },
            { src: "https://www.img-ikyu.com/contents/common/image/acc1/00052531/1/org/14032115.jpg", category: "客室" },
            { src: "https://www.img-ikyu.com/contents/common/image/acc1/00052531/2/org/14032175.jpg", category: "サウナ" },
            { src: "https://www.img-ikyu.com/contents/common/image/acc1/00052531/2/org/14032197.jpg", category: "温泉" },
            { src: "https://www.img-ikyu.com/contents/common/image/acc1/00052531/2/org/14032216.jpg", category: "温泉" },
            { src: "https://www.img-ikyu.com/contents/common/image/acc1/00052531/3/org/14043901.jpg", category: "囲炉裏" },
            { src: "https://www.img-ikyu.com/contents/common/image/acc1/00052531/3/org/14043940.jpg", category: "囲炉裏" },
            { src: "https://www.img-ikyu.com/contents/common/image/acc1/00052531/4/org/14032148.jpg", category: "周辺" },
        ],
        description: "静岡県伊東市池、最大6名の貸切セルフオーベルジュ。サウナ・温泉・囲炉裏を備え、ケータリング対応可。伊豆高原駅から車6分。",
        specs: {
            checkIn: "16:00 - 24:00",
            checkOut: "11:00",
            cancellation: "プラン詳細参照",
            sauna: { selfRoukyu: true },
            bedroom: "寝室複数",
            amenities: ["温泉", "サウナ", "囲炉裏", "フルキッチン", "洗濯機", "Wi-Fi", "駐車場2台", "食料品持込可", "ケータリング対応"],
        },
        address: "〒413-0234 静岡県伊東市池字下林893-231",
        accessNotes: ["伊豆急行線「伊豆高原駅」より車約6分"],
        officialSiteUrl: "https://hi-ire.com/",
        redirectId: "hiire-omuro",
        isClient: false,
        featured: false,
        publishedAt: "2026-05-09",
    },
    {
        id: "hiire-futo",
        name: "Hiire IZU FUTO",
        catchcopy: "伊豆高原 FUTO 囲炉裏ヴィラ",
        area: { region: "chubu", prefecture: "静岡県", city: "伊東市" },
        capacity: { min: 1, max: 8 },
        pricePerNightFrom: 50280,
        pricePerPersonFrom: 17500,
        features: ["sauna", "private", "onsen", "fire", "mountain-view", "modern", "luxury"],
        useCases: ["friends", "family", "couple", "corporate"],
        mainPhoto: "https://www.img-ikyu.com/contents/common/image/acc2/00052532/0/org/14032250.jpg",
        gallery: [
            { src: "https://www.img-ikyu.com/contents/common/image/acc2/00052532/0/org/14032250.jpg", category: "外観" },
            { src: "https://www.img-ikyu.com/contents/common/image/acc2/00052532/1/org/14032293.jpg", category: "客室" },
            { src: "https://www.img-ikyu.com/contents/common/image/acc2/00052532/1/org/14032297.jpg", category: "客室" },
            { src: "https://www.img-ikyu.com/contents/common/image/acc2/00052532/1/org/14032310.jpg", category: "客室" },
            { src: "https://www.img-ikyu.com/contents/common/image/acc2/00052532/2/org/14032341.jpg", category: "サウナ" },
            { src: "https://www.img-ikyu.com/contents/common/image/acc2/00052532/2/org/14032353.jpg", category: "温泉" },
            { src: "https://www.img-ikyu.com/contents/common/image/acc2/00052532/2/org/14032378.jpg", category: "温泉" },
            { src: "https://www.img-ikyu.com/contents/common/image/acc2/00052532/3/org/14032327.jpg", category: "囲炉裏" },
            { src: "https://www.img-ikyu.com/contents/common/image/acc2/00052532/4/org/14029602.jpg", category: "周辺" },
            { src: "https://www.img-ikyu.com/contents/common/image/acc2/00052532/4/org/14032331.jpg", category: "周辺" },
        ],
        description: "静岡県伊東市富戸、最大8名の貸切セルフオーベルジュ。アルカリ性単純温泉・サウナ・囲炉裏を備え、食事サービス対応。伊豆高原駅から車9分。",
        specs: {
            checkIn: "16:00 - 24:00",
            checkOut: "11:00",
            cancellation: "プラン詳細参照",
            sauna: { selfRoukyu: true },
            bedroom: "寝室複数",
            amenities: ["温泉 (アルカリ性単純温泉)", "サウナ", "囲炉裏", "フルキッチン", "洗濯機", "Wi-Fi", "駐車場3台", "食事サービス対応", "ケータリング"],
        },
        address: "〒413-0231 静岡県伊東市富戸字先原1317-1151",
        accessNotes: ["伊豆急行線「伊豆高原駅」より車約9分"],
        officialSiteUrl: "https://hi-ire.com/",
        redirectId: "hiire-futo",
        isClient: false,
        featured: false,
        publishedAt: "2026-05-09",
    },
    {
        id: "villa-sanctuary",
        name: "Villa Sanctuary",
        catchcopy: "吉田川沿い 一組限定の隠れ家",
        area: { region: "chubu", prefecture: "岐阜県", city: "郡上市" },
        capacity: { min: 1, max: 5 },
        pricePerPersonFrom: 12000,
        features: ["sauna", "private", "mountain-view", "bbq", "fire"],
        useCases: ["couple", "friends", "family"],
        mainPhoto: "https://villa-sanctuary.com/asset/images/hero_pc.jpg",
        gallery: [
            { src: "https://villa-sanctuary.com/asset/images/hero_pc.jpg", category: "外観" },
            { src: "https://villa-sanctuary.com/asset/images/concept_pc.jpg", category: "コンセプト" },
            { src: "https://villa-sanctuary.com/asset/images/place_img01_tb_pc.jpg", category: "周辺" },
            { src: "https://villa-sanctuary.com/asset/images/place_img02_tb_pc.jpg", category: "周辺" },
            { src: "https://villa-sanctuary.com/asset/images/room01.jpg", category: "客室" },
            { src: "https://villa-sanctuary.com/asset/images/room03.jpg", category: "客室" },
            { src: "https://villa-sanctuary.com/asset/images/room05.jpg", category: "客室" },
            { src: "https://villa-sanctuary.com/asset/images/sauna-main_pc.jpg", category: "サウナ" },
            { src: "https://villa-sanctuary.com/asset/images/sauna02.jpg", category: "サウナ" },
            { src: "https://villa-sanctuary.com/asset/images/sauna04.jpg", category: "サウナ" },
        ],
        description: "岐阜県郡上市八幡町、吉田川沿いに建つ一組限定の貸別荘。最大5名、国産ヒノキのバレルサウナと天然河川の水風呂、薪ストーブとBBQを備える。",
        specs: {
            checkIn: "15:00 - 22:00",
            checkOut: "11:00",
            cancellation: "予約サイト規定に準ずる",
            sauna: { selfRoukyu: true, entertainment: "国産ヒノキ バレルサウナ + 天然河川 水風呂" },
            bedroom: "セミダブル × 2 + シングル × 3 (5ベッド)",
            amenities: ["バレルサウナ", "天然河川 水風呂", "BBQガスコンロ", "薪ストーブ (薪別)", "フルキッチン", "Wi-Fi", "洗濯機 / 乾燥機", "駐車場"],
        },
        address: "岐阜県郡上市八幡町 (詳細は予約後通知)",
        accessNotes: ["道の駅明宝より車3分", "郡上八幡市街地より車15分", "めいほうスキー場まで車20分"],
        officialSiteUrl: "https://villa-sanctuary.com/",
        redirectId: "villa-sanctuary",
        isClient: false,
        featured: false,
        publishedAt: "2026-05-09",
    },
    {
        id: "mysa-fuji",
        name: "mysa fuji",
        catchcopy: "1日1組 富士の森サウナ別荘",
        area: { region: "chubu", prefecture: "山梨県", city: "富士河口湖町" },
        capacity: { min: 1, max: 10 },
        pricePerPersonFrom: 12000,
        features: ["sauna", "private", "lake-view", "mountain-view", "bbq", "fire", "modern", "luxury", "pet-ok", "anniversary"],
        useCases: ["friends", "family", "couple", "corporate"],
        mainPhoto: "https://hotel-mysa-fuji.com/wp-content/uploads/2023/11/1.jpeg",
        gallery: [
            { src: "https://hotel-mysa-fuji.com/wp-content/uploads/2023/11/1.jpeg", category: "外観" },
            { src: "https://hotel-mysa-fuji.com/wp-content/uploads/2023/11/2.jpeg", category: "外観" },
            { src: "https://hotel-mysa-fuji.com/wp-content/uploads/2023/11/6.jpeg", category: "リビング" },
            { src: "https://hotel-mysa-fuji.com/wp-content/uploads/2023/11/10.jpeg", category: "サウナ" },
            { src: "https://hotel-mysa-fuji.com/wp-content/uploads/2023/11/15.jpeg", category: "客室" },
            { src: "https://hotel-mysa-fuji.com/wp-content/uploads/2023/11/20.jpeg", category: "BBQ" },
            { src: "https://hotel-mysa-fuji.com/wp-content/uploads/2023/11/22.jpeg", category: "焚き火" },
        ],
        description: "山梨県富士河口湖町、敷地570㎡の貸切ヴィラ。1日1組・最大10名、特注サウナ・BBQテラス・焚き火・4Kシアターを完備。小型犬同伴可。",
        specs: {
            checkIn: "予約サイト参照",
            checkOut: "予約サイト参照",
            cancellation: "予約サイト規定に準ずる",
            sauna: { selfRoukyu: true },
            bedroom: "3SLDK / 寝室 × 3",
            amenities: ["特注セルフロウリュサウナ", "屋根付BBQテラス", "ファイヤーピット (焚き火)", "4Kシアター", "特注5mキッチン", "床暖房", "Wi-Fi", "無料駐車場", "ペット可 (小型犬2匹・各10kg以下)"],
        },
        address: "〒401-0331 山梨県南都留郡富士河口湖町長浜1838-2",
        accessNotes: ["河口湖ICより車約12分", "河口湖駅より車約12分"],
        officialSiteUrl: "https://hotel-mysa-fuji.com/",
        redirectId: "mysa-fuji",
        isClient: false,
        featured: false,
        publishedAt: "2026-05-09",
    },
    {
        id: "mysa-yamanakako",
        name: "mysa yamanakako",
        catchcopy: "山中湖の森に潜む貸切ヴィラ",
        area: { region: "chubu", prefecture: "山梨県", city: "山中湖村" },
        capacity: { min: 1, max: 10 },
        pricePerNightFrom: 68600,
        pricePerPersonFrom: 6860,
        features: ["sauna", "private", "lake-view", "mountain-view", "bbq", "fire", "modern", "pet-ok"],
        useCases: ["friends", "family", "corporate", "couple"],
        mainPhoto: "https://www.img-ikyu.com/contents/common/image/acc6/00052086/0/org/13508039.jpg",
        gallery: [
            { src: "https://www.img-ikyu.com/contents/common/image/acc6/00052086/0/org/13508039.jpg", category: "外観" },
            { src: "https://www.img-ikyu.com/contents/common/image/acc6/00052086/1/org/13507529.jpg", category: "客室" },
            { src: "https://www.img-ikyu.com/contents/common/image/acc6/00052086/1/org/13507543.jpg", category: "客室" },
            { src: "https://www.img-ikyu.com/contents/common/image/acc6/00052086/1/org/13507575.jpg", category: "サウナ" },
            { src: "https://www.img-ikyu.com/contents/common/image/acc6/00052086/1/org/13507622.jpg", category: "リビング" },
            { src: "https://www.img-ikyu.com/contents/common/image/acc6/00052086/1/org/13507681.jpg", category: "BBQ" },
            { src: "https://www.img-ikyu.com/contents/common/image/acc6/00052086/1/org/13507733.jpg", category: "焚き火" },
            { src: "https://www.img-ikyu.com/contents/common/image/acc6/00052086/1/org/13507793.jpg", category: "外観" },
        ],
        description: "山梨県山中湖村、敷地1,400㎡・延床124㎡の貸切ヴィラ。最大10名、サウナ・焚き火・BBQ・シアター完備。山中湖ICから車15分、ペット可。",
        specs: {
            checkIn: "15:00 - 24:00",
            checkOut: "11:00",
            cancellation: "予約サイト規定に準ずる",
            sauna: { selfRoukyu: true },
            bedroom: "寝室 × 2 / ベッド10台",
            amenities: ["サウナ", "BBQ設備", "焚き火", "シアター", "フルキッチン", "Wi-Fi", "駐車場5台 (無料)", "ペット可 (小型犬2匹・10kg以下、別途3,300円)"],
        },
        address: "〒401-0502 山梨県南都留郡山中湖村平野1489-1",
        accessNotes: ["山中湖ICより車約15分"],
        officialSiteUrl: "https://www.ikyu.com/00052086/",
        redirectId: "mysa-yamanakako",
        isClient: false,
        featured: false,
        publishedAt: "2026-05-09",
    },
    {
        id: "the-time-fuji",
        name: "THE TIME FUJI",
        catchcopy: "河口湖畔 森の貸切ヴィラ",
        area: { region: "chubu", prefecture: "山梨県", city: "富士河口湖町" },
        capacity: { min: 1, max: 7 },
        pricePerNightFrom: 47040,
        pricePerPersonFrom: 6720,
        features: ["sauna", "private", "lake-view", "bbq", "fire", "pet-ok", "modern"],
        useCases: ["friends", "family", "couple"],
        mainPhoto: "https://prd-assets.chillnn.com/public/snack/studio/1862eada0262b0/1862eb54ca5188/1684931955157.studio.jpg",
        gallery: [
            { src: "https://prd-assets.chillnn.com/public/snack/studio/1862eada0262b0/1862eb54ca5188/1684931955157.studio.jpg", category: "外観" },
            { src: "https://prd-assets.chillnn.com/public/hotel/1862eb54ca5188/contents/186e9047559a5/1686377030958/1686377030958.jpg", category: "客室" },
            { src: "https://prd-assets.chillnn.com/public/snack/blockBgImg/1862eada0262b0/1862eb54ca5188/1679581221461.blockBgImg.jpg", category: "外観" },
        ],
        description: "山梨県富士河口湖町、最大7名の一棟貸切ヴィラ。約100㎡、サウナ・BBQ設備・駐車場4台完備。河口湖駅より車12分、湖畔徒歩5分。",
        specs: {
            checkIn: "15:00 - 21:00",
            checkOut: "11:00",
            cancellation: "30日前から50% / 14日前から100%",
            sauna: { selfRoukyu: true },
            bedroom: "寝室複数",
            amenities: ["サウナ", "BBQ設備", "焚き火スペース", "フルキッチン", "Wi-Fi", "駐車場4台 (無料)", "洗濯機 / 乾燥機", "ペット可 (小型犬2匹)"],
        },
        address: "〒401-0331 山梨県南都留郡富士河口湖町長浜1717-2",
        accessNotes: ["河口湖駅より車約12分", "河口湖湖畔まで徒歩5分"],
        officialSiteUrl: "https://thetime.snack.chillnn.com/ja/snack/6c870504-3e7c-49b8-b172-6efd732e4704",
        redirectId: "the-time-fuji",
        isClient: false,
        featured: false,
        publishedAt: "2026-05-09",
    },
    {
        id: "villa-saison-fuji",
        name: "VILLA SAISON FUJI",
        catchcopy: "富士望む河口湖の貸切ヴィラ",
        area: { region: "chubu", prefecture: "山梨県", city: "富士河口湖町" },
        capacity: { min: 2, max: 24 },
        pricePerNightFrom: 131140,
        pricePerPersonFrom: 5470,
        features: ["sauna", "private", "pool", "lake-view", "mountain-view", "bbq", "fire", "pet-ok", "luxury", "anniversary"],
        useCases: ["friends", "family", "corporate"],
        mainPhoto: "https://villa-saison-fuji.com/wp-content/uploads/2024/05/topintro_600_05.jpg",
        gallery: [
            { src: "https://villa-saison-fuji.com/wp-content/uploads/2024/05/topintro_600_05.jpg", category: "外観" },
            { src: "https://villa-saison-fuji.com/wp-content/uploads/2024/05/topsouna_600_01.jpg", category: "サウナ" },
            { src: "https://villa-saison-fuji.com/wp-content/uploads/2024/05/stay_750_03.jpg", category: "リビング" },
            { src: "https://villa-saison-fuji.com/wp-content/uploads/2024/05/stay_500_04.jpg", category: "リビング" },
            { src: "https://villa-saison-fuji.com/wp-content/uploads/2024/05/stay_500_06.jpg", category: "リビング" },
            { src: "https://villa-saison-fuji.com/wp-content/uploads/2024/05/stay_500_07.jpg", category: "リビング" },
            { src: "https://villa-saison-fuji.com/wp-content/uploads/2023/12/bedroom_750.jpg", category: "客室" },
            { src: "https://villa-saison-fuji.com/wp-content/uploads/2023/12/bedroom_500_01.jpg", category: "客室" },
            { src: "https://villa-saison-fuji.com/wp-content/uploads/2023/02/dining_750_01-1.jpg", category: "ダイニング" },
            { src: "https://villa-saison-fuji.com/wp-content/uploads/2024/05/wedding_900_03.jpg", category: "ウェディング" },
        ],
        description: "山梨県富士河口湖町、敷地1,190坪を1組貸切。最大24名、富士山ビューのプール・サウナ・BBQ・300坪ドッグラン完備。",
        specs: {
            checkIn: "15:00 - 18:00",
            checkOut: "11:00",
            cancellation: "予約サイト規定に準ずる",
            sauna: { selfRoukyu: true, entertainment: "ハイデザインサウナ + ジャグジー" },
            bedroom: "本館3BR (キング1 + シングル4 + 2段ベッド2) + 別館和室3室",
            amenities: ["プライベートプール (7×4×1.2m, 温水期間あり)", "ハイデザインサウナ", "ジャグジー", "300坪ドッグラン", "屋根付BBQデッキ", "ファイヤーピット", "薪ストーブ", "75型TV", "通信カラオケ", "Wi-Fi", "9名乗り送迎車"],
        },
        address: "〒401-0310 山梨県南都留郡富士河口湖町勝山380",
        accessNotes: ["富士急行線「河口湖駅」より車約10分", "送迎車あり (河口湖駅⇔施設)"],
        officialSiteUrl: "https://villa-saison-fuji.com/",
        redirectId: "villa-saison-fuji",
        isClient: false,
        featured: false,
        publishedAt: "2026-05-09",
    },

    // === 実データ ===
    {
        id: "mysa-hakone",
        name: "mysa hakone",
        catchcopy: "森の中、1日1組のサウナ別荘",
        area: { region: "kanto", prefecture: "神奈川県", city: "箱根町" },
        capacity: { min: 1, max: 9 },
        pricePerNightFrom: 33000,
        pricePerPersonFrom: 8300,
        features: ["sauna", "private", "bbq", "fire", "pet-ok", "mountain-view", "luxury"],
        useCases: ["friends", "family", "couple"],
        mainPhoto: "https://hotel-mysa.com/wp-content/uploads/2022/10/s_myh_50-1.jpg",
        gallery: [
            { src: "https://hotel-mysa.com/wp-content/uploads/2022/10/s_myh_50-1.jpg" },
            { src: "https://hotel-mysa.com/wp-content/uploads/2022/10/s_myh_18-1.jpg" },
            { src: "https://hotel-mysa.com/wp-content/uploads/2022/10/s_myh_47-1.jpg" },
            { src: "https://hotel-mysa.com/wp-content/uploads/2022/10/s_myh_42.jpg" },
            { src: "https://hotel-mysa.com/wp-content/uploads/2022/10/s_myh_33-1.jpg" },
            { src: "https://hotel-mysa.com/wp-content/uploads/2022/10/s_myh_59-1.jpg" },
            { src: "https://hotel-mysa.com/wp-content/uploads/2022/10/A20220717-78-scaled.jpg" },
            { src: "https://hotel-mysa.com/wp-content/uploads/2022/10/A20220717-76-scaled.jpg" },
            { src: "https://hotel-mysa.com/wp-content/uploads/2022/10/s_myh_39-1.jpg" },
        ],
        description:
            "箱根登山鉄道「彫刻の森駅」から徒歩8分。森に囲まれた1日1組限定の貸別荘。133㎡の貸切空間に、サウナ・焚き火・BBQ・シアターを完備。最大9名・ペット同伴可。GORA BREWERYクラフトビール6本付きプランあり。",
        specs: {
            checkIn: "15:00 〜 24:00",
            checkOut: "11:00",
            cancellation: "予約システム規約に準ずる (要事前確認)",
            sauna: { selfRoukyu: false },
            bedroom: "133㎡の貸切空間",
            amenities: [
                "フルキッチン",
                "シアター設備",
                "BBQ",
                "焚き火",
                "クラフトビール特典",
                "Wi-Fi",
                "駐車場 2台 (縦列・無料)",
                "ペット同伴可",
            ],
        },
        address: "〒250-0407 神奈川県足柄下郡箱根町二ノ平1230-60",
        accessNotes: ["箱根登山鉄道「彫刻の森駅」 徒歩8分", "敷地内駐車場 2台 (縦列)"],
        officialSiteUrl: "https://hotel-mysa.com/",
        redirectId: "mysa-hakone",
        isClient: false,
        featured: false,
        publishedAt: "2026-05-06",
    },
];

/** 全物件取得 (新着順) */
export function getAllProperties(): Property[] {
    return [...PROPERTIES].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

/** slugから物件取得 */
export function getProperty(slug: string): Property | undefined {
    return PROPERTIES.find((p) => p.id === slug);
}

/** featured物件のみ */
export function getFeaturedProperties(): Property[] {
    return getAllProperties().filter((p) => p.featured);
}

/** TikTok動画ありの物件 (動画URL付きのもの、新着順) */
export function getTikTokProperties(): Property[] {
    return getAllProperties().filter((p) => !!p.tiktokVideoUrl);
}

/** リージョン別 */
export function getPropertiesByRegion(region: string): Property[] {
    return getAllProperties().filter((p) => p.area.region === region);
}

/** 特徴タグ別 */
export function getPropertiesByFeature(feature: string): Property[] {
    return getAllProperties().filter((p) => (p.features as string[]).includes(feature));
}

/**
 * 似てる宿アルゴリズム。
 * 同地域・共通機能・共通ユースケースで類似度スコア化、降順で返す。
 */
export function getSimilarProperties(target: Property, limit = 6): Property[] {
    const scored = PROPERTIES.filter((p) => p.id !== target.id).map((p) => {
        let score = 0;
        // 同県 +5、同地域(関西/関東等) +2
        if (p.area.prefecture === target.area.prefecture) score += 5;
        else if (p.area.region === target.area.region) score += 2;
        // 共通機能 +3 each (上限15)
        const sharedFeatures = p.features.filter((f) => target.features.includes(f));
        score += Math.min(15, sharedFeatures.length * 3);
        // 共通ユースケース +2 each
        const sharedUseCases = p.useCases.filter((u) => target.useCases.includes(u));
        score += sharedUseCases.length * 2;
        // 同定員ゾーン +2
        const zone = (c: number) => (c <= 2 ? 1 : c <= 5 ? 2 : c <= 10 ? 3 : 4);
        if (zone(p.capacity.max) === zone(target.capacity.max)) score += 2;
        return { p, score };
    });
    return scored.sort((a, b) => b.score - a.score).slice(0, limit).map((s) => s.p);
}

/** 同エリアの宿 (同regionで自分以外) */
export function getSameRegionProperties(target: Property, limit = 6): Property[] {
    return getAllProperties()
        .filter((p) => p.id !== target.id && p.area.region === target.area.region)
        .slice(0, limit);
}

// 検索ロジックは search.ts に分離。後方互換のため re-export.
export { searchProperties } from "./search";

/**
 * 検索エンジン.
 *
 * 設計思想 (実際のユーザー検索行動から逆算):
 * - 多くは日本語入力。「滋賀 サウナ」「カップル 沖縄」「軽井沢」のような複合クエリ
 * - スペース区切りで AND 検索。1つでも欠けたらヒットしない
 * - 表記ゆれ吸収: ひらがな↔カタカナ、半角↔全角、英字大文字小文字
 * - シノニム展開: 「関西=近畿」「ペット=犬OK」「軽井沢→長野」など実利用に即した辞書
 * - スコアリング: 宿名 > 県・市 > 機能タグ・利用シーン > リージョン > キャッチ
 */

import type { Property } from "./types";
import { REGION_LABEL, FEATURE_LABEL, USE_CASE_LABEL } from "./types";
import { getAllProperties } from "./properties";

/** 表記ゆれ正規化 */
function normalize(s: string): string {
    return s
        .toLowerCase()
        // 全角英数 → 半角
        .replace(/[Ａ-Ｚａ-ｚ０-９]/g, (c) => String.fromCharCode(c.charCodeAt(0) - 0xfee0))
        // 全角スペース → 半角
        .replace(/　/g, " ")
        // ひらがな → カタカナ (さうな→サウナ)
        .replace(/[ぁ-ゖ]/g, (c) => String.fromCharCode(c.charCodeAt(0) + 0x60))
        .trim();
}

/**
 * シノニム辞書. キー (正規化済み) → 同義語の配列.
 * クエリトークンがキーまたは同義語のどれかにマッチしたら、配列全体に展開する.
 */
const SYNONYM_GROUPS: string[][] = [
    // 体験・機能
    ["サウナ", "sauna"],
    ["プール", "pool", "ぷーる"],
    ["温泉", "オンセン", "湯", "露天風呂"],
    ["貸切", "貸し切り", "1棟", "一棟", "プライベート", "貸し", "丸ごと"],
    ["bbq", "バーベキュー", "ばーべきゅー"],
    ["焚き火", "焚火", "たき火", "キャンプファイア"],
    ["古民家", "コミンカ", "伝統", "和"],
    ["モダン", "modern", "現代"],
    ["ラグジュアリー", "luxury", "高級", "贅沢", "リッチ"],
    ["ペット", "ペット可", "犬", "犬ok", "イヌ", "ワンちゃん", "ドッグ"],
    ["記念日", "アニバーサリー", "誕生日", "結婚記念日", "プロポーズ", "サプライズ"],
    ["オーシャンビュー", "オーシャン", "海", "海辺", "海近", "ビーチ", "シービュー"],
    ["レイクビュー", "湖", "湖畔"],
    ["山景", "山", "マウンテン", "山中", "山岳", "森"],
    // 利用シーン
    ["カップル", "二人", "ふたり", "デート", "couple"],
    ["友人グループ", "友達", "友人", "グループ", "学生", "卒業旅行"],
    ["家族", "ファミリー", "子連れ", "親子"],
    ["法人合宿", "合宿", "法人", "ビジネス", "チームビルディング", "コーポレート", "会社", "研修"],
    ["ひとり", "一人", "ソロ", "おひとり様"],
    // リージョン
    ["北海道"],
    ["東北", "青森", "岩手", "宮城", "秋田", "山形", "福島"],
    ["関東", "東京", "神奈川", "千葉", "埼玉", "群馬", "茨城", "栃木"],
    ["中部", "近畿", "新潟", "富山", "石川", "福井", "山梨", "長野", "岐阜", "静岡", "愛知"],
    ["近畿", "関西", "京都", "大阪", "兵庫", "奈良", "滋賀", "和歌山", "三重"],
    ["中国地方", "鳥取", "島根", "岡山", "広島", "山口"],
    ["四国", "徳島", "香川", "愛媛", "高知"],
    ["九州", "福岡", "佐賀", "長崎", "熊本", "大分", "宮崎", "鹿児島"],
    ["沖縄"],
    // 有名地名 → 代表都道府県 / 機能
    ["軽井沢", "長野"],
    ["ニセコ", "北海道"],
    ["富良野", "北海道"],
    ["由布院", "湯布院", "大分"],
    ["屋久島", "鹿児島"],
    ["宮古島", "沖縄"],
    ["石垣島", "沖縄"],
    ["城崎", "兵庫"],
    ["白馬", "長野"],
    ["伊豆", "静岡"],
    ["箱根", "神奈川"],
    ["奥多摩", "東京"],
    ["大島", "東京"],
    ["志摩", "三重"],
    ["阿蘇", "熊本"],
    ["室戸", "高知"],
    ["直島", "香川"],
    ["宮島", "広島"],
    ["高島", "滋賀"],
    // 別表記
    ["ヴィラ", "ビラ", "villa"],
    ["宿", "やど", "ホテル", "旅館"],
    ["雪", "スキー", "スノー", "冬"],
    ["夏", "summer", "海水浴"],
    ["秋", "紅葉"],
    ["春", "花見", "桜"],
];

// 正規化済みシノニムインデックス (語 → 同じグループ内の他の語)
const SYNONYM_INDEX = new Map<string, string[]>();
SYNONYM_GROUPS.forEach((group) => {
    const normalized = group.map(normalize);
    normalized.forEach((word) => {
        const existing = SYNONYM_INDEX.get(word) ?? [];
        SYNONYM_INDEX.set(word, [...new Set([...existing, ...normalized])]);
    });
});

/** クエリトークンからシノニム展開した語のリストを返す */
function expandToken(rawToken: string): string[] {
    const normalized = normalize(rawToken);
    return SYNONYM_INDEX.get(normalized) ?? [normalized];
}

interface ScoredProperty {
    p: Property;
    score: number;
}

/**
 * 物件検索メインエントリ.
 * @example
 *   searchProperties("滋賀 サウナ") // → AO が筆頭
 *   searchProperties("カップル 沖縄") // → 沖縄のカップル向け宿一覧
 *   searchProperties("軽井沢") // → KARUIZAWA RETREAT (軽井沢→長野シノニム)
 */
export function searchProperties(query: string): Property[] {
    if (!query.trim()) return [];
    const tokens = normalize(query).split(/\s+/).filter(Boolean);
    if (tokens.length === 0) return [];

    const scored: ScoredProperty[] = [];

    for (const p of getAllProperties()) {
        const featuresJp = p.features.map((f) => FEATURE_LABEL[f]);
        const useCasesJp = p.useCases.map((u) => USE_CASE_LABEL[u]);
        const regionJp = REGION_LABEL[p.area.region];

        // フィールド別の正規化済みテキスト
        const nameN = normalize(p.name + " " + p.id);
        const prefN = normalize(p.area.prefecture);
        const cityN = normalize(p.area.city);
        const featureN = normalize(featuresJp.join(" "));
        const useCaseN = normalize(useCasesJp.join(" "));
        const regionN = normalize(regionJp);
        const catchN = normalize(p.catchcopy);
        const descN = normalize(p.description);

        // 全トークンが (シノニム展開含めて) どこかに含まれる必要 (AND)
        let allMatch = true;
        let totalScore = 0;

        for (const token of tokens) {
            const variants = expandToken(token);

            // このトークンがどのフィールドに当たったか
            const matched = {
                name: false,
                pref: false,
                city: false,
                feature: false,
                useCase: false,
                region: false,
                catch: false,
                desc: false,
            };

            for (const v of variants) {
                if (nameN.includes(v)) matched.name = true;
                if (prefN.includes(v)) matched.pref = true;
                if (cityN.includes(v)) matched.city = true;
                if (featureN.includes(v)) matched.feature = true;
                if (useCaseN.includes(v)) matched.useCase = true;
                if (regionN.includes(v)) matched.region = true;
                if (catchN.includes(v)) matched.catch = true;
                if (descN.includes(v)) matched.desc = true;
            }

            const tokenHit = Object.values(matched).some(Boolean);
            if (!tokenHit) {
                allMatch = false;
                break;
            }

            // フィールド別重み付けスコア (重複加算しない)
            if (matched.name) totalScore += 10;
            if (matched.pref) totalScore += 5;
            if (matched.city) totalScore += 4;
            if (matched.feature) totalScore += 3;
            if (matched.useCase) totalScore += 3;
            if (matched.region) totalScore += 2;
            if (matched.catch) totalScore += 2;
            if (matched.desc) totalScore += 1;
        }

        if (allMatch && totalScore > 0) {
            // featured な宿は同点時に先に出るよう微加点
            if (p.featured) totalScore += 0.5;
            scored.push({ p, score: totalScore });
        }
    }

    return scored
        .sort((a, b) => b.score - a.score)
        .map((s) => s.p);
}

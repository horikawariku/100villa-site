import type { Property } from "@/data/types";

/**
 * カテゴリ行の並び分散。
 * getAllProperties() は新着順のため、一括追加した宿群 (同じ publishedAt) が
 * 全セクションの先頭に同じ順で固まる。ここでは:
 *   1. クライアント宿 (成果報酬あり) を先頭 (元の順のまま)
 *   2. それ以外は seed+id のハッシュ順 = 行ごとに異なる決定的な並び
 * にして「いろんな宿がある」見え方を作る (SSRとハイドレーションで一致する)。
 */
export function diversify(list: Property[], seed: string): Property[] {
    const hash = (s: string) => {
        let x = 0;
        for (let i = 0; i < s.length; i++) x = (x * 31 + s.charCodeAt(i)) >>> 0;
        return x;
    };
    const clients = list.filter((p) => p.isClient);
    const rest = list
        .filter((p) => !p.isClient)
        .slice()
        .sort((a, b) => hash(seed + a.id) - hash(seed + b.id));
    return [...clients, ...rest];
}

import type { Property } from "@/data/types";

/**
 * カテゴリ行の並び分散。
 * getAllProperties() は新着順のため、一括追加した宿群 (同じ publishedAt) が
 * 全セクションの先頭に同じ順で固まる。ここでは:
 *   - pin: 指定IDをその順で先頭固定
 *   - clientsFirst: true ならクライアント宿を先に (既定は false = 完全分散)
 *   - 残りは seed+id のハッシュ順 = 行ごとに異なる決定的な並び (SSRと一致)
 */
export function diversify(
    list: Property[],
    seed: string,
    opts?: { pin?: string[]; clientsFirst?: boolean },
): Property[] {
    const hash = (s: string) => {
        let x = 0;
        for (let i = 0; i < s.length; i++) x = (x * 31 + s.charCodeAt(i)) >>> 0;
        return x;
    };
    const pinIds = opts?.pin ?? [];
    const pinned = pinIds
        .map((id) => list.find((p) => p.id === id))
        .filter((p): p is Property => !!p);
    const rest = list.filter((p) => !pinIds.includes(p.id));
    const hashSort = (arr: Property[]) =>
        arr.slice().sort((a, b) => hash(seed + a.id) - hash(seed + b.id));
    if (opts?.clientsFirst) {
        return [...pinned, ...rest.filter((p) => p.isClient), ...hashSort(rest.filter((p) => !p.isClient))];
    }
    return [...pinned, ...hashSort(rest)];
}

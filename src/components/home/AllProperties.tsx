import { getAllProperties } from "@/data/properties";
import { diversify } from "@/lib/diversify";
import { PropertyRow } from "./PropertyRow";

/** 先頭固定の提携宿 (この順で並ぶ)。以降はクライアント宿 → その他 (分散順) */
const PIN_ORDER = ["ao-villa", "mysa-fuji", "mysa-yamanakako", "mysa-hakone", "gozahills"];

/** 全宿一覧 (Airbnb調の横スクロール行) */
export function AllProperties() {
    const all = getAllProperties();
    const pinned = PIN_ORDER.map((id) => all.find((p) => p.id === id)).filter(
        (p): p is NonNullable<typeof p> => !!p,
    );
    const rest = diversify(all.filter((p) => !PIN_ORDER.includes(p.id)), "all", { clientsFirst: true });
    return (
        <PropertyRow
            id="all"
            title="全ての宿"
            suffix={`${all.length}件`}
            href="/search"
            properties={[...pinned, ...rest]}
            withVt
        />
    );
}

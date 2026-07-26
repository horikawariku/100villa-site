import Link from "next/link";
import type { Property } from "@/data/types";
import { PropertyCard } from "@/components/property/PropertyCard";

interface Props {
    /** アンカー用ID (任意) */
    id?: string;
    title: string;
    /** 見出し右の補助 (件数等・任意) */
    suffix?: string;
    /** 「すべて見る」リンク先 (任意) */
    href?: string;
    properties: Property[];
    /** View Transition名を付与する (ページ内で同じ宿が重複しない行のみ true) */
    withVt?: boolean;
}

/** Airbnb調のカテゴリ行: コンパクト見出し + カードの横スクロール */
export function PropertyRow({ id, title, suffix, href, properties, withVt }: Props) {
    if (properties.length === 0) return null;
    return (
        <section id={id} className="py-5 md:py-7">
            <div className="container mx-auto px-5 md:px-7 mb-3.5 md:mb-4 flex items-baseline justify-between gap-4">
                <h2 className="font-sans text-[19px] md:text-[22px] font-bold text-ink tracking-[0.005em]">
                    {title}
                    {suffix && (
                        <span className="text-xs md:text-sm font-normal text-mute ml-2.5" style={{ fontVariantNumeric: "tabular-nums" }}>
                            {suffix}
                        </span>
                    )}
                </h2>
                {href && (
                    <Link
                        href={href}
                        className="text-[12px] text-ink-soft hover:text-ink underline underline-offset-4 decoration-line-strong shrink-0 whitespace-nowrap"
                    >
                        すべて見る →
                    </Link>
                )}
            </div>
            <div className="overflow-x-auto no-scrollbar strip-snap">
                <div className="inline-flex gap-3 md:gap-4 px-5 md:px-7 items-start">
                    {properties.map((p) => (
                        <PropertyCard key={p.id} property={p} size="sm" vtName={withVt ? `photo-${p.id}` : undefined} />
                    ))}
                    <div className="w-3 shrink-0" />
                </div>
            </div>
        </section>
    );
}

import { PropertyCard } from "./PropertyCard";
import type { Property } from "@/data/types";

interface Props {
    label: string;
    en: string;
    properties: Property[];
}

export function SimilarProperties({ label, en, properties }: Props) {
    if (properties.length === 0) return null;
    return (
        <section className="border-t border-line py-12 md:py-16">
            <div className="container mx-auto px-5 md:px-7">
                <div className="mb-6 md:mb-8">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-gold-deep font-display mb-1.5">
                        {en}
                    </p>
                    <h2 className="font-mincho text-xl md:text-2xl font-bold tracking-wide">{label}</h2>
                </div>
                {/* モバイル: 横スクロール / デスクトップ: グリッド */}
                <div className="md:hidden flex overflow-x-auto no-scrollbar gap-3 pb-2">
                    {properties.map((p) => (
                        <PropertyCard key={p.id} property={p} size="sm" />
                    ))}
                </div>
                <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {properties.map((p) => (
                        <PropertyCard key={p.id} property={p} size="md" />
                    ))}
                </div>
            </div>
        </section>
    );
}

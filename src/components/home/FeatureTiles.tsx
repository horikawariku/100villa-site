import Link from "next/link";
import { FEATURE_LABEL, type FeatureTag } from "@/data/types";
import { getAllProperties } from "@/data/properties";

const FEATURES: FeatureTag[] = [
    "sauna",
    "private",
    "pool",
    "ocean-view",
    "onsen",
    "bbq",
    "fire",
    "kominka",
    "anniversary",
    "pet-ok",
];

export function FeatureTiles() {
    const all = getAllProperties();
    const counts = FEATURES.reduce<Record<string, number>>((acc, f) => {
        acc[f] = all.filter((p) => (p.features as string[]).includes(f)).length;
        return acc;
    }, {});

    return (
        <section id="feature" className="py-9 md:py-12">
            <div className="container mx-auto px-5 md:px-7 mb-8 md:mb-10">
                <div className="text-center">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-gold-deep font-display mb-2">Feature</p>
                    <h2 className="font-mincho text-2xl md:text-3xl font-bold tracking-wide">体験から探す</h2>
                </div>
            </div>
            {/* 横スクロール */}
            <div className="overflow-x-auto no-scrollbar">
                <div className="inline-flex gap-2 md:gap-3 px-5 md:px-7">
                    {FEATURES.map((f) => (
                        <Link
                            key={f}
                            href={`/feature/${f}`}
                            className="group inline-flex items-center gap-2 px-4 py-2.5 border border-line bg-bg hover:border-gold hover:bg-gold hover:text-bg transition-colors shrink-0 whitespace-nowrap"
                        >
                            <span className="text-sm tracking-wide font-medium">{FEATURE_LABEL[f]}</span>
                            <span className="text-[10px] tracking-widest text-mute group-hover:text-bg/65 font-display">
                                {counts[f]}
                            </span>
                        </Link>
                    ))}
                    <div className="w-3 shrink-0" />
                </div>
            </div>
        </section>
    );
}

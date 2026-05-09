import Link from "next/link";
import Image from "next/image";
import { FEATURE_LABEL, type FeatureTag } from "@/data/types";
import { FEATURE_IMAGE } from "@/data/featureImages";
import { getAllProperties } from "@/data/properties";
import { SectionHeader } from "./SectionHeader";

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
        <section id="feature" className="py-6 md:py-8">
            <div className="container mx-auto px-5 md:px-7">
                <SectionHeader eyebrow="Feature" title="体験から探す" />
            </div>
            {/* 横スクロール (写真付きタイル) */}
            <div className="overflow-x-auto no-scrollbar">
                <div className="inline-flex gap-2 md:gap-3 px-5 md:px-7">
                    {FEATURES.map((f) => (
                        <Link
                            key={f}
                            href={`/feature/${f}`}
                            className="group relative w-[36vw] sm:w-[200px] md:w-[220px] aspect-[4/5] shrink-0 overflow-hidden bg-ink"
                        >
                            <Image
                                src={FEATURE_IMAGE[f]}
                                alt={FEATURE_LABEL[f]}
                                fill
                                className="object-cover opacity-80 group-hover:opacity-95 group-hover:scale-[1.05] transition-all duration-700"
                                sizes="(max-width: 640px) 36vw, 220px"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                            <div className="absolute inset-x-0 bottom-0 p-3 md:p-4 text-bg">
                                <p className="text-[9px] tracking-[0.25em] uppercase text-bg/65 font-display mb-0.5">
                                    {f.toUpperCase()}
                                </p>
                                <div className="flex items-baseline justify-between gap-2">
                                    <h3 className="font-mincho text-sm md:text-base font-bold tracking-wide leading-none">
                                        {FEATURE_LABEL[f]}
                                    </h3>
                                    <span className="font-display text-[10px] tracking-widest text-bg/65 shrink-0">
                                        {counts[f]}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                    <div className="w-3 shrink-0" />
                </div>
            </div>
        </section>
    );
}

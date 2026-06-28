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
        <section id="feature" className="py-10 md:py-14 bg-bg-alt">
            <div className="container mx-auto px-5 md:px-7">
                <SectionHeader en="Experiences" jp="体験から探す" />
            </div>
            <div className="overflow-x-auto no-scrollbar">
                <div className="inline-flex gap-3 md:gap-4 px-5 md:px-7">
                    {FEATURES.map((f) => (
                        <Link
                            key={f}
                            href={`/feature/${f}`}
                            className="group relative w-[36vw] sm:w-[200px] md:w-[220px] aspect-[4/5] shrink-0 overflow-hidden rounded-xl bg-ink"
                        >
                            <Image
                                src={FEATURE_IMAGE[f]}
                                alt={FEATURE_LABEL[f]}
                                fill
                                className="object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                sizes="(max-width: 640px) 36vw, 220px"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                            <div className="absolute inset-x-0 bottom-0 p-3.5 md:p-4 text-bg">
                                <p className="text-[10px] tracking-[0.16em] uppercase text-bg/70 mb-1">
                                    {f}
                                </p>
                                <div className="flex items-baseline justify-between gap-2">
                                    <h3 className="font-sans text-base md:text-lg font-medium leading-none">
                                        {FEATURE_LABEL[f]}
                                    </h3>
                                    <span className="text-[11px] tracking-wide text-bg/65 shrink-0" style={{ fontVariantNumeric: "tabular-nums" }}>
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

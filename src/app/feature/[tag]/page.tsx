import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { PropertyCard } from "@/components/property/PropertyCard";
import { getPropertiesByFeature } from "@/data/properties";
import { FEATURE_LABEL, type FeatureTag } from "@/data/types";
import { siteMeta } from "@/data/siteMeta";

const FEATURES: FeatureTag[] = [
    "sauna", "private", "pool", "ocean-view", "lake-view", "mountain-view",
    "onsen", "bbq", "fire", "kominka", "modern", "luxury", "pet-ok", "anniversary",
];

export function generateStaticParams() {
    return FEATURES.map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: { params: Promise<{ tag: string }> }): Promise<Metadata> {
    const { tag } = await params;
    if (!FEATURES.includes(tag as FeatureTag)) return {};
    const label = FEATURE_LABEL[tag as FeatureTag];
    return {
        title: `${label}の宿一覧`,
        description: `${siteMeta.name} 編集部が選ぶ「${label}」のヴィラ・宿。`,
    };
}

export default async function FeaturePage({ params }: { params: Promise<{ tag: string }> }) {
    const { tag } = await params;
    if (!FEATURES.includes(tag as FeatureTag)) notFound();

    const list = getPropertiesByFeature(tag);
    const label = FEATURE_LABEL[tag as FeatureTag];

    return (
        <main className="pt-24 md:pt-32 pb-20 md:pb-24">
            <div className="container mx-auto px-5 md:px-7">
                <nav className="text-[10px] tracking-widest text-mute mb-4">
                    <Link href="/" className="hover:text-ink transition-colors">HOME</Link>
                    <span className="mx-2">/</span>
                    <span className="text-ink-soft">FEATURE / {label}</span>
                </nav>
                <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-gold-deep font-display mb-2">
                    Feature
                </p>
                <h1 className="font-sans text-3xl md:text-5xl font-bold tracking-wide mb-2">
                    {label}の宿
                </h1>
                <p className="text-sm tracking-widest text-mute mb-10 md:mb-14">{list.length} stays</p>

                {list.length === 0 ? (
                    <p className="text-sm text-mute">該当する宿はまだ掲載されていません。</p>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
                        {list.map((p) => (
                            <PropertyCard key={p.id} property={p} size="md" />
                        ))}
                    </div>
                )}

                {/* 他特徴への導線 */}
                <div className="mt-16 md:mt-20 pt-10 border-t border-line">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-gold-deep font-display mb-3">
                        Other Features
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {FEATURES.filter((f) => f !== tag).map((f) => (
                            <Link
                                key={f}
                                href={`/feature/${f}`}
                                className="text-xs tracking-widest px-3 py-2 border border-line hover:border-ink transition-colors"
                            >
                                {FEATURE_LABEL[f]}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}

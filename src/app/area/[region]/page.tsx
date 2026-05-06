import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { PropertyCard } from "@/components/property/PropertyCard";
import { getPropertiesByRegion } from "@/data/properties";
import { REGION_LABEL, type Region } from "@/data/types";
import { siteMeta } from "@/data/siteMeta";

const REGIONS: Region[] = ["hokkaido", "tohoku", "kanto", "chubu", "kansai", "chugoku", "shikoku", "kyushu", "okinawa"];

export function generateStaticParams() {
    return REGIONS.map((region) => ({ region }));
}

export async function generateMetadata({ params }: { params: Promise<{ region: string }> }): Promise<Metadata> {
    const { region } = await params;
    if (!REGIONS.includes(region as Region)) return {};
    const label = REGION_LABEL[region as Region];
    return {
        title: `${label}の宿一覧`,
        description: `${siteMeta.name} 編集部が選ぶ ${label} のヴィラ・宿。`,
    };
}

export default async function AreaPage({ params }: { params: Promise<{ region: string }> }) {
    const { region } = await params;
    if (!REGIONS.includes(region as Region)) notFound();

    const list = getPropertiesByRegion(region);
    const label = REGION_LABEL[region as Region];

    return (
        <main className="pt-24 md:pt-32 pb-20 md:pb-24">
            <div className="container mx-auto px-5 md:px-7">
                <nav className="text-[10px] tracking-widest text-mute mb-4">
                    <Link href="/" className="hover:text-ink transition-colors">HOME</Link>
                    <span className="mx-2">/</span>
                    <span className="text-ink-soft">AREA / {label}</span>
                </nav>
                <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-gold-deep font-display mb-2">
                    Area
                </p>
                <h1 className="font-mincho text-3xl md:text-5xl font-bold tracking-wide mb-2">{label}</h1>
                <p className="text-sm tracking-widest text-mute mb-10 md:mb-14">{list.length} stays</p>

                {list.length === 0 ? (
                    <p className="text-sm text-mute">この地域の宿はまだ掲載されていません。</p>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
                        {list.map((p) => (
                            <PropertyCard key={p.id} property={p} size="md" />
                        ))}
                    </div>
                )}

                {/* 他エリアへの導線 */}
                <div className="mt-16 md:mt-20 pt-10 border-t border-line">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-gold-deep font-display mb-3">
                        Other Areas
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {REGIONS.filter((r) => r !== region).map((r) => (
                            <Link
                                key={r}
                                href={`/area/${r}`}
                                className="text-xs tracking-widest px-3 py-2 border border-line hover:border-ink transition-colors"
                            >
                                {REGION_LABEL[r]}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}

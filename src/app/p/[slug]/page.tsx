import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Users, MapPin, Wifi, Flame, Tv, Calendar } from "lucide-react";
import { PROPERTIES, getProperty, getSimilarProperties, getSameRegionProperties } from "@/data/properties";
import { FEATURE_LABEL, REGION_LABEL } from "@/data/types";
import { siteMeta } from "@/data/siteMeta";
import { PropertyGallery } from "@/components/property/PropertyGallery";
import { OfficialSiteCTA } from "@/components/property/OfficialSiteCTA";
import { BookingCard } from "@/components/property/BookingCard";
import { SimilarProperties } from "@/components/property/SimilarProperties";
import { RecentlyViewed } from "@/components/property/RecentlyViewed";
import { RecordView } from "@/components/property/RecordView";
import { StickyMobileCTA } from "@/components/property/StickyMobileCTA";
import { TikTokEmbed } from "@/components/property/TikTokEmbed";

export function generateStaticParams() {
    return PROPERTIES.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const p = getProperty(slug);
    if (!p) return {};
    const title = `${p.name} — ${REGION_LABEL[p.area.region]} ${p.area.prefecture}`;
    return {
        title,
        description: `${p.catchcopy} / ${p.area.prefecture}${p.area.city} / 定員${p.capacity.min}〜${p.capacity.max}名 / ¥${p.pricePerPersonFrom.toLocaleString()}〜/人`,
        openGraph: {
            title,
            description: p.catchcopy,
            url: `${siteMeta.url}/p/${p.id}`,
            images: [{ url: p.mainPhoto, width: 1200, height: 630, alt: p.name }],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description: p.catchcopy,
            images: [p.mainPhoto],
        },
    };
}

export default async function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const p = getProperty(slug);
    if (!p) notFound();

    const similar = getSimilarProperties(p, 4);
    const sameRegion = getSameRegionProperties(p, 4);

    return (
        <main className="pt-16 md:pt-20 pb-24 md:pb-0">
            <RecordView propertyId={p.id} />

            {/* パンくず */}
            <nav className="container mx-auto px-5 md:px-7 mt-3 mb-5 text-[10px] tracking-widest text-mute">
                <Link href="/" className="hover:text-ink transition-colors">HOME</Link>
                <span className="mx-2">/</span>
                <Link href={`/area/${p.area.region}`} className="hover:text-ink transition-colors">
                    {REGION_LABEL[p.area.region]}
                </Link>
                <span className="mx-2">/</span>
                <span className="text-ink-soft">{p.name}</span>
            </nav>

            {/* タイトル + 主要情報 */}
            <div className="container mx-auto px-5 md:px-7 mb-6">
                <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-gold-deep font-display mb-2">
                    {REGION_LABEL[p.area.region]} / {p.area.prefecture}
                </p>
                <h1 className="font-mincho text-3xl md:text-5xl font-bold tracking-wide leading-tight mb-3">
                    {p.name}
                </h1>
                <p className="text-sm md:text-base text-ink-soft tracking-wide leading-relaxed mb-5 md:mb-6">
                    {p.catchcopy}
                </p>

                {/* 主要スペック行 */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-6">
                    <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-ink-soft" />
                        <span className="font-display text-sm font-medium">
                            {p.capacity.min}〜{p.capacity.max} <span className="text-mute text-xs">名</span>
                        </span>
                    </div>
                    <div className="font-display">
                        <span className="text-mute mr-0.5">¥</span>
                        <span className="text-lg font-bold">{p.pricePerPersonFrom.toLocaleString()}</span>
                        <span className="text-mute text-[11px] ml-0.5">〜 / 人</span>
                    </div>
                    {p.pricePerNightFrom && (
                        <div className="text-[11px] tracking-widest text-mute">
                            (1棟 ¥{p.pricePerNightFrom.toLocaleString()}〜)
                        </div>
                    )}
                </div>

                {/* タグ */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                    {p.features.map((f) => (
                        <Link
                            key={f}
                            href={`/feature/${f}`}
                            className="text-[11px] tracking-widest px-2.5 py-1 border border-line hover:border-ink transition-colors"
                        >
                            {FEATURE_LABEL[f]}
                        </Link>
                    ))}
                </div>

                {/* モバイル: トップCTA (デスクトップは BookingCard が代替) */}
                <div className="lg:hidden">
                    <OfficialSiteCTA property={p} placement="top" />
                </div>
            </div>

            {/* 写真ギャラリー (full-bleed) */}
            <PropertyGallery images={p.gallery} />

            {/* 2カラムレイアウト: コンテンツ + sticky BookingCard */}
            <div className="container mx-auto px-5 md:px-7 mt-12 md:mt-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
                    {/* 左カラム: コンテンツ */}
                    <div className="lg:col-span-7">
                        {/* 紹介文 */}
                        <p className="font-mincho text-base md:text-lg leading-loose tracking-wide text-ink-soft mb-12 md:mb-16">
                            {p.description}
                        </p>

                        {/* スペック表 */}
                        <div className="mb-12 md:mb-16">
                            <p className="text-[10px] tracking-[0.3em] uppercase text-gold-deep font-display mb-3">Specs</p>
                            <h2 className="font-mincho text-xl md:text-2xl font-bold tracking-wide mb-6">仕様</h2>
                            <dl className="divide-y divide-line border-y border-line">
                                {p.specs.checkIn && (
                                    <Row icon={<Calendar className="w-3.5 h-3.5" />} label="チェックイン / アウト">
                                        {p.specs.checkIn} / {p.specs.checkOut}
                                    </Row>
                                )}
                                <Row icon={<Users className="w-3.5 h-3.5" />} label="定員">
                                    {p.capacity.min}〜{p.capacity.max} 名
                                </Row>
                                {p.specs.bedroom && <Row label="寝具">{p.specs.bedroom}</Row>}
                                {p.specs.sauna && (
                                    <Row icon={<Flame className="w-3.5 h-3.5" />} label="サウナ">
                                        <div className="flex flex-wrap gap-x-4 gap-y-1">
                                            {p.specs.sauna.tempMax && (
                                                <span>サウナ室 最高 <strong>{p.specs.sauna.tempMax}℃</strong></span>
                                            )}
                                            {p.specs.sauna.tempMin && (
                                                <span>水風呂 最低 <strong>{p.specs.sauna.tempMin}℃</strong></span>
                                            )}
                                            {p.specs.sauna.selfRoukyu && <span>セルフロウリュ可</span>}
                                            {p.specs.sauna.entertainment && <span>{p.specs.sauna.entertainment}</span>}
                                            {p.specs.sauna.chairs && <span>整いチェア × {p.specs.sauna.chairs}</span>}
                                        </div>
                                    </Row>
                                )}
                                {p.specs.amenities && (
                                    <Row icon={<Wifi className="w-3.5 h-3.5" />} label="設備・アメニティ">
                                        {p.specs.amenities.join(" / ")}
                                    </Row>
                                )}
                                {p.specs.cancellation && (
                                    <Row label="キャンセルポリシー">{p.specs.cancellation}</Row>
                                )}
                                <Row icon={<MapPin className="w-3.5 h-3.5" />} label="所在地">
                                    {p.address}
                                </Row>
                                {p.accessNotes && (
                                    <Row label="アクセス">
                                        <div className="space-y-0.5">
                                            {p.accessNotes.map((n, i) => (
                                                <p key={i}>・{n}</p>
                                            ))}
                                        </div>
                                    </Row>
                                )}
                            </dl>
                        </div>

                        {/* TikTok */}
                        {p.tiktokVideoUrl && (
                            <div className="mb-12 md:mb-16">
                                <p className="text-[10px] tracking-[0.3em] uppercase text-gold-deep font-display mb-3">TikTok</p>
                                <h2 className="font-mincho text-xl md:text-2xl font-bold tracking-wide mb-5">
                                    TikTokで紹介中
                                </h2>
                                <TikTokEmbed url={p.tiktokVideoUrl} fallbackThumbnail={p.mainPhoto} title={p.name} />
                            </div>
                        )}

                        {/* マップ */}
                        {p.mapEmbedUrl && (
                            <div className="mb-12 md:mb-16">
                                <p className="text-[10px] tracking-[0.3em] uppercase text-gold-deep font-display mb-3">Map</p>
                                <h2 className="font-mincho text-xl md:text-2xl font-bold tracking-wide mb-5">アクセスマップ</h2>
                                <div className="w-full h-[300px] md:h-[400px] border border-line rounded-xl overflow-hidden">
                                    <iframe
                                        src={p.mapEmbedUrl}
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                    />
                                </div>
                            </div>
                        )}

                        {/* モバイル: 中部CTA (デスクトップは BookingCard が常時表示) */}
                        <div className="lg:hidden bg-bg-card/40 border border-line rounded-xl p-7 text-center mb-10">
                            <p className="text-[10px] tracking-[0.3em] uppercase text-gold-deep font-display mb-3">
                                Reserve
                            </p>
                            <h3 className="font-mincho text-xl font-bold tracking-wide mb-2">
                                詳細・空室確認は公式サイトへ
                            </h3>
                            <p className="text-xs tracking-wide text-mute mb-5">
                                日程の空室カレンダー、料金詳細は公式サイトでご確認ください
                            </p>
                            <OfficialSiteCTA property={p} placement="mid" />
                        </div>
                    </div>

                    {/* 右カラム: sticky BookingCard (lg+のみ表示) */}
                    <aside className="lg:col-span-5">
                        <BookingCard property={p} />
                    </aside>
                </div>
            </div>

            {/* 似てる宿 */}
            <SimilarProperties label="似てる宿" en="Similar Stays" properties={similar} />

            {/* 同エリア */}
            {sameRegion.length > 0 && (
                <SimilarProperties
                    label={`${REGION_LABEL[p.area.region]}の宿`}
                    en="Same Area"
                    properties={sameRegion}
                />
            )}

            {/* 最近見た */}
            <RecentlyViewed excludeId={p.id} />

            {/* 下部CTA */}
            <div className="container mx-auto px-5 md:px-7 max-w-3xl mt-14 md:mt-20 text-center">
                <OfficialSiteCTA property={p} placement="bottom" />
                <p className="text-[10px] tracking-widest text-mute mt-4">
                    予約は{p.name}公式サイトからどうぞ
                </p>
            </div>

            {/* モバイル sticky CTA */}
            <StickyMobileCTA property={p} />
        </main>
    );
}

function Row({ icon, label, children }: { icon?: React.ReactNode; label: string; children: React.ReactNode }) {
    return (
        <div className="grid grid-cols-[140px_1fr] md:grid-cols-[180px_1fr] py-3.5">
            <dt className="flex items-center gap-1.5 text-[11px] md:text-xs tracking-widest text-mute uppercase font-display">
                {icon}
                {label}
            </dt>
            <dd className="text-sm tracking-wide text-ink-soft leading-relaxed">{children}</dd>
        </div>
    );
}

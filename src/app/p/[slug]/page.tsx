import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Users, MapPin, Wifi, Flame, Tv, Calendar } from "lucide-react";
import { PROPERTIES, getProperty, getSimilarProperties, getSameRegionProperties } from "@/data/properties";
import { FEATURE_LABEL, REGION_LABEL } from "@/data/types";
import { siteMeta } from "@/data/siteMeta";
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
        other: {
            // 各物件ページのアクセスをproperty別に記録 (PropertyCardの本日閲覧数表示用)
            "rt-property": p.id,
        },
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
        <main className="pb-24 md:pb-0">
            <RecordView propertyId={p.id} />

            {/* ============================== */}
            {/* UNIQ 風フルブリード Hero */}
            {/* ============================== */}
            <section className="relative h-[82vh] md:h-[85vh] min-h-[560px] overflow-hidden bg-ink">
                <Image
                    src={p.mainPhoto}
                    alt={p.name}
                    fill
                    priority
                    className="object-cover"
                    sizes="100vw"
                />
                {/* 控えめ overlay (写真を見せる) */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/45" />
                {/* 微細グレイン */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.05] mix-blend-overlay"
                    style={{
                        backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='nf'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23nf)'/%3E%3C/svg%3E\")",
                    }}
                />

                {/* スクロールヒント (下部) */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-bg/70 text-[10px] tracking-[0.3em] uppercase">
                    scroll
                </div>
            </section>

            {/* ============================== */}
            {/* Hero 下から横スクロール ギャラリー (UNIQ 風: rounded-md + 控えめ shadow + 適切な余白) */}
            {/* Hero と画像セクションの間に明確な呼吸 (mt-14 md:mt-24) */}
            {/* ============================== */}
            <div className="relative mt-14 md:mt-24 mb-16 md:mb-24">
                <div className="overflow-x-auto no-scrollbar">
                    <div className="inline-flex gap-3 md:gap-4 px-5 md:px-10 pb-2">
                        {p.gallery.map((img, i) => (
                            <div
                                key={i}
                                className="relative w-[68vw] sm:w-[360px] md:w-[400px] lg:w-[440px] aspect-[4/5] overflow-hidden bg-line rounded-md shrink-0 group"
                                style={{ boxShadow: "0 20px 60px -20px rgba(20,14,10,0.35), 0 8px 24px -8px rgba(20,14,10,0.18)" }}
                            >
                                <Image
                                    src={img.src}
                                    alt={img.caption || `${p.name} ${i + 1}`}
                                    fill
                                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                                    sizes="(max-width: 640px) 68vw, 440px"
                                    priority={i < 2}
                                />
                                {img.caption && (
                                    <div className="absolute inset-x-0 bottom-0 p-3.5 md:p-4 bg-gradient-to-t from-black/65 via-black/20 to-transparent">
                                        <p className="text-bg/95 text-xs md:text-[13px] tracking-wide font-sans leading-snug">
                                            {img.caption}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))}
                        <div className="w-5 md:w-10 shrink-0" />
                    </div>
                </div>
            </div>

            {/* パンくず */}
            <nav className="container mx-auto px-5 md:px-10 mb-7 md:mb-8 text-[11px] tracking-[0.12em] text-mute">
                <Link href="/" className="hover:text-ink transition-colors duration-300">home</Link>
                <span className="mx-2 opacity-40">›</span>
                <Link href={`/area/${p.area.region}`} className="hover:text-ink transition-colors duration-300">
                    {REGION_LABEL[p.area.region]}
                </Link>
                <span className="mx-2 opacity-40">›</span>
                <span className="text-ink-soft">{p.name}</span>
            </nav>

            {/* タイトル + 主要情報 */}
            <div className="container mx-auto px-5 md:px-10 mb-10 md:mb-14">
                <p className="text-[11px] md:text-xs tracking-[0.18em] text-ink-soft font-medium uppercase mb-4">
                    {p.area.prefecture} — {REGION_LABEL[p.area.region]}
                </p>
                <h1
                    className="font-sans text-3xl md:text-5xl font-medium leading-[1.05] mb-6"
                    style={{ letterSpacing: "-0.01em", textWrap: "balance" }}
                >
                    {p.name}
                </h1>
                <p
                    className="text-base md:text-xl text-ink-soft leading-[1.85] mb-8 md:mb-10 max-w-[60ch] font-sans"
                    style={{ textWrap: "pretty" }}
                >
                    {p.catchcopy}
                </p>

                {/* 主要スペック行 — 価格を主役に */}
                <div className="flex flex-wrap items-baseline gap-x-7 gap-y-3 mb-7 text-ink">
                    <div className="font-sans text-2xl md:text-3xl font-medium" style={{ fontVariantNumeric: "tabular-nums" }}>
                        ¥{p.pricePerPersonFrom.toLocaleString()}
                        <span className="text-xs ml-1.5 font-sans font-normal tracking-wide text-ink-soft">〜 / 人</span>
                    </div>
                    {p.pricePerNightFrom && (
                        <div className="text-xs font-sans font-normal text-mute" style={{ fontVariantNumeric: "tabular-nums" }}>
                            1棟 ¥{p.pricePerNightFrom.toLocaleString()}〜
                        </div>
                    )}
                    <div className="flex items-center gap-1.5 text-sm font-sans font-normal text-ink-soft">
                        <Users className="w-3.5 h-3.5" strokeWidth={1.5} />
                        <span>{p.capacity.min}〜{p.capacity.max} 名</span>
                    </div>
                </div>

                {/* タグ — 控えめなテキストリンク */}
                <div className="flex flex-wrap gap-x-5 gap-y-2 mb-7">
                    {p.features.map((f) => (
                        <Link
                            key={f}
                            href={`/feature/${f}`}
                            className="text-[12px] tracking-[0.05em] text-ink-soft hover:text-ink transition-colors duration-300 underline-offset-[5px] hover:underline decoration-gold-deep/40"
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


            {/* 2カラムレイアウト: コンテンツ + sticky BookingCard */}
            <div className="container mx-auto px-5 md:px-10 mt-12 md:mt-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
                    {/* 左カラム: コンテンツ */}
                    <div className="lg:col-span-7">
                        {/* 紹介文 */}
                        <p
                            className="font-sans text-base md:text-lg leading-[2.1] text-ink-soft mb-14 md:mb-20 max-w-[58ch]"
                            style={{ textWrap: "pretty" }}
                        >
                            {p.description}
                        </p>

                        {/* スペック表 */}
                        <div className="mb-14 md:mb-20">
                            <p className="text-[11px] tracking-[0.14em] text-ink-soft font-medium uppercase mb-3">— specs</p>
                            <h2 className="font-sans text-2xl md:text-[2rem] font-medium mb-8" style={{ letterSpacing: "-0.005em" }}>仕様</h2>
                            <dl className="divide-y divide-line/60">
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
                                        <div className="flex flex-wrap gap-x-4 gap-y-1 font-normal">
                                            {p.specs.sauna.tempMax && (
                                                <span>サウナ室 最高 {p.specs.sauna.tempMax}℃</span>
                                            )}
                                            {p.specs.sauna.tempMin && (
                                                <span>水風呂 最低 {p.specs.sauna.tempMin}℃</span>
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
                            <div className="mb-14 md:mb-20">
                                <p className="text-[11px] tracking-[0.14em] text-ink-soft font-medium uppercase mb-3">— on tiktok</p>
                                <h2 className="font-sans text-2xl md:text-[2rem] font-medium mb-7" style={{ letterSpacing: "-0.005em" }}>
                                    TikTokで紹介中
                                </h2>
                                <TikTokEmbed url={p.tiktokVideoUrl} fallbackThumbnail={p.mainPhoto} title={p.name} />
                            </div>
                        )}

                        {/* マップ */}
                        {p.mapEmbedUrl && (
                            <div className="mb-14 md:mb-20">
                                <p className="text-[11px] tracking-[0.14em] text-ink-soft font-medium uppercase mb-3">— access</p>
                                <h2 className="font-sans text-2xl md:text-[2rem] font-medium mb-7" style={{ letterSpacing: "-0.005em" }}>アクセスマップ</h2>
                                <div className="w-full h-[320px] md:h-[440px] overflow-hidden rounded-md">
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
                        <div
                            className="lg:hidden relative overflow-hidden rounded-md p-8 text-center mb-12 bg-cover bg-center"
                            style={{ backgroundImage: `linear-gradient(rgba(20,16,12,0.78), rgba(20,16,12,0.88)), url(${p.mainPhoto})` }}
                        >
                            <p className="text-[11px] tracking-[0.14em] text-ink-soft font-medium uppercase mb-3 text-bg/90">— reserve</p>
                            <h3 className="font-sans text-xl md:text-2xl font-medium mb-3 text-bg" style={{ letterSpacing: "-0.005em" }}>
                                詳細・空室は公式へ
                            </h3>
                            <p className="text-xs tracking-wide text-bg/70 mb-6 leading-relaxed">
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
            <div className="container mx-auto px-5 md:px-10 max-w-3xl mt-16 md:mt-24 text-center">
                <OfficialSiteCTA property={p} placement="bottom" />
                <p className="text-[11px] tracking-[0.12em] text-ink-soft mt-5">
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
        <div className="grid grid-cols-[120px_1fr] md:grid-cols-[160px_1fr] py-4 md:py-5">
            <dt className="flex items-center gap-1.5 text-[11px] md:text-xs tracking-[0.08em] uppercase text-ink-soft font-medium">
                {icon}
                {label}
            </dt>
            <dd className="text-[15px] text-ink-soft leading-[1.85]">{children}</dd>
        </div>
    );
}

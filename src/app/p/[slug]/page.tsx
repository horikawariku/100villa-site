import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Check } from "lucide-react";
import { PROPERTIES, getProperty, getSimilarProperties, getSameRegionProperties } from "@/data/properties";
import { FEATURE_LABEL, REGION_LABEL } from "@/data/types";
import { siteMeta } from "@/data/siteMeta";
import { OfficialSiteCTA } from "@/components/property/OfficialSiteCTA";
import { SimilarProperties } from "@/components/property/SimilarProperties";
import { RecentlyViewed } from "@/components/property/RecentlyViewed";
import { RecordView } from "@/components/property/RecordView";
import { TikTokEmbed } from "@/components/property/TikTokEmbed";
import { StickyBookBar } from "@/components/property/StickyBookBar";

export function generateStaticParams() {
    return PROPERTIES.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const p = getProperty(slug);
    if (!p) return {};
    const title = `${p.name} — ${REGION_LABEL[p.area.region]} ${p.area.prefecture}`;
    const desc = `${p.area.prefecture}${p.area.city} / 定員${p.capacity.min}〜${p.capacity.max}名${p.pricePerPersonFrom !== undefined ? ` / ¥${p.pricePerPersonFrom.toLocaleString()}〜/人` : ""}`;
    return {
        title,
        description: desc,
        other: {
            // 各物件ページのアクセスをproperty別に記録 (PropertyCardの本日閲覧数表示用)
            "rt-property": p.id,
        },
        openGraph: {
            title,
            description: desc,
            url: `${siteMeta.url}/p/${p.id}`,
            images: [{ url: p.mainPhoto, width: 1200, height: 630, alt: p.name }],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description: desc,
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

    const s = p.specs;
    const sauna = s.sauna;
    const introImg = p.gallery[1]?.src ?? p.mainPhoto;

    // サウナ深掘りセクションは、語れる情報がある宿のみ表示
    const showSauna = !!sauna && !!(sauna.entertainment || sauna.tempMax || sauna.tempMin || sauna.chairs);

    // Room Information の項目（存在するものだけ）
    const specItems: { label: string; value: string }[] = [
        { label: "定員", value: `${p.capacity.min}〜${p.capacity.max}名` },
    ];
    if (s.checkIn) specItems.push({ label: "チェックイン", value: s.checkIn });
    if (s.checkOut) specItems.push({ label: "チェックアウト", value: s.checkOut });
    if (s.bedroom) specItems.push({ label: "寝具・間取り", value: s.bedroom });
    if (s.cancellation) specItems.push({ label: "キャンセル", value: s.cancellation });

    // サウナのポイント（存在するものだけ）
    const saunaPoints: { en: string; label: string; note?: string }[] = [];
    if (sauna?.tempMax) {
        saunaPoints.push({ en: "Heat", label: `最高 ${sauna.tempMax}℃`, note: sauna.tempMin ? `水風呂 ${sauna.tempMin}℃` : undefined });
    }
    if (sauna?.selfRoukyu) saunaPoints.push({ en: "Self Löyly", label: "セルフロウリュ", note: "好きなだけ蒸気を" });
    if (sauna?.chairs) saunaPoints.push({ en: "Chairs", label: `整いチェア × ${sauna.chairs}`, note: "外気浴スペース" });
    if (sauna?.entertainment) saunaPoints.push({ en: "Feature", label: sauna.entertainment });

    // 構造化データ (JSON-LD): 実データのみ使用 (評価・レビュー等の捏造なし)
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "LodgingBusiness",
        name: p.name,
        description: p.description,
        image: p.mainPhoto,
        url: `${siteMeta.url}/p/${p.id}`,
        address: {
            "@type": "PostalAddress",
            addressCountry: "JP",
            addressRegion: p.area.prefecture,
            addressLocality: p.area.city,
            streetAddress: p.address,
        },
        ...(p.pricePerPersonFrom !== undefined ? { priceRange: `¥${p.pricePerPersonFrom.toLocaleString()}〜/人` } : {}),
        ...(s.checkIn ? { checkinTime: s.checkIn } : {}),
        ...(s.checkOut ? { checkoutTime: s.checkOut } : {}),
    };

    return (
        <main className="pb-28">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <RecordView propertyId={p.id} />

            {/* ============ HERO (Ken Burns) ============ */}
            <section className="relative h-[86vh] min-h-[520px] overflow-hidden bg-ink">
                <div className="absolute inset-0 animate-kenburns">
                    <Image src={p.mainPhoto} alt={p.name} fill priority className="object-cover" sizes="100vw" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-black/70" />
                <div className="absolute inset-x-0 bottom-0">
                    <div className="mx-auto max-w-4xl px-6 md:px-8 pb-16 md:pb-24">
                        <p className="text-[11px] md:text-xs tracking-[0.24em] uppercase text-bg/85 font-medium mb-3">
                            {p.area.prefecture} ・ {REGION_LABEL[p.area.region]}
                        </p>
                        <h1
                            className="font-sans text-[2.4rem] md:text-6xl font-bold text-bg leading-[1.04] mb-4"
                            style={{ letterSpacing: "-0.01em", textWrap: "balance" }}
                        >
                            {p.name}
                        </h1>
                        <p className="flex items-center gap-3 text-bg/85 text-sm md:text-base">
                            {p.pricePerPersonFrom !== undefined && (
                                <>
                                    <span className="font-sans font-medium" style={{ fontVariantNumeric: "tabular-nums" }}>
                                        ¥{p.pricePerPersonFrom.toLocaleString()}
                                        <span className="text-xs text-bg/70">〜 / 人</span>
                                    </span>
                                    <span className="w-px h-3.5 bg-bg/40" />
                                </>
                            )}
                            <span>定員 {p.capacity.min}–{p.capacity.max}名</span>
                        </p>
                    </div>
                </div>
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-bg/60 text-[10px] tracking-[0.3em] uppercase">
                    scroll
                </div>
            </section>

            {/* ============ LIGHT SHEET (hero に重なる角丸) ============ */}
            <div className="relative z-10 -mt-7 rounded-t-[28px] bg-bg">
                {/* パンくず */}
                <nav className="mx-auto max-w-4xl px-6 md:px-8 pt-8 text-[11px] tracking-[0.1em] text-mute">
                    <Link href="/" className="hover:text-ink transition-colors">home</Link>
                    <span className="mx-2 opacity-40">›</span>
                    <Link href={`/area/${p.area.region}`} className="hover:text-ink transition-colors">
                        {REGION_LABEL[p.area.region]}
                    </Link>
                    <span className="mx-2 opacity-40">›</span>
                    <span className="text-ink-soft">{p.name}</span>
                </nav>

                {/* CONCEPT */}
                <section className="mx-auto max-w-4xl px-6 md:px-8 pt-8 md:pt-12 pb-14 md:pb-20">
                    <Shead en="Concept" />
                    <p
                        className="font-sans text-[17px] md:text-xl leading-[2.05] text-ink-soft max-w-[62ch]"
                        style={{ textWrap: "pretty" }}
                    >
                        {p.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-8">
                        {p.features.map((f) => (
                            <Link
                                key={f}
                                href={`/feature/${f}`}
                                className="text-[12px] tracking-wide rounded-full border border-line px-3.5 py-1.5 text-ink-soft hover:border-ink hover:text-ink transition-colors"
                            >
                                {FEATURE_LABEL[f]}
                            </Link>
                        ))}
                    </div>
                    <div className="relative mt-10 md:mt-12 overflow-hidden rounded-2xl aspect-[4/3] md:aspect-[16/9] bg-line">
                        <Image src={introImg} alt={p.name} fill className="object-cover" sizes="(max-width:768px) 100vw, 900px" />
                    </div>
                </section>

                {/* GALLERY */}
                {p.gallery.length > 1 && (
                    <section className="py-14 md:py-20 border-t border-line">
                        <div className="mx-auto max-w-4xl px-6 md:px-8">
                            <Shead en="Gallery" jp={`館内の様子 ─ 全${p.gallery.length}枚。`} />
                        </div>
                        <div className="mt-1 overflow-x-auto no-scrollbar">
                            <div className="inline-flex gap-3 md:gap-4 px-6 md:px-8 pb-2">
                                {p.gallery.map((img, i) => (
                                    <div
                                        key={i}
                                        className="relative w-[70vw] sm:w-[340px] md:w-[380px] aspect-[4/5] overflow-hidden rounded-xl bg-line shrink-0 group"
                                    >
                                        <Image
                                            src={img.src}
                                            alt={img.caption || `${p.name} ${i + 1}`}
                                            fill
                                            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                                            sizes="(max-width:640px) 70vw, 380px"
                                            priority={i < 2}
                                        />
                                    </div>
                                ))}
                                <div className="w-3 shrink-0" />
                            </div>
                        </div>
                    </section>
                )}

                {/* TIKTOK */}
                {p.tiktokVideoUrl && (
                    <section className="py-14 md:py-20 border-t border-line">
                        <div className="mx-auto max-w-4xl px-6 md:px-8">
                            <Shead en="On TikTok" jp="動画で見る。" />
                            <div className="mt-1 flex justify-center md:justify-start">
                                <TikTokEmbed url={p.tiktokVideoUrl} fallbackThumbnail={p.mainPhoto} title={p.name} />
                            </div>
                        </div>
                    </section>
                )}

                {/* SAUNA (dark) */}
                {showSauna && (
                    <section className="py-16 md:py-24 bg-ink text-bg">
                        <div className="mx-auto max-w-4xl px-6 md:px-8">
                            <p className="font-sans text-xl md:text-2xl font-bold tracking-wide">Sauna</p>
                            <p className="text-[13px] text-bg/55 mt-1.5">サウナ・ととのい。</p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 mt-9">
                                {saunaPoints.map((pt, i) => (
                                    <div key={i}>
                                        <p className="text-[10px] tracking-[0.16em] uppercase text-gold font-medium">{pt.en}</p>
                                        <p className="font-sans text-[15px] font-medium mt-1.5 leading-snug">{pt.label}</p>
                                        {pt.note && <p className="text-[12px] text-bg/55 mt-1 leading-relaxed">{pt.note}</p>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* ROOM INFORMATION */}
                <section className="py-14 md:py-20 border-t border-line">
                    <div className="mx-auto max-w-4xl px-6 md:px-8">
                        <Shead en="Room Information" jp="客室・設備情報。" />
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {specItems.map((it, i) => (
                                <div key={i} className="rounded-xl border border-line bg-bg-card/40 p-4">
                                    <p className="text-[10px] tracking-[0.1em] uppercase text-mute font-medium">{it.label}</p>
                                    <p className="font-sans text-[15px] text-ink mt-1.5 leading-snug">{it.value}</p>
                                </div>
                            ))}
                        </div>
                        {s.amenities && s.amenities.length > 0 && (
                            <div className="mt-10">
                                <p className="font-sans text-base font-bold mb-3">設備・アメニティ</p>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
                                    {s.amenities.map((a, i) => (
                                        <div key={i} className="flex items-center gap-3 py-2.5 border-b border-line/70 text-[14px] text-ink">
                                            <Check className="w-4 h-4 text-gold-deep shrink-0" strokeWidth={1.8} />
                                            <span>{a}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* ACCESS */}
                <section className="py-14 md:py-20 border-t border-line">
                    <div className="mx-auto max-w-4xl px-6 md:px-8">
                        <Shead en="Access" jp="アクセス。" />
                        <div>
                            <div className="py-3.5 border-b border-line">
                                <p className="text-[10px] tracking-[0.12em] uppercase text-mute font-medium mb-1.5">Address</p>
                                <p className="font-sans text-[14.5px] text-ink leading-relaxed flex items-start gap-2">
                                    <MapPin className="w-4 h-4 text-ink-soft shrink-0 mt-0.5" strokeWidth={1.6} />
                                    {p.address}
                                </p>
                            </div>
                            {p.accessNotes && p.accessNotes.length > 0 && (
                                <div className="py-3.5 border-b border-line">
                                    <p className="text-[10px] tracking-[0.12em] uppercase text-mute font-medium mb-1.5">Route</p>
                                    <div className="space-y-1">
                                        {p.accessNotes.map((n, i) => (
                                            <p key={i} className="font-sans text-[14px] text-ink-soft leading-relaxed">・{n}</p>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                        {p.mapEmbedUrl && (
                            <div className="mt-6 w-full h-[300px] md:h-[400px] overflow-hidden rounded-2xl border border-line">
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
                        )}
                    </div>
                </section>

                {/* CTA (full-bleed) */}
                <section className="relative overflow-hidden text-center py-24 md:py-32">
                    <div className="absolute inset-0">
                        <Image src={p.mainPhoto} alt="" fill className="object-cover" sizes="100vw" />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/55 to-black/75" />
                    </div>
                    <div className="relative z-10 mx-auto max-w-xl px-6">
                        <h2 className="font-sans text-2xl md:text-3xl font-bold text-bg mb-3 leading-snug">
                            {p.name} の空室を確認する
                        </h2>
                        <p className="text-[13px] text-bg/80 mb-8">
                            {p.pricePerPersonFrom !== undefined && `¥${p.pricePerPersonFrom.toLocaleString()}〜 / 人 ・ `}
                            定員 {p.capacity.min}–{p.capacity.max}名
                        </p>
                        <div className="flex justify-center">
                            <OfficialSiteCTA property={p} placement="mid" />
                        </div>
                        <Link
                            href="/"
                            className="inline-block mt-6 text-[13px] text-bg/85 underline underline-offset-4 hover:text-bg transition-colors"
                        >
                            他の宿も見る
                        </Link>
                    </div>
                </section>

                {/* 回遊 — 他の宿へ */}
                <SimilarProperties label="似てる宿" en="Similar Stays" properties={similar} />
                {sameRegion.length > 0 && (
                    <SimilarProperties label={`${REGION_LABEL[p.area.region]}の宿`} en="Same Area" properties={sameRegion} />
                )}
                <RecentlyViewed excludeId={p.id} />

                {/* 注記 */}
                <p className="mx-auto max-w-2xl px-6 py-10 text-[11px] leading-relaxed text-mute text-center">
                    ※ 写真・情報は各宿の公式情報を元にしています。料金は1名あたりの目安です。空室・料金の詳細および予約は各宿の公式サイトでご確認ください。
                </p>
            </div>

            {/* 下部固定 予約バー */}
            <StickyBookBar property={p} />
        </main>
    );
}

function Shead({ en, jp }: { en: string; jp?: string }) {
    return (
        <div className="mb-6 md:mb-8">
            <h2 className="font-sans text-xl md:text-2xl font-bold tracking-wide text-ink">{en}</h2>
            {jp && <p className="text-[13px] text-mute mt-1.5">{jp}</p>}
        </div>
    );
}

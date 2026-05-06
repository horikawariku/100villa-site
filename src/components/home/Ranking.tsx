import Link from "next/link";
import Image from "next/image";
import { Users } from "lucide-react";
import { getAllProperties } from "@/data/properties";
import { REGION_LABEL, FEATURE_LABEL } from "@/data/types";

const RANKING_LIMIT = 10;

/**
 * 編集部ランキング. 巨大番号 + 写真 + 宿名のエディトリアルレイアウト.
 * featured を優先しつつ、足りなければ新着で埋めて TOP10 を作る.
 */
export function Ranking() {
    const all = getAllProperties();
    const featured = all.filter((p) => p.featured);
    const rest = all.filter((p) => !p.featured);
    const ranked = [...featured, ...rest].slice(0, RANKING_LIMIT);
    if (ranked.length === 0) return null;

    return (
        <section className="py-14 md:py-20 bg-ink text-bg">
            <div className="container mx-auto px-5 md:px-7">
                {/* ヘッダ */}
                <div className="text-center mb-10 md:mb-14">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-gold font-display mb-2">
                        Editor&apos;s Ranking
                    </p>
                    <h2 className="font-mincho text-2xl md:text-4xl font-bold tracking-wide">
                        2026 春の編集部ランキング
                    </h2>
                    <p className="text-[11px] md:text-xs tracking-widest text-bg/55 mt-3">
                        フォロワー15万人が選ぶ、いま予約したい宿
                    </p>
                </div>

                {/* リスト (縦並び・1列) */}
                <ol className="max-w-4xl mx-auto divide-y divide-bg/15">
                    {ranked.map((p, i) => (
                        <li key={p.id}>
                            <Link
                                href={`/p/${p.id}`}
                                className="group flex items-center gap-4 md:gap-7 py-5 md:py-7"
                            >
                                {/* 番号 */}
                                <span className="font-display italic text-4xl md:text-7xl font-semibold text-gold shrink-0 leading-none w-10 md:w-20 text-right">
                                    {String(i + 1).padStart(2, "0")}
                                </span>

                                {/* 写真 */}
                                <div className="relative w-24 h-24 md:w-40 md:h-32 shrink-0 overflow-hidden">
                                    <Image
                                        src={p.mainPhoto}
                                        alt={p.name}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        sizes="(max-width: 768px) 96px, 160px"
                                    />
                                </div>

                                {/* テキスト */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-bg/55 font-display mb-1">
                                        {REGION_LABEL[p.area.region]} / {p.area.prefecture}
                                    </p>
                                    <h3 className="font-mincho text-base md:text-2xl font-bold tracking-wide leading-tight group-hover:text-gold transition-colors mb-1.5 truncate">
                                        {p.name}
                                    </h3>
                                    <p className="hidden md:block text-xs tracking-wide text-bg/65 leading-relaxed line-clamp-1 mb-2">
                                        {p.catchcopy}
                                    </p>
                                    <div className="flex items-center gap-3 md:gap-4 text-[10px] md:text-[11px] tracking-widest text-bg/55">
                                        <span className="flex items-center gap-1">
                                            <Users className="w-3 h-3" />
                                            {p.capacity.min}〜{p.capacity.max}名
                                        </span>
                                        <span>
                                            <span className="text-bg/35">¥</span>
                                            <span className="text-bg/85 font-bold">{p.pricePerPersonFrom.toLocaleString()}</span>
                                            <span className="text-bg/40">〜/人</span>
                                        </span>
                                        {/* 主要タグ1つ */}
                                        {p.features[0] && (
                                            <span className="hidden md:inline px-2 py-0.5 border border-bg/15 text-[9px]">
                                                {FEATURE_LABEL[p.features[0]]}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ol>

                {/* CTA → 全宿一覧 */}
                <div className="text-center mt-10 md:mt-14">
                    <Link
                        href="/#all"
                        className="inline-flex items-center gap-2 px-6 py-3 border border-bg/30 text-xs tracking-widest hover:bg-bg hover:text-ink transition-colors"
                    >
                        全宿一覧を見る →
                    </Link>
                </div>
            </div>
        </section>
    );
}

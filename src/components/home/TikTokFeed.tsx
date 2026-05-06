import Link from "next/link";
import Image from "next/image";
import { Play } from "lucide-react";
import { getAllProperties } from "@/data/properties";

/**
 * TikTokで紹介中の宿フィード。
 * tiktokVideoUrl がある物件を新着順で並べ、なければ全物件で代用。
 * 「TikTokで見たあの宿」を秒で発見できる導線。
 */
export function TikTokFeed() {
    const all = getAllProperties();
    const withVideo = all.filter((p) => p.tiktokVideoUrl);
    // フォールバック: 動画未設定なら全物件を表示
    const list = withVideo.length > 0 ? withVideo : all;
    if (list.length === 0) return null;

    return (
        <section className="py-12 md:py-16">
            <div className="container mx-auto px-5 md:px-7 mb-6 md:mb-8">
                <div className="flex items-end justify-between gap-3">
                    <div>
                        <p className="text-[10px] tracking-[0.3em] uppercase text-gold-deep font-display mb-1.5">
                            From TikTok
                        </p>
                        <h2 className="font-mincho text-xl md:text-2xl font-bold tracking-wide">
                            TikTokで紹介中の宿
                        </h2>
                    </div>
                    <Link
                        href="/search"
                        className="text-[11px] tracking-widest text-ink-soft hover:text-ink underline underline-offset-4 decoration-line-strong"
                    >
                        宿名で探す →
                    </Link>
                </div>
            </div>
            {/* 横スクロール */}
            <div className="overflow-x-auto no-scrollbar">
                <div className="inline-flex gap-3 md:gap-4 px-5 md:px-7">
                    {list.slice(0, 12).map((p) => (
                        <Link
                            key={p.id}
                            href={`/p/${p.id}`}
                            className="group block w-[58vw] md:w-[260px] shrink-0"
                        >
                            <div className="relative aspect-[9/16] overflow-hidden bg-ink">
                                <Image
                                    src={p.mainPhoto}
                                    alt={p.name}
                                    fill
                                    className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.04] transition-all duration-700"
                                    sizes="(max-width: 768px) 58vw, 260px"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                                {/* 再生アイコン */}
                                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-bg/85 flex items-center justify-center">
                                    <Play className="w-3.5 h-3.5 text-ink fill-ink ml-0.5" />
                                </div>
                                {/* テキスト */}
                                <div className="absolute inset-x-0 bottom-0 p-3.5 text-white">
                                    <p className="text-[9px] tracking-widest text-white/65 font-display uppercase mb-1">
                                        {p.area.prefecture}
                                    </p>
                                    <p className="font-mincho text-sm font-bold tracking-wide leading-snug">
                                        {p.name}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                    <div className="w-3 shrink-0" /> {/* 右端余白 */}
                </div>
            </div>
        </section>
    );
}

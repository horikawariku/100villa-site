import Link from "next/link";
import { getAllProperties } from "@/data/properties";
import { TikTokFeedCard } from "./TikTokFeedCard";

/**
 * TikTokで紹介中の宿フィード。
 * tiktokVideoUrl がある物件を新着順で並べ、なければ全物件で代用。
 * 各カードは TikTokFeedCard が oEmbed で TikTok 実物サムネを動的取得して表示。
 */
export function TikTokFeed() {
    const all = getAllProperties();
    const withVideo = all.filter((p) => p.tiktokVideoUrl);
    const list = withVideo.length > 0 ? withVideo : all;
    if (list.length === 0) return null;

    return (
        <section className="py-8 md:py-12">
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
            <div className="overflow-x-auto no-scrollbar">
                <div className="inline-flex gap-3 md:gap-4 px-5 md:px-7">
                    {list.slice(0, 12).map((p) => (
                        <TikTokFeedCard key={p.id} property={p} />
                    ))}
                    <div className="w-3 shrink-0" />
                </div>
            </div>
        </section>
    );
}

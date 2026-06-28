import Link from "next/link";
import { getAllProperties } from "@/data/properties";
import { TikTokFeedCard } from "./TikTokFeedCard";

/** 先頭固定する宿 (一番左) */
const PIN_FIRST = "hiire-futo";

/**
 * ヒーロー = TikTokで紹介中の宿一覧 (発見導線)。
 * tiktokVideoUrl がある物件を、PIN_FIRST を先頭にして並べる。
 * 各カードは TikTokFeedCard が oEmbed で実物サムネを取得して表示。
 */
export function TikTokFeed() {
    const all = getAllProperties();
    const withVideo = all.filter((p) => p.tiktokVideoUrl);
    const ordered = [
        ...withVideo.filter((p) => p.id === PIN_FIRST),
        ...withVideo.filter((p) => p.id !== PIN_FIRST),
    ];
    const list = ordered.length > 0 ? ordered : all;

    return (
        <section className="pt-24 md:pt-28 pb-12 md:pb-16">
            <div className="container mx-auto px-5 md:px-7">
                <div className="flex items-end justify-between gap-4 mb-6 md:mb-8">
                    <div>
                        <h1 className="font-sans text-4xl md:text-6xl font-bold text-ink leading-none tracking-[0.01em]">
                            For TikTok
                        </h1>
                        <p className="text-sm md:text-base text-ink-soft mt-3">TikTokで見た宿。</p>
                    </div>
                    <Link
                        href="/search"
                        className="text-[12px] tracking-[0.08em] text-ink-soft hover:text-ink underline underline-offset-4 decoration-line-strong shrink-0 pb-1 whitespace-nowrap"
                    >
                        宿名で探す →
                    </Link>
                </div>
            </div>

            {list.length > 0 && (
                <div className="overflow-x-auto no-scrollbar">
                    <div className="inline-flex gap-3 md:gap-4 px-5 md:px-7">
                        {list.slice(0, 12).map((p) => (
                            <TikTokFeedCard key={p.id} property={p} />
                        ))}
                        <div className="w-3 shrink-0" />
                    </div>
                </div>
            )}
        </section>
    );
}

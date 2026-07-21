"use client";

import Link from "next/link";
import Image from "next/image";
import { Play } from "lucide-react";
import { useEffect, useState } from "react";
import type { Property } from "@/data/types";

interface Props {
    property: Property;
    /** ファーストビューに入るカードは true (LCP改善: 先読みされる) */
    priority?: boolean;
}

/**
 * TikTokFeed の各カード (縦9:16)。
 * まず mainPhoto を即座に表示し (グレーの待ち時間を作らない)、
 * tiktokVideoUrl がある場合は oEmbed サムネ取得後にフェードで差し替える。
 * ホーム離脱56%の主因だった「初速の空白」への対策。
 */
export function TikTokFeedCard({ property: p, priority = false }: Props) {
    const [tiktokThumb, setTiktokThumb] = useState<string | null>(null);
    const [thumbLoaded, setThumbLoaded] = useState(false);

    useEffect(() => {
        if (!p.tiktokVideoUrl) return;
        let cancelled = false;
        fetch(`/api/tiktok-oembed?url=${encodeURIComponent(p.tiktokVideoUrl)}`)
            .then((r) => (r.ok ? r.json() : null))
            .then((data: { thumbnail_url?: string | null } | null) => {
                if (!cancelled && data?.thumbnail_url) setTiktokThumb(data.thumbnail_url);
            })
            .catch(() => {});
        return () => {
            cancelled = true;
        };
    }, [p.tiktokVideoUrl]);

    return (
        <Link href={`/p/${p.id}`} className="group block w-[58vw] md:w-[230px] shrink-0">
            <div className="relative aspect-[9/16] overflow-hidden rounded-xl bg-line">
                {/* ベース: 宿の実写真を即表示 (oEmbed待ちのグレーを出さない) */}
                <Image
                    src={p.mainPhoto}
                    alt={p.name}
                    fill
                    priority={priority}
                    className="object-cover group-hover:scale-[1.04] transition-transform duration-700"
                    sizes="(max-width: 768px) 58vw, 230px"
                />
                {/* TikTokサムネ取得後、上にフェードイン */}
                {tiktokThumb && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                        src={tiktokThumb}
                        alt=""
                        aria-hidden
                        loading="lazy"
                        onLoad={() => setThumbLoaded(true)}
                        className={`absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-[opacity,transform] duration-500 ${
                            thumbLoaded ? "opacity-100" : "opacity-0"
                        }`}
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
                {p.tiktokVideoUrl && (
                    <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-bg/85 flex items-center justify-center">
                        <Play className="w-3.5 h-3.5 text-ink fill-ink ml-0.5" />
                    </div>
                )}
                <div className="absolute inset-x-0 bottom-0 p-3.5 text-bg">
                    <p className="text-[10.5px] tracking-[0.12em] font-medium text-bg/95 mb-1">
                        {p.area.prefecture}
                    </p>
                    <p className="font-sans text-sm font-semibold tracking-wide leading-snug text-bg mb-1">
                        {p.name}
                    </p>
                    {p.pricePerPersonFrom !== undefined && (
                        <p className="text-[12.5px] font-semibold text-bg" style={{ fontVariantNumeric: "tabular-nums" }}>
                            ¥{p.pricePerPersonFrom.toLocaleString()}
                            <span className="text-[10.5px] font-medium text-bg/85 ml-0.5">〜/人</span>
                        </p>
                    )}
                </div>
            </div>
        </Link>
    );
}

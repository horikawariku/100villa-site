"use client";

import Link from "next/link";
import Image from "next/image";
import { Play } from "lucide-react";
import { useEffect, useState } from "react";
import type { Property } from "@/data/types";

interface Props {
    property: Property;
}

/**
 * TikTokFeed の各カード (縦9:16)。
 * tiktokVideoUrl があれば /api/tiktok-oembed で実物サムネを取得して表示。
 * 取得失敗 or 動画URL未設定なら mainPhoto を使う。
 */
export function TikTokFeedCard({ property: p }: Props) {
    const [tiktokThumb, setTiktokThumb] = useState<string | null>(null);

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

    const useTt = !!tiktokThumb;

    return (
        <Link href={`/p/${p.id}`} className="group block w-[58vw] md:w-[230px] shrink-0">
            <div className="relative aspect-[9/16] overflow-hidden rounded-xl bg-line">
                {useTt ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                        src={tiktokThumb!}
                        alt={p.name}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
                        loading="lazy"
                    />
                ) : (
                    <Image
                        src={p.mainPhoto}
                        alt={p.name}
                        fill
                        className="object-cover group-hover:scale-[1.04] transition-transform duration-700"
                        sizes="(max-width: 768px) 58vw, 230px"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
                {p.tiktokVideoUrl && (
                    <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-bg/85 flex items-center justify-center">
                        <Play className="w-3.5 h-3.5 text-ink fill-ink ml-0.5" />
                    </div>
                )}
                <div className="absolute inset-x-0 bottom-0 p-3.5 text-bg">
                    <p className="text-[10px] tracking-[0.16em] uppercase text-bg/75 mb-1">
                        {p.area.prefecture}
                    </p>
                    <p className="font-sans text-sm font-medium tracking-wide leading-snug text-bg">
                        {p.name}
                    </p>
                </div>
            </div>
        </Link>
    );
}

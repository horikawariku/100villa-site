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
 * TikTokFeed の各カード。
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
        <Link
            href={`/p/${p.id}`}
            className="group block w-[58vw] md:w-[260px] shrink-0"
        >
            <div className="relative aspect-[9/16] overflow-hidden bg-ink">
                {useTt ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                        src={tiktokThumb!}
                        alt={p.name}
                        className="absolute inset-0 w-full h-full object-cover opacity-95 group-hover:opacity-100 group-hover:scale-[1.04] transition-all duration-700"
                        loading="lazy"
                    />
                ) : (
                    <Image
                        src={p.mainPhoto}
                        alt={p.name}
                        fill
                        className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.04] transition-all duration-700"
                        sizes="(max-width: 768px) 58vw, 260px"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-bg/85 flex items-center justify-center">
                    <Play className="w-3.5 h-3.5 text-ink fill-ink ml-0.5" />
                </div>
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
    );
}

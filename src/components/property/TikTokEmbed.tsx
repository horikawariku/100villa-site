"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Script from "next/script";
import { Play, ArrowUpRight } from "lucide-react";

interface Props {
    /** TikTok 動画URL (vt.tiktok.com 短縮 or www.tiktok.com フルURL どちらも可) */
    url: string;
    /** TikTok 取得失敗時のフォールバック画像 (物件メイン写真などでOK) */
    fallbackThumbnail: string;
    title?: string;
}

interface OEmbedResult {
    thumbnail_url: string | null;
    author_name: string | null;
    title: string | null;
    html: string | null;
    embed_url: string | null;
    video_id: string | null;
}

/**
 * TikTok 動画埋め込み.
 * - サムネ: oEmbed の thumbnail_url を使用 (TikTok実物)
 * - 再生: oEmbed の html (cite + data-video-id) を埋め込んで embed.js を起動
 *   → vt.tiktok.com 短縮URLでも canonical URLに解決されて確実に再生される
 */
export function TikTokEmbed({ url, fallbackThumbnail, title }: Props) {
    const [activated, setActivated] = useState(false);
    const [oembed, setOembed] = useState<OEmbedResult | null>(null);

    useEffect(() => {
        let cancelled = false;
        fetch(`/api/tiktok-oembed?url=${encodeURIComponent(url)}`)
            .then((r) => (r.ok ? r.json() : null))
            .then((data: OEmbedResult | null) => {
                if (!cancelled && data) setOembed(data);
            })
            .catch(() => {});
        return () => {
            cancelled = true;
        };
    }, [url]);

    useEffect(() => {
        if (!activated) return;
        const w = window as { tiktokEmbed?: { reloadEmbeds?: () => void } };
        // embed.js が既にロードされてれば手動リロード
        w.tiktokEmbed?.reloadEmbeds?.();
    }, [activated]);

    const displayThumbnail = oembed?.thumbnail_url || fallbackThumbnail;
    const displayTitle = title || oembed?.title || undefined;
    const usingTtThumb = !!oembed?.thumbnail_url;
    const canonicalUrl = oembed?.embed_url || url;
    const videoId = oembed?.video_id || null;

    if (!activated) {
        return (
            <button
                onClick={() => setActivated(true)}
                className="group relative block w-full max-w-[340px] aspect-[9/16] overflow-hidden rounded-xl bg-ink hover:scale-[1.02] transition-transform"
                aria-label="TikTok動画を再生"
            >
                {usingTtThumb ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                        src={displayThumbnail}
                        alt={displayTitle ?? "TikTok video"}
                        className="absolute inset-0 w-full h-full object-cover opacity-95 group-hover:opacity-100 transition-opacity"
                        loading="lazy"
                    />
                ) : (
                    <Image
                        src={displayThumbnail}
                        alt={displayTitle ?? "TikTok video"}
                        fill
                        className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                        sizes="(max-width: 768px) 100vw, 340px"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-bg/95 flex items-center justify-center shadow-lg">
                        <Play className="w-5 h-5 md:w-6 md:h-6 text-ink fill-ink ml-1" />
                    </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-4 text-bg">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-bg/70 mb-1 font-medium">TikTok</p>
                    {displayTitle && (
                        <p className="font-sans text-sm font-bold tracking-wide line-clamp-2">
                            {displayTitle}
                        </p>
                    )}
                </div>
            </button>
        );
    }

    return (
        <div className="max-w-[340px]">
            <blockquote
                className="tiktok-embed"
                cite={canonicalUrl}
                data-video-id={videoId ?? undefined}
                style={{ maxWidth: 605, minWidth: 280 }}
            >
                <section>
                    <a href={canonicalUrl} target="_blank" rel="noopener noreferrer">
                        {canonicalUrl}
                    </a>
                </section>
            </blockquote>
            <Script src="https://www.tiktok.com/embed.js" strategy="lazyOnload" async />
            <a
                href={canonicalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-3 text-[11px] tracking-widest text-ink-soft hover:text-ink transition-colors"
            >
                TikTokで開く <ArrowUpRight className="w-3 h-3" />
            </a>
        </div>
    );
}

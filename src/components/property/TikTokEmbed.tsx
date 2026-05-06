"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Script from "next/script";
import { Play, ArrowUpRight } from "lucide-react";

interface Props {
    /** TikTok 動画URL (例: https://www.tiktok.com/@user/video/1234567) */
    url: string;
    /** クリック前に表示するサムネ画像 (物件メイン写真などでOK) */
    fallbackThumbnail: string;
    title?: string;
}

/**
 * TikTok 動画埋め込み.
 * デフォルトは軽量なサムネ表示。クリックで TikTok blockquote を読み込み、
 * embed.js を遅延ロードして実際の動画プレイヤーを表示する。
 */
export function TikTokEmbed({ url, fallbackThumbnail, title }: Props) {
    const [activated, setActivated] = useState(false);

    // URLからvideo IDを抽出 (例: /video/1234567 → 1234567)
    const idMatch = url.match(/\/video\/(\d+)/);
    const videoId = idMatch ? idMatch[1] : null;

    // activated になったらTikTok embed scriptを動的ロード&実行
    useEffect(() => {
        if (!activated) return;
        const w = window as { tiktokEmbed?: { reloadEmbeds?: () => void } };
        w.tiktokEmbed?.reloadEmbeds?.();
    }, [activated]);

    if (!activated) {
        return (
            <button
                onClick={() => setActivated(true)}
                className="group relative block w-full max-w-[340px] aspect-[9/16] overflow-hidden rounded-xl bg-ink hover:scale-[1.02] transition-transform"
                aria-label="TikTok動画を再生"
            >
                <Image
                    src={fallbackThumbnail}
                    alt={title ?? "TikTok video"}
                    fill
                    className="object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                    sizes="(max-width: 768px) 100vw, 340px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-bg/95 flex items-center justify-center shadow-lg">
                        <Play className="w-5 h-5 md:w-6 md:h-6 text-ink fill-ink ml-1" />
                    </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-4 text-bg">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-bg/70 mb-1 font-display">TikTok</p>
                    <p className="font-mincho text-sm font-bold tracking-wide line-clamp-2">{title}</p>
                </div>
            </button>
        );
    }

    // activated: blockquote + script
    return (
        <div className="max-w-[340px]">
            <blockquote
                className="tiktok-embed"
                cite={url}
                data-video-id={videoId ?? undefined}
                style={{ maxWidth: 605, minWidth: 280 }}
            >
                <section>
                    <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
                </section>
            </blockquote>
            <Script src="https://www.tiktok.com/embed.js" strategy="lazyOnload" async />
            <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-3 text-[11px] tracking-widest text-ink-soft hover:text-ink transition-colors"
            >
                TikTokで開く <ArrowUpRight className="w-3 h-3" />
            </a>
        </div>
    );
}

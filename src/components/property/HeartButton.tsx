"use client";

import { Heart } from "lucide-react";
import { useWishlistItem } from "@/lib/wishlist";

interface Props {
    slug: string;
    /** カードの上に重ねる場合は true (背景にbgを敷く) */
    overlay?: boolean;
}

/** お気に入り トグルボタン */
export function HeartButton({ slug, overlay = true }: Props) {
    const { saved, toggle } = useWishlistItem(slug);
    return (
        <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(); }}
            aria-label={saved ? "お気に入りから外す" : "お気に入りに追加"}
            aria-pressed={saved}
            className={`group inline-flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full transition-all ${
                overlay ? "bg-bg/85 backdrop-blur-sm hover:bg-bg shadow-sm" : "hover:bg-line/40"
            }`}
        >
            <Heart
                className={`w-4 h-4 transition-all ${saved ? "fill-gold-deep text-gold-deep" : "text-ink-soft group-hover:text-ink"}`}
                strokeWidth={1.6}
            />
        </button>
    );
}

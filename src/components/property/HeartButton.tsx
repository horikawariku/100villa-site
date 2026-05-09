"use client";

import { Heart } from "lucide-react";
import { useWishlistItem } from "@/lib/wishlist";

interface Props {
    slug: string;
    /** 親側でレイアウト調整可能なよう、機能しないが受ける */
    overlay?: boolean;
}

/**
 * お気に入り トグルボタン (アイコンのみ・白)。
 * 周囲に円背景なし。タップ域は確保しつつ視覚的に最小。
 */
export function HeartButton({ slug }: Props) {
    const { saved, toggle } = useWishlistItem(slug);
    return (
        <button
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggle();
            }}
            aria-label={saved ? "お気に入りから外す" : "お気に入りに追加"}
            aria-pressed={saved}
            className="group inline-flex items-center justify-center w-9 h-9 transition-transform hover:scale-110"
        >
            <Heart
                className={`w-5 h-5 transition-all drop-shadow-md ${
                    saved
                        ? "fill-white text-white"
                        : "fill-transparent text-white"
                }`}
                strokeWidth={2}
            />
        </button>
    );
}

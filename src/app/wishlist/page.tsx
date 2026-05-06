"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { PropertyCard } from "@/components/property/PropertyCard";
import { PROPERTIES } from "@/data/properties";
import { useWishlist } from "@/lib/wishlist";
import type { Property } from "@/data/types";

export default function WishlistPage() {
    const ids = useWishlist();
    const items: Property[] = ids
        .map((id) => PROPERTIES.find((p) => p.id === id))
        .filter((p): p is Property => !!p);

    return (
        <main className="pt-24 md:pt-32 pb-20 md:pb-24">
            <div className="container mx-auto px-5 md:px-7 max-w-5xl">
                <p className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-gold-deep font-display mb-2">
                    Wishlist
                </p>
                <h1 className="font-mincho text-3xl md:text-5xl font-bold tracking-wide mb-2">
                    お気に入り
                </h1>
                <p className="text-sm tracking-widest text-mute mb-10">{items.length} stays</p>

                {items.length === 0 ? (
                    <div className="py-14 text-center">
                        <Heart className="w-8 h-8 text-mute mx-auto mb-4" strokeWidth={1.4} />
                        <p className="text-sm text-mute mb-2">お気に入りはまだありません</p>
                        <p className="text-xs text-mute mb-6">
                            気になる宿のページで♡ボタンを押すとここに追加されます
                        </p>
                        <Link
                            href="/"
                            className="inline-flex px-5 py-2.5 border border-ink text-xs tracking-widest hover:bg-ink hover:text-bg transition-colors"
                        >
                            宿を探しに行く
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
                        {items.map((p) => (
                            <PropertyCard key={p.id} property={p} size="md" />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}

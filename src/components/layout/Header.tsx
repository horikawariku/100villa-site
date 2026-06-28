"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Heart, Search } from "lucide-react";
import { siteMeta } from "@/data/siteMeta";

const NAV = [
    { name: "宿一覧", href: "/#all" },
    { name: "エリア", href: "/#area" },
    { name: "体験", href: "/#feature" },
];

export function Header() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <header className="fixed top-0 left-0 w-full z-50 bg-bg/95 backdrop-blur-md border-b border-line">
                <div className="container mx-auto px-5 md:px-7 h-16 flex items-center justify-between">
                    <Link href="/" aria-label={siteMeta.name} className="font-sans text-ink leading-[0.9] tracking-tight">
                        <span className="block text-base md:text-lg font-bold">100</span>
                        <span className="block text-base md:text-lg font-bold tracking-[0.18em]">VILLA</span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-8">
                        {NAV.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-[13px] tracking-[0.06em] text-ink-soft hover:text-ink transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center gap-4 md:gap-5 text-ink-soft">
                        <Link href="/search" aria-label="検索" className="hover:text-ink transition-colors">
                            <Search className="w-[18px] h-[18px]" strokeWidth={1.6} />
                        </Link>
                        <Link href="/wishlist" aria-label="お気に入り" className="hover:text-ink transition-colors">
                            <Heart className="w-[18px] h-[18px]" strokeWidth={1.6} />
                        </Link>
                        <button onClick={() => setOpen(true)} aria-label="メニュー" className="md:hidden text-ink">
                            <Menu className="w-6 h-6" strokeWidth={1.6} />
                        </button>
                    </div>
                </div>
            </header>

            {open && (
                <div className="fixed inset-0 z-[60] bg-bg flex flex-col">
                    <div className="container mx-auto px-5 md:px-7 h-16 flex items-center justify-between border-b border-line">
                        <Link href="/" onClick={() => setOpen(false)} className="font-sans text-ink leading-[0.9] tracking-tight">
                            <span className="block text-base font-bold">100</span>
                            <span className="block text-base font-bold tracking-[0.18em]">VILLA</span>
                        </Link>
                        <button onClick={() => setOpen(false)} aria-label="閉じる" className="text-ink">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <nav className="flex-1 flex flex-col items-center justify-center gap-7">
                        <Link
                            href="/search"
                            onClick={() => setOpen(false)}
                            className="font-sans text-2xl font-medium text-ink hover:text-ink-soft transition-colors"
                        >
                            宿を探す
                        </Link>
                        {NAV.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className="font-sans text-lg font-normal text-ink-soft hover:text-ink transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                    <div className="px-5 md:px-7 py-6 border-t border-line text-[11px] tracking-[0.06em] text-mute">
                        <span>{siteMeta.tagline}</span>
                    </div>
                </div>
            )}
        </>
    );
}

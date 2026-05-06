"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Heart, Search } from "lucide-react";
import { siteMeta } from "@/data/siteMeta";

const NAV = [
    { name: "エリアから探す", href: "/#area" },
    { name: "体験から探す", href: "/#feature" },
    { name: "全宿一覧", href: "/#all" },
    { name: "編集部について", href: "/about" },
];

export function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const h = () => setScrolled(window.scrollY > 30);
        window.addEventListener("scroll", h, { passive: true });
        return () => window.removeEventListener("scroll", h);
    }, []);

    return (
        <>
            <header
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                    scrolled ? "bg-bg/95 backdrop-blur-md border-b border-line py-2.5" : "bg-transparent py-4"
                }`}
            >
                <div className="container mx-auto px-5 md:px-7 flex items-center justify-between">
                    <Link
                        href="/"
                        className="group [perspective:600px] inline-block"
                        aria-label={siteMeta.name}
                    >
                        <span className="relative inline-block font-display text-base md:text-lg tracking-[0.25em] font-semibold transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateX(180deg)]">
                            <span className="block [backface-visibility:hidden]">100 VILLA</span>
                            <span className="absolute inset-0 [backface-visibility:hidden] [transform:rotateX(180deg)] font-mincho">100 ヴィラ</span>
                        </span>
                    </Link>
                    <div className="flex items-center gap-3 md:gap-5">
                        <Link
                            href="/search"
                            aria-label="検索"
                            className="hidden md:flex items-center gap-2 text-xs tracking-widest text-ink-soft hover:text-ink transition-colors"
                        >
                            <Search className="w-4 h-4" /> 宿を探す
                        </Link>
                        <Link
                            href="/wishlist"
                            aria-label="お気に入り"
                            className="hover:opacity-70 transition-opacity"
                        >
                            <Heart className="w-4 h-4 md:w-5 md:h-5" />
                        </Link>
                        <button onClick={() => setOpen(true)} aria-label="メニュー">
                            <Menu className="w-5 h-5 md:w-6 md:h-6" />
                        </button>
                    </div>
                </div>
            </header>

            {open && (
                <div className="fixed inset-0 z-[60] bg-bg flex flex-col">
                    <div className="container mx-auto px-5 md:px-7 py-4 flex items-center justify-between border-b border-line">
                        <Link
                            href="/"
                            onClick={() => setOpen(false)}
                            className="font-display text-base md:text-lg tracking-[0.25em] font-semibold"
                        >
                            {siteMeta.name}
                        </Link>
                        <button onClick={() => setOpen(false)} aria-label="閉じる">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <nav className="flex-1 flex flex-col items-center justify-center gap-7">
                        <Link
                            href="/search"
                            onClick={() => setOpen(false)}
                            className="font-serif text-2xl md:text-3xl text-ink hover:text-gold transition-colors"
                        >
                            宿を探す
                        </Link>
                        {NAV.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className="font-serif text-xl md:text-2xl text-ink-soft hover:text-ink transition-colors tracking-wide"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </nav>
                    <div className="px-5 md:px-7 py-6 border-t border-line flex items-center justify-between text-[10px] tracking-widest text-mute">
                        <span>{siteMeta.tagline}</span>
                        <span>EDITOR / {siteMeta.editor.name}</span>
                    </div>
                </div>
            )}
        </>
    );
}

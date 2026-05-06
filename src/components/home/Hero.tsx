"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { siteMeta } from "@/data/siteMeta";
import { SearchBar } from "./SearchBar";

export function Hero() {
    const [imgIdx, setImgIdx] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const imgs = siteMeta.heroImages;

    useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);
    useEffect(() => {
        const t = setInterval(() => setImgIdx((i) => (i + 1) % imgs.length), 5000);
        return () => clearInterval(t);
    }, [imgs.length]);

    return (
        <section className="relative min-h-[90vh] md:min-h-screen flex flex-col justify-center overflow-hidden bg-ink">
            {/* 背景写真クロスフェード */}
            <AnimatePresence mode="sync">
                <motion.div
                    key={imgIdx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.6, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    <Image
                        src={imgs[imgIdx]}
                        alt=""
                        fill
                        priority={imgIdx === 0}
                        className="object-cover"
                        sizes="100vw"
                    />
                </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/75" />

            {/* コンテンツ */}
            <div className="relative z-10 container mx-auto px-5 md:px-7 pt-28 md:pt-32 pb-12 text-bg">
                <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-bg/65 mb-4 font-display">
                    Curated Vacation Rentals
                </p>

                {/* 巨大数字 100 */}
                <div className="flex items-end gap-3 md:gap-5 mb-1 md:mb-2">
                    <span className="font-display text-[28vw] md:text-[16rem] lg:text-[20rem] font-semibold leading-none tracking-tighter">
                        100
                    </span>
                    <div className="pb-3 md:pb-8">
                        <p className="font-display text-3xl md:text-6xl tracking-[0.15em] font-medium leading-none">
                            VILLA
                        </p>
                        <p className="text-[10px] md:text-xs tracking-[0.3em] text-bg/60 mt-2 font-display uppercase">
                            JAPAN&apos;s Best Stays
                        </p>
                    </div>
                </div>

                {/* タグライン */}
                <p className="font-mincho text-xl md:text-3xl font-bold tracking-wider mt-3 md:mt-4 mb-9 md:mb-12 max-w-2xl leading-relaxed">
                    {siteMeta.tagline}
                </p>

                {/* 検索バー */}
                <SearchBar />
            </div>

            {/* 写真インジケータドット (右下) */}
            <div className="absolute bottom-8 right-5 md:right-10 z-10 flex gap-1.5">
                {imgs.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setImgIdx(i)}
                        aria-label={`画像 ${i + 1}`}
                        className={`h-1 rounded-full transition-all duration-500 ${i === imgIdx ? "bg-bg/85 w-5" : "bg-bg/30 w-1.5"}`}
                    />
                ))}
            </div>

            {/* スクロールヒント (下中央) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: loaded ? 1 : 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-bg/65 pointer-events-none"
            >
                <span className="text-[9px] tracking-[0.4em] uppercase mb-1.5 font-display">Discover</span>
                <motion.div
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                >
                    <ChevronDown className="w-4 h-4" strokeWidth={1.4} />
                </motion.div>
            </motion.div>
        </section>
    );
}

"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { siteMeta } from "@/data/siteMeta";
import { SearchBar } from "./SearchBar";

export function Hero() {
    const [imgIdx, setImgIdx] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const imgs = siteMeta.heroImages;

    useEffect(() => {
        setTimeout(() => setLoaded(true), 100);
    }, []);
    useEffect(() => {
        const t = setInterval(() => setImgIdx((i) => (i + 1) % imgs.length), 5000);
        return () => clearInterval(t);
    }, [imgs.length]);

    return (
        <section className="relative h-[78vh] md:h-[82vh] min-h-[600px] flex flex-col overflow-hidden bg-ink">
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
            <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/70" />

            {/* 上部: 100 VILLA + tagline (押し上げ) */}
            <div className="relative z-10 container mx-auto px-5 md:px-7 pt-20 md:pt-24 text-bg">
                <p className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-bg/65 mb-2.5 font-display">
                    Curated Vacation Rentals
                </p>
                <div className="flex items-end gap-3 md:gap-4">
                    <span className="font-display text-[18vw] md:text-[9rem] lg:text-[11rem] font-semibold leading-none tracking-tighter">
                        100
                    </span>
                    <div className="pb-1.5 md:pb-4">
                        <p className="font-display text-2xl md:text-5xl tracking-[0.15em] font-medium leading-none">
                            VILLA
                        </p>
                        <p className="text-[10px] md:text-xs tracking-[0.3em] text-bg/60 mt-1.5 font-display uppercase">
                            JAPAN&apos;s Best Stays
                        </p>
                    </div>
                </div>
                <p className="font-mincho text-base md:text-2xl font-bold tracking-wider mt-3 md:mt-4 max-w-2xl leading-relaxed">
                    {siteMeta.tagline}
                </p>
            </div>

            {/* 中央: 検索バー (flex-grow で空きスペース全部使って中央配置) */}
            <div className="relative z-10 container mx-auto px-5 md:px-7 flex-grow flex items-center">
                <div className="w-full">
                    <Suspense fallback={<div className="h-14" />}>
                        <SearchBar />
                    </Suspense>
                </div>
            </div>

            {/* 写真インジケータドット (右下) */}
            <div className="absolute bottom-3 right-5 md:right-10 z-10 flex gap-1.5">
                {imgs.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setImgIdx(i)}
                        aria-label={`画像 ${i + 1}`}
                        className={`h-1 rounded-full transition-all duration-500 ${
                            i === imgIdx ? "bg-bg/85 w-5" : "bg-bg/30 w-1.5"
                        }`}
                    />
                ))}
            </div>

            {/* スクロールヒント (下中央) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: loaded ? 1 : 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center text-bg/65 pointer-events-none"
            >
                <span className="text-[9px] tracking-[0.4em] uppercase mb-1 font-display">Discover</span>
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

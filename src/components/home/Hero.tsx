"use client";

import { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { siteMeta } from "@/data/siteMeta";
import { SearchBar } from "./SearchBar";
import { ViewerCounter } from "./ViewerCounter";

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
            {/* 微粒子グレイン + 上下のtinted overlay (Anti-Slop: flat に depth を) */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "linear-gradient(to bottom, rgba(20,16,12,0.55) 0%, rgba(20,16,12,0.30) 40%, rgba(20,16,12,0.78) 100%)",
                }}
            />

            {/* 上部: 100 VILLA + tagline (押し上げ) */}
            <div className="relative z-10 container mx-auto px-5 md:px-7 pt-20 md:pt-24 text-bg">
                <p className="text-[11px] md:text-xs tracking-[0.18em] text-gold-deep/90 mb-3 font-display italic">
                    — curated vacation rentals
                </p>
                <div className="flex items-end gap-3 md:gap-4">
                    <span
                        className="font-mincho text-[18vw] md:text-[9rem] lg:text-[11rem] font-medium leading-[0.85]"
                        style={{ letterSpacing: "-0.03em", fontVariantNumeric: "tabular-nums" }}
                    >
                        100
                    </span>
                    <div className="pb-1.5 md:pb-5">
                        <p className="font-display text-2xl md:text-5xl tracking-[0.18em] font-medium leading-none">
                            VILLA
                        </p>
                        <p className="text-[11px] md:text-xs tracking-[0.16em] text-bg/65 mt-2 font-display italic">
                            japan&apos;s best stays
                        </p>
                    </div>
                </div>
                <p
                    className="font-mincho text-lg md:text-3xl font-medium mt-5 md:mt-7 max-w-2xl leading-[1.5]"
                    style={{ letterSpacing: "-0.005em", textWrap: "balance" }}
                >
                    {siteMeta.tagline}
                </p>
                <div className="mt-4">
                    <ViewerCounter />
                </div>
            </div>

            {/* 中央上寄せ: 検索バー (タグライン直後に近い位置) */}
            <div className="relative z-10 container mx-auto px-5 md:px-7 flex-grow flex items-start pt-6 md:pt-10">
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
                <span className="text-[10px] tracking-[0.18em] mb-1 font-display italic">discover</span>
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

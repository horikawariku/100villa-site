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
        <section className="relative h-[92vh] md:h-[96vh] min-h-[680px] flex flex-col overflow-hidden bg-ink">
            {/* 背景写真クロスフェード — Ken Burns 効果 (slow zoom) */}
            <AnimatePresence mode="sync">
                <motion.div
                    key={imgIdx}
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ opacity: { duration: 1.8, ease: "easeInOut" }, scale: { duration: 7, ease: "easeOut" } }}
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
            {/* warm dark tinted overlay + 上下 vignette (flat 解消) */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse at 30% 30%, rgba(40,28,20,0.30) 0%, rgba(20,14,10,0.50) 50%, rgba(10,7,5,0.85) 100%)",
                }}
            />
            {/* 微細グレイン (premium texture) */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-overlay"
                style={{
                    backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
                }}
            />

            {/* 中央配置: 巨大 100 + tagline */}
            <div className="relative z-10 container mx-auto px-5 md:px-7 flex-1 flex flex-col justify-center text-bg">
                <p className="text-xs md:text-sm tracking-[0.16em] text-gold-deep/95 mb-6 md:mb-8 font-display italic">
                    — curated vacation rentals — japan&apos;s 100 best stays
                </p>
                <div className="relative">
                    <span
                        className="block font-mincho text-[36vw] md:text-[26rem] lg:text-[32rem] font-medium leading-[0.78] -ml-2 md:-ml-6"
                        style={{ letterSpacing: "-0.05em", fontVariantNumeric: "tabular-nums" }}
                    >
                        100
                    </span>
                    <p
                        className="absolute right-0 bottom-[8%] md:bottom-[12%] font-display text-3xl md:text-7xl lg:text-8xl tracking-[0.22em] font-light leading-none text-bg/95"
                    >
                        VILLA
                    </p>
                </div>
                <p
                    className="font-mincho text-xl md:text-4xl font-medium mt-8 md:mt-12 max-w-3xl leading-[1.45]"
                    style={{ letterSpacing: "-0.005em", textWrap: "balance" }}
                >
                    {siteMeta.tagline}
                </p>
                <div className="mt-6 md:mt-8">
                    <ViewerCounter />
                </div>
            </div>

            {/* 下部: 検索バー */}
            <div className="relative z-10 container mx-auto px-5 md:px-7 pb-12 md:pb-16">
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

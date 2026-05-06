"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryImage } from "@/data/types";

interface Props {
    images: GalleryImage[];
}

export function PropertyGallery({ images }: Props) {
    const [sel, setSel] = useState<number | null>(null);

    if (images.length === 0) return null;
    const main = images[0];
    const rest = images.slice(1);

    return (
        <>
            {/* メイン写真フルブリード */}
            <div
                className="relative w-full aspect-[4/5] md:aspect-[16/9] overflow-hidden cursor-pointer group"
                onClick={() => setSel(0)}
            >
                <Image
                    src={main.src}
                    alt={main.caption ?? ""}
                    fill
                    priority
                    className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
                    sizes="100vw"
                />
                {main.caption && (
                    <div className="absolute bottom-3 left-3 md:bottom-5 md:left-5 px-2.5 py-1 bg-black/55 backdrop-blur-sm text-white text-[11px] md:text-xs tracking-widest">
                        {main.caption}
                    </div>
                )}
                <div className="absolute bottom-3 right-3 md:bottom-5 md:right-5 px-2.5 py-1 bg-bg/85 text-ink text-[10px] tracking-widest">
                    1 / {images.length}
                </div>
            </div>

            {/* グリッド */}
            <div className="container mx-auto px-1 md:px-6 mt-1 md:mt-2">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-2">
                    {rest.slice(0, 7).map((img, i) => (
                        <div
                            key={i}
                            onClick={() => setSel(i + 1)}
                            className="relative aspect-[4/3] overflow-hidden cursor-pointer group"
                        >
                            <Image
                                src={img.src}
                                alt={img.caption ?? ""}
                                fill
                                className="object-cover group-hover:scale-[1.04] transition-transform duration-700"
                                sizes="(max-width: 768px) 50vw, 25vw"
                            />
                            {img.caption && (
                                <div className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 bg-black/55 backdrop-blur-sm text-white text-[9px] tracking-wider">
                                    {img.caption}
                                </div>
                            )}
                        </div>
                    ))}
                    {rest.length > 7 && (
                        <div
                            onClick={() => setSel(8)}
                            className="relative aspect-[4/3] overflow-hidden cursor-pointer bg-ink flex items-center justify-center text-bg"
                        >
                            <p className="font-display text-2xl md:text-3xl font-semibold leading-none">
                                +{images.length - 8}
                            </p>
                            <span className="absolute bottom-2 text-[10px] tracking-widest text-bg/55 uppercase font-display">
                                more
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* ライトボックス */}
            <AnimatePresence>
                {sel !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center"
                        onClick={() => setSel(null)}
                    >
                        <button
                            onClick={() => setSel(null)}
                            className="absolute top-4 right-4 text-white/60 hover:text-white"
                            aria-label="閉じる"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setSel(sel > 0 ? sel - 1 : images.length - 1);
                            }}
                            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 text-white/30 hover:text-white"
                            aria-label="前へ"
                        >
                            <ChevronLeft className="w-8 h-8" />
                        </button>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setSel(sel < images.length - 1 ? sel + 1 : 0);
                            }}
                            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 text-white/30 hover:text-white"
                            aria-label="次へ"
                        >
                            <ChevronRight className="w-8 h-8" />
                        </button>
                        <div className="relative w-full max-w-5xl h-[65vh] md:h-[80vh] mx-4">
                            <Image
                                src={images[sel].src}
                                alt={images[sel].caption ?? ""}
                                fill
                                className="object-contain"
                                sizes="100vw"
                            />
                        </div>
                        <div className="absolute bottom-5 flex flex-col items-center gap-1.5">
                            {images[sel].caption && (
                                <span className="text-white/85 text-sm tracking-widest font-medium">
                                    {images[sel].caption}
                                </span>
                            )}
                            <span className="text-white/45 text-xs tracking-widest">
                                {sel + 1} / {images.length}
                            </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

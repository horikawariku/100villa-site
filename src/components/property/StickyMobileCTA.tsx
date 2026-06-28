"use client";

import { useEffect, useState } from "react";
import { OfficialSiteCTA } from "./OfficialSiteCTA";
import type { Property } from "@/data/types";

interface Props {
    property: Property;
}

/** モバイルで常に画面下に貼り付くCTA。スクロールが少し進んだら出る */
export function StickyMobileCTA({ property }: Props) {
    const [show, setShow] = useState(false);
    useEffect(() => {
        const onScroll = () => setShow(window.scrollY > 300);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    if (!show) return null;
    return (
        <div className="fixed bottom-0 left-0 w-full z-40 md:hidden bg-bg/95 backdrop-blur-md border-t border-line p-3 shadow-lg">
            <div className="flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                    <p className="font-sans text-sm font-bold truncate">{property.name}</p>
                    <p className="text-[10px] tracking-widest text-mute mt-0.5">
                        ¥{property.pricePerPersonFrom.toLocaleString()}〜 / 人
                    </p>
                </div>
                <OfficialSiteCTA property={property} placement="sticky" />
            </div>
        </div>
    );
}

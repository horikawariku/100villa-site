import Link from "next/link";
import Image from "next/image";
import { REGION_LABEL, type Region } from "@/data/types";
import { REGION_IMAGE } from "@/data/regionImages";
import { getAllProperties } from "@/data/properties";

const REGIONS: Region[] = ["hokkaido", "tohoku", "kanto", "chubu", "kansai", "chugoku", "shikoku", "kyushu", "okinawa"];

const REGION_EN: Record<Region, string> = {
    hokkaido: "Hokkaido",
    tohoku: "Tohoku",
    kanto: "Kanto",
    chubu: "Chubu",
    kansai: "Kansai",
    chugoku: "Chugoku",
    shikoku: "Shikoku",
    kyushu: "Kyushu",
    okinawa: "Okinawa",
};

export function RegionTiles() {
    const all = getAllProperties();
    const counts = REGIONS.reduce<Record<Region, number>>((acc, r) => {
        acc[r] = all.filter((p) => p.area.region === r).length;
        return acc;
    }, {} as Record<Region, number>);

    return (
        <section id="area" className="py-14 md:py-20">
            <div className="container mx-auto px-5 md:px-7 mb-8 md:mb-10">
                <div className="text-center">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-gold-deep font-display mb-2">Area</p>
                    <h2 className="font-mincho text-2xl md:text-3xl font-bold tracking-wide">エリアから探す</h2>
                </div>
            </div>
            {/* 横スクロール写真タイル */}
            <div className="overflow-x-auto no-scrollbar">
                <div className="inline-flex gap-2 md:gap-3 px-5 md:px-7">
                    {REGIONS.map((r) => (
                        <Link
                            key={r}
                            href={`/area/${r}`}
                            className="group relative w-[44vw] sm:w-[260px] md:w-[300px] aspect-[4/3] shrink-0 overflow-hidden bg-ink"
                        >
                            <Image
                                src={REGION_IMAGE[r]}
                                alt={REGION_LABEL[r]}
                                fill
                                className="object-cover opacity-75 group-hover:opacity-90 group-hover:scale-[1.05] transition-all duration-700"
                                sizes="(max-width: 640px) 44vw, 300px"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20" />
                            <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-5 text-bg">
                                <p className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-bg/65 font-display mb-1">
                                    {REGION_EN[r]}
                                </p>
                                <div className="flex items-end justify-between">
                                    <h3 className="font-mincho text-lg md:text-2xl font-bold tracking-wide leading-none">
                                        {REGION_LABEL[r]}
                                    </h3>
                                    <span className="font-display text-[10px] md:text-xs tracking-widest text-bg/65">
                                        {counts[r]} <span className="text-[8px]">stays</span>
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                    <div className="w-3 shrink-0" />
                </div>
            </div>
        </section>
    );
}

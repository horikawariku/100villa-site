import Link from "next/link";
import Image from "next/image";
import { REGION_LABEL, type Region } from "@/data/types";
import { REGION_IMAGE } from "@/data/regionImages";
import { getAllProperties } from "@/data/properties";
import { SectionHeader } from "./SectionHeader";

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
        <section id="area" className="py-6 md:py-8">
            <div className="container mx-auto px-5 md:px-7">
                <SectionHeader eyebrow="Area" title="エリアから探す" />
            </div>
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
                                <p className="text-[11px] md:text-xs tracking-[0.1em] text-gold-deep/90 font-display italic mb-1.5">
                                    {REGION_EN[r].toLowerCase()}
                                </p>
                                <div className="flex items-end justify-between">
                                    <h3 className="font-mincho text-xl md:text-2xl font-medium leading-none" style={{ letterSpacing: "-0.005em" }}>
                                        {REGION_LABEL[r]}
                                    </h3>
                                    <span className="text-[11px] md:text-xs tracking-[0.04em] text-bg/65 font-light" style={{ fontVariantNumeric: "tabular-nums" }}>
                                        {counts[r]} <span className="opacity-70">stays</span>
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

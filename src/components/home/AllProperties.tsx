import { PropertyCard } from "@/components/property/PropertyCard";
import { getAllProperties } from "@/data/properties";

export function AllProperties() {
    const all = getAllProperties();
    return (
        <section id="all" className="py-9 md:py-12">
            <div className="container mx-auto px-5 md:px-7">
                <div className="flex items-end justify-between mb-8 md:mb-10">
                    <div>
                        <p className="text-[10px] tracking-[0.3em] uppercase text-gold-deep font-display mb-1.5">
                            All Stays
                        </p>
                        <h2 className="font-mincho text-2xl md:text-3xl font-bold tracking-wide">全宿一覧</h2>
                    </div>
                    <p className="text-[11px] tracking-widest text-mute">{all.length} stays</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
                    {all.map((p) => (
                        <PropertyCard key={p.id} property={p} size="md" />
                    ))}
                </div>
            </div>
        </section>
    );
}

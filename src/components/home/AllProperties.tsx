import { PropertyCard } from "@/components/property/PropertyCard";
import { getAllProperties } from "@/data/properties";
import { SectionHeader } from "./SectionHeader";

export function AllProperties() {
    const all = getAllProperties();
    return (
        <section id="all" className="py-6 md:py-8">
            <div className="container mx-auto px-5 md:px-7">
                <SectionHeader eyebrow="All Stays" title="全宿一覧" suffix={`${all.length} stays`} />
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
                    {all.map((p) => (
                        <PropertyCard key={p.id} property={p} size="md" />
                    ))}
                </div>
            </div>
        </section>
    );
}

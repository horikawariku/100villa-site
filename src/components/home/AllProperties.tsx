import { PropertyCard } from "@/components/property/PropertyCard";
import { getAllProperties } from "@/data/properties";
import { SectionHeader } from "./SectionHeader";

export function AllProperties() {
    const all = getAllProperties();
    return (
        <section id="all" className="py-12 md:py-16 bg-bg-alt">
            <div className="container mx-auto px-5 md:px-7">
                <SectionHeader en="Stays" jp="全宿一覧" suffix={`${all.length} stays`} />
                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-10 md:gap-x-7 md:gap-y-14">
                    {all.map((p) => (
                        <PropertyCard key={p.id} property={p} size="md" />
                    ))}
                </div>
            </div>
        </section>
    );
}

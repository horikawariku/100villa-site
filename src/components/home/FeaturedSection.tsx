import { PropertyCard } from "@/components/property/PropertyCard";
import { getFeaturedProperties } from "@/data/properties";
import { SectionHeader } from "./SectionHeader";

export function FeaturedSection() {
    const featured = getFeaturedProperties();
    if (featured.length === 0) return null;
    return (
        <section className="py-20 md:py-28">
            <div className="container mx-auto px-5 md:px-7">
                <SectionHeader en="Popular" jp="人気の宿" />
                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-10 md:gap-x-7 md:gap-y-14">
                    {featured.map((p) => (
                        <PropertyCard key={p.id} property={p} size="md" />
                    ))}
                </div>
            </div>
        </section>
    );
}

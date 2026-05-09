import { PropertyCard } from "@/components/property/PropertyCard";
import { getFeaturedProperties } from "@/data/properties";
import { SectionHeader } from "./SectionHeader";

export function FeaturedSection() {
    const featured = getFeaturedProperties();
    if (featured.length === 0) return null;
    return (
        <section className="py-6 md:py-8 bg-bg-card/40 border-y border-line">
            <div className="container mx-auto px-5 md:px-7">
                <SectionHeader eyebrow="Popular Stays" title="人気の宿" />
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-5">
                    {featured.map((p) => (
                        <PropertyCard key={p.id} property={p} size="md" />
                    ))}
                </div>
            </div>
        </section>
    );
}

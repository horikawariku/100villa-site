import { PropertyCard } from "@/components/property/PropertyCard";
import { getFeaturedProperties } from "@/data/properties";

export function FeaturedSection() {
    const featured = getFeaturedProperties();
    if (featured.length === 0) return null;
    return (
        <section className="py-14 md:py-20 bg-bg-card/40 border-y border-line">
            <div className="container mx-auto px-5 md:px-7">
                <div className="text-center mb-10">
                    <p className="text-[10px] tracking-[0.3em] uppercase text-gold-deep font-display mb-2">
                        Editor&apos;s Pick
                    </p>
                    <h2 className="font-mincho text-2xl md:text-3xl font-bold tracking-wide">編集部のおすすめ</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
                    {featured.map((p) => (
                        <PropertyCard key={p.id} property={p} size="lg" />
                    ))}
                </div>
            </div>
        </section>
    );
}

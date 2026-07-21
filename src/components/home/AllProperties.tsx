import { PropertyCard } from "@/components/property/PropertyCard";
import { getAllProperties } from "@/data/properties";
import { SectionHeader } from "./SectionHeader";

export function AllProperties() {
    const all = getAllProperties();
    // クライアント宿 (成果報酬あり) を先頭に。featured クライアント (ao/gozahills) は
    // モバイル全幅・デスクトップ2列の大判で最上段に置く (ラベルではなく並びと大きさで推す)。
    const heroClients = all.filter((p) => p.isClient && p.featured);
    const rest = [
        ...all.filter((p) => p.isClient && !p.featured),
        ...all.filter((p) => !p.isClient),
    ];
    return (
        <section id="all" className="py-12 md:py-16 bg-bg-alt">
            <div className="container mx-auto px-5 md:px-7">
                <SectionHeader en="Stays" jp="全宿一覧" suffix={`${all.length} stays`} />
                {heroClients.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-7 gap-y-10 mb-10 md:mb-14">
                        {heroClients.map((p) => (
                            <PropertyCard key={p.id} property={p} size="lg" vtName={`photo-${p.id}`} />
                        ))}
                    </div>
                )}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-10 md:gap-x-7 md:gap-y-14">
                    {rest.map((p) => (
                        <PropertyCard key={p.id} property={p} size="md" vtName={`photo-${p.id}`} />
                    ))}
                </div>
            </div>
        </section>
    );
}

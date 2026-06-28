interface Props {
    /** 英語見出し (大) */
    en: string;
    /** 和文サブ (小) */
    jp: string;
    /** 任意・見出し右の補助 (件数等) */
    suffix?: string;
}

/**
 * earthboat / mysa 調のバイリンガル見出し:
 *   英語見出し (ゴシック・大) → 和文サブ (小・muted)。明朝・装飾アクセントは使わない。
 */
export function SectionHeader({ en, jp, suffix }: Props) {
    return (
        <div className="mb-6 md:mb-8">
            <div className="flex items-baseline gap-3 flex-wrap">
                <h2 className="font-sans text-3xl md:text-5xl font-bold text-ink leading-none tracking-[0.01em]">
                    {en}
                </h2>
                {suffix && (
                    <span className="text-xs md:text-sm text-mute" style={{ fontVariantNumeric: "tabular-nums" }}>
                        {suffix}
                    </span>
                )}
            </div>
            <p className="text-sm md:text-base text-ink-soft mt-3">{jp}</p>
        </div>
    );
}

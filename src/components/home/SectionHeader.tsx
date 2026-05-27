interface Props {
    eyebrow: string;
    title: string;
    /** 任意・タイトルの右側に表示する補助テキスト (件数等) */
    suffix?: string;
}

/**
 * ホームページ各セクションの共通ヘッダ。
 * 左寄せ・ゴシック (font-display) ・下線。デザイン統一用。
 */
export function SectionHeader({ eyebrow, title, suffix }: Props) {
    return (
        <div className="mb-12 md:mb-16 max-w-3xl">
            <p className="text-xs md:text-sm tracking-[0.14em] text-gold-deep font-display italic mb-4 md:mb-5">
                — {eyebrow.toLowerCase()}
            </p>
            <div className="flex items-baseline gap-4 flex-wrap">
                <h2
                    className="font-mincho text-4xl md:text-6xl font-medium text-ink leading-[0.95]"
                    style={{ letterSpacing: "-0.015em" }}
                >
                    {title}
                </h2>
                {suffix && (
                    <span
                        className="text-sm md:text-base text-mute font-light tracking-wide italic"
                        style={{ fontVariantNumeric: "tabular-nums" }}
                    >
                        {suffix}
                    </span>
                )}
            </div>
        </div>
    );
}

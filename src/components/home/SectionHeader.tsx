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
        <div className="mb-8 md:mb-10">
            <p className="text-[11px] tracking-[0.14em] text-gold-deep font-display italic mb-2.5">
                — {eyebrow.toLowerCase()}
            </p>
            <div className="flex items-baseline gap-3 flex-wrap">
                <h2
                    className="font-mincho text-2xl md:text-[2rem] font-medium text-ink leading-[1.1]"
                    style={{ letterSpacing: "-0.005em" }}
                >
                    {title}
                </h2>
                {suffix && (
                    <span
                        className="text-xs md:text-sm text-mute font-light tracking-wide"
                        style={{ fontVariantNumeric: "tabular-nums" }}
                    >
                        {suffix}
                    </span>
                )}
            </div>
        </div>
    );
}

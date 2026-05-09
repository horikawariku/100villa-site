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
        <div className="border-b border-line/70 pb-3 mb-6 md:mb-7">
            <p className="text-[10px] tracking-[0.3em] uppercase text-gold-deep font-display mb-1">
                {eyebrow}
            </p>
            <div className="flex items-baseline gap-3">
                <h2 className="font-display text-lg md:text-2xl font-bold tracking-wider text-ink">
                    {title}
                </h2>
                {suffix && (
                    <span className="text-xs md:text-sm text-mute font-normal">{suffix}</span>
                )}
            </div>
        </div>
    );
}

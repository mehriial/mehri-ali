import { MessageCircle } from "lucide-react";

const fontMap = {
    Inter: "Inter, sans-serif",
    Georgia: "Georgia, serif",
    "Times New Roman": '"Times New Roman", serif',
    Outfit: '"Outfit Variable", sans-serif',
};

function ReaderContent({
                           book,
                           chapter,
                           settings,
                           selectedParagraph,
                           onParagraphClick,
                       }) {
    const isBlackBackground = settings.background === "black";

    const mutedColor = isBlackBackground
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.35)";

    const borderColor = isBlackBackground
        ? "rgba(255,255,255,.08)"
        : "rgba(0,0,0,.08)";

    const iconColor = isBlackBackground
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.3)";

    const selectedBackground = isBlackBackground
        ? "rgba(255,255,255,.035)"
        : "rgba(0,0,0,.025)";

    return (
        <article
            className="
                mx-auto
                w-full
                max-w-3xl
                px-5
                py-16
                sm:px-8
                sm:py-24
                lg:py-28
            "
            style={{
                fontFamily:
                    fontMap[settings.font] ?? fontMap.Inter,
            }}
        >
            {/* Chapter Header */}
            <header className="mb-16 text-center sm:mb-20">
                <span
                    className="text-[9px] uppercase tracking-[0.35em]"
                    style={{
                        color: mutedColor,
                    }}
                >
                    Bölüm {chapter.number}
                </span>

                <h1 className="mt-5 font-serif text-4xl tracking-tight sm:text-5xl">
                    {chapter.title}
                </h1>

                {chapter.publishedAt && (
                    <p
                        className="mt-4 text-[10px] tracking-wide"
                        style={{
                            color: mutedColor,
                        }}
                    >
                        {chapter.publishedAt}
                    </p>
                )}
            </header>

            {/* Content */}
            <div
                className="space-y-7 select-none"
                onContextMenu={(event) => event.preventDefault()}
                style={{
                    fontSize: `${settings.fontSize}px`,
                    lineHeight: 1.9,
                }}
            >
                {chapter.content?.map((paragraph, index) => {
                    const isSelected =
                        selectedParagraph === index;

                    return (
                        <div
                            key={index}
                            className="group relative"
                        >
                            <div
                                className="
                                    relative
                                    cursor-pointer
                                    rounded-md
                                    px-2
                                    py-1
                                    -mx-2
                                    transition-colors
                                "
                                style={{
                                    backgroundColor:
                                        isSelected
                                            ? selectedBackground
                                            : "transparent",
                                }}
                            >
                                <p>{paragraph}</p>

                                {/* Paragraph Comment */}
                                <button
                                    type="button"
                                    aria-label={`Paragraf ${index + 1} yorumları`}
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        onParagraphClick(index);
                                    }}
                                    className="
                                        absolute
                                        -right-11
                                        bottom-1
                                        hidden
                                        h-7
                                        w-7
                                        items-center
                                        justify-center
                                        rounded-full
                                        border
                                        transition-all
                                        duration-200
                                        hover:bg-white/5
                                        sm:flex
                                        opacity-0
                                        group-hover:opacity-100
                                    "
                                    style={{
                                        color: iconColor,
                                        borderColor,
                                    }}
                                >
                                    <MessageCircle className="h-3.5 w-3.5" />
                                </button>

                                {/* Mobile Comment Button */}
                                <button
                                    type="button"
                                    aria-label={`Paragraf ${index + 1} yorumları`}
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        onParagraphClick(index);
                                    }}
                                    className="
                                        mt-3
                                        flex
                                        h-7
                                        items-center
                                        gap-2
                                        text-[9px]
                                        sm:hidden
                                    "
                                    style={{
                                        color: iconColor,
                                    }}
                                >
                                    <MessageCircle className="h-3.5 w-3.5" />
                                    <span>
                                        Yorumlar
                                    </span>
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Chapter Comments */}
            <div
                className="mt-20 border-t pt-10 sm:mt-24"
                style={{
                    borderColor,
                }}
            >
                <button
                    type="button"
                    onClick={() => onParagraphClick(null)}
                    className="
                        group
                        mx-auto
                        flex
                        items-center
                        gap-2.5
                        rounded-full
                        border
                        px-5
                        py-2.5
                        text-[10px]
                        transition-all
                        duration-300
                        hover:bg-white/5
                    "
                    style={{
                        borderColor,
                        color: mutedColor,
                    }}
                >
                    <MessageCircle className="h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110" />

                    <span>
                        Bölüm yorumları
                    </span>
                </button>
            </div>
        </article>
    );
}

export default ReaderContent;
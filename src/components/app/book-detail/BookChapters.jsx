import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

function BookChapters({ book }) {
    const chapters = book.chapters ?? [];

    if (!chapters.length) {
        return (
            <div className="py-20 sm:py-24 lg:py-16">
                <div className="flex min-h-[240px] flex-col items-center justify-center text-center">
                    <span
                        className="text-[9px] uppercase tracking-[0.35em]"
                        style={{
                            color: "var(--book-muted)",
                        }}
                    >
                        Bölümler
                    </span>

                    <p className="mt-4 font-serif text-2xl text-white/60">
                        Henüz bölüm yayınlanmadı.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="py-20 sm:py-24 lg:py-16">
            {/* Header */}
            <div className="mb-10 flex items-end gap-4">
                <div className="flex items-start gap-3">
                    <span
                        className="mt-2 h-px w-8 shrink-0"
                        style={{
                            backgroundColor: "var(--book-accent)",
                            opacity: 0.65,
                        }}
                    />

                    <div>
                        <span
                            className="block text-[9px] font-medium uppercase tracking-[0.35em]"
                            style={{
                                color: "var(--book-muted)",
                            }}
                        >
                            {chapters.length} bölüm
                        </span>

                        <h2 className="mt-2 font-serif text-3xl tracking-tight text-white sm:text-4xl">
                            Bölümler
                        </h2>
                    </div>
                </div>

                <span
                    className="mb-1 h-px flex-1"
                    style={{
                        backgroundColor:
                            "color-mix(in srgb, var(--book-accent) 10%, transparent)",
                    }}
                />
            </div>

            {/* Chapters */}
            <div
                className="border-t"
                style={{
                    borderColor:
                        "color-mix(in srgb, var(--book-accent) 12%, transparent)",
                }}
            >
                {chapters.map((chapter) => (
                    <Link
                        key={chapter.id}
                        to={`/books/${book.slug}/read/${chapter.number}`}
                        className="
                            group
                            grid
                            grid-cols-[48px_1fr_auto]
                            items-center
                            gap-4
                            border-b
                            py-5
                            transition-all
                            duration-300
                            sm:grid-cols-[64px_1fr_auto]
                            sm:gap-6
                        "
                        style={{
                            borderColor:
                                "color-mix(in srgb, var(--book-accent) 9%, transparent)",
                        }}
                    >
                        {/* Number */}
                        <span
                            className="font-serif text-lg transition-colors duration-300"
                            style={{
                                color:
                                    "color-mix(in srgb, var(--book-accent) 55%, white)",
                            }}
                        >
                            {String(chapter.number).padStart(2, "0")}
                        </span>

                        {/* Info */}
                        <div className="min-w-0">
                            <h3 className="truncate text-sm font-medium text-white/75 transition-colors duration-300 group-hover:text-white sm:text-base">
                                {chapter.title}
                            </h3>

                            {chapter.publishedAt && (
                                <span className="mt-1 block text-[10px] text-white/25">
                                    {chapter.publishedAt}
                                </span>
                            )}
                        </div>

                        {/* Arrow */}
                        <ArrowUpRight
                            className="
                                h-4 w-4
                                text-white/20
                                transition-all
                                duration-300
                                group-hover:-translate-y-0.5
                                group-hover:translate-x-0.5
                            "
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default BookChapters;
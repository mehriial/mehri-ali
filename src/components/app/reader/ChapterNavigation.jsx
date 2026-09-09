import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

function ChapterNavigation({
                               book,
                               currentIndex,
                           }) {
    const chapters = book.chapters ?? [];

    const previousChapter =
        currentIndex > 0
            ? chapters[currentIndex - 1]
            : null;

    const nextChapter =
        currentIndex < chapters.length - 1
            ? chapters[currentIndex + 1]
            : null;

    return (
        <section
            className="border-t"
            style={{
                borderColor:
                    "color-mix(in srgb, var(--book-accent) 10%, transparent)",
            }}
        >
            <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
                <div className="grid grid-cols-2 gap-3">
                    {previousChapter ? (
                        <Link
                            to={`/books/${book.slug}/read/${previousChapter.number}`}
                            className="
                                group
                                border
                                p-4
                                transition-colors
                                hover:bg-black/5
                                sm:p-5
                            "
                            style={{
                                borderColor:
                                    "color-mix(in srgb, var(--book-accent) 10%, transparent)",
                            }}
                        >
                            <span className="flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] opacity-40">
                                <ArrowLeft className="h-3 w-3" />
                                Önceki bölüm
                            </span>

                            <span className="mt-3 block truncate font-serif text-lg">
                                {previousChapter.title}
                            </span>
                        </Link>
                    ) : (
                        <div />
                    )}

                    {nextChapter ? (
                        <Link
                            to={`/books/${book.slug}/read/${nextChapter.number}`}
                            className="
                                group
                                border
                                p-4
                                text-right
                                transition-colors
                                hover:bg-black/5
                                sm:p-5
                            "
                            style={{
                                borderColor:
                                    "color-mix(in srgb, var(--book-accent) 10%, transparent)",
                            }}
                        >
                            <span className="flex items-center justify-end gap-2 text-[9px] uppercase tracking-[0.2em] opacity-40">
                                Sonraki bölüm
                                <ArrowRight className="h-3 w-3" />
                            </span>

                            <span className="mt-3 block truncate font-serif text-lg">
                                {nextChapter.title}
                            </span>
                        </Link>
                    ) : (
                        <div />
                    )}
                </div>
            </div>
        </section>
    );
}

export default ChapterNavigation;
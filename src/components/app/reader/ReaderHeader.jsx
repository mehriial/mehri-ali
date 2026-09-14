import { useState } from "react";
import {
    ArrowLeft,
    BookOpen,
    Menu,
    MessageCircle,
    Settings,
    X,
} from "lucide-react";
import { Link } from "react-router-dom";

function ReaderHeader({
                          book,
                          chapter,
                          onSettings,
                          onComments,
                      }) {
    const [chaptersOpen, setChaptersOpen] = useState(false);

    const chapters = book.chapters ?? [];

    return (
        <>
            {/* Reader Header */}
            <div
                className="
                    sticky
                    top-0
                    z-30
                    border-y
                    backdrop-blur-xl
                    py-2
                    text-white
                "
                style={{
                    backgroundColor:
                        "color-mix(in srgb, var(--book-bg) 88%, transparent)",
                    borderColor:
                        "color-mix(in srgb, var(--book-accent) 10%, transparent)",
                }}
            >
                <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-5 text-white sm:px-8">
                    {/* Back */}
                    <Link
                        to={`/books/${book.slug}`}
                        className="
                            flex
                            min-w-0
                            items-center
                            gap-3
                            opacity-60
                            transition-opacity
                            hover:opacity-100
                        "
                    >
                        <ArrowLeft className="h-4 w-4 shrink-0" />

                        <div className="min-w-0">
                            <p className="truncate text-xs">
                                {book.title}
                            </p>

                            <p className="truncate text-[10px] opacity-50">
                                Bölüm {chapter.number} ·{" "}
                                {chapter.title}
                            </p>
                        </div>
                    </Link>

                    {/* Actions */}
                    <div className="flex shrink-0 items-center gap-1">
                        {/* Comments */}
                        <button
                            type="button"
                            onClick={onComments}
                            aria-label="Yorumlar"
                            className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-full
                                text-white/50
                                transition-all
                                hover:bg-white/5
                                hover:text-white
                            "
                        >
                            <MessageCircle className="h-4 w-4" />
                        </button>

                        {/* Settings */}
                        <button
                            type="button"
                            onClick={onSettings}
                            aria-label="Okuma ayarları"
                            className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-full
                                text-white/50
                                transition-all
                                hover:bg-white/5
                                hover:text-white
                            "
                        >
                            <Settings className="h-4 w-4" />
                        </button>

                        {/* Chapters */}
                        <button
                            type="button"
                            onClick={() =>
                                setChaptersOpen(true)
                            }
                            aria-label="Bölümler"
                            className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-full
                                text-white/50
                                transition-all
                                hover:bg-white/5
                                hover:text-white
                            "
                        >
                            <Menu className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Chapters Drawer Overlay */}
            {chaptersOpen && (
                <div
                    className="
                        fixed
                        inset-0
                        z-40
                        bg-black/60
                        backdrop-blur-sm
                    "
                    onClick={() =>
                        setChaptersOpen(false)
                    }
                />
            )}

            {/* Chapters Drawer */}
            <aside
                className={`
                    fixed
                    right-0
                    top-0
                    z-50
                    flex
                    h-full
                    w-full
                    max-w-sm
                    flex-col
                    border-l
                    border-white/[0.08]
                    bg-black
                    text-white
                    shadow-2xl
                    transition-transform
                    duration-300
                    ${
                    chaptersOpen
                        ? "translate-x-0"
                        : "pointer-events-none translate-x-full"
                }
                `}
            >
                {/* Drawer Header */}
                <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/[0.08] px-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03]">
                            <BookOpen className="h-3.5 w-3.5 text-white/50" />
                        </div>

                        <div>
                            <span className="text-[9px] uppercase tracking-[0.3em] text-white/30">
                                {book.series ?? "Kitap"}
                            </span>

                            <h2 className="mt-0.5 font-serif text-lg text-white">
                                Bölümler
                            </h2>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            setChaptersOpen(false)
                        }
                        aria-label="Kapat"
                        className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-full
                            text-white/40
                            transition-colors
                            hover:bg-white/5
                            hover:text-white
                        "
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {/* Book Info */}
                <div className="border-b border-white/[0.06] px-5 py-5">
                    <p className="text-xs text-white/70">
                        {book.title}
                    </p>

                    <p className="mt-1 text-[10px] text-white/30">
                        {chapters.length} bölüm
                    </p>
                </div>

                {/* Chapter List */}
                <div className="flex-1 overflow-y-auto px-3 py-3">
                    {chapters.length > 0 ? (
                        <div className="space-y-1">
                            {chapters.map(
                                (item) => {
                                    const isActive =
                                        item.id ===
                                        chapter.id;

                                    return (
                                        <Link
                                            key={item.id}
                                            to={`/books/${book.slug}/read/${item.number}`}
                                            onClick={() =>
                                                setChaptersOpen(
                                                    false
                                                )
                                            }
                                            className={`
                                                group
                                                flex
                                                items-center
                                                gap-3
                                                rounded-lg
                                                border
                                                px-3
                                                py-3
                                                transition-all
                                                duration-200
                                                ${
                                                isActive
                                                    ? "bg-white/[0.05]"
                                                    : "border-transparent hover:bg-white/[0.03]"
                                            }
                                            `}
                                            style={{
                                                borderColor:
                                                    isActive
                                                        ? "color-mix(in srgb, var(--book-accent) 18%, transparent)"
                                                        : "transparent",
                                            }}
                                        >
                                            {/* Number */}
                                            <span
                                                className="
                                                    flex
                                                    h-8
                                                    w-8
                                                    shrink-0
                                                    items-center
                                                    justify-center
                                                    rounded-md
                                                    text-[10px]
                                                    tabular-nums
                                                "
                                                style={{
                                                    color:
                                                        isActive
                                                            ? "var(--book-accent)"
                                                            : "rgba(255,255,255,.3)",
                                                    backgroundColor:
                                                        isActive
                                                            ? "color-mix(in srgb, var(--book-accent) 8%, transparent)"
                                                            : "rgba(255,255,255,.03)",
                                                }}
                                            >
                                                {String(
                                                    item.number
                                                ).padStart(
                                                    2,
                                                    "0"
                                                )}
                                            </span>

                                            {/* Info */}
                                            <div className="min-w-0 flex-1">
                                                <p
                                                    className={`
                                                        truncate
                                                        text-xs
                                                        ${
                                                        isActive
                                                            ? "text-white"
                                                            : "text-white/60 group-hover:text-white/90"
                                                    }
                                                    `}
                                                >
                                                    {
                                                        item.title
                                                    }
                                                </p>

                                                {item.publishedAt && (
                                                    <p className="mt-1 text-[9px] text-white/25">
                                                        {
                                                            item.publishedAt
                                                        }
                                                    </p>
                                                )}
                                            </div>

                                            {/* Active Indicator */}
                                            {isActive && (
                                                <span
                                                    className="h-1.5 w-1.5 shrink-0 rounded-full"
                                                    style={{
                                                        backgroundColor:
                                                            "var(--book-accent)",
                                                    }}
                                                />
                                            )}
                                        </Link>
                                    );
                                }
                            )}
                        </div>
                    ) : (
                        <div className="flex min-h-[240px] flex-col items-center justify-center text-center">
                            <BookOpen className="h-5 w-5 text-white/20" />

                            <p className="mt-4 text-[10px] uppercase tracking-[0.25em] text-white/25">
                                Henüz bölüm yok
                            </p>
                        </div>
                    )}
                </div>
            </aside>
        </>
    );
}

export default ReaderHeader;
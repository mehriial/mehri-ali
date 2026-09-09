import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { books } from "@/data/books";
import BookDetailHero from "./BookDetailHero";
import OtherBooks from "./OtherBooks.jsx";
import BookChapters from "./BookChapters";
import BookCharacters from "./BookCharacters";
import BookGallery from "./BookGallery";

const tabs = [
    {
        id: "chapters",
        label: "Bölümler",
    },
    {
        id: "characters",
        label: "Karakterler",
    },
    {
        id: "gallery",
        label: "Galeri",
    },
    {
        id: "other",
        label: "Diğer",
    },
];

function BookDetail() {
    const { slug } = useParams();
    const [activeTab, setActiveTab] = useState("chapters");

    const book = useMemo(
        () => books.find((item) => item.slug === slug),
        [slug]
    );

    useEffect(() => {
        if (!book) return;

        const theme = {
            slug: book.slug,
            mainColor: book.theme?.background ?? "#080808",
        };

        localStorage.setItem("bookTheme", JSON.stringify(theme));

        window.dispatchEvent(new Event("bookThemeChanged"));

        return () => {
            localStorage.removeItem("bookTheme");
            window.dispatchEvent(new Event("bookThemeChanged"));
        };
    }, [book]);

    if (!book) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black px-5 text-center text-white">
                <div>
                    <span className="text-[9px] uppercase tracking-[0.35em] text-white/30">
                        404
                    </span>

                    <h1 className="mt-4 font-serif text-4xl">
                        Kitap bulunamadı.
                    </h1>
                </div>
            </div>
        );
    }

    return (
        <div
            className="min-h-screen overflow-hidden"
            style={{
                "--book-bg": book.theme?.background ?? "#080808",
                "--book-accent": book.theme?.accent ?? "#ffffff",
                "--book-muted": book.theme?.muted ?? "#999999",
            }}
        >
            <BookDetailHero book={book} />

            <section
                className="border-t"
                style={{
                    borderColor:
                        "color-mix(in srgb, var(--book-accent) 10%, transparent)",
                    backgroundColor:
                        "color-mix(in srgb, var(--book-bg) 96%, black)",
                }}
            >
                <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">

                    {/* Tabs */}
                    <div
                        className="
                            flex
                            overflow-x-auto
                            border-b
                            scrollbar-none
                        "
                        style={{
                            borderColor:
                                "color-mix(in srgb, var(--book-accent) 10%, transparent)",
                        }}
                    >
                        {tabs.map((tab) => {
                            const isActive = activeTab === tab.id;

                            return (
                                <button
                                    key={tab.id}
                                    type="button"
                                    onClick={() => setActiveTab(tab.id)}
                                    className="
                                        relative
                                        shrink-0
                                        px-5
                                        py-5
                                        text-[11px]
                                        transition-colors
                                        duration-300
                                        sm:px-7
                                    "
                                    style={{
                                        color: isActive
                                            ? "white"
                                            : "rgba(255,255,255,0.35)",
                                    }}
                                >
                                    {tab.label}

                                    {isActive && (
                                        <span
                                            className="absolute inset-x-5 bottom-0 h-px sm:inset-x-7"
                                            style={{
                                                backgroundColor:
                                                    "var(--book-accent)",
                                            }}
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Tab content */}
                    <div>
                        {activeTab === "other" && (
                            <OtherBooks book={book} />
                        )}

                        {activeTab === "chapters" && (
                            <BookChapters book={book} />
                        )}

                        {activeTab === "characters" && (
                            <BookCharacters book={book} />
                        )}

                        {activeTab === "gallery" && (
                            <BookGallery book={book} />
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default BookDetail;
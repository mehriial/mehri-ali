import {useMemo, useState} from "react";
import { X} from "lucide-react";

import {books} from "@/data/books";
import BooksHeader from "@/components/app/books/BooksHeader.jsx";
import BooksFilters from "@/components/app/books/BooksFilters.jsx";
import BookSeries from "@/components/app/books/BookSeries.jsx";

const categories = [
    "Tümü",
    "Romantik",
    "Dram",
    "Gerilim",
];

function Books() {
    const [activeCategory, setActiveCategory] = useState("Tümü");
    const [search, setSearch] = useState("");

    const filteredBooks = useMemo(() => {
        const query = search.trim().toLowerCase();

        return books.filter((book) => {
            const matchesCategory =
                activeCategory === "Tümü" ||
                book.category === activeCategory;

            const matchesSearch =
                !query ||
                book.title.toLowerCase().includes(query) ||
                book.author.toLowerCase().includes(query) ||
                book.series?.toLowerCase().includes(query);

            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, search]);

    const groupedBooks = useMemo(() => {
        const series = {};
        const standalone = [];

        filteredBooks.forEach((book) => {
            if (book.series) {
                if (!series[book.series]) {
                    series[book.series] = [];
                }

                series[book.series].push(book);
            } else {
                standalone.push(book);
            }
        });

        Object.values(series).forEach((items) => {
            items.sort((a, b) => {
                if (a.order == null) return 1;
                if (b.order == null) return -1;

                return a.order - b.order;
            });
        });

        return {
            series,
            standalone,
        };
    }, [filteredBooks]);

    const hasBooks =
        Object.keys(groupedBooks.series).length > 0 ||
        groupedBooks.standalone.length > 0;

    return (
        <div className="overflow-hidden pt-24">
            <section>
                <div
                    className="
                        mx-auto
                        max-w-[1440px]
                        px-5
                        pb-24
                        pt-12
                        sm:px-8
                        lg:px-12
                        lg:pb-32
                        lg:pt-16
                    "
                >
                    <BooksHeader
                        count={filteredBooks.length}
                    />

                    <BooksFilters
                        categories={categories}
                        activeCategory={activeCategory}
                        onCategoryChange={setActiveCategory}
                        search={search}
                        onSearchChange={setSearch}
                    />

                    {hasBooks ? (
                        <div className="mt-16 space-y-24">
                            {Object.entries(groupedBooks.series).map(
                                ([seriesName, seriesBooks]) => (
                                    <BookSeries
                                        key={seriesName}
                                        title={seriesName}
                                        books={seriesBooks}
                                    />
                                )
                            )}

                            {groupedBooks.standalone.length > 0 && (
                                <BookSeries
                                    title="Bağımsız Kitaplar"
                                    books={groupedBooks.standalone}
                                />
                            )}
                        </div>
                    ) : (
                        <EmptyState
                            search={search}
                            onClear={() => {
                                setSearch("");
                                setActiveCategory("Tümü");
                            }}
                        />
                    )}
                </div>
            </section>
        </div>
    );
}

function EmptyState({search, onClear}) {
    return (
        <div className="flex min-h-[300px] flex-col items-center justify-center border-t border-white/[0.06] text-center">
            <span className="text-[9px] uppercase tracking-[0.3em] text-white/25">
                Sonuç bulunamadı
            </span>

            <p className="mt-4 font-serif text-2xl text-white/70">
                Aradığın kitap burada yok.
            </p>

            {(search) && (
                <button
                    type="button"
                    onClick={onClear}
                    className="
                        mt-6
                        inline-flex
                        items-center
                        gap-2
                        text-[11px]
                        text-white/35
                        transition-colors
                        hover:text-white
                    "
                >
                    <X className="h-3.5 w-3.5" />
                    Filtreleri temizle
                </button>
            )}
        </div>
    );
}

export default Books;
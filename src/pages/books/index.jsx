import { useMemo, useState } from "react";

import { books } from "../../consts/index.js";

import BooksHeader from "../../components/base/books/BooksHeader.jsx";
import BooksFilters from "../../components/base/books/BooksFilter.jsx";
import SeriesSection from "../../components/base/books/SeriesSection.jsx";
import StandaloneSection from "../../components/base/books/StandaloneSection.jsx";
import EmptyBooks from "../../components/base/books/EmptyBook.jsx";

const Books = () => {
    const [category, setCategory] = useState("all");
    const [status, setStatus] = useState("all");
    const [search, setSearch] = useState("");

    const categories = useMemo(() => {
        const genres = books.flatMap(
            (book) => book.genres || []
        );

        return [
            "Tümü",
            ...new Set(genres),
        ];
    }, []);

    const filteredBooks = useMemo(() => {
        const searchValue = search
            .toLowerCase()
            .trim();

        return books.filter((book) => {
            const matchesCategory =
                category === "all" ||
                book.genres?.includes(category);

            const matchesStatus =
                status === "all" ||
                book.status === status;

            const matchesSearch =
                !searchValue ||
                book.title
                    .toLowerCase()
                    .includes(searchValue) ||
                book.description
                    ?.toLowerCase()
                    .includes(searchValue) ||
                book.subtitle
                    ?.toLowerCase()
                    .includes(searchValue) ||
                book.genres?.some((genre) =>
                    genre
                        .toLowerCase()
                        .includes(searchValue)
                );

            return (
                matchesCategory &&
                matchesStatus &&
                matchesSearch
            );
        });
    }, [category, status, search]);

    const series = useMemo(() => {
        const grouped = {};

        filteredBooks.forEach((book) => {
            if (!book.series) {
                return;
            }

            const { id, name } = book.series;

            if (!grouped[id]) {
                grouped[id] = {
                    id,
                    name,
                    books: [],
                };
            }

            grouped[id].books.push(book);
        });

        return Object.values(grouped).map((item) => ({
            ...item,
            books: [...item.books].sort(
                (a, b) =>
                    a.series.order -
                    b.series.order
            ),
        }));
    }, [filteredBooks]);

    const standaloneBooks = useMemo(
        () =>
            filteredBooks.filter(
                (book) => !book.series
            ),
        [filteredBooks]
    );

    const clearFilters = () => {
        setCategory("all");
        setStatus("all");
        setSearch("");
    };

    return (
        <div className="min-h-screen bg-background text-shadow-white">
            <BooksHeader />

            <BooksFilters
                categories={categories}
                category={category}
                status={status}
                search={search}
                onCategoryChange={setCategory}
                onStatusChange={setStatus}
                onSearchChange={setSearch}
            />

            <main className="mx-auto max-w-[1400px] px-6 py-20 lg:px-10">

                {series.length > 0 && (
                    <SeriesSection series={series} />
                )}

                {standaloneBooks.length > 0 && (
                    <StandaloneSection
                        books={standaloneBooks}
                    />
                )}

                {filteredBooks.length === 0 && (
                    <EmptyBooks
                        onClear={clearFilters}
                    />
                )}

            </main>
        </div>
    );
};

export default Books;
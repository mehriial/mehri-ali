import { books } from "@/data/books.js";
import BookCard from "@/components/common/book-card/BookCard";

function OtherBooks({ book }) {
    if (!book.series) {
        return null;
    }

    const seriesBooks = books
        .filter(
            (item) =>
                item.series === book.series &&
                item.id !== book.id
        )
        .sort((a, b) => {
            if (a.order == null) return 1;
            if (b.order == null) return -1;

            return a.order - b.order;
        });

    if (!seriesBooks.length) {
        return null;
    }

    return (
        <div className="py-20 sm:py-24 lg:py-28">
            <div className="mb-10 flex items-center gap-4">
                <div className="flex items-center gap-3">
                    <span
                        className="h-px w-8"
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
                            {book.series}
                        </span>

                        <h2 className="mt-2 font-serif text-3xl tracking-tight text-white sm:text-4xl">
                            Serinin diğer kitapları
                        </h2>
                    </div>
                </div>

                <span
                    className="mt-auto h-px flex-1"
                    style={{
                        backgroundColor:
                            "color-mix(in srgb, var(--book-accent) 10%, transparent)",
                    }}
                />
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
                {seriesBooks.map((item) => (
                    <BookCard
                        key={item.id}
                        book={item}
                    />
                ))}
            </div>
        </div>
    );
}

export default OtherBooks;
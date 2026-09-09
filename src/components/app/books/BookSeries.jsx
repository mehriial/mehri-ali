import BookCard from "@/components/common/book-card/BookCard";

function BookSeries({title, books}) {
    return (
        <section>
            <div className="mb-8 flex items-center gap-4">
                <h2
                    className="
                        font-serif
                        text-2xl
                        text-white/90
                        sm:text-3xl
                    "
                >
                    {title}
                </h2>

                <span className="h-px flex-1 bg-white/[0.06]" />

                <span
                    className="
                        text-[9px]
                        tabular-nums
                        tracking-[0.2em]
                        text-white/20
                    "
                >
                    {String(books.length).padStart(2, "0")}
                </span>
            </div>

            <div
                className="
                    grid
                    grid-cols-2
                    gap-x-4
                    gap-y-10
                    sm:grid-cols-3
                    sm:gap-x-6
                    lg:grid-cols-4
                    lg:gap-x-8
                "
            >
                {books.map((book) => (
                    <BookCard
                        key={book.id}
                        book={book}
                    />
                ))}
            </div>
        </section>
    );
}

export default BookSeries;
import BookCard from "@/components/common/book-card/BookCard.jsx";


function ProfileBooks({ books }) {
    if (!books.length) {
        return (
            <div className="flex min-h-48 items-center justify-center rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.015]">
                <p className="text-xs text-white/25">
                    Kütüphanede henüz kitap yok.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
            {books.map((book) => (
                <BookCard
                    key={book.id}
                    book={book}
                />
            ))}
        </div>
    );
}

export default ProfileBooks;
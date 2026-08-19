import BookCard from "./BookCard.jsx";

const BooksGrid = ({ books }) => {
    return (
        <div className="
            grid
            gap-x-8
            gap-y-12
            sm:grid-cols-2
            lg:grid-cols-4
        ">
            {books.map((book) => (
                <BookCard
                    key={book.id}
                    book={book}
                />
            ))}
        </div>
    );
};

export default BooksGrid;
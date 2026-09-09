import {Link} from "react-router-dom";

import BookCover from "./BookCover";
import BookMeta from "./BookMeta";

function BookCard({book}) {
    return (
        <Link
            to={`/books/${book.slug}`}
            className="group block min-w-0"
        >
            <BookCover book={book}/>
            <BookMeta book={book}/>
        </Link>
    );
}

export default BookCard;
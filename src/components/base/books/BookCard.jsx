import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
    return (
        <Link
            to={book.href}
            className="group block rounded-sm outline-none"
        >
            {/* Cover */}

            <div className="
                relative
                aspect-[3/4]
                overflow-hidden
            ">

                <img
                    src={book.cover}
                    alt={book.title}
                    loading="lazy"
                    decoding="async"
                    className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-700
                        group-hover:scale-[1.04]
                    "
                />

                <div className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/20
                    via-transparent
                    to-transparent
                    transition-all
                    duration-500
                    group-hover:bg-black/30
                " />

                {/* Status */}

                <div className="
                    absolute
                    left-4
                    top-4
                ">
                    <span className="
                        rounded-full
                        border
                        border-white/20
                        bg-black/30
                        px-3
                        py-1.5
                        text-[8px]
                        uppercase
                        tracking-[0.2em]
                        text-white
                        backdrop-blur-sm
                    ">
                        {book.status}
                    </span>
                </div>

                {/* Series order */}

                {book.series && (
                    <div className="
                        absolute
                        bottom-4
                        right-4
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/20
                        bg-black/30
                        text-xs
                        text-white
                        backdrop-blur-sm
                    ">
                        {String(
                            book.series.order
                        ).padStart(2, "0")}
                    </div>
                )}

            </div>

            {/* Info */}

            <div className="mt-5 border-l border-white/10 pl-4 transition-colors duration-300 group-hover:border-header-accent/70">

                <div className="
                    flex
                    flex-wrap
                    items-center
                    gap-x-3
                    gap-y-1
                ">
                    {book.genres?.map(
                        (genre, index) => (
                            <div
                                key={genre}
                                className="
                                    flex
                                    items-center
                                    gap-3
                                "
                            >
                                <span className="
                                    text-[9px]
                                    uppercase
                                    tracking-[0.2em]
                                    text-header-accent
                                ">
                                    {genre}
                                </span>

                                {index <
                                    book.genres.length - 1 && (
                                        <span className="
                                        h-px
                                        w-4
                                        bg-white/15
                                    " />
                                    )}
                            </div>
                        )
                    )}
                </div>

                <div className="
                    mt-3
                    flex
                    items-start
                    justify-between
                    gap-4
                ">
                    <div>

                        <h3 className="
                            font-heading
                            text-xl
                            transition-colors
                            duration-300
                            group-hover:text-header-accent
                        ">
                            {book.title}
                        </h3>

                        {book.series && (
                            <p className="
                                mt-1
                                text-xs
                                text-shadow-white/35
                            ">
                                {book.series.name}
                            </p>
                        )}

                        <p className="
                            mt-2
                            text-[10px]
                            uppercase
                            tracking-[0.15em]
                            text-shadow-white/25
                        ">
                            {book.chapters}
                        </p>

                    </div>

                    <span className="
                        mt-1
                        text-header-accent
                        opacity-0
                        transition-all
                        duration-300
                        group-hover:translate-x-1
                        group-hover:opacity-100
                    ">
                        →
                    </span>

                </div>

            </div>
        </Link>
    );
};

export default BookCard;

import {useMemo} from "react";
import {ArrowUpRight} from "lucide-react";
import {Link} from "react-router-dom";

import {books} from "@/data/books";
import BookCard from "@/components/Common/book-card/BookCard";

function FeaturedBooks() {
    const featuredBooks = useMemo(() => {
        return [...books]
            .sort(() => Math.random() - 0.5)
            .slice(0, 4);
    }, []);

    if (!featuredBooks.length) {
        return null;
    }

    return (
        <section className="border-t border-white/[0.06]">
            <div
                className="
                    mx-auto
                    max-w-[1440px]
                    px-5
                    py-24
                    sm:px-8
                    lg:px-12
                    lg:py-32
                "
            >
                <FeaturedBooksHeader/>
                <MobileBooksLink/>

                <div
                    className="
                        -mx-5
                        overflow-x-auto
                        px-5
                        scrollbar-none
                        sm:-mx-8
                        sm:px-8
                        lg:-mx-12
                        lg:px-12
                    "
                >
                    <div
                        className="
                            grid
                            w-max
                            grid-flow-col
                            auto-cols-[calc((100vw-52px)/2)]
                            gap-x-4
                            sm:auto-cols-[calc((100vw-96px)/3)]
                            sm:gap-x-6
                            lg:auto-cols-[calc((min(100vw,1440px)-120px)/4)]
                            lg:gap-x-8
                        "
                    >
                        {featuredBooks.map((book) => (
                            <BookCard
                                key={book.id}
                                book={book}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function FeaturedBooksHeader() {
    return (
        <div className="mb-12 flex items-end justify-between gap-6">
            <h2
                className="
                    font-serif
                    text-4xl
                    tracking-tight
                    text-white
                    sm:text-5xl
                "
            >
                Öne Çıkan Kitaplar
            </h2>

            <Link
                to="/books"
                className="
                    group
                    hidden
                    items-center
                    gap-2
                    border-b
                    border-white/10
                    pb-2
                    text-[11px]
                    text-white/40
                    transition-colors
                    hover:border-white/30
                    hover:text-white
                    sm:inline-flex
                "
            >
                Tüm kitaplar

                <ArrowUpRight
                    className="
                        h-3.5
                        w-3.5
                        transition-transform
                        duration-300
                        group-hover:-translate-y-0.5
                        group-hover:translate-x-0.5
                    "
                />
            </Link>
        </div>
    );
}

function MobileBooksLink() {
    return (
        <div className="mb-8 sm:hidden">
            <Link
                to="/books"
                className="
                    group
                    inline-flex
                    items-center
                    gap-2
                    border-b
                    border-white/10
                    pb-2
                    text-[11px]
                    text-white/40
                    transition-colors
                    hover:border-white/30
                    hover:text-white
                "
            >
                Tüm kitaplar

                <ArrowUpRight
                    className="
                        h-3.5
                        w-3.5
                        transition-transform
                        duration-300
                        group-hover:-translate-y-0.5
                        group-hover:translate-x-0.5
                    "
                />
            </Link>
        </div>
    );
}

export default FeaturedBooks;
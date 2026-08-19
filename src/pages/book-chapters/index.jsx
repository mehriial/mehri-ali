import { Link, useParams } from "react-router-dom";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

import { books, chapters } from "../../consts/index.js";
import Button from "../../components/ui/Button.jsx";

const BookChapters = () => {
    const { id } = useParams();

    const book = books.find(
        (item) =>
            item.id.toString() === id ||
            item.href === `/books/${id}`
    );

    if (!book) {
        return (
            <div className="min-h-screen bg-background text-shadow-white">
                <main className="
                    mx-auto
                    flex
                    min-h-[70vh]
                    max-w-[1400px]
                    flex-col
                    items-center
                    justify-center
                    px-6
                    text-center
                    lg:px-10
                ">
                    <p className="
                        text-[10px]
                        uppercase
                        tracking-[0.35em]
                        text-header-accent
                    ">
                        404
                    </p>

                    <h1 className="
                        mt-5
                        font-heading
                        text-4xl
                    ">
                        Kitap bulunamadı
                    </h1>

                    <p className="
                        mt-4
                        max-w-md
                        text-sm
                        leading-7
                        text-shadow-white/40
                    ">
                        Aradığın kitap kütüphanede bulunmuyor.
                    </p>

                    <Link to="/books" className="mt-8">
                        <Button variant="outline">
                            Kitaplara dön
                        </Button>
                    </Link>
                </main>
            </div>
        );
    }

    /*
     * Sadece bu kitaba ait bölümleri al
     */
    const bookChapters = chapters
        .filter((chapter) => chapter.bookId === book.id)
        .sort((a, b) => a.order - b.order);

    return (
        <div className="min-h-screen bg-background text-shadow-white">

            {/* HEADER */}

            <section className="border-b border-white/10">

                <div className="
                    mx-auto
                    max-w-[1000px]
                    px-6
                    py-8
                    lg:px-10
                ">

                    <Link
                        to={book.href}
                        className="
                            group
                            inline-flex
                            items-center
                            gap-3
                            text-[10px]
                            uppercase
                            tracking-[0.2em]
                            text-shadow-white/40
                            transition-colors
                            duration-300
                            hover:text-header-accent
                        "
                    >
                        <HiArrowLeft className="
                            h-3.5
                            w-3.5
                            transition-transform
                            duration-300
                            group-hover:-translate-x-1
                        " />

                        Kitaba dön
                    </Link>

                    <div className="mt-12">

                        {book.series && (
                            <p className="
                                text-[10px]
                                uppercase
                                tracking-[0.3em]
                                text-header-accent
                            ">
                                {book.series.name}
                            </p>
                        )}

                        <h1 className="
                            mt-4
                            font-heading
                            text-5xl
                            font-normal
                            tracking-tight
                            sm:text-6xl
                        ">
                            {book.title}
                        </h1>

                        {book.subtitle && (
                            <p className="
                                mt-4
                                max-w-2xl
                                font-heading
                                text-lg
                                italic
                                text-shadow-white/40
                            ">
                                {book.subtitle}
                            </p>
                        )}

                        <p className="
                            mt-5
                            text-sm
                            text-shadow-white/40
                        ">
                            {bookChapters.length} bölüm
                        </p>

                    </div>

                </div>

            </section>

            {/* CHAPTERS */}

            <main className="
                mx-auto
                max-w-[1000px]
                px-6
                py-16
                lg:px-10
            ">

                {bookChapters.length > 0 ? (

                    <section>

                        <div className="
                            mb-8
                            flex
                            items-center
                            gap-4
                        ">
                            <div>

                                <p className="
                                    text-[10px]
                                    uppercase
                                    tracking-[0.3em]
                                    text-header-accent
                                ">
                                    Okumaya başla
                                </p>

                                <h2 className="
                                    mt-3
                                    font-heading
                                    text-3xl
                                ">
                                    Bölümler
                                </h2>

                            </div>

                            <span className="
                                h-px
                                flex-1
                                bg-white/10
                            " />

                        </div>

                        <div className="
                            border-t
                            border-white/10
                        ">

                            {bookChapters.map((chapter) => (

                                <Link
                                    key={chapter.id}
                                    to={`${book.href}/chapters/${chapter.id}`}
                                    className="
                                        group
                                        flex
                                        items-center
                                        gap-6
                                        border-b
                                        border-white/10
                                        py-6
                                        transition-colors
                                        duration-300
                                        hover:bg-white/[0.02]
                                    "
                                >

                                    <div className="
                                        flex
                                        h-11
                                        w-11
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-full
                                        border
                                        border-white/10
                                        text-xs
                                        text-shadow-white/40
                                        transition-colors
                                        duration-300
                                        group-hover:border-header-accent
                                        group-hover:text-header-accent
                                    ">
                                        {String(chapter.order).padStart(2, "0")}
                                    </div>

                                    <div className="min-w-0 flex-1">

                                        <p className="
                                            text-[9px]
                                            uppercase
                                            tracking-[0.2em]
                                            text-shadow-white/30
                                        ">
                                            Bölüm {chapter.order}
                                        </p>

                                        <h3 className="
                                            mt-1
                                            font-heading
                                            text-xl
                                            transition-colors
                                            duration-300
                                            group-hover:text-header-accent
                                        ">
                                            {chapter.title}
                                        </h3>

                                        {chapter.date && (
                                            <p className="
                                                mt-1
                                                text-xs
                                                text-shadow-white/30
                                            ">
                                                {chapter.date}
                                            </p>
                                        )}

                                    </div>

                                    <HiArrowRight className="
                                        h-5
                                        w-5
                                        shrink-0
                                        text-shadow-white/20
                                        transition-all
                                        duration-300
                                        group-hover:translate-x-1
                                        group-hover:text-header-accent
                                    " />

                                </Link>

                            ))}

                        </div>

                    </section>

                ) : (

                    <div className="
                        flex
                        min-h-[300px]
                        flex-col
                        items-center
                        justify-center
                        text-center
                    ">

                        <p className="
                            font-heading
                            text-2xl
                        ">
                            Henüz bölüm yok
                        </p>

                        <p className="
                            mt-3
                            max-w-md
                            text-sm
                            leading-7
                            text-shadow-white/40
                        ">
                            Bu kitap için henüz yayınlanmış
                            bir bölüm bulunmuyor.
                        </p>

                    </div>

                )}

            </main>

        </div>
    );
};

export default BookChapters;
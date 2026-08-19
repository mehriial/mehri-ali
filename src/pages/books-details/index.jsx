import { Link, useParams } from "react-router-dom";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

import { books } from "../../consts/index.js";
import Button from "../../components/ui/Button.jsx";

const BookDetails = () => {
    const { id } = useParams();

    const book = books.find(
        (item) =>
            item.id.toString() === id ||
            item.href === `/books/${id}`
    );

    if (!book) {
        return (
            <div className="min-h-screen bg-background text-shadow-white">
                <main className="mx-auto flex min-h-[70vh] max-w-[1400px] flex-col items-center justify-center px-6 text-center lg:px-10">

                    <p className="text-[10px] uppercase tracking-[0.35em] text-header-accent">
                        404
                    </p>

                    <h1 className="mt-5 font-heading text-4xl">
                        Kitap bulunamadı
                    </h1>

                    <p className="mt-4 max-w-md text-sm leading-7 text-shadow-white/40">
                        Aradığın kitap kütüphanede bulunmuyor veya
                        kaldırılmış olabilir.
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

    const seriesBooks = book.series
        ? books
            .filter(
                (item) =>
                    item.series?.id === book.series.id
            )
            .sort(
                (a, b) =>
                    a.series.order - b.series.order
            )
        : [];

    const currentSeriesIndex = seriesBooks.findIndex(
        (item) => item.id === book.id
    );

    const previousSeriesBook =
        currentSeriesIndex > 0
            ? seriesBooks[currentSeriesIndex - 1]
            : null;

    const nextSeriesBook =
        currentSeriesIndex < seriesBooks.length - 1
            ? seriesBooks[currentSeriesIndex + 1]
            : null;

    return (
        <div className="min-h-screen bg-background text-shadow-white">

            {/* =========================================
                BACK
            ========================================= */}

            <div className="border-b border-white/10">
                <div className="mx-auto max-w-[1400px] px-6 py-5 lg:px-10">

                    <Link
                        to="/books"
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
                        <HiArrowLeft
                            className="
                                h-3.5
                                w-3.5
                                transition-transform
                                duration-300
                                group-hover:-translate-x-1
                            "
                        />

                        Tüm kitaplar
                    </Link>

                </div>
            </div>

            {/* =========================================
                HERO
            ========================================= */}

            <main className="mx-auto max-w-[1400px] px-6 py-16 lg:px-10 lg:py-24">

                <section className="
                    grid
                    gap-14
                    lg:grid-cols-[420px_1fr]
                    lg:gap-24
                ">

                    {/* COVER */}

                    <div className="mx-auto w-full max-w-[420px] lg:mx-0">

                        <div className="relative">

                            {/* Decorative frame */}

                            <div className="
                                absolute
                                -right-4
                                -top-4
                                h-full
                                w-full
                                border
                                border-header-accent/20
                            " />

                            <div className="
                                relative
                                aspect-[3/4]
                                overflow-hidden
                                bg-[#171717]
                            ">

                                <img
                                    src={book.cover}
                                    alt={book.title}
                                    className="
                                        h-full
                                        w-full
                                        object-cover
                                    "
                                />

                                <div className="
                                    absolute
                                    inset-0
                                    bg-gradient-to-t
                                    from-black/50
                                    via-transparent
                                    to-transparent
                                " />

                                {/* Status */}

                                <div className="
                                    absolute
                                    bottom-6
                                    left-6
                                ">
                                    <span className="
                                        border
                                        border-white/20
                                        bg-black/30
                                        px-3
                                        py-1.5
                                        text-[9px]
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
                                        bottom-6
                                        right-6
                                        flex
                                        h-11
                                        w-11
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
                        </div>

                    </div>

                    {/* CONTENT */}

                    <div className="flex flex-col justify-center">

                        {/* META */}

                        <div className="
                            flex
                            flex-wrap
                            items-center
                            gap-x-4
                            gap-y-2
                        ">

                            {book.genres?.map(
                                (genre, index) => (
                                    <div
                                        key={genre}
                                        className="flex items-center gap-4"
                                    >

                                        <span className="
                                            text-[10px]
                                            uppercase
                                            tracking-[0.3em]
                                            text-header-accent
                                        ">
                                            {genre}
                                        </span>

                                        {index <
                                            book.genres.length - 1 && (
                                                <span className="
                                                h-px
                                                w-6
                                                bg-white/20
                                            " />
                                            )}

                                    </div>
                                )
                            )}

                        </div>

                        {/* TITLE */}

                        <h1 className="
                            mt-7
                            max-w-4xl
                            font-heading
                            text-5xl
                            font-normal
                            leading-[1.05]
                            tracking-tight
                            sm:text-6xl
                            lg:text-7xl
                        ">
                            {book.title}
                        </h1>

                        {/* SUBTITLE */}

                        {book.subtitle && (
                            <p className="
                                mt-7
                                max-w-3xl
                                font-heading
                                text-xl
                                italic
                                leading-8
                                text-header-accent
                            ">
                                {book.subtitle}
                            </p>
                        )}

                        {/* DESCRIPTION */}

                        <p className="
                            mt-8
                            max-w-2xl
                            whitespace-pre-line
                            text-base
                            leading-8
                            text-shadow-white/55
                        ">
                            {book.description}
                        </p>

                        {/* INFO */}

                        <div className="
                            mt-10
                            grid
                            max-w-2xl
                            grid-cols-2
                            border-y
                            border-white/10
                            sm:grid-cols-3
                        ">

                            <InfoItem
                                label="Durum"
                                value={book.status}
                            />

                            <InfoItem
                                label="Bölüm"
                                value={book.chapters}
                            />

                            {book.series && (
                                <InfoItem
                                    label="Seri"
                                    value={book.series.name}
                                />
                            )}

                        </div>

                        {/* ACTION */}

                        <div className="mt-10">

                            <Link to={`${book.href}/chapters`}>
                                <Button variant="primary">
                                    Kitabı okumaya başla
                                </Button>
                            </Link>
                        </div>

                    </div>

                </section>

                {/* =========================================
                    SERIES
                ========================================= */}

                {book.series && seriesBooks.length > 1 && (
                    <section className="
                        mt-28
                        border-t
                        border-white/10
                        pt-20
                    ">

                        <div className="mb-10">

                            <p className="
                                text-[10px]
                                uppercase
                                tracking-[0.3em]
                                text-header-accent
                            ">
                                Seri
                            </p>

                            <div className="
                                mt-3
                                flex
                                items-end
                                justify-between
                                gap-5
                            ">

                                <h2 className="
                                    font-heading
                                    text-3xl
                                ">
                                    {book.series.name}
                                </h2>

                                <span className="
                                    text-[9px]
                                    uppercase
                                    tracking-[0.2em]
                                    text-shadow-white/30
                                ">
                                    {seriesBooks.length} kitap
                                </span>

                            </div>

                        </div>

                        {/* Series books */}

                        <div className="
                            grid
                            gap-8
                            sm:grid-cols-2
                            lg:grid-cols-4
                        ">

                            {seriesBooks.map((seriesBook) => (
                                <SeriesBookCard
                                    key={seriesBook.id}
                                    book={seriesBook}
                                    active={seriesBook.id === book.id}
                                />
                            ))}

                        </div>

                    </section>
                )}

                {/* =========================================
                    PREV / NEXT
                ========================================= */}

                {book.series && seriesBooks.length > 1 && (
                    <section className="
                        mt-20
                        border-t
                        border-white/10
                        pt-8
                    ">

                        <div className="
                            grid
                            gap-4
                            sm:grid-cols-2
                        ">

                            {/* PREVIOUS */}

                            {previousSeriesBook ? (
                                <Link
                                    to={previousSeriesBook.href}
                                    className="
                                        group
                                        flex
                                        items-center
                                        gap-5
                                        border
                                        border-white/10
                                        p-5
                                        transition-colors
                                        duration-300
                                        hover:border-header-accent
                                    "
                                >

                                    <HiArrowLeft className="
                                        h-5
                                        w-5
                                        text-header-accent
                                        transition-transform
                                        duration-300
                                        group-hover:-translate-x-1
                                    " />

                                    <div>

                                        <p className="
                                            text-[9px]
                                            uppercase
                                            tracking-[0.2em]
                                            text-shadow-white/30
                                        ">
                                            Önceki kitap
                                        </p>

                                        <p className="
                                            mt-2
                                            font-heading
                                            text-lg
                                            transition-colors
                                            group-hover:text-header-accent
                                        ">
                                            {previousSeriesBook.title}
                                        </p>

                                    </div>

                                </Link>
                            ) : (
                                <div />
                            )}

                            {/* NEXT */}

                            {nextSeriesBook ? (
                                <Link
                                    to={nextSeriesBook.href}
                                    className="
                                        group
                                        flex
                                        items-center
                                        justify-end
                                        gap-5
                                        border
                                        border-white/10
                                        p-5
                                        text-right
                                        transition-colors
                                        duration-300
                                        hover:border-header-accent
                                    "
                                >

                                    <div>

                                        <p className="
                                            text-[9px]
                                            uppercase
                                            tracking-[0.2em]
                                            text-shadow-white/30
                                        ">
                                            Sonraki kitap
                                        </p>

                                        <p className="
                                            mt-2
                                            font-heading
                                            text-lg
                                            transition-colors
                                            group-hover:text-header-accent
                                        ">
                                            {nextSeriesBook.title}
                                        </p>

                                    </div>

                                    <HiArrowRight className="
                                        h-5
                                        w-5
                                        text-header-accent
                                        transition-transform
                                        duration-300
                                        group-hover:translate-x-1
                                    " />

                                </Link>
                            ) : (
                                <div />
                            )}

                        </div>

                    </section>
                )}

            </main>
        </div>
    );
};


/* ============================================
   INFO ITEM
============================================ */

const InfoItem = ({ label, value }) => {
    return (
        <div className="border-r border-white/10 px-5 py-5 first:pl-0 last:border-r-0">

            <p className="
                text-[9px]
                uppercase
                tracking-[0.2em]
                text-shadow-white/30
            ">
                {label}
            </p>

            <p className="
                mt-2
                text-sm
                text-shadow-white/70
            ">
                {value}
            </p>

        </div>
    );
};


/* ============================================
   SERIES BOOK CARD
============================================ */

const SeriesBookCard = ({ book, active }) => {
    return (
        <Link
            to={book.href}
            className={`
                group
                block
                ${active ? "pointer-events-none" : ""}
            `}
        >

            <div className="
                relative
                aspect-[3/4]
                overflow-hidden
                bg-[#171717]
            ">

                <img
                    src={book.cover}
                    alt={book.title}
                    className={`
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-700
                        ${
                        active
                            ? ""
                            : "group-hover:scale-[1.04]"
                    }
                    `}
                />

                <div className="
                    absolute
                    inset-0
                    bg-black/0
                    transition-all
                    duration-500
                    group-hover:bg-black/30
                " />

                {/* Number */}

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
                    {String(book.series.order).padStart(2, "0")}
                </div>

                {active && (
                    <div className="
                        absolute
                        inset-x-0
                        bottom-0
                        bg-header-accent
                        px-4
                        py-2
                        text-center
                        text-[8px]
                        uppercase
                        tracking-[0.2em]
                        text-white
                    ">
                        Şu an okuyorsun
                    </div>
                )}

            </div>

            <div className="mt-4">

                <p className="
                    text-[9px]
                    uppercase
                    tracking-[0.2em]
                    text-header-accent
                ">
                    Kitap {book.series.order}
                </p>

                <h3 className="
                    mt-2
                    font-heading
                    text-lg
                    transition-colors
                    duration-300
                    group-hover:text-header-accent
                ">
                    {book.title}
                </h3>

            </div>

        </Link>
    );
};

export default BookDetails;
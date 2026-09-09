import {ArrowUpRight, BookOpen, ChevronLeft} from "lucide-react";
import {Link} from "react-router-dom";

function BookDetailHero({book}) {
    return (
        <section
            className="
                relative
                min-h-screen
                overflow-hidden
                bg-[var(--book-bg)]
                pt-24
            "
        >
            {/* Atmospheric background */}
            <div className="pointer-events-none absolute inset-0">
                <div
                    className="
                        absolute
                        left-1/2
                        top-1/2
                        h-[700px]
                        w-[700px]
                        -translate-x-1/2
                        -translate-y-1/2
                        rounded-full
                        blur-[160px]
                        opacity-20
                    "
                    style={{
                        backgroundColor: "var(--book-accent)",
                    }}
                />

                <div
                    className="
                        absolute
                        inset-0
                        bg-[radial-gradient(circle_at_center,transparent_0%,var(--book-bg)_75%)]
                    "
                />

                <div
                    className="
                        absolute
                        inset-x-0
                        bottom-0
                        h-64
                        bg-gradient-to-t
                        from-[var(--book-bg)]
                        to-transparent
                    "
                />
            </div>

            <div
                className="
                    relative
                    mx-auto
                    flex
                    min-h-[calc(100vh-96px)]
                    max-w-[1440px]
                    flex-col
                    px-5
                    pb-16
                    sm:px-8
                    lg:px-12
                    lg:pb-20
                "
            >
                {/* Top navigation */}
                <div className="flex items-center justify-between">
                    <Link
                        to="/books"
                        className="
                            group
                            inline-flex
                            items-center
                            gap-2
                            text-[10px]
                            uppercase
                            tracking-[0.2em]
                            text-white/35
                            transition-colors
                            hover:text-white
                        "
                    >
                        <ChevronLeft
                            className="
                                h-3.5
                                w-3.5
                                transition-transform
                                duration-300
                                group-hover:-translate-x-1
                            "
                        />

                        Kitaplar
                    </Link>

                    <span
                        className="
                            text-[9px]
                            uppercase
                            tracking-[0.3em]
                            text-white/20
                        "
                    >
                        {book.category}
                    </span>
                </div>

                {/* Main */}
                <div
                    className="
                        flex
                        flex-1
                        items-center
                        py-16
                        lg:py-20
                    "
                >
                    <div
                        className="
                            grid
                            w-full
                            grid-cols-1
                            items-center
                            gap-14
                            lg:grid-cols-[0.8fr_1.2fr]
                            lg:gap-24
                        "
                    >
                        {/* Cover */}
                        <div className="flex justify-center lg:justify-start">
                            <div className="relative">
                                <div
                                    className="
                                        absolute
                                        -inset-10
                                        rounded-full
                                        opacity-20
                                        blur-[80px]
                                    "
                                    style={{
                                        backgroundColor:
                                            "var(--book-accent)",
                                    }}
                                />

                                <div
                                    className="
                                        relative
                                        aspect-[2/3]
                                        w-[250px]
                                        overflow-hidden
                                        border
                                        border-white/[0.12]
                                        bg-black/30
                                        shadow-[0_40px_120px_rgba(0,0,0,0.7)]
                                        sm:w-[290px]
                                        lg:w-[330px]
                                    "
                                >
                                    <img
                                        src={book.image}
                                        alt={book.title}
                                        className="
                                            h-full
                                            w-full
                                            object-cover
                                        "
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Information */}
                        <div className="max-w-2xl">
                            <div className="flex items-center gap-3">
                                {book.series && (
                                    <>
                                        <span
                                            className="
                                                text-[9px]
                                                font-medium
                                                uppercase
                                                tracking-[0.3em]
                                                text-white/35
                                            "
                                        >
                                            {book.series}
                                        </span>

                                        {book.order && (
                                            <>
                                                <span className="h-px w-5 bg-white/15" />

                                                <span className="text-[9px] text-white/25">
                                                    Kitap {String(book.order).padStart(2, "0")}
                                                </span>
                                            </>
                                        )}
                                    </>
                                )}
                            </div>

                            <h1
                                className="
                                    mt-7
                                    max-w-xl
                                    font-serif
                                    text-5xl
                                    leading-[0.95]
                                    tracking-tight
                                    text-white
                                    sm:text-6xl
                                    lg:text-7xl
                                "
                            >
                                {book.title}
                            </h1>

                            <p
                                className="
                                    mt-7
                                    max-w-lg
                                    text-sm
                                    leading-7
                                    text-white/40
                                "
                            >
                                {book.description}
                            </p>

                            <div className="mt-8 flex flex-wrap items-center gap-4">
                                <span
                                    className="
                                        border
                                        border-white/[0.1]
                                        px-3
                                        py-1.5
                                        text-[9px]
                                        uppercase
                                        tracking-[0.2em]
                                        text-white/40
                                    "
                                >
                                    {book.status}
                                </span>

                                <span className="text-[10px] text-white/20">
                                    {book.author}
                                </span>
                            </div>

                            <div className="mt-10">
                                <Link
                                    to={`/books/${book.slug}/read/1`}
                                    className="
                                        group
                                        inline-flex
                                        items-center
                                        gap-3
                                        px-5
                                        py-3.5
                                        text-xs
                                        font-medium
                                        text-black
                                        transition-all
                                        duration-300
                                    "
                                    style={{
                                        backgroundColor:
                                            "var(--book-accent)",
                                    }}
                                >
                                    <BookOpen className="h-4 w-4" />

                                    Okumaya başla

                                    <ArrowUpRight
                                        className="
                                            h-4
                                            w-4
                                            transition-transform
                                            duration-300
                                            group-hover:-translate-y-0.5
                                            group-hover:translate-x-0.5
                                        "
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom information */}
                <div className="border-t border-white/[0.07] pt-5">
                    <div className="flex items-center justify-between">
                        <span className="text-[9px] uppercase tracking-[0.3em] text-white/20">
                            Kitap detayları
                        </span>

                        <span className="text-[9px] tabular-nums tracking-[0.2em] text-white/20">
                            {book.category}
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default BookDetailHero;
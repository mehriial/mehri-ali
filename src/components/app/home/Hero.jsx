import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {
    ArrowUpRight,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import {books} from "@/data/books.js";

function Hero() {
    const [activeIndex, setActiveIndex] = useState(0);

    const totalBooks = books.length;
    const activeBook = books[activeIndex];

    useEffect(() => {
        if (totalBooks <= 1) return;

        const interval = setInterval(() => {
            setActiveIndex((current) => (current + 1) % totalBooks);
        }, 3000);

        return () => clearInterval(interval);
    }, [totalBooks]);

    const goToPrevious = () => {
        setActiveIndex((current) =>
            current === 0 ? totalBooks - 1 : current - 1
        );
    };

    const goToNext = () => {
        setActiveIndex((current) =>
            (current + 1) % totalBooks
        );
    };

    if (!activeBook) return null;

    return (
        <section className="relative min-h-[calc(100vh-68px)] overflow-hidden pt-24">
            {/* Background */}
            <div className="pointer-events-none absolute inset-0">
                <div
                    className="
                        absolute left-1/2 top-1/2
                        h-[600px] w-[600px]
                        -translate-x-1/2 -translate-y-1/2
                        rounded-full
                        bg-white/[0.035]
                        blur-[140px]
                    "
                />

                <div
                    className="
                        absolute inset-x-0 bottom-0
                        h-64
                        bg-gradient-to-t
                        from-black
                        to-transparent
                    "
                />
            </div>

            <div
                className="
                    relative mx-auto flex
                    min-h-[calc(100vh-164px)]
                    max-w-[1440px]
                    flex-col
                    px-5 sm:px-8 lg:px-12
                "
            >
                {/* Top */}
                <div className="flex items-center justify-between pt-8">
                    <div className="flex items-center gap-3">
                        <span className="h-px w-8 bg-white/30"/>

                        <span
                            className="
                                text-[9px] font-medium
                                uppercase tracking-[0.35em]
                                text-white/40
                            "
                        >
                            Mehri Ali
                        </span>
                    </div>

                    <span
                        className="
                            text-[9px] uppercase
                            tracking-[0.25em]
                            text-white/20
                        "
                    >
                        Hikâyeler & Kitaplar
                    </span>
                </div>

                {/* Carousel */}
                <div className="flex flex-1 items-center justify-center py-14">
                    <div
                        className="
                            grid w-full
                            grid-cols-1
                            items-center
                            gap-12
                            lg:grid-cols-[1fr_auto_1fr]
                            lg:gap-20
                        "
                    >
                        {/* Book information */}
                        <div
                            key={activeBook.id}
                            className="
                                order-2 max-w-sm
                                animate-in fade-in
                                slide-in-from-left-3
                                duration-500
                                lg:order-1
                            "
                        >
                            <p
                                className="
                                    text-[9px] font-medium
                                    uppercase tracking-[0.3em]
                                    text-white/30
                                "
                            >
                                {activeBook.category}
                            </p>

                            <h1
                                className="
                                    mt-5
                                    font-serif
                                    text-5xl
                                    leading-[0.95]
                                    tracking-tight
                                    text-white
                                    sm:text-6xl
                                "
                            >
                                {activeBook.title}
                            </h1>

                            <p
                                className="
                                    mt-6 max-w-xs
                                    text-sm leading-7
                                    text-white/40
                                "
                            >
                                {activeBook.description}
                            </p>

                            <Link
                                to={`/books/${activeBook.slug}`}
                                className="
                                    group mt-8
                                    inline-flex items-center gap-3
                                    border-b border-white/20
                                    pb-2
                                    text-xs font-medium
                                    text-white
                                    transition-all duration-300
                                    hover:border-white
                                "
                            >
                                Kitabı keşfet

                                <ArrowUpRight
                                    className="
                                        h-4 w-4
                                        transition-transform duration-300
                                        group-hover:-translate-y-0.5
                                        group-hover:translate-x-0.5
                                    "
                                />
                            </Link>
                        </div>

                        {/* Book cover */}
                        <div
                            key={`cover-${activeBook.id}`}
                            className="
                                order-1 flex justify-center
                                animate-in fade-in
                                zoom-in-[0.98]
                                duration-500
                                lg:order-2
                            "
                        >
                            <div className="relative">
                                <div
                                    className="
                                        absolute inset-8
                                        rounded-full
                                        bg-white/[0.06]
                                        blur-[90px]
                                    "
                                />

                                <div
                                    className="
                                        relative aspect-[2/3]
                                        w-[250px]
                                        overflow-hidden
                                        border border-white/[0.12]
                                        bg-neutral-900
                                        shadow-[0_35px_100px_rgba(0,0,0,0.7)]
                                        transition-transform duration-700
                                        hover:-translate-y-2
                                        sm:w-[290px]
                                        lg:w-[310px]
                                    "
                                >
                                    <img
                                        src={activeBook.image}
                                        alt={activeBook.title}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Controls */}
                        <div
                            className="
                                order-3 flex flex-col
                                items-start
                                lg:items-end
                            "
                        >
                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    onClick={goToPrevious}
                                    aria-label="Önceki kitap"
                                    className="
                                        flex h-10 w-10
                                        items-center justify-center
                                        border border-white/[0.1]
                                        text-white/40
                                        transition-all
                                        hover:border-white/25
                                        hover:text-white
                                    "
                                >
                                    <ChevronLeft className="h-4 w-4"/>
                                </button>

                                <span
                                    className="
                                        min-w-[55px]
                                        text-center
                                        text-[9px]
                                        tabular-nums
                                        tracking-[0.2em]
                                        text-white/30
                                    "
                                >
                                    {String(activeIndex + 1).padStart(2, "0")}
                                    {" / "}
                                    {String(totalBooks).padStart(2, "0")}
                                </span>

                                <button
                                    type="button"
                                    onClick={goToNext}
                                    aria-label="Sonraki kitap"
                                    className="
                                        flex h-10 w-10
                                        items-center justify-center
                                        border border-white/[0.1]
                                        text-white/40
                                        transition-all
                                        hover:border-white/25
                                        hover:text-white
                                    "
                                >
                                    <ChevronRight className="h-4 w-4"/>
                                </button>
                            </div>

                            {/* Indicators */}
                            <div className="mt-5 flex gap-1.5">
                                {books.map((book, index) => (
                                    <button
                                        key={book.id}
                                        type="button"
                                        onClick={() => setActiveIndex(index)}
                                        aria-label={`${book.title} kitabına git`}
                                        className={`
                                            h-1 transition-all duration-300
                                            ${
                                            index === activeIndex
                                                ? "w-8 bg-white"
                                                : "w-2 bg-white/20 hover:bg-white/40"
                                        }
                                        `}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
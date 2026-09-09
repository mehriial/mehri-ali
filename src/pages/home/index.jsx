import { useState } from "react";
import { Link } from "react-router-dom";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import { books } from "../../consts/index.js";

const getRandomBooks = (items, count) => {
    const shuffled = [...items];

    for (let index = shuffled.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [shuffled[index], shuffled[randomIndex]] = [
            shuffled[randomIndex],
            shuffled[index],
        ];
    }

    return shuffled.slice(0, count);
};

const Home = () => {
    const [featuredBooks] = useState(() => getRandomBooks(books, 3));
    const [activeIndex, setActiveIndex] = useState(0);

    const activeBook = featuredBooks[activeIndex];

    const nextBook = () => {
        setActiveIndex((current) =>
            current === featuredBooks.length - 1 ? 0 : current + 1
        );
    };

    const previousBook = () => {
        setActiveIndex((current) =>
            current === 0 ? featuredBooks.length - 1 : current - 1
        );
    };

    return (
        <div className="min-h-screen bg-background text-shadow-white">
            {/* BOOK CAROUSEL */}
            <section className="relative overflow-hidden border-t border-white/10">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-56" />
                <div className="mx-auto max-w-[1400px] p-6 lg:px-10">

                    {/* Section heading */}
                    <div className="relative mb-14 flex items-end justify-between">
                        <div>
                            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-header-accent">
                                Kitaplarım
                            </p>

                            <h1 className="mt-4 font-heading text-4xl font-normal tracking-tight sm:text-5xl">
                                Hikâyeler
                            </h1>
                            <p className="mt-4 max-w-md text-sm leading-7 text-shadow-white/45">
                                Her sayfada başka bir iz, her karakterde yeni bir dünya.
                            </p>
                        </div>

                        {/* Controls */}
                        <div className="hidden items-center gap-3 sm:flex">
                            <button
                                onClick={previousBook}
                                className="
                                    flex h-11 w-11
                                    items-center justify-center
                                    border border-white/10
                                    text-shadow-white
                                    transition-all duration-300
                                    hover:border-header-accent
                                    hover:text-header-accent
                                    focus-visible:outline-offset-4
                                "
                                aria-label="Önceki kitap"
                            >
                                <HiArrowLeft className="h-4 w-4" />
                            </button>

                            <button
                                onClick={nextBook}
                                className="
                                    flex h-11 w-11
                                    items-center justify-center
                                    border border-white/10
                                    text-shadow-white
                                    transition-all duration-300
                                    hover:border-header-accent
                                    hover:text-header-accent
                                    focus-visible:outline-offset-4
                                "
                                aria-label="Sonraki kitap"
                            >
                                <HiArrowRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    {/* Carousel */}
                    <div className="relative overflow-hidden rounded-sm border border-white/5 bg-white/[0.015] p-5 sm:p-8 lg:p-10">
                        <div
                            key={activeBook.id}
                            className="
                                grid
                                animate-[fadeIn_500ms_ease]
                                gap-12
                                lg:grid-cols-[380px_1fr]
                                lg:gap-20
                            "
                        >
                            {/* COVER */}
                            <div className="relative mx-auto w-full max-w-[380px]">
                                <div className="absolute -right-4 -top-4 h-full w-full border border-header-accent/30" />

                                <div className="relative aspect-[3/4] overflow-hidden bg-[#171717]">
                                    <img
                                        src={activeBook.cover}
                                        alt={activeBook.title}
                                        loading="eager"
                                        className="
                                            h-full
                                            w-full
                                            object-cover
                                            transition-transform
                                            duration-700
                                            hover:scale-[1.03]
                                        "
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                                    <div className="absolute bottom-6 left-6">
                                        <span className="border border-white/20 bg-black/20 px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] text-white backdrop-blur-sm">
                                            {activeBook.status}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* CONTENT */}
                            <div className="flex flex-col justify-center">
                                <div className="flex items-center gap-4">
                                    <span className="text-[10px] uppercase tracking-[0.3em] text-header-accent">
                                        {activeBook.genre}
                                    </span>

                                    <span className="h-px w-8 bg-white/20" />

                                    <span className="text-[10px] uppercase tracking-[0.2em] text-shadow-white/35">
                                        {activeBook.chapters}
                                    </span>
                                </div>

                                <h3 className="mt-6 font-heading text-5xl font-normal leading-tight sm:text-6xl">
                                    {activeBook.title}
                                </h3>

                                <p className="mt-5 font-heading text-xl italic text-header-accent">
                                    {activeBook.subtitle}
                                </p>

                                <p className="mt-7 max-w-xl text-base leading-8 text-shadow-white/55">
                                    {activeBook.description}
                                </p>

                                <Link
                                    to={activeBook.href}
                                    className="
                                        mt-10
                                        inline-flex
                                        w-fit
                                        items-center
                                        gap-4
                                        border-b
                                        border-header-accent
                                        pb-2
                                        text-[11px]
                                        font-medium
                                        uppercase
                                        tracking-[0.2em]
                                        text-shadow-white
                                        transition-colors
                                        duration-300
                                        hover:text-header-accent
                                    "
                                >
                                    Kitabı keşfet
                                    <span>→</span>
                                </Link>

                                {/* Mobile controls */}
                                <div className="mt-12 flex items-center gap-3 sm:hidden">
                                    <button
                                        onClick={previousBook}
                                    className="flex h-11 w-11 items-center justify-center border border-white/10"
                                        aria-label="Önceki kitap"
                                    >
                                        <HiArrowLeft className="h-4 w-4" />
                                    </button>

                                    <button
                                        onClick={nextBook}
                                        className="flex h-11 w-11 items-center justify-center border border-white/10"
                                        aria-label="Sonraki kitap"
                                    >
                                        <HiArrowRight className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Progress */}
                    <div className="mt-16 flex items-center gap-6">
                        <span className="text-[10px] tracking-[0.2em] text-shadow-white/40">
                            {String(activeIndex + 1).padStart(2, "0")}
                        </span>

                        <div className="h-px flex-1 bg-white/10">
                            <div
                                className="h-full bg-header-accent transition-all duration-500"
                                style={{
                                    width: `${
                                        ((activeIndex + 1) /
                                            featuredBooks.length) *
                                        100
                                    }%`,
                                }}
                            />
                        </div>

                        <span className="text-[10px] tracking-[0.2em] text-shadow-white/40">
                            {String(featuredBooks.length).padStart(2, "0")}
                        </span>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;

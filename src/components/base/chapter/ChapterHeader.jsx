import { Link } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";

const ChapterHeader = ({ book, chapter }) => {
    return (
        <>
            <header className="border-b border-white/10">
                <div className="
                    mx-auto
                    max-w-[900px]
                    px-6
                    py-6
                    lg:px-10
                ">
                    <div className="
                        flex
                        items-center
                        justify-between
                        gap-4
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
                                hover:text-header-accent
                            "
                        >
                            <HiArrowLeft className="
                                h-3.5
                                w-3.5
                                transition-transform
                                group-hover:-translate-x-1
                            " />

                            {book.title}
                        </Link>

                        <Link
                            to={`${book.href}/chapters`}
                            className="
                                text-[10px]
                                uppercase
                                tracking-[0.2em]
                                text-shadow-white/30
                                transition-colors
                                hover:text-header-accent
                            "
                        >
                            Bölümler
                        </Link>
                    </div>
                </div>
            </header>

            <section className="border-b border-white/10">
                <div className="
                    mx-auto
                    max-w-[900px]
                    px-6
                    py-16
                    text-center
                    lg:px-10
                    lg:py-24
                ">
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

                    <p className="
                        mt-5
                        text-[10px]
                        uppercase
                        tracking-[0.3em]
                        text-shadow-white/30
                    ">
                        Bölüm {chapter.order}
                    </p>

                    <h1 className="
                        mt-5
                        font-heading
                        text-4xl
                        font-normal
                        leading-tight
                        tracking-tight
                        sm:text-5xl
                        lg:text-6xl
                    ">
                        {chapter.title}
                    </h1>

                    {chapter.date && (
                        <p className="
                            mt-6
                            text-xs
                            text-shadow-white/30
                        ">
                            {chapter.date}
                        </p>
                    )}
                </div>
            </section>
        </>
    );
};

export default ChapterHeader;
import { Link } from "react-router-dom";
import {
    HiArrowLeft,
    HiArrowRight,
} from "react-icons/hi";

const ChapterNavigation = ({
                               book,
                               previousChapter,
                               nextChapter,
                           }) => {
    return (
        <section className="
            mx-auto
            max-w-[900px]
            border-t
            border-white/10
            px-6
            py-16
            lg:px-10
        ">

            <div className="
                grid
                gap-4
                sm:grid-cols-2
            ">

                {/* PREVIOUS */}

                {previousChapter ? (

                    <Link
                        to={`${book.href}/chapters/${previousChapter.id}`}
                        className="
                            group
                            flex
                            items-center
                            gap-5
                            border
                            border-white/10
                            p-5
                            transition-all
                            duration-300
                            hover:border-header-accent
                        "
                    >

                        <HiArrowLeft className="
                            h-5
                            w-5
                            shrink-0
                            text-header-accent
                            transition-transform
                            duration-300
                            group-hover:-translate-x-1
                        " />

                        <div className="min-w-0">

                            <p className="
                                text-[9px]
                                uppercase
                                tracking-[0.2em]
                                text-shadow-white/30
                            ">
                                Önceki bölüm
                            </p>

                            <p className="
                                mt-2
                                truncate
                                font-heading
                                text-lg
                                transition-colors
                                duration-300
                                group-hover:text-header-accent
                            ">
                                {previousChapter.title}
                            </p>

                        </div>

                    </Link>

                ) : (
                    <div />
                )}

                {/* NEXT */}

                {nextChapter ? (

                    <Link
                        to={`${book.href}/chapters/${nextChapter.id}`}
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
                            transition-all
                            duration-300
                            hover:border-header-accent
                        "
                    >

                        <div className="min-w-0">

                            <p className="
                                text-[9px]
                                uppercase
                                tracking-[0.2em]
                                text-shadow-white/30
                            ">
                                Sonraki bölüm
                            </p>

                            <p className="
                                mt-2
                                truncate
                                font-heading
                                text-lg
                                transition-colors
                                duration-300
                                group-hover:text-header-accent
                            ">
                                {nextChapter.title}
                            </p>

                        </div>

                        <HiArrowRight className="
                            h-5
                            w-5
                            shrink-0
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

            {/* ALL CHAPTERS */}

            <div className="
                mt-10
                text-center
            ">

                <Link
                    to={`${book.href}/chapters`}
                    className="
                        text-[10px]
                        uppercase
                        tracking-[0.25em]
                        text-shadow-white/30
                        transition-colors
                        duration-300
                        hover:text-header-accent
                    "
                >
                    Tüm bölümler
                </Link>

            </div>

        </section>
    );
};

export default ChapterNavigation;
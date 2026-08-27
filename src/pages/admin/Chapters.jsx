import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
    HiPencil,
    HiPlus,
    HiSearch,
    HiTrash,
} from "react-icons/hi";

import { books, chapters } from "../../consts/index.js";

const Chapters = () => {
    const [search, setSearch] = useState("");
    const [bookFilter, setBookFilter] = useState("all");

    const filteredChapters = useMemo(() => {
        return chapters
            .filter((chapter) => {
                const book = books.find(
                    (item) => item.id === chapter.bookId
                );

                const matchesSearch =
                    chapter.title
                        ?.toLowerCase()
                        .includes(search.toLowerCase()) ||
                    book?.title
                        ?.toLowerCase()
                        .includes(search.toLowerCase());

                const matchesBook =
                    bookFilter === "all" ||
                    chapter.bookId.toString() === bookFilter;

                return matchesSearch && matchesBook;
            })
            .sort((a, b) => a.order - b.order);
    }, [search, bookFilter]);

    return (
        <div className="min-h-screen bg-background text-shadow-white">

            <main className="
                mx-auto
                max-w-[1400px]
                px-6
                py-10
                lg:px-10
                lg:py-14
            ">

                <PageHeader
                    title="Bölümler"
                    description="Kitap bölümlerini buradan yönetebilirsin."
                >
                    <Link
                        to="/admin/chapters/create"
                        className="
                            inline-flex
                            items-center
                            gap-2
                            border
                            border-header-accent
                            px-5
                            py-3
                            text-[9px]
                            uppercase
                            tracking-[0.2em]
                            text-header-accent
                            transition-all
                            hover:bg-header-accent
                            hover:text-white
                        "
                    >
                        <HiPlus className="h-4 w-4" />
                        Yeni bölüm
                    </Link>
                </PageHeader>

                {/* FILTERS */}

                <div className="
                    mt-10
                    flex
                    flex-col
                    gap-3
                    md:flex-row
                ">

                    <div className="relative flex-1">

                        <HiSearch className="
                            absolute
                            left-4
                            top-1/2
                            h-4
                            w-4
                            -translate-y-1/2
                            text-shadow-white/30
                        " />

                        <input
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            placeholder="Bölüm ara..."
                            className="
                                h-12
                                w-full
                                border
                                border-white/10
                                bg-white/[0.02]
                                pl-11
                                pr-4
                                text-sm
                                text-white
                                outline-none
                                focus:border-header-accent
                            "
                        />

                    </div>

                    <select
                        value={bookFilter}
                        onChange={(e) =>
                            setBookFilter(e.target.value)
                        }
                        className="
                            h-12
                            border
                            border-white/10
                            bg-background
                            px-4
                            text-sm
                            text-white
                            outline-none
                            focus:border-header-accent
                            md:w-64
                        "
                    >
                        <option value="all">
                            Tüm kitaplar
                        </option>

                        {books.map((book) => (
                            <option
                                key={book.id}
                                value={book.id}
                            >
                                {book.title}
                            </option>
                        ))}
                    </select>

                </div>

                {/* TABLE */}

                <div className="
                    mt-6
                    overflow-x-auto
                    border
                    border-white/10
                ">

                    <table className="w-full min-w-[700px]">

                        <thead>
                        <tr className="
                            border-b
                            border-white/10
                            text-left
                        ">
                            <th className="px-5 py-4 text-[9px] uppercase tracking-[0.2em] text-shadow-white/30">
                                #
                            </th>

                            <th className="px-5 py-4 text-[9px] uppercase tracking-[0.2em] text-shadow-white/30">
                                Bölüm
                            </th>

                            <th className="px-5 py-4 text-[9px] uppercase tracking-[0.2em] text-shadow-white/30">
                                Kitap
                            </th>

                            <th className="px-5 py-4 text-[9px] uppercase tracking-[0.2em] text-shadow-white/30">
                                Tarih
                            </th>

                            <th className="px-5 py-4 text-right text-[9px] uppercase tracking-[0.2em] text-shadow-white/30">
                                İşlemler
                            </th>
                        </tr>
                        </thead>

                        <tbody>

                        {filteredChapters.map((chapter) => {

                            const book = books.find(
                                (item) =>
                                    item.id === chapter.bookId
                            );

                            return (
                                <tr
                                    key={chapter.id}
                                    className="
                                        border-b
                                        border-white/10
                                        transition-colors
                                        hover:bg-white/[0.02]
                                    "
                                >

                                    <td className="px-5 py-5 text-sm text-shadow-white/40">
                                        {chapter.order}
                                    </td>

                                    <td className="px-5 py-5">

                                        <p className="
                                            font-heading
                                            text-base
                                        ">
                                            {chapter.title}
                                        </p>

                                    </td>

                                    <td className="px-5 py-5 text-sm text-shadow-white/50">
                                        {book?.title || "-"}
                                    </td>

                                    <td className="px-5 py-5 text-xs text-shadow-white/40">
                                        {chapter.date || "-"}
                                    </td>

                                    <td className="px-5 py-5">

                                        <div className="
                                            flex
                                            justify-end
                                            gap-2
                                        ">

                                            <Link
                                                to={`/admin/chapters/${chapter.id}/edit`}
                                                className="iconButton"
                                                title="Düzenle"
                                            >
                                                <HiPencil />
                                            </Link>

                                            <button
                                                type="button"
                                                className="iconButton hover:text-red-400"
                                                title="Sil"
                                            >
                                                <HiTrash />
                                            </button>

                                        </div>

                                    </td>

                                </tr>
                            );
                        })}

                        </tbody>

                    </table>

                </div>

            </main>
        </div>
    );
};

const PageHeader = ({ title, description, children }) => (
    <div className="
        flex
        flex-col
        justify-between
        gap-5
        border-b
        border-white/10
        pb-8
        md:flex-row
        md:items-end
    ">

        <div>

            <p className="
                text-[9px]
                uppercase
                tracking-[0.3em]
                text-header-accent
            ">
                Yönetim
            </p>

            <h1 className="
                mt-3
                font-heading
                text-3xl
            ">
                {title}
            </h1>

            <p className="
                mt-2
                text-sm
                text-shadow-white/40
            ">
                {description}
            </p>

        </div>

        {children}

    </div>
);

export default Chapters;

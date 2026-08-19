import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
    HiPlus,
    HiSearch,
    HiPencil,
    HiTrash,
    HiEye,
    HiDotsVertical,
    HiBookOpen,
} from "react-icons/hi";

import { books } from "../../consts/index.js";

const AdminBooks = () => {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("all");

    const filteredBooks = useMemo(() => {
        return books.filter((book) => {
            const searchValue = search.toLowerCase().trim();

            const matchesSearch =
                !searchValue ||
                book.title?.toLowerCase().includes(searchValue) ||
                book.series?.name?.toLowerCase().includes(searchValue);

            const bookStatus = book.status || "published";

            const matchesStatus =
                status === "all" ||
                bookStatus === status;

            return matchesSearch && matchesStatus;
        });
    }, [search, status]);

    const handleDelete = (book) => {
        const confirmed = window.confirm(
            `"${book.title}" kitabını silmek istediğine emin misin?`
        );

        if (!confirmed) return;

        console.log("Delete book:", book.id);
    };

    return (
        <div className="min-h-screen">

            {/* =====================================================
                HEADER
            ===================================================== */}

            <header className="border-b border-white/10">

                <div className="
                    mx-auto
                    max-w-[1400px]
                    px-6
                    py-8
                    lg:px-10
                ">

                    <div className="
                        flex
                        flex-col
                        gap-6
                        sm:flex-row
                        sm:items-end
                        sm:justify-between
                    ">

                        <div>
                            <p className="
                                text-[9px]
                                uppercase
                                tracking-[0.3em]
                                text-header-accent
                            ">
                                Məzmun
                            </p>

                            <h1 className="
                                mt-3
                                font-heading
                                text-3xl
                                sm:text-4xl
                            ">
                                Kitablar
                            </h1>

                            <p className="
                                mt-3
                                text-sm
                                text-shadow-white/40
                            ">
                                Kitaplarını buradan yönet.
                            </p>
                        </div>

                        <Link
                            to="/admin/books/create"
                            className="
                                inline-flex
                                items-center
                                justify-center
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
                                duration-300
                                hover:bg-header-accent
                                hover:text-white
                            "
                        >
                            <HiPlus className="h-4 w-4" />
                            Yeni kitap
                        </Link>

                    </div>

                </div>

            </header>

            {/* =====================================================
                CONTENT
            ===================================================== */}

            <main className="
                mx-auto
                max-w-[1400px]
                px-6
                py-8
                lg:px-10
                lg:py-10
            ">

                {/* FILTERS */}

                <section className="
                    flex
                    flex-col
                    gap-3
                    md:flex-row
                ">

                    {/* SEARCH */}

                    <div className="
                        relative
                        flex-1
                    ">

                        <HiSearch className="
                            pointer-events-none
                            absolute
                            left-4
                            top-1/2
                            h-4
                            w-4
                            -translate-y-1/2
                            text-shadow-white/30
                        " />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            placeholder="Kitap ara..."
                            className="
                                h-11
                                w-full
                                border
                                border-white/10
                                bg-white/[0.02]
                                pl-11
                                pr-4
                                text-sm
                                text-white
                                outline-none
                                transition-colors
                                placeholder:text-shadow-white/25
                                focus:border-header-accent
                            "
                        />

                    </div>

                    {/* STATUS */}

                    <select
                        value={status}
                        onChange={(e) =>
                            setStatus(e.target.value)
                        }
                        className="
                            h-11
                            border
                            border-white/10
                            bg-background
                            px-4
                            text-xs
                            text-shadow-white/70
                            outline-none
                            focus:border-header-accent
                        "
                    >
                        <option value="all">
                            Tüm kitaplar
                        </option>

                        <option value="published">
                            Yayında
                        </option>

                        <option value="draft">
                            Taslak
                        </option>
                    </select>

                </section>

                {/* RESULT INFO */}

                <div className="
                    mt-6
                    flex
                    items-center
                    justify-between
                ">

                    <p className="
                        text-[9px]
                        uppercase
                        tracking-[0.2em]
                        text-shadow-white/30
                    ">
                        {filteredBooks.length} kitap
                    </p>

                </div>

                {/* =================================================
                    TABLE
                ================================================= */}

                <section className="
                    mt-4
                    overflow-hidden
                    border
                    border-white/10
                ">

                    {/* DESKTOP HEADER */}

                    <div className="
                        hidden
                        grid-cols-[minmax(0,2fr)_1fr_120px_100px]
                        border-b
                        border-white/10
                        bg-white/[0.02]
                        px-6
                        py-4
                        md:grid
                    ">

                        <p className="
                            text-[9px]
                            uppercase
                            tracking-[0.2em]
                            text-shadow-white/30
                        ">
                            Kitap
                        </p>

                        <p className="
                            text-[9px]
                            uppercase
                            tracking-[0.2em]
                            text-shadow-white/30
                        ">
                            Seri
                        </p>

                        <p className="
                            text-[9px]
                            uppercase
                            tracking-[0.2em]
                            text-shadow-white/30
                        ">
                            Durum
                        </p>

                        <p className="
                            text-right
                            text-[9px]
                            uppercase
                            tracking-[0.2em]
                            text-shadow-white/30
                        ">
                            İşlem
                        </p>

                    </div>

                    {/* ROWS */}

                    {filteredBooks.length > 0 ? (
                        filteredBooks.map((book) => {

                            const bookStatus =
                                book.status || "published";

                            return (
                                <div
                                    key={book.id}
                                    className="
                                        border-b
                                        border-white/10
                                        px-5
                                        py-5
                                        last:border-b-0
                                        transition-colors
                                        hover:bg-white/[0.02]
                                        md:px-6
                                    "
                                >

                                    {/* DESKTOP */}

                                    <div className="
                                        hidden
                                        grid-cols-[minmax(0,2fr)_1fr_120px_100px]
                                        items-center
                                        gap-4
                                        md:grid
                                    ">

                                        {/* BOOK */}

                                        <div className="
                                            flex
                                            min-w-0
                                            items-center
                                            gap-4
                                        ">

                                            <div className="
                                                flex
                                                h-11
                                                w-9
                                                shrink-0
                                                items-center
                                                justify-center
                                                border
                                                border-white/10
                                                bg-white/[0.02]
                                            ">
                                                <HiBookOpen className="
                                                    h-5
                                                    w-5
                                                    text-header-accent
                                                " />
                                            </div>

                                            <div className="min-w-0">

                                                <p className="
                                                    truncate
                                                    font-heading
                                                    text-base
                                                ">
                                                    {book.title}
                                                </p>

                                                <p className="
                                                    mt-1
                                                    text-[10px]
                                                    text-shadow-white/30
                                                ">
                                                    ID: {book.id}
                                                </p>

                                            </div>

                                        </div>

                                        {/* SERIES */}

                                        <p className="
                                            truncate
                                            text-xs
                                            text-shadow-white/50
                                        ">
                                            {book.series?.name || "—"}
                                        </p>

                                        {/* STATUS */}

                                        <div>
                                            <span
                                                className={`
                                                    inline-flex
                                                    border
                                                    px-2.5
                                                    py-1
                                                    text-[8px]
                                                    uppercase
                                                    tracking-[0.15em]

                                                    ${
                                                    bookStatus === "published"
                                                        ? "border-green-500/30 text-green-400"
                                                        : "border-yellow-500/30 text-yellow-400"
                                                }
                                                `}
                                            >
                                                {
                                                    bookStatus === "published"
                                                        ? "Yayında"
                                                        : "Taslak"
                                                }
                                            </span>
                                        </div>

                                        {/* ACTIONS */}

                                        <div className="
                                            flex
                                            justify-end
                                            gap-1
                                        ">

                                            <Link
                                                to={book.href}
                                                target="_blank"
                                                title="Görüntüle"
                                                className="
                                                    flex
                                                    h-8
                                                    w-8
                                                    items-center
                                                    justify-center
                                                    text-shadow-white/35
                                                    transition-colors
                                                    hover:text-header-accent
                                                "
                                            >
                                                <HiEye className="h-4 w-4" />
                                            </Link>

                                            <Link
                                                to={`/admin/books/${book.id}/edit`}
                                                title="Düzenle"
                                                className="
                                                    flex
                                                    h-8
                                                    w-8
                                                    items-center
                                                    justify-center
                                                    text-shadow-white/35
                                                    transition-colors
                                                    hover:text-header-accent
                                                "
                                            >
                                                <HiPencil className="h-4 w-4" />
                                            </Link>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleDelete(book)
                                                }
                                                title="Sil"
                                                className="
                                                    flex
                                                    h-8
                                                    w-8
                                                    items-center
                                                    justify-center
                                                    text-shadow-white/35
                                                    transition-colors
                                                    hover:text-red-400
                                                "
                                            >
                                                <HiTrash className="h-4 w-4" />
                                            </button>

                                        </div>

                                    </div>

                                    {/* MOBILE */}

                                    <div className="
                                        flex
                                        items-start
                                        gap-4
                                        md:hidden
                                    ">

                                        <div className="
                                            flex
                                            h-12
                                            w-10
                                            shrink-0
                                            items-center
                                            justify-center
                                            border
                                            border-white/10
                                        ">
                                            <HiBookOpen className="
                                                h-5
                                                w-5
                                                text-header-accent
                                            " />
                                        </div>

                                        <div className="min-w-0 flex-1">

                                            <div className="
                                                flex
                                                items-start
                                                justify-between
                                                gap-3
                                            ">

                                                <div className="min-w-0">

                                                    <p className="
                                                        truncate
                                                        font-heading
                                                        text-base
                                                    ">
                                                        {book.title}
                                                    </p>

                                                    <p className="
                                                        mt-1
                                                        text-[10px]
                                                        text-shadow-white/30
                                                    ">
                                                        {book.series?.name || "Seri yok"}
                                                    </p>

                                                </div>

                                                <button
                                                    type="button"
                                                    className="
                                                        shrink-0
                                                        text-shadow-white/40
                                                    "
                                                >
                                                    <HiDotsVertical className="h-5 w-5" />
                                                </button>

                                            </div>

                                            <div className="
                                                mt-4
                                                flex
                                                items-center
                                                justify-between
                                            ">

                                                <span
                                                    className={`
                                                        border
                                                        px-2.5
                                                        py-1
                                                        text-[8px]
                                                        uppercase
                                                        tracking-[0.15em]

                                                        ${
                                                        bookStatus === "published"
                                                            ? "border-green-500/30 text-green-400"
                                                            : "border-yellow-500/30 text-yellow-400"
                                                    }
                                                    `}
                                                >
                                                    {
                                                        bookStatus === "published"
                                                            ? "Yayında"
                                                            : "Taslak"
                                                    }
                                                </span>

                                                <div className="
                                                    flex
                                                    gap-1
                                                ">

                                                    <Link
                                                        to={book.href}
                                                        target="_blank"
                                                        className="
                                                            flex
                                                            h-8
                                                            w-8
                                                            items-center
                                                            justify-center
                                                            text-shadow-white/40
                                                            hover:text-header-accent
                                                        "
                                                    >
                                                        <HiEye className="h-4 w-4" />
                                                    </Link>

                                                    <Link
                                                        to={`/admin/books/${book.id}/edit`}
                                                        className="
                                                            flex
                                                            h-8
                                                            w-8
                                                            items-center
                                                            justify-center
                                                            text-shadow-white/40
                                                            hover:text-header-accent
                                                        "
                                                    >
                                                        <HiPencil className="h-4 w-4" />
                                                    </Link>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleDelete(book)
                                                        }
                                                        className="
                                                            flex
                                                            h-8
                                                            w-8
                                                            items-center
                                                            justify-center
                                                            text-shadow-white/40
                                                            hover:text-red-400
                                                        "
                                                    >
                                                        <HiTrash className="h-4 w-4" />
                                                    </button>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>
                            );
                        })
                    ) : (

                        /* EMPTY */

                        <div className="
                            flex
                            min-h-[300px]
                            flex-col
                            items-center
                            justify-center
                            px-6
                            text-center
                        ">

                            <HiBookOpen className="
                                h-8
                                w-8
                                text-shadow-white/20
                            " />

                            <p className="
                                mt-5
                                font-heading
                                text-lg
                            ">
                                Kitap bulunamadı
                            </p>

                            <p className="
                                mt-2
                                text-xs
                                text-shadow-white/30
                            ">
                                Arama kriterlerini değiştirmeyi dene.
                            </p>

                        </div>

                    )}

                </section>

            </main>

        </div>
    );
};

export default AdminBooks;
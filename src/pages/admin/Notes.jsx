import { useState } from "react";
import { HiPencil, HiPlus, HiSearch, HiTrash } from "react-icons/hi";
import { Link } from "react-router-dom";

const initialNotes = [
    {
        id: 1,
        title: "Karakter gelişimi",
        content: "Ana karakterin ikinci bölümden itibaren değişimi...",
        date: "19 Ağustos 2026",
    },
    {
        id: 2,
        title: "Yeni hikaye fikri",
        content: "Küçük bir kasabada geçen yeni bir hikaye...",
        date: "15 Ağustos 2026",
    },
    {
        id: 3,
        title: "Bölüm 14 notları",
        content: "Bu bölümde karakterlerin geçmişine dönülecek.",
        date: "10 Ağustos 2026",
    },
];

const Notes = () => {
    const [notes, setNotes] = useState(initialNotes);
    const [search, setSearch] = useState("");

    const filtered = notes.filter(
        (note) =>
            note.title
                .toLowerCase()
                .includes(search.toLowerCase()) ||
            note.content
                .toLowerCase()
                .includes(search.toLowerCase())
    );

    const removeNote = (id) => {
        setNotes((prev) =>
            prev.filter((note) => note.id !== id)
        );
    };

    return (
        <div className="min-h-screen bg-background">

            <main className="mx-auto max-w-[1200px] px-6 py-10 lg:px-10">

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

                        <p className="sectionLabel">
                            Yönetim
                        </p>

                        <h1 className="mt-3 font-heading text-3xl">
                            Notlar
                        </h1>

                        <p className="mt-2 text-sm text-shadow-white/40">
                            Yazar notlarını yönet.
                        </p>

                    </div>

                    <Link
                        to="/admin/notes/create"
                        className="primaryButton"
                    >
                        <HiPlus />
                        Yeni not
                    </Link>

                </div>

                <div className="relative mt-8">

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
                        placeholder="Not ara..."
                        className="adminInput pl-11"
                    />

                </div>

                <div className="
                    mt-6
                    grid
                    gap-3
                    md:grid-cols-2
                    xl:grid-cols-3
                ">

                    {filtered.map((note) => (

                        <article
                            key={note.id}
                            className="
                                group
                                border
                                border-white/10
                                p-6
                                transition-colors
                                hover:border-header-accent
                            "
                        >

                            <div className="
                                flex
                                justify-between
                                gap-4
                            ">

                                <p className="
                                    text-[9px]
                                    uppercase
                                    tracking-[0.2em]
                                    text-shadow-white/30
                                ">
                                    {note.date}
                                </p>

                                <div className="flex gap-2">

                                    <Link
                                        to={`/admin/notes/${note.id}/edit`}
                                        className="iconButton"
                                    >
                                        <HiPencil />
                                    </Link>

                                    <button
                                        onClick={() =>
                                            removeNote(note.id)
                                        }
                                        className="
                                            iconButton
                                            hover:text-red-400
                                        "
                                    >
                                        <HiTrash />
                                    </button>

                                </div>

                            </div>

                            <h2 className="
                                mt-6
                                font-heading
                                text-xl
                            ">
                                {note.title}
                            </h2>

                            <p className="
                                mt-3
                                line-clamp-4
                                text-sm
                                leading-7
                                text-shadow-white/50
                            ">
                                {note.content}
                            </p>

                        </article>

                    ))}

                </div>

            </main>
        </div>
    );
};

export default Notes;
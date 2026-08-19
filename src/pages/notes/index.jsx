import { useState } from "react";
import { HiPlus } from "react-icons/hi";
import NoteForm from "../../components/base/notes/NoteForm.jsx";
import NoteCard from "../../components/base/notes/NoteCard.jsx";


const Notes = () => {

    const [isCreating, setIsCreating] = useState(false);

    const [notes, setNotes] = useState([
        {
            id: 1,
            title: "Aklımda qalanlar",
            content:
                "Bu kitabın əsas obrazının qərarları haqqında daha çox düşünmək istəyirəm.",
            date: "19 Avqust 2026",
        },
        {
            id: 2,
            title: "Nəzəriyyə",
            content:
                "Məncə hadisələrin arxasında başqa bir səbəb var.",
            date: "18 Avqust 2026",
        },
    ]);

    const handleCreate = (note) => {
        setNotes((prev) => [
            {
                id: Date.now(),
                ...note,
                date: "Bu gün",
            },
            ...prev,
        ]);

        setIsCreating(false);
    };

    const handleDelete = (id) => {
        setNotes((prev) =>
            prev.filter((note) => note.id !== id)
        );
    };

    return (
        <div className="
            min-h-screen
            bg-background
            text-shadow-white
        ">

            <main className="
                mx-auto
                max-w-[900px]
                px-6
                py-16
                lg:px-10
                lg:py-24
            ">

                {/* HEADER */}

                <header className="
                    flex
                    items-end
                    justify-between
                    gap-6
                    border-b
                    border-white/10
                    pb-8
                ">

                    <div>

                        <p className="
                            text-[10px]
                            uppercase
                            tracking-[0.3em]
                            text-header-accent
                        ">
                            Mənim qeydlərim
                        </p>

                        <h1 className="
                            mt-4
                            font-heading
                            text-4xl
                            sm:text-5xl
                        ">
                            Qeydlər
                        </h1>

                        <p className="
                            mt-4
                            max-w-xl
                            text-sm
                            leading-7
                            text-shadow-white/40
                        ">
                            Oxuduğun kitablar haqqında
                            düşüncələrini, nəzəriyyələrini və
                            şəxsi qeydlərini burada saxla.
                        </p>

                    </div>

                    <button
                        type="button"
                        onClick={() => setIsCreating(true)}
                        className="
                            flex
                            shrink-0
                            items-center
                            gap-2
                            border
                            border-header-accent
                            px-4
                            py-3
                            text-[9px]
                            uppercase
                            tracking-[0.2em]
                            text-header-accent
                            transition-colors
                            hover:bg-header-accent
                            hover:text-white
                        "
                    >
                        <HiPlus className="h-4 w-4" />
                        Yeni qeyd
                    </button>

                </header>

                {/* FORM */}

                {isCreating && (
                    <NoteForm
                        onClose={() => setIsCreating(false)}
                        onSubmit={handleCreate}
                    />
                )}

                {/* NOTES */}

                <section className="mt-10">

                    {notes.length > 0 ? (
                        <div className="space-y-5">
                            {notes.map((note) => (
                                <NoteCard
                                    key={note.id}
                                    note={note}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="
                            border
                            border-dashed
                            border-white/10
                            px-6
                            py-16
                            text-center
                        ">
                            <p className="
                                text-sm
                                text-shadow-white/30
                            ">
                                Henüz bir qeyd yazmamısan.
                            </p>
                        </div>
                    )}

                </section>

            </main>

        </div>
    );
};

export default Notes;
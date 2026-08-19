import { HiTrash } from "react-icons/hi";

const NoteCard = ({
                      note,
                      onDelete,
                  }) => {
    return (
        <article className="
            group
            border
            border-white/10
            p-6
            transition-colors
            duration-300
            hover:border-white/20
        ">

            <div className="
                flex
                items-start
                justify-between
                gap-5
            ">

                <div className="min-w-0">

                    <h2 className="
                        font-heading
                        text-xl
                    ">
                        {note.title}
                    </h2>

                    <p className="
                        mt-2
                        text-[10px]
                        text-shadow-white/30
                    ">
                        {note.date}
                    </p>

                </div>

                <button
                    type="button"
                    onClick={() => onDelete(note.id)}
                    className="
                        shrink-0
                        text-shadow-white/20
                        opacity-0
                        transition-all
                        duration-300
                        group-hover:opacity-100
                        hover:text-red-400
                    "
                    title="Qeydi sil"
                >
                    <HiTrash className="h-4 w-4" />
                </button>

            </div>

            <p className="
                mt-5
                text-sm
                leading-7
                text-shadow-white/65
            ">
                {note.content}
            </p>

        </article>
    );
};

export default NoteCard;
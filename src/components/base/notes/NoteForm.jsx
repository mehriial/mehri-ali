import { useState } from "react";
import {
    HiX,
    HiCheck,
} from "react-icons/hi";

const NoteForm = ({ onClose, onSubmit }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!content.trim()) return;

        onSubmit({
            title: title.trim() || "Adsız qeyd",
            content: content.trim(),
        });

        setTitle("");
        setContent("");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="
                mt-8
                border
                border-white/10
                bg-white/[0.02]
                p-6
            "
        >
            <div className="
                flex
                items-center
                justify-between
                gap-4
            ">
                <p className="
                    text-[9px]
                    uppercase
                    tracking-[0.25em]
                    text-header-accent
                ">
                    Yeni qeyd
                </p>

                <button
                    type="button"
                    onClick={onClose}
                    className="
                        flex
                        h-7
                        w-7
                        items-center
                        justify-center
                        text-shadow-white/30
                        transition-colors
                        hover:text-white
                    "
                    aria-label="Bağla"
                >
                    <HiX className="h-4 w-4" />
                </button>
            </div>

            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Qeyd başlığı"
                className="
                    mt-6
                    w-full
                    border-b
                    border-white/10
                    bg-transparent
                    pb-3
                    font-heading
                    text-xl
                    text-white
                    outline-none
                    placeholder:text-shadow-white/20
                    focus:border-header-accent
                "
            />

            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Düşüncələrini yaz..."
                rows={6}
                className="
                    mt-5
                    w-full
                    resize-none
                    bg-transparent
                    text-sm
                    leading-7
                    text-white
                    outline-none
                    placeholder:text-shadow-white/20
                "
            />

            <div className="
                mt-5
                flex
                justify-end
            ">
                <button
                    type="submit"
                    className="
                        flex
                        items-center
                        gap-2
                        border
                        border-header-accent
                        px-5
                        py-2.5
                        text-[9px]
                        uppercase
                        tracking-[0.2em]
                        text-header-accent
                        transition-colors
                        hover:bg-header-accent
                        hover:text-white
                    "
                >
                    <HiCheck className="h-3.5 w-3.5" />
                    Qeydi saxla
                </button>
            </div>
        </form>
    );
};

export default NoteForm;
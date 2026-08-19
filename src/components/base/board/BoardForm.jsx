import { useState } from "react";
import {
    HiX,
    HiPaperAirplane,
} from "react-icons/hi";

const BoardForm = ({
                       onClose,
                       onSubmit,
                   }) => {

    const [content, setContent] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!content.trim()) return;

        onSubmit(content.trim());

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
            ">

                <div>

                    <p className="
                        text-[9px]
                        uppercase
                        tracking-[0.25em]
                        text-header-accent
                    ">
                        Fikrini paylaş
                    </p>

                    <p className="
                        mt-1
                        text-xs
                        text-shadow-white/30
                    ">
                        Digər oxucularla düşüncələrini paylaş.
                    </p>

                </div>

                <button
                    type="button"
                    onClick={onClose}
                    className="
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        text-shadow-white/30
                        hover:text-white
                    "
                >
                    <HiX className="h-5 w-5" />
                </button>

            </div>

            <textarea
                value={content}
                onChange={(e) =>
                    setContent(e.target.value)
                }
                placeholder="Nə düşünürsən?"
                rows={6}
                className="
                    mt-6
                    w-full
                    resize-none
                    border
                    border-white/10
                    bg-transparent
                    px-4
                    py-4
                    text-sm
                    leading-7
                    text-white
                    outline-none
                    placeholder:text-shadow-white/20
                    focus:border-header-accent
                "
            />

            <div className="
                mt-4
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
                    <HiPaperAirplane className="h-3.5 w-3.5" />
                    Paylaş
                </button>

            </div>

        </form>
    );
};

export default BoardForm;
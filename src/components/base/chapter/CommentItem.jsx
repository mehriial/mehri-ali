import { useEffect, useState } from "react";
import { HiX } from "react-icons/hi";
import CommentItem from "./CommentItem.jsx";

const CommentDrawer = ({
                           isOpen,
                           onClose,
                           comments = [],
                           title = "Yorumlar",
                           placeholder = "Yorumunu yaz...",
                           onSubmit,
                       }) => {
    const [comment, setComment] = useState("");

    /*
     * Drawer açıkken body scroll'u kapat
     */

    useEffect(() => {
        if (!isOpen) return;

        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    /*
     * ESC ile kapatma
     */

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    const handleSubmit = (event) => {
        event.preventDefault();

        const value = comment.trim();

        if (!value) return;

        onSubmit?.(value);

        setComment("");
    };

    return (
        <>
            {/* OVERLAY */}

            <div
                className={`
                    fixed
                    inset-0
                    z-40
                    bg-black/60
                    backdrop-blur-[2px]
                    transition-opacity
                    duration-300
                    ${
                    isOpen
                        ? "pointer-events-auto opacity-100"
                        : "pointer-events-none opacity-0"
                }
                `}
                onClick={onClose}
            />

            {/* DRAWER */}

            <aside
                className={`
                    fixed
                    right-0
                    top-0
                    z-50
                    flex
                    h-full
                    w-full
                    max-w-[460px]
                    flex-col
                    border-l
                    border-white/10
                    bg-background
                    shadow-2xl
                    transition-transform
                    duration-300
                    ease-out
                    ${
                    isOpen
                        ? "translate-x-0"
                        : "translate-x-full"
                }
                `}
            >

                {/* HEADER */}

                <header className="
                    flex
                    shrink-0
                    items-center
                    justify-between
                    border-b
                    border-white/10
                    px-6
                    py-5
                ">

                    <div>

                        <p className="
                            text-[9px]
                            uppercase
                            tracking-[0.25em]
                            text-header-accent
                        ">
                            Yorumlar
                        </p>

                        <h2 className="
                            mt-2
                            font-heading
                            text-2xl
                        ">
                            {title}
                        </h2>

                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            border
                            border-white/10
                            text-shadow-white/40
                            transition-colors
                            hover:border-header-accent
                            hover:text-header-accent
                        "
                        aria-label="Yorumları kapat"
                    >
                        <HiX className="h-4 w-4" />
                    </button>

                </header>

                {/* COMMENTS */}

                <div className="
                    min-h-0
                    flex-1
                    overflow-y-auto
                    px-6
                ">

                    {comments.length > 0 ? (

                        comments.map((item) => (
                            <CommentItem
                                key={item.id}
                                comment={item}
                            />
                        ))

                    ) : (

                        <div className="
                            flex
                            min-h-[240px]
                            items-center
                            justify-center
                            text-center
                        ">

                            <div>

                                <p className="
                                    font-heading
                                    text-xl
                                ">
                                    Henüz yorum yok
                                </p>

                                <p className="
                                    mt-2
                                    text-xs
                                    text-shadow-white/30
                                ">
                                    İlk yorumu sen yap.
                                </p>

                            </div>

                        </div>

                    )}

                </div>

                {/* COMMENT FORM */}

                <div className="
                    shrink-0
                    border-t
                    border-white/10
                    p-6
                ">

                    <form onSubmit={handleSubmit}>

                        <textarea
                            value={comment}
                            onChange={(event) =>
                                setComment(event.target.value)
                            }
                            placeholder={placeholder}
                            rows={4}
                            className="
                                w-full
                                resize-none
                                border
                                border-white/10
                                bg-white/[0.02]
                                px-4
                                py-3
                                text-sm
                                leading-6
                                text-white
                                outline-none
                                placeholder:text-shadow-white/20
                                focus:border-header-accent
                            "
                        />

                        <button
                            type="submit"
                            disabled={!comment.trim()}
                            className="
                                mt-3
                                w-full
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
                                disabled:cursor-not-allowed
                                disabled:opacity-30
                            "
                        >
                            Yorum gönder
                        </button>

                    </form>

                </div>

            </aside>
        </>
    );
};

export default CommentDrawer;
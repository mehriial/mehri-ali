import { useState } from "react";
import { HiX, HiPaperAirplane } from "react-icons/hi";

const ChapterParagraph = ({
                              paragraph,
                              index,
                              chapter,
                          }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [comment, setComment] = useState("");

    const [comments, setComments] = useState([
        {
            id: 1,
            author: "Mehri",
            text: "Bu kısım gerçekten çok güzel.",
        },
        {
            id: 2,
            author: "Okur",
            text: "Burada ne olacağını hiç beklemiyordum.",
        },
    ]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!comment.trim()) return;

        setComments((prev) => [
            ...prev,
            {
                id: Date.now(),
                author: "Sen",
                text: comment.trim(),
            },
        ]);

        setComment("");
    };

    return (
        <>
            <div className="group relative">
                <p className="my-10 pr-10">
                    {paragraph}
                </p>

                <button
                    type="button"
                    onClick={() => setIsOpen(true)}
                    className="
        absolute
        right-0
        top-1
        flex
        items-center
        gap-1.5
        text-white
        opacity-100
        transition-all
        duration-300
        group-hover:opacity-100
    "
                    title="Yorumları göster"
                >
    <span className="text-sm text-white">
        💬
    </span>

                    {comments.length > 0 && (
                        <span className="text-[14px] text-white">
            {comments.length}
        </span>
                    )}
                </button>
            </div>

            {/* OVERLAY */}

            {isOpen && (
                <div
                    className="
                        fixed
                        inset-0
                        z-40
                        bg-black/50
                        backdrop-blur-[2px]
                    "
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* COMMENT SHEET */}

            <aside
                className={`
                    fixed
                    right-0
                    top-0
                    z-50
                    flex
                    h-screen
                    w-full
                    max-w-[420px]
                    flex-col
                    border-l
                    border-white/10
                    bg-background
                    shadow-2xl
                    transition-transform
                    duration-300
                    ${isOpen
                    ? "translate-x-0"
                    : "translate-x-full"
                }
                `}
            >
                {/* HEADER */}

                <div className="
                    flex
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
                            Paragraf {index + 1}
                        </p>

                        <p className="
                            mt-1
                            text-xs
                            text-shadow-white/40
                        ">
                            {comments.length} yorum
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            text-shadow-white/40
                            transition-colors
                            hover:text-white
                        "
                    >
                        <HiX className="h-5 w-5" />
                    </button>
                </div>

                {/* COMMENTS */}

                <div className="
                    flex-1
                    overflow-y-auto
                    px-6
                    py-6
                ">
                    {comments.length > 0 ? (
                        <div className="space-y-5">
                            {comments.map((item) => (
                                <div
                                    key={item.id}
                                    className="
                                        border-b
                                        border-white/10
                                        pb-5
                                    "
                                >
                                    <p className="
                                        text-xs
                                        font-medium
                                        text-header-accent
                                    ">
                                        {item.author}
                                    </p>

                                    <p className="
                                        mt-2
                                        text-sm
                                        leading-6
                                        text-shadow-white/70
                                    ">
                                        {item.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="
                            flex
                            h-full
                            items-center
                            justify-center
                            text-center
                        ">
                            <p className="
                                text-sm
                                text-shadow-white/30
                            ">
                                Henüz yorum yapılmamış.
                            </p>
                        </div>
                    )}
                </div>

                {/* WRITE COMMENT */}

                <form
                    onSubmit={handleSubmit}
                    className="
                        border-t
                        border-white/10
                        p-5
                    "
                >
                    <p className="
                        mb-3
                        text-[9px]
                        uppercase
                        tracking-[0.2em]
                        text-header-accent
                    ">
                        Yorum yaz
                    </p>

                    <textarea
                        value={comment}
                        onChange={(e) =>
                            setComment(e.target.value)
                        }
                        rows={4}
                        placeholder="Bu paragraf hakkında ne düşünüyorsun?"
                        className="
                            w-full
                            resize-none
                            border
                            border-white/10
                            bg-transparent
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
                        className="
                            mt-3
                            flex
                            w-full
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
                            transition-colors
                            hover:bg-header-accent
                            hover:text-white
                        "
                    >
                        <HiPaperAirplane className="h-3.5 w-3.5" />
                        Yorum gönder
                    </button>
                </form>
            </aside>
        </>
    );
};

export default ChapterParagraph;
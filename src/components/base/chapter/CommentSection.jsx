import { useState } from "react";
import {
    HiX,
    HiChatAlt2,
    HiPaperAirplane,
} from "react-icons/hi";

const CommentSection = () => {
    const [comment, setComment] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const [comments, setComments] = useState([
        {
            id: 1,
            author: "Mehri",
            text: "Bölümün sonu gerçekten çok güzel olmuş. Bir sonraki bölümde ne olacağını merak ediyorum.",
        },
        {
            id: 2,
            author: "Okur",
            text: "Bu bölümdeki olayların ileride önemli bir yere bağlanacağını düşünüyorum.",
        },
        {
            id: 3,
            author: "Lal",
            text: "Karakterin bu kararını hiç beklemiyordum.",
        },
        {
            id: 4,
            author: "Aylin",
            text: "Özellikle son sahne çok etkileyiciydi.",
        },
        {
            id: 5,
            author: "Okur 2",
            text: "Yeni bölümü sabırsızlıkla bekliyorum.",
        },
    ]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!comment.trim()) return;

        const newComment = {
            id: Date.now(),
            author: "Sen",
            text: comment.trim(),
        };

        setComments((prev) => [
            ...prev,
            newComment,
        ]);

        setComment("");
    };

    const visibleComments = comments.slice(0, 3);

    return (
        <>
            <section className="
                mx-auto
                max-w-[760px]
                border-t
                border-white/10
                px-6
                py-16
                lg:px-10
                lg:py-24
            ">

                {/* =========================================
                    HEADER
                ========================================= */}

                <div className="mb-8">

                    <p className="
                        text-[10px]
                        uppercase
                        tracking-[0.3em]
                        text-header-accent
                    ">
                        Okur yorumları
                    </p>

                    <div className="
                        mt-3
                        flex
                        items-center
                        justify-between
                        gap-5
                    ">

                        <h2 className="
                            font-heading
                            text-3xl
                        ">
                            Bu bölüm hakkında ne düşünüyorsun?
                        </h2>

                        <div className="
                            flex
                            shrink-0
                            items-center
                            gap-2
                            text-shadow-white/40
                        ">
                            <HiChatAlt2 className="h-4 w-4" />

                            <span className="text-xs">
                                {comments.length}
                            </span>
                        </div>

                    </div>

                    <p className="
                        mt-3
                        text-sm
                        leading-7
                        text-shadow-white/40
                    ">
                        Bölüm hakkındaki düşüncelerini,
                        teorilerini veya hislerini paylaş.
                    </p>

                </div>

                {/* =========================================
                    WRITE COMMENT
                ========================================= */}

                <form onSubmit={handleSubmit}>

                    <textarea
                        value={comment}
                        onChange={(e) =>
                            setComment(e.target.value)
                        }
                        placeholder="Yorumunu yaz..."
                        rows={6}
                        className="
                            w-full
                            resize-none
                            border
                            border-white/10
                            bg-white/[0.02]
                            px-5
                            py-4
                            text-sm
                            leading-7
                            text-white
                            outline-none
                            transition-colors
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
                                px-6
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
                            <HiPaperAirplane className="h-3.5 w-3.5" />

                            Yorum gönder
                        </button>
                    </div>

                </form>

                {/* =========================================
                    COMMENTS
                ========================================= */}

                {comments.length > 0 && (
                    <div className="mt-14">

                        <div className="
                            border-t
                            border-white/10
                        ">

                            {visibleComments.map((item) => (
                                <CommentItem
                                    key={item.id}
                                    comment={item}
                                />
                            ))}

                        </div>

                        {/* SHOW ALL */}

                        {comments.length > 3 && (
                            <button
                                type="button"
                                onClick={() => setIsOpen(true)}
                                className="
                                    mt-6
                                    w-full
                                    border
                                    border-white/10
                                    px-5
                                    py-4
                                    text-[9px]
                                    uppercase
                                    tracking-[0.2em]
                                    text-shadow-white/50
                                    transition-all
                                    duration-300
                                    hover:border-header-accent
                                    hover:text-header-accent
                                "
                            >
                                Tüm yorumları göster
                                {" "}
                                ({comments.length})
                            </button>
                        )}

                    </div>
                )}

            </section>

            {/* =============================================
                OVERLAY
            ============================================= */}

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

            {/* =============================================
                DRAWER
            ============================================= */}

            <aside
                className={`
                    fixed
                    right-0
                    top-0
                    z-50
                    flex
                    h-screen
                    w-full
                    max-w-[460px]
                    flex-col
                    border-l
                    border-white/10
                    bg-background
                    shadow-2xl
                    transition-transform
                    duration-300
                    ${
                    isOpen
                        ? "translate-x-0"
                        : "translate-x-full"
                }
                `}
            >

                {/* DRAWER HEADER */}

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
                            Okur yorumları
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

                {/* ALL COMMENTS */}

                <div className="
                    flex-1
                    overflow-y-auto
                    px-6
                    py-6
                ">

                    {comments.map((item) => (
                        <CommentItem
                            key={item.id}
                            comment={item}
                        />
                    ))}

                </div>

                {/* DRAWER COMMENT FORM */}

                <form
                    onSubmit={handleSubmit}
                    className="
                        border-t
                        border-white/10
                        bg-background
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
                        placeholder="Yorumunu yaz..."
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


/* =========================================================
   COMMENT ITEM
========================================================= */

const CommentItem = ({ comment }) => {
    return (
        <div className="
            border-b
            border-white/10
            py-6
        ">

            <div className="
                flex
                items-center
                gap-3
            ">

                <div className="
                    flex
                    h-8
                    w-8
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-white/10
                    text-[10px]
                    uppercase
                    text-header-accent
                ">
                    {comment.author
                        .charAt(0)
                        .toUpperCase()}
                </div>

                <p className="
                    text-xs
                    font-medium
                    text-shadow-white/80
                ">
                    {comment.author}
                </p>

            </div>

            <p className="
                mt-3
                text-sm
                leading-7
                text-shadow-white/65
            ">
                {comment.text}
            </p>

        </div>
    );
};

export default CommentSection;
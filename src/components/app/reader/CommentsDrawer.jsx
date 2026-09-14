import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    MessageCircle,
    Send,
    X,
} from "lucide-react";

import ParagraphComment from "./ParagraphComment.jsx";

function CommentsDrawer({
                            open,
                            onClose,
                            book,
                            chapter,
                            selectedParagraph,
                        }) {
    const storageKey = `comments:${book.slug}:${chapter.number}`;

    const [comments, setComments] = useState([]);
    const [text, setText] = useState("");
    const [replyingTo, setReplyingTo] = useState(null);

    /*
     * Yorumları localStorage'dan oku
     */
    useEffect(() => {
        if (!open) {
            return;
        }

        try {
            const stored =
                localStorage.getItem(storageKey);

            setComments(
                stored
                    ? JSON.parse(stored)
                    : []
            );
        } catch {
            setComments([]);
        }
    }, [open, storageKey]);

    /*
     * Yorumları kaydet
     */
    useEffect(() => {
        if (!open) {
            return;
        }

        localStorage.setItem(
            storageKey,
            JSON.stringify(comments)
        );
    }, [
        comments,
        open,
        storageKey,
    ]);

    /*
     * Paragrafa göre yorumları filtrele
     */
    const paragraphComments = useMemo(() => {
        /*
         * null = bölümün genel yorumları
         */
        if (selectedParagraph === null) {
            return comments.filter(
                (comment) =>
                    comment.paragraphIndex === null
            );
        }

        /*
         * number = belirli paragraf
         */
        return comments.filter(
            (comment) =>
                comment.paragraphIndex ===
                selectedParagraph
        );
    }, [
        comments,
        selectedParagraph,
    ]);

    /*
     * Yeni yorum / cevap
     */
    const handleSubmit = () => {
        const value = text.trim();

        if (!value) {
            return;
        }

        const currentUser = "Mehri";

        /*
         * Cevap
         */
        if (replyingTo) {
            setComments((current) =>
                current.map((comment) => {
                    if (
                        comment.id !==
                        replyingTo.id
                    ) {
                        return comment;
                    }

                    return {
                        ...comment,
                        replies: [
                            ...(comment.replies ??
                                []),
                            {
                                id: Date.now(),
                                username:
                                currentUser,
                                text: value,
                                date: "Şimdi",
                                isMine: true,
                            },
                        ],
                    };
                })
            );
        }

        /*
         * Yeni yorum
         */
        else {
            setComments((current) => [
                ...current,
                {
                    id: Date.now(),
                    username: currentUser,
                    text: value,
                    date: "Şimdi",

                    /*
                     * null ise genel yorum
                     * number ise paragraf yorumu
                     */
                    paragraphIndex:
                    selectedParagraph,

                    isMine: true,
                    replies: [],
                },
            ]);
        }

        setText("");
        setReplyingTo(null);
    };

    /*
     * Yorum sil
     */
    const handleDelete = (id) => {
        setComments((current) =>
            current.filter(
                (comment) =>
                    comment.id !== id
            )
        );
    };

    /*
     * Drawer kapalı
     */
    if (!open) {
        return null;
    }

    const isParagraphComment =
        selectedParagraph !== null;

    return (
        <>
            {/* Overlay */}
            <div
                className="
                    fixed
                    inset-0
                    z-40
                    bg-black/60
                    backdrop-blur-sm
                "
                onClick={onClose}
            />

            {/* Drawer */}
            <aside
                className="
                    fixed
                    right-0
                    top-0
                    z-50
                    flex
                    h-full
                    w-full
                    max-w-md
                    flex-col
                    border-l
                    border-white/[0.08]
                    bg-black
                    text-white
                    shadow-2xl
                "
            >
                {/* Header */}
                <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/[0.08] px-5">
                    <div className="min-w-0">
                        <div className="flex items-center gap-2">
                            <MessageCircle className="h-3.5 w-3.5 text-white/30" />

                            <span className="text-[9px] uppercase tracking-[0.3em] text-white/30">
                                {isParagraphComment
                                    ? `Paragraf ${
                                        selectedParagraph +
                                        1
                                    }`
                                    : "Bölüm"}
                            </span>
                        </div>

                        <h2 className="mt-1 font-serif text-xl text-white">
                            Yorumlar
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            text-white/40
                            transition-colors
                            hover:bg-white/5
                            hover:text-white
                        "
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {/* Comments */}
                <div className="flex-1 overflow-y-auto px-5">
                    {paragraphComments.length > 0 ? (
                        paragraphComments.map(
                            (comment) => (
                                <ParagraphComment
                                    key={comment.id}
                                    comment={comment}
                                    onDelete={
                                        handleDelete
                                    }
                                    onReply={
                                        setReplyingTo
                                    }
                                />
                            )
                        )
                    ) : (
                        <div className="flex min-h-[260px] flex-col items-center justify-center text-center">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03]">
                                <MessageCircle className="h-4 w-4 text-white/25" />
                            </div>

                            <span className="mt-5 text-[9px] uppercase tracking-[0.3em] text-white/25">
                                Henüz yorum yok
                            </span>

                            <p className="mt-3 max-w-[240px] font-serif text-xl text-white/50">
                                İlk yorumu sen bırak.
                            </p>
                        </div>
                    )}
                </div>

                {/* Composer */}
                <div className="shrink-0 border-t border-white/[0.08] p-4">
                    {/* Replying */}
                    {replyingTo && (
                        <div className="mb-3 flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2.5">
                            <div className="flex min-w-0 items-center gap-2">
                                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-[8px] text-white/60">
                                    {replyingTo.username
                                        ?.charAt(0)
                                        ?.toUpperCase()}
                                </div>

                                <span className="truncate text-[10px] text-white/45">
                                    {replyingTo.username}{" "}
                                    kullanıcısına yanıt
                                    veriyorsun.
                                </span>
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    setReplyingTo(null)
                                }
                                className="
                                    ml-3
                                    shrink-0
                                    text-[10px]
                                    text-white/30
                                    transition-colors
                                    hover:text-white
                                "
                            >
                                Vazgeç
                            </button>
                        </div>
                    )}

                    {/* Input */}
                    <div className="flex items-end gap-2 rounded-xl border border-white/[0.08] bg-white/[0.02] p-2">
                        <textarea
                            value={text}
                            onChange={(event) =>
                                setText(
                                    event.target.value
                                )
                            }
                            onKeyDown={(event) => {
                                if (
                                    event.key ===
                                    "Enter" &&
                                    !event.shiftKey
                                ) {
                                    event.preventDefault();
                                    handleSubmit();
                                }
                            }}
                            rows={2}
                            placeholder={
                                replyingTo
                                    ? "Yanıtını yaz..."
                                    : "Yorumunu yaz..."
                            }
                            className="
                                min-h-[50px]
                                flex-1
                                resize-none
                                border-0
                                bg-transparent
                                px-2
                                py-1
                                text-xs
                                text-white
                                outline-none
                                placeholder:text-white/25
                            "
                        />

                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={!text.trim()}
                            className="
                                flex
                                h-9
                                w-9
                                shrink-0
                                items-center
                                justify-center
                                rounded-lg
                                transition-all
                                disabled:cursor-not-allowed
                                disabled:opacity-20
                            "
                            style={{
                                backgroundColor:
                                    "var(--book-accent)",
                                color: "#ffffff",
                            }}
                        >
                            <Send className="h-3.5 w-3.5" />
                        </button>
                    </div>

                </div>
            </aside>
        </>
    );
}

export default CommentsDrawer;
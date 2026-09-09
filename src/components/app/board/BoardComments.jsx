import { useState } from "react";
import {
    MessageCircle,
    Send,
    Trash2,
} from "lucide-react";

function Avatar({ username, small = false }) {
    return (
        <div
            className={`
                flex
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-white/[0.08]
                bg-white/[0.05]
                font-medium
                text-white/60
                ${small ? "h-6 w-6 text-[8px]" : "h-8 w-8 text-[9px]"}
            `}
        >
            {username?.charAt(0)?.toUpperCase()}
        </div>
    );
}

function BoardComments({
                           post,
                           onAddComment,
                           onDeleteComment,
                           onAddReply,
                       }) {
    const [text, setText] = useState("");
    const [replyingTo, setReplyingTo] = useState(null);

    const comments = post.comments ?? [];

    const handleSubmit = (event) => {
        event.preventDefault();

        const value = text.trim();

        if (!value) {
            return;
        }

        const currentUser = "Mehri";

        if (replyingTo) {
            onAddReply(post.id, replyingTo.id, {
                id: Date.now(),
                username: currentUser,
                text: value,
                createdAt: "Şimdi",
                isMine: true,
            });
        } else {
            onAddComment(post.id, {
                id: Date.now(),
                username: currentUser,
                text: value,
                createdAt: "Şimdi",
                isMine: true,
                replies: [],
            });
        }

        setText("");
        setReplyingTo(null);
    };

    return (
        <div className="mt-6 border-t border-white/[0.06] pt-5">
            {comments.length > 0 && (
                <div className="space-y-1">
                    {comments.map((comment) => (
                        <div
                            key={comment.id}
                            className="border-b border-white/[0.05] py-4 last:border-0"
                        >
                            <div className="flex gap-2.5">
                                <Avatar username={comment.username} />

                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center justify-between gap-3">
                                        <span className="text-[10px] font-medium text-white/80">
                                            {comment.username}
                                        </span>

                                        <span className="text-[8px] text-white/20">
                                            {comment.createdAt}
                                        </span>
                                    </div>

                                    <p className="mt-1.5 whitespace-pre-wrap text-[11px] leading-5 text-white/50">
                                        {comment.text}
                                    </p>

                                    <div className="mt-2.5 flex items-center gap-4">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setReplyingTo(comment)
                                            }
                                            className="flex items-center gap-1.5 text-[9px] text-white/25 transition-colors hover:text-white"
                                        >
                                            <MessageCircle className="h-3 w-3" />
                                            Yanıtla
                                        </button>

                                        {comment.isMine && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    onDeleteComment(
                                                        post.id,
                                                        comment.id
                                                    )
                                                }
                                                className="flex items-center gap-1.5 text-[9px] text-white/25 transition-colors hover:text-red-400"
                                            >
                                                <Trash2 className="h-3 w-3" />
                                                Sil
                                            </button>
                                        )}
                                    </div>

                                    {comment.replies?.length > 0 && (
                                        <div className="mt-4 ml-2 border-l border-white/[0.07] pl-3">
                                            {comment.replies.map((reply) => (
                                                <div
                                                    key={reply.id}
                                                    className="flex gap-2.5 py-2"
                                                >
                                                    <Avatar
                                                        username={reply.username}
                                                        small
                                                    />

                                                    <div className="min-w-0 flex-1">
                                                        <div className="flex items-center justify-between gap-2">
                                                            <span className="text-[9px] font-medium text-white/65">
                                                                {reply.username}
                                                            </span>

                                                            <span className="text-[8px] text-white/20">
                                                                {reply.createdAt}
                                                            </span>
                                                        </div>

                                                        <p className="mt-1 text-[10px] leading-5 text-white/40">
                                                            {reply.text}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {replyingTo && (
                <div className="mb-3 flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.025] px-3 py-2">
                    <div className="flex min-w-0 items-center gap-2">
                        <Avatar
                            username={replyingTo.username}
                            small
                        />

                        <span className="truncate text-[9px] text-white/35">
                            {replyingTo.username} kullanıcısına yanıt
                            veriyorsun.
                        </span>
                    </div>

                    <button
                        type="button"
                        onClick={() => setReplyingTo(null)}
                        className="ml-3 shrink-0 text-[9px] text-white/25 hover:text-white"
                    >
                        Vazgeç
                    </button>
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="flex items-end gap-2"
            >
                <div className="flex flex-1 items-end rounded-lg border border-white/[0.07] bg-white/[0.02] px-3 py-2">
                    <textarea
                        value={text}
                        onChange={(event) =>
                            setText(event.target.value)
                        }
                        onKeyDown={(event) => {
                            if (
                                event.key === "Enter" &&
                                !event.shiftKey
                            ) {
                                event.preventDefault();
                                handleSubmit(event);
                            }
                        }}
                        rows={1}
                        placeholder={
                            replyingTo
                                ? "Yanıtını yaz..."
                                : "Yorumunu yaz..."
                        }
                        className="
                            max-h-32
                            min-h-7
                            flex-1
                            resize-none
                            border-0
                            bg-transparent
                            text-[10px]
                            leading-5
                            text-white
                            outline-none
                            placeholder:text-white/20
                        "
                    />
                </div>

                <button
                    type="submit"
                    disabled={!text.trim()}
                    aria-label="Gönder"
                    className="
                        flex
                        h-9
                        w-9
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        bg-white/[0.07]
                        text-white/40
                        transition-all
                        hover:bg-white/[0.1]
                        hover:text-white
                        disabled:cursor-not-allowed
                        disabled:opacity-20
                    "
                >
                    <Send className="h-3 w-3" />
                </button>
            </form>
        </div>
    );
}

export default BoardComments;
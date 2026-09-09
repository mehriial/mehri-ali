import {
    MessageCircle,
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
                text-white/70
                ${
                small
                    ? "h-6 w-6 text-[8px]"
                    : "h-8 w-8 text-[10px]"
            }
            `}
        >
            {username?.charAt(0)?.toUpperCase()}
        </div>
    );
}

function ParagraphComment({
                              comment,
                              onDelete,
                              onReply,
                          }) {
    return (
        <article className="border-b border-white/[0.08] py-5 last:border-0">
            {/* Main Comment */}
            <div className="flex gap-3">
                <Avatar username={comment.username} />

                <div className="min-w-0 flex-1">
                    {/* Header */}
                    <div className="flex items-center justify-between gap-3">
                        <span className="text-xs font-medium text-white">
                            {comment.username}
                        </span>

                        <span className="shrink-0 text-[9px] text-white/30">
                            {comment.date}
                        </span>
                    </div>

                    {/* Text */}
                    <p className="mt-2 whitespace-pre-wrap text-xs leading-5 text-white/60">
                        {comment.text}
                    </p>

                    {/* Actions */}
                    <div className="mt-3 flex items-center gap-4">
                        <button
                            type="button"
                            onClick={() =>
                                onReply(comment)
                            }
                            className="
                                flex
                                items-center
                                gap-1.5
                                text-[10px]
                                text-white/35
                                transition-colors
                                hover:text-white
                            "
                        >
                            <MessageCircle className="h-3 w-3" />

                            Yanıtla
                        </button>

                        {comment.isMine && (
                            <button
                                type="button"
                                onClick={() =>
                                    onDelete(comment.id)
                                }
                                className="
                                    flex
                                    items-center
                                    gap-1.5
                                    text-[10px]
                                    text-white/30
                                    transition-colors
                                    hover:text-red-400
                                "
                            >
                                <Trash2 className="h-3 w-3" />

                                Sil
                            </button>
                        )}
                    </div>

                    {/* Replies */}
                    {comment.replies?.length > 0 && (
                        <div className="mt-4 ml-3 border-l border-white/[0.08] pl-4">
                            {comment.replies.map(
                                (reply) => (
                                    <div
                                        key={reply.id}
                                        className="flex gap-2.5 py-2.5"
                                    >
                                        {/* Reply Avatar */}
                                        <Avatar
                                            username={
                                                reply.username
                                            }
                                            small
                                        />

                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center justify-between gap-2">
                                                <span className="text-[10px] font-medium text-white/80">
                                                    {
                                                        reply.username
                                                    }
                                                </span>

                                                {reply.date && (
                                                    <span className="text-[8px] text-white/25">
                                                        {
                                                            reply.date
                                                        }
                                                    </span>
                                                )}
                                            </div>

                                            <p className="mt-1 whitespace-pre-wrap text-[11px] leading-5 text-white/50">
                                                {reply.text}
                                            </p>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    )}
                </div>
            </div>
        </article>
    );
}

export default ParagraphComment;
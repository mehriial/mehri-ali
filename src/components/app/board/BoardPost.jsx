import {
    ImageIcon,
    MessageCircle,
    MoreHorizontal,
    Trash2,
} from "lucide-react";
import { useState } from "react";

import BoardComments from "./BoardComments";

function Avatar({ username }) {
    return (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.05] text-[10px] font-medium text-white/65">
            {username?.charAt(0)?.toUpperCase()}
        </div>
    );
}

function BoardPost({
                       post,
                       onDelete,
                       onAddComment,
                       onDeleteComment,
                       onAddReply,
                   }) {
    const [commentsOpen, setCommentsOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const comments = post.comments ?? [];

    const commentCount = comments.reduce(
        (total, comment) =>
            total + 1 + (comment.replies?.length ?? 0),
        0
    );

    return (
        <article className="py-8 first:pt-0 last:pb-0">
            <div className="flex gap-3.5">
                <Avatar username={post.username} />

                <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                                <span className="text-xs font-medium text-white">
                                    {post.username}
                                </span>

                                <span className="text-[9px] text-white/20">
                                    ·
                                </span>

                                <span className="text-[9px] text-white/25">
                                    {post.createdAt}
                                </span>
                            </div>

                            {post.status === "pending" && (
                                <div className="mt-2">
                                    <span className="inline-flex rounded-full border border-amber-400/10 bg-amber-400/5 px-2 py-1 text-[8px] uppercase tracking-[0.15em] text-amber-300/60">
                                        Onay bekliyor
                                    </span>
                                </div>
                            )}
                        </div>

                        {post.isMine && (
                            <div className="relative shrink-0">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setMenuOpen((value) => !value)
                                    }
                                    aria-label="Gönderi seçenekleri"
                                    className="flex h-8 w-8 items-center justify-center rounded-full text-white/25 transition-colors hover:bg-white/[0.04] hover:text-white"
                                >
                                    <MoreHorizontal className="h-4 w-4" />
                                </button>

                                {menuOpen && (
                                    <div className="absolute right-0 top-9 z-20 w-32 overflow-hidden rounded-lg border border-white/[0.08] bg-black shadow-2xl">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                onDelete(post.id);
                                                setMenuOpen(false);
                                            }}
                                            className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-[10px] text-white/40 transition-colors hover:bg-white/[0.04] hover:text-red-400"
                                        >
                                            <Trash2 className="h-3 w-3" />
                                            Gönderiyi sil
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {post.text && (
                        <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-white/60">
                            {post.text}
                        </p>
                    )}

                    {post.image && (
                        <div className="mt-5 overflow-hidden rounded-xl border border-white/[0.08]">
                            <img
                                src={post.image}
                                alt={`${post.username} gönderisi`}
                                className="max-h-[600px] w-full object-cover"
                            />
                        </div>
                    )}

                    <div className="mt-5 flex items-center gap-4">
                        <button
                            type="button"
                            onClick={() =>
                                setCommentsOpen((value) => !value)
                            }
                            className="flex items-center gap-2 text-[10px] text-white/30 transition-colors hover:text-white"
                        >
                            <MessageCircle className="h-3.5 w-3.5" />
                            {commentCount > 0
                                ? `${commentCount} yorum`
                                : "Yorum yap"}
                        </button>

                        {post.image && (
                            <span className="flex items-center gap-1.5 text-[9px] text-white/20">
                                <ImageIcon className="h-3 w-3" />
                                Fotoğraf
                            </span>
                        )}
                    </div>

                    {commentsOpen && (
                        <BoardComments
                            post={post}
                            onAddComment={onAddComment}
                            onDeleteComment={onDeleteComment}
                            onAddReply={onAddReply}
                        />
                    )}
                </div>
            </div>
        </article>
    );
}

export default BoardPost;
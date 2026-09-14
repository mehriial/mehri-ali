import {
    Check,
    Eye,
    Image as ImageIcon,
    MessageCircle,
    Trash2,
    X,
} from "lucide-react";

import { Button } from "@/components/ui/button.jsx";

function BoardPostCard({
                           post,
                           onPreview,
                           onApprove,
                           onReject,
                           onDelete,
                       }) {
    const isPending = post.status === "pending";
    const isApproved = post.status === "approved";
    const isRejected = post.status === "rejected";

    return (
        <div className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]">
            {post.image && (
                <div className="relative aspect-[4/3] overflow-hidden bg-black">
                    <img
                        src={post.image}
                        alt="Pano gönderisi"
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    />

                    <div className="absolute left-3 top-3">
                        {isPending && (
                            <span className="rounded-full bg-amber-500/15 px-2.5 py-1 text-[10px] font-medium text-amber-400 backdrop-blur-md">
                                Bekliyor
                            </span>
                        )}

                        {isApproved && (
                            <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-medium text-emerald-400 backdrop-blur-md">
                                Onaylandı
                            </span>
                        )}

                        {isRejected && (
                            <span className="rounded-full bg-red-500/15 px-2.5 py-1 text-[10px] font-medium text-red-400 backdrop-blur-md">
                                Reddedildi
                            </span>
                        )}
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={onPreview}
                            className="h-9 w-9 cursor-pointer rounded-lg bg-white/[0.08] text-white hover:bg-white/[0.15]"
                            title="Görüntüle"
                        >
                            <Eye className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}

            <div className="p-4">
                <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                        <p className="text-sm font-medium text-white">
                            {post.username}
                        </p>

                        <p className="mt-1 text-xs text-white/25">
                            {post.createdAt}
                        </p>
                    </div>

                    {post.image && (
                        <ImageIcon className="h-4 w-4 shrink-0 text-white/20" />
                    )}
                </div>

                {post.text && (
                    <p className="mt-4 line-clamp-4 whitespace-pre-wrap text-sm leading-6 text-white/50">
                        {post.text}
                    </p>
                )}

                <div className="mt-4 flex items-center gap-4 text-[11px] text-white/25">
                    <span className="flex items-center gap-1.5">
                        <MessageCircle className="h-3.5 w-3.5" />
                        {post.comments?.length || 0} yorum
                    </span>
                </div>

                <div className="mt-4 flex items-center gap-2 border-t border-white/[0.06] pt-3">
                    {isPending && (
                        <>
                            <Button
                                type="button"
                                onClick={onApprove}
                                className="h-8 flex-1 cursor-pointer gap-1.5 rounded-lg bg-emerald-500/10 px-3 text-xs text-emerald-400 hover:bg-emerald-500/20"
                            >
                                <Check className="h-3.5 w-3.5" />
                                Onayla
                            </Button>

                            <Button
                                type="button"
                                onClick={onReject}
                                className="h-8 flex-1 cursor-pointer gap-1.5 rounded-lg bg-red-500/10 px-3 text-xs text-red-400 hover:bg-red-500/20"
                            >
                                <X className="h-3.5 w-3.5" />
                                Reddet
                            </Button>
                        </>
                    )}

                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={onDelete}
                        className="h-8 w-8 shrink-0 cursor-pointer rounded-lg text-white/25 hover:bg-red-500/10 hover:text-red-400"
                        title="Sil"
                    >
                        <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default BoardPostCard;
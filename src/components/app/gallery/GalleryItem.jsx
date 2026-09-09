import { useState } from "react";
import {
    Edit3,
    Trash2,
    X,
} from "lucide-react";

function GalleryItem({
                         item,
                         index,
                         onDelete,
                     }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="
                    group
                    relative
                    mb-3
                    block
                    w-full
                    break-inside-avoid
                    overflow-hidden
                    rounded-xl
                    border
                    border-white/[0.07]
                    text-left
                    sm:mb-5
                    lg:mb-6
                "
            >
                <img
                    src={item.image}
                    alt={
                        item.title ||
                        "Galeri görseli"
                    }
                    className="
                        block
                        h-auto
                        w-full
                        object-cover
                        transition-transform
                        duration-700
                        group-hover:scale-105
                    "
                />

                <div
                    className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/70
                        via-transparent
                        to-transparent
                        opacity-0
                        transition-opacity
                        duration-300
                        group-hover:opacity-100
                    "
                />

                <div
                    className="
                        absolute
                        inset-x-0
                        bottom-0
                        p-4
                        opacity-0
                        transition-opacity
                        duration-300
                        group-hover:opacity-100
                    "
                >
                    <div className="flex items-end justify-between gap-3">
                        <div className="min-w-0">
                            {item.type === "edit" && (
                                <div className="mb-1.5 flex items-center gap-1.5">
                                    <Edit3 className="h-2.5 w-2.5 text-white/60" />

                                    <span className="text-[8px] uppercase tracking-[0.2em] text-white/45">
                                        Edit
                                    </span>
                                </div>
                            )}

                            {item.title && (
                                <p className="truncate text-[10px] text-white/80">
                                    {item.title}
                                </p>
                            )}

                            <p className="mt-1 text-[8px] text-white/35">
                                {item.username}
                            </p>
                        </div>

                        <span className="shrink-0 text-[8px] tabular-nums tracking-[0.15em] text-white/30">
                            {String(index + 1).padStart(2, "0")}
                        </span>
                    </div>
                </div>
            </button>

            {open && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-5 backdrop-blur-xl"
                    onClick={() => setOpen(false)}
                >
                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        aria-label="Kapat"
                        className="
                            absolute
                            right-5
                            top-5
                            z-10
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-white/10
                            bg-black/50
                            text-white/50
                            transition-colors
                            hover:text-white
                        "
                    >
                        <X className="h-4 w-4" />
                    </button>

                    <div
                        className="relative max-h-[92vh] max-w-[92vw]"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >
                        <img
                            src={item.image}
                            alt={
                                item.title ||
                                "Galeri görseli"
                            }
                            className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
                        />

                        <div className="mt-4 flex items-center justify-between gap-4">
                            <div>
                                {item.title && (
                                    <p className="text-xs text-white/70">
                                        {item.title}
                                    </p>
                                )}

                                <p className="mt-1 text-[9px] text-white/30">
                                    {item.username}
                                </p>
                            </div>

                            {item.isMine && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        onDelete(item.id);
                                        setOpen(false);
                                    }}
                                    className="
                                        flex
                                        items-center
                                        gap-2
                                        rounded-lg
                                        border
                                        border-white/[0.08]
                                        px-3
                                        py-2
                                        text-[9px]
                                        text-white/35
                                        transition-colors
                                        hover:border-red-400/20
                                        hover:text-red-400
                                    "
                                >
                                    <Trash2 className="h-3 w-3" />
                                    Sil
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default GalleryItem;
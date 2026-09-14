import {
    Eye,
    Pencil,
    Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button.jsx";

function GalleryGrid({
                         items = [],
                         onPreview,
                         onEdit,
                         onDelete,
                     }) {
    if (items.length === 0) {
        return (
            <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.02]">
                <p className="text-sm text-white/30">
                    Gösterilecek görsel bulunamadı.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item) => (
                <GalleryCard
                    key={item.id}
                    item={item}
                    onPreview={() =>
                        onPreview(item)
                    }
                    onEdit={() =>
                        onEdit(item)
                    }
                    onDelete={() =>
                        onDelete(item)
                    }
                />
            ))}
        </div>
    );
}

function GalleryCard({
                         item,
                         onPreview,
                         onEdit,
                         onDelete,
                     }) {
    return (
        <div className="group overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]">
            <div className="relative aspect-[4/3] overflow-hidden bg-black">
                <img
                    src={item.image}
                    alt={
                        item.title ||
                        item.bookTitle
                    }
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                />

                <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
                    <div className="flex items-center gap-1">
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={
                                onPreview
                            }
                            className="h-9 w-9 cursor-pointer rounded-lg bg-white/[0.08] text-white hover:bg-white/[0.15]"
                            title="Görüntüle"
                        >
                            <Eye className="h-4 w-4" />
                        </Button>

                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={onEdit}
                            className="h-9 w-9 cursor-pointer rounded-lg bg-white/[0.08] text-white hover:bg-white/[0.15]"
                            title="Düzenle"
                        >
                            <Pencil className="h-4 w-4" />
                        </Button>

                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={onDelete}
                            className="h-9 w-9 cursor-pointer rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300"
                            title="Sil"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>

            <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-white">
                            {item.title ||
                                "Adsız görsel"}
                        </p>

                        <p className="mt-1 truncate text-xs text-white/30">
                            {item.bookTitle}
                        </p>
                    </div>

                    <span className="shrink-0 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] text-emerald-400">
                        Yayında
                    </span>
                </div>
            </div>
        </div>
    );
}

export default GalleryGrid;
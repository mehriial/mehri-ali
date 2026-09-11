import { Image as ImageIcon } from "lucide-react";

import GalleryCard from "./GalleryCard.jsx";

function GalleryGrid({
                         items,
                         onEdit,
                         onDelete,
                     }) {
    if (items.length === 0) {
        return (
            <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-white/[0.07] bg-[#0d0d0d] px-6 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.04]">
                    <ImageIcon className="h-6 w-6 text-white/25" />
                </div>

                <h3 className="mt-4 text-sm font-medium text-white">
                    Görsel bulunamadı
                </h3>

                <p className="mt-1 max-w-sm text-xs leading-5 text-white/35">
                    Arama veya filtre kriterlerinize uygun bir
                    galeri görseli bulunamadı.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {items.map((item) => (
                <GalleryCard
                    key={item.id}
                    item={item}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}

export default GalleryGrid;
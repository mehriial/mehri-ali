import { ImageIcon } from "lucide-react";

function GalleryEmpty({ type }) {
    const isEdit = type === "edits";

    return (
        <div className="flex min-h-[320px] flex-col items-center justify-center border-t border-white/[0.06] text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03]">
                <ImageIcon className="h-4 w-4 text-white/20" />
            </div>

            <span className="mt-5 text-[9px] uppercase tracking-[0.3em] text-white/25">
                {isEdit ? "Editler" : "Fotoğraflar"}
            </span>

            <p className="mt-4 font-serif text-2xl text-white/50">
                {isEdit
                    ? "Henüz onaylanmış edit yok."
                    : "Henüz galeriye görsel eklenmedi."}
            </p>

            {isEdit && (
                <p className="mt-3 max-w-sm text-[10px] leading-5 text-white/25">
                    Hazırladığın bir editi paylaşabilirsin.
                    Yayınlanmadan önce kontrol edilecektir.
                </p>
            )}
        </div>
    );
}

export default GalleryEmpty;
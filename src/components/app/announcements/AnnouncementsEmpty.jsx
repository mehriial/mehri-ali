import { BellOff } from "lucide-react";


function AnnouncementsEmpty() {
    return (
        <div className="mt-10 flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.08] bg-white/[0.015] px-6 text-center">
            <BellOff className="h-5 w-5 text-white/20" />

            <h2 className="mt-4 text-sm text-white/50">
                Henüz duyuru yok
            </h2>

            <p className="mt-2 max-w-sm text-[11px] leading-5 text-white/25">
                Yeni duyurular yayınlandığında burada
                görünecek.
            </p>
        </div>
    );
}


export default AnnouncementsEmpty;
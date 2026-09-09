import { MessageCircle } from "lucide-react";

function BoardEmpty() {
    return (
        <div className="flex min-h-[300px] flex-col items-center justify-center border-t border-white/[0.06] text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03]">
                <MessageCircle className="h-4 w-4 text-white/20" />
            </div>

            <span className="mt-5 text-[9px] uppercase tracking-[0.3em] text-white/25">
                Henüz paylaşım yok
            </span>

            <p className="mt-4 font-serif text-2xl text-white/50">
                İlk paylaşımı sen yap.
            </p>
        </div>
    );
}

export default BoardEmpty;
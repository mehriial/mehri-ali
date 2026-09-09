function BoardHeader() {
    return (
        <header className="border-b border-white/[0.07] pb-10">
            <div className="flex items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-3">
                        <span className="h-px w-8 bg-white/25" />

                        <span className="text-[9px] font-medium uppercase tracking-[0.35em] text-white/35">
                            Topluluk
                        </span>
                    </div>

                    <h1 className="mt-6 font-serif text-5xl tracking-tight text-white sm:text-6xl lg:text-7xl">
                        Pano
                    </h1>

                    <p className="mt-5 max-w-lg text-sm leading-7 text-white/35">
                        Düşüncelerini, yazma sürecini ve hikâyelerinle ilgili
                        küçük anları paylaş.
                    </p>
                </div>
            </div>
        </header>
    );
}

export default BoardHeader;
function GalleryHeader() {
    return (
        <header className="border-b border-white/[0.07] pb-10">
            <div className="flex items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-3">
                        <span className="h-px w-8 bg-white/25" />

                        <span className="text-[9px] font-medium uppercase tracking-[0.35em] text-white/35">
                            Görsel Arşivi
                        </span>
                    </div>

                    <h1 className="mt-6 font-serif text-5xl tracking-tight text-white sm:text-6xl lg:text-7xl">
                        Galeri
                    </h1>

                    <p className="mt-5 max-w-xl text-sm leading-7 text-white/35">
                        Hikâyelerin dünyasından kareler, karakterler ve
                        okuyucuların hazırladığı editler.
                    </p>
                </div>
            </div>
        </header>
    );
}

export default GalleryHeader;
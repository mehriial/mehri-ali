const PageLoader = () => {
    return (
        <div
            className="relative flex min-h-svh items-center justify-center overflow-hidden bg-background px-6 text-shadow-white"
            role="status"
            aria-live="polite"
            aria-label="Sayfa yükleniyor"
        >
            <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-header-accent/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-[#7d4637]/15 blur-3xl" />

            <div className="relative w-full max-w-sm text-center">
                <div className="mx-auto flex h-20 w-16 items-center justify-center border border-header-accent/50 bg-white/[0.03] shadow-[10px_10px_0_rgba(217,165,106,0.12)]">
                    <span className="font-heading text-3xl italic text-header-accent">M</span>
                </div>

                <p className="mt-10 text-[10px] font-medium uppercase tracking-[0.38em] text-header-accent">
                    Mehri Ali
                </p>
                <h1 className="mt-4 font-heading text-3xl">Sayfa hazırlanıyor</h1>
                <p className="mx-auto mt-3 max-w-64 text-sm leading-6 text-shadow-white/45">
                    Hikâyenin bir sonraki sayfası açılıyor.
                </p>

                <div className="mx-auto mt-9 h-px w-full overflow-hidden bg-white/10">
                    <div className="h-full w-2/5 animate-[loading_1.4s_ease-in-out_infinite] bg-header-accent" />
                </div>

                <span className="sr-only">Lütfen bekleyin.</span>
            </div>
        </div>
    );
};

export default PageLoader;

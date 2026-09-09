function BooksHeader({count}) {
    return (
        <div className="border-b border-white/[0.07] pb-10">
            <div className="flex items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-3">
                        <span className="h-px w-8 bg-white/25" />

                        <span
                            className="
                                text-[9px]
                                font-medium
                                uppercase
                                tracking-[0.35em]
                                text-white/35
                            "
                        >
                            Kitaplık
                        </span>
                    </div>

                    <h1
                        className="
                            mt-6
                            font-serif
                            text-5xl
                            tracking-tight
                            text-white
                            sm:text-6xl
                            lg:text-7xl
                        "
                    >
                        Kitaplar
                    </h1>
                </div>

                <span
                    className="
                        hidden
                        text-[10px]
                        tabular-nums
                        tracking-[0.2em]
                        text-white/25
                        sm:block
                    "
                >
                    {String(count).padStart(2, "0")} KİTAP
                </span>
            </div>
        </div>
    );
}

export default BooksHeader;
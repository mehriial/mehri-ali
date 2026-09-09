function BookCharacters({ book }) {
    const characters = book.characters ?? [];

    if (!characters.length) {
        return (
            <div className="py-20 text-center sm:py-24 lg:py-14">
                <span
                    className="text-[9px] uppercase tracking-[0.35em]"
                    style={{
                        color: "var(--book-muted)",
                    }}
                >
                    Karakterler
                </span>

                <p className="mt-4 font-serif text-2xl text-white/60">
                    Henüz karakter bilgisi eklenmedi.
                </p>
            </div>
        );
    }

    return (
        <div className="py-20 sm:py-24 lg:py-14">
            <div className="mb-10 flex items-end gap-4">
                <div className="flex items-start gap-3">
                    <span
                        className="mt-2 h-px w-8 shrink-0"
                        style={{
                            backgroundColor: "var(--book-accent)",
                            opacity: 0.65,
                        }}
                    />

                    <div>
                        <span
                            className="block text-[9px] font-medium uppercase tracking-[0.35em]"
                            style={{
                                color: "var(--book-muted)",
                            }}
                        >
                            Hikâyenin yüzleri
                        </span>

                        <h2 className="mt-2 font-serif text-3xl tracking-tight text-white sm:text-4xl">
                            Karakterler
                        </h2>
                    </div>
                </div>

                <span
                    className="mb-1 h-px flex-1"
                    style={{
                        backgroundColor:
                            "color-mix(in srgb, var(--book-accent) 10%, transparent)",
                    }}
                />
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
                {characters.map((character, index) => (
                    <article
                        key={character.id}
                        className="
                group
                overflow-hidden
                rounded-xl
                border
                bg-black/20
                backdrop-blur-sm
                transition-all
                duration-500
                hover:bg-black/30
            "
                        style={{
                            borderColor:
                                "color-mix(in srgb, var(--book-accent) 10%, transparent)",
                        }}
                    >
                        <div className="relative aspect-[3/4] overflow-hidden">
                            {character.image ? (
                                <img
                                    src={character.image}
                                    alt={character.name}
                                    className="
                            h-full w-full object-cover
                            transition-transform duration-700
                            group-hover:scale-105
                        "
                                />
                            ) : (
                                <div
                                    className="flex h-full items-center justify-center"
                                    style={{
                                        backgroundColor:
                                            "color-mix(in srgb, var(--book-accent) 8%, var(--book-bg))",
                                    }}
                                >
                        <span
                            className="font-serif text-4xl"
                            style={{
                                color:
                                    "color-mix(in srgb, var(--book-accent) 35%, white)",
                            }}
                        >
                            {character.name?.charAt(0)}
                        </span>
                                </div>
                            )}

                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                            <span
                                className="absolute left-4 top-4 text-[8px] tabular-nums tracking-[0.2em]"
                                style={{
                                    color:
                                        "color-mix(in srgb, var(--book-accent) 70%, white)",
                                }}
                            >
                    {String(index + 1).padStart(2, "0")}
                </span>

                            <div className="absolute inset-x-4 bottom-4">
                                <h3 className="font-serif text-xl text-white">
                                    {character.name}
                                </h3>

                                {character.role && (
                                    <span
                                        className="mt-1 block text-[8px] uppercase tracking-[0.25em]"
                                        style={{ color: "var(--book-muted)" }}
                                    >
                            {character.role}
                        </span>
                                )}
                            </div>
                        </div>

                        {character.description && (
                            <div className="p-4">
                                <p className="text-[11px] leading-5 text-white/40">
                                    {character.description}
                                </p>
                            </div>
                        )}
                    </article>
                ))}
            </div>
        </div>
    );
}

export default BookCharacters;
function GalleryFilters({
                            books,
                            activeBook,
                            onChange,
                        }) {
    return (
        <div className="flex flex-wrap items-center gap-2">
            <button
                type="button"
                onClick={() => onChange("all")}
                className={`
                    rounded-full
                    border
                    px-4
                    py-2
                    text-[9px]
                    transition-colors
                    ${
                    activeBook === "all"
                        ? "border-white/15 bg-white/[0.06] text-white"
                        : "border-white/[0.06] text-white/25 hover:text-white/60"
                }
                `}
            >
                Tümü
            </button>

            {books.map((book) => {
                const active = activeBook === book.slug;

                return (
                    <button
                        key={book.id}
                        type="button"
                        onClick={() => onChange(book.slug)}
                        className={`
                            rounded-full
                            border
                            px-4
                            py-2
                            text-[9px]
                            transition-colors
                            ${
                            active
                                ? "border-white/15 bg-white/[0.06] text-white"
                                : "border-white/[0.06] text-white/25 hover:text-white/60"
                        }
                        `}
                    >
                        {book.title}
                    </button>
                );
            })}
        </div>
    );
}

export default GalleryFilters;
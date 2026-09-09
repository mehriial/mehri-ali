import {Search, X} from "lucide-react";

function BooksFilters({
                          categories,
                          activeCategory,
                          onCategoryChange,
                          search,
                          onSearchChange,
                      }) {
    return (
        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-2">
                {categories.map((category) => {
                    const isActive = activeCategory === category;

                    return (
                        <button
                            key={category}
                            type="button"
                            onClick={() => onCategoryChange(category)}
                            className={`
                                border
                                px-4
                                py-2
                                text-[11px]
                                transition-all
                                duration-300
                                ${
                                isActive
                                    ? "border-white bg-white text-black"
                                    : "border-white/[0.08] text-white/40 hover:border-white/20 hover:text-white"
                            }
                            `}
                        >
                            {category}
                        </button>
                    );
                })}
            </div>

            <div className="relative w-full lg:w-[280px]">
                <Search
                    className="
                        pointer-events-none
                        absolute
                        left-0
                        top-1/2
                        h-4
                        w-4
                        -translate-y-1/2
                        text-white/25
                    "
                />

                <input
                    type="text"
                    value={search}
                    onChange={(event) =>
                        onSearchChange(event.target.value)
                    }
                    placeholder="Kitap ara..."
                    className="
                        w-full
                        border-b
                        border-white/[0.1]
                        bg-transparent
                        py-3
                        pl-7
                        pr-8
                        text-xs
                        text-white
                        outline-none
                        placeholder:text-white/20
                        transition-colors
                        focus:border-white/35
                    "
                />

                {search && (
                    <button
                        type="button"
                        onClick={() => onSearchChange("")}
                        aria-label="Aramayı temizle"
                        className="
                            absolute
                            right-0
                            top-1/2
                            -translate-y-1/2
                            text-white/25
                            transition-colors
                            hover:text-white
                        "
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}
            </div>
        </div>
    );
}

export default BooksFilters;
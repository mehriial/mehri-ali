import {ArrowUpRight} from "lucide-react";

function BookCover({book}) {
    return (
        <div
            className="
                relative
                aspect-[2/3]
                overflow-hidden
                border
                border-white/[0.08]
                bg-white/[0.03]
                shadow-xl
                shadow-black/20
            "
        >
            <img
                src={book.image}
                alt={book.title}
                className="
                    h-full
                    w-full
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-[1.035]
                "
            />

            <div
                className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/80
                    via-black/10
                    to-transparent
                    opacity-0
                    transition-opacity
                    duration-500
                    group-hover:opacity-100
                "
            />

            <div
                className="
                    absolute
                    bottom-0
                    left-0
                    right-0
                    flex
                    translate-y-3
                    items-end
                    justify-between
                    gap-3
                    p-4
                    opacity-0
                    transition-all
                    duration-500
                    group-hover:translate-y-0
                    group-hover:opacity-100
                "
            >
                <div className="min-w-0">
                    <span
                        className="
                            text-[9px]
                            uppercase
                            tracking-[0.2em]
                            text-white/50
                        "
                    >
                        {book.category}
                    </span>

                    <p className="mt-1 truncate font-serif text-lg text-white">
                        {book.title}
                    </p>
                </div>

                <ArrowUpRight className="h-4 w-4 shrink-0 text-white"/>
            </div>
        </div>
    );
}

export default BookCover;
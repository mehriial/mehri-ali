function BookMeta({book}) {
    return (
        <div className="mt-4">
            <h3
                className="
                    font-serif
                    text-base
                    text-white/85
                    transition-colors
                    duration-300
                    group-hover:text-white
                    md:text-lg
                "
            >
                {book.title}
            </h3>

            <div className="mt-1.5 flex items-center gap-2">
                <span className="text-[10px] text-white/30">
                    {book.category}
                </span>

                <span className="h-0.5 w-0.5 rounded-full bg-white/20"/>

                <span className="text-[10px] text-white/30">
                    {book.status}
                </span>
            </div>
        </div>
    );
}

export default BookMeta;
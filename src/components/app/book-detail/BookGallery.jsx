import { useMemo, useState } from "react";
import { X } from "lucide-react";

function BookGallery({ book }) {
    const [selectedImage, setSelectedImage] = useState(null);

    const gallery = useMemo(() => {
        return [...(book.gallery ?? [])].sort(() => Math.random() - 0.5);
    }, [book.gallery]);

    if (!gallery.length) {
        return (
            <div className="py-20 text-center sm:py-24 lg:py-28">
                <span
                    className="text-[9px] uppercase tracking-[0.35em]"
                    style={{
                        color: "var(--book-muted)",
                    }}
                >
                    Galeri
                </span>

                <p className="mt-4 font-serif text-2xl text-white/60">
                    Henüz galeriye görsel eklenmedi.
                </p>
            </div>
        );
    }

    return (
        <div className="py-20 sm:py-24 lg:py-28">
            {/* Header */}
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
                            Görseller
                        </span>

                        <h2 className="mt-2 font-serif text-3xl tracking-tight text-white sm:text-4xl">
                            Galeri
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

            {/* Masonry Gallery */}
            <div className="columns-2 gap-3 sm:columns-3 sm:gap-5 lg:columns-4 lg:gap-6">
                {gallery.map((image, index) => (
                    <button
                        key={image.id ?? index}
                        type="button"
                        onClick={() => setSelectedImage(image)}
                        className="
                            group
                            relative
                            mb-3
                            block
                            w-full
                            break-inside-avoid
                            overflow-hidden
                            rounded-xl
                            border
                            text-left
                            sm:mb-5
                            lg:mb-6
                        "
                        style={{
                            borderColor:
                                "color-mix(in srgb, var(--book-accent) 10%, transparent)",
                        }}
                    >
                        <img
                            src={image.image}
                            alt={
                                image.alt ??
                                `${book.title} görseli`
                            }
                            className="
                                block
                                h-auto
                                w-full
                                object-cover
                                transition-transform
                                duration-700
                                group-hover:scale-105
                            "
                        />

                        {/* Hover Overlay */}
                        <div
                            className="
                                absolute
                                inset-0
                                opacity-0
                                transition-opacity
                                duration-300
                                group-hover:opacity-100
                            "
                            style={{
                                background:
                                    "linear-gradient(to top, rgba(0,0,0,.5), transparent 60%)",
                            }}
                        />

                        {/* Image Number */}
                        <span
                            className="
                                absolute
                                left-4
                                top-4
                                text-[8px]
                                tabular-nums
                                tracking-[0.2em]
                                opacity-0
                                transition-opacity
                                duration-300
                                group-hover:opacity-100
                            "
                            style={{
                                color:
                                    "color-mix(in srgb, var(--book-accent) 75%, white)",
                            }}
                        >
                            {String(index + 1).padStart(2, "0")}
                        </span>
                    </button>
                ))}
            </div>

            {/* Image Modal */}
            {selectedImage && (
                <div
                    className="
                        fixed
                        inset-0
                        z-[100]
                        flex
                        items-center
                        justify-center
                        bg-black/90
                        p-5
                        backdrop-blur-xl
                    "
                    onClick={() => setSelectedImage(null)}
                >
                    {/* Close */}
                    <button
                        type="button"
                        aria-label="Kapat"
                        onClick={() => setSelectedImage(null)}
                        className="
                            absolute
                            right-5
                            top-5
                            z-10
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-white/10
                            bg-black/40
                            text-white/50
                            transition-colors
                            hover:text-white
                        "
                    >
                        <X className="h-4 w-4" />
                    </button>

                    {/* Image */}
                    <img
                        src={selectedImage.image}
                        alt={
                            selectedImage.alt ??
                            book.title
                        }
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                        className="
                            max-h-[90vh]
                            max-w-[90vw]
                            rounded-xl
                            object-contain
                            shadow-2xl
                        "
                    />
                </div>
            )}
        </div>
    );
}

export default BookGallery;
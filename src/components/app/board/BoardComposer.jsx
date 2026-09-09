import { useRef, useState } from "react";
import {
    ImagePlus,
    Send,
    X,
} from "lucide-react";

function BoardComposer({ onSubmit }) {
    const inputRef = useRef(null);

    const [text, setText] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        if (!file.type.startsWith("image/")) {
            return;
        }

        const reader = new FileReader();

        reader.onload = () => {
            setImage(reader.result);
            setImagePreview(reader.result);
        };

        reader.readAsDataURL(file);

        event.target.value = "";
    };

    const handleRemoveImage = () => {
        setImage(null);
        setImagePreview(null);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const trimmedText = text.trim();

        if (!trimmedText && !image) {
            return;
        }

        onSubmit({
            text: trimmedText,
            image,
        });

        setText("");
        setImage(null);
        setImagePreview(null);
    };

    const isDisabled = !text.trim() && !image;

    return (
        <form
            onSubmit={handleSubmit}
            className="
                overflow-hidden
                rounded-2xl
                border border-white/[0.08]
                bg-white/[0.025]
            "
        >
            <div className="p-4 sm:p-5">
                <div className="flex gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.05] text-[10px] font-medium text-white/60">
                        M
                    </div>

                    <div className="min-w-0 flex-1">
                        <textarea
                            value={text}
                            onChange={(event) =>
                                setText(event.target.value)
                            }
                            rows={4}
                            placeholder="Aklından geçenleri paylaş..."
                            className="
                                min-h-[100px]
                                w-full
                                resize-none
                                border-0
                                bg-transparent
                                text-sm
                                leading-7
                                text-white
                                outline-none
                                placeholder:text-white/25
                            "
                        />
                    </div>
                </div>

                {imagePreview && (
                    <div className="relative mt-4 overflow-hidden rounded-xl border border-white/[0.08]">
                        <img
                            src={imagePreview}
                            alt="Gönderi önizlemesi"
                            className="max-h-[420px] w-full object-cover"
                        />

                        <button
                            type="button"
                            onClick={handleRemoveImage}
                            aria-label="Fotoğrafı kaldır"
                            className="
                                absolute
                                right-3
                                top-3
                                flex
                                h-8
                                w-8
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-white/10
                                bg-black/70
                                text-white/60
                                backdrop-blur-md
                                transition-colors
                                hover:text-white
                            "
                        >
                            <X className="h-3.5 w-3.5" />
                        </button>
                    </div>
                )}
            </div>

            <div className="flex items-center justify-between border-t border-white/[0.07] px-4 py-3 sm:px-5">
                <div>
                    <input
                        ref={inputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                    />

                    <button
                        type="button"
                        onClick={() => inputRef.current?.click()}
                        className="
                            flex
                            items-center
                            gap-2
                            rounded-lg
                            px-2
                            py-2
                            text-[10px]
                            text-white/35
                            transition-colors
                            hover:bg-white/[0.04]
                            hover:text-white
                        "
                    >
                        <ImagePlus className="h-3.5 w-3.5" />
                        Fotoğraf
                    </button>
                </div>

                <button
                    type="submit"
                    disabled={isDisabled}
                    className="
                        flex
                        items-center
                        gap-2
                        rounded-lg
                        px-4
                        py-2
                        text-[10px]
                        transition-all
                        disabled:cursor-not-allowed
                        disabled:opacity-20
                    "
                    style={{
                        backgroundColor: "rgba(255,255,255,.08)",
                        color: "rgba(255,255,255,.8)",
                    }}
                >
                    <Send className="h-3 w-3" />
                    Paylaş
                </button>
            </div>

            {image && (
                <div className="border-t border-white/[0.06] px-5 py-2.5">
                    <p className="text-[9px] text-white/25">
                        Fotoğraflı gönderiler yayınlanmadan önce onaylanır.
                    </p>
                </div>
            )}
        </form>
    );
}

export default BoardComposer;
import {useRef, useState} from "react";
import {
    ImagePlus,
    Send,
    X,
} from "lucide-react";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

function EditComposer({
                          books,
                          onSubmit,
                      }) {
    const inputRef = useRef(null);

    const [bookSlug, setBookSlug] = useState(
        books[0]?.slug ?? ""
    );
    const [title, setTitle] = useState("");
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

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
            setPreview(reader.result);
        };

        reader.readAsDataURL(file);

        event.target.value = "";
    };

    const handleRemove = () => {
        setImage(null);
        setPreview(null);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!image || !bookSlug) {
            return;
        }

        onSubmit({
            image,
            bookSlug,
            title: title.trim(),
        });

        setImage(null);
        setPreview(null);
        setTitle("");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="
                overflow-hidden
                rounded-2xl
                border
                border-white/[0.08]
                bg-white/[0.025]
            "
        >
            <div className="border-b border-white/[0.06] px-5 py-4">
                <div className="flex items-center gap-3">
                    <ImagePlus className="h-4 w-4 text-white/30"/>

                    <div>
                        <h2 className="text-xs text-white/70">
                            Edit gönder
                        </h2>

                        <p className="mt-1 text-[9px] text-white/25">
                            Gönderin yayınlanmadan önce onaylanacaktır.
                        </p>
                    </div>
                </div>
            </div>

            <div className="p-5">
                <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <label className="text-[9px] uppercase tracking-[0.2em] text-white/30">
                            Kitap
                        </label>

                        <Select
                            value={bookSlug}
                            onValueChange={setBookSlug}
                        >
                            <SelectTrigger
                                className="
            mt-2
            h-16
            w-full
            rounded-lg
            border-white/[0.08]
            bg-black
            text-sm
            text-white/70
            shadow-none
            focus-visible:border-white/[0.15]
            focus-visible:ring-0
        "
                            >
                                <SelectValue placeholder="Kitap seç"/>
                            </SelectTrigger>

                            <SelectContent
                                side="bottom"
                                sideOffset={6}
                                align="start"
                                className="
            z-[100]
            border-white/[0.08]
            bg-black
            text-white
        "
                            >
                                {books.map((book) => (
                                    <SelectItem
                                        key={book.id}
                                        value={book.slug}
                                        className="
                    cursor-pointer
                    text-xs
                    text-white/70
                    focus:bg-white/[0.06]
                    focus:text-white
                "
                                    >
                                        {book.title}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <label className="text-[9px] uppercase tracking-[0.2em] text-white/30">
                            Başlık
                        </label>

                        <Input
                            value={title}
                            onChange={(event) =>
                                setTitle(event.target.value)
                            }
                            placeholder="Edit için kısa bir başlık"
                            className="
                                mt-2
                                h-10
                                rounded-lg
                                border-white/[0.08]
                                bg-black
                                text-xs
                                text-white
                                shadow-none
                                placeholder:text-white/20
                                focus-visible:ring-0
                                focus-visible:ring-offset-0
                            "
                        />
                    </div>
                </div>

                {preview ? (
                    <div className="relative mt-5 overflow-hidden rounded-xl border border-white/[0.08]">
                        <img
                            src={preview}
                            alt="Edit önizlemesi"
                            className="max-h-[500px] w-full object-cover"
                        />

                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={handleRemove}
                            aria-label="Fotoğrafı kaldır"
                            className="
                                absolute
                                right-3
                                top-3
                                h-8
                                w-8
                                rounded-full
                                border
                                border-white/10
                                bg-black/70
                                text-white/50
                                backdrop-blur-md
                                hover:bg-black/80
                                hover:text-white
                            "
                        >
                            <X className="h-3.5 w-3.5"/>
                        </Button>
                    </div>
                ) : (
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() =>
                            inputRef.current?.click()
                        }
                        className="
                            mt-5
                            flex
                            h-auto
                            min-h-48
                            w-full
                            flex-col
                            items-center
                            justify-center
                            rounded-xl
                            border
                            border-dashed
                            border-white/[0.1]
                            bg-white/[0.015]
                            p-6
                            text-white/25
                            hover:border-white/20
                            hover:bg-white/[0.025]
                            hover:text-white/50
                        "
                    >
                        <ImagePlus className="h-5 w-5"/>

                        <span className="mt-3 text-[10px]">
                            Edit görseli seç
                        </span>

                        <span className="mt-1 text-[8px] text-white/15">
                            PNG, JPG veya WEBP
                        </span>
                    </Button>
                )}

                <input
                    ref={inputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleImageChange}
                    className="hidden"
                />
            </div>

            <div className="flex justify-end border-t border-white/[0.06] px-5 py-3">
                <Button
                    type="submit"
                    disabled={!image || !bookSlug}
                    className="
                        h-auto
                        rounded-lg
                        bg-white/[0.07]
                        px-4
                        py-2.5
                        text-[10px]
                        font-normal
                        text-white/70
                        shadow-none
                        hover:bg-white/[0.1]
                        hover:text-white
                    "
                >
                    <Send className="h-3 w-3"/>
                    Editi gönder
                </Button>
            </div>
        </form>
    );
}

export default EditComposer;
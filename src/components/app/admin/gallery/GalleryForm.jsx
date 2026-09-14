import { useEffect, useRef, useState } from "react";

import { ImagePlus, X } from "lucide-react";

import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select.jsx";

function GalleryForm({
                         books = [],
                         galleryItem,
                         onSave,
                         onCancel,
                     }) {
    const fileInputRef = useRef(null);

    const [form, setForm] = useState({
        bookId: "",
        title: "",
        description: "",
        image: "",
    });

    const [preview, setPreview] =
        useState("");

    useEffect(() => {
        if (galleryItem) {
            setForm({
                bookId: String(
                    galleryItem.bookId ??
                    ""
                ),
                title:
                    galleryItem.title ??
                    "",
                description:
                    galleryItem.description ??
                    "",
                image:
                    galleryItem.image ??
                    "",
            });

            setPreview(
                galleryItem.image ?? ""
            );

            return;
        }

        setForm({
            bookId: "",
            title: "",
            description: "",
            image: "",
        });

        setPreview("");
    }, [galleryItem]);

    const handleChange = (
        field,
        value
    ) => {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));
    };

    const handleFileChange = (
        event
    ) => {
        const file =
            event.target.files?.[0];

        if (!file) {
            return;
        }

        const reader =
            new FileReader();

        reader.onload = () => {
            const result =
                reader.result;

            setForm((current) => ({
                ...current,
                image: result,
            }));

            setPreview(result);
        };

        reader.readAsDataURL(file);
    };

    const handleRemoveImage = () => {
        setForm((current) => ({
            ...current,
            image: "",
        }));

        setPreview("");

        if (fileInputRef.current) {
            fileInputRef.current.value =
                "";
        }
    };

    const handleSubmit = (
        event
    ) => {
        event.preventDefault();

        if (
            !form.bookId ||
            !form.image
        ) {
            return;
        }

        onSave({
            ...form,
            bookId: Number(
                form.bookId
            ),
        });
    };

    const isEditing =
        Boolean(galleryItem);

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5"
        >
            {/* BOOK */}

            <div className="space-y-2">
                <Label className="text-xs text-white/60">
                    Kitap
                </Label>

                <Select
                    value={form.bookId}
                    onValueChange={(value) =>
                        handleChange(
                            "bookId",
                            value
                        )
                    }
                >
                    <SelectTrigger className="h-11 border-white/[0.08] bg-white/[0.025] text-white">
                        <SelectValue placeholder="Kitap seçin" />
                    </SelectTrigger>

                    <SelectContent>
                        {books.map(
                            (book) => (
                                <SelectItem
                                    key={
                                        book.id
                                    }
                                    value={String(
                                        book.id
                                    )}
                                >
                                    {
                                        book.title
                                    }
                                </SelectItem>
                            )
                        )}
                    </SelectContent>
                </Select>
            </div>

            {/* TITLE */}

            <div className="space-y-2">
                <Label
                    htmlFor="gallery-title"
                    className="text-xs text-white/60"
                >
                    Başlık
                </Label>

                <Input
                    id="gallery-title"
                    value={form.title}
                    onChange={(event) =>
                        handleChange(
                            "title",
                            event.target
                                .value
                        )
                    }
                    placeholder="Görsel başlığı"
                    className="h-11 border-white/[0.08] bg-white/[0.025] text-white placeholder:text-white/20"
                />
            </div>

            {/* IMAGE */}

            <div className="space-y-2">
                <Label className="text-xs text-white/60">
                    Görsel
                </Label>

                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={
                        handleFileChange
                    }
                    className="hidden"
                />

                {preview ? (
                    <div className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-black">
                        <img
                            src={preview}
                            alt="Önizleme"
                            className="max-h-[300px] w-full object-contain"
                        />

                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={
                                handleRemoveImage
                            }
                            className="absolute right-2 top-2 h-8 w-8 cursor-pointer rounded-lg bg-black/70 text-white hover:bg-black"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={() =>
                            fileInputRef.current?.click()
                        }
                        className="flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-white/[0.1] bg-white/[0.02] px-6 py-12 text-center transition hover:border-white/[0.2] hover:bg-white/[0.04]"
                    >
                        <ImagePlus className="h-8 w-8 text-white/25" />

                        <p className="mt-3 text-sm text-white/50">
                            Görsel seçin
                        </p>

                        <p className="mt-1 text-xs text-white/25">
                            JPG, PNG veya WEBP
                        </p>
                    </button>
                )}
            </div>

            {/* DESCRIPTION */}

            <div className="space-y-2">
                <Label
                    htmlFor="gallery-description"
                    className="text-xs text-white/60"
                >
                    Açıklama
                </Label>

                <textarea
                    id="gallery-description"
                    value={
                        form.description
                    }
                    onChange={(event) =>
                        handleChange(
                            "description",
                            event.target
                                .value
                        )
                    }
                    placeholder="Görsel hakkında kısa açıklama..."
                    rows={4}
                    className="flex w-full resize-none rounded-xl border border-white/[0.08] bg-white/[0.025] px-3 py-3 text-sm text-white outline-none placeholder:text-white/20 focus:border-white/[0.2]"
                />
            </div>

            {/* ACTIONS */}

            <div className="flex justify-end gap-2 border-t border-white/[0.08] pt-5">
                <Button
                    type="button"
                    variant="ghost"
                    onClick={onCancel}
                    className="cursor-pointer text-white/50 hover:bg-white/[0.05] hover:text-white"
                >
                    Vazgeç
                </Button>

                <Button
                    type="submit"
                    disabled={
                        !form.bookId ||
                        !form.image
                    }
                    className="cursor-pointer bg-white text-black hover:bg-white/90"
                >
                    {isEditing
                        ? "Değişiklikleri Kaydet"
                        : "Görsel Ekle"}
                </Button>
            </div>
        </form>
    );
}

export default GalleryForm;
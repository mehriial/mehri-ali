import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
    Image as ImageIcon,
    Loader2,
    Star,
    Upload,
    X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const defaultValues = {
    bookId: "",
    title: "",
    description: "",
    image: "",
    featured: false,
};

function GalleryForm({
                         image = null,
                         books = [],
                         onSubmit,
                         onCancel,
                     }) {
    const fileInputRef = useRef(null);

    const [preview, setPreview] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues,
    });

    const selectedBook = watch("bookId");
    const featured = watch("featured");

    useEffect(() => {
        if (!image) {
            setValue("bookId", "");
            setValue("title", "");
            setValue("description", "");
            setValue("image", "");
            setValue("featured", false);

            setPreview("");

            return;
        }

        setValue("bookId", String(image.bookId ?? ""));
        setValue("title", image.title ?? "");
        setValue("description", image.description ?? "");
        setValue("image", image.image ?? "");
        setValue("featured", Boolean(image.featured));

        setPreview(image.image ?? "");
    }, [image, setValue]);

    const handleFileChange = (event) => {
        const file = event.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            return;
        }

        setIsUploading(true);

        const imageUrl = URL.createObjectURL(file);

        setPreview(imageUrl);

        setValue("image", imageUrl, {
            shouldDirty: true,
            shouldValidate: true,
        });

        setIsUploading(false);
    };

    const removeImage = () => {
        setPreview("");

        setValue("image", "", {
            shouldDirty: true,
            shouldValidate: true,
        });

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const submitForm = (data) => {
        onSubmit({
            ...data,
            bookId: Number(data.bookId),
            featured: Boolean(data.featured),
        });
    };

    return (
        <form
            onSubmit={handleSubmit(submitForm)}
            className="space-y-6"
        >
            {/* Temel Bilgiler */}
            <section className="rounded-2xl border border-white/[0.07] bg-[#0d0d0d]">
                <div className="border-b border-white/[0.07] px-5 py-4">
                    <h2 className="text-sm font-semibold text-white">
                        Görsel Bilgileri
                    </h2>

                    <p className="mt-1 text-xs text-white/40">
                        Galeri görselinin temel bilgilerini daxil edin.
                    </p>
                </div>

                <div className="grid gap-5 p-5 md:grid-cols-2">
                    {/* Kitap */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/80">
                            Kitap
                        </label>

                        <Select
                            value={selectedBook}
                            onValueChange={(value) =>
                                setValue("bookId", value, {
                                    shouldDirty: true,
                                    shouldValidate: true,
                                })
                            }
                        >
                            <SelectTrigger className="h-11 border-white/[0.08] bg-black text-white focus:ring-0">
                                <SelectValue placeholder="Kitap seçin" />
                            </SelectTrigger>

                            <SelectContent className="border-white/[0.08] bg-[#111111] text-white">
                                {books.map((book) => (
                                    <SelectItem
                                        key={book.id}
                                        value={String(book.id)}
                                        className="focus:bg-white/[0.06] focus:text-white"
                                    >
                                        {book.title}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <input
                            type="hidden"
                            {...register("bookId", {
                                required:
                                    "Kitap seçilməlidir.",
                            })}
                        />

                        {errors.bookId && (
                            <p className="text-xs text-red-400">
                                Kitap seçilməlidir.
                            </p>
                        )}
                    </div>

                    {/* Başlık */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/80">
                            Başlık
                        </label>

                        <Input
                            placeholder="Görsel başlığı"
                            {...register("title")}
                            className="h-11 border-white/[0.08] bg-black text-white placeholder:text-white/20 focus-visible:ring-0"
                        />
                    </div>

                    {/* Açıklama */}
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium text-white/80">
                            Açıklama
                        </label>

                        <Textarea
                            placeholder="Görsel hakkında kısa bir açıklama..."
                            {...register("description")}
                            className="min-h-[110px] resize-none border-white/[0.08] bg-black text-white placeholder:text-white/20 focus-visible:ring-0"
                        />
                    </div>
                </div>
            </section>

            {/* Görsel */}
            <section className="rounded-2xl border border-white/[0.07] bg-[#0d0d0d]">
                <div className="border-b border-white/[0.07] px-5 py-4">
                    <h2 className="text-sm font-semibold text-white">
                        Görsel
                    </h2>

                    <p className="mt-1 text-xs text-white/40">
                        Galeride göstəriləcək görseli seçin.
                    </p>
                </div>

                <div className="p-5">
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                    />

                    {preview ? (
                        <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-black">
                            <div className="aspect-[16/9] max-h-[500px]">
                                <img
                                    src={preview}
                                    alt="Görsel önizleme"
                                    className="h-full w-full object-contain"
                                />
                            </div>

                            <div className="absolute right-3 top-3 flex gap-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() =>
                                        fileInputRef.current?.click()
                                    }
                                    className="h-9 gap-2 border-white/[0.1] bg-black/80 text-white backdrop-blur-md hover:bg-white/[0.1] hover:text-white"
                                >
                                    <Upload className="h-4 w-4" />
                                    Değiştir
                                </Button>

                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    onClick={removeImage}
                                    className="h-9 w-9 border-white/[0.1] bg-black/80 text-white backdrop-blur-md hover:bg-red-500/10 hover:text-red-400"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <button
                            type="button"
                            onClick={() =>
                                fileInputRef.current?.click()
                            }
                            className="flex min-h-[260px] w-full flex-col items-center justify-center rounded-2xl border border-dashed border-white/[0.1] bg-black px-6 text-center transition-colors hover:border-white/[0.2] hover:bg-white/[0.02]"
                        >
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.04]">
                                {isUploading ? (
                                    <Loader2 className="h-6 w-6 animate-spin text-white/40" />
                                ) : (
                                    <ImageIcon className="h-6 w-6 text-white/30" />
                                )}
                            </div>

                            <p className="mt-4 text-sm font-medium text-white/70">
                                Görsel yüklemek için tıklayın
                            </p>

                            <p className="mt-1 text-xs text-white/30">
                                PNG, JPG, JPEG veya WEBP
                            </p>
                        </button>
                    )}

                    {!preview && errors.image && (
                        <p className="mt-2 text-xs text-red-400">
                            Görsel seçilməlidir.
                        </p>
                    )}
                </div>
            </section>

            {/* Ayarlar */}
            <section className="rounded-2xl border border-white/[0.07] bg-[#0d0d0d]">
                <div className="border-b border-white/[0.07] px-5 py-4">
                    <h2 className="text-sm font-semibold text-white">
                        Görünüm Ayarları
                    </h2>
                </div>

                <div className="p-5">
                    <label className="flex cursor-pointer items-start gap-3">
                        <Checkbox
                            checked={featured}
                            onCheckedChange={(checked) =>
                                setValue(
                                    "featured",
                                    Boolean(checked),
                                    {
                                        shouldDirty: true,
                                    }
                                )
                            }
                            className="mt-0.5 border-white/20 data-[state=checked]:border-white data-[state=checked]:bg-white data-[state=checked]:text-black"
                        />

                        <div>
                            <div className="flex items-center gap-2">
                                <Star className="h-4 w-4 text-white/40" />

                                <span className="text-sm font-medium text-white/80">
                                    Öne çıkan görsel
                                </span>
                            </div>

                            <p className="mt-1 text-xs leading-5 text-white/35">
                                Bu görseli kitabın öne çıkan galeri
                                görselleri arasında göstər.
                            </p>
                        </div>
                    </label>

                    <input
                        type="hidden"
                        {...register("featured")}
                    />
                </div>
            </section>

            {/* Actions */}
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={isSubmitting}
                    className="h-10 border-white/[0.08] bg-transparent px-5 text-white hover:bg-white/[0.05] hover:text-white"
                >
                    Ləğv et
                </Button>

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-10 bg-white px-5 text-black hover:bg-white/90"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Yadda saxlanılır...
                        </>
                    ) : (
                        <>
                            <ImageIcon className="mr-2 h-4 w-4" />
                            {image
                                ? "Dəyişiklikləri saxla"
                                : "Görseli əlavə et"}
                        </>
                    )}
                </Button>
            </div>
        </form>
    );
}

export default GalleryForm;
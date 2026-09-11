import { useEffect, useState } from "react";
import { ImagePlus, X } from "lucide-react";
import { useForm } from "react-hook-form";

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
    title: "",
    slug: "",
    author: "Mehri Ali",
    description: "",
    category: "",
    status: "Devam ediyor",
    series: "",
    order: "",
    featured: false,
    image: null,

    theme: {
        background: "#080808",
        accent: "#500209",
        muted: "#999999",
    },
};

function BookForm({
                      book,
                      onSubmit,
                      onCancel,
                  }) {
    const [imagePreview, setImagePreview] = useState(
        book?.image || null
    );

    const form = useForm({
        defaultValues: book
            ? {
                ...defaultValues,
                ...book,
                theme: {
                    ...defaultValues.theme,
                    ...(book.theme || {}),
                },
            }
            : defaultValues,
    });

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: {
            errors,
            isSubmitting,
        },
    } = form;

    const featured = watch("featured");
    const status = watch("status");
    const category = watch("category");

    useEffect(() => {
        if (book) {
            reset({
                ...defaultValues,
                ...book,
                theme: {
                    ...defaultValues.theme,
                    ...(book.theme || {}),
                },
            });

            setImagePreview(book.image || null);
        } else {
            reset(defaultValues);
            setImagePreview(null);
        }
    }, [book, reset]);

    const handleImageChange = (event) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        setValue("image", file, {
            shouldDirty: true,
            shouldValidate: true,
        });

        const previewUrl = URL.createObjectURL(file);

        setImagePreview(previewUrl);
    };

    const removeImage = () => {
        setValue("image", null, {
            shouldDirty: true,
        });

        setImagePreview(null);
    };

    const handleFormSubmit = (data) => {
        onSubmit(data);
    };

    return (
        <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="space-y-6"
        >
            {/* =========================
                TEMEL BİLGİLER
            ========================== */}
            <section
                className="
                    rounded-2xl
                    border
                    border-white/[0.07]
                    bg-[#0d0d0d]
                "
            >
                <div className="border-b border-white/[0.07] px-5 py-4">
                    <h2 className="text-sm font-medium text-white">
                        Temel Bilgiler
                    </h2>

                    <p className="mt-1 text-xs text-white/30">
                        Kitabın temel bilgilerini girin.
                    </p>
                </div>

                <div className="grid gap-5 p-5">
                    {/* Kitap Adı */}
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-white/60">
                            Kitap Adı
                        </label>

                        <Input
                            {...register("title", {
                                required:
                                    "Kitap adı zorunludur.",
                            })}
                            placeholder="Örn. Yazgı Paradoksu"
                            className="
                                h-10
                                rounded-xl
                                border-white/[0.08]
                                bg-white/[0.03]
                                text-white
                                placeholder:text-white/20
                                focus-visible:ring-1
                                focus-visible:ring-white/20
                            "
                        />

                        {errors.title && (
                            <p className="text-xs text-red-400">
                                {errors.title.message}
                            </p>
                        )}
                    </div>

                    {/* Slug */}
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-white/60">
                            Slug
                        </label>

                        <Input
                            {...register("slug", {
                                required:
                                    "Slug zorunludur.",
                                pattern: {
                                    value: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                                    message:
                                        "Slug sadece küçük harf, rakam ve tire içerebilir.",
                                },
                            })}
                            placeholder="yazgi-paradoksu"
                            className="
                                h-10
                                rounded-xl
                                border-white/[0.08]
                                bg-white/[0.03]
                                text-white
                                placeholder:text-white/20
                                focus-visible:ring-1
                                focus-visible:ring-white/20
                            "
                        />

                        <p className="text-[11px] text-white/25">
                            URL adresinde kullanılacak.
                        </p>

                        {errors.slug && (
                            <p className="text-xs text-red-400">
                                {errors.slug.message}
                            </p>
                        )}
                    </div>

                    {/* Yazar */}
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-white/60">
                            Yazar
                        </label>

                        <Input
                            {...register("author", {
                                required:
                                    "Yazar zorunludur.",
                            })}
                            placeholder="Yazar adı"
                            className="
                                h-10
                                rounded-xl
                                border-white/[0.08]
                                bg-white/[0.03]
                                text-white
                                placeholder:text-white/20
                                focus-visible:ring-1
                                focus-visible:ring-white/20
                            "
                        />

                        {errors.author && (
                            <p className="text-xs text-red-400">
                                {errors.author.message}
                            </p>
                        )}
                    </div>

                    {/* Açıklama */}
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-white/60">
                            Açıklama
                        </label>

                        <Textarea
                            {...register("description")}
                            placeholder="Kitap hakkında kısa bir açıklama..."
                            className="
                                min-h-[140px]
                                resize-none
                                rounded-xl
                                border-white/[0.08]
                                bg-white/[0.03]
                                text-white
                                placeholder:text-white/20
                                focus-visible:ring-1
                                focus-visible:ring-white/20
                            "
                        />
                    </div>
                </div>
            </section>

            {/* =========================
                KAPAK
            ========================== */}
            <section
                className="
                    rounded-2xl
                    border
                    border-white/[0.07]
                    bg-[#0d0d0d]
                "
            >
                <div className="border-b border-white/[0.07] px-5 py-4">
                    <h2 className="text-sm font-medium text-white">
                        Kitap Kapağı
                    </h2>

                    <p className="mt-1 text-xs text-white/30">
                        Kitabın kapak görselini yükleyin.
                    </p>
                </div>

                <div className="p-5">
                    <div className="flex flex-col gap-5 sm:flex-row">
                        {/* Preview */}
                        <div
                            className="
                                relative
                                h-[220px]
                                w-[150px]
                                shrink-0
                                overflow-hidden
                                rounded-xl
                                border
                                border-white/[0.08]
                                bg-white/[0.03]
                            "
                        >
                            {imagePreview ? (
                                <>
                                    <img
                                        src={imagePreview}
                                        alt="Kitap kapağı"
                                        className="
                                            h-full
                                            w-full
                                            object-cover
                                        "
                                    />

                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="
                                            absolute
                                            right-2
                                            top-2
                                            flex
                                            h-7
                                            w-7
                                            items-center
                                            justify-center
                                            rounded-lg
                                            bg-black/70
                                            text-white/70
                                            backdrop-blur
                                            transition
                                            hover:bg-black
                                            hover:text-white
                                        "
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </>
                            ) : (
                                <div
                                    className="
                                        flex
                                        h-full
                                        flex-col
                                        items-center
                                        justify-center
                                        gap-2
                                        text-white/20
                                    "
                                >
                                    <ImagePlus className="h-7 w-7" />

                                    <span className="text-xs">
                                        Kapak yok
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Upload */}
                        <div className="flex flex-1 flex-col justify-center">
                            <label
                                htmlFor="book-image"
                                className="
                                    flex
                                    min-h-[130px]
                                    cursor-pointer
                                    flex-col
                                    items-center
                                    justify-center
                                    rounded-xl
                                    border
                                    border-dashed
                                    border-white/[0.12]
                                    bg-white/[0.02]
                                    px-5
                                    text-center
                                    transition
                                    hover:border-white/20
                                    hover:bg-white/[0.03]
                                "
                            >
                                <ImagePlus className="mb-3 h-6 w-6 text-white/30" />

                                <span className="text-sm text-white/60">
                                    Kapak görseli seç
                                </span>

                                <span className="mt-1 text-xs text-white/25">
                                    JPG, PNG veya WEBP
                                </span>

                                <input
                                    id="book-image"
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </label>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================
                YAYIN BİLGİLERİ
            ========================== */}
            <section
                className="
                    rounded-2xl
                    border
                    border-white/[0.07]
                    bg-[#0d0d0d]
                "
            >
                <div className="border-b border-white/[0.07] px-5 py-4">
                    <h2 className="text-sm font-medium text-white">
                        Yayın Bilgileri
                    </h2>

                    <p className="mt-1 text-xs text-white/30">
                        Kitabın kategori, seri ve yayın durumunu belirleyin.
                    </p>
                </div>

                <div className="grid gap-5 p-5 md:grid-cols-2">
                    {/* Category */}
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-white/60">
                            Kategori
                        </label>

                        <Select
                            value={category}
                            onValueChange={(value) =>
                                setValue("category", value, {
                                    shouldDirty: true,
                                    shouldValidate: true,
                                })
                            }
                        >
                            <SelectTrigger
                                className="
                                    h-10
                                    rounded-xl
                                    border-white/[0.08]
                                    bg-white/[0.03]
                                    text-white
                                "
                            >
                                <SelectValue placeholder="Kategori seçin" />
                            </SelectTrigger>

                            <SelectContent
                                className="
                                    border-white/[0.08]
                                    bg-[#111111]
                                    text-white
                                "
                            >
                                <SelectItem value="Gerilim">
                                    Gerilim
                                </SelectItem>

                                <SelectItem value="Romantik">
                                    Romantik
                                </SelectItem>

                                <SelectItem value="Fantastik">
                                    Fantastik
                                </SelectItem>

                                <SelectItem value="Dram">
                                    Dram
                                </SelectItem>

                                <SelectItem value="Bilim Kurgu">
                                    Bilim Kurgu
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Status */}
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-white/60">
                            Durum
                        </label>

                        <Select
                            value={status}
                            onValueChange={(value) =>
                                setValue("status", value, {
                                    shouldDirty: true,
                                })
                            }
                        >
                            <SelectTrigger
                                className="
                                    h-10
                                    rounded-xl
                                    border-white/[0.08]
                                    bg-white/[0.03]
                                    text-white
                                "
                            >
                                <SelectValue placeholder="Durum seçin" />
                            </SelectTrigger>

                            <SelectContent
                                className="
                                    border-white/[0.08]
                                    bg-[#111111]
                                    text-white
                                "
                            >
                                <SelectItem value="Devam ediyor">
                                    Devam ediyor
                                </SelectItem>

                                <SelectItem value="Tamamlandı">
                                    Tamamlandı
                                </SelectItem>

                                <SelectItem value="Taslak">
                                    Taslak
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Series */}
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-white/60">
                            Seri
                        </label>

                        <Input
                            {...register("series")}
                            placeholder="Örn. Verus Serisi"
                            className="
                                h-10
                                rounded-xl
                                border-white/[0.08]
                                bg-white/[0.03]
                                text-white
                                placeholder:text-white/20
                                focus-visible:ring-1
                                focus-visible:ring-white/20
                            "
                        />
                    </div>

                    {/* Order */}
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-white/60">
                            Seri Sırası
                        </label>

                        <Input
                            type="number"
                            min="1"
                            {...register("order")}
                            placeholder="Örn. 1"
                            className="
                                h-10
                                rounded-xl
                                border-white/[0.08]
                                bg-white/[0.03]
                                text-white
                                placeholder:text-white/20
                                focus-visible:ring-1
                                focus-visible:ring-white/20
                            "
                        />
                    </div>

                    {/* Featured */}
                    <div
                        className="
                            flex
                            items-center
                            gap-3
                            rounded-xl
                            border
                            border-white/[0.07]
                            bg-white/[0.02]
                            p-4
                            md:col-span-2
                        "
                    >
                        <Checkbox
                            id="featured"
                            checked={featured}
                            onCheckedChange={(checked) =>
                                setValue(
                                    "featured",
                                    checked === true,
                                    {
                                        shouldDirty: true,
                                    }
                                )
                            }
                            className="
                                border-white/20
                                data-[state=checked]:border-white
                                data-[state=checked]:bg-white
                                data-[state=checked]:text-black
                            "
                        />

                        <div>
                            <label
                                htmlFor="featured"
                                className="cursor-pointer text-sm text-white/70"
                            >
                                Öne çıkan kitap
                            </label>

                            <p className="mt-0.5 text-xs text-white/25">
                                Kitap ana sayfadaki öne çıkanlar bölümünde
                                gösterilir.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================
                TEMA
            ========================== */}
            <section
                className="
                    rounded-2xl
                    border
                    border-white/[0.07]
                    bg-[#0d0d0d]
                "
            >
                <div className="border-b border-white/[0.07] px-5 py-4">
                    <h2 className="text-sm font-medium text-white">
                        Kitap Teması
                    </h2>

                    <p className="mt-1 text-xs text-white/30">
                        Kitaba özel renk temasını belirleyin.
                    </p>
                </div>

                <div className="grid gap-5 p-5 md:grid-cols-3">
                    {/* Background */}
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-white/60">
                            Arka Plan
                        </label>

                        <div className="flex gap-2">
                            <input
                                type="color"
                                {...register("theme.background")}
                                className="
                                    h-10
                                    w-10
                                    cursor-pointer
                                    rounded-lg
                                    border
                                    border-white/[0.08]
                                    bg-transparent
                                    p-1
                                "
                            />

                            <Input
                                {...register("theme.background")}
                                className="
                                    h-10
                                    rounded-xl
                                    border-white/[0.08]
                                    bg-white/[0.03]
                                    text-white
                                "
                            />
                        </div>
                    </div>

                    {/* Accent */}
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-white/60">
                            Vurgu Rengi
                        </label>

                        <div className="flex gap-2">
                            <input
                                type="color"
                                {...register("theme.accent")}
                                className="
                                    h-10
                                    w-10
                                    cursor-pointer
                                    rounded-lg
                                    border
                                    border-white/[0.08]
                                    bg-transparent
                                    p-1
                                "
                            />

                            <Input
                                {...register("theme.accent")}
                                className="
                                    h-10
                                    rounded-xl
                                    border-white/[0.08]
                                    bg-white/[0.03]
                                    text-white
                                "
                            />
                        </div>
                    </div>

                    {/* Muted */}
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-white/60">
                            Soluk Renk
                        </label>

                        <div className="flex gap-2">
                            <input
                                type="color"
                                {...register("theme.muted")}
                                className="
                                    h-10
                                    w-10
                                    cursor-pointer
                                    rounded-lg
                                    border
                                    border-white/[0.08]
                                    bg-transparent
                                    p-1
                                "
                            />

                            <Input
                                {...register("theme.muted")}
                                className="
                                    h-10
                                    rounded-xl
                                    border-white/[0.08]
                                    bg-white/[0.03]
                                    text-white
                                "
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================
                ACTIONS
            ========================== */}
            <div
                className="
                    flex
                    flex-col-reverse
                    gap-3
                    border-t
                    border-white/[0.07]
                    pt-5
                    sm:flex-row
                    sm:justify-end
                "
            >
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    className="
                        h-10
                        rounded-xl
                        border-white/[0.08]
                        bg-transparent
                        px-5
                        text-white/60
                        hover:bg-white/[0.05]
                        hover:text-white
                    "
                >
                    Vazgeç
                </Button>

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="
                        h-10
                        rounded-xl
                        bg-white
                        px-5
                        text-black
                        hover:bg-white/90
                    "
                >
                    {isSubmitting
                        ? "Kaydediliyor..."
                        : book
                            ? "Değişiklikleri Kaydet"
                            : "Kitabı Oluştur"}
                </Button>
            </div>
        </form>
    );
}

export default BookForm;
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select.jsx";

const EMPTY_FORM = {
    title: "",
    content: "",
    type: "general",
    bookSlug: "",
    status: "published",
};

function AnnouncementForm({
                              initialData,
                              books = [],
                              onSubmit,
                              onCancel,
                          }) {
    const [form, setForm] = useState(EMPTY_FORM);

    useEffect(() => {
        if (initialData) {
            setForm({
                title: initialData.title ?? "",
                content: initialData.content ?? "",
                type: initialData.type ?? "general",
                bookSlug: initialData.bookSlug ?? "",
                status: initialData.status ?? "published",
            });

            return;
        }

        setForm(EMPTY_FORM);
    }, [initialData]);

    const updateField = (field, value) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!form.title.trim()) return;
        if (!form.content.trim()) return;

        onSubmit({
            ...form,
            title: form.title.trim(),
            content: form.content.trim(),
            bookSlug:
                form.type === "book"
                    ? form.bookSlug || null
                    : null,
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5"
        >
            <div className="space-y-2">
                <Label className="text-xs text-white/60">
                    Başlık
                </Label>

                <Input
                    value={form.title}
                    onChange={(event) =>
                        updateField(
                            "title",
                            event.target.value
                        )
                    }
                    placeholder="Duyuru başlığı"
                    className="h-11 border-white/[0.08] bg-white/[0.025] text-white placeholder:text-white/20"
                />
            </div>

            <div className="space-y-2">
                <Label className="text-xs text-white/60">
                    İçerik
                </Label>

                <Textarea
                    value={form.content}
                    onChange={(event) =>
                        updateField(
                            "content",
                            event.target.value
                        )
                    }
                    placeholder="Duyuru içeriğini yazın..."
                    className="min-h-[160px] resize-none border-white/[0.08] bg-white/[0.025] text-white placeholder:text-white/20"
                />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label className="text-xs text-white/60">
                        Duyuru tipi
                    </Label>

                    <Select
                        value={form.type}
                        onValueChange={(value) =>
                            updateField("type", value)
                        }
                    >
                        <SelectTrigger className="h-11 border-white/[0.08] bg-white/[0.025] text-white">
                            <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="general">
                                Genel
                            </SelectItem>

                            <SelectItem value="book">
                                Kitap
                            </SelectItem>

                            <SelectItem value="gallery">
                                Galeri
                            </SelectItem>

                            <SelectItem value="system">
                                Sistem
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label className="text-xs text-white/60">
                        Durum
                    </Label>

                    <Select
                        value={form.status}
                        onValueChange={(value) =>
                            updateField("status", value)
                        }
                    >
                        <SelectTrigger className="h-11 border-white/[0.08] bg-white/[0.025] text-white">
                            <SelectValue />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="published">
                                Yayında
                            </SelectItem>

                            <SelectItem value="draft">
                                Taslak
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {form.type === "book" && (
                <div className="space-y-2">
                    <Label className="text-xs text-white/60">
                        Kitap
                    </Label>

                    <Select
                        value={form.bookSlug}
                        onValueChange={(value) =>
                            updateField(
                                "bookSlug",
                                value
                            )
                        }
                    >
                        <SelectTrigger className="h-11 border-white/[0.08] bg-white/[0.025] text-white">
                            <SelectValue placeholder="Kitap seçin" />
                        </SelectTrigger>

                        <SelectContent>
                            {books.map((book) => (
                                <SelectItem
                                    key={book.id}
                                    value={book.slug}
                                >
                                    {book.title}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            )}

            <div className="flex justify-end gap-2 border-t border-white/[0.06] pt-5">
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
                    className="cursor-pointer bg-white text-black hover:bg-white/90"
                >
                    {initialData
                        ? "Değişiklikleri kaydet"
                        : "Duyuru oluştur"}
                </Button>
            </div>
        </form>
    );
}

export default AnnouncementForm;
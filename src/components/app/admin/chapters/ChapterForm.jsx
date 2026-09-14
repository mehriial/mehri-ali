import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Button } from "@/components/ui/button.jsx";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select.jsx";

import ChapterEditor from "./ChapterEditor.jsx";

function ChapterForm({
                         books = [],
                         chapter,
                         onSave,
                         onCancel,
                     }) {
    const [form, setForm] = useState({
        bookId: "",
        chapterNumber: "",
        title: "",
        status: "published",
        content: "",
    });

    useEffect(() => {
        if (chapter) {
            setForm({
                bookId: String(chapter.bookId ?? ""),
                chapterNumber: String(
                    chapter.chapterNumber ?? ""
                ),
                title: chapter.title ?? "",
                status: chapter.status ?? "published",
                content: chapter.content ?? "",
            });

            return;
        }

        setForm({
            bookId: "",
            chapterNumber: "",
            title: "",
            status: "published",
            content: "",
        });
    }, [chapter]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((current) => ({
            ...current,
            [name]: value,
        }));
    };

    const handleContentChange = (content) => {
        setForm((current) => ({
            ...current,
            content,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!form.bookId) {
            return;
        }

        if (!form.chapterNumber) {
            return;
        }

        if (!form.title.trim()) {
            return;
        }

        onSave({
            bookId: Number(form.bookId),
            chapterNumber: Number(form.chapterNumber),
            title: form.title.trim(),
            status: form.status,
            content: form.content,
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6"
        >
            <div className="flex justify-end gap-2 border-t border-white/[0.06] pt-5">
                <Button
                    type="button"
                    variant="ghost"
                    onClick={onCancel}
                    className="cursor-pointer text-white/50 hover:bg-white/[0.05] hover:text-white"
                >
                    İptal
                </Button>

                <Button
                    type="submit"
                    className="cursor-pointer rounded-xl bg-white px-5 text-black hover:bg-white/90"
                >
                    {chapter
                        ? "Değişiklikleri Kaydet"
                        : "Bölüm Ekle"}
                </Button>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label className="text-white/60">
                        Kitap
                    </Label>

                    <Select
                        value={form.bookId}
                        onValueChange={(value) =>
                            setForm((current) => ({
                                ...current,
                                bookId: value,
                            }))
                        }
                    >
                        <SelectTrigger className="h-11 w-full border-white/[0.08] bg-white/[0.025] text-white">
                            <SelectValue placeholder="Kitap seçin" />
                        </SelectTrigger>

                        <SelectContent>
                            {books.map((book) => (
                                <SelectItem
                                    key={book.id}
                                    value={String(book.id)}
                                >
                                    {book.title}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label className="text-white/60">
                        Durum
                    </Label>

                    <Select
                        value={form.status}
                        onValueChange={(value) =>
                            setForm((current) => ({
                                ...current,
                                status: value,
                            }))
                        }
                    >
                        <SelectTrigger className="h-11 w-full border-white/[0.08] bg-white/[0.025] text-white">
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

            <div className="grid gap-5 sm:grid-cols-[140px_1fr]">
                <div className="space-y-2">
                    <Label className="text-white/60">
                        Bölüm No
                    </Label>

                    <Input
                        type="number"
                        min="1"
                        name="chapterNumber"
                        value={form.chapterNumber}
                        onChange={handleChange}
                        placeholder="1"
                        className="h-11 border-white/[0.08] bg-white/[0.025] text-white placeholder:text-white/20"
                    />
                </div>

                <div className="space-y-2">
                    <Label className="text-white/60">
                        Bölüm Başlığı
                    </Label>

                    <Input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="Bölüm başlığı"
                        className="h-11 border-white/[0.08] bg-white/[0.025] text-white placeholder:text-white/20"
                    />
                </div>
            </div>

            <div className="space-y-2">
                <ChapterEditor
                    value={form.content}
                    onChange={handleContentChange}
                />
            </div>

        </form>
    );
}

export default ChapterForm;
import { useEffect, useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog.jsx";

import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button.jsx";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select.jsx";

function BookFormDialog({
                            open,
                            onOpenChange,
                            book,
                            onSave,
                        }) {
    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");
    const [author, setAuthor] = useState("");
    const [category, setCategory] = useState("");
    const [status, setStatus] = useState("");
    const [series, setSeries] = useState("");
    const [order, setOrder] = useState("");

    useEffect(() => {
        if (!open) {
            return;
        }

        setTitle(book?.title || "");
        setSlug(book?.slug || "");
        setAuthor(book?.author || "");
        setCategory(book?.category || "");
        setStatus(book?.status || "");
        setSeries(book?.series || "");
        setOrder(
            book?.order !== undefined
                ? String(book.order)
                : ""
        );
    }, [book, open]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!title.trim()) {
            return;
        }

        onSave({
            title: title.trim(),
            slug: slug.trim(),
            author: author.trim(),
            category,
            status,
            series: series.trim() || null,
            order: order ? Number(order) : null,
        });

        onOpenChange(false);
    };

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent
                className="
                    max-h-[90vh]
                    overflow-y-auto
                    border-white/[0.08]
                    bg-[#0a0a0a]
                    text-white
                    sm:max-w-[600px]
                "
            >
                <DialogHeader>
                    <DialogTitle className="text-lg font-medium">
                        {book
                            ? "Kitabı Düzenle"
                            : "Yeni Kitap"}
                    </DialogTitle>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit}
                    className="mt-4 space-y-5"
                >
                    <div className="space-y-2">
                        <label className="text-xs text-white/50">
                            Kitap adı
                        </label>

                        <Input
                            value={title}
                            onChange={(event) =>
                                setTitle(event.target.value)
                            }
                            placeholder="Kitap adını girin"
                            className="
                                border-white/[0.08]
                                bg-white/[0.025]
                                text-white
                            "
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs text-white/50">
                            Slug
                        </label>

                        <Input
                            value={slug}
                            onChange={(event) =>
                                setSlug(event.target.value)
                            }
                            placeholder="yazgi-paradoksu"
                            className="
                                border-white/[0.08]
                                bg-white/[0.025]
                                text-white
                            "
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs text-white/50">
                            Yazar
                        </label>

                        <Input
                            value={author}
                            onChange={(event) =>
                                setAuthor(event.target.value)
                            }
                            placeholder="Yazar adı"
                            className="
                                border-white/[0.08]
                                bg-white/[0.025]
                                text-white
                            "
                        />
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-xs text-white/50">
                                Kategori
                            </label>

                            <Select
                                value={category}
                                onValueChange={setCategory}
                            >
                                <SelectTrigger className="border-white/[0.08] bg-white/[0.025] text-white">
                                    <SelectValue placeholder="Kategori seçin" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="Romantik">
                                        Romantik
                                    </SelectItem>

                                    <SelectItem value="Dram">
                                        Dram
                                    </SelectItem>

                                    <SelectItem value="Gerilim">
                                        Gerilim
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs text-white/50">
                                Durum
                            </label>

                            <Select
                                value={status}
                                onValueChange={setStatus}
                            >
                                <SelectTrigger className="border-white/[0.08] bg-white/[0.025] text-white">
                                    <SelectValue placeholder="Durum seçin" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="Devam ediyor">
                                        Devam ediyor
                                    </SelectItem>

                                    <SelectItem value="Tamamlandı">
                                        Tamamlandı
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-xs text-white/50">
                                Seri
                            </label>

                            <Input
                                value={series}
                                onChange={(event) =>
                                    setSeries(event.target.value)
                                }
                                placeholder="Verus Serisi"
                                className="
                                    border-white/[0.08]
                                    bg-white/[0.025]
                                    text-white
                                "
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs text-white/50">
                                Seri sırası
                            </label>

                            <Input
                                type="number"
                                min="1"
                                value={order}
                                onChange={(event) =>
                                    setOrder(event.target.value)
                                }
                                placeholder="1"
                                className="
                                    border-white/[0.08]
                                    bg-white/[0.025]
                                    text-white
                                "
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 border-t border-white/[0.06] pt-5">
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() =>
                                onOpenChange(false)
                            }
                            className="
                                cursor-pointer
                                text-white/40
                                hover:bg-white/[0.04]
                                hover:text-white
                            "
                        >
                            Vazgeç
                        </Button>

                        <Button
                            type="submit"
                            className="
                                cursor-pointer
                                bg-white
                                text-black
                                hover:bg-white/90
                            "
                        >
                            {book
                                ? "Değişiklikleri Kaydet"
                                : "Kitabı Oluştur"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default BookFormDialog;
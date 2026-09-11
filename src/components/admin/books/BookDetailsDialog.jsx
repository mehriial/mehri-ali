import {
    BookOpen,
    CalendarDays,
    Layers,
    User,
} from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import BookStatusBadge from "./BookStatusBadge.jsx";

function BookDetailsDialog({
                               book,
                               open,
                               onOpenChange,
                           }) {
    if (!book) return null;

    const chapterCount = Array.isArray(book.chapters)
        ? book.chapters.length
        : Number(book.chapters) || 0;

    const characterCount = Array.isArray(book.characters)
        ? book.characters.length
        : Number(book.characters) || 0;

    const galleryCount = Array.isArray(book.gallery)
        ? book.gallery.length
        : Number(book.gallery) || 0;

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto border-white/[0.08] bg-[#0d0d0d] text-white">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-white">
                        Kitap Detayları
                    </DialogTitle>

                    <DialogDescription className="text-white/40">
                        Kitabın mevcut bilgilerini görüntüleyin.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-6">
                    {/* HEADER */}
                    <div className="flex flex-col gap-5 sm:flex-row">
                        <div className="h-56 w-40 shrink-0 overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.03]">
                            {book.image ? (
                                <img
                                    src={book.image}
                                    alt={book.title}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center text-sm text-white/20">
                                    Kapak yok
                                </div>
                            )}
                        </div>

                        <div className="flex min-w-0 flex-1 flex-col justify-between">
                            <div>
                                <h2 className="text-2xl font-semibold text-white">
                                    {book.title}
                                </h2>

                                <p className="mt-1 text-sm text-white/40">
                                    /{book.slug}
                                </p>

                                <div className="mt-4">
                                    <BookStatusBadge
                                        status={book.status}
                                    />
                                </div>
                            </div>

                            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
                                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                                    <p className="text-xs text-white/30">
                                        Bölüm
                                    </p>

                                    <p className="mt-1 text-lg font-semibold text-white">
                                        {chapterCount}
                                    </p>
                                </div>

                                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                                    <p className="text-xs text-white/30">
                                        Karakter
                                    </p>

                                    <p className="mt-1 text-lg font-semibold text-white">
                                        {characterCount}
                                    </p>
                                </div>

                                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                                    <p className="text-xs text-white/30">
                                        Galeri
                                    </p>

                                    <p className="mt-1 text-lg font-semibold text-white">
                                        {galleryCount}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* BASIC INFO */}
                    <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
                        <h3 className="mb-4 text-sm font-medium text-white">
                            Temel Bilgiler
                        </h3>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <div className="flex items-center gap-2 text-xs text-white/30">
                                    <User className="h-3.5 w-3.5" />
                                    Yazar
                                </div>

                                <p className="mt-1 text-sm text-white/70">
                                    {book.author || "—"}
                                </p>
                            </div>

                            <div>
                                <div className="flex items-center gap-2 text-xs text-white/30">
                                    <BookOpen className="h-3.5 w-3.5" />
                                    Kategori
                                </div>

                                <p className="mt-1 text-sm text-white/70">
                                    {book.category || "—"}
                                </p>
                            </div>

                            <div>
                                <div className="flex items-center gap-2 text-xs text-white/30">
                                    <Layers className="h-3.5 w-3.5" />
                                    Seri
                                </div>

                                <p className="mt-1 text-sm text-white/70">
                                    {book.series || "Bağımsız"}
                                </p>
                            </div>

                            <div>
                                <div className="flex items-center gap-2 text-xs text-white/30">
                                    <CalendarDays className="h-3.5 w-3.5" />
                                    Seri sırası
                                </div>

                                <p className="mt-1 text-sm text-white/70">
                                    {book.order || "—"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* DESCRIPTION */}
                    <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
                        <h3 className="mb-3 text-sm font-medium text-white">
                            Açıklama
                        </h3>

                        <p className="whitespace-pre-line text-sm leading-7 text-white/50">
                            {book.description || "Açıklama eklenmemiş."}
                        </p>
                    </div>

                    {/* THEME */}
                    {book.theme && (
                        <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-5">
                            <h3 className="mb-4 text-sm font-medium text-white">
                                Kitap Teması
                            </h3>

                            <div className="grid grid-cols-3 gap-3">
                                <div>
                                    <div
                                        className="h-12 rounded-lg border border-white/[0.08]"
                                        style={{
                                            backgroundColor:
                                            book.theme.background,
                                        }}
                                    />

                                    <p className="mt-2 text-xs text-white/30">
                                        Arka plan
                                    </p>

                                    <p className="mt-0.5 text-xs text-white/50">
                                        {book.theme.background}
                                    </p>
                                </div>

                                <div>
                                    <div
                                        className="h-12 rounded-lg border border-white/[0.08]"
                                        style={{
                                            backgroundColor:
                                            book.theme.accent,
                                        }}
                                    />

                                    <p className="mt-2 text-xs text-white/30">
                                        Vurgu
                                    </p>

                                    <p className="mt-0.5 text-xs text-white/50">
                                        {book.theme.accent}
                                    </p>
                                </div>

                                <div>
                                    <div
                                        className="h-12 rounded-lg border border-white/[0.08]"
                                        style={{
                                            backgroundColor:
                                            book.theme.muted,
                                        }}
                                    />

                                    <p className="mt-2 text-xs text-white/30">
                                        Soluk
                                    </p>

                                    <p className="mt-0.5 text-xs text-white/50">
                                        {book.theme.muted}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* FEATURED */}
                    <div className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
                        <div>
                            <p className="text-sm font-medium text-white">
                                Öne Çıkan Kitap
                            </p>

                            <p className="mt-1 text-xs text-white/30">
                                Bu kitap ana sayfada öne çıkarılır.
                            </p>
                        </div>

                        <BookStatusBadge
                            variant="outline"
                            className={
                                book.featured
                                    ? "border-white/20 bg-white/10 text-white"
                                    : "border-white/10 text-white/30"
                            }
                        >
                            {book.featured
                                ? "Öne Çıkan"
                                : "Normal"}
                        </BookStatusBadge>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default BookDetailsDialog;
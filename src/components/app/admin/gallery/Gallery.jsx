import { useEffect, useMemo, useState } from "react";
import {
    ImagePlus,
    Eye,
    Pencil,
    Trash2,
} from "lucide-react";

import { books as initialBooks } from "@/data/books.js";

import AdminPageHeader from "@/components/common/admin/AdminPageHeader.jsx";
import AdminFilters from "@/components/common/admin/AdminFilters.jsx";
import AdminConfirmDialog from "@/components/common/admin/AdminConfirmDialog.jsx";
import AdminDialog from "@/components/common/admin/AdminDialog.jsx";

import GalleryForm from "./GalleryForm.jsx";
import GalleryGrid from "./GalleryGrid.jsx";

const STORAGE_KEY = "adminGallery";

const getInitialGallery = () => {
    return initialBooks.flatMap((book) =>
        (book.gallery || []).map((item, index) => ({
            id:
                item.id ??
                `${book.id}-${index + 1}`,
            bookId: book.id,
            bookSlug: book.slug,
            bookTitle: book.title,
            image: item.image,
            title: item.title ?? "",
            description: item.description ?? "",
            type: "official",
            status: "approved",
        }))
    );
};

function Gallery() {
    const [gallery, setGallery] = useState(
        () => {
            try {
                const stored =
                    localStorage.getItem(
                        STORAGE_KEY
                    );

                if (stored) {
                    return JSON.parse(stored);
                }

                return getInitialGallery();
            } catch {
                return getInitialGallery();
            }
        }
    );

    const [search, setSearch] =
        useState("");

    const [activeBook, setActiveBook] =
        useState("all");

    const [dialogOpen, setDialogOpen] =
        useState(false);

    const [previewItem, setPreviewItem] =
        useState(null);

    const [deleteItem, setDeleteItem] =
        useState(null);

    const [editingItem, setEditingItem] =
        useState(null);

    useEffect(() => {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(gallery)
        );
    }, [gallery]);

    const bookOptions = useMemo(() => {
        return initialBooks.map((book) => ({
            value: String(book.id),
            label: book.title,
        }));
    }, []);

    const filteredGallery = useMemo(() => {
        const normalizedSearch =
            search.trim().toLowerCase();

        return gallery.filter((item) => {
            const matchesSearch =
                !normalizedSearch ||
                item.title
                    ?.toLowerCase()
                    .includes(normalizedSearch) ||
                item.bookTitle
                    ?.toLowerCase()
                    .includes(normalizedSearch);

            const matchesBook =
                activeBook === "all" ||
                String(item.bookId) ===
                activeBook;

            return (
                matchesSearch &&
                matchesBook
            );
        });
    }, [
        gallery,
        search,
        activeBook,
    ]);

    const handleAdd = () => {
        setEditingItem(null);
        setDialogOpen(true);
    };

    const handleEdit = (item) => {
        setEditingItem(item);
        setDialogOpen(true);
    };

    const handleSave = (formData) => {
        const selectedBook =
            initialBooks.find(
                (book) =>
                    book.id ===
                    formData.bookId
            );

        if (!selectedBook) {
            return;
        }

        if (editingItem) {
            setGallery((current) =>
                current.map((item) =>
                    item.id ===
                    editingItem.id
                        ? {
                            ...item,
                            ...formData,
                            bookTitle:
                            selectedBook.title,
                            bookSlug:
                            selectedBook.slug,
                            status:
                                item.status ??
                                "approved",
                        }
                        : item
                )
            );

            setDialogOpen(false);
            return;
        }

        const newItem = {
            id: Date.now(),

            ...formData,

            bookTitle:
            selectedBook.title,

            bookSlug:
            selectedBook.slug,

            type: "official",

            status: "approved",

            createdAt:
                new Date().toISOString(),

            updatedAt:
                new Date().toISOString(),
        };

        setGallery((current) => [
            newItem,
            ...current,
        ]);

        setDialogOpen(false);
    };

    const handleDelete = () => {
        if (!deleteItem) {
            return;
        }

        setGallery((current) =>
            current.filter(
                (item) =>
                    item.id !==
                    deleteItem.id
            )
        );

        setDeleteItem(null);
    };

    return (
        <div className="mx-auto max-w-[1440px]">
            <AdminPageHeader
                eyebrow="İçerik Yönetimi"
                title="Galeri"
                description="Kitaplara ait görselleri yönetin, düzenleyin ve yayınlayın."
                action={{
                    label: "Görsel Ekle",
                    icon: (
                        <ImagePlus className="h-4 w-4" />
                    ),
                    onClick: handleAdd,
                }}
            />

            <div className="mt-8">
                <AdminFilters
                    search={search}
                    onSearchChange={setSearch}
                    searchPlaceholder="Görsel veya kitap ara..."
                    filters={[
                        {
                            key: "book",
                            value: activeBook,
                            onChange:
                            setActiveBook,
                            placeholder:
                                "Kitap",
                            options: [
                                {
                                    value: "all",
                                    label:
                                        "Tüm Kitaplar",
                                },
                                ...bookOptions,
                            ],
                        },
                    ]}
                />
            </div>

            <div className="mt-6">
                <GalleryGrid
                    items={filteredGallery}
                    onPreview={setPreviewItem}
                    onEdit={handleEdit}
                    onDelete={setDeleteItem}
                />
            </div>

            <AdminDialog
                open={dialogOpen}
                onOpenChange={
                    setDialogOpen
                }
                title={
                    editingItem
                        ? "Görseli Düzenle"
                        : "Yeni Görsel"
                }
            >
                <GalleryForm
                    books={initialBooks}
                    galleryItem={
                        editingItem
                    }
                    onSave={handleSave}
                    onCancel={() =>
                        setDialogOpen(false)
                    }
                />
            </AdminDialog>

            {/* PREVIEW */}

            <AdminDialog
                open={Boolean(
                    previewItem
                )}
                onOpenChange={(open) => {
                    if (!open) {
                        setPreviewItem(
                            null
                        );
                    }
                }}
                title={
                    previewItem?.title ||
                    "Görsel Önizleme"
                }
                className="sm:max-w-[900px]"
            >
                {previewItem && (
                    <div className="space-y-4">
                        <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-black">
                            <img
                                src={
                                    previewItem.image
                                }
                                alt={
                                    previewItem.title ||
                                    previewItem.bookTitle
                                }
                                className="max-h-[70vh] w-full object-contain"
                            />
                        </div>

                        <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-white/25">
                                Kitap
                            </p>

                            <p className="mt-1 text-sm text-white/70">
                                {
                                    previewItem.bookTitle
                                }
                            </p>
                        </div>
                    </div>
                )}
            </AdminDialog>

            {/* DELETE */}

            <AdminConfirmDialog
                open={Boolean(
                    deleteItem
                )}
                onOpenChange={(open) => {
                    if (!open) {
                        setDeleteItem(
                            null
                        );
                    }
                }}
                title="Görseli sil"
                description={`"${deleteItem?.title || "Bu görsel"}" görselini silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`}
                onConfirm={
                    handleDelete
                }
            />
        </div>
    );
}

export default Gallery;
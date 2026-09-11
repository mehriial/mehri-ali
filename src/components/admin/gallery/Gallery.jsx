import { useMemo, useState } from "react";

import GalleryHeader from "./GalleryHeader.jsx";
import GalleryFilters from "./GalleryFilters.jsx";
import GalleryGrid from "./GalleryGrid.jsx";
import DeleteGalleryDialog from "./DeleteGalleryDialog.jsx";
import GalleryForm from "./GalleryForm.jsx";

import { books as initialBooks } from "@/data/books";

function Gallery() {
    const [books, setBooks] = useState(initialBooks);

    const [showForm, setShowForm] = useState(false);
    const [editingImage, setEditingImage] = useState(null);

    const [deleteImage, setDeleteImage] = useState(null);

    const [search, setSearch] = useState("");
    const [selectedBook, setSelectedBook] = useState("all");

    const galleryItems = useMemo(() => {
        return books.flatMap((book) => {
            if (!Array.isArray(book.gallery)) {
                return [];
            }

            return book.gallery.map((image, index) => {
                if (typeof image === "string") {
                    return {
                        id: `${book.id}-${index}`,
                        bookId: book.id,
                        bookTitle: book.title,
                        image,
                        title: "",
                        description: "",
                        featured: false,
                    };
                }

                return {
                    id: image.id ?? `${book.id}-${index}`,
                    bookId: book.id,
                    bookTitle: book.title,
                    image: image.image ?? image.src ?? "",
                    title: image.title ?? "",
                    description: image.description ?? "",
                    featured: Boolean(image.featured),
                };
            });
        });
    }, [books]);

    const filteredItems = useMemo(() => {
        const searchValue = search.toLowerCase().trim();

        return galleryItems.filter((item) => {
            const matchesSearch =
                !searchValue ||
                item.title.toLowerCase().includes(searchValue) ||
                item.bookTitle.toLowerCase().includes(searchValue);

            const matchesBook =
                selectedBook === "all" ||
                String(item.bookId) === selectedBook;

            return matchesSearch && matchesBook;
        });
    }, [galleryItems, search, selectedBook]);

    const handleCreate = () => {
        setEditingImage(null);
        setShowForm(true);
    };

    const handleEdit = (image) => {
        setEditingImage(image);
        setShowForm(true);
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingImage(null);
    };

    const handleSubmit = (data) => {
        setBooks((currentBooks) => {
            return currentBooks.map((book) => {
                if (Number(book.id) !== Number(data.bookId)) {
                    return book;
                }

                const currentGallery = Array.isArray(book.gallery)
                    ? book.gallery
                    : [];

                if (editingImage) {
                    const updatedGallery = currentGallery.map(
                        (image, index) => {
                            const imageId =
                                typeof image === "string"
                                    ? `${book.id}-${index}`
                                    : image.id ?? `${book.id}-${index}`;

                            if (
                                String(imageId) !==
                                String(editingImage.id)
                            ) {
                                return image;
                            }

                            return {
                                ...image,
                                id: editingImage.id,
                                image:
                                    data.image ??
                                    (typeof image === "string"
                                        ? image
                                        : image.image),
                                title: data.title,
                                description: data.description,
                                featured: data.featured,
                            };
                        }
                    );

                    return {
                        ...book,
                        gallery: updatedGallery,
                    };
                }

                const newImage = {
                    id: Date.now(),
                    image: data.image,
                    title: data.title,
                    description: data.description,
                    featured: data.featured,
                };

                return {
                    ...book,
                    gallery: [...currentGallery, newImage],
                };
            });
        });

        handleCancel();
    };

    const handleDelete = () => {
        if (!deleteImage) return;

        setBooks((currentBooks) => {
            return currentBooks.map((book) => {
                if (Number(book.id) !== Number(deleteImage.bookId)) {
                    return book;
                }

                const currentGallery = Array.isArray(book.gallery)
                    ? book.gallery
                    : [];

                const filteredGallery = currentGallery.filter(
                    (image, index) => {
                        const imageId =
                            typeof image === "string"
                                ? `${book.id}-${index}`
                                : image.id ?? `${book.id}-${index}`;

                        return (
                            String(imageId) !==
                            String(deleteImage.id)
                        );
                    }
                );

                return {
                    ...book,
                    gallery: filteredGallery,
                };
            });
        });

        setDeleteImage(null);
    };

    if (showForm) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-white">
                        {editingImage
                            ? "Galeriyi Düzenle"
                            : "Yeni Görsel"}
                    </h1>

                    <p className="mt-1 text-sm text-white/40">
                        {editingImage
                            ? "Galeri görselinin bilgilerini güncelleyin."
                            : "Kitabınıza yeni bir galeri görseli ekleyin."}
                    </p>
                </div>

                <GalleryForm
                    image={editingImage}
                    books={books}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <GalleryHeader onCreate={handleCreate} />

            <GalleryFilters
                search={search}
                selectedBook={selectedBook}
                books={books}
                onSearchChange={setSearch}
                onBookChange={setSelectedBook}
                onClear={() => {
                    setSearch("");
                    setSelectedBook("all");
                }}
            />

            <GalleryGrid
                items={filteredItems}
                onEdit={handleEdit}
                onDelete={setDeleteImage}
            />

            <DeleteGalleryDialog
                image={deleteImage}
                open={Boolean(deleteImage)}
                onOpenChange={(open) => {
                    if (!open) {
                        setDeleteImage(null);
                    }
                }}
                onConfirm={handleDelete}
            />
        </div>
    );
}

export default Gallery;
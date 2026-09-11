import { useState } from "react";

import BooksHeader from "@/components/admin/books/BooksHeader.jsx";
import BooksFilters from "@/components/admin/books/BooksFilters.jsx";
import DeleteBookDialog from "@/components/admin/books/DeleteBookDialog.jsx";
import BooksTable from "@/components/admin/books/BooksTable.jsx";
import BookForm from "@/components/admin/books/BookForm.jsx";

import { books as initialBooks } from "@/data/books";
import BookDetailsDialog from "@/components/admin/books/BookDetailsDialog.jsx";

function Books() {
    const [books, setBooks] = useState(initialBooks);

    const [showForm, setShowForm] = useState(false);
    const [editingBook, setEditingBook] = useState(null);

    const [viewBook, setViewBook] = useState(null);
    const [deleteBook, setDeleteBook] = useState(null);

    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [status, setStatus] = useState("all");

    const filteredBooks = books.filter((book) => {
        const searchValue = search.toLowerCase().trim();

        const matchesSearch =
            !searchValue ||
            book.title?.toLowerCase().includes(searchValue) ||
            book.author?.toLowerCase().includes(searchValue) ||
            book.slug?.toLowerCase().includes(searchValue);

        const matchesCategory =
            category === "all" || book.category === category;

        const matchesStatus =
            status === "all" || book.status === status;

        return matchesSearch && matchesCategory && matchesStatus;
    });

    const categories = [
        ...new Set(
            books
                .map((book) => book.category)
                .filter(Boolean)
        ),
    ];

    const statuses = [
        ...new Set(
            books
                .map((book) => book.status)
                .filter(Boolean)
        ),
    ];

    // =========================
    // CREATE
    // =========================

    const handleCreate = () => {
        setEditingBook(null);
        setShowForm(true);
    };

    // =========================
    // EDIT
    // =========================

    const handleEdit = (book) => {
        if (!book) return;

        setViewBook(null);
        setEditingBook(book);
        setShowForm(true);
    };

    // =========================
    // VIEW
    // =========================

    const handleView = (book) => {
        if (!book) return;

        setViewBook(book);
    };

    // =========================
    // CANCEL FORM
    // =========================

    const handleCancel = () => {
        setShowForm(false);
        setEditingBook(null);
    };

    // =========================
    // SAVE
    // =========================

    const handleSubmit = (data) => {
        if (editingBook) {
            setBooks((currentBooks) =>
                currentBooks.map((book) =>
                    book.id === editingBook.id
                        ? {
                            ...book,
                            ...data,
                        }
                        : book
                )
            );
        } else {
            const newBook = {
                ...data,
                id: Date.now(),
                chapters: [],
                characters: [],
                gallery: [],
            };

            setBooks((currentBooks) => [
                ...currentBooks,
                newBook,
            ]);
        }

        handleCancel();
    };

    // =========================
    // DELETE
    // =========================

    const handleDelete = () => {
        if (!deleteBook) return;

        setBooks((currentBooks) =>
            currentBooks.filter(
                (book) => book.id !== deleteBook.id
            )
        );

        setDeleteBook(null);
    };

    // =========================
    // FORM VIEW
    // =========================

    if (showForm) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-semibold text-white">
                        {editingBook
                            ? "Kitabı Düzenle"
                            : "Yeni Kitap"}
                    </h1>

                    <p className="mt-1 text-sm text-white/40">
                        {editingBook
                            ? "Kitap bilgilerini güncelleyin."
                            : "Yeni bir kitap oluşturun."}
                    </p>
                </div>

                <BookForm
                    book={editingBook}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <BooksHeader onCreate={handleCreate} />

            <BooksFilters
                search={search}
                category={category}
                status={status}
                categories={categories}
                statuses={statuses}
                onSearchChange={setSearch}
                onCategoryChange={setCategory}
                onStatusChange={setStatus}
                onClear={() => {
                    setSearch("");
                    setCategory("all");
                    setStatus("all");
                }}
            />

            <BooksTable
                books={filteredBooks}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={setDeleteBook}
            />

            <DeleteBookDialog
                book={deleteBook}
                open={Boolean(deleteBook)}
                onOpenChange={(open) => {
                    if (!open) {
                        setDeleteBook(null);
                    }
                }}
                onConfirm={handleDelete}
            />

            <BookDetailsDialog
                book={viewBook}
                open={Boolean(viewBook)}
                onOpenChange={(open) => {
                    if (!open) {
                        setViewBook(null);
                    }
                }}
            />
        </div>
    );
}

export default Books;
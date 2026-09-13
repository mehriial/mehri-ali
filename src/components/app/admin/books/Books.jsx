import { useEffect, useMemo, useState } from "react";
import { Plus } from 'lucide-react';

import { books as initialBooks } from "@/data/books.js";


import BookFormDialog from "./BookFormDialog.jsx";
import AdminPageHeader from "@/components/common/admin/AdminPageHeader.jsx";
import AdminFilters from "@/components/common/admin/AdminFilters.jsx";
import AdminTableActions from "@/components/common/admin/AdminTableActions.jsx";
import AdminTable from "@/components/common/admin/AdminTable.jsx";

const STORAGE_KEY = "adminBooks";

function Books() {
    const [books, setBooks] = useState(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);

            if (stored) {
                return JSON.parse(stored);
            }

            return initialBooks;
        } catch {
            return initialBooks;
        }
    });

    const [search, setSearch] = useState("");
    const [activeSeries, setActiveSeries] = useState("all");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [editingBook, setEditingBook] = useState(null);

    useEffect(() => {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(books)
        );
    }, [books]);

    const series = useMemo(() => {
        return [
            ...new Set(
                books
                    .map((book) => book.series)
                    .filter(Boolean)
            ),
        ];
    }, [books]);

    const filteredBooks = useMemo(() => {
        const normalizedSearch = search
            .trim()
            .toLowerCase();

        return books.filter((book) => {
            const matchesSearch =
                !normalizedSearch ||
                book.title
                    ?.toLowerCase()
                    .includes(normalizedSearch) ||
                book.author
                    ?.toLowerCase()
                    .includes(normalizedSearch);

            const matchesSeries =
                activeSeries === "all" ||
                book.series === activeSeries;

            return matchesSearch && matchesSeries;
        });
    }, [books, search, activeSeries]);

    const handleAdd = () => {
        setEditingBook(null);
        setDialogOpen(true);
    };

    const handleEdit = (book) => {
        setEditingBook(book);
        setDialogOpen(true);
    };

    const handleSave = (bookData) => {
        if (editingBook) {
            setBooks((current) =>
                current.map((book) =>
                    book.id === editingBook.id
                        ? {
                            ...book,
                            ...bookData,
                        }
                        : book
                )
            );

            return;
        }

        const newBook = {
            id: Date.now(),
            ...bookData,
        };

        setBooks((current) => [
            newBook,
            ...current,
        ]);
    };

    const handleDelete = (id) => {
        const confirmed = window.confirm(
            "Bu kitabı silmek istediğinize emin misiniz?"
        );

        if (!confirmed) {
            return;
        }

        setBooks((current) =>
            current.filter((book) => book.id !== id)
        );
    };

    return (
        <div className="mx-auto max-w-[1440px]">
            <AdminPageHeader
                eyebrow="İçerik Yönetimi"
                title="Kitaplar"
                description="Kitaplarınızı ve serilerinizi yönetin."
                action={{
                    label: "Yeni Kitap",
                    icon: <Plus className="h-4 w-4"/>,
                    onClick: handleAdd,
                }}
            />

            <div className="mt-8">
                <AdminFilters
                    search={search}
                    onSearchChange={setSearch}
                    searchPlaceholder="Kitap ara..."
                    filters={[
                        {
                            key: "series",
                            value: activeSeries,
                            onChange: setActiveSeries,
                            placeholder: "Seri seçin",
                            options: [
                                {
                                    value: "all",
                                    label: "Tüm Seriler",
                                },
                                ...series.map((item) => ({
                                    value: item,
                                    label: item,
                                })),
                            ],
                        },
                    ]}
                />
            </div>

            <div className="mt-6">
                <AdminTable
                    columns={[
                        {
                            key: "title",
                            label: "Kitap",
                        },
                        {
                            key: "series",
                            label: "Seri",
                        },
                        {
                            key: "status",
                            label: "Durum",
                        },
                    ]}
                    data={books}
                    renderCell={(book, column) => {
                        // xüsusi cell
                    }}
                    actions={(book) => (
                        <AdminTableActions
                            onEdit={() => handleEdit(book)}
                            onDelete={() => handleDelete(book.id)}
                        />
                    )}
                />
            </div>

            <BookFormDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                book={editingBook}
                onSave={handleSave}
            />
        </div>
    );
}

export default Books;
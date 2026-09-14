import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";

import { books as initialBooks } from "@/data/books.js";
import { initialChapters } from "@/data/chapters.js";

import AdminPageHeader from "@/components/common/admin/AdminPageHeader.jsx";
import AdminFilters from "@/components/common/admin/AdminFilters.jsx";
import AdminTable from "@/components/common/admin/AdminTable.jsx";
import AdminTableActions from "@/components/common/admin/AdminTableActions.jsx";
import AdminDialog from "@/components/common/admin/AdminDialog.jsx";

import ChapterForm from "./ChapterForm.jsx";

const STORAGE_KEY = "adminChapters";

function Chapters() {
    const [chapters, setChapters] = useState(() => {
        try {
            const stored =
                localStorage.getItem(STORAGE_KEY);

            if (stored) {
                return JSON.parse(stored);
            }

            return initialChapters;
        } catch {
            return initialChapters;
        }
    });

    const [search, setSearch] = useState("");
    const [activeBook, setActiveBook] = useState("all");
    const [activeStatus, setActiveStatus] =
        useState("all");

    const [dialogOpen, setDialogOpen] =
        useState(false);

    const [editingChapter, setEditingChapter] =
        useState(null);

    useEffect(() => {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(chapters)
        );
    }, [chapters]);

    const bookOptions = useMemo(() => {
        return initialBooks.map((book) => ({
            value: String(book.id),
            label: book.title,
        }));
    }, []);

    const filteredChapters = useMemo(() => {
        const normalizedSearch =
            search.trim().toLowerCase();

        return chapters.filter((chapter) => {
            const matchesSearch =
                !normalizedSearch ||
                chapter.title
                    ?.toLowerCase()
                    .includes(normalizedSearch) ||
                chapter.bookTitle
                    ?.toLowerCase()
                    .includes(normalizedSearch);

            const matchesBook =
                activeBook === "all" ||
                String(chapter.bookId) === activeBook;

            const matchesStatus =
                activeStatus === "all" ||
                chapter.status === activeStatus;

            return (
                matchesSearch &&
                matchesBook &&
                matchesStatus
            );
        });
    }, [
        chapters,
        search,
        activeBook,
        activeStatus,
    ]);

    const handleAdd = () => {
        setEditingChapter(null);
        setDialogOpen(true);
    };

    const handleEdit = (chapter) => {
        setEditingChapter(chapter);
        setDialogOpen(true);
    };

    const handleSave = (chapterData) => {
        const selectedBook = initialBooks.find(
            (book) => book.id === chapterData.bookId
        );

        if (!selectedBook) {
            return;
        }

        if (editingChapter) {
            setChapters((current) =>
                current.map((chapter) =>
                    chapter.id === editingChapter.id
                        ? {
                            ...chapter,
                            ...chapterData,
                            bookTitle:
                            selectedBook.title,
                            bookSlug:
                            selectedBook.slug,
                            updatedAt:
                                new Date().toISOString(),
                        }
                        : chapter
                )
            );

            setDialogOpen(false);
            return;
        }

        const newChapter = {
            id: Date.now(),
            ...chapterData,
            bookTitle: selectedBook.title,
            bookSlug: selectedBook.slug,
            createdAt:
                new Date().toISOString(),
            updatedAt:
                new Date().toISOString(),
        };

        setChapters((current) => [
            newChapter,
            ...current,
        ]);

        setDialogOpen(false);
    };

    const handleDelete = (id) => {
        const confirmed = window.confirm(
            "Bu bölümü silmek istediğinize emin misiniz?"
        );

        if (!confirmed) {
            return;
        }

        setChapters((current) =>
            current.filter(
                (chapter) => chapter.id !== id
            )
        );
    };

    return (
        <div className="mx-auto max-w-[1440px]">
            <AdminPageHeader
                eyebrow="İçerik Yönetimi"
                title="Bölümler"
                description="Kitap bölümlerini yönetin, düzenleyin ve yayın durumlarını kontrol edin."
                action={{
                    label: "Bölüm Ekle",
                    icon: <Plus className="h-4 w-4" />,
                    onClick: handleAdd,
                }}
            />

            <div className="mt-8">
                <AdminFilters
                    search={search}
                    onSearchChange={setSearch}
                    searchPlaceholder="Bölüm veya kitap ara..."
                    filters={[
                        {
                            key: "book",
                            value: activeBook,
                            onChange: setActiveBook,
                            placeholder: "Kitap",
                            options: [
                                {
                                    value: "all",
                                    label: "Tüm Kitaplar",
                                },
                                ...bookOptions,
                            ],
                        },
                        {
                            key: "status",
                            value: activeStatus,
                            onChange: setActiveStatus,
                            placeholder: "Durum",
                            options: [
                                {
                                    value: "all",
                                    label: "Tüm Durumlar",
                                },
                                {
                                    value: "published",
                                    label: "Yayında",
                                },
                                {
                                    value: "draft",
                                    label: "Taslak",
                                },
                            ],
                        },
                    ]}
                />
            </div>

            <div className="mt-6">
                <AdminTable
                    columns={[
                        {
                            key: "chapterNumber",
                            label: "No",
                            render: (chapter) => (
                                <span className="font-medium text-white">
                                    {chapter.chapterNumber}
                                </span>
                            ),
                        },
                        {
                            key: "title",
                            label: "Bölüm",
                            render: (chapter) => (
                                <div>
                                    <p className="font-medium text-white">
                                        {chapter.title}
                                    </p>

                                    <p className="mt-1 text-xs text-white/30">
                                        {chapter.bookTitle}
                                    </p>
                                </div>
                            ),
                        },
                        {
                            key: "status",
                            label: "Durum",
                            render: (chapter) => (
                                <span
                                    className={
                                        chapter.status ===
                                        "published"
                                            ? "rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400"
                                            : "rounded-full bg-amber-500/10 px-3 py-1 text-xs text-amber-400"
                                    }
                                >
                                    {chapter.status ===
                                    "published"
                                        ? "Yayında"
                                        : "Taslak"}
                                </span>
                            ),
                        },
                    ]}
                    data={filteredChapters}
                    getRowKey={(chapter) =>
                        chapter.id
                    }
                    actions={(chapter) => (
                        <AdminTableActions
                            onEdit={() =>
                                handleEdit(chapter)
                            }
                            onDelete={() =>
                                handleDelete(
                                    chapter.id
                                )
                            }
                        />
                    )}
                    emptyMessage="Bölüm bulunamadı."
                />
            </div>

            <AdminDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                title={
                    editingChapter
                        ? "Bölümü Düzenle"
                        : "Yeni Bölüm"
                }
            >
                <ChapterForm
                    books={initialBooks}
                    chapter={editingChapter}
                    onSave={handleSave}
                    onCancel={() =>
                        setDialogOpen(false)
                    }
                />
            </AdminDialog>
        </div>
    );
}

export default Chapters;
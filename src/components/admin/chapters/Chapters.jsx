import { useMemo, useState } from "react";

import ChaptersHeader from "./ChaptersHeader.jsx";
import ChaptersTable from "./ChaptersTable.jsx";
import DeleteChapterDialog from "./DeleteChapterDialog.jsx";
import ChapterForm from "./ChapterForm.jsx";

import { books as initialBooks } from "@/data/books";
import ChaptersFilters from "@/components/admin/chapters/ChapterFilters.jsx";

function Chapters() {
    const [books, setBooks] = useState(initialBooks);

    const [showForm, setShowForm] = useState(false);
    const [editingChapter, setEditingChapter] = useState(null);

    const [deleteChapter, setDeleteChapter] = useState(null);

    const [search, setSearch] = useState("");
    const [selectedBook, setSelectedBook] = useState("all");

    const chapters = useMemo(() => {
        return books.flatMap((book) => {
            if (!Array.isArray(book.chapters)) {
                return [];
            }

            return book.chapters.map((chapter) => ({
                ...chapter,
                bookId: book.id,
                bookTitle: book.title,
                bookImage: book.image,
            }));
        });
    }, [books]);

    const filteredChapters = useMemo(() => {
        const searchValue = search.toLowerCase().trim();

        return chapters.filter((chapter) => {
            const matchesSearch =
                !searchValue ||
                String(chapter.number)
                    .toLowerCase()
                    .includes(searchValue) ||
                chapter.title
                    ?.toLowerCase()
                    .includes(searchValue) ||
                chapter.bookTitle
                    ?.toLowerCase()
                    .includes(searchValue);

            const matchesBook =
                selectedBook === "all" ||
                String(chapter.bookId) === String(selectedBook);

            return matchesSearch && matchesBook;
        });
    }, [chapters, search, selectedBook]);

    const handleCreate = () => {
        setEditingChapter(null);
        setShowForm(true);
    };

    const handleEdit = (chapter) => {
        if (!chapter) return;

        setEditingChapter(chapter);
        setShowForm(true);
    };

    const handleCancel = () => {
        setShowForm(false);
        setEditingChapter(null);
    };

    const handleSubmit = (data) => {
        const bookId = Number(data.bookId);

        if (!bookId) return;

        if (editingChapter) {
            setBooks((currentBooks) =>
                currentBooks.map((book) => {
                    const hasOldChapter =
                        Array.isArray(book.chapters) &&
                        book.chapters.some(
                            (chapter) =>
                                chapter.id === editingChapter.id
                        );

                    const isTargetBook = book.id === bookId;

                    if (hasOldChapter && isTargetBook) {
                        return {
                            ...book,
                            chapters: book.chapters.map(
                                (chapter) =>
                                    chapter.id ===
                                    editingChapter.id
                                        ? {
                                            ...chapter,
                                            number: Number(
                                                data.number
                                            ),
                                            title: data.title,
                                            publishedAt:
                                            data.publishedAt,
                                            content:
                                                data.content || [],
                                        }
                                        : chapter
                            ),
                        };
                    }

                    if (hasOldChapter && !isTargetBook) {
                        return {
                            ...book,
                            chapters: book.chapters.filter(
                                (chapter) =>
                                    chapter.id !==
                                    editingChapter.id
                            ),
                        };
                    }

                    if (
                        !hasOldChapter &&
                        isTargetBook
                    ) {
                        return {
                            ...book,
                            chapters: [
                                ...(book.chapters || []),
                                {
                                    id: editingChapter.id,
                                    number: Number(data.number),
                                    title: data.title,
                                    publishedAt:
                                    data.publishedAt,
                                    content:
                                        data.content || [],
                                },
                            ],
                        };
                    }

                    return book;
                })
            );
        } else {
            const newChapter = {
                id: Date.now(),
                number: Number(data.number),
                title: data.title,
                publishedAt: data.publishedAt,
                content: data.content,
            };

            setBooks((currentBooks) =>
                currentBooks.map((book) =>
                    book.id === bookId
                        ? {
                            ...book,
                            chapters: [
                                ...(book.chapters || []),
                                newChapter,
                            ],
                        }
                        : book
                )
            );
        }

        handleCancel();
    };

    const handleDelete = () => {
        if (!deleteChapter) return;

        setBooks((currentBooks) =>
            currentBooks.map((book) => ({
                ...book,
                chapters: Array.isArray(book.chapters)
                    ? book.chapters.filter(
                        (chapter) =>
                            chapter.id !==
                            deleteChapter.id
                    )
                    : [],
            }))
        );

        setDeleteChapter(null);
    };

    if (showForm) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-semibold text-white">
                        {editingChapter
                            ? "Bölümü Düzenle"
                            : "Yeni Bölüm"}
                    </h1>

                    <p className="mt-1 text-sm text-white/40">
                        {editingChapter
                            ? "Bölüm bilgilerini güncelleyin."
                            : "Yeni bir bölüm oluşturun."}
                    </p>
                </div>

                <ChapterForm
                    chapter={editingChapter}
                    books={books}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <ChaptersHeader
                onCreate={handleCreate}
            />

            <ChaptersFilters
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

            <ChaptersTable
                chapters={filteredChapters}
                onEdit={handleEdit}
                onDelete={setDeleteChapter}
            />

            <DeleteChapterDialog
                chapter={deleteChapter}
                open={Boolean(deleteChapter)}
                onOpenChange={(open) => {
                    if (!open) {
                        setDeleteChapter(null);
                    }
                }}
                onConfirm={handleDelete}
            />
        </div>
    );
}

export default Chapters;
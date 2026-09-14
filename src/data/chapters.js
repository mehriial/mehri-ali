import { books } from "./books.js";

export const initialChapters = books.flatMap((book) =>
    (book.chapters || []).map((chapter, index) => ({
        id: `${book.id}-${index + 1}`,
        bookId: book.id,
        bookSlug: book.slug,
        bookTitle: book.title,
        chapterNumber: chapter.number ?? index + 1,
        title: chapter.title ?? `Bölüm ${index + 1}`,
        status: chapter.status ?? "published",
        content: chapter.content ?? "",
        createdAt: chapter.createdAt ?? "",
        updatedAt: chapter.updatedAt ?? "",
    }))
);
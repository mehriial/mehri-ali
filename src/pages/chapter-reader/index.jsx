import { Link, useParams } from "react-router-dom";

import { books, chapters } from "../../consts/index.js";
import Button from "../../components/ui/Button.jsx";

import ChapterHeader from "../../components/base/chapter/ChapterHeader.jsx";
import ChapterContent from "../../components/base/chapter/ChapterContent.jsx";
import CommentSection from "../../components/base/chapter/CommentSection.jsx";
import ChapterNavigation from "../../components/base/chapter/ChapterNavigation.jsx";

const ChapterReader = () => {
    const { id, chapterId } = useParams();

    /*
     * Kitabı bul
     */

    const book = books.find(
        (item) =>
            item.id.toString() === id ||
            item.href === `/books/${id}`
    );

    /*
     * Kitap bulunamadı
     */

    if (!book) {
        return (
            <NotFound
                title="Kitap bulunamadı"
                description="Aradığın kitap kütüphanede bulunmuyor."
                link="/books"
                buttonText="Kitaplara dön"
            />
        );
    }

    const bookChapters = chapters
        .filter(
            (chapter) =>
                chapter.bookId === book.id
        )
        .sort(
            (a, b) =>
                a.order - b.order
        );

    /*
     * Aktif bölümü bul
     */

    const chapterIndex = bookChapters.findIndex(
        (chapter) =>
            chapter.id.toString() === chapterId
    );

    const chapter = bookChapters[chapterIndex];

    /*
     * Bölüm bulunamadı
     */

    if (!chapter) {
        return (
            <NotFound
                title="Bölüm bulunamadı"
                description="Aradığın bölüm mevcut değil veya kaldırılmış olabilir."
                link={`${book.href}/chapters`}
                buttonText="Bölümlere dön"
            />
        );
    }

    /*
     * Önceki / sonraki bölüm
     */

    const previousChapter =
        chapterIndex > 0
            ? bookChapters[chapterIndex - 1]
            : null;

    const nextChapter =
        chapterIndex < bookChapters.length - 1
            ? bookChapters[chapterIndex + 1]
            : null;

    return (
        <div className="min-h-screen bg-background text-shadow-white">

            {/* =========================================
                TOP HEADER
            ========================================= */}

            <ChapterHeader
                book={book}
                chapter={chapter}
            />

            {/* =========================================
                CONTENT
            ========================================= */}

            <main>

                <ChapterContent
                    chapter={chapter}
                />

                {/* =====================================
                    GENERAL COMMENTS
                ===================================== */}

                <CommentSection
                    book={book}
                    chapter={chapter}
                />

                {/* =====================================
                    PREVIOUS / NEXT
                ===================================== */}

                <ChapterNavigation
                    book={book}
                    previousChapter={previousChapter}
                    nextChapter={nextChapter}
                />

            </main>

        </div>
    );
};


/*
|--------------------------------------------------------------------------
| NOT FOUND
|--------------------------------------------------------------------------
*/

const NotFound = ({
                      title,
                      description,
                      link,
                      buttonText,
                  }) => {
    return (
        <div className="min-h-screen bg-background text-shadow-white">

            <main className="
                mx-auto
                flex
                min-h-[70vh]
                max-w-[1400px]
                flex-col
                items-center
                justify-center
                px-6
                text-center
                lg:px-10
            ">

                <p className="
                    text-[10px]
                    uppercase
                    tracking-[0.35em]
                    text-header-accent
                ">
                    404
                </p>

                <h1 className="
                    mt-5
                    font-heading
                    text-4xl
                ">
                    {title}
                </h1>

                <p className="
                    mt-4
                    max-w-md
                    text-sm
                    leading-7
                    text-shadow-white/40
                ">
                    {description}
                </p>

                <Link
                    to={link}
                    className="mt-8"
                >
                    <Button variant="outline">
                        {buttonText}
                    </Button>
                </Link>

            </main>

        </div>
    );
};

export default ChapterReader;
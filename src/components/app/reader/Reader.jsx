import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { books } from "@/data/books.js";

import ReaderHeader from "./ReaderHeader.jsx";
import ReaderContent from "./ReaderContent.jsx";
import ReaderSettings from "./ReaderSettings.jsx";
import CommentsDrawer from "./CommentsDrawer.jsx";
import ChapterNavigation from "./ChapterNavigation.jsx";

const DEFAULT_SETTINGS = {
    font: "Inter",
    fontSize: 18,
    background: "cream",
};

function Reader() {
    const { slug, chapter } = useParams();

    const [settings, setSettings] = useState(() => {
        try {
            const stored = localStorage.getItem("readerSettings");

            if (!stored) {
                return DEFAULT_SETTINGS;
            }

            return {
                ...DEFAULT_SETTINGS,
                ...JSON.parse(stored),
            };
        } catch {
            return DEFAULT_SETTINGS;
        }
    });

    const [settingsOpen, setSettingsOpen] = useState(false);
    const [commentsOpen, setCommentsOpen] = useState(false);
    const [selectedParagraph, setSelectedParagraph] = useState(null);

    const book = useMemo(
        () => books.find((item) => item.slug === slug),
        [slug]
    );

    const currentChapter = useMemo(() => {
        if (!book?.chapters) {
            return null;
        }

        return book.chapters.find(
            (item) => String(item.number) === String(chapter)
        );
    }, [book, chapter]);

    const currentIndex = useMemo(() => {
        if (!book?.chapters || !currentChapter) {
            return -1;
        }

        return book.chapters.findIndex(
            (item) => item.id === currentChapter.id
        );
    }, [book, currentChapter]);

    useEffect(() => {
        localStorage.setItem(
            "readerSettings",
            JSON.stringify(settings)
        );
    }, [settings]);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "instant",
        });
    }, [chapter]);

    if (!book || !currentChapter) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-black px-5 text-center text-white">
                <div>
                    <span className="text-[9px] uppercase tracking-[0.35em] text-white/30">
                        404
                    </span>

                    <h1 className="mt-4 font-serif text-4xl">
                        Bölüm bulunamadı.
                    </h1>
                </div>
            </div>
        );
    }

    const readerBackground =
        settings.background === "white"
            ? "#ffffff"
            : settings.background === "black"
                ? "#050505"
                : "#eee9df";

    const readerText =
        settings.background === "white"
            ? "#171717"
            : settings.background === "black"
                ? "#ffffff"
                : "#29251f";

    return (
        <div
            className="min-h-screen"
            style={{
                "--book-bg": book.theme?.background ?? "#080808",
                "--book-accent": book.theme?.accent ?? "#ffffff",
                "--book-muted": book.theme?.muted ?? "#dcdcdc",

                backgroundColor: readerBackground,
                color: readerText,
            }}
        >
            <div className="pt-2">
                <ReaderHeader
                    book={book}
                    chapter={currentChapter}
                    onSettings={() =>
                        setSettingsOpen((value) => !value)
                    }
                    onComments={() =>
                        setCommentsOpen(true)
                    }
                />

                <ReaderContent
                    book={book}
                    chapter={currentChapter}
                    settings={settings}
                    selectedParagraph={selectedParagraph}
                    onParagraphClick={(paragraphIndex) => {
                        setSelectedParagraph(paragraphIndex);
                        setCommentsOpen(true);
                    }}
                />

                <ChapterNavigation
                    book={book}
                    currentIndex={currentIndex}
                />
            </div>

            <ReaderSettings
                open={settingsOpen}
                settings={settings}
                onChange={setSettings}
                onClose={() => setSettingsOpen(false)}
            />

            <CommentsDrawer
                open={commentsOpen}
                onClose={() => {
                    setCommentsOpen(false);
                    setSelectedParagraph(null);
                }}
                book={book}
                chapter={currentChapter}
                selectedParagraph={selectedParagraph}
            />
        </div>
    );
}

export default Reader;
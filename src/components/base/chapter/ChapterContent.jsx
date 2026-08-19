import { useState } from "react";

import ChapterParagraph from "./ChapterParagraph.jsx";
import ReaderSettings from "./ReaderSettings.jsx";

const ChapterContent = ({ chapter }) => {
    const [fontSize, setFontSize] = useState("text-[17px]");
    const [fontFamily, setFontFamily] = useState("font-serif");

    const paragraphs = chapter.content
        ?.split("\n")
        .filter((paragraph) => paragraph.trim());

    return (
        <>
            <article
                className="
                    mx-auto
                    max-w-[760px]
                    px-6
                    py-16
                    lg:px-10
                    lg:py-24
                "
            >
                <div
                    className={`
                        leading-[2]
                        text-shadow-white/75
                        transition-all
                        duration-300
                        ${fontSize}
                        ${fontFamily}
                    `}
                >
                    {paragraphs?.map((paragraph, index) => (
                        <ChapterParagraph
                            key={index}
                            paragraph={paragraph.trim()}
                            index={index}
                            chapter={chapter}
                        />
                    ))}
                </div>
            </article>

            <ReaderSettings
                fontSize={fontSize}
                setFontSize={setFontSize}
                fontFamily={fontFamily}
                setFontFamily={setFontFamily}
            />
        </>
    );
};

export default ChapterContent;
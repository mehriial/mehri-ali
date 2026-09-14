import { useEffect, useRef, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";

import mammoth from "mammoth";

import {
    AlignCenter,
    AlignJustify,
    AlignLeft,
    AlignRight,
    Bold,
    FileText,
    Heading1,
    Heading2,
    Heading3,
    Italic,
    Link as LinkIcon,
    List,
    ListOrdered,
    Quote,
    Redo2,
    Strikethrough,
    Underline as UnderlineIcon,
    Undo2,
} from "lucide-react";

import { Button } from "@/components/ui/button.jsx";

import "./ChapterEditor.css";

function ChapterEditor({
                           value = "",
                           onChange,
                       }) {
    const fileInputRef = useRef(null);

    const [isImporting, setIsImporting] =
        useState(false);

    const editor = useEditor({
        extensions: [
            StarterKit,

            Underline,

            Link.configure({
                openOnClick: false,
                autolink: true,
                defaultProtocol: "https",
            }),

            TextAlign.configure({
                types: [
                    "heading",
                    "paragraph",
                ],
                alignments: [
                    "left",
                    "center",
                    "right",
                    "justify",
                ],
            }),
        ],

        content: value,

        immediatelyRender: false,

        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    /*
     * Edit dialog açıldığında mövcud chapter content-in
     * editor daxilində göstərilməsi üçün.
     */
    useEffect(() => {
        if (!editor) {
            return;
        }

        const currentContent =
            editor.getHTML();

        if (value !== currentContent) {
            editor.commands.setContent(
                value || "",
                {
                    emitUpdate: false,
                }
            );
        }
    }, [value, editor]);

    /*
     * Word (.docx) import
     */
    const handleWordImport = async (event) => {
        const file = event.target.files?.[0];

        if (!file) {
            return;
        }

        const isWordFile =
            file.name
                .toLowerCase()
                .endsWith(".docx");

        if (!isWordFile) {
            alert(
                "Lütfen yalnızca Word (.docx) dosyası yükleyin."
            );

            event.target.value = "";
            return;
        }

        try {
            setIsImporting(true);

            const arrayBuffer =
                await file.arrayBuffer();

            const result =
                await mammoth.convertToHtml({
                    arrayBuffer,
                });

            const html = result.value;

            editor
                ?.chain()
                .focus()
                .setContent(html)
                .run();

            onChange(html);
        } catch (error) {
            console.error(
                "Word dosyası okunamadı:",
                error
            );

            alert(
                "Word dosyası okunurken bir hata oluştu."
            );
        } finally {
            setIsImporting(false);

            event.target.value = "";
        }
    };

    /*
     * Link əlavə / dəyişdir
     */
    const handleSetLink = () => {
        if (!editor) {
            return;
        }

        const previousUrl =
            editor.getAttributes("link").href;

        const url = window.prompt(
            "Link adresi:",
            previousUrl || "https://"
        );

        if (url === null) {
            return;
        }

        if (url === "") {
            editor
                .chain()
                .focus()
                .extendMarkRange("link")
                .unsetLink()
                .run();

            return;
        }

        editor
            .chain()
            .focus()
            .extendMarkRange("link")
            .setLink({
                href: url,
            })
            .run();
    };

    if (!editor) {
        return null;
    }

    return (
        <div className="chapter-editor overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02]">

            {/* TOOLBAR */}
            <div className="flex flex-wrap items-center gap-1 border-b border-white/[0.08] bg-white/[0.025] p-2">

                {/* TEXT FORMAT */}

                <EditorButton
                    active={editor.isActive("bold")}
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .toggleBold()
                            .run()
                    }
                    title="Kalın"
                >
                    <Bold />
                </EditorButton>

                <EditorButton
                    active={editor.isActive("italic")}
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .toggleItalic()
                            .run()
                    }
                    title="İtalik"
                >
                    <Italic />
                </EditorButton>

                <EditorButton
                    active={editor.isActive(
                        "underline"
                    )}
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .toggleUnderline()
                            .run()
                    }
                    title="Altı çizili"
                >
                    <UnderlineIcon />
                </EditorButton>

                <EditorButton
                    active={editor.isActive("strike")}
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .toggleStrike()
                            .run()
                    }
                    title="Üstü çizili"
                >
                    <Strikethrough />
                </EditorButton>

                <ToolbarDivider />

                {/* HEADINGS */}

                <EditorButton
                    active={editor.isActive(
                        "heading",
                        {
                            level: 1,
                        }
                    )}
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .toggleHeading({
                                level: 1,
                            })
                            .run()
                    }
                    title="Başlık 1"
                >
                    <Heading1 />
                </EditorButton>

                <EditorButton
                    active={editor.isActive(
                        "heading",
                        {
                            level: 2,
                        }
                    )}
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .toggleHeading({
                                level: 2,
                            })
                            .run()
                    }
                    title="Başlık 2"
                >
                    <Heading2 />
                </EditorButton>

                <EditorButton
                    active={editor.isActive(
                        "heading",
                        {
                            level: 3,
                        }
                    )}
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .toggleHeading({
                                level: 3,
                            })
                            .run()
                    }
                    title="Başlık 3"
                >
                    <Heading3 />
                </EditorButton>

                <ToolbarDivider />

                {/* LIST */}

                <EditorButton
                    active={editor.isActive(
                        "bulletList"
                    )}
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .toggleBulletList()
                            .run()
                    }
                    title="Madde listesi"
                >
                    <List />
                </EditorButton>

                <EditorButton
                    active={editor.isActive(
                        "orderedList"
                    )}
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .toggleOrderedList()
                            .run()
                    }
                    title="Numaralı liste"
                >
                    <ListOrdered />
                </EditorButton>

                <EditorButton
                    active={editor.isActive(
                        "blockquote"
                    )}
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .toggleBlockquote()
                            .run()
                    }
                    title="Alıntı"
                >
                    <Quote />
                </EditorButton>

                <ToolbarDivider />

                {/* ALIGNMENT */}

                <EditorButton
                    active={editor.isActive({
                        textAlign: "left",
                    })}
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .setTextAlign("left")
                            .run()
                    }
                    title="Sola hizala"
                >
                    <AlignLeft />
                </EditorButton>

                <EditorButton
                    active={editor.isActive({
                        textAlign: "center",
                    })}
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .setTextAlign("center")
                            .run()
                    }
                    title="Ortala"
                >
                    <AlignCenter />
                </EditorButton>

                <EditorButton
                    active={editor.isActive({
                        textAlign: "right",
                    })}
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .setTextAlign("right")
                            .run()
                    }
                    title="Sağa hizala"
                >
                    <AlignRight />
                </EditorButton>

                <EditorButton
                    active={editor.isActive({
                        textAlign: "justify",
                    })}
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .setTextAlign(
                                "justify"
                            )
                            .run()
                    }
                    title="İki yana yasla"
                >
                    <AlignJustify />
                </EditorButton>

                <ToolbarDivider />

                {/* LINK */}

                <EditorButton
                    active={editor.isActive("link")}
                    onClick={handleSetLink}
                    title="Link ekle"
                >
                    <LinkIcon />
                </EditorButton>

                <ToolbarDivider />

                {/* UNDO / REDO */}

                <EditorButton
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .undo()
                            .run()
                    }
                    disabled={
                        !editor.can().undo()
                    }
                    title="Geri al"
                >
                    <Undo2 />
                </EditorButton>

                <EditorButton
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .redo()
                            .run()
                    }
                    disabled={
                        !editor.can().redo()
                    }
                    title="İleri al"
                >
                    <Redo2 />
                </EditorButton>

                {/* WORD */}

                <div className="ml-auto">
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".docx"
                        onChange={
                            handleWordImport
                        }
                        className="hidden"
                    />

                    <Button
                        type="button"
                        variant="ghost"
                        disabled={isImporting}
                        onClick={() =>
                            fileInputRef.current?.click()
                        }
                        className="h-8 cursor-pointer gap-2 rounded-lg text-xs text-white/50 hover:bg-white/[0.06] hover:text-white"
                    >
                        <FileText className="h-4 w-4" />

                        {isImporting
                            ? "Word okunuyor..."
                            : "Word dosyası yükle"}
                    </Button>
                </div>
            </div>

            {/* EDITOR */}

            <EditorContent editor={editor} />
        </div>
    );
}

function EditorButton({
                          children,
                          active = false,
                          disabled = false,
                          onClick,
                          title,
                      }) {
    return (
        <Button
            type="button"
            variant="ghost"
            size="icon"
            disabled={disabled}
            onClick={onClick}
            title={title}
            className={[
                "h-8 w-8 cursor-pointer rounded-lg",
                "text-white/40",
                "hover:bg-white/[0.07]",
                "hover:text-white",
                active
                    ? "bg-white/[0.1] text-white"
                    : "",
            ].join(" ")}
        >
            {children}
        </Button>
    );
}

function ToolbarDivider() {
    return (
        <div className="mx-1 h-5 w-px bg-white/[0.08]" />
    );
}

export default ChapterEditor;
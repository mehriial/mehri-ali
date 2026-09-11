import { useEffect, useState } from "react";
import {
    Bold,
    Italic,
    Underline,
    List,
    ListOrdered,
    Quote,
    Undo2,
    Redo2,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Link as LinkIcon,
    Upload,
    FileText,
    X,
} from "lucide-react";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    EditorContent,
    useEditor,
} from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";

import UnderlineExtension from "@tiptap/extension-underline";

import TextAlign from "@tiptap/extension-text-align";

import Link from "@tiptap/extension-link";

import mammoth from "mammoth";

const defaultValues = {
    bookId: "",
    number: "",
    title: "",
    publishedAt: "",
    content: "",
};

function ChapterForm({
                         chapter,
                         books,
                         onSubmit,
                         onCancel,
                     }) {
    const [wordFile, setWordFile] = useState(null);
    const [isImportingWord, setIsImportingWord] =
        useState(false);

    const form = useForm({
        defaultValues: chapter
            ? {
                bookId: String(
                    chapter.bookId ?? ""
                ),
                number: chapter.number ?? "",
                title: chapter.title ?? "",
                publishedAt:
                    chapter.publishedAt ?? "",
                content:
                    typeof chapter.content === "string"
                        ? chapter.content
                        : Array.isArray(
                            chapter.content
                        )
                            ? chapter.content
                                .map(
                                    (paragraph) =>
                                        `<p>${paragraph}</p>`
                                )
                                .join("")
                            : "",
            }
            : defaultValues,
    });

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        watch,
        formState: {
            errors,
            isSubmitting,
        },
    } = form;

    const selectedBook = watch("bookId");

    const editor = useEditor({
        extensions: [
            StarterKit,

            UnderlineExtension,

            TextAlign.configure({
                types: [
                    "heading",
                    "paragraph",
                ],
            }),

            Link.configure({
                openOnClick: false,
                autolink: true,
                defaultProtocol: "https",
            }),
        ],

        content: chapter?.content
            ? typeof chapter.content === "string"
                ? chapter.content
                : Array.isArray(chapter.content)
                    ? chapter.content
                        .map(
                            (paragraph) =>
                                `<p>${paragraph}</p>`
                        )
                        .join("")
                    : ""
            : "",

        editorProps: {
            attributes: {
                class:
                    "prose prose-invert max-w-none min-h-[500px] px-5 py-4 text-white outline-none",
            },
        },

        onUpdate: ({ editor }) => {
            setValue(
                "content",
                editor.getHTML(),
                {
                    shouldDirty: true,
                    shouldValidate: true,
                }
            );
        },
    });

    useEffect(() => {
        if (!editor) return;

        if (chapter) {
            const content =
                typeof chapter.content === "string"
                    ? chapter.content
                    : Array.isArray(
                        chapter.content
                    )
                        ? chapter.content
                            .map(
                                (paragraph) =>
                                    `<p>${paragraph}</p>`
                            )
                            .join("")
                        : "";

            reset({
                bookId: String(
                    chapter.bookId ?? ""
                ),
                number: chapter.number ?? "",
                title: chapter.title ?? "",
                publishedAt:
                    chapter.publishedAt ?? "",
                content,
            });

            editor.commands.setContent(
                content || ""
            );
        } else {
            reset(defaultValues);
            editor.commands.clearContent();
        }
    }, [chapter, editor, reset]);

    const handleWordUpload = async (event) => {
        const file =
            event.target.files?.[0];

        if (!file) return;

        const extension = file.name
            .split(".")
            .pop()
            ?.toLowerCase();

        if (extension !== "docx") {
            alert(
                "Lütfen .docx formatında bir Word dosyası yükleyin."
            );

            event.target.value = "";

            return;
        }

        try {
            setIsImportingWord(true);
            setWordFile(file);

            const arrayBuffer =
                await file.arrayBuffer();

            const result =
                await mammoth.convertToHtml({
                    arrayBuffer,
                });

            const html = result.value;

            if (editor) {
                editor.commands.setContent(
                    html
                );

                setValue(
                    "content",
                    html,
                    {
                        shouldDirty: true,
                        shouldValidate: true,
                    }
                );
            }
        } catch (error) {
            console.error(
                "Word import error:",
                error
            );

            alert(
                "Word dosyası okunurken bir hata oluştu."
            );
        } finally {
            setIsImportingWord(false);
        }
    };

    const removeWordFile = () => {
        setWordFile(null);
    };

    const setLink = () => {
        if (!editor) return;

        const previousUrl =
            editor.getAttributes("link").href;

        const url = window.prompt(
            "URL girin:",
            previousUrl || "https://"
        );

        if (url === null) return;

        if (url === "") {
            editor
                .chain()
                .focus()
                .unsetLink()
                .run();

            return;
        }

        editor
            .chain()
            .focus()
            .setLink({
                href: url,
            })
            .run();
    };

    const submitForm = (data) => {
        const content =
            editor?.getHTML() || "";

        if (!content || content === "<p></p>") {
            setValue(
                "content",
                "",
                {
                    shouldValidate: true,
                }
            );

            return;
        }

        onSubmit({
            ...data,
            bookId: Number(data.bookId),
            number: Number(data.number),
            content,
        });
    };

    return (
        <form
            onSubmit={handleSubmit(
                submitForm
            )}
            className="space-y-6"
        >
            {/* =========================
                BASIC INFO
            ========================== */}

            <div className="rounded-2xl border border-white/[0.07] bg-[#0d0d0d] p-5 sm:p-6">
                <div className="mb-6">
                    <h2 className="text-base font-medium text-white">
                        Bölüm Bilgileri
                    </h2>

                    <p className="mt-1 text-sm text-white/35">
                        Bölümün temel bilgilerini
                        girin.
                    </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                    {/* BOOK */}

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/70">
                            Kitap
                        </label>

                        <Select
                            value={
                                selectedBook
                            }
                            onValueChange={(
                                value
                            ) =>
                                setValue(
                                    "bookId",
                                    value,
                                    {
                                        shouldValidate:
                                            true,
                                        shouldDirty:
                                            true,
                                    }
                                )
                            }
                        >
                            <SelectTrigger className="h-11 border-white/[0.08] bg-white/[0.03] text-white">
                                <SelectValue placeholder="Kitap seçin" />
                            </SelectTrigger>

                            <SelectContent className="border-white/[0.08] bg-[#111111] text-white">
                                {books.map(
                                    (book) => (
                                        <SelectItem
                                            key={
                                                book.id
                                            }
                                            value={String(
                                                book.id
                                            )}
                                            className="focus:bg-white/[0.06] focus:text-white"
                                        >
                                            {
                                                book.title
                                            }
                                        </SelectItem>
                                    )
                                )}
                            </SelectContent>
                        </Select>

                        <input
                            type="hidden"
                            {...register(
                                "bookId",
                                {
                                    required:
                                        "Kitap seçilmelidir.",
                                }
                            )}
                        />

                        {errors.bookId && (
                            <p className="text-xs text-red-400">
                                {
                                    errors
                                        .bookId
                                        .message
                                }
                            </p>
                        )}
                    </div>

                    {/* NUMBER */}

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/70">
                            Bölüm Numarası
                        </label>

                        <Input
                            type="number"
                            min="1"
                            {...register(
                                "number",
                                {
                                    required:
                                        "Bölüm numarası girilmelidir.",
                                    min: {
                                        value: 1,
                                        message:
                                            "Numara 1 veya daha büyük olmalıdır.",
                                    },
                                }
                            )}
                            placeholder="1"
                            className="h-11 border-white/[0.08] bg-white/[0.03] text-white placeholder:text-white/25 focus-visible:ring-white/20"
                        />

                        {errors.number && (
                            <p className="text-xs text-red-400">
                                {
                                    errors
                                        .number
                                        .message
                                }
                            </p>
                        )}
                    </div>

                    {/* TITLE */}

                    <div className="space-y-2 sm:col-span-2">
                        <label className="text-sm font-medium text-white/70">
                            Bölüm Başlığı
                        </label>

                        <Input
                            {...register(
                                "title",
                                {
                                    required:
                                        "Bölüm başlığı girilmelidir.",
                                }
                            )}
                            placeholder="Bölüm başlığını yazın..."
                            className="h-11 border-white/[0.08] bg-white/[0.03] text-white placeholder:text-white/25 focus-visible:ring-white/20"
                        />

                        {errors.title && (
                            <p className="text-xs text-red-400">
                                {
                                    errors
                                        .title
                                        .message
                                }
                            </p>
                        )}
                    </div>

                    {/* DATE */}

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-white/70">
                            Yayın Tarihi
                        </label>

                        <Input
                            {...register(
                                "publishedAt"
                            )}
                            placeholder="12 Ağustos 2026"
                            className="h-11 border-white/[0.08] bg-white/[0.03] text-white placeholder:text-white/25 focus-visible:ring-white/20"
                        />
                    </div>
                </div>
            </div>

            {/* =========================
                CONTENT EDITOR
            ========================== */}

            <div className="rounded-2xl border border-white/[0.07] bg-[#0d0d0d] p-5 sm:p-6">
                <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-base font-medium text-white">
                            Bölüm İçeriği
                        </h2>

                        <p className="mt-1 text-sm text-white/35">
                            Bölümün tamamını
                            buradan yazın veya
                            Word dosyanızdan
                            aktarın.
                        </p>
                    </div>

                    <div>
                        <input
                            id="word-upload"
                            type="file"
                            accept=".docx"
                            onChange={
                                handleWordUpload
                            }
                            className="hidden"
                        />

                        <Button
                            type="button"
                            variant="outline"
                            disabled={
                                isImportingWord
                            }
                            onClick={() =>
                                document
                                    .getElementById(
                                        "word-upload"
                                    )
                                    ?.click()
                            }
                            className="h-9 gap-2 border-white/[0.08] bg-white/[0.03] text-white hover:bg-white/[0.07] hover:text-white"
                        >
                            <Upload className="h-4 w-4" />

                            {isImportingWord
                                ? "Yükleniyor..."
                                : "Word Yükle"}
                        </Button>
                    </div>
                </div>

                {/* WORD FILE */}

                {wordFile && (
                    <div className="mb-4 flex items-center justify-between rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3">
                        <div className="flex min-w-0 items-center gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.06]">
                                <FileText className="h-4 w-4 text-white/50" />
                            </div>

                            <div className="min-w-0">
                                <p className="truncate text-sm text-white/70">
                                    {
                                        wordFile.name
                                    }
                                </p>

                                <p className="text-xs text-white/30">
                                    Word dosyasından
                                    aktarıldı
                                </p>
                            </div>
                        </div>

                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={
                                removeWordFile
                            }
                            className="h-8 w-8 shrink-0 text-white/30 hover:bg-white/[0.06] hover:text-white"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                )}

                {/* TOOLBAR */}

                <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-black">
                    <div className="flex flex-wrap items-center gap-1 border-b border-white/[0.08] bg-[#111111] p-2">
                        {/* BOLD */}

                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                                editor
                                    ?.chain()
                                    .focus()
                                    .toggleBold()
                                    .run()
                            }
                            className={`h-8 w-8 ${
                                editor?.isActive(
                                    "bold"
                                )
                                    ? "bg-white text-black hover:bg-white"
                                    : "text-white/50 hover:bg-white/[0.06] hover:text-white"
                            }`}
                        >
                            <Bold className="h-4 w-4" />
                        </Button>

                        {/* ITALIC */}

                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                                editor
                                    ?.chain()
                                    .focus()
                                    .toggleItalic()
                                    .run()
                            }
                            className={`h-8 w-8 ${
                                editor?.isActive(
                                    "italic"
                                )
                                    ? "bg-white text-black hover:bg-white"
                                    : "text-white/50 hover:bg-white/[0.06] hover:text-white"
                            }`}
                        >
                            <Italic className="h-4 w-4" />
                        </Button>

                        {/* UNDERLINE */}

                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                                editor
                                    ?.chain()
                                    .focus()
                                    .toggleUnderline()
                                    .run()
                            }
                            className={`h-8 w-8 ${
                                editor?.isActive(
                                    "underline"
                                )
                                    ? "bg-white text-black hover:bg-white"
                                    : "text-white/50 hover:bg-white/[0.06] hover:text-white"
                            }`}
                        >
                            <Underline className="h-4 w-4" />
                        </Button>

                        <div className="mx-1 h-5 w-px bg-white/[0.08]" />

                        {/* H1 */}

                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() =>
                                editor
                                    ?.chain()
                                    .focus()
                                    .toggleHeading({
                                        level: 1,
                                    })
                                    .run()
                            }
                            className="h-8 px-2 text-xs font-semibold text-white/50 hover:bg-white/[0.06] hover:text-white"
                        >
                            H1
                        </Button>

                        {/* H2 */}

                        <Button
                            type="button"
                            variant="ghost"
                            onClick={() =>
                                editor
                                    ?.chain()
                                    .focus()
                                    .toggleHeading({
                                        level: 2,
                                    })
                                    .run()
                            }
                            className="h-8 px-2 text-xs font-semibold text-white/50 hover:bg-white/[0.06] hover:text-white"
                        >
                            H2
                        </Button>

                        <div className="mx-1 h-5 w-px bg-white/[0.08]" />

                        {/* BULLET */}

                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                                editor
                                    ?.chain()
                                    .focus()
                                    .toggleBulletList()
                                    .run()
                            }
                            className={`h-8 w-8 ${
                                editor?.isActive(
                                    "bulletList"
                                )
                                    ? "bg-white text-black hover:bg-white"
                                    : "text-white/50 hover:bg-white/[0.06] hover:text-white"
                            }`}
                        >
                            <List className="h-4 w-4" />
                        </Button>

                        {/* ORDERED */}

                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                                editor
                                    ?.chain()
                                    .focus()
                                    .toggleOrderedList()
                                    .run()
                            }
                            className={`h-8 w-8 ${
                                editor?.isActive(
                                    "orderedList"
                                )
                                    ? "bg-white text-black hover:bg-white"
                                    : "text-white/50 hover:bg-white/[0.06] hover:text-white"
                            }`}
                        >
                            <ListOrdered className="h-4 w-4" />
                        </Button>

                        {/* QUOTE */}

                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                                editor
                                    ?.chain()
                                    .focus()
                                    .toggleBlockquote()
                                    .run()
                            }
                            className="h-8 w-8 text-white/50 hover:bg-white/[0.06] hover:text-white"
                        >
                            <Quote className="h-4 w-4" />
                        </Button>

                        <div className="mx-1 h-5 w-px bg-white/[0.08]" />

                        {/* ALIGN LEFT */}

                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                                editor
                                    ?.chain()
                                    .focus()
                                    .setTextAlign(
                                        "left"
                                    )
                                    .run()
                            }
                            className="h-8 w-8 text-white/50 hover:bg-white/[0.06] hover:text-white"
                        >
                            <AlignLeft className="h-4 w-4" />
                        </Button>

                        {/* CENTER */}

                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                                editor
                                    ?.chain()
                                    .focus()
                                    .setTextAlign(
                                        "center"
                                    )
                                    .run()
                            }
                            className="h-8 w-8 text-white/50 hover:bg-white/[0.06] hover:text-white"
                        >
                            <AlignCenter className="h-4 w-4" />
                        </Button>

                        {/* RIGHT */}

                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                                editor
                                    ?.chain()
                                    .focus()
                                    .setTextAlign(
                                        "right"
                                    )
                                    .run()
                            }
                            className="h-8 w-8 text-white/50 hover:bg-white/[0.06] hover:text-white"
                        >
                            <AlignRight className="h-4 w-4" />
                        </Button>

                        <div className="mx-1 h-5 w-px bg-white/[0.08]" />

                        {/* LINK */}

                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={setLink}
                            className={`h-8 w-8 ${
                                editor?.isActive(
                                    "link"
                                )
                                    ? "bg-white text-black hover:bg-white"
                                    : "text-white/50 hover:bg-white/[0.06] hover:text-white"
                            }`}
                        >
                            <LinkIcon className="h-4 w-4" />
                        </Button>

                        <div className="ml-auto flex items-center gap-1">
                            {/* UNDO */}

                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                    editor
                                        ?.chain()
                                        .focus()
                                        .undo()
                                        .run()
                                }
                                disabled={
                                    !editor?.can()
                                        .chain()
                                        .focus()
                                        .undo()
                                        .run()
                                }
                                className="h-8 w-8 text-white/40 hover:bg-white/[0.06] hover:text-white"
                            >
                                <Undo2 className="h-4 w-4" />
                            </Button>

                            {/* REDO */}

                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                    editor
                                        ?.chain()
                                        .focus()
                                        .redo()
                                        .run()
                                }
                                disabled={
                                    !editor?.can()
                                        .chain()
                                        .focus()
                                        .redo()
                                        .run()
                                }
                                className="h-8 w-8 text-white/40 hover:bg-white/[0.06] hover:text-white"
                            >
                                <Redo2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* EDITOR */}

                    <div className="bg-[#080808]">
                        <EditorContent
                            editor={editor}
                        />
                    </div>
                </div>

                <input
                    type="hidden"
                    {...register(
                        "content",
                        {
                            validate: () => {
                                const html =
                                    editor?.getHTML() ||
                                    "";

                                return (
                                    html !==
                                    "<p></p>" ||
                                    "Bölüm içeriği boş bırakılamaz."
                                );
                            },
                        }
                    )}
                />

                {errors.content && (
                    <p className="mt-2 text-xs text-red-400">
                        {
                            errors.content
                                .message
                        }
                    </p>
                )}
            </div>

            {/* ACTIONS */}

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <Button
                    type="button"
                    variant="ghost"
                    onClick={onCancel}
                    className="h-10 text-white/50 hover:bg-white/[0.05] hover:text-white"
                >
                    Vazgeç
                </Button>

                <Button
                    type="submit"
                    disabled={
                        isSubmitting ||
                        isImportingWord
                    }
                    className="h-10 bg-white px-6 text-black hover:bg-white/90"
                >
                    {isSubmitting
                        ? "Kaydediliyor..."
                        : chapter
                            ? "Değişiklikleri Kaydet"
                            : "Bölümü Oluştur"}
                </Button>
            </div>
        </form>
    );
}

export default ChapterForm;
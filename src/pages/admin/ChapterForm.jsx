import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    HiArrowLeft,
    HiCheck,
    HiDocumentText,
    HiUpload,
    HiMenu,
    HiMenuAlt2,
    HiOutlineRefresh,
} from "react-icons/hi";
import { books, chapters } from "../../consts/index.js";
import {BiBold, BiItalic, BiUnderline} from "react-icons/bi";

const getInitialForm = (chapter) => ({
    bookId: chapter?.bookId?.toString() || "",
    order: chapter?.order?.toString() || "",
    title: chapter?.title || "",
    date: chapter?.date || "",
    status: chapter?.status || "DRAFT",
});

const ChapterFormEditor = ({ id }) => {
    const navigate = useNavigate();
    const isEdit = Boolean(id);
    const chapter = isEdit
        ? chapters.find((item) => item.id.toString() === id)
        : null;
    const editorRef = useRef(null);
    const fileInputRef = useRef(null);

    const [form, setForm] = useState(() => getInitialForm(chapter));

    const [content, setContent] = useState(() => chapter?.content || "");
    const [errors, setErrors] = useState({});
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    /*
     * EDIT
     */

    useEffect(() => {
        if (isEdit && !chapter) {
            navigate("/admin/chapters");
        }
    }, [chapter, isEdit, navigate]);

    /*
     * FORM CHANGE
     */

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    /*
     * EDITOR CHANGE
     */

    const handleEditorInput = () => {
        if (!editorRef.current) return;

        setContent(editorRef.current.innerHTML);

        if (errors.content) {
            setErrors((prev) => ({
                ...prev,
                content: "",
            }));
        }
    };

    /*
     * FORMAT
     */

    const format = (command, value = null) => {
        editorRef.current?.focus();

        document.execCommand(
            command,
            false,
            value
        );

        handleEditorInput();
    };

    /*
     * WORD UPLOAD
     */

    const handleWordUpload = async (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        if (
            !file.name.toLowerCase().endsWith(".docx")
        ) {
            setErrors((prev) => ({
                ...prev,
                content:
                    "Yalnız .docx formatında Word faylı yükləyə bilərsiniz.",
            }));

            e.target.value = "";
            return;
        }

        try {
            setIsUploading(true);

            const arrayBuffer =
                await file.arrayBuffer();

            const { default: mammoth } = await import("mammoth");

            const result =
                await mammoth.convertToHtml({
                    arrayBuffer,
                });

            const html = result.value;

            setContent(html);

            if (editorRef.current) {
                editorRef.current.innerHTML = html;
            }

            setErrors((prev) => ({
                ...prev,
                content: "",
            }));
        } catch (error) {
            console.error(error);

            setErrors((prev) => ({
                ...prev,
                content:
                    "Word faylı oxunarkən xəta baş verdi.",
            }));
        } finally {
            setIsUploading(false);
            e.target.value = "";
        }
    };

    /*
     * VALIDATION
     */

    const validate = () => {
        const newErrors = {};

        if (!form.bookId) {
            newErrors.bookId =
                "Kitap seçmelisiniz.";
        }

        if (!form.order) {
            newErrors.order =
                "Bölüm numarası gereklidir.";
        } else if (Number(form.order) < 1) {
            newErrors.order =
                "Bölüm numarası 1 veya daha büyük olmalıdır.";
        }

        if (!form.title.trim()) {
            newErrors.title =
                "Bölüm başlığı gereklidir.";
        }

        const plainText =
            editorRef.current?.innerText?.trim() ||
            content
                .replace(/<[^>]*>/g, "")
                .trim();

        if (!plainText) {
            newErrors.content =
                "Bölüm içeriği gereklidir.";
        }

        setErrors(newErrors);

        return (
            Object.keys(newErrors).length === 0
        );
    };

    /*
     * SUBMIT
     */

    const handleSubmit = async (
        e,
        status = form.status
    ) => {
        e.preventDefault();

        if (!validate()) return;

        setIsSaving(true);

        const htmlContent =
            editorRef.current?.innerHTML ||
            content;

        const payload = {
            bookId: Number(form.bookId),
            order: Number(form.order),
            title: form.title.trim(),
            date: form.date,
            content: htmlContent,
            status,
        };

        /*
         * API:
         *
         * CREATE
         * POST /api/v1/chapters
         *
         * EDIT
         * PUT /api/v1/chapters/{id}
         */

        console.log(
            isEdit
                ? {
                    id,
                    ...payload,
                }
                : payload
        );

        setTimeout(() => {
            setIsSaving(false);
            navigate("/admin/chapters");
        }, 500);
    };

    return (
        <div className="min-h-screen bg-background text-shadow-white">

            {/* HEADER */}

            <header className="border-b border-white/10">

                <div className="
                    mx-auto
                    flex
                    max-w-[1400px]
                    items-center
                    justify-between
                    px-6
                    py-6
                    lg:px-10
                ">

                    <div className="flex items-center gap-5">

                        <Link
                            to="/admin/chapters"
                            className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                border
                                border-white/10
                                text-shadow-white/50
                                transition-colors
                                hover:border-header-accent
                                hover:text-header-accent
                            "
                        >
                            <HiArrowLeft className="h-4 w-4" />
                        </Link>

                        <div>

                            <p className="
                                text-[9px]
                                uppercase
                                tracking-[0.3em]
                                text-header-accent
                            ">
                                Bölümler
                            </p>

                            <h1 className="
                                mt-2
                                font-heading
                                text-2xl
                            ">
                                {isEdit
                                    ? "Bölümü düzenle"
                                    : "Yeni bölüm"}
                            </h1>

                        </div>

                    </div>

                </div>

            </header>

            {/* CONTENT */}

            <main className="
                mx-auto
                max-w-[1100px]
                px-6
                py-10
                lg:px-10
                lg:py-14
            ">

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    {/* GENERAL */}

                    <section className="
                        border
                        border-white/10
                        bg-white/[0.015]
                    ">

                        <div className="
                            border-b
                            border-white/10
                            px-6
                            py-5
                        ">

                            <div className="flex items-center gap-3">

                                <HiDocumentText
                                    className="
                                        h-4
                                        w-4
                                        text-header-accent
                                    "
                                />

                                <div>

                                    <h2 className="text-sm font-medium">
                                        Bölüm bilgileri
                                    </h2>

                                    <p className="
                                        mt-1
                                        text-xs
                                        text-shadow-white/30
                                    ">
                                        Bölümün temel bilgilerini girin.
                                    </p>

                                </div>

                            </div>

                        </div>

                        <div className="
                            grid
                            gap-6
                            p-6
                            sm:grid-cols-2
                        ">

                            {/* BOOK */}

                            <Field
                                label="Kitap"
                                required
                                error={errors.bookId}
                            >

                                <select
                                    name="bookId"
                                    value={form.bookId}
                                    onChange={handleChange}
                                    className={inputClass(
                                        errors.bookId
                                    )}
                                >

                                    <option value="">
                                        Kitap seçin
                                    </option>

                                    {books.map((book) => (
                                        <option
                                            key={book.id}
                                            value={book.id}
                                        >
                                            {book.title}
                                        </option>
                                    ))}

                                </select>

                            </Field>

                            {/* ORDER */}

                            <Field
                                label="Bölüm numarası"
                                required
                                error={errors.order}
                            >

                                <input
                                    type="number"
                                    name="order"
                                    min="1"
                                    value={form.order}
                                    onChange={handleChange}
                                    placeholder="1"
                                    className={inputClass(
                                        errors.order
                                    )}
                                />

                            </Field>

                            {/* TITLE */}

                            <div className="sm:col-span-2">

                                <Field
                                    label="Bölüm başlığı"
                                    required
                                    error={errors.title}
                                >

                                    <input
                                        type="text"
                                        name="title"
                                        value={form.title}
                                        onChange={handleChange}
                                        placeholder="Bölüm başlığını yazın..."
                                        className={inputClass(
                                            errors.title
                                        )}
                                    />

                                </Field>

                            </div>

                            {/* DATE */}

                            <Field label="Yayın tarihi">

                                <input
                                    type="date"
                                    name="date"
                                    value={form.date}
                                    onChange={handleChange}
                                    className={inputClass()}
                                />

                            </Field>

                            {/* STATUS */}

                            <Field label="Durum">

                                <select
                                    name="status"
                                    value={form.status}
                                    onChange={handleChange}
                                    className={inputClass()}
                                >

                                    <option value="DRAFT">
                                        Taslak
                                    </option>

                                    <option value="PUBLISHED">
                                        Yayında
                                    </option>

                                    <option value="ARCHIVED">
                                        Arşivlendi
                                    </option>

                                </select>

                            </Field>

                        </div>

                    </section>

                    {/* EDITOR */}

                    <section className="
                        border
                        border-white/10
                        bg-white/[0.015]
                    ">

                        <div className="
                            border-b
                            border-white/10
                            px-6
                            py-5
                        ">

                            <div className="
                                flex
                                flex-col
                                gap-4
                                sm:flex-row
                                sm:items-center
                                sm:justify-between
                            ">

                                <div>

                                    <h2 className="text-sm font-medium">
                                        Bölüm içeriği
                                    </h2>

                                    <p className="
                                        mt-1
                                        text-xs
                                        text-shadow-white/30
                                    ">
                                        Bölüm metnini yazın veya Word
                                        dosyasından içeri aktarın.
                                    </p>

                                </div>

                                <div>

                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept=".docx"
                                        onChange={handleWordUpload}
                                        className="hidden"
                                    />

                                    <button
                                        type="button"
                                        disabled={isUploading}
                                        onClick={() =>
                                            fileInputRef.current?.click()
                                        }
                                        className="
                                            flex
                                            items-center
                                            gap-2
                                            border
                                            border-white/10
                                            px-4
                                            py-2.5
                                            text-[9px]
                                            uppercase
                                            tracking-[0.15em]
                                            text-shadow-white/60
                                            transition-all
                                            hover:border-header-accent
                                            hover:text-header-accent
                                            disabled:opacity-40
                                        "
                                    >

                                        {isUploading ? (
                                            <HiOutlineRefresh
                                                className="
                                                    h-4
                                                    w-4
                                                    animate-spin
                                                "
                                            />
                                        ) : (
                                            <HiUpload className="h-4 w-4" />
                                        )}

                                        {isUploading
                                            ? "Yükleniyor..."
                                            : "Word yükle"}

                                    </button>

                                </div>

                            </div>

                        </div>

                        {/* TOOLBAR */}

                        <div className="
                            flex
                            flex-wrap
                            items-center
                            gap-1
                            border-b
                            border-white/10
                            px-4
                            py-3
                        ">

                            <EditorButton
                                onClick={() =>
                                    format("bold")
                                }
                                title="Kalın"
                            >
                                <BiBold className="h-4 w-4" />
                            </EditorButton>

                            <EditorButton
                                onClick={() =>
                                    format("italic")
                                }
                                title="İtalik"
                            >
                                <BiItalic className="h-4 w-4" />
                            </EditorButton>

                            <EditorButton
                                onClick={() =>
                                    format("underline")
                                }
                                title="Altı çizili"
                            >
                                <BiUnderline className="h-4 w-4" />
                            </EditorButton>

                            <div className="
                                mx-2
                                h-5
                                w-px
                                bg-white/10
                            " />

                            <EditorButton
                                onClick={() =>
                                    format(
                                        "formatBlock",
                                        "h2"
                                    )
                                }
                                title="Başlık"
                            >
                                H2
                            </EditorButton>

                            <EditorButton
                                onClick={() =>
                                    format(
                                        "formatBlock",
                                        "h3"
                                    )
                                }
                                title="Alt başlık"
                            >
                                H3
                            </EditorButton>

                            <div className="
                                mx-2
                                h-5
                                w-px
                                bg-white/10
                            " />

                            <EditorButton
                                onClick={() =>
                                    format(
                                        "insertUnorderedList"
                                    )
                                }
                                title="Madde işaretli liste"
                            >
                                <HiMenu className="h-4 w-4" />
                            </EditorButton>

                            <EditorButton
                                onClick={() =>
                                    format(
                                        "insertOrderedList"
                                    )
                                }
                                title="Numaralı liste"
                            >
                                <HiMenuAlt2 className="h-4 w-4" />
                            </EditorButton>

                            <div className="
                                mx-2
                                h-5
                                w-px
                                bg-white/10
                            " />

                            <EditorButton
                                onClick={() =>
                                    format(
                                        "justifyLeft"
                                    )
                                }
                                title="Sola hizala"
                            >
                                Sol
                            </EditorButton>

                            <EditorButton
                                onClick={() =>
                                    format(
                                        "justifyCenter"
                                    )
                                }
                                title="Ortala"
                            >
                                Orta
                            </EditorButton>

                            <EditorButton
                                onClick={() =>
                                    format(
                                        "justifyRight"
                                    )
                                }
                                title="Sağa hizala"
                            >
                                Sağ
                            </EditorButton>

                        </div>

                        {/* EDITABLE AREA */}

                        <div className="p-6">

                            <div
                                ref={editorRef}
                                contentEditable
                                suppressContentEditableWarning
                                onInput={handleEditorInput}
                                className={`
                                    min-h-[600px]
                                    w-full
                                    border
                                    bg-transparent
                                    px-6
                                    py-6
                                    font-serif
                                    text-[17px]
                                    leading-[2]
                                    text-white
                                    outline-none
                                    transition-colors
                                    [&_h2]:mb-5
                                    [&_h2]:mt-8
                                    [&_h2]:font-heading
                                    [&_h2]:text-3xl
                                    [&_h3]:mb-4
                                    [&_h3]:mt-7
                                    [&_h3]:font-heading
                                    [&_h3]:text-2xl
                                    [&_p]:mb-7
                                    [&_ul]:my-5
                                    [&_ul]:list-disc
                                    [&_ul]:pl-8
                                    [&_ol]:my-5
                                    [&_ol]:list-decimal
                                    [&_ol]:pl-8
                                    ${
                                    errors.content
                                        ? "border-red-400/60"
                                        : "border-white/10 focus:border-header-accent"
                                }
                                `}
                            />

                            {!content && !isEdit && (
                                <p className="
                                    pointer-events-none
                                    -mt-[580px]
                                    px-12
                                    py-8
                                    font-sans
                                    text-sm
                                    text-shadow-white/20
                                ">
                                    Bölüm içeriğini buraya yazın...
                                </p>
                            )}

                            {errors.content && (
                                <p className="
                                    mt-3
                                    text-xs
                                    text-red-400
                                ">
                                    {errors.content}
                                </p>
                            )}

                        </div>

                        {/* EDITOR INFO */}

                        <div className="
                            border-t
                            border-white/10
                            px-6
                            py-3
                        ">

                            <p className="
                                text-[9px]
                                uppercase
                                tracking-[0.15em]
                                text-shadow-white/25
                            ">
                                Desteklenen: Kalın · İtalik · Altı
                                çizili · Başlık · Liste · Hizalama ·
                                .docx
                            </p>

                        </div>

                    </section>

                    {/* ACTIONS */}

                    <div className="
                        flex
                        flex-col-reverse
                        justify-between
                        gap-3
                        sm:flex-row
                    ">

                        <Link
                            to="/admin/chapters"
                            className="
                                border
                                border-white/10
                                px-6
                                py-3
                                text-center
                                text-[9px]
                                uppercase
                                tracking-[0.2em]
                                text-shadow-white/50
                                transition-colors
                                hover:border-white/30
                                hover:text-white
                            "
                        >
                            Vazgeç
                        </Link>

                        <div className="
                            flex
                            flex-col
                            gap-3
                            sm:flex-row
                        ">

                            <button
                                type="button"
                                disabled={isSaving}
                                onClick={(e) =>
                                    handleSubmit(
                                        e,
                                        "DRAFT"
                                    )
                                }
                                className="
                                    border
                                    border-white/10
                                    px-6
                                    py-3
                                    text-[9px]
                                    uppercase
                                    tracking-[0.2em]
                                    text-shadow-white/60
                                    transition-colors
                                    hover:border-white/30
                                    hover:text-white
                                    disabled:opacity-40
                                "
                            >
                                Taslak olarak kaydet
                            </button>

                            <button
                                type="submit"
                                disabled={isSaving}
                                className="
                                    flex
                                    items-center
                                    justify-center
                                    gap-2
                                    border
                                    border-header-accent
                                    px-7
                                    py-3
                                    text-[9px]
                                    uppercase
                                    tracking-[0.2em]
                                    text-header-accent
                                    transition-all
                                    hover:bg-header-accent
                                    hover:text-white
                                    disabled:opacity-40
                                "
                            >

                                <HiCheck className="h-3.5 w-3.5" />

                                {isSaving
                                    ? "Kaydediliyor..."
                                    : isEdit
                                        ? "Değişiklikleri kaydet"
                                        : "Bölümü yayınla"}

                            </button>

                        </div>

                    </div>

                </form>

            </main>

        </div>
    );
};

/*
|--------------------------------------------------------------------------
| FIELD
|--------------------------------------------------------------------------
*/

const Field = ({
                   label,
                   required = false,
                   error,
                   children,
               }) => {
    return (
        <div>

            <label className="
                mb-2
                block
                text-[9px]
                uppercase
                tracking-[0.2em]
                text-shadow-white/50
            ">

                {label}

                {required && (
                    <span className="
                        ml-1
                        text-header-accent
                    ">
                        *
                    </span>
                )}

            </label>

            {children}

            {error && (
                <p className="
                    mt-2
                    text-xs
                    text-red-400
                ">
                    {error}
                </p>
            )}

        </div>
    );
};

/*
|--------------------------------------------------------------------------
| EDITOR BUTTON
|--------------------------------------------------------------------------
*/

const EditorButton = ({
                          children,
                          onClick,
                          title,
                      }) => {
    return (
        <button
            type="button"
            onMouseDown={(e) =>
                e.preventDefault()
            }
            onClick={onClick}
            title={title}
            className="
                flex
                h-8
                min-w-8
                items-center
                justify-center
                px-2
                text-xs
                text-shadow-white/50
                transition-colors
                hover:bg-white/5
                hover:text-header-accent
            "
        >
            {children}
        </button>
    );
};

/*
|--------------------------------------------------------------------------
| INPUT CLASS
|--------------------------------------------------------------------------
*/

const inputClass = (error = "") => `
    w-full
    border
    ${
    error
        ? "border-red-400/60"
        : "border-white/10 focus:border-header-accent"
}
    bg-transparent
    px-4
    py-3
    text-sm
    text-white
    outline-none
    transition-colors
    placeholder:text-shadow-white/20
`;

const ChapterForm = () => {
    const { id } = useParams();

    return <ChapterFormEditor key={id || "create"} id={id} />;
};

export default ChapterForm;

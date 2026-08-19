import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    HiArrowLeft,
    HiSave,
    HiPhotograph,
} from "react-icons/hi";

import { books } from "../../consts/index.js";

const AdminBookForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const isEdit = Boolean(id);

    const existingBook = books.find(
        (book) => book.id.toString() === id
    );

    const [form, setForm] = useState({
        title: existingBook?.title || "",
        description: existingBook?.description || "",
        href: existingBook?.href || "",
        cover: existingBook?.cover || "",
        series: existingBook?.series?.name || "",
        status: existingBook?.status || "draft",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newErrors = {};

        if (!form.title.trim()) {
            newErrors.title = "Kitap adı zorunludur.";
        }

        if (!form.description.trim()) {
            newErrors.description =
                "Kitap açıklaması zorunludur.";
        }

        if (!form.href.trim()) {
            newErrors.href =
                "Kitap bağlantısı zorunludur.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const payload = {
            ...form,
            title: form.title.trim(),
            description: form.description.trim(),
            href: form.href.trim(),
        };

        console.log(
            isEdit
                ? "Update book:"
                : "Create book:",
            payload
        );

        navigate("/admin/books");
    };

    return (
        <div className="min-h-screen">

            {/* HEADER */}

            <header className="border-b border-white/10">

                <div className="
                    mx-auto
                    max-w-[1100px]
                    px-6
                    py-8
                    lg:px-10
                ">

                    <Link
                        to="/admin/books"
                        className="
                            inline-flex
                            items-center
                            gap-2
                            text-[9px]
                            uppercase
                            tracking-[0.2em]
                            text-shadow-white/35
                            transition-colors
                            hover:text-header-accent
                        "
                    >
                        <HiArrowLeft className="h-3.5 w-3.5" />
                        Kitaplara dön
                    </Link>

                    <p className="
                        mt-8
                        text-[9px]
                        uppercase
                        tracking-[0.3em]
                        text-header-accent
                    ">
                        {isEdit
                            ? "Kitap düzenle"
                            : "Yeni kitap"}
                    </p>

                    <h1 className="
                        mt-3
                        font-heading
                        text-3xl
                    ">
                        {isEdit
                            ? form.title || "Kitabı düzenle"
                            : "Yeni kitap oluştur"}
                    </h1>

                </div>

            </header>

            {/* FORM */}

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
                    className="space-y-8"
                >

                    {/* BASIC INFO */}

                    <section className="
                        border
                        border-white/10
                    ">

                        <div className="
                            border-b
                            border-white/10
                            px-6
                            py-5
                        ">
                            <p className="
                                text-[9px]
                                uppercase
                                tracking-[0.25em]
                                text-header-accent
                            ">
                                Temel bilgiler
                            </p>

                            <p className="
                                mt-2
                                text-xs
                                text-shadow-white/30
                            ">
                                Kitabın temel bilgilerini gir.
                            </p>
                        </div>

                        <div className="
                            grid
                            gap-6
                            p-6
                            md:grid-cols-2
                        ">

                            {/* TITLE */}

                            <div className="md:col-span-2">

                                <label className="
                                    mb-2
                                    block
                                    text-[9px]
                                    uppercase
                                    tracking-[0.2em]
                                    text-shadow-white/50
                                ">
                                    Kitap adı
                                </label>

                                <input
                                    name="title"
                                    value={form.title}
                                    onChange={handleChange}
                                    placeholder="Örneğin: Sessiz Şehir"
                                    className={`
                                        h-11
                                        w-full
                                        border
                                        bg-transparent
                                        px-4
                                        text-sm
                                        text-white
                                        outline-none
                                        transition-colors
                                        placeholder:text-shadow-white/20
                                        ${
                                        errors.title
                                            ? "border-red-500/60"
                                            : "border-white/10 focus:border-header-accent"
                                    }
                                    `}
                                />

                                {errors.title && (
                                    <p className="
                                        mt-2
                                        text-[10px]
                                        text-red-400
                                    ">
                                        {errors.title}
                                    </p>
                                )}

                            </div>

                            {/* SERIES */}

                            <div>

                                <label className="
                                    mb-2
                                    block
                                    text-[9px]
                                    uppercase
                                    tracking-[0.2em]
                                    text-shadow-white/50
                                ">
                                    Seri
                                </label>

                                <input
                                    name="series"
                                    value={form.series}
                                    onChange={handleChange}
                                    placeholder="Seri adı"
                                    className="
                                        h-11
                                        w-full
                                        border
                                        border-white/10
                                        bg-transparent
                                        px-4
                                        text-sm
                                        text-white
                                        outline-none
                                        placeholder:text-shadow-white/20
                                        focus:border-header-accent
                                    "
                                />

                            </div>

                            {/* STATUS */}

                            <div>

                                <label className="
                                    mb-2
                                    block
                                    text-[9px]
                                    uppercase
                                    tracking-[0.2em]
                                    text-shadow-white/50
                                ">
                                    Durum
                                </label>

                                <select
                                    name="status"
                                    value={form.status}
                                    onChange={handleChange}
                                    className="
                                        h-11
                                        w-full
                                        border
                                        border-white/10
                                        bg-background
                                        px-4
                                        text-sm
                                        text-white
                                        outline-none
                                        focus:border-header-accent
                                    "
                                >
                                    <option value="draft">
                                        Taslak
                                    </option>

                                    <option value="published">
                                        Yayında
                                    </option>
                                </select>

                            </div>

                            {/* URL */}

                            <div className="md:col-span-2">

                                <label className="
                                    mb-2
                                    block
                                    text-[9px]
                                    uppercase
                                    tracking-[0.2em]
                                    text-shadow-white/50
                                ">
                                    URL
                                </label>

                                <input
                                    name="href"
                                    value={form.href}
                                    onChange={handleChange}
                                    placeholder="/books/sessiz-sehir"
                                    className={`
                                        h-11
                                        w-full
                                        border
                                        bg-transparent
                                        px-4
                                        text-sm
                                        text-white
                                        outline-none
                                        placeholder:text-shadow-white/20
                                        ${
                                        errors.href
                                            ? "border-red-500/60"
                                            : "border-white/10 focus:border-header-accent"
                                    }
                                    `}
                                />

                                {errors.href && (
                                    <p className="
                                        mt-2
                                        text-[10px]
                                        text-red-400
                                    ">
                                        {errors.href}
                                    </p>
                                )}

                            </div>

                            {/* DESCRIPTION */}

                            <div className="md:col-span-2">

                                <label className="
                                    mb-2
                                    block
                                    text-[9px]
                                    uppercase
                                    tracking-[0.2em]
                                    text-shadow-white/50
                                ">
                                    Açıklama
                                </label>

                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={handleChange}
                                    rows={6}
                                    placeholder="Kitap hakkında kısa açıklama..."
                                    className={`
                                        w-full
                                        resize-none
                                        border
                                        bg-transparent
                                        px-4
                                        py-3
                                        text-sm
                                        leading-7
                                        text-white
                                        outline-none
                                        placeholder:text-shadow-white/20
                                        ${
                                        errors.description
                                            ? "border-red-500/60"
                                            : "border-white/10 focus:border-header-accent"
                                    }
                                    `}
                                />

                                {errors.description && (
                                    <p className="
                                        mt-2
                                        text-[10px]
                                        text-red-400
                                    ">
                                        {errors.description}
                                    </p>
                                )}

                            </div>

                        </div>

                    </section>

                    {/* COVER */}

                    <section className="
                        border
                        border-white/10
                    ">

                        <div className="
                            border-b
                            border-white/10
                            px-6
                            py-5
                        ">
                            <p className="
                                text-[9px]
                                uppercase
                                tracking-[0.25em]
                                text-header-accent
                            ">
                                Kapak
                            </p>
                        </div>

                        <div className="
                            grid
                            gap-6
                            p-6
                            md:grid-cols-[180px_1fr]
                        ">

                            <div className="
                                flex
                                h-[240px]
                                items-center
                                justify-center
                                border
                                border-white/10
                                bg-white/[0.02]
                            ">

                                {form.cover ? (
                                    <img
                                        src={form.cover}
                                        alt={form.title}
                                        className="
                                            h-full
                                            w-full
                                            object-cover
                                        "
                                    />
                                ) : (
                                    <HiPhotograph className="
                                        h-8
                                        w-8
                                        text-shadow-white/20
                                    " />
                                )}

                            </div>

                            <div>

                                <label className="
                                    mb-2
                                    block
                                    text-[9px]
                                    uppercase
                                    tracking-[0.2em]
                                    text-shadow-white/50
                                ">
                                    Kapak URL
                                </label>

                                <input
                                    name="cover"
                                    value={form.cover}
                                    onChange={handleChange}
                                    placeholder="https://..."
                                    className="
                                        h-11
                                        w-full
                                        border
                                        border-white/10
                                        bg-transparent
                                        px-4
                                        text-sm
                                        text-white
                                        outline-none
                                        placeholder:text-shadow-white/20
                                        focus:border-header-accent
                                    "
                                />

                                <p className="
                                    mt-3
                                    text-xs
                                    leading-6
                                    text-shadow-white/30
                                ">
                                    Şimdilik kapak görselinin URL'sini
                                    kullanıyoruz. Daha sonra dosya
                                    yükleme sistemi ekleyebiliriz.
                                </p>

                            </div>

                        </div>

                    </section>

                    {/* ACTIONS */}

                    <div className="
                        flex
                        flex-col-reverse
                        gap-3
                        sm:flex-row
                        sm:justify-end
                    ">

                        <Link
                            to="/admin/books"
                            className="
                                inline-flex
                                h-11
                                items-center
                                justify-center
                                border
                                border-white/10
                                px-6
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

                        <button
                            type="submit"
                            className="
                                inline-flex
                                h-11
                                items-center
                                justify-center
                                gap-2
                                border
                                border-header-accent
                                px-6
                                text-[9px]
                                uppercase
                                tracking-[0.2em]
                                text-header-accent
                                transition-all
                                hover:bg-header-accent
                                hover:text-white
                            "
                        >
                            <HiSave className="h-4 w-4" />

                            {isEdit
                                ? "Değişiklikleri kaydet"
                                : "Kitabı oluştur"}
                        </button>

                    </div>

                </form>

            </main>

        </div>
    );
};

export default AdminBookForm;
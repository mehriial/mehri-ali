import { useState } from "react";
import {
    HiPencil,
    HiPlus,
    HiTrash,
} from "react-icons/hi";
import { Link } from "react-router-dom";

const initialAnnouncements = [
    {
        id: 1,
        title: "Yeni bölüm yayınlandı",
        content: "Yeni bölüm artık okuyucularla buluştu.",
        date: "19 Ağustos 2026",
        status: "published",
    },
    {
        id: 2,
        title: "Yeni kitap yakında",
        content: "Yeni hikayem üzerinde çalışıyorum.",
        date: "12 Ağustos 2026",
        status: "published",
    },
    {
        id: 3,
        title: "Site güncellemesi",
        content: "Siteye yeni özellikler ekleniyor.",
        date: "5 Ağustos 2026",
        status: "draft",
    },
];

const Announcements = () => {
    const [items, setItems] = useState(initialAnnouncements);

    const removeAnnouncement = (id) => {
        setItems((prev) =>
            prev.filter((item) => item.id !== id)
        );
    };

    return (
        <div className="min-h-screen bg-background">

            <main className="mx-auto max-w-[1200px] px-6 py-10 lg:px-10">

                <div className="
                    flex
                    flex-col
                    justify-between
                    gap-5
                    border-b
                    border-white/10
                    pb-8
                    md:flex-row
                    md:items-end
                ">

                    <div>

                        <p className="sectionLabel">
                            Yönetim
                        </p>

                        <h1 className="mt-3 font-heading text-3xl">
                            Duyurular
                        </h1>

                        <p className="mt-2 text-sm text-shadow-white/40">
                            Okurlara gösterilen duyuruları yönet.
                        </p>

                    </div>

                    <Link
                        to="/admin/announcements/create"
                        className="primaryButton"
                    >
                        <HiPlus />
                        Yeni duyuru
                    </Link>

                </div>

                <div className="mt-8 space-y-3">

                    {items.map((item) => (

                        <article
                            key={item.id}
                            className="
                                border
                                border-white/10
                                p-6
                                transition-colors
                                hover:border-white/20
                            "
                        >

                            <div className="
                                flex
                                flex-col
                                justify-between
                                gap-5
                                md:flex-row
                            ">

                                <div>

                                    <div className="flex items-center gap-4">

                                        <p className="
                                            text-[9px]
                                            uppercase
                                            tracking-[0.2em]
                                            text-header-accent
                                        ">
                                            {item.date}
                                        </p>

                                        <span className={`
                                            text-[8px]
                                            uppercase
                                            tracking-[0.15em]
                                            ${
                                            item.status === "published"
                                                ? "text-green-400"
                                                : "text-yellow-400"
                                        }
                                        `}>
                                            {item.status === "published"
                                                ? "Yayında"
                                                : "Taslak"}
                                        </span>

                                    </div>

                                    <h2 className="
                                        mt-4
                                        font-heading
                                        text-xl
                                    ">
                                        {item.title}
                                    </h2>

                                    <p className="
                                        mt-2
                                        text-sm
                                        leading-7
                                        text-shadow-white/50
                                    ">
                                        {item.content}
                                    </p>

                                </div>

                                <div className="
                                    flex
                                    shrink-0
                                    gap-2
                                ">

                                    <Link
                                        to={`/admin/announcements/${item.id}/edit`}
                                        className="iconButton"
                                    >
                                        <HiPencil />
                                    </Link>

                                    <button
                                        onClick={() =>
                                            removeAnnouncement(item.id)
                                        }
                                        className="
                                            iconButton
                                            hover:text-red-400
                                        "
                                    >
                                        <HiTrash />
                                    </button>

                                </div>

                            </div>

                        </article>

                    ))}

                </div>

            </main>
        </div>
    );
};

export default Announcements;
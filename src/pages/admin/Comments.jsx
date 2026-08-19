import { useState } from "react";
import {
    HiCheck,
    HiSearch,
    HiTrash,
    HiX,
} from "react-icons/hi";

const initialComments = [
    {
        id: 1,
        author: "Mehri",
        text: "Bu bölüm gerçekten çok güzel.",
        chapter: "Karanlığın İçinde",
        type: "chapter",
        date: "19 Ağustos 2026",
        status: "published",
    },
    {
        id: 2,
        author: "Aylin",
        text: "Sonunu hiç böyle beklemiyordum.",
        chapter: "Sessizlik",
        type: "chapter",
        date: "18 Ağustos 2026",
        status: "pending",
    },
    {
        id: 3,
        author: "Mert",
        text: "Yazarın karakter gelişimini çok beğendim.",
        chapter: "Genel yorum",
        type: "general",
        date: "17 Ağustos 2026",
        status: "published",
    },
];

const Comments = () => {
    const [comments, setComments] = useState(initialComments);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");

    const filtered = comments.filter((comment) => {

        const matchesSearch =
            comment.text
                .toLowerCase()
                .includes(search.toLowerCase()) ||
            comment.author
                .toLowerCase()
                .includes(search.toLowerCase());

        const matchesFilter =
            filter === "all" ||
            comment.status === filter;

        return matchesSearch && matchesFilter;
    });

    const updateStatus = (id, status) => {
        setComments((prev) =>
            prev.map((comment) =>
                comment.id === id
                    ? { ...comment, status }
                    : comment
            )
        );
    };

    const removeComment = (id) => {
        setComments((prev) =>
            prev.filter((comment) => comment.id !== id)
        );
    };

    return (
        <div className="min-h-screen bg-background">

            <main className="mx-auto max-w-[1400px] px-6 py-10 lg:px-10">

                <div className="
                    border-b
                    border-white/10
                    pb-8
                ">

                    <p className="sectionLabel">
                        Yönetim
                    </p>

                    <h1 className="mt-3 font-heading text-3xl">
                        Yorumlar
                    </h1>

                    <p className="mt-2 text-sm text-shadow-white/40">
                        Kitap ve bölümlerdeki okur yorumlarını yönet.
                    </p>

                </div>

                {/* FILTER */}

                <div className="
                    mt-8
                    flex
                    flex-col
                    gap-3
                    md:flex-row
                ">

                    <div className="relative flex-1">

                        <HiSearch className="
                            absolute
                            left-4
                            top-1/2
                            h-4
                            w-4
                            -translate-y-1/2
                            text-shadow-white/30
                        " />

                        <input
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            placeholder="Yorum veya kullanıcı ara..."
                            className="adminInput pl-11"
                        />

                    </div>

                    <select
                        value={filter}
                        onChange={(e) =>
                            setFilter(e.target.value)
                        }
                        className="adminInput md:w-52"
                    >
                        <option value="all">
                            Tüm yorumlar
                        </option>

                        <option value="pending">
                            Onay bekleyen
                        </option>

                        <option value="published">
                            Yayında
                        </option>
                    </select>

                </div>

                {/* COMMENTS */}

                <div className="mt-6 space-y-3">

                    {filtered.map((comment) => (

                        <article
                            key={comment.id}
                            className="
                                border
                                border-white/10
                                p-5
                                transition-colors
                                hover:bg-white/[0.02]
                            "
                        >

                            <div className="
                                flex
                                flex-col
                                gap-5
                                md:flex-row
                                md:items-start
                                md:justify-between
                            ">

                                <div className="min-w-0">

                                    <div className="
                                        flex
                                        flex-wrap
                                        items-center
                                        gap-3
                                    ">

                                        <span className="
                                            text-xs
                                            font-medium
                                            text-header-accent
                                        ">
                                            {comment.author}
                                        </span>

                                        <span className="
                                            text-[9px]
                                            uppercase
                                            tracking-[0.15em]
                                            text-shadow-white/30
                                        ">
                                            {comment.date}
                                        </span>

                                        <Status status={comment.status} />

                                    </div>

                                    <p className="
                                        mt-4
                                        text-sm
                                        leading-7
                                        text-shadow-white/75
                                    ">
                                        {comment.text}
                                    </p>

                                    <p className="
                                        mt-3
                                        text-[10px]
                                        text-shadow-white/30
                                    ">
                                        {comment.type === "chapter"
                                            ? `Bölüm: ${comment.chapter}`
                                            : "Genel yorum"}
                                    </p>

                                </div>

                                <div className="
                                    flex
                                    shrink-0
                                    gap-2
                                ">

                                    {comment.status === "pending" && (
                                        <button
                                            onClick={() =>
                                                updateStatus(
                                                    comment.id,
                                                    "published"
                                                )
                                            }
                                            className="actionButton"
                                            title="Onayla"
                                        >
                                            <HiCheck />
                                        </button>
                                    )}

                                    <button
                                        onClick={() =>
                                            updateStatus(
                                                comment.id,
                                                "pending"
                                            )
                                        }
                                        className="actionButton"
                                        title="Beklemeye al"
                                    >
                                        <HiX />
                                    </button>

                                    <button
                                        onClick={() =>
                                            removeComment(comment.id)
                                        }
                                        className="actionButton hover:text-red-400"
                                        title="Sil"
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

const Status = ({ status }) => (
    <span className={`
        text-[8px]
        uppercase
        tracking-[0.15em]
        ${
        status === "published"
            ? "text-green-400"
            : "text-yellow-400"
    }
    `}>
        {status === "published"
            ? "Yayında"
            : "Bekliyor"}
    </span>
);

export default Comments;
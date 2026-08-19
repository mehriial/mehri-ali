import { useState } from "react";
import {
    HiCheck,
    HiSearch,
    HiTrash,
    HiX,
} from "react-icons/hi";

const initialPosts = [
    {
        id: 1,
        author: "Mehri",
        text: "Bu hikayenin sonunun nereye gideceğini gerçekten merak ediyorum.",
        date: "19 Ağustos 2026",
        status: "published",
    },
    {
        id: 2,
        author: "Aylin",
        text: "Yeni bölüm için birkaç teorim var.",
        date: "18 Ağustos 2026",
        status: "pending",
    },
    {
        id: 3,
        author: "Mert",
        text: "Karakterlerin arasındaki ilişki çok iyi yazılmış.",
        date: "17 Ağustos 2026",
        status: "published",
    },
];

const Board = () => {
    const [posts, setPosts] = useState(initialPosts);
    const [search, setSearch] = useState("");

    const filteredPosts = posts.filter(
        (post) =>
            post.text
                .toLowerCase()
                .includes(search.toLowerCase()) ||
            post.author
                .toLowerCase()
                .includes(search.toLowerCase())
    );

    const updateStatus = (id, status) => {
        setPosts((prev) =>
            prev.map((post) =>
                post.id === id
                    ? { ...post, status }
                    : post
            )
        );
    };

    const removePost = (id) => {
        setPosts((prev) =>
            prev.filter((post) => post.id !== id)
        );
    };

    return (
        <div className="min-h-screen bg-background">

            <main className="mx-auto max-w-[1200px] px-6 py-10 lg:px-10">

                <div className="border-b border-white/10 pb-8">

                    <p className="sectionLabel">
                        Yönetim
                    </p>

                    <h1 className="mt-3 font-heading text-3xl">
                        Pano
                    </h1>

                    <p className="mt-2 text-sm text-shadow-white/40">
                        Okurların pano paylaşımlarını yönet.
                    </p>

                </div>

                <div className="mt-8 relative">

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
                        placeholder="Paylaşım ara..."
                        className="adminInput pl-11"
                    />

                </div>

                <div className="mt-6 space-y-3">

                    {filteredPosts.map((post) => (

                        <article
                            key={post.id}
                            className="border border-white/10 p-6"
                        >

                            <div className="
                                flex
                                flex-col
                                gap-5
                                md:flex-row
                                md:justify-between
                            ">

                                <div>

                                    <div className="flex items-center gap-3">

                                        <p className="
                                            text-xs
                                            text-header-accent
                                        ">
                                            {post.author}
                                        </p>

                                        <p className="
                                            text-[9px]
                                            text-shadow-white/30
                                        ">
                                            {post.date}
                                        </p>

                                        <Status status={post.status} />

                                    </div>

                                    <p className="
                                        mt-4
                                        max-w-3xl
                                        text-sm
                                        leading-7
                                        text-shadow-white/75
                                    ">
                                        {post.text}
                                    </p>

                                </div>

                                <div className="flex gap-2">

                                    {post.status === "pending" && (
                                        <button
                                            onClick={() =>
                                                updateStatus(
                                                    post.id,
                                                    "published"
                                                )
                                            }
                                            className="actionButton"
                                        >
                                            <HiCheck />
                                        </button>
                                    )}

                                    <button
                                        onClick={() =>
                                            updateStatus(
                                                post.id,
                                                "hidden"
                                            )
                                        }
                                        className="actionButton"
                                    >
                                        <HiX />
                                    </button>

                                    <button
                                        onClick={() =>
                                            removePost(post.id)
                                        }
                                        className="
                                            actionButton
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

const Status = ({ status }) => (
    <span className={`
        text-[8px]
        uppercase
        tracking-[0.15em]
        ${
        status === "published"
            ? "text-green-400"
            : status === "pending"
                ? "text-yellow-400"
                : "text-shadow-white/30"
    }
    `}>
        {status === "published"
            ? "Yayında"
            : status === "pending"
                ? "Bekliyor"
                : "Gizli"}
    </span>
);

export default Board;
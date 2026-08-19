import { useState } from "react";
import { HiPlus } from "react-icons/hi";

import BoardPost from "../../components/base/board/BoardPost.jsx";
import BoardForm from "../../components/base/board/BoardForm.jsx";

const Board = () => {
    const [isCreating, setIsCreating] = useState(false);

    const [posts, setPosts] = useState([
        {
            id: 1,
            author: "Mehri",
            date: "2 saat önce",
            content:
                "Bu kitabın sonunu gerçekten beklemiyordum. Son bölümdeki olaylar, tüm hikâyeye farklı bir açıdan bakmama neden oldu.",
            likes: 12,
            comments: 4,
        },
        {
            id: 2,
            author: "Okur",
            date: "Dün",
            content:
                "Sizce ana karakterin son kararı doğru muydu? Bence başka bir seçim yapabilirdi.",
            likes: 8,
            comments: 2,
        },
        {
            id: 3,
            author: "Aysel",
            date: "3 gün önce",
            content:
                "Bu kitapta en çok hoşuma giden şey, karakterlerin çok gerçek hissettirmesi.",
            likes: 19,
            comments: 6,
        },
    ]);

    const handleCreate = (content) => {
        const newPost = {
            id: Date.now(),
            author: "Mehri",
            date: "Şimdi",
            content,
            likes: 0,
            comments: 0,
        };

        setPosts((prev) => [
            newPost,
            ...prev,
        ]);

        setIsCreating(false);
    };

    const handleDelete = (id) => {
        setPosts((prev) =>
            prev.filter((post) => post.id !== id)
        );
    };

    return (
        <div className="
            min-h-screen
            bg-background
            text-shadow-white
        ">

            <main className="
                mx-auto
                max-w-[900px]
                px-6
                py-16
                lg:px-10
                lg:py-24
            ">

                {/* HEADER */}

                <header className="
                    flex
                    items-end
                    justify-between
                    gap-6
                    border-b
                    border-white/10
                    pb-8
                ">

                    <div>

                        <p className="
                            text-[10px]
                            uppercase
                            tracking-[0.3em]
                            text-header-accent
                        ">
                            Okur topluluğu
                        </p>

                        <h1 className="
                            mt-4
                            font-heading
                            text-4xl
                            sm:text-5xl
                        ">
                            Fikir panosu
                        </h1>

                        <p className="
                            mt-4
                            max-w-xl
                            text-sm
                            leading-7
                            text-shadow-white/40
                        ">
                            Kitaplar hakkındaki düşüncelerini,
                            eleştirilerini, teorilerini ve
                            hislerini diğer okurlarla paylaş.
                        </p>

                    </div>

                    <button
                        type="button"
                        onClick={() => setIsCreating(true)}
                        className="
                            flex
                            shrink-0
                            items-center
                            gap-2
                            border
                            border-header-accent
                            px-4
                            py-3
                            text-[9px]
                            uppercase
                            tracking-[0.2em]
                            text-header-accent
                            transition-colors
                            hover:bg-header-accent
                            hover:text-white
                        "
                    >
                        <HiPlus className="h-4 w-4" />
                        Yaz
                    </button>

                </header>

                {/* FORM */}

                {isCreating && (
                    <BoardForm
                        onClose={() =>
                            setIsCreating(false)
                        }
                        onSubmit={handleCreate}
                    />
                )}

                {/* POSTS */}

                <section className="mt-10">

                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <BoardPost
                                key={post.id}
                                post={post}
                                currentUser="Mehri"
                                onDelete={handleDelete}
                            />
                        ))
                    ) : (
                        <div className="
                            border
                            border-dashed
                            border-white/10
                            px-6
                            py-16
                            text-center
                        ">
                            <p className="
                                text-sm
                                text-shadow-white/30
                            ">
                                Henüz bir paylaşım yok.
                            </p>
                        </div>
                    )}

                </section>

            </main>

        </div>
    );
};

export default Board;
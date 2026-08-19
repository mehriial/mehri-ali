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
            date: "2 saat əvvəl",
            content:
                "Bu kitabın sonunu həqiqətən gözləmirdim. Son bölümdəki hadisələr bütün hekayəyə başqa tərəfdən baxmağıma səbəb oldu.",
            likes: 12,
            comments: 4,
        },
        {
            id: 2,
            author: "Okur",
            date: "Dünən",
            content:
                "Sizcə əsas obrazın son qərarı doğru idi? Məncə başqa bir seçim edə bilərdi.",
            likes: 8,
            comments: 2,
        },
        {
            id: 3,
            author: "Aysel",
            date: "3 gün əvvəl",
            content:
                "Bu kitab haqqında ən çox xoşuma gələn şey obrazların çox real hiss olunmasıdır.",
            likes: 19,
            comments: 6,
        },
    ]);

    const handleCreate = (content) => {

        const newPost = {
            id: Date.now(),
            author: "Mehri",
            date: "İndi",
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
                            Oxucu icması
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
                            Kitablar haqqında düşüncələrini,
                            tənqidlərini, nəzəriyyələrini və
                            hisslərini digər oxucularla paylaş.
                        </p>

                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            setIsCreating(true)
                        }
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
                                Henüz bir paylaşım yoxdur.
                            </p>
                        </div>
                    )}

                </section>

            </main>

        </div>
    );
};

export default Board;
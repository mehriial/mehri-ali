import { HiTrash } from "react-icons/hi";

const BoardPost = ({
                       post,
                       currentUser = "Mehri",
                       onDelete,
                   }) => {

    const isOwner =
        post.author === currentUser;

    return (
        <article className="
            group
            border-b
            border-white/10
            py-8
            first:pt-0
        ">

            {/* AUTHOR */}

            <div className="
                flex
                items-start
                justify-between
                gap-4
            ">

                <div className="
                    flex
                    items-center
                    gap-3
                ">

                    <div className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/10
                        text-xs
                        text-header-accent
                    ">
                        {post.author
                            ?.charAt(0)
                            ?.toUpperCase()}
                    </div>

                    <div>

                        <p className="
                            text-xs
                            font-medium
                            text-white
                        ">
                            {post.author}
                        </p>

                        <p className="
                            mt-1
                            text-[9px]
                            text-shadow-white/30
                        ">
                            {post.date}
                        </p>

                    </div>

                </div>

                {isOwner && (
                    <button
                        type="button"
                        onClick={() =>
                            onDelete(post.id)
                        }
                        className="
                            text-shadow-white/20
                            opacity-0
                            transition-all
                            group-hover:opacity-100
                            hover:text-red-400
                        "
                        title="Paylaşımı sil"
                    >
                        <HiTrash className="h-4 w-4" />
                    </button>
                )}

            </div>

            {/* CONTENT */}

            <p className="
                mt-5
                text-sm
                leading-7
                text-shadow-white/70
            ">
                {post.content}
            </p>
        </article>
    );
};

export default BoardPost;
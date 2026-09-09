import { useEffect, useMemo, useState } from "react";

import { initialBoardPosts } from "@/data/board";

import BoardHeader from "./BoardHeader";
import BoardComposer from "./BoardComposer.jsx";
import BoardPost from "./BoardPost";
import BoardEmpty from "./BoardEmpty";

const STORAGE_KEY = "boardPosts";

function Board() {
    const [posts, setPosts] = useState(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);

            if (stored) {
                return JSON.parse(stored);
            }

            return initialBoardPosts;
        } catch {
            return initialBoardPosts;
        }
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    }, [posts]);

    const visiblePosts = useMemo(() => {
        return posts
            .filter((post) => post.status === "approved")
            .sort((a, b) => b.id - a.id);
    }, [posts]);

    const handleCreatePost = ({ text, image }) => {
        const newPost = {
            id: Date.now(),
            username: "Mehri",
            type: image && text ? "text-image" : image ? "image" : "text",
            text: text || "",
            image: image || null,
            status: image ? "pending" : "approved",
            createdAt: "Şimdi",
            isMine: true,
            comments: [],
        };

        setPosts((current) => [newPost, ...current]);
    };

    const handleDeletePost = (postId) => {
        setPosts((current) =>
            current.filter((post) => post.id !== postId)
        );
    };

    const handleAddComment = (postId, comment) => {
        setPosts((current) =>
            current.map((post) => {
                if (post.id !== postId) {
                    return post;
                }

                return {
                    ...post,
                    comments: [
                        ...(post.comments ?? []),
                        comment,
                    ],
                };
            })
        );
    };

    const handleDeleteComment = (postId, commentId) => {
        setPosts((current) =>
            current.map((post) => {
                if (post.id !== postId) {
                    return post;
                }

                return {
                    ...post,
                    comments: (post.comments ?? []).filter(
                        (comment) => comment.id !== commentId
                    ),
                };
            })
        );
    };

    const handleAddReply = (postId, commentId, reply) => {
        setPosts((current) =>
            current.map((post) => {
                if (post.id !== postId) {
                    return post;
                }

                return {
                    ...post,
                    comments: (post.comments ?? []).map((comment) => {
                        if (comment.id !== commentId) {
                            return comment;
                        }

                        return {
                            ...comment,
                            replies: [
                                ...(comment.replies ?? []),
                                reply,
                            ],
                        };
                    }),
                };
            })
        );
    };

    return (
        <div className="overflow-hidden pt-24">
            <section>
                <div className="mx-auto max-w-[900px] px-5 pb-24 pt-12 sm:px-8 lg:pb-32 lg:pt-16">
                    <BoardHeader />

                    <div className="mt-12">
                        <BoardComposer onSubmit={handleCreatePost} />
                    </div>

                    <div className="mt-12">
                        {visiblePosts.length > 0 ? (
                            <div className="divide-y divide-white/[0.07]">
                                {visiblePosts.map((post) => (
                                    <BoardPost
                                        key={post.id}
                                        post={post}
                                        onDelete={handleDeletePost}
                                        onAddComment={handleAddComment}
                                        onDeleteComment={handleDeleteComment}
                                        onAddReply={handleAddReply}
                                    />
                                ))}
                            </div>
                        ) : (
                            <BoardEmpty />
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Board;
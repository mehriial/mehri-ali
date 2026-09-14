import { useEffect, useMemo, useState } from "react";
import { MessageSquare } from "lucide-react";

import AdminPageHeader from "@/components/Common/admin/AdminPageHeader.jsx";
import AdminFilters from "@/components/Common/admin/AdminFilters.jsx";
import AdminDialog from "@/components/Common/admin/AdminDialog.jsx";
import AdminConfirmDialog from "@/components/Common/admin/AdminConfirmDialog.jsx";

import BoardPostCard from "./BoardPostCard.jsx";

const BOARD_STORAGE_KEY = "boardPosts";

function Board() {
    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const [previewPost, setPreviewPost] = useState(null);

    const [deletePost, setDeletePost] = useState(null);
    const [rejectPost, setRejectPost] = useState(null);

    useEffect(() => {
        const savedPosts = localStorage.getItem(BOARD_STORAGE_KEY);

        if (!savedPosts) {
            setPosts([]);
            return;
        }

        try {
            const parsedPosts = JSON.parse(savedPosts);

            setPosts(
                Array.isArray(parsedPosts)
                    ? parsedPosts
                    : []
            );
        } catch (error) {
            console.error(
                "Pano gönderileri okunamadı:",
                error
            );

            setPosts([]);
        }
    }, []);

    const savePosts = (nextPosts) => {
        setPosts(nextPosts);
        localStorage.setItem(
            BOARD_STORAGE_KEY,
            JSON.stringify(nextPosts)
        );
    };

    const filteredPosts = useMemo(() => {
        const normalizedSearch = search
            .trim()
            .toLowerCase();

        return posts.filter((post) => {
            const matchesSearch =
                !normalizedSearch ||
                post.username
                    ?.toLowerCase()
                    .includes(normalizedSearch) ||
                post.text
                    ?.toLowerCase()
                    .includes(normalizedSearch);

            const matchesStatus =
                statusFilter === "all" ||
                post.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [posts, search, statusFilter]);

    const pendingCount = posts.filter(
        (post) => post.status === "pending"
    ).length;

    const handleApprove = (postId) => {
        const nextPosts = posts.map((post) =>
            post.id === postId
                ? {
                    ...post,
                    status: "approved",
                    approvedAt:
                        new Date().toISOString(),
                }
                : post
        );

        savePosts(nextPosts);
    };

    const handleReject = () => {
        if (!rejectPost) return;

        const nextPosts = posts.map((post) =>
            post.id === rejectPost.id
                ? {
                    ...post,
                    status: "rejected",
                    rejectedAt:
                        new Date().toISOString(),
                }
                : post
        );

        savePosts(nextPosts);
        setRejectPost(null);
    };

    const handleDelete = () => {
        if (!deletePost) return;

        const nextPosts = posts.filter(
            (post) => post.id !== deletePost.id
        );

        savePosts(nextPosts);
        setDeletePost(null);
    };

    return (
        <div className="space-y-8">
            <AdminPageHeader
                eyebrow="İçerik yönetimi"
                title="Pano"
                description="Pano gönderilerini inceleyin ve topluluk içeriklerini yönetin."
            />

            {pendingCount > 0 && (
                <div className="flex items-center gap-3 rounded-2xl border border-amber-500/10 bg-amber-500/[0.04] px-4 py-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/10">
                        <MessageSquare className="h-4 w-4 text-amber-400" />
                    </div>

                    <div>
                        <p className="text-sm font-medium text-white/80">
                            {pendingCount} gönderi onay bekliyor
                        </p>

                        <p className="mt-0.5 text-xs text-white/30">
                            Fotoğraflı pano gönderileri yayınlanmadan önce
                            onaylanmalıdır.
                        </p>
                    </div>
                </div>
            )}

            <AdminFilters
                search={search}
                onSearchChange={setSearch}
                searchPlaceholder="Kullanıcı veya gönderi ara..."
                filters={[
                    {
                        key: "status",
                        value: statusFilter,
                        onChange: setStatusFilter,
                        placeholder: "Durum",
                        options: [
                            {
                                value: "all",
                                label: "Tüm gönderiler",
                            },
                            {
                                value: "pending",
                                label: "Bekliyor",
                            },
                            {
                                value: "approved",
                                label: "Onaylandı",
                            },
                            {
                                value: "rejected",
                                label: "Reddedildi",
                            },
                        ],
                    },
                ]}
            />

            {filteredPosts.length > 0 ? (
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {filteredPosts.map((post) => (
                        <BoardPostCard
                            key={post.id}
                            post={post}
                            onPreview={() =>
                                setPreviewPost(post)
                            }
                            onApprove={() =>
                                handleApprove(post.id)
                            }
                            onReject={() =>
                                setRejectPost(post)
                            }
                            onDelete={() =>
                                setDeletePost(post)
                            }
                        />
                    ))}
                </div>
            ) : (
                <div className="flex min-h-[240px] items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.02]">
                    <div className="text-center">
                        <MessageSquare className="mx-auto h-8 w-8 text-white/15" />

                        <p className="mt-4 text-sm text-white/35">
                            Gönderi bulunamadı.
                        </p>
                    </div>
                </div>
            )}

            <AdminDialog
                open={Boolean(previewPost)}
                onOpenChange={(open) => {
                    if (!open) {
                        setPreviewPost(null);
                    }
                }}
                title="Pano gönderisi"
                className="sm:max-w-[700px]"
            >
                {previewPost && (
                    <div className="space-y-5">
                        {previewPost.image && (
                            <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-black">
                                <img
                                    src={previewPost.image}
                                    alt="Pano gönderisi"
                                    className="max-h-[500px] w-full object-contain"
                                />
                            </div>
                        )}

                        <div>
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-sm font-medium text-white">
                                        {previewPost.username}
                                    </p>

                                    <p className="mt-1 text-xs text-white/25">
                                        {previewPost.createdAt}
                                    </p>
                                </div>

                                <StatusBadge
                                    status={previewPost.status}
                                />
                            </div>

                            {previewPost.text && (
                                <p className="mt-5 whitespace-pre-wrap text-sm leading-7 text-white/60">
                                    {previewPost.text}
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </AdminDialog>

            <AdminConfirmDialog
                open={Boolean(deletePost)}
                onOpenChange={(open) => {
                    if (!open) {
                        setDeletePost(null);
                    }
                }}
                title="Gönderiyi sil"
                description="Bu pano gönderisini silmek istediğinizden emin misiniz? Bu işlem geri alınamaz."
                confirmText="Gönderiyi sil"
                onConfirm={handleDelete}
            />

            <AdminConfirmDialog
                open={Boolean(rejectPost)}
                onOpenChange={(open) => {
                    if (!open) {
                        setRejectPost(null);
                    }
                }}
                title="Gönderiyi reddet"
                description="Bu gönderiyi reddetmek istediğinizden emin misiniz?"
                confirmText="Reddet"
                onConfirm={handleReject}
            />
        </div>
    );
}

function StatusBadge({ status }) {
    if (status === "pending") {
        return (
            <span className="rounded-full bg-amber-500/15 px-2.5 py-1 text-[10px] font-medium text-amber-400">
                Bekliyor
            </span>
        );
    }

    if (status === "approved") {
        return (
            <span className="rounded-full bg-emerald-500/15 px-2.5 py-1 text-[10px] font-medium text-emerald-400">
                Onaylandı
            </span>
        );
    }

    return (
        <span className="rounded-full bg-red-500/15 px-2.5 py-1 text-[10px] font-medium text-red-400">
            Reddedildi
        </span>
    );
}

export default Board;
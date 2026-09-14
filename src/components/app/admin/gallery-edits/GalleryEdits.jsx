import { useEffect, useMemo, useState } from "react";
import {
    ImageIcon,
} from "lucide-react";

import { books as initialBooks } from "@/data/books.js";

import AdminPageHeader from "@/components/common/admin/AdminPageHeader.jsx";
import AdminFilters from "@/components/common/admin/AdminFilters.jsx";
import AdminConfirmDialog from "@/components/common/admin/AdminConfirmDialog.jsx";
import AdminDialog from "@/components/common/admin/AdminDialog.jsx";
import GalleryEditCard from "@/components/app/admin/gallery-edits/GalleryEditCard.jsx";


const STORAGE_KEY = "galleryEdits";

const INITIAL_EDITS = [
    {
        id: 1,
        username: "Lina",
        userAvatar: null,
        bookId: 1,
        bookTitle: "Yazgı Paradoksu",
        image: "/images/edit-1.jpg",
        title: "Yazgı Paradoksu Edit",
        description:
            "Anka ve Harun için hazırladığım edit.",
        status: "pending",
        createdAt: "2 saat önce",
    },
    {
        id: 2,
        username: "Elif",
        userAvatar: null,
        bookId: 1,
        bookTitle: "Yazgı Paradoksu",
        image: "/images/edit-2.jpg",
        title: "Verus Serisi",
        description:
            "Verus Serisi için hazırladığım bir edit.",
        status: "pending",
        createdAt: "5 saat önce",
    },
];

function GalleryEdits() {
    const [edits, setEdits] = useState(
        () => {
            try {
                const stored =
                    localStorage.getItem(
                        STORAGE_KEY
                    );

                if (stored) {
                    return JSON.parse(stored);
                }

                return INITIAL_EDITS;
            } catch {
                return INITIAL_EDITS;
            }
        }
    );

    const [search, setSearch] =
        useState("");

    const [activeBook, setActiveBook] =
        useState("all");

    const [activeStatus, setActiveStatus] =
        useState("pending");

    const [previewItem, setPreviewItem] =
        useState(null);

    const [confirmAction, setConfirmAction] =
        useState(null);

    useEffect(() => {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(edits)
        );
    }, [edits]);

    const bookOptions = useMemo(() => {
        return initialBooks.map((book) => ({
            value: String(book.id),
            label: book.title,
        }));
    }, []);

    const filteredEdits = useMemo(() => {
        const normalizedSearch =
            search.trim().toLowerCase();

        return edits.filter((edit) => {
            const matchesSearch =
                !normalizedSearch ||
                edit.title
                    ?.toLowerCase()
                    .includes(normalizedSearch) ||
                edit.username
                    ?.toLowerCase()
                    .includes(normalizedSearch) ||
                edit.bookTitle
                    ?.toLowerCase()
                    .includes(normalizedSearch);

            const matchesBook =
                activeBook === "all" ||
                String(edit.bookId) ===
                activeBook;

            const matchesStatus =
                activeStatus === "all" ||
                edit.status === activeStatus;

            return (
                matchesSearch &&
                matchesBook &&
                matchesStatus
            );
        });
    }, [
        edits,
        search,
        activeBook,
        activeStatus,
    ]);

    const pendingCount = edits.filter(
        (edit) =>
            edit.status === "pending"
    ).length;

    const handleApprove = (edit) => {
        setConfirmAction({
            type: "approve",
            item: edit,
        });
    };

    const handleReject = (edit) => {
        setConfirmAction({
            type: "reject",
            item: edit,
        });
    };

    const handleDelete = (edit) => {
        setConfirmAction({
            type: "delete",
            item: edit,
        });
    };

    const handleConfirmAction = () => {
        if (!confirmAction) {
            return;
        }

        const { type, item } =
            confirmAction;

        if (type === "approve") {
            setEdits((current) =>
                current.map((edit) =>
                    edit.id === item.id
                        ? {
                            ...edit,
                            status:
                                "approved",
                            approvedAt:
                                new Date().toISOString(),
                        }
                        : edit
                )
            );
        }

        if (type === "reject") {
            setEdits((current) =>
                current.map((edit) =>
                    edit.id === item.id
                        ? {
                            ...edit,
                            status:
                                "rejected",
                            rejectedAt:
                                new Date().toISOString(),
                        }
                        : edit
                )
            );
        }

        if (type === "delete") {
            setEdits((current) =>
                current.filter(
                    (edit) =>
                        edit.id !==
                        item.id
                )
            );
        }

        setConfirmAction(null);
    };

    const getConfirmConfig = () => {
        if (!confirmAction) {
            return null;
        }

        const { type, item } =
            confirmAction;

        if (type === "approve") {
            return {
                title: "Editi onayla",
                description: `"${item.title || "Bu edit"}" adlı editi onaylamak istediğinizden emin misiniz? Onaylandıktan sonra galeride "Sizden Gelenler" bölümünde görünecek.`,
                confirmText:
                    "Onayla",
            };
        }

        if (type === "reject") {
            return {
                title: "Editi reddet",
                description: `"${item.title || "Bu edit"}" adlı editi reddetmek istediğinizden emin misiniz?`,
                confirmText:
                    "Reddet",
            };
        }

        return {
            title: "Editi sil",
            description: `"${item.title || "Bu edit"}" adlı editi kalıcı olarak silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`,
            confirmText: "Sil",
        };
    };

    const confirmConfig =
        getConfirmConfig();

    return (
        <div className="mx-auto max-w-[1440px]">
            <AdminPageHeader
                eyebrow="İçerik Yönetimi"
                title="Edit Onayları"
                description="Kullanıcılar tarafından gönderilen editleri inceleyin ve yayınlanmadan önce yönetin."
            />

            {/* PENDING INFO */}

            {pendingCount > 0 && (
                <div className="mt-6 flex items-center gap-3 rounded-xl border border-amber-500/10 bg-amber-500/[0.04] px-4 py-3">
                    <ImageIcon className="h-4 w-4 shrink-0 text-amber-400" />

                    <p className="text-sm text-white/50">
                        <span className="font-medium text-amber-400">
                            {pendingCount}
                        </span>{" "}
                        edit onay bekliyor.
                    </p>
                </div>
            )}

            {/* FILTERS */}

            <div className="mt-6">
                <AdminFilters
                    search={search}
                    onSearchChange={setSearch}
                    searchPlaceholder="Edit, kullanıcı veya kitap ara..."
                    filters={[
                        {
                            key: "book",
                            value: activeBook,
                            onChange:
                            setActiveBook,
                            placeholder:
                                "Kitap",
                            options: [
                                {
                                    value: "all",
                                    label:
                                        "Tüm Kitaplar",
                                },
                                ...bookOptions,
                            ],
                        },
                        {
                            key: "status",
                            value: activeStatus,
                            onChange:
                            setActiveStatus,
                            placeholder:
                                "Durum",
                            options: [
                                {
                                    value: "all",
                                    label:
                                        "Tüm Durumlar",
                                },
                                {
                                    value: "pending",
                                    label:
                                        "Bekliyor",
                                },
                                {
                                    value: "approved",
                                    label:
                                        "Onaylandı",
                                },
                                {
                                    value: "rejected",
                                    label:
                                        "Reddedildi",
                                },
                            ],
                        },
                    ]}
                />
            </div>

            {/* GRID */}

            <div className="mt-6">
                {filteredEdits.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {filteredEdits.map(
                            (edit) => (
                                <GalleryEditCard
                                    key={
                                        edit.id
                                    }
                                    item={edit}
                                    onPreview={() =>
                                        setPreviewItem(
                                            edit
                                        )
                                    }
                                    onApprove={() =>
                                        handleApprove(
                                            edit
                                        )
                                    }
                                    onReject={() =>
                                        handleReject(
                                            edit
                                        )
                                    }
                                    onDelete={() =>
                                        handleDelete(
                                            edit
                                        )
                                    }
                                />
                            )
                        )}
                    </div>
                ) : (
                    <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.02]">
                        <div className="text-center">
                            <ImageIcon className="mx-auto h-8 w-8 text-white/15" />

                            <p className="mt-3 text-sm text-white/30">
                                Gösterilecek edit bulunamadı.
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* PREVIEW */}

            <AdminDialog
                open={Boolean(
                    previewItem
                )}
                onOpenChange={(open) => {
                    if (!open) {
                        setPreviewItem(
                            null
                        );
                    }
                }}
                title={
                    previewItem?.title ||
                    "Edit Önizleme"
                }
                className="sm:max-w-[900px]"
            >
                {previewItem && (
                    <div className="space-y-5">
                        <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-black">
                            <img
                                src={
                                    previewItem.image
                                }
                                alt={
                                    previewItem.title ||
                                    "Edit"
                                }
                                className="max-h-[70vh] w-full object-contain"
                            />
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <p className="text-[10px] uppercase tracking-[0.2em] text-white/25">
                                    Gönderen
                                </p>

                                <p className="mt-1 text-sm text-white/70">
                                    {
                                        previewItem.username
                                    }
                                </p>
                            </div>

                            <div>
                                <p className="text-[10px] uppercase tracking-[0.2em] text-white/25">
                                    Kitap
                                </p>

                                <p className="mt-1 text-sm text-white/70">
                                    {
                                        previewItem.bookTitle
                                    }
                                </p>
                            </div>
                        </div>

                        {previewItem.description && (
                            <div>
                                <p className="text-[10px] uppercase tracking-[0.2em] text-white/25">
                                    Açıklama
                                </p>

                                <p className="mt-2 text-sm leading-6 text-white/50">
                                    {
                                        previewItem.description
                                    }
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </AdminDialog>

            {/* CONFIRM */}

            {confirmConfig && (
                <AdminConfirmDialog
                    open={Boolean(
                        confirmAction
                    )}
                    onOpenChange={(open) => {
                        if (!open) {
                            setConfirmAction(
                                null
                            );
                        }
                    }}
                    title={
                        confirmConfig.title
                    }
                    description={
                        confirmConfig.description
                    }
                    confirmText={
                        confirmConfig.confirmText
                    }
                    onConfirm={
                        handleConfirmAction
                    }
                />
            )}
        </div>
    );
}

export default GalleryEdits;
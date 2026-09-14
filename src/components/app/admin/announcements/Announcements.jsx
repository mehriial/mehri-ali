import { useMemo, useState } from "react";
import {
    Bell,
    Eye,
    Plus,
} from "lucide-react";

import { books } from "@/data/books.js";
import {
    initialAnnouncements,
} from "@/data/announcements.js";

import AdminPageHeader from "@/components/common/admin/AdminPageHeader.jsx";
import AdminFilters from "@/components/common/admin/AdminFilters.jsx";
import AdminTable from "@/components/common/admin/AdminTable.jsx";
import AdminTableActions from "@/components/common/admin/AdminTableActions.jsx";
import AdminDialog from "@/components/common/admin/AdminDialog.jsx";
import AdminConfirmDialog from "@/components/common/admin/AdminConfirmDialog.jsx";

import AnnouncementForm from "./AnnouncementForm.jsx";

const STORAGE_KEY = "adminAnnouncements";

function getInitialAnnouncements() {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
        return initialAnnouncements;
    }

    try {
        const parsed = JSON.parse(saved);

        return Array.isArray(parsed)
            ? parsed
            : initialAnnouncements;
    } catch {
        return initialAnnouncements;
    }
}

function Announcements() {
    const [announcements, setAnnouncements] = useState(
        getInitialAnnouncements
    );

    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("all");
    const [statusFilter, setStatusFilter] =
        useState("all");

    const [formOpen, setFormOpen] = useState(false);
    const [editingAnnouncement, setEditingAnnouncement] =
        useState(null);

    const [previewAnnouncement, setPreviewAnnouncement] =
        useState(null);

    const [deleteAnnouncement, setDeleteAnnouncement] =
        useState(null);

    const saveAnnouncements = (nextAnnouncements) => {
        setAnnouncements(nextAnnouncements);

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(nextAnnouncements)
        );
    };

    const filteredAnnouncements = useMemo(() => {
        const normalizedSearch = search
            .trim()
            .toLowerCase();

        return announcements.filter((announcement) => {
            const matchesSearch =
                !normalizedSearch ||
                announcement.title
                    ?.toLowerCase()
                    .includes(normalizedSearch) ||
                announcement.content
                    ?.toLowerCase()
                    .includes(normalizedSearch);

            const matchesType =
                typeFilter === "all" ||
                announcement.type === typeFilter;

            const matchesStatus =
                statusFilter === "all" ||
                announcement.status === statusFilter;

            return (
                matchesSearch &&
                matchesType &&
                matchesStatus
            );
        });
    }, [
        announcements,
        search,
        typeFilter,
        statusFilter,
    ]);

    const handleCreate = (data) => {
        const newAnnouncement = {
            id: Date.now(),
            ...data,
            createdAt: new Date().toLocaleDateString(
                "tr-TR",
                {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                }
            ),
        };

        saveAnnouncements([
            newAnnouncement,
            ...announcements,
        ]);

        setFormOpen(false);
    };

    const handleUpdate = (data) => {
        if (!editingAnnouncement) return;

        const nextAnnouncements =
            announcements.map((announcement) =>
                announcement.id ===
                editingAnnouncement.id
                    ? {
                        ...announcement,
                        ...data,
                        updatedAt:
                            new Date().toISOString(),
                    }
                    : announcement
            );

        saveAnnouncements(nextAnnouncements);

        setEditingAnnouncement(null);
        setFormOpen(false);
    };

    const handleDelete = () => {
        if (!deleteAnnouncement) return;

        const nextAnnouncements =
            announcements.filter(
                (announcement) =>
                    announcement.id !==
                    deleteAnnouncement.id
            );

        saveAnnouncements(nextAnnouncements);

        setDeleteAnnouncement(null);
    };

    const handleEdit = (announcement) => {
        setEditingAnnouncement(announcement);
        setFormOpen(true);
    };

    const handleCloseForm = () => {
        setFormOpen(false);
        setEditingAnnouncement(null);
    };

    const getBookTitle = (slug) => {
        if (!slug) return "-";

        return (
            books.find(
                (book) => book.slug === slug
            )?.title || "-"
        );
    };

    const getTypeLabel = (type) => {
        const labels = {
            general: "Genel",
            book: "Kitap",
            gallery: "Galeri",
            system: "Sistem",
        };

        return labels[type] || type;
    };

    const getStatusLabel = (status) => {
        return status === "published"
            ? "Yayında"
            : "Taslak";
    };

    const columns = [
        {
            key: "title",
            label: "Duyuru",
            render: (row) => (
                <div className="min-w-0 max-w-[320px]">
                    <p className="truncate font-medium text-white/80">
                        {row.title}
                    </p>

                    <p className="mt-1 truncate text-xs text-white/25">
                        {row.content}
                    </p>
                </div>
            ),
        },
        {
            key: "type",
            label: "Tip",
            render: (row) => (
                <span className="rounded-full bg-white/[0.05] px-2.5 py-1 text-[10px] text-white/50">
                    {getTypeLabel(row.type)}
                </span>
            ),
        },
        {
            key: "book",
            label: "Kitap",
            render: (row) =>
                getBookTitle(row.bookSlug),
        },
        {
            key: "status",
            label: "Durum",
            render: (row) => (
                <span
                    className={
                        row.status === "published"
                            ? "text-xs text-emerald-400"
                            : "text-xs text-amber-400"
                    }
                >
                    {getStatusLabel(row.status)}
                </span>
            ),
        },
        {
            key: "createdAt",
            label: "Tarih",
        },
    ];

    return (
        <div className="space-y-8">
            <AdminPageHeader
                eyebrow="İçerik yönetimi"
                title="Duyurular"
                description="Site genelindeki duyuruları oluşturun, düzenleyin ve yönetin."
                action={{
                    label: "Yeni duyuru",
                    icon: <Plus className="h-4 w-4" />,
                    onClick: () => {
                        setEditingAnnouncement(null);
                        setFormOpen(true);
                    },
                }}
            />

            <AdminFilters
                search={search}
                onSearchChange={setSearch}
                searchPlaceholder="Duyuru ara..."
                filters={[
                    {
                        key: "type",
                        value: typeFilter,
                        onChange: setTypeFilter,
                        placeholder: "Duyuru tipi",
                        options: [
                            {
                                value: "all",
                                label: "Tüm tipler",
                            },
                            {
                                value: "general",
                                label: "Genel",
                            },
                            {
                                value: "book",
                                label: "Kitap",
                            },
                            {
                                value: "gallery",
                                label: "Galeri",
                            },
                            {
                                value: "system",
                                label: "Sistem",
                            },
                        ],
                    },
                    {
                        key: "status",
                        value: statusFilter,
                        onChange: setStatusFilter,
                        placeholder: "Durum",
                        options: [
                            {
                                value: "all",
                                label: "Tüm durumlar",
                            },
                            {
                                value: "published",
                                label: "Yayında",
                            },
                            {
                                value: "draft",
                                label: "Taslak",
                            },
                        ],
                    },
                ]}
            />

            <AdminTable
                columns={columns}
                data={filteredAnnouncements}
                actions={(row) => (
                    <AdminTableActions
                        onView={() =>
                            setPreviewAnnouncement(
                                row
                            )
                        }
                        onEdit={() =>
                            handleEdit(row)
                        }
                        onDelete={() =>
                            setDeleteAnnouncement(
                                row
                            )
                        }
                    />
                )}
                emptyMessage="Gösterilecek duyuru bulunamadı."
            />

            <AdminDialog
                open={formOpen}
                onOpenChange={(open) => {
                    if (!open) {
                        handleCloseForm();
                    }
                }}
                title={
                    editingAnnouncement
                        ? "Duyuruyu düzenle"
                        : "Yeni duyuru"
                }
                className="sm:max-w-[650px]"
            >
                <AnnouncementForm
                    initialData={
                        editingAnnouncement
                    }
                    books={books}
                    onSubmit={
                        editingAnnouncement
                            ? handleUpdate
                            : handleCreate
                    }
                    onCancel={handleCloseForm}
                />
            </AdminDialog>

            <AdminDialog
                open={Boolean(
                    previewAnnouncement
                )}
                onOpenChange={(open) => {
                    if (!open) {
                        setPreviewAnnouncement(
                            null
                        );
                    }
                }}
                title="Duyuru önizleme"
                className="sm:max-w-[650px]"
            >
                {previewAnnouncement && (
                    <div className="space-y-5">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.05]">
                                    <Bell className="h-4 w-4 text-white/50" />
                                </span>

                                <span className="text-xs text-white/30">
                                    {getTypeLabel(
                                        previewAnnouncement.type
                                    )}
                                </span>
                            </div>

                            <h2 className="mt-5 text-xl font-medium text-white">
                                {
                                    previewAnnouncement.title
                                }
                            </h2>

                            <p className="mt-2 text-xs text-white/25">
                                {
                                    previewAnnouncement.createdAt
                                }
                            </p>
                        </div>

                        <div className="border-t border-white/[0.06] pt-5">
                            <p className="whitespace-pre-wrap text-sm leading-7 text-white/55">
                                {
                                    previewAnnouncement.content
                                }
                            </p>
                        </div>

                        {previewAnnouncement.bookSlug && (
                            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
                                <p className="text-[10px] uppercase tracking-[0.2em] text-white/20">
                                    İlgili kitap
                                </p>

                                <p className="mt-1 text-sm text-white/60">
                                    {getBookTitle(
                                        previewAnnouncement.bookSlug
                                    )}
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </AdminDialog>

            <AdminConfirmDialog
                open={Boolean(
                    deleteAnnouncement
                )}
                onOpenChange={(open) => {
                    if (!open) {
                        setDeleteAnnouncement(
                            null
                        );
                    }
                }}
                title="Duyuruyu sil"
                description="Bu duyuruyu silmek istediğinizden emin misiniz? Bu işlem geri alınamaz."
                confirmText="Duyuruyu sil"
                onConfirm={handleDelete}
            />
        </div>
    );
}

export default Announcements;
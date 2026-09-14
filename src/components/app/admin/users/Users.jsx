import { useEffect, useMemo, useState } from "react";
import {
    Plus,
    Users as UsersIcon,
} from "lucide-react";

import AdminPageHeader from "@/components/common/admin/AdminPageHeader.jsx";
import AdminFilters from "@/components/common/admin/AdminFilters.jsx";
import AdminTable from "@/components/common/admin/AdminTable.jsx";
import AdminTableActions from "@/components/common/admin/AdminTableActions.jsx";
import AdminDialog from "@/components/common/admin/AdminDialog.jsx";
import AdminConfirmDialog from "@/components/common/admin/AdminConfirmDialog.jsx";

import UserForm from "./UserForm.jsx";
import UserDetails from "./UserDetails.jsx";

const USERS_STORAGE_KEY = "adminUsers";

const INITIAL_USERS = [
    {
        id: 1,
        username: "Mehri",
        email: "mehri@example.com",
        role: "admin",
        status: "active",
        isBlocked: false,
        createdAt: "1 Eylül 2026",
        lastLogin: "14 Eylül 2026",
    },
    {
        id: 2,
        username: "Lina",
        email: "lina@example.com",
        role: "user",
        status: "active",
        isBlocked: false,
        createdAt: "3 Eylül 2026",
        lastLogin: "14 Eylül 2026",
    },
    {
        id: 3,
        username: "Selin",
        email: "selin@example.com",
        role: "user",
        status: "active",
        isBlocked: true,
        createdAt: "5 Eylül 2026",
        lastLogin: "12 Eylül 2026",
    },
    {
        id: 4,
        username: "Elif",
        email: "elif@example.com",
        role: "moderator",
        status: "active",
        isBlocked: false,
        createdAt: "6 Eylül 2026",
        lastLogin: "13 Eylül 2026",
    },
    {
        id: 5,
        username: "Arda",
        email: "arda@example.com",
        role: "user",
        status: "inactive",
        isBlocked: false,
        createdAt: "7 Eylül 2026",
        lastLogin: "10 Eylül 2026",
    },
];

function getInitialUsers() {
    try {
        const saved = localStorage.getItem(
            USERS_STORAGE_KEY
        );

        if (!saved) {
            return INITIAL_USERS;
        }

        const parsed = JSON.parse(saved);

        if (!Array.isArray(parsed)) {
            return INITIAL_USERS;
        }

        return parsed.map((user) => ({
            ...user,
            isBlocked: Boolean(user.isBlocked),
        }));
    } catch {
        return INITIAL_USERS;
    }
}

function Users() {
    const [users, setUsers] = useState(getInitialUsers);

    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");

    const [formOpen, setFormOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const [previewUser, setPreviewUser] = useState(null);

    const [deleteUser, setDeleteUser] = useState(null);
    const [toggleUser, setToggleUser] = useState(null);
    const [blockUser, setBlockUser] = useState(null);

    useEffect(() => {
        localStorage.setItem(
            USERS_STORAGE_KEY,
            JSON.stringify(users)
        );
    }, [users]);

    const filteredUsers = useMemo(() => {
        const normalizedSearch = search
            .trim()
            .toLowerCase();

        return users.filter((user) => {
            const matchesSearch =
                !normalizedSearch ||
                user.username
                    .toLowerCase()
                    .includes(normalizedSearch) ||
                user.email
                    .toLowerCase()
                    .includes(normalizedSearch);

            const matchesRole =
                roleFilter === "all" ||
                user.role === roleFilter;

            const matchesStatus =
                statusFilter === "all" ||
                (statusFilter === "blocked"
                    ? user.isBlocked
                    : !user.isBlocked &&
                    user.status === statusFilter);

            return (
                matchesSearch &&
                matchesRole &&
                matchesStatus
            );
        });
    }, [
        users,
        search,
        roleFilter,
        statusFilter,
    ]);

    const stats = useMemo(() => {
        return {
            total: users.length,

            active: users.filter(
                (user) =>
                    user.status === "active" &&
                    !user.isBlocked
            ).length,

            inactive: users.filter(
                (user) =>
                    user.status === "inactive" &&
                    !user.isBlocked
            ).length,

            blocked: users.filter(
                (user) => user.isBlocked
            ).length,

            admins: users.filter(
                (user) => user.role === "admin"
            ).length,
        };
    }, [users]);

    const openCreate = () => {
        setEditingUser(null);
        setFormOpen(true);
    };

    const openEdit = (user) => {
        setEditingUser(user);
        setFormOpen(true);
    };

    const handleFormSubmit = (formData) => {
        if (editingUser) {
            setUsers((prev) =>
                prev.map((user) =>
                    user.id === editingUser.id
                        ? {
                            ...user,
                            ...formData,
                        }
                        : user
                )
            );
        } else {
            const newUser = {
                id: Date.now(),
                ...formData,
                isBlocked: false,
                createdAt: "15 Eylül 2026",
                lastLogin: "-",
            };

            setUsers((prev) => [
                newUser,
                ...prev,
            ]);
        }

        setFormOpen(false);
        setEditingUser(null);
    };

    const handleDelete = () => {
        if (!deleteUser) {
            return;
        }

        setUsers((prev) =>
            prev.filter(
                (user) =>
                    user.id !== deleteUser.id
            )
        );

        setDeleteUser(null);
    };

    const handleToggleStatus = () => {
        if (!toggleUser) {
            return;
        }

        setUsers((prev) =>
            prev.map((user) =>
                user.id === toggleUser.id
                    ? {
                        ...user,
                        status:
                            user.status === "active"
                                ? "inactive"
                                : "active",
                    }
                    : user
            )
        );

        setToggleUser(null);
    };

    const handleToggleBlock = () => {
        if (!blockUser) {
            return;
        }

        setUsers((prev) =>
            prev.map((user) =>
                user.id === blockUser.id
                    ? {
                        ...user,
                        isBlocked:
                            !user.isBlocked,
                    }
                    : user
            )
        );

        setBlockUser(null);
    };

    const columns = [
        {
            key: "username",
            label: "Kullanıcı",
            render: (user) => (
                <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-xs font-medium text-white">
                        {user.username
                            ?.charAt(0)
                            ?.toUpperCase()}
                    </div>

                    <div className="min-w-0">
                        <p className="truncate font-medium text-white/80">
                            {user.username}
                        </p>

                        <p className="truncate text-xs text-white/30">
                            {user.email}
                        </p>
                    </div>
                </div>
            ),
        },

        {
            key: "role",
            label: "Rol",
            render: (user) => {
                const roleLabels = {
                    user: "Kullanıcı",
                    moderator: "Moderatör",
                    admin: "Admin",
                };

                return (
                    <span className="text-white/60">
                        {roleLabels[user.role] ??
                            user.role}
                    </span>
                );
            },
        },

        {
            key: "status",
            label: "Durum",
            render: (user) => {
                if (user.isBlocked) {
                    return (
                        <span className="inline-flex rounded-full border border-red-500/20 bg-red-500/10 px-2.5 py-1 text-xs text-red-400">
                            Engellendi
                        </span>
                    );
                }

                if (user.status === "active") {
                    return (
                        <span className="inline-flex rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-400">
                            Aktif
                        </span>
                    );
                }

                return (
                    <span className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-white/40">
                        Pasif
                    </span>
                );
            },
        },

        {
            key: "createdAt",
            label: "Kayıt tarihi",
        },

        {
            key: "lastLogin",
            label: "Son giriş",
        },
    ];

    return (
        <div className="space-y-8">
            <AdminPageHeader
                eyebrow="Kullanıcı yönetimi"
                title="Kullanıcılar"
                description="Kullanıcı hesaplarını, rollerini ve erişim durumlarını yönetin."
                action={{
                    label: "Kullanıcı ekle",
                    icon: <Plus className="h-4 w-4" />,
                    onClick: openCreate,
                }}
            />

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
                    <div className="flex items-center gap-2 text-xs text-white/30">
                        <UsersIcon className="h-4 w-4" />
                        Toplam
                    </div>

                    <p className="mt-3 text-2xl font-medium text-white">
                        {stats.total}
                    </p>
                </div>

                <div className="rounded-2xl border border-emerald-500/10 bg-emerald-500/[0.02] p-5">
                    <p className="text-xs text-emerald-400/50">
                        Aktif
                    </p>

                    <p className="mt-3 text-2xl font-medium text-emerald-400">
                        {stats.active}
                    </p>
                </div>

                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
                    <p className="text-xs text-white/30">
                        Pasif
                    </p>

                    <p className="mt-3 text-2xl font-medium text-white/60">
                        {stats.inactive}
                    </p>
                </div>

                <div className="rounded-2xl border border-red-500/10 bg-red-500/[0.02] p-5">
                    <p className="text-xs text-red-400/50">
                        Engellendi
                    </p>

                    <p className="mt-3 text-2xl font-medium text-red-400">
                        {stats.blocked}
                    </p>
                </div>

                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
                    <p className="text-xs text-white/30">
                        Admin
                    </p>

                    <p className="mt-3 text-2xl font-medium text-white">
                        {stats.admins}
                    </p>
                </div>
            </div>

            <AdminFilters
                search={search}
                onSearchChange={setSearch}
                searchPlaceholder="Kullanıcı adı veya e-posta ara..."
                filters={[
                    {
                        key: "role",
                        value: roleFilter,
                        onChange: setRoleFilter,
                        placeholder: "Rol",
                        options: [
                            {
                                value: "all",
                                label: "Tüm roller",
                            },
                            {
                                value: "user",
                                label: "Kullanıcı",
                            },
                            {
                                value: "moderator",
                                label: "Moderatör",
                            },
                            {
                                value: "admin",
                                label: "Admin",
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
                                value: "active",
                                label: "Aktif",
                            },
                            {
                                value: "inactive",
                                label: "Pasif",
                            },
                            {
                                value: "blocked",
                                label: "Engellendi",
                            },
                        ],
                    },
                ]}
            />

            <AdminTable
                columns={columns}
                data={filteredUsers}
                getRowKey={(user) => user.id}
                actions={(user) => (
                    <AdminTableActions
                        onView={() =>
                            setPreviewUser(user)
                        }
                        onEdit={() =>
                            openEdit(user)
                        }
                        onStatus={{
                            status: user.status,
                            onClick: () =>
                                setToggleUser(user),
                        }}
                        onBlock={{
                            blocked: user.isBlocked,
                            onClick: () =>
                                setBlockUser(user),
                        }}
                        onDelete={() =>
                            setDeleteUser(user)
                        }
                    />
                )}
                emptyMessage="Gösterilecek kullanıcı bulunamadı."
            />

            <AdminDialog
                open={formOpen}
                onOpenChange={(open) => {
                    setFormOpen(open);

                    if (!open) {
                        setEditingUser(null);
                    }
                }}
                title={
                    editingUser
                        ? "Kullanıcıyı düzenle"
                        : "Yeni kullanıcı"
                }
            >
                <UserForm
                    user={editingUser}
                    onSubmit={handleFormSubmit}
                    onCancel={() => {
                        setFormOpen(false);
                        setEditingUser(null);
                    }}
                />
            </AdminDialog>

            <AdminDialog
                open={Boolean(previewUser)}
                onOpenChange={(open) => {
                    if (!open) {
                        setPreviewUser(null);
                    }
                }}
                title="Kullanıcı detayları"
            >
                <UserDetails user={previewUser} />
            </AdminDialog>

            <AdminConfirmDialog
                open={Boolean(deleteUser)}
                onOpenChange={(open) => {
                    if (!open) {
                        setDeleteUser(null);
                    }
                }}
                title="Kullanıcıyı sil"
                description={
                    deleteUser
                        ? `"${deleteUser.username}" adlı kullanıcıyı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`
                        : ""
                }
                confirmText="Sil"
                onConfirm={handleDelete}
            />

            <AdminConfirmDialog
                open={Boolean(toggleUser)}
                onOpenChange={(open) => {
                    if (!open) {
                        setToggleUser(null);
                    }
                }}
                title={
                    toggleUser?.status === "active"
                        ? "Kullanıcıyı pasif yap"
                        : "Kullanıcıyı aktif yap"
                }
                description={
                    toggleUser
                        ? toggleUser.status === "active"
                            ? `"${toggleUser.username}" adlı kullanıcıyı pasif yapmak istediğinizden emin misiniz?`
                            : `"${toggleUser.username}" adlı kullanıcıyı tekrar aktif yapmak istediğinizden emin misiniz?`
                        : ""
                }
                confirmText={
                    toggleUser?.status === "active"
                        ? "Pasif yap"
                        : "Aktif yap"
                }
                onConfirm={handleToggleStatus}
            />

            <AdminConfirmDialog
                open={Boolean(blockUser)}
                onOpenChange={(open) => {
                    if (!open) {
                        setBlockUser(null);
                    }
                }}
                title={
                    blockUser?.isBlocked
                        ? "Kullanıcının engelini kaldır"
                        : "Kullanıcıyı engelle"
                }
                description={
                    blockUser
                        ? blockUser.isBlocked
                            ? `"${blockUser.username}" adlı kullanıcının engelini kaldırmak istediğinizden emin misiniz?`
                            : `"${blockUser.username}" adlı kullanıcıyı engellemek istediğinizden emin misiniz? Engelli kullanıcı site içerisindeki etkileşimleri gerçekleştiremez.`
                        : ""
                }
                confirmText={
                    blockUser?.isBlocked
                        ? "Engeli kaldır"
                        : "Engelle"
                }
                onConfirm={handleToggleBlock}
            />
        </div>
    );
}

export default Users;
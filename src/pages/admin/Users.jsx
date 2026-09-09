import { useMemo, useState } from "react";
import { HiSearch, HiTrash, HiUserGroup } from "react-icons/hi";
import { useAuth } from "../../context/AuthContext.jsx";

const Users = () => {
    const { users, user: currentUser, removeUser } = useAuth();
    const [search, setSearch] = useState("");
    const [notice, setNotice] = useState("");

    const filteredUsers = useMemo(() => {
        const query = search.trim().toLowerCase();
        if (!query) return users;
        return users.filter((item) =>
            `${item.name} ${item.email} ${item.role}`.toLowerCase().includes(query)
        );
    }, [search, users]);

    const handleRemove = (id) => {
        const result = removeUser(id);
        if (!result.ok) setNotice(result.message);
    };

    return (
        <div className="min-h-screen bg-background">
            <main className="mx-auto max-w-[1400px] px-6 py-10 lg:px-10">
                <div className="border-b border-white/10 pb-8">
                    <p className="sectionLabel">Yönetim</p>
                    <h1 className="mt-3 font-heading text-3xl">Kullanıcılar</h1>
                    <p className="mt-2 text-sm text-shadow-white/40">
                        Kayıtlı kullanıcı hesaplarını görüntüle ve yönet.
                    </p>
                </div>

                <div className="relative mt-8">
                    <HiSearch className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-shadow-white/30" />
                    <input
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder="Kullanıcı ara..."
                        className="adminInput pl-11"
                    />
                </div>

                {notice && (
                    <p className="mt-4 text-sm text-red-400" role="alert">{notice}</p>
                )}

                <div className="mt-6 overflow-hidden border border-white/10">
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 border-b border-white/10 bg-white/[0.03] px-5 py-4 text-[10px] uppercase tracking-[0.16em] text-shadow-white/40 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_120px_50px]">
                        <span>Kullanıcı</span>
                        <span className="hidden md:block">E-posta</span>
                        <span className="hidden md:block">Rol</span>
                        <span aria-label="İşlemler" />
                    </div>

                    {filteredUsers.length ? filteredUsers.map((item) => (
                        <div key={item.id} className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 border-b border-white/10 px-5 py-4 last:border-b-0 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_120px_50px]">
                            <div className="min-w-0">
                                <p className="truncate text-sm font-medium text-white">
                                    {item.name} {item.id === currentUser?.id && <span className="text-xs text-header-accent">(siz)</span>}
                                </p>
                                <p className="mt-1 truncate text-xs text-shadow-white/40 md:hidden">{item.email}</p>
                            </div>
                            <p className="hidden truncate text-sm text-shadow-white/55 md:block">{item.email}</p>
                            <span className="hidden w-fit border border-white/10 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-shadow-white/60 md:block">
                                {item.role === "admin" ? "Yönetici" : "Okur"}
                            </span>
                            <button
                                type="button"
                                onClick={() => handleRemove(item.id)}
                                disabled={item.id === currentUser?.id}
                                aria-label={`${item.name} hesabını sil`}
                                className="iconButton hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-30"
                            >
                                <HiTrash className="h-4 w-4" />
                            </button>
                        </div>
                    )) : (
                        <div className="px-5 py-14 text-center text-sm text-shadow-white/45">
                            <HiUserGroup className="mx-auto mb-3 h-7 w-7 text-shadow-white/25" />
                            Kullanıcı bulunamadı.
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Users;

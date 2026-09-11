import {
    Bell,
    BookOpen,
    Camera,
    CheckCheck,
    FileEdit,
    Image,
    Users,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navigation = [
    {
        label: "Kitap Yönetimi",
        path: "/admin/books",
        icon: BookOpen,
    },
    {
        label: "Bölüm Yönetimi",
        path: "/admin/chapters",
        icon: FileEdit,
    },
    {
        label: "Galeri",
        path: "/admin/gallery",
        icon: Image,
    },
    {
        label: "Edit Onayları",
        path: "/admin/edit-approvals",
        icon: CheckCheck,
    },
    {
        label: "Pano Fotoğraf Onayları",
        path: "/admin/board-photo-approvals",
        icon: Camera,
    },
    {
        label: "Duyurular",
        path: "/admin/announcements",
        icon: Bell,
    },
    {
        label: "Kullanıcılar",
        path: "/admin/users",
        icon: Users,
    },
];

function AdminSidebar() {
    return (
        <aside
            className="
                fixed
                inset-y-0
                left-0
                z-50
                hidden
                w-[260px]
                flex-col
                border-r
                border-white/[0.07]
                bg-[#0a0a0a]
                lg:flex
            "
        >
            {/* Logo */}
            <div className="flex h-[72px] items-center border-b border-white/[0.07] px-6">
                <div>
                    <p className="text-lg font-semibold tracking-tight text-white">
                        Kitaplık
                    </p>

                    <p className="mt-0.5 text-[11px] uppercase tracking-[0.2em] text-white/30">
                        Admin Panel
                    </p>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5">
                {navigation.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `
                                group
                                flex
                                min-h-10
                                items-center
                                gap-3
                                rounded-xl
                                px-3
                                text-sm
                                transition-colors
                                ${
                                    isActive
                                        ? "bg-white text-black"
                                        : "text-white/45 hover:bg-white/[0.05] hover:text-white"
                                }
                            `
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    <Icon
                                        className={`
                                            h-[17px]
                                            w-[17px]
                                            shrink-0
                                            ${
                                            isActive
                                                ? "text-black"
                                                : "text-white/40 group-hover:text-white"
                                        }
                                        `}
                                    />

                                    <span className="truncate">
                                        {item.label}
                                    </span>
                                </>
                            )}
                        </NavLink>
                    );
                })}
            </nav>

            {/* Bottom */}
            <div className="border-t border-white/[0.07] p-4">
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                    <p className="text-xs font-medium text-white/70">
                        Yönetim Paneli
                    </p>

                    <p className="mt-1 text-[11px] leading-4 text-white/30">
                        Kitaplığını ve kullanıcı içeriklerini buradan yönet.
                    </p>
                </div>
            </div>
        </aside>
    );
}

export default AdminSidebar;
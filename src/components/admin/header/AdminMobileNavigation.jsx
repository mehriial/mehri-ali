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

function AdminMobileNavigation({ onNavigate }) {
    return (
        <nav className="space-y-1">
            {navigation.map((item) => {
                const Icon = item.icon;

                return (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={onNavigate}
                        className={({ isActive }) =>
                            `
                            flex
                            min-h-11
                            items-center
                            gap-3
                            rounded-xl
                            px-3
                            text-sm
                            transition-colors
                            ${
                                isActive
                                    ? "bg-white text-black"
                                    : "text-white/50 hover:bg-white/[0.05] hover:text-white"
                            }
                        `
                        }
                    >
                        <Icon className="h-[17px] w-[17px]" />

                        <span>{item.label}</span>
                    </NavLink>
                );
            })}
        </nav>
    );
}

export default AdminMobileNavigation;
import {
    Bell,
    BookOpen,
    ChevronLeft,
    FileText,
    Images,
    LayoutDashboard,
    MessageSquare,
    Settings,
    ShieldCheck,
    Users,
} from "lucide-react";
import { NavLink } from "react-router-dom";

import { Button } from "@/components/ui/button.jsx";

const navigation = [
    {
        label: "Dashboard",
        path: "/admin",
        icon: LayoutDashboard,
        end: true,
    },
    {
        label: "Kitaplar",
        path: "/admin/books",
        icon: BookOpen,
    },
    {
        label: "Bölümler",
        path: "/admin/chapters",
        icon: FileText,
    },
    {
        label: "Galeri",
        path: "/admin/gallery",
        icon: Images,
    },
    {
        label: "Edit Onayları",
        path: "/admin/gallery/edits",
        icon: ShieldCheck,
    },
    {
        label: "Pano",
        path: "/admin/board",
        icon: MessageSquare,
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
                w-64
                border-r
                border-white/[0.06]
                bg-[#080808]
                lg:block
            "
        >
            <div className="flex h-full flex-col">

                {/* Logo */}
                <div className="flex h-20 items-center border-b border-white/[0.06] px-7">
                    <div>
                        <p className="font-logo text-lg tracking-[0.08em] text-white">
                            MEHRI ALI
                        </p>

                        <p className="mt-0.5 text-[9px] uppercase tracking-[0.25em] text-white/25">
                            Yönetim Paneli
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
                                end={item.end}
                                className={({ isActive }) => `
group
flex
h-11
items-center
gap-3
rounded-xl
px-4
text-sm
transition-all
${
    isActive
        ? "bg-white/[0.08] text-white"
        : "text-white/40 hover:bg-white/[0.04] hover:text-white"
}
`}
                            >
                                {({ isActive }) => (
                                    <>
                                        <Icon
                                            className={`
h-4
w-4
shrink-0
transition-colors
${
    isActive
        ? "text-white"
        : "text-white/30 group-hover:text-white/70"
}
`}
                                        />

                                        <span>
                                            {item.label}
                                        </span>
                                    </>
                                )}
                            </NavLink>
                        );
                    })}
                </nav>

                {/* Bottom */}
                <div className="border-t border-white/[0.06] p-3">
                    <Button
                        type="button"
                        variant="ghost"
                        className="
                            h-11
                            w-full
                            justify-start
                            gap-3
                            rounded-xl
                            px-4
                            text-sm
                            text-white/40
                            hover:bg-white/[0.04]
                            hover:text-white
                        "
                    >
                        <Settings className="h-4 w-4" />
                        Ayarlar
                    </Button>

                    <NavLink
                        to="/"
                        className="
                            mt-1
                            flex
                            h-11
                            items-center
                            gap-3
                            rounded-xl
                            px-4
                            text-sm
                            text-white/30
                            transition-colors
                            hover:bg-white/[0.04]
                            hover:text-white
                        "
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Siteye Dön
                    </NavLink>
                </div>

            </div>
        </aside>
    );
}

export default AdminSidebar;


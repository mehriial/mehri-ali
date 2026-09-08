import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
    HiMenu,
    HiX,
    HiHome,
    HiBookOpen,
    HiClipboardList,
    HiChatAlt2,
    HiUsers,
    HiSpeakerphone,
    HiMail,
    HiCog,
    HiLogout,
    HiChevronLeft,
} from "react-icons/hi";
import { useAuth } from "../../context/AuthContext.jsx";

const navigation = [
    {
        title: "Ümumi",
        items: [
            {
                name: "Dashboard",
                href: "/admin",
                icon: HiHome,
            },
        ],
    },
    {
        title: "Məzmun",
        items: [
            {
                name: "Kitablar",
                href: "/admin/books",
                icon: HiBookOpen,
            },
            {
                name: "Bölümlər",
                href: "/admin/chapters",
                icon: HiClipboardList,
            },
            {
                name: "Duyurular",
                href: "/admin/announcements",
                icon: HiSpeakerphone,
            },
        ],
    },
    {
        title: "Oxucular",
        items: [
            {
                name: "Yorumlar",
                href: "/admin/comments",
                icon: HiChatAlt2,
            },
            {
                name: "Pano",
                href: "/admin/board",
                icon: HiUsers,
            },
        ],
    },
    {
        title: "Əlaqə",
        items: [
            {
                name: "Mesajlar",
                href: "/admin/contact",
                icon: HiMail,
            },
        ],
    },
    {
        title: "Sistem",
        items: [
            {
                name: "Ayarlar",
                href: "/admin/settings",
                icon: HiCog,
            },
        ],
    },
];

const AdminLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const isActive = (href) => {
        if (href === "/admin") {
            return location.pathname === "/admin";
        }

        return location.pathname.startsWith(href);
    };

    const handleLogout = () => {
        logout();
        navigate("/", { replace: true });
    };

    return (
        <div className="min-h-screen bg-background text-shadow-white">

            {/* =====================================================
                MOBILE HEADER
            ===================================================== */}

            <header className="
                fixed
                left-0
                right-0
                top-0
                z-40
                flex
                h-16
                items-center
                border-b
                border-white/10
                bg-background/95
                px-5
                backdrop-blur-xl
                lg:hidden
            ">

                <button
                    type="button"
                    onClick={() => setIsSidebarOpen(true)}
                    className="
                        flex
                        h-9
                        w-9
                        items-center
                        justify-center
                        text-shadow-white/60
                        transition-colors
                        hover:text-header-accent
                    "
                    aria-label="Menüyü aç"
                >
                    <HiMenu className="h-5 w-5" />
                </button>

                <div className="ml-4">
                    <p className="
                        text-[9px]
                        uppercase
                        tracking-[0.3em]
                        text-header-accent
                    ">
                        Admin
                    </p>

                    <p className="
                        mt-0.5
                        font-heading
                        text-sm
                    ">
                        Yönetim Paneli
                    </p>
                </div>

            </header>

            {/* =====================================================
                MOBILE OVERLAY
            ===================================================== */}

            {isSidebarOpen && (
                <div
                    className="
                        fixed
                        inset-0
                        z-40
                        bg-black/60
                        backdrop-blur-[2px]
                        lg:hidden
                    "
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* =====================================================
                SIDEBAR
            ===================================================== */}

            <aside
                className={`
                    fixed
                    bottom-0
                    left-0
                    top-0
                    z-50
                    flex
                    flex-col
                    border-r
                    border-white/10
                    bg-background
                    transition-all
                    duration-300

                    lg:z-30

                    ${
                    isSidebarOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                }

                    lg:translate-x-0

                    ${
                    isCollapsed
                        ? "lg:w-[76px]"
                        : "lg:w-[250px]"
                }

                    w-[270px]
                `}
            >

                {/* =================================================
                    SIDEBAR HEADER
                ================================================= */}

                <div className="
                    flex
                    h-20
                    shrink-0
                    items-center
                    border-b
                    border-white/10
                    px-5
                ">

                    <div className="
                        flex
                        min-w-0
                        flex-1
                        items-center
                    ">

                        <div className="
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            border
                            border-header-accent/40
                            text-header-accent
                        ">
                            <span className="
                                font-heading
                                text-sm
                            ">
                                A
                            </span>
                        </div>

                        {!isCollapsed && (
                            <div className="ml-3 min-w-0">
                                <p className="
                                    truncate
                                    text-[9px]
                                    uppercase
                                    tracking-[0.25em]
                                    text-header-accent
                                ">
                                    {user?.name || "Yönetici"}
                                </p>

                                <p className="
                                    mt-0.5
                                    truncate
                                    font-heading
                                    text-sm
                                ">
                                    Yönetim Paneli
                                </p>
                            </div>
                        )}

                    </div>

                    {/* MOBILE CLOSE */}

                    <button
                        type="button"
                        onClick={() => setIsSidebarOpen(false)}
                        className="
                            flex
                            h-8
                            w-8
                            shrink-0
                            items-center
                            justify-center
                            text-shadow-white/40
                            hover:text-white
                            lg:hidden
                        "
                    >
                        <HiX className="h-5 w-5" />
                    </button>

                </div>

                {/* =================================================
                    NAVIGATION
                ================================================= */}

                <nav className="
                    flex-1
                    overflow-y-auto
                    px-3
                    py-6
                ">

                    {navigation.map((section) => (
                        <div
                            key={section.title}
                            className="mb-7 last:mb-0"
                        >

                            {!isCollapsed && (
                                <p className="
                                    mb-2
                                    px-3
                                    text-[8px]
                                    uppercase
                                    tracking-[0.25em]
                                    text-shadow-white/25
                                ">
                                    {section.title}
                                </p>
                            )}

                            <div className="space-y-1">

                                {section.items.map((item) => {
                                    const Icon = item.icon;
                                    const active = isActive(item.href);

                                    return (
                                        <Link
                                            key={item.href}
                                            to={item.href}
                                            onClick={() =>
                                                setIsSidebarOpen(false)
                                            }
                                            title={
                                                isCollapsed
                                                    ? item.name
                                                    : undefined
                                            }
                                            className={`
                                                group
                                                relative
                                                flex
                                                h-11
                                                items-center
                                                rounded-sm
                                                transition-all
                                                duration-200

                                                ${
                                                isCollapsed
                                                    ? "justify-center"
                                                    : "gap-3 px-3"
                                            }

                                                ${
                                                active
                                                    ? "bg-header-accent/[0.08] text-header-accent"
                                                    : "text-shadow-white/45 hover:bg-white/[0.03] hover:text-white"
                                            }
                                            `}
                                        >

                                            {/* ACTIVE LINE */}

                                            {active && (
                                                <span className="
                                                    absolute
                                                    bottom-2
                                                    left-0
                                                    top-2
                                                    w-[2px]
                                                    bg-header-accent"
                                                />
                                            )}

                                            <Icon className={`
                                                h-[18px]
                                                w-[18px]
                                                shrink-0
                                                transition-colors
                                                ${
                                                    active
                                                        ? "text-header-accent"
                                                        : "text-shadow-white/30 group-hover:text-header-accent"
                                            }
                                            `} />

                                            {!isCollapsed && (
                                                <span className="
                                                    truncate
                                                    text-xs
                                                ">
                                                    {item.name}
                                                </span>
                                            )}

                                        </Link>
                                    );
                                })}

                            </div>

                        </div>
                    ))}

                </nav>

                {/* =================================================
                    BOTTOM
                ================================================= */}

                <div className="
                    shrink-0
                    border-t
                    border-white/10
                    p-3
                ">

                    {/* USER */}

                    {!isCollapsed && (
                        <div className="
                            mb-3
                            flex
                            items-center
                            gap-3
                            px-3
                            py-3
                        ">

                            <div className="
                                flex
                                h-8
                                w-8
                                shrink-0
                                items-center
                                justify-center
                                bg-white/10
                                text-xs
                            ">
                                M
                            </div>

                            <div className="min-w-0">
                                <p className="
                                    truncate
                                    text-xs
                                ">
                                    Admin
                                </p>

                                <p className="
                                    mt-0.5
                                    truncate
                                    text-[9px]
                                    text-shadow-white/30
                                ">
                                    Yönetici
                                </p>
                            </div>

                        </div>
                    )}

                    {/* COLLAPSE */}

                    <button
                        type="button"
                        onClick={() =>
                            setIsCollapsed((prev) => !prev)
                        }
                        className={`
                            hidden
                            h-10
                            w-full
                            items-center
                            rounded-sm
                            text-shadow-white/40
                            transition-colors
                            hover:bg-white/[0.03]
                            hover:text-white
                            lg:flex

                            ${
                            isCollapsed
                                ? "justify-center"
                                : "gap-3 px-3"
                        }
                        `}
                        title={
                            isCollapsed
                                ? "Menüyü genişlet"
                                : "Menüyü daralt"
                        }
                    >
                        <HiChevronLeft
                            className={`
                                h-4
                                w-4
                                transition-transform
                                duration-300
                                ${
                                isCollapsed
                                    ? "rotate-180"
                                    : ""
                            }
                            `}
                        />

                        {!isCollapsed && (
                            <span className="text-[10px]">
                                Menüyü daralt
                            </span>
                        )}
                    </button>

                    {/* LOGOUT */}

                    <button
                        type="button"
                        onClick={handleLogout}
                        title={
                            isCollapsed
                                ? "Çıkış yap"
                                : undefined
                        }
                        className={`
                            mt-1
                            flex
                            h-10
                            w-full
                            items-center
                            rounded-sm
                            text-shadow-white/35
                            transition-colors
                            hover:bg-red-500/[0.05]
                            hover:text-red-400

                            ${
                            isCollapsed
                                ? "justify-center"
                                : "gap-3 px-3"
                        }
                        `}
                    >
                        <HiLogout className="h-4 w-4" />

                        {!isCollapsed && (
                            <span className="text-[10px]">
                                Çıkış yap
                            </span>
                        )}
                    </button>

                </div>

            </aside>

            {/* =====================================================
                MAIN
            ===================================================== */}

            <div
                className={`
                    min-h-screen
                    transition-all
                    duration-300
                    lg:pl-[250px]
                    ${
                    isCollapsed
                        ? "lg:pl-[76px]"
                        : ""
                }
                `}
            >

                {/* MOBILE TOP SPACE */}

                <div className="h-16 lg:hidden" />

                <Outlet />

            </div>

        </div>
    );
};

export default AdminLayout;

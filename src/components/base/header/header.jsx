import {useEffect, useState} from "react";
import {
    FaInstagram,
    FaGoodreads,
} from "react-icons/fa";
import {
    FaXTwitter,
} from "react-icons/fa6";
import {
    Link,
    useLocation,
} from "react-router-dom";

import MobileMenuSheet from "./mobile-menu.jsx";
import LoginModal from "../auth/LoginModal.jsx";
import RegisterModal from "../auth/RegisterModal.jsx";
import Button from "../../ui/Button.jsx";
import ForgotPasswordModal from "../auth/ForgotPasswordModal.jsx";
import {useAuth} from "../../../context/AuthContext.jsx";
import {
    HiMenu,
    HiChevronDown,
    HiUser,
    HiLogout,
    HiCog,
} from "react-icons/hi";
const navigation = [
    {
        name: "Ana sayfa",
        href: "/",
    },
    {
        name: "Kitaplar",
        href: "/books",
    },
    {
        name: "Pano",
        href: "/board",
    },
    // {
    //     name: "Notlar",
    //     href: "/notes",
    // },
    {
        name: "Duyurular",
        href: "/announcements",
    },
    {
        name: "İletişim",
        href: "/contact",
    },
];

const socialLinks = [
    {
        name: "Instagram",
        href: "#",
        icon: FaInstagram,
    },
    {
        name: "X",
        href: "#",
        icon: FaXTwitter,
    },
    {
        name: "Goodreads",
        href: "#",
        icon: FaGoodreads,
    },
];

const Header = () => {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] =
        useState(false);

    const [isScrolled, setIsScrolled] =
        useState(false);

    const [isLoginOpen, setIsLoginOpen] =
        useState(false);

    const [isRegisterOpen, setIsRegisterOpen] =
        useState(false);
    const [isForgotOpen, setIsForgotOpen] = useState(false);
    const {user, logout} = useAuth();

    const location = useLocation();

    /*
     * Scroll
     */

    useEffect(() => {

        const handleScroll = () => {
            setIsScrolled(
                window.scrollY > 20
            );
        };

        window.addEventListener(
            "scroll",
            handleScroll
        );

        return () => {
            window.removeEventListener(
                "scroll",
                handleScroll
            );
        };

    }, []);

    /*
     * Mobile menu açıkken
     * body scroll'u kapat
     */

    useEffect(() => {

        document.body.style.overflow =
            isMenuOpen ||
            isLoginOpen ||
            isRegisterOpen ||
            isForgotOpen
                ? "hidden"
                : "";

        return () => {
            document.body.style.overflow = "";
        };

    }, [
        isMenuOpen,
        isLoginOpen,
        isRegisterOpen,
        isForgotOpen,
    ]);

    /*
     * Active navigation
     */

    const isActive = (href) => {

        if (href === "/") {
            return location.pathname === "/";
        }

        return location.pathname.startsWith(
            href
        );
    };

    /*
     * Login aç
     */

    const openLogin = () => {
        setIsRegisterOpen(false);
        setIsLoginOpen(true);
    };

    /*
     * Register aç
     */

    const openRegister = () => {
        setIsLoginOpen(false);
        setIsRegisterOpen(true);
    };

    /*
     * Login -> Register
     */

    const switchToRegister = () => {
        setIsLoginOpen(false);

        setTimeout(() => {
            setIsRegisterOpen(true);
        }, 150);
    };

    /*
     * Register -> Login
     */

    const switchToLogin = () => {
        setIsRegisterOpen(false);

        setTimeout(() => {
            setIsLoginOpen(true);
        }, 150);
    };

    return (
        <>
            {/* =====================================================
                HEADER
            ===================================================== */}

            <header
                className={`
                    fixed
                    left-0
                    top-0
                    z-50
                    w-full
                    transition-all
                    duration-500

                    ${
                    isScrolled
                        ? `
                                border-b
                                border-white/10
                                bg-background/80
                                backdrop-blur-xl
                            `
                        : `
                                bg-transparent
                            `
                }
                `}
            >

                <div className="
                    relative
                    mx-auto
                    flex
                    h-[80px]
                    max-w-[1400px]
                    items-center
                    justify-center
                    px-6
                    lg:px-10
                ">

                    {/* =================================================
                        DESKTOP NAVIGATION
                    ================================================= */}

                    <nav className="
                        hidden
                        items-center
                        gap-10
                        md:flex
                    ">

                        {navigation.map((item) => {

                            const active =
                                isActive(item.href);

                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`
                                        group
                                        relative
                                        py-2
                                        text-[12px]
                                        font-medium
                                        uppercase
                                        tracking-[0.18em]
                                        transition-colors
                                        duration-300

                                        ${
                                        active
                                            ? "text-header-accent"
                                            : `
                                                    text-shadow-white
                                                    hover:text-header-accent
                                                `
                                    }
                                    `}
                                >

                                    {item.name}

                                    <span
                                        className={`
                                            absolute
                                            bottom-0
                                            left-1/2
                                            h-px
                                            -translate-x-1/2
                                            bg-header-accent
                                            transition-all
                                            duration-300

                                            ${
                                            active
                                                ? "w-full"
                                                : "w-0 group-hover:w-full"
                                        }
                                        `}
                                    />

                                </Link>
                            );
                        })}

                    </nav>


                    {/* =================================================
                        DESKTOP RIGHT SIDE
                    ================================================= */}

                    <div className="
                        absolute
                        right-6
                        hidden
                        items-center
                        gap-5
                        lg:flex
                    ">

                        {/* =============================================
                            AUTH
                        ============================================= */}

                        <div className="
    flex
    items-center
    gap-3
    border-r
    border-white/10
    pr-5
">

                            {user ? (
                                <div className="relative">

                                    {/* USER AVATAR */}

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setIsUserMenuOpen((prev) => !prev)
                                        }
                                        className="
                    flex
                    items-center
                    gap-2
                    transition-colors
                    duration-300
                    hover:text-header-accent
                "
                                        aria-label="Kullanıcı menüsü"
                                    >

                                        <div className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-full
                    border
                    border-white/20
                    bg-white/5
                    text-sm
                    font-medium
                    text-shadow-white
                    transition-all
                    duration-300
                    hover:border-header-accent
                ">
                                            {user.avatar ? (
                                                <img
                                                    src={user.avatar}
                                                    alt={user.name || "Kullanıcı"}
                                                    className="
                                h-full
                                w-full
                                object-cover
                            "
                                                />
                                            ) : (
                                                <span>
                            {(
                                user.name ||
                                user.username ||
                                "U"
                            )
                                .charAt(0)
                                .toUpperCase()}
                        </span>
                                            )}
                                        </div>

                                        <HiChevronDown
                                            className={`
                        h-4
                        w-4
                        transition-transform
                        duration-300
                        ${
                                                isUserMenuOpen
                                                    ? "rotate-180 text-header-accent"
                                                    : ""
                                            }
                    `}
                                        />

                                    </button>


                                    {/* DROPDOWN */}

                                    {isUserMenuOpen && (
                                        <div
                                            className="
                        absolute
                        right-0
                        top-[calc(100%+14px)]
                        w-48
                        overflow-hidden
                        border
                        border-white/10
                        bg-background/95
                        shadow-2xl
                        backdrop-blur-xl
                    "
                                        >

                                            {/* USER INFO */}

                                            <div className="
                        border-b
                        border-white/10
                        px-4
                        py-3
                    ">
                                                <p className="
                            truncate
                            text-[11px]
                            font-medium
                            uppercase
                            tracking-[0.12em]
                            text-shadow-white
                        ">
                                                    {user.name ||
                                                        user.username ||
                                                        "Kullanıcı"}
                                                </p>

                                                {user.email && (
                                                    <p className="
                                mt-1
                                truncate
                                text-[9px]
                                text-shadow-white/40
                            ">
                                                        {user.email}
                                                    </p>
                                                )}
                                            </div>


                                            {/* PROFILE */}

                                            <Link
                                                to="/profile"
                                                onClick={() =>
                                                    setIsUserMenuOpen(false)
                                                }
                                                className="
                            flex
                            items-center
                            gap-3
                            px-4
                            py-3
                            text-[10px]
                            uppercase
                            tracking-[0.12em]
                            text-shadow-white/70
                            transition-colors
                            duration-300
                            hover:bg-white/5
                            hover:text-header-accent
                        "
                                            >
                                                <HiUser className="h-4 w-4"/>

                                                <span>
                            Profilim
                        </span>
                                            </Link>


                                            {/* ADMIN */}

                                            {user.role === "admin" && (
                                                <Link
                                                    to="/admin"
                                                    onClick={() =>
                                                        setIsUserMenuOpen(false)
                                                    }
                                                    className="
                                flex
                                items-center
                                gap-3
                                px-4
                                py-3
                                text-[10px]
                                uppercase
                                tracking-[0.12em]
                                text-header-accent
                                transition-colors
                                duration-300
                                hover:bg-white/5
                                hover:text-white
                            "
                                                >
                                                    <HiCog className="h-4 w-4"/>

                                                    <span>
                                Yönetim
                            </span>
                                                </Link>
                                            )}


                                            {/* LOGOUT */}

                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setIsUserMenuOpen(false);
                                                    logout();
                                                }}
                                                className="
                            flex
                            w-full
                            items-center
                            gap-3
                            border-t
                            border-white/10
                            px-4
                            py-3
                            text-left
                            text-[10px]
                            uppercase
                            tracking-[0.12em]
                            text-shadow-white/60
                            transition-colors
                            duration-300
                            hover:bg-white/5
                            hover:text-header-accent
                        "
                                            >
                                                <HiLogout className="h-4 w-4"/>

                                                <span>
                            Çıkış
                        </span>
                                            </button>

                                        </div>
                                    )}

                                </div>
                            ) : (
                                <>
                                    <Button
                                        type="button"
                                        onClick={openLogin}
                                        className="
                    border-none
                    text-[10px]
                    uppercase
                    tracking-[0.15em]
                    text-shadow-white/60
                    hover:text-header-accent
                "
                                    >
                                        Giriş
                                    </Button>

                                    <Button
                                        type="button"
                                        onClick={openRegister}
                                        className="
                    border
                    border-header-accent
                    px-3
                    py-2
                    text-[9px]
                    uppercase
                    tracking-[0.15em]
                    text-header-accent
                    hover:bg-header-accent
                    hover:text-white
                "
                                    >
                                        Kayıt ol
                                    </Button>
                                </>
                            )}

                        </div>


                        {/* =============================================
                            SOCIAL MEDIA
                        ============================================= */}

                        <div className="
                            flex
                            items-center
                            gap-2
                        ">

                            {socialLinks.map(
                                (social) => {

                                    const Icon =
                                        social.icon;

                                    return (
                                        <a
                                            key={social.name}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={social.name}
                                            title={social.name}
                                            className="
                                                flex
                                                h-8
                                                w-8
                                                items-center
                                                justify-center
                                                text-shadow-white/60
                                                transition-all
                                                duration-300
                                                hover:-translate-y-0.5
                                                hover:text-header-accent
                                            "
                                        >

                                            <Icon className="
                                                h-[17px]
                                                w-[17px]
                                            "/>

                                        </a>
                                    );
                                }
                            )}

                        </div>

                    </div>


                    {/* =================================================
                        MOBILE RIGHT SIDE
                    ================================================= */}

                    <div className="
                        absolute
                        right-6
                        flex
                        items-center
                        gap-3
                        md:hidden
                    ">

                        {/* MOBILE SOCIAL */}

                        <div className="
                            flex
                            items-center
                            gap-1
                        ">

                            {socialLinks
                                .slice(0, 2)
                                .map((social) => {

                                    const Icon =
                                        social.icon;

                                    return (
                                        <a
                                            key={social.name}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={social.name}
                                            title={social.name}
                                            className="
                                                flex
                                                h-8
                                                w-8
                                                items-center
                                                justify-center
                                                text-shadow-white
                                                transition-colors
                                                duration-300
                                                hover:text-header-accent
                                            "
                                        >

                                            <Icon className="
                                                h-4
                                                w-4
                                            "/>

                                        </a>
                                    );
                                })}

                        </div>


                        {/* MOBILE MENU */}

                        <button
                            type="button"
                            onClick={() =>
                                setIsMenuOpen(true)
                            }
                            className="
                                flex
                                h-8
                                w-8
                                items-center
                                justify-center
                                text-shadow-white
                                transition-colors
                                duration-300
                                hover:text-header-accent
                            "
                            aria-label="Menüyü aç"
                            title="Menüyü aç"
                        >

                            <HiMenu className="
                                h-5
                                w-5
                            "/>

                        </button>

                    </div>

                </div>

            </header>


            {/* =====================================================
                MOBILE MENU
            ===================================================== */}

            <MobileMenuSheet
                isOpen={isMenuOpen}
                onClose={() =>
                    setIsMenuOpen(false)
                }
                navigation={navigation}
                onLogin={() => {
                    setIsMenuOpen(false);
                    openLogin();
                }}
                onRegister={() => {
                    setIsMenuOpen(false);
                    openRegister();
                }}
            />


            {/* =====================================================
                LOGIN MODAL
            ===================================================== */}

            <LoginModal
                isOpen={isLoginOpen}
                onClose={() =>
                    setIsLoginOpen(false)
                }
                onRegister={
                    switchToRegister
                }
                onForgotPassword={() => {
                    setIsLoginOpen(false);
                    setTimeout(() => setIsForgotOpen(true), 150);
                }}
            />

            <ForgotPasswordModal isOpen={isForgotOpen} onClose={() => setIsForgotOpen(false)} onLogin={() => {
                setIsForgotOpen(false);
                setTimeout(() => setIsLoginOpen(true), 150);
            }}/>


            {/* =====================================================
                REGISTER MODAL
            ===================================================== */}

            <RegisterModal
                isOpen={isRegisterOpen}
                onClose={() =>
                    setIsRegisterOpen(false)
                }
                onLogin={
                    switchToLogin
                }
            />

        </>
    );
};

export default Header;

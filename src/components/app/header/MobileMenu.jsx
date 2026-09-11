import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "lucide-react";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet.jsx";

import HeaderLogo from "./HeaderLogo.jsx";
import { navigation } from "@/constants/navigation.js";

function MobileMenu({
                        onLogin,
                        onRegister,
                    }) {
    const [open, setOpen] = useState(false);

    const handleLogin = () => {
        setOpen(false);
        onLogin();
    };

    const handleRegister = () => {
        setOpen(false);
        onRegister();
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <button
                    type="button"
                    className="
                        flex
                        h-10
                        w-10
                        cursor-pointer
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-white/[0.08]
                        bg-white/[0.04]
                        text-white
                        transition-all
                        hover:bg-white/[0.09]
                        lg:hidden
                    "
                    aria-label="Menüyü aç"
                >
                    <Menu className="h-5 w-5" />
                </button>
            </SheetTrigger>

            <SheetContent
                side="top"
                className="
                    h-dvh
                    w-full
                    border-none
                    bg-black/95
                    p-0
                    font-inter
                    text-white
                    backdrop-blur-3xl
                "
            >
                <div className="flex h-full flex-col">

                    {/* Header */}
                    <SheetHeader
                        className="
                            border-b
                            border-white/[0.08]
                            px-5
                            py-5
                            text-left
                            sm:px-8
                        "
                    >
                        <SheetTitle asChild>
                            <HeaderLogo mobile />
                        </SheetTitle>
                    </SheetHeader>

                    {/* Content */}
                    <div
                        className="
                            flex
                            flex-1
                            flex-col
                            px-5
                            pt-10
                            sm:px-8
                        "
                    >
                        {/* Navigation */}
                        <div>
                            <p
                                className="
                                    mb-4
                                    text-[9px]
                                    font-medium
                                    uppercase
                                    tracking-[0.3em]
                                    text-white/30
                                "
                            >
                                Menü
                            </p>

                            <nav className="flex flex-col">
                                {navigation.map((item, index) => (
                                    <MobileNavigationItem
                                        key={item.path}
                                        item={item}
                                        index={index}
                                        onNavigate={() => setOpen(false)}
                                    />
                                ))}
                            </nav>
                        </div>

                        {/* Auth */}
                        <MobileAuth
                            onLogin={handleLogin}
                            onRegister={handleRegister}
                        />
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    );
}

function MobileNavigationItem({
                                  item,
                                  index,
                                  onNavigate,
                              }) {
    return (
        <NavLink
            to={item.path}
            onClick={onNavigate}
            className={({ isActive }) =>
                `
group
flex
items-center
justify-between
border-b
border-white/[0.07]
py-4
transition-all
duration-300

${
    isActive
        ? "text-white"
        : "text-white/50 hover:text-white"
}
`
            }
        >
            {({ isActive }) => (
                <>
                    <div className="flex items-center gap-4">

                        {/* Number */}
                        <span
                            className={`
text-[9px]
tabular-nums
transition-colors

${
    isActive
        ? "text-white/60"
        : "text-white/20 group-hover:text-white/40"
}
`}
                        >
                            {String(index + 1).padStart(2, "0")}
                        </span>

                        {/* Label */}
                        <span
                            className={`
font-serif
text-xl
tracking-wide
transition-transform
duration-300
sm:text-2xl

${
    isActive
        ? "translate-x-1"
        : "group-hover:translate-x-1"
}
`}
                        >
                            {item.label}
                        </span>

                    </div>

                    {/* Active indicator */}
                    <span
                        className={`
h-1.5
w-1.5
rounded-full
transition-all
duration-300

${
    isActive
        ? "bg-white opacity-100"
        : "bg-white opacity-0 group-hover:opacity-40"
}
`}
                    />
                </>
            )}
        </NavLink>
    );
}

function MobileAuth({
                        onLogin,
                        onRegister,
                    }) {
    return (
        <div className="mt-auto pb-7 pt-10">

            {/* Divider */}
            <div className="mb-5 h-px bg-white/[0.07]" />

            <div className="grid grid-cols-2 gap-2.5">

                {/* Login */}
                <button
                    type="button"
                    onClick={onLogin}
                    className="
                        h-11
                        cursor-pointer
                        rounded-xl
                        border
                        border-white/[0.1]
                        bg-white/[0.035]
                        text-[13px]
                        text-white/65
                        transition-all
                        duration-300
                        hover:bg-white/[0.07]
                        hover:text-white
                        active:scale-[0.98]
                    "
                >
                    Giriş Yap
                </button>

                {/* Register */}
                <button
                    type="button"
                    onClick={onRegister}
                    className="
                        h-11
                        cursor-pointer
                        rounded-xl
                        bg-white
                        text-[13px]
                        font-medium
                        text-black
                        transition-all
                        duration-300
                        hover:bg-white/90
                        active:scale-[0.98]
                    "
                >
                    Kayıt Ol
                </button>

            </div>
        </div>
    );
}

export default MobileMenu;

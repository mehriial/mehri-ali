import { useState } from "react";
import { Menu, Search } from "lucide-react";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet.jsx";

import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button.jsx";
import AdminMobileNavigation from "./AdminMobileNavigation.jsx";


function AdminHeader() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header
            className="
                sticky
                top-0
                z-30
                flex
                h-[72px]
                items-center
                justify-between
                border-b
                border-white/[0.07]
                bg-[#0c0b0a]/90
                px-4
                backdrop-blur-xl
                sm:px-6
                lg:px-8
            "
        >
            {/* Mobile menu */}
            <Sheet
                open={mobileOpen}
                onOpenChange={setMobileOpen}
            >
                <SheetTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="
                            h-10
                            w-10
                            rounded-xl
                            border
                            border-white/[0.08]
                            bg-white/[0.04]
                            text-white
                            hover:bg-white/[0.08]
                            lg:hidden
                        "
                    >
                        <Menu className="h-5 w-5" />

                        <span className="sr-only">
                            Menüyü aç
                        </span>
                    </Button>
                </SheetTrigger>

                <SheetContent
                    side="left"
                    className="
                        w-[280px]
                        border-white/[0.08]
                        bg-[#11100f]
                        p-0
                        text-white
                    "
                >
                    <SheetHeader
                        className="
                            border-b
                            border-white/[0.07]
                            px-5
                            py-5
                            text-left
                        "
                    >
                        <SheetTitle
                            className="
                                font-serif
                                text-xl
                                font-normal
                                tracking-wide
                                text-white
                            "
                        >
                            Yönetim Paneli
                        </SheetTitle>
                    </SheetHeader>

                    <AdminMobileNavigation
                        onNavigate={() => setMobileOpen(false)}
                    />
                </SheetContent>
            </Sheet>

            {/* Search */}
            <div className="relative hidden w-full max-w-[360px] sm:block">
                <Search
                    className="
                        absolute
                        left-3
                        top-1/2
                        h-4
                        w-4
                        -translate-y-1/2
                        text-white/25
                    "
                />

                <Input
                    placeholder="Ara..."
                    className="
                        h-10
                        rounded-xl
                        border-white/[0.08]
                        bg-white/[0.04]
                        pl-9
                        text-sm
                        text-white
                        shadow-none
                        placeholder:text-white/25
                        focus-visible:border-white/20
                        focus-visible:ring-white/10
                    "
                />
            </div>

            {/* Right side */}
            <div className="ml-auto flex items-center gap-2">
                <Button
                    variant="ghost"
                    className="
                        hidden
                        h-10
                        rounded-xl
                        px-3
                        text-xs
                        text-white/45
                        hover:bg-white/[0.05]
                        hover:text-white
                        sm:flex
                    "
                >
                    Siteyi Görüntüle
                </Button>

                <div
                    className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-white/[0.08]
                        bg-white/[0.06]
                        text-sm
                        font-medium
                        text-white
                    "
                >
                    M
                </div>
            </div>
        </header>
    );
}

export default AdminHeader;

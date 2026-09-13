import {
    Bell,
    Menu,
} from "lucide-react";

import { Button } from "@/components/ui/button.jsx";

function AdminHeader() {
    return (
        <header
            className="
                fixed
                inset-x-0
                top-0
                z-40
                border-b
                border-white/[0.06]
                bg-[#050505]/80
                backdrop-blur-2xl
                lg:left-64
            "
        >
            <div className="flex h-20 items-center justify-between px-5 sm:px-8 lg:px-10">

                <div className="flex items-center gap-3">
                    <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="
                            h-9
                            w-9
                            text-white/50
                            hover:bg-white/[0.06]
                            hover:text-white
                            lg:hidden
                        "
                    >
                        <Menu className="h-5 w-5" />
                    </Button>

                    <div>
                        <p className="text-sm font-medium text-white">
                            Yönetim Paneli
                        </p>

                        <p className="hidden text-[11px] text-white/30 sm:block">
                            Site içeriklerini buradan yönetebilirsiniz.
                        </p>
                    </div>
                </div>

                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="
                        relative
                        h-9
                        w-9
                        text-white/40
                        hover:bg-white/[0.06]
                        hover:text-white
                    "
                >
                    <Bell className="h-4 w-4" />

                    <span
                        className="
                            absolute
                            right-2
                            top-2
                            h-1.5
                            w-1.5
                            rounded-full
                            bg-white
                        "
                    />
                </Button>

            </div>
        </header>
    );
}

export default AdminHeader;


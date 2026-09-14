import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, UserRound } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu.jsx";
import { setSession } from "@/lib/session.js";
import { profile } from "@/data/profile.js";

function ProfileMenu({ user }) {
    const navigate = useNavigate();
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        const update = () => {
            try { setAvatar(JSON.parse(localStorage.getItem("profile"))?.avatar || null); }
            catch { setAvatar(null); }
        };
        update();
        window.addEventListener("profileChanged", update);
        return () => window.removeEventListener("profileChanged", update);
    }, []);

    const username = user.username || profile.username;
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex size-10 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/10 text-sm font-semibold text-white outline-none focus-visible:ring-2 focus-visible:ring-white/40" aria-label="Profil menüsünü aç">
                {avatar ? <img src={avatar} alt="" className="size-full object-cover" /> : (user.name || username).charAt(0).toLocaleUpperCase("tr")}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={10} className="w-48 border border-white/10 bg-[#171717] p-1.5 text-white shadow-2xl">
                <div className="truncate border-b border-white/10 px-2 py-2 text-xs text-white/50">@{username}</div>
                <DropdownMenuItem className="mt-1 cursor-pointer px-2.5 py-2.5 text-white/80 focus:bg-white/10 focus:text-white" onClick={() => navigate(`/profile/${encodeURIComponent(username)}`)}><UserRound /> Profilim</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer px-2.5 py-2.5 text-white/80 focus:bg-white/10 focus:text-white" onClick={() => { setSession(null); navigate("/"); }}><LogOut /> Çıkış yap</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default ProfileMenu;

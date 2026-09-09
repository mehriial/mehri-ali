import {
    ArrowUpRight,
    Bell,
    BookOpen,
    Images,
    Megaphone,
} from "lucide-react";
import { Link } from "react-router-dom";


const typeConfig = {
    general: {
        label: "Genel",
        icon: Megaphone,
    },
    book: {
        label: "Kitap",
        icon: BookOpen,
    },
    gallery: {
        label: "Galeri",
        icon: Images,
    },
};


function AnnouncementCard({ announcement }) {
    const config =
        typeConfig[announcement.type] ??
        typeConfig.general;

    const Icon = config.icon;

    return (
        <article
            className="
                group
                rounded-2xl
                border
                border-white/[0.08]
                bg-white/[0.025]
                p-5
                transition-colors
                hover:border-white/[0.13]
                hover:bg-white/[0.035]
                sm:p-6
            "
        >
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.03]">
                        <Icon className="h-3.5 w-3.5 text-white/40" />
                    </div>

                    <span className="text-[9px] uppercase tracking-[0.2em] text-white/30">
                        {config.label}
                    </span>
                </div>

                <span className="text-[9px] text-white/20">
                    {announcement.createdAt}
                </span>
            </div>

            <div className="mt-6">
                <h2 className="text-base font-medium tracking-tight text-white/85">
                    {announcement.title}
                </h2>

                <p className="mt-3 text-xs leading-6 text-white/35">
                    {announcement.content}
                </p>
            </div>

            {announcement.bookSlug && (
                <Link
                    to={`/books/${announcement.bookSlug}`}
                    className="
                        mt-6
                        inline-flex
                        items-center
                        gap-1.5
                        text-[10px]
                        text-white/40
                        transition-colors
                        hover:text-white
                    "
                >
                    Kitaba git
                    <ArrowUpRight className="h-3 w-3" />
                </Link>
            )}
        </article>
    );
}


export default AnnouncementCard;
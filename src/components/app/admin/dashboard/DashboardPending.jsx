import {
    ArrowUpRight,
    ImageIcon,
    MessageSquare,
} from "lucide-react";

import { Button } from "@/components/ui/button.jsx";
import {useNavigate} from "react-router-dom";

const pendingItems = [
    {
        id: 1,
        title: "Edit Onayları",
        description: "Onay bekleyen editler",
        count: 4,
        icon: ImageIcon,
        path: "/admin/gallery/edits",
    },
    {
        id: 2,
        title: "Pano Fotoğrafları",
        description: "Onay bekleyen gönderiler",
        count: 2,
        icon: MessageSquare,
        path: "/admin/board",
    },
];

function DashboardPending() {
    const navigate = useNavigate()

    return (
        <section>
            <div className="mb-4">
                <h2 className="text-sm font-medium text-white">
                    Bekleyen İşlemler
                </h2>

                <p className="mt-1 text-xs text-white/30">
                    Onay bekleyen içerikler.
                </p>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
                {pendingItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.id}
                            className="
                                rounded-2xl
                                border
                                border-white/[0.07]
                                bg-white/[0.025]
                                p-5
                            "
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="
                                            flex
                                            h-10
                                            w-10
                                            items-center
                                            justify-center
                                            rounded-xl
                                            bg-white/[0.05]
                                        "
                                    >
                                        <Icon className="h-4 w-4 text-white/50" />
                                    </div>

                                    <div>
                                        <p className="text-sm text-white">
                                            {item.title}
                                        </p>

                                        <p className="mt-1 text-xs text-white/30">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>

                                <span className="text-xl font-medium text-white">
                                    {item.count}
                                </span>
                            </div>

                            <Button
                                type="button"
                                variant="ghost"
                                className="
                                    mt-5
                                    h-9
                                    w-full
                                    justify-between
                                    border
                                    border-white/[0.06]
                                    text-xs
                                    text-white/40
                                    hover:bg-white/[0.04]
                                    hover:text-white
                                "
                                onClick={()=> navigate((item.path))}
                            >
                                İncele
                                <ArrowUpRight className="h-3.5 w-3.5" />
                            </Button>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

export default DashboardPending;

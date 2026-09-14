import {
    Eye,
    Pencil,
    ShieldBan,
    ShieldCheck,
    Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button.jsx";

function AdminTableActions({
                               onView,
                               onEdit,
                               onStatus,
                               onBlock,
                               onDelete,
                           }) {

    return (
        <div className="flex items-center justify-end gap-1">
            {onView && (
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={onView}
                    className="h-8 w-8 cursor-pointer text-white/40 hover:bg-white/[0.06] hover:text-white"
                    title="Görüntüle"
                >
                    <Eye className="h-4 w-4" />
                </Button>
            )}

            {onEdit && (
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={onEdit}
                    className="h-8 w-8 cursor-pointer text-white/40 hover:bg-white/[0.06] hover:text-white"
                    title="Düzenle"
                >
                    <Pencil className="h-4 w-4" />
                </Button>
            )}

            {onStatus && (
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={onStatus.onClick}
                    className={
                        onStatus.status === "active"
                            ? "h-8 w-8 cursor-pointer text-white/40 hover:bg-amber-500/10 hover:text-amber-400"
                            : "h-8 w-8 cursor-pointer text-white/40 hover:bg-emerald-500/10 hover:text-emerald-400"
                    }
                    title={
                        onStatus.status === "active"
                            ? "Pasif yap"
                            : "Aktif yap"
                    }
                >
                    {onStatus.status === "active" ? (
                        <ShieldBan className="h-4 w-4" />
                    ) : (
                        <ShieldCheck className="h-4 w-4" />
                    )}
                </Button>
            )}

            {onBlock && (
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={onBlock.onClick}
                    className={
                        onBlock.blocked
                            ? "h-8 w-8 cursor-pointer text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300"
                            : "h-8 w-8 cursor-pointer text-white/40 hover:bg-red-500/10 hover:text-red-400"
                    }
                    title={
                        onBlock.blocked
                            ? "Engeli kaldır"
                            : "Engelle"
                    }
                >
                    {onBlock.blocked ? (
                        <ShieldCheck className="h-4 w-4" />
                    ) : (
                        <ShieldBan className="h-4 w-4" />
                    )}
                </Button>
            )}

            {onDelete && (
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={onDelete}
                    className="h-8 w-8 cursor-pointer text-white/40 hover:bg-red-500/10 hover:text-red-400"
                    title="Sil"
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            )}
        </div>
    );
}

export default AdminTableActions;
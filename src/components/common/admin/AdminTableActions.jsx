import { Eye, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button.jsx";

function AdminTableActions({
                               onView,
                               onEdit,
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
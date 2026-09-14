import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog.jsx";

function AdminConfirmDialog({
                                open,
                                onOpenChange,
                                title = "Silme işlemini onayla",
                                description = "Bu kaydı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.",
                                confirmText = "Sil",
                                cancelText = "Vazgeç",
                                onConfirm,
                            }) {
    const handleConfirm = () => {
        onConfirm?.();
        onOpenChange(false);
    };

    return (
        <AlertDialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <AlertDialogContent className="border-white/[0.08] bg-[#0a0a0a] text-white sm:max-w-[440px]">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-lg font-medium text-white">
                        {title}
                    </AlertDialogTitle>

                    <AlertDialogDescription className="text-sm leading-6 text-white/40">
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter className="mt-2">
                    <AlertDialogCancel className="cursor-pointer border-white/[0.08] bg-white/[0.03] text-white/60 hover:bg-white/[0.06] hover:text-white">
                        {cancelText}
                    </AlertDialogCancel>

                    <AlertDialogAction
                        onClick={handleConfirm}
                        className="cursor-pointer bg-red-500 text-white hover:bg-red-600"
                    >
                        {confirmText}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default AdminConfirmDialog;
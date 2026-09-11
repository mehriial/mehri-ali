import { AlertTriangle, Trash2 } from "lucide-react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

function DeleteGalleryDialog({
                                 image,
                                 open,
                                 onOpenChange,
                                 onConfirm,
                             }) {
    return (
        <AlertDialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <AlertDialogContent className="border-white/[0.08] bg-[#111111] text-white">
                <AlertDialogHeader>
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10">
                        <AlertTriangle className="h-5 w-5 text-red-400" />
                    </div>

                    <AlertDialogTitle className="text-white">
                        Görsel silinsin mi?
                    </AlertDialogTitle>

                    <AlertDialogDescription className="text-white/40">
                        {image?.title
                            ? `"${image.title}" görseli silinecek.`
                            : "Bu galeri görseli silinecek."}{" "}
                        Bu işlem geri alınamaz.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel className="border-white/[0.08] bg-transparent text-white hover:bg-white/[0.05] hover:text-white">
                        Vazgeç
                    </AlertDialogCancel>

                    <AlertDialogAction
                        onClick={onConfirm}
                        className="bg-red-500 text-white hover:bg-red-600"
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Sil
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default DeleteGalleryDialog;
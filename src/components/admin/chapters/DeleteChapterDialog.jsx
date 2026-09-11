import { AlertTriangle } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

function DeleteChapterDialog({
                                 chapter,
                                 open,
                                 onOpenChange,
                                 onConfirm,
                             }) {
    if (!chapter) return null;

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="border-white/[0.08] bg-[#111111] text-white sm:max-w-[440px]">
                <DialogHeader>
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10">
                        <AlertTriangle className="h-5 w-5 text-red-400" />
                    </div>

                    <DialogTitle className="text-lg text-white">
                        Bölümü sil
                    </DialogTitle>

                    <DialogDescription className="text-sm leading-6 text-white/40">
                        <span className="font-medium text-white/60">
                            {chapter.number}. {chapter.title}
                        </span>{" "}
                        bölümünü silmek istediğinizden emin
                        misiniz? Bu işlem geri alınamaz.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="mt-4 gap-2 sm:gap-2">
                    <Button
                        type="button"
                        variant="ghost"
                        onClick={() =>
                            onOpenChange(false)
                        }
                        className="text-white/50 hover:bg-white/[0.05] hover:text-white"
                    >
                        Vazgeç
                    </Button>

                    <Button
                        type="button"
                        onClick={onConfirm}
                        className="bg-red-500 text-white hover:bg-red-500/90"
                    >
                        Bölümü Sil
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default DeleteChapterDialog;
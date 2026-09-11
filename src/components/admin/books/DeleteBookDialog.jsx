import {
    AlertTriangle,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

function DeleteBookDialog({
                              book,
                              open,
                              onOpenChange,
                              onConfirm,
                          }) {
    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent
                className="
                    border-white/[0.08]
                    bg-[#111111]
                    text-white
                    sm:max-w-[420px]
                "
            >
                <DialogHeader>
                    <div
                        className="
                            mb-2
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-xl
                            bg-red-500/10
                        "
                    >
                        <AlertTriangle className="h-5 w-5 text-red-400" />
                    </div>

                    <DialogTitle>
                        Kitabı sil
                    </DialogTitle>

                    <DialogDescription className="text-white/40">
                        {book?.title
                            ? `"${book.title}" kitabını silmek istediğinize emin misiniz?`
                            : "Bu kitabı silmek istediğinize emin misiniz?"}
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="gap-2 sm:gap-2">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        className="
                            rounded-xl
                            border-white/[0.08]
                            bg-transparent
                            text-white/60
                            hover:bg-white/[0.05]
                            hover:text-white
                        "
                    >
                        Vazgeç
                    </Button>

                    <Button
                        onClick={onConfirm}
                        className="
                            rounded-xl
                            bg-red-500
                            text-white
                            hover:bg-red-500/90
                        "
                    >
                        Sil
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default DeleteBookDialog;
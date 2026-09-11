import { useState } from "react";
import { Plus } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog.jsx";

import { Button } from "@/components/ui/button.jsx";

import EditComposer from "./EditComposer.jsx";

function EditUploadDialog({
    books,
    onSubmit,
}) {
    const [open, setOpen] = useState(false);

    const handleSubmit = (data) => {
        onSubmit(data);
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger asChild>
                <Button
                    type="button"
                    className="
                        cursor-pointer
                        gap-2
                        rounded-full
                        bg-white
                        text-black
                        hover:bg-white/90
                    "
                >
                    <Plus className="h-4 w-4" />
                    Edit Gönder
                </Button>
            </DialogTrigger>

            <DialogContent
                className="
                    max-h-[90vh]
                    overflow-y-auto
                    border-white/10
                    bg-[#0a0a0a]
                    text-white
                    sm:max-w-[520px]
                "
            >
                <DialogHeader>
                    <DialogTitle className="text-lg font-medium">
                        Edit Gönder
                    </DialogTitle>
                </DialogHeader>

                <EditComposer
                    books={books}
                    onSubmit={handleSubmit}
                />
            </DialogContent>
        </Dialog>
    );
}

export default EditUploadDialog;

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog.jsx";

function AdminDialog({
                         open,
                         onOpenChange,
                         title,
                         children,
                         className = "",
                     }) {
    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent
                className={`
                    max-h-[90vh]
                    overflow-y-auto
                    border-white/[0.08]
                    bg-[#0a0a0a]
                    text-white
                    sm:max-w-[800px]
                    ${className}
                `}
            >
                <DialogHeader>
                    <DialogTitle className="text-lg font-medium">
                        {title}
                    </DialogTitle>
                </DialogHeader>

                {children}
            </DialogContent>
        </Dialog>
    );
}

export default AdminDialog;
import { Button } from "@/components/ui/button.jsx";

function AdminPageHeader({
                             eyebrow,
                             title,
                             description,
                             action,
                         }) {
    return (
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
                {eyebrow && (
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/25">
                        {eyebrow}
                    </p>
                )}

                <h1 className="mt-2 text-2xl font-medium tracking-tight text-white sm:text-3xl">
                    {title}
                </h1>

                {description && (
                    <p className="mt-2 max-w-xl text-sm text-white/35">
                        {description}
                    </p>
                )}
            </div>

            {action && (
                <Button
                    type="button"
                    onClick={action.onClick}
                    className="
                        h-10
                        cursor-pointer
                        gap-2
                        rounded-xl
                        bg-white
                        px-4
                        text-black
                        hover:bg-white/90
                    "
                >
                    {action.icon}
                    {action.label}
                </Button>
            )}
        </div>
    );
}

export default AdminPageHeader;
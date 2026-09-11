import { Badge } from "@/components/ui/badge";

const statusStyles = {
    "Devam ediyor":
        "border-white/[0.1] bg-white/[0.07] text-white",

    "Tamamlandı":
        "border-white/[0.1] bg-white/[0.04] text-white/60",

    Taslak:
        "border-white/[0.1] bg-white/[0.03] text-white/40",
};

function BookStatusBadge({ status }) {
    return (
        <Badge
            variant="outline"
            className={`
                rounded-full
                px-2.5
                py-1
                text-xs
                font-normal
                ${statusStyles[status] ?? statusStyles.Taslak}
            `}
        >
            <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />

            {status || "Taslak"}
        </Badge>
    );
}

export default BookStatusBadge;
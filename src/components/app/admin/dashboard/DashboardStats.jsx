
import {
    BookOpen,
    Images,
    Users,
} from "lucide-react";

const stats = [
    {
        label: "Kitaplar",
        value: "2",
        icon: BookOpen,
    },
    {
        label: "Bölümler",
        value: "18",
        icon: BookOpen,
    },
    {
        label: "Galeri Görselleri",
        value: "12",
        icon: Images,
    },
    {
        label: "Kullanıcılar",
        value: "128",
        icon: Users,
    },
];

function DashboardStats() {
    return (
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {stats.map((stat) => {
                const Icon = stat.icon;

                return (
                    <div
                        key={stat.label}
                        className="
                            rounded-2xl
                            border
                            border-white/[0.07]
                            bg-white/[0.025]
                            p-5
                        "
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-xs text-white/35">
                                {stat.label}
                            </span>

                            <Icon className="h-4 w-4 text-white/20" />
                        </div>

                        <p className="mt-5 text-2xl font-medium text-white">
                            {stat.value}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}

export default DashboardStats;

import {
    ArrowDownRight,
    ArrowUpRight,
    BookOpen,
    Eye,
    MessageSquare,
    Users,
} from "lucide-react";

const statistics = [
    {
        title: "Toplam Kitap",
        value: "128",
        change: "+12.5%",
        positive: true,
        icon: BookOpen,
    },
    {
        title: "Toplam Kullanıcı",
        value: "1,284",
        change: "+8.2%",
        positive: true,
        icon: Users,
    },
    {
        title: "Toplam Okunma",
        value: "24.8K",
        change: "+18.4%",
        positive: true,
        icon: Eye,
    },
    {
        title: "Yorumlar",
        value: "3,642",
        change: "-2.4%",
        positive: false,
        icon: MessageSquare,
    },
];

const recentBooks = [
    {
        title: "Yazgı Paradoksu",
        author: "Mehri Ali",
        category: "Fantastik",
        status: "Yayında",
        views: "8.4K",
    },
    {
        title: "Kanlı Hatıralar Portresi",
        author: "Mehri Ali",
        category: "Gerilim",
        status: "Yayında",
        views: "6.7K",
    },
    {
        title: "Sessiz Bahçe",
        author: "Lina Aras",
        category: "Romantik",
        status: "Taslak",
        views: "2.1K",
    },
    {
        title: "Geceye Kalanlar",
        author: "Elif Demir",
        category: "Dram",
        status: "Yayında",
        views: "4.8K",
    },
    {
        title: "Küllerin Ardında",
        author: "Deniz Kaya",
        category: "Fantastik",
        status: "Yayında",
        views: "3.9K",
    },
];

const recentComments = [
    {
        user: "Ayşe Yılmaz",
        comment: "Bu bölüm gerçekten çok etkileyiciydi.",
        book: "Yazgı Paradoksu",
        time: "5 dk önce",
    },
    {
        user: "Mert Kaya",
        comment: "Devamını sabırsızlıkla bekliyorum.",
        book: "Kanlı Hatıralar Portresi",
        time: "18 dk önce",
    },
    {
        user: "Selin Aras",
        comment: "Karakter gelişimini çok sevdim.",
        book: "Sessiz Bahçe",
        time: "42 dk önce",
    },
    {
        user: "Ece Demir",
        comment: "Son sahne beklemediğim bir şekilde bitti.",
        book: "Geceye Kalanlar",
        time: "1 saat önce",
    },
];

function AdminDashboard() {
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <p className="mb-1 text-xs font-medium uppercase tracking-[0.2em] text-white/30">
                    Genel Bakış
                </p>

                <h1 className="font-serif text-2xl font-normal tracking-tight text-white sm:text-3xl">
                    Dashboard
                </h1>

                <p className="mt-2 text-sm text-white/40">
                    Platformdaki genel durumu buradan takip edebilirsiniz.
                </p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {statistics.map((item) => (
                    <StatisticsCard
                        key={item.title}
                        item={item}
                    />
                ))}
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.5fr_1fr]">
                <ReadingOverview />

                <QuickOverview />
            </div>

            {/* Bottom Grid */}
            <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.5fr_1fr]">
                <RecentBooks />

                <RecentComments />
            </div>
        </div>
    );
}

function StatisticsCard({ item }) {
    const Icon = item.icon;

    return (
        <div
            className="
                rounded-2xl
                border
                border-white/[0.07]
                bg-[#0d0d0d]
                p-5
                transition-colors
                hover:border-white/[0.12]
            "
        >
            <div className="flex items-start justify-between">
                <div
                    className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        border
                        border-white/[0.07]
                        bg-white/[0.035]
                    "
                >
                    <Icon
                        className="h-[17px] w-[17px] text-white/60"
                        strokeWidth={1.7}
                    />
                </div>

                <div
                    className={`
                        flex
                        items-center
                        gap-1
                        text-[11px]
                        font-medium
                        ${
                        item.positive
                            ? "text-emerald-400/80"
                            : "text-red-400/80"
                    }
                    `}
                >
                    {item.positive ? (
                        <ArrowUpRight className="h-3 w-3" />
                    ) : (
                        <ArrowDownRight className="h-3 w-3" />
                    )}

                    {item.change}
                </div>
            </div>

            <div className="mt-5">
                <p className="text-xs text-white/35">
                    {item.title}
                </p>

                <p className="mt-1 font-serif text-3xl text-white">
                    {item.value}
                </p>
            </div>
        </div>
    );
}

function ReadingOverview() {
    const data = [35, 48, 42, 68, 56, 74, 82, 67, 88, 76, 92, 85];

    return (
        <div
            className="
                rounded-2xl
                border
                border-white/[0.07]
                bg-[#0d0d0d]
                p-5
                sm:p-6
            "
        >
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-xs text-white/35">
                        Okunma İstatistikleri
                    </p>

                    <h2 className="mt-1 font-serif text-xl text-white">
                        Okunma Genel Bakışı
                    </h2>
                </div>

                <select
                    className="
                        h-9
                        cursor-pointer
                        rounded-lg
                        border
                        border-white/[0.08]
                        bg-white/[0.035]
                        px-3
                        text-xs
                        text-white/60
                        outline-none
                    "
                    defaultValue="12"
                >
                    <option value="12" className="bg-[#111111]">
                        Son 12 ay
                    </option>

                    <option value="6" className="bg-[#111111]">
                        Son 6 ay
                    </option>

                    <option value="3" className="bg-[#111111]">
                        Son 3 ay
                    </option>
                </select>
            </div>

            <div className="mt-8">
                <div className="flex items-end justify-between">
                    <div>
                        <span className="font-serif text-3xl text-white">
                            24,842
                        </span>

                        <span className="ml-2 text-xs text-emerald-400/70">
                            +18.4%
                        </span>
                    </div>
                </div>

                <div className="mt-8 flex h-[180px] items-end gap-2 sm:gap-3">
                    {data.map((height, index) => (
                        <div
                            key={index}
                            className="group relative flex h-full flex-1 items-end"
                        >
                            <div
                                className="
                                    w-full
                                    rounded-t-md
                                    bg-white/[0.08]
                                    transition-all
                                    duration-300
                                    group-hover:bg-white/[0.18]
                                "
                                style={{
                                    height: `${height}%`,
                                }}
                            />

                            <span
                                className="
                                    absolute
                                    -bottom-6
                                    left-1/2
                                    -translate-x-1/2
                                    text-[9px]
                                    text-white/20
                                "
                            >
                                {index + 1}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function QuickOverview() {
    return (
        <div
            className="
                rounded-2xl
                border
                border-white/[0.07]
                bg-[#0d0d0d]
                p-5
                sm:p-6
            "
        >
            <div>
                <p className="text-xs text-white/35">
                    İçerik Durumu
                </p>

                <h2 className="mt-1 font-serif text-xl text-white">
                    Hızlı Özet
                </h2>
            </div>

            <div className="mt-7 space-y-5">
                <ProgressItem
                    label="Yayında"
                    value="96"
                    total="128"
                    percentage={75}
                />

                <ProgressItem
                    label="Taslak"
                    value="24"
                    total="128"
                    percentage={19}
                />

                <ProgressItem
                    label="Beklemede"
                    value="8"
                    total="128"
                    percentage={6}
                />
            </div>

            <div className="mt-7 border-t border-white/[0.07] pt-5">
                <div className="flex items-center justify-between">
                    <span className="text-xs text-white/35">
                        Bu ay eklenen
                    </span>

                    <span className="font-serif text-lg text-white">
                        +18 kitap
                    </span>
                </div>
            </div>
        </div>
    );
}

function ProgressItem({
                          label,
                          value,
                          total,
                          percentage,
                      }) {
    return (
        <div>
            <div className="mb-2 flex items-center justify-between">
                <span className="text-xs text-white/45">
                    {label}
                </span>

                <span className="text-xs text-white/60">
                    {value}
                    <span className="text-white/20">
                        {" "}
                        / {total}
                    </span>
                </span>
            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                <div
                    className="h-full rounded-full bg-white/70 transition-all"
                    style={{
                        width: `${percentage}%`,
                    }}
                />
            </div>
        </div>
    );
}

function RecentBooks() {
    return (
        <div
            className="
                overflow-hidden
                rounded-2xl
                border
                border-white/[0.07]
                bg-[#0d0d0d]
            "
        >
            <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4 sm:px-6">
                <div>
                    <p className="text-xs text-white/35">
                        İçerik
                    </p>

                    <h2 className="mt-1 font-serif text-xl text-white">
                        Son Kitaplar
                    </h2>
                </div>

                <button
                    type="button"
                    className="
                        text-xs
                        text-white/35
                        transition-colors
                        hover:text-white
                    "
                >
                    Tümünü Gör
                </button>
            </div>

            <div className="divide-y divide-white/[0.05]">
                {recentBooks.map((book) => (
                    <div
                        key={book.title}
                        className="
                            flex
                            items-center
                            gap-3
                            px-5
                            py-4
                            transition-colors
                            hover:bg-white/[0.02]
                            sm:px-6
                        "
                    >
                        <div
                            className="
                                flex
                                h-10
                                w-10
                                shrink-0
                                items-center
                                justify-center
                                rounded-lg
                                bg-white/[0.05]
                                font-serif
                                text-sm
                                text-white/60
                            "
                        >
                            {book.title.charAt(0)}
                        </div>

                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-white/80">
                                {book.title}
                            </p>

                            <p className="mt-0.5 truncate text-[11px] text-white/30">
                                {book.author} · {book.category}
                            </p>
                        </div>

                        <div className="hidden items-center gap-2 sm:flex">
                            <span
                                className={`
                                    rounded-full
                                    px-2.5
                                    py-1
                                    text-[10px]
                                    ${
                                    book.status === "Yayında"
                                        ? "bg-emerald-400/[0.08] text-emerald-400/70"
                                        : "bg-amber-400/[0.08] text-amber-400/70"
                                }
                                `}
                            >
                                {book.status}
                            </span>
                        </div>

                        <div className="hidden w-14 text-right text-[11px] text-white/30 md:block">
                            {book.views}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function RecentComments() {
    return (
        <div
            className="
                overflow-hidden
                rounded-2xl
                border
                border-white/[0.07]
                bg-[#0d0d0d]
            "
        >
            <div className="border-b border-white/[0.07] px-5 py-4 sm:px-6">
                <p className="text-xs text-white/35">
                    Etkileşim
                </p>

                <h2 className="mt-1 font-serif text-xl text-white">
                    Son Yorumlar
                </h2>
            </div>

            <div className="divide-y divide-white/[0.05]">
                {recentComments.map((item) => (
                    <div
                        key={`${item.user}-${item.time}`}
                        className="px-5 py-4 sm:px-6"
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className="
                                    flex
                                    h-8
                                    w-8
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-white/[0.07]
                                    text-[10px]
                                    font-medium
                                    text-white/60
                                "
                            >
                                {item.user.charAt(0)}
                            </div>

                            <div className="min-w-0">
                                <p className="text-xs font-medium text-white/70">
                                    {item.user}
                                </p>

                                <p className="mt-0.5 text-[10px] text-white/25">
                                    {item.time}
                                </p>
                            </div>
                        </div>

                        <p className="mt-3 line-clamp-2 text-xs leading-5 text-white/40">
                            {item.comment}
                        </p>

                        <p className="mt-2 text-[10px] text-white/20">
                            {item.book}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AdminDashboard;
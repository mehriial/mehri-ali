import {
    HiBookOpen,
    HiChatAlt2,
    HiClipboardList,
    HiSpeakerphone,
    HiMail,
    HiUsers,
} from "react-icons/hi";

const stats = [
    {
        title: "Kitaplar",
        value: "12",
        description: "Yayınlanan kitap",
        icon: HiBookOpen,
    },
    {
        title: "Bölümler",
        value: "86",
        description: "Toplam bölüm",
        icon: HiClipboardList,
    },
    {
        title: "Yorumlar",
        value: "248",
        description: "Okur yorumu",
        icon: HiChatAlt2,
    },
    {
        title: "Pano",
        value: "64",
        description: "Okur gönderisi",
        icon: HiUsers,
    },
    {
        title: "Duyurular",
        value: "8",
        description: "Yayınlanan duyuru",
        icon: HiSpeakerphone,
    },
    {
        title: "Mesajlar",
        value: "17",
        description: "Bekleyen mesaj",
        icon: HiMail,
    },
];

const recentComments = [
    {
        author: "Mehri",
        text: "Bu bölümün sonu gerçekten beklemediğim bir şekilde bitti.",
        date: "Bugün, 14:32",
    },
    {
        author: "Aylin",
        text: "Karakterin bu kararını çok merak ediyorum.",
        date: "Bugün, 12:18",
    },
    {
        author: "Okur",
        text: "Bu sahneyi tekrar tekrar okudum.",
        date: "Dün, 21:45",
    },
    {
        author: "Elif",
        text: "Bence burada önemli bir ipucu var.",
        date: "Dün, 18:20",
    },
];

const recentMessages = [
    {
        name: "Zeynep Yılmaz",
        subject: "Kitap hakkında",
        date: "Bugün, 11:42",
    },
    {
        name: "Ali Demir",
        subject: "İş birliği önerisi",
        date: "Dün, 16:30",
    },
    {
        name: "Sena Kaya",
        subject: "Bir soru",
        date: "Dün, 10:15",
    },
];

const AdminDashboard = () => {
    return (
        <div className="min-h-screen bg-background text-shadow-white">

            {/* HEADER */}

            <header className="border-b border-white/10">
                <div className="
                    mx-auto
                    max-w-[1400px]
                    px-6
                    py-8
                    lg:px-10
                ">
                    <p className="
                        text-[10px]
                        uppercase
                        tracking-[0.3em]
                        text-header-accent
                    ">
                        Yönetim paneli
                    </p>

                    <h1 className="
                        mt-3
                        font-heading
                        text-3xl
                        font-normal
                        sm:text-4xl
                    ">
                        Hoş geldin
                    </h1>

                    <p className="
                        mt-3
                        max-w-xl
                        text-sm
                        leading-7
                        text-shadow-white/40
                    ">
                        Kitaplarını, bölümlerini ve okurlardan gelen
                        içerikleri buradan yönetebilirsin.
                    </p>
                </div>
            </header>

            <main className="
                mx-auto
                max-w-[1400px]
                px-6
                py-10
                lg:px-10
                lg:py-14
            ">

                {/* STATS */}

                <section>
                    <div className="
                        grid
                        gap-4
                        sm:grid-cols-2
                        lg:grid-cols-3
                        xl:grid-cols-6
                    ">

                        {stats.map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.title}
                                    className="
                                        border
                                        border-white/10
                                        bg-white/[0.02]
                                        p-5
                                        transition-all
                                        duration-300
                                        hover:border-header-accent/50
                                    "
                                >
                                    <div className="
                                        flex
                                        items-start
                                        justify-between
                                        gap-4
                                    ">
                                        <div>
                                            <p className="
                                                text-[9px]
                                                uppercase
                                                tracking-[0.2em]
                                                text-shadow-white/35
                                            ">
                                                {item.title}
                                            </p>

                                            <p className="
                                                mt-4
                                                font-heading
                                                text-3xl
                                            ">
                                                {item.value}
                                            </p>
                                        </div>

                                        <Icon className="
                                            h-5
                                            w-5
                                            text-header-accent
                                        " />
                                    </div>

                                    <p className="
                                        mt-4
                                        text-xs
                                        text-shadow-white/30
                                    ">
                                        {item.description}
                                    </p>
                                </div>
                            );
                        })}

                    </div>
                </section>

                {/* CONTENT */}

                <section className="
                    mt-10
                    grid
                    gap-6
                    lg:grid-cols-2
                ">

                    {/* RECENT COMMENTS */}

                    <div className="
                        border
                        border-white/10
                    ">

                        <div className="
                            flex
                            items-center
                            justify-between
                            border-b
                            border-white/10
                            px-6
                            py-5
                        ">
                            <div>
                                <p className="
                                    text-[9px]
                                    uppercase
                                    tracking-[0.25em]
                                    text-header-accent
                                ">
                                    Son yorumlar
                                </p>

                                <h2 className="
                                    mt-2
                                    font-heading
                                    text-xl
                                ">
                                    Okur yorumları
                                </h2>
                            </div>

                            <HiChatAlt2 className="
                                h-5
                                w-5
                                text-shadow-white/30
                            " />
                        </div>

                        <div>
                            {recentComments.map((comment, index) => (
                                <div
                                    key={index}
                                    className="
                                        border-b
                                        border-white/10
                                        px-6
                                        py-5
                                        last:border-b-0
                                    "
                                >
                                    <div className="
                                        flex
                                        items-center
                                        justify-between
                                        gap-4
                                    ">
                                        <p className="
                                            text-xs
                                            font-medium
                                            text-header-accent
                                        ">
                                            {comment.author}
                                        </p>

                                        <span className="
                                            text-[9px]
                                            text-shadow-white/25
                                        ">
                                            {comment.date}
                                        </span>
                                    </div>

                                    <p className="
                                        mt-2
                                        text-sm
                                        leading-6
                                        text-shadow-white/65
                                    ">
                                        {comment.text}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="
                            border-t
                            border-white/10
                            px-6
                            py-4
                        ">
                            <button
                                type="button"
                                className="
                                    text-[9px]
                                    uppercase
                                    tracking-[0.2em]
                                    text-shadow-white/40
                                    transition-colors
                                    hover:text-header-accent
                                "
                            >
                                Tüm yorumları gör →
                            </button>
                        </div>

                    </div>

                    {/* MESSAGES */}

                    <div className="
                        border
                        border-white/10
                    ">

                        <div className="
                            flex
                            items-center
                            justify-between
                            border-b
                            border-white/10
                            px-6
                            py-5
                        ">
                            <div>
                                <p className="
                                    text-[9px]
                                    uppercase
                                    tracking-[0.25em]
                                    text-header-accent
                                ">
                                    Son mesajlar
                                </p>

                                <h2 className="
                                    mt-2
                                    font-heading
                                    text-xl
                                ">
                                    İletişim
                                </h2>
                            </div>

                            <HiMail className="
                                h-5
                                w-5
                                text-shadow-white/30
                            " />
                        </div>

                        <div>
                            {recentMessages.map((message, index) => (
                                <div
                                    key={index}
                                    className="
                                        flex
                                        items-center
                                        justify-between
                                        gap-5
                                        border-b
                                        border-white/10
                                        px-6
                                        py-5
                                        last:border-b-0
                                    "
                                >
                                    <div className="min-w-0">
                                        <p className="
                                            text-xs
                                            font-medium
                                            text-white
                                        ">
                                            {message.name}
                                        </p>

                                        <p className="
                                            mt-1
                                            truncate
                                            text-sm
                                            text-shadow-white/50
                                        ">
                                            {message.subject}
                                        </p>
                                    </div>

                                    <span className="
                                        shrink-0
                                        text-[9px]
                                        text-shadow-white/25
                                    ">
                                        {message.date}
                                    </span>
                                </div>
                            ))}
                        </div>

                        <div className="
                            border-t
                            border-white/10
                            px-6
                            py-4
                        ">
                            <button
                                type="button"
                                className="
                                    text-[9px]
                                    uppercase
                                    tracking-[0.2em]
                                    text-shadow-white/40
                                    transition-colors
                                    hover:text-header-accent
                                "
                            >
                                Tüm mesajları gör →
                            </button>
                        </div>

                    </div>

                </section>

                {/* QUICK ACTIONS */}

                <section className="mt-10">

                    <p className="
                        text-[9px]
                        uppercase
                        tracking-[0.3em]
                        text-header-accent
                    ">
                        Hızlı işlemler
                    </p>

                    <div className="
                        mt-5
                        grid
                        gap-3
                        sm:grid-cols-2
                        lg:grid-cols-4
                    ">

                        <button
                            type="button"
                            className="
                                flex
                                items-center
                                gap-4
                                border
                                border-white/10
                                p-5
                                text-left
                                transition-all
                                duration-300
                                hover:border-header-accent
                            "
                        >
                            <HiBookOpen className="
                                h-5
                                w-5
                                text-header-accent
                            " />

                            <div>
                                <p className="text-sm">
                                    Yeni kitap
                                </p>

                                <p className="
                                    mt-1
                                    text-xs
                                    text-shadow-white/30
                                ">
                                    Kitap ekle
                                </p>
                            </div>
                        </button>

                        <button
                            type="button"
                            className="
                                flex
                                items-center
                                gap-4
                                border
                                border-white/10
                                p-5
                                text-left
                                transition-all
                                duration-300
                                hover:border-header-accent
                            "
                        >
                            <HiClipboardList className="
                                h-5
                                w-5
                                text-header-accent
                            " />

                            <div>
                                <p className="text-sm">
                                    Yeni bölüm
                                </p>

                                <p className="
                                    mt-1
                                    text-xs
                                    text-shadow-white/30
                                ">
                                    Bölüm oluştur
                                </p>
                            </div>
                        </button>

                        <button
                            type="button"
                            className="
                                flex
                                items-center
                                gap-4
                                border
                                border-white/10
                                p-5
                                text-left
                                transition-all
                                duration-300
                                hover:border-header-accent
                            "
                        >
                            <HiSpeakerphone className="
                                h-5
                                w-5
                                text-header-accent
                            " />

                            <div>
                                <p className="text-sm">
                                    Duyuru oluştur
                                </p>

                                <p className="
                                    mt-1
                                    text-xs
                                    text-shadow-white/30
                                ">
                                    Yeni duyuru yayınla
                                </p>
                            </div>
                        </button>

                        <button
                            type="button"
                            className="
                                flex
                                items-center
                                gap-4
                                border
                                border-white/10
                                p-5
                                text-left
                                transition-all
                                duration-300
                                hover:border-header-accent
                            "
                        >
                            <HiChatAlt2 className="
                                h-5
                                w-5
                                text-header-accent
                            " />

                            <div>
                                <p className="text-sm">
                                    Yorumları yönet
                                </p>

                                <p className="
                                    mt-1
                                    text-xs
                                    text-shadow-white/30
                                ">
                                    Okur yorumlarını incele
                                </p>
                            </div>
                        </button>

                    </div>

                </section>

            </main>
        </div>
    );
};

export default AdminDashboard;
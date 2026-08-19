import { useState } from "react";
import {
    HiMail,
    HiSearch,
    HiTrash,
} from "react-icons/hi";

const initialMessages = [
    {
        id: 1,
        name: "Elif Yılmaz",
        email: "elif@example.com",
        subject: "Kitabınız hakkında",
        message: "Merhaba, kitabınız hakkında sizinle iletişime geçmek istiyorum.",
        date: "19 Ağustos 2026",
        read: false,
    },
    {
        id: 2,
        name: "Mert Kaya",
        email: "mert@example.com",
        subject: "İş birliği önerisi",
        message: "Merhaba, bir iş birliği önerisi için yazıyorum.",
        date: "18 Ağustos 2026",
        read: true,
    },
    {
        id: 3,
        name: "Zeynep",
        email: "zeynep@example.com",
        subject: "Yeni bölüm",
        message: "Yeni bölümün ne zaman yayınlanacağını merak ediyorum.",
        date: "17 Ağustos 2026",
        read: true,
    },
];

const Contact = () => {
    const [messages, setMessages] = useState(initialMessages);
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState(null);

    const filtered = messages.filter((message) =>
        `${message.name} ${message.email} ${message.subject}`
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    const markRead = (id) => {
        setMessages((prev) =>
            prev.map((message) =>
                message.id === id
                    ? { ...message, read: true }
                    : message
            )
        );
    };

    const removeMessage = (id) => {
        setMessages((prev) =>
            prev.filter((message) => message.id !== id)
        );

        if (selected?.id === id) {
            setSelected(null);
        }
    };

    return (
        <div className="min-h-screen bg-background">

            <main className="mx-auto max-w-[1400px] px-6 py-10 lg:px-10">

                <div className="border-b border-white/10 pb-8">

                    <p className="sectionLabel">
                        Yönetim
                    </p>

                    <h1 className="mt-3 font-heading text-3xl">
                        İletişim mesajları
                    </h1>

                    <p className="mt-2 text-sm text-shadow-white/40">
                        Okurlardan gelen mesajları görüntüle.
                    </p>

                </div>

                <div className="relative mt-8">

                    <HiSearch className="
                        absolute
                        left-4
                        top-1/2
                        h-4
                        w-4
                        -translate-y-1/2
                        text-shadow-white/30
                    " />

                    <input
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        placeholder="Mesaj ara..."
                        className="adminInput pl-11"
                    />

                </div>

                <div className="
                    mt-6
                    grid
                    gap-5
                    lg:grid-cols-[380px_1fr]
                ">

                    {/* MESSAGE LIST */}

                    <div className="
                        divide-y
                        divide-white/10
                        border
                        border-white/10
                    ">

                        {filtered.map((message) => (

                            <button
                                key={message.id}
                                type="button"
                                onClick={() => {
                                    setSelected(message);
                                    markRead(message.id);
                                }}
                                className={`
                                    block
                                    w-full
                                    p-5
                                    text-left
                                    transition-colors
                                    hover:bg-white/[0.03]
                                    ${
                                    selected?.id === message.id
                                        ? "bg-white/[0.04]"
                                        : ""
                                }
                                `}
                            >

                                <div className="flex justify-between gap-3">

                                    <p className={`
                                        text-xs
                                        ${
                                        message.read
                                            ? "text-shadow-white/60"
                                            : "font-medium text-white"
                                    }
                                    `}>
                                        {message.name}
                                    </p>

                                    {!message.read && (
                                        <span className="
                                            h-1.5
                                            w-1.5
                                            rounded-full
                                            bg-header-accent"
                                        />
                                    )}

                                </div>

                                <p className="
                                              mt-2
                                              truncate
                                              text-sm
                                              text-shadow-white/50
                                        ">
                                    {message.subject}
                                        </p>

                                        <p className="
                                    mt-2
                                    text-[9px]
                                    text-shadow-white/25
                                ">
                                    {message.date}
                                </p>

                            </button>

                        ))}

                    </div>

                    {/* DETAIL */}

                    <div className="
                        min-h-[400px]
                        border
                        border-white/10
                        p-6
                        lg:p-8
                    ">

                        {selected ? (

                            <>

                                <div className="
                                    flex
                                    justify-between
                                    gap-5
                                    border-b
                                    border-white/10
                                    pb-6
                                ">

                                    <div>

                                        <p className="
                                            text-[9px]
                                            uppercase
                                            tracking-[0.2em]
                                            text-header-accent
                                        ">
                                            {selected.date}
                                        </p>

                                        <h2 className="
                                            mt-3
                                            font-heading
                                            text-2xl
                                        ">
                                            {selected.subject}
                                        </h2>

                                        <p className="
                                            mt-2
                                            text-sm
                                            text-shadow-white/40
                                        ">
                                            {selected.name} · {selected.email}
                                        </p>

                                    </div>

                                    <button
                                        onClick={() =>
                                            removeMessage(selected.id)
                                        }
                                        className="
                                            iconButton
                                            hover:text-red-400
                                        "
                                    >
                                        <HiTrash />
                                    </button>

                                </div>

                                <p className="
                                    py-8
                                    text-sm
                                    leading-8
                                    text-shadow-white/75
                                ">
                                    {selected.message}
                                </p>

                                <a
                                    href={`mailto:${selected.email}`}
                                    className="primaryButton"
                                >
                                    <HiMail />
                                    Yanıtla
                                </a>

                            </>

                        ) : (

                            <div className="
                                flex
                                h-full
                                min-h-[350px]
                                flex-col
                                items-center
                                justify-center
                                text-center
                            ">

                                <HiMail className="
                                    h-8
                                    w-8
                                    text-shadow-white/20
                                " />

                                <p className="
                                    mt-4
                                    text-sm
                                    text-shadow-white/35
                                ">
                                    Görüntülemek için bir mesaj seç.
                                </p>

                            </div>

                        )}

                    </div>

                </div>

            </main>
        </div>
    );
};

export default Contact;
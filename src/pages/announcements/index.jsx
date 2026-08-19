import AnnouncementCard from "../../components/base/announcements/AnnouncementCard.jsx";

const announcements = [
    {
        id: 1,
        date: "19 Avqust 2026",
        title: "Yeni kitab əlavə edildi",
        content:
            "Kitabxanamıza yeni bir əsər əlavə edildi. Artıq kitabı oxuya və bölümlər haqqında fikirlərini paylaşa bilərsiniz.",
    },
    {
        id: 2,
        date: "15 Avqust 2026",
        title: "Oxucu panosu istifadəyə verildi",
        content:
            "Artıq oxuduğunuz kitablar haqqında fikirlərinizi digər oxucularla paylaşa bilərsiniz.",
    },
    {
        id: 3,
        date: "10 Avqust 2026",
        title: "Oxuma ayarları yeniləndi",
        content:
            "Reader səhifəsinə yeni font ölçüsü və font ailəsi seçimləri əlavə edildi.",
    },
];

const Announcements = () => {
    return (
        <div className="
            min-h-screen
            bg-background
            text-shadow-white
        ">

            <main className="
                mx-auto
                max-w-[900px]
                px-6
                py-16
                lg:px-10
                lg:py-24
            ">

                {/* HEADER */}

                <header className="
                    border-b
                    border-white/10
                    pb-10
                ">

                    <p className="
                        text-[10px]
                        uppercase
                        tracking-[0.3em]
                        text-header-accent
                    ">
                        Xəbərlər
                    </p>

                    <h1 className="
                        mt-4
                        font-heading
                        text-4xl
                        sm:text-5xl
                    ">
                        Duyurular
                    </h1>

                    <p className="
                        mt-4
                        max-w-xl
                        text-sm
                        leading-7
                        text-shadow-white/40
                    ">
                        Kitabxana və platformadakı
                        yeniliklərdən burada xəbərdar
                        ola bilərsiniz.
                    </p>

                </header>

                {/* ANNOUNCEMENTS */}

                <section className="mt-8">

                    {announcements.map(
                        (announcement) => (
                            <AnnouncementCard
                                key={announcement.id}
                                {...announcement}
                            />
                        )
                    )}

                </section>

            </main>

        </div>
    );
};

export default Announcements;
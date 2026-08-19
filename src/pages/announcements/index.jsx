import AnnouncementCard from "../../components/base/announcements/AnnouncementCard.jsx";

const announcements = [
    {
        id: 1,
        date: "19 Ağustos 2026",
        title: "Yeni kitap eklendi",
        content:
            "Kütüphanemize yeni bir eser eklendi. Artık kitabı okuyabilir ve bölümler hakkında düşüncelerinizi paylaşabilirsiniz.",
    },
    {
        id: 2,
        date: "15 Ağustos 2026",
        title: "Okur panosu kullanıma açıldı",
        content:
            "Artık okuduğunuz kitaplar hakkındaki düşüncelerinizi diğer okurlarla paylaşabilirsiniz.",
    },
    {
        id: 3,
        date: "10 Ağustos 2026",
        title: "Okuma ayarları güncellendi",
        content:
            "Okuma sayfasına yeni yazı boyutu ve yazı tipi seçenekleri eklendi.",
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
                        Haberler
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
                        Kütüphane ve platformdaki
                        yeniliklerden burada haberdar
                        olabilirsiniz.
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
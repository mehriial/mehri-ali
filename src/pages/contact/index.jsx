import {
    HiMail,
    HiLocationMarker,
    HiUser,
    HiArrowRight,
} from "react-icons/hi";

const Contact = () => {
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        console.log({
            name: formData.get("name"),
            email: formData.get("email"),
            subject: formData.get("subject"),
            message: formData.get("message"),
        });

        e.currentTarget.reset();
    };

    return (
        <div className="min-h-screen bg-background text-shadow-white">

              {/* =========================================
                CONTENT
            ========================================= */}

            <main className="
                mx-auto
                max-w-[1200px]
                px-6
                py-16
                lg:px-10
                lg:py-24
            ">

                <div className="
                    grid
                    gap-16
                    lg:grid-cols-[1fr_360px]
                    lg:gap-24
                ">


                    {/* =================================
                        CONTACT FORM
                    ================================= */}

                    <section>

                        <div className="mb-10">

                            <p className="
                                text-[10px]
                                uppercase
                                tracking-[0.3em]
                                text-header-accent
                            ">
                                Mesaj gönder
                            </p>

                            <h2 className="
                                mt-3
                                font-heading
                                text-3xl
                                sm:text-4xl
                            ">
                                Bana ulaş
                            </h2>

                            <p className="
                                mt-4
                                max-w-xl
                                text-sm
                                leading-7
                                text-shadow-white/40
                            ">
                                Aşağıdaki formu doldurarak doğrudan
                                mesaj gönderebilirsin.
                            </p>

                        </div>


                        <form
                            onSubmit={handleSubmit}
                            className="space-y-6"
                        >

                            {/* NAME + EMAIL */}

                            <div className="
                                grid
                                gap-6
                                sm:grid-cols-2
                            ">

                                <div>

                                    <label className="
                                        mb-2
                                        block
                                        text-[9px]
                                        uppercase
                                        tracking-[0.2em]
                                        text-shadow-white/40
                                    ">
                                        Adın
                                    </label>

                                    <div className="relative">

                                        <HiUser className="
                                            pointer-events-none
                                            absolute
                                            left-4
                                            top-1/2
                                            h-4
                                            w-4
                                            -translate-y-1/2
                                            text-shadow-white/20
                                        " />

                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            placeholder="Adın"
                                            className="
                                                w-full
                                                border
                                                border-white/10
                                                bg-white/[0.02]
                                                py-3.5
                                                pl-11
                                                pr-4
                                                text-sm
                                                text-white
                                                outline-none
                                                transition-colors
                                                placeholder:text-shadow-white/20
                                                focus:border-header-accent
                                            "
                                        />

                                    </div>

                                </div>


                                <div>

                                    <label className="
                                        mb-2
                                        block
                                        text-[9px]
                                        uppercase
                                        tracking-[0.2em]
                                        text-shadow-white/40
                                    ">
                                        E-posta
                                    </label>

                                    <div className="relative">

                                        <HiMail className="
                                            pointer-events-none
                                            absolute
                                            left-4
                                            top-1/2
                                            h-4
                                            w-4
                                            -translate-y-1/2
                                            text-shadow-white/20
                                        " />

                                        <input
                                            type="email"
                                            name="email"
                                            required
                                            placeholder="ornek@mail.com"
                                            className="
                                                w-full
                                                border
                                                border-white/10
                                                bg-white/[0.02]
                                                py-3.5
                                                pl-11
                                                pr-4
                                                text-sm
                                                text-white
                                                outline-none
                                                transition-colors
                                                placeholder:text-shadow-white/20
                                                focus:border-header-accent
                                            "
                                        />

                                    </div>

                                </div>

                            </div>


                            {/* SUBJECT */}

                            <div>

                                <label className="
                                    mb-2
                                    block
                                    text-[9px]
                                    uppercase
                                    tracking-[0.2em]
                                    text-shadow-white/40
                                ">
                                    Konu
                                </label>

                                <input
                                    type="text"
                                    name="subject"
                                    required
                                    placeholder="Mesajının konusu"
                                    className="
                                        w-full
                                        border
                                        border-white/10
                                        bg-white/[0.02]
                                        px-4
                                        py-3.5
                                        text-sm
                                        text-white
                                        outline-none
                                        transition-colors
                                        placeholder:text-shadow-white/20
                                        focus:border-header-accent
                                    "
                                />

                            </div>


                            {/* MESSAGE */}

                            <div>

                                <label className="
                                    mb-2
                                    block
                                    text-[9px]
                                    uppercase
                                    tracking-[0.2em]
                                    text-shadow-white/40
                                ">
                                    Mesajın
                                </label>

                                <textarea
                                    name="message"
                                    required
                                    rows={8}
                                    placeholder="Mesajını buraya yaz..."
                                    className="
                                        w-full
                                        resize-none
                                        border
                                        border-white/10
                                        bg-white/[0.02]
                                        px-4
                                        py-4
                                        text-sm
                                        leading-7
                                        text-white
                                        outline-none
                                        transition-colors
                                        placeholder:text-shadow-white/20
                                        focus:border-header-accent
                                    "
                                />

                            </div>


                            {/* SUBMIT */}

                            <div className="
                                flex
                                items-center
                                justify-between
                                gap-6
                            ">

                                <p className="
                                    max-w-xs
                                    text-[10px]
                                    leading-5
                                    text-shadow-white/25
                                ">
                                    Mesajını gönderdikten sonra
                                    mümkün olduğunca kısa sürede
                                    geri dönüş yapılacaktır.
                                </p>

                                <button
                                    type="submit"
                                    className="
                                        group
                                        flex
                                        shrink-0
                                        items-center
                                        gap-3
                                        border
                                        border-header-accent
                                        px-6
                                        py-3.5
                                        text-[9px]
                                        uppercase
                                        tracking-[0.2em]
                                        text-header-accent
                                        transition-all
                                        duration-300
                                        hover:bg-header-accent
                                        hover:text-white
                                    "
                                >
                                    Mesaj gönder

                                    <HiArrowRight className="
                                        h-3.5
                                        w-3.5
                                        transition-transform
                                        duration-300
                                        group-hover:translate-x-1
                                    " />

                                </button>

                            </div>

                        </form>

                    </section>


                    {/* =================================
                        AUTHOR INFORMATION
                    ================================= */}

                    <aside>

                        <div className="
                            border
                            border-white/10
                            bg-white/[0.02]
                            p-6
                            lg:p-7
                        ">

                            <p className="
                                text-[10px]
                                uppercase
                                tracking-[0.3em]
                                text-header-accent
                            ">
                                Yazar
                            </p>

                            <div className="
                                mt-6
                                flex
                                items-center
                                gap-4
                            ">

                                <div className="
                                    flex
                                    h-14
                                    w-14
                                    shrink-0
                                    items-center
                                    justify-center
                                    border
                                    border-header-accent/30
                                    text-header-accent
                                ">
                                    <HiUser className="h-6 w-6" />
                                </div>

                                <div>

                                    <h2 className="
                                        font-heading
                                        text-xl
                                    ">
                                        Yazar Adı
                                    </h2>

                                    <p className="
                                        mt-1
                                        text-xs
                                        text-shadow-white/30
                                    ">
                                        Yazar & Hikâye Anlatıcısı
                                    </p>

                                </div>

                            </div>


                            {/* CONTACT DETAILS */}

                            <div className="
                                mt-8
                                space-y-6
                                border-t
                                border-white/10
                                pt-7
                            ">

                                {/* EMAIL */}

                                <div className="
                                    flex
                                    gap-4
                                ">

                                    <HiMail className="
                                        mt-0.5
                                        h-4
                                        w-4
                                        shrink-0
                                        text-header-accent
                                    " />

                                    <div>

                                        <p className="
                                            text-[9px]
                                            uppercase
                                            tracking-[0.2em]
                                            text-shadow-white/30
                                        ">
                                            E-posta
                                        </p>

                                        <a
                                            href="mailto:hello@example.com"
                                            className="
                                                mt-1.5
                                                block
                                                text-sm
                                                transition-colors
                                                hover:text-header-accent
                                            "
                                        >
                                            hello@example.com
                                        </a>

                                    </div>

                                </div>


                                {/* LOCATION */}

                                <div className="
                                    flex
                                    gap-4
                                ">

                                    <HiLocationMarker className="
                                        mt-0.5
                                        h-4
                                        w-4
                                        shrink-0
                                        text-header-accent
                                    " />

                                    <div>

                                        <p className="
                                            text-[9px]
                                            uppercase
                                            tracking-[0.2em]
                                            text-shadow-white/30
                                        ">
                                            Konum
                                        </p>

                                        <p className="
                                            mt-1.5
                                            text-sm
                                            text-shadow-white/70
                                        ">
                                            İstanbul, Türkiye
                                        </p>

                                    </div>

                                </div>
                            </div>

                        </div>


                        {/* =================================
                            SOCIAL
                        ================================= */}

                        <div className="
                            mt-6
                            border
                            border-white/10
                            p-6
                            lg:p-7
                        ">

                            <p className="
                                text-[10px]
                                uppercase
                                tracking-[0.3em]
                                text-header-accent
                            ">
                                Sosyal medya
                            </p>

                            <div className="
                                mt-5
                                space-y-3
                            ">

                                <a
                                    href="#"
                                    className="
                                        group
                                        flex
                                        items-center
                                        justify-between
                                        border-b
                                        border-white/10
                                        pb-3
                                        text-sm
                                        text-shadow-white/60
                                        transition-colors
                                        hover:text-header-accent
                                    "
                                >
                                    Instagram

                                    <HiArrowRight className="
                                        h-3.5
                                        w-3.5
                                        transition-transform
                                        group-hover:translate-x-1
                                    " />

                                </a>

                                <a
                                    href="#"
                                    className="
                                        group
                                        flex
                                        items-center
                                        justify-between
                                        border-b
                                        border-white/10
                                        pb-3
                                        text-sm
                                        text-shadow-white/60
                                        transition-colors
                                        hover:text-header-accent
                                    "
                                >
                                    X / Twitter

                                    <HiArrowRight className="
                                        h-3.5
                                        w-3.5
                                        transition-transform
                                        group-hover:translate-x-1
                                    " />

                                </a>

                                <a
                                    href="#"
                                    className="
                                        group
                                        flex
                                        items-center
                                        justify-between
                                        text-sm
                                        text-shadow-white/60
                                        transition-colors
                                        hover:text-header-accent
                                    "
                                >
                                    Goodreads

                                    <HiArrowRight className="
                                        h-3.5
                                        w-3.5
                                        transition-transform
                                        group-hover:translate-x-1
                                    " />

                                </a>

                            </div>

                        </div>

                    </aside>

                </div>

            </main>


            {/* =========================================
                FOOTER NOTE
            ========================================= */}

            <section className="
                border-t
                border-white/10
            ">

                <div className="
                    mx-auto
                    max-w-[1200px]
                    px-6
                    py-10
                    lg:px-10
                ">

                    <p className="
                        text-center
                        text-[10px]
                        uppercase
                        tracking-[0.25em]
                        text-shadow-white/25
                    ">
                        Hikâyeler hakkında konuşmak her zaman güzeldir.
                    </p>

                </div>

            </section>

        </div>
    );
};

export default Contact;

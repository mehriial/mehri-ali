const BooksHeader = () => {
    return (
        <section className="border-b border-white/10">
            <div className="mx-auto max-w-[1400px] p-6 lg:px-10">

                <p className="
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-[0.35em]
                    text-header-accent
                ">
                    Kütüphane
                </p>

                <h1 className="
                    mt-5
                    font-heading
                    text-5xl
                    font-normal
                    tracking-tight
                    sm:text-6xl
                    lg:text-7xl
                ">
                    Kitaplarım
                </h1>

                <p className="
                    mt-6
                    max-w-xl
                    text-base
                    leading-8
                    text-shadow-white/50
                ">
                    Yazdığım tüm hikâyeleri, serileri ve
                    karakterlerin dünyalarını burada
                    bulabilirsin.
                </p>

            </div>
        </section>
    );
};

export default BooksHeader;
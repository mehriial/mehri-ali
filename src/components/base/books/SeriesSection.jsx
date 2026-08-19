import BooksGrid from "./BooksGrid.jsx";

const SeriesSection = ({ series }) => {
    return (
        <section>

            <div className="
                mb-10
                flex
                items-end
                justify-between
            ">
                <div>
                    <p className="
                        text-[10px]
                        uppercase
                        tracking-[0.3em]
                        text-header-accent
                    ">
                        Seriler
                    </p>

                    <h2 className="
                        mt-3
                        font-heading
                        text-3xl
                        font-normal
                    ">
                        Hikâye dünyaları
                    </h2>
                </div>
            </div>

            <div className="space-y-20">
                {series.map((item) => (
                    <div key={item.id}>

                        <div className="
                            mb-8
                            flex
                            items-center
                            gap-4
                        ">
                            <h3 className="
                                font-heading
                                text-2xl
                            ">
                                {item.name}
                            </h3>

                            <span className="
                                h-px
                                flex-1
                                bg-white/10
                            " />

                            <span className="
                                text-[9px]
                                uppercase
                                tracking-[0.2em]
                                text-shadow-white/30
                            ">
                                {item.books.length} kitap
                            </span>
                        </div>

                        <BooksGrid books={item.books} />

                    </div>
                ))}
            </div>

        </section>
    );
};

export default SeriesSection;
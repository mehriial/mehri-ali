import BooksGrid from "./BooksGrid.jsx";

const StandaloneSection = ({ books }) => {
    return (
        <section className="
            mt-24
            border-t
            border-white/10
            pt-20
        ">

            <div className="
                mb-10
                flex
                items-center
                gap-4
            ">
                <div>
                    <p className="
                        text-[10px]
                        uppercase
                        tracking-[0.3em]
                        text-header-accent
                    ">
                        Bağımsız
                    </p>

                    <h2 className="
                        mt-3
                        font-heading
                        text-3xl
                        font-normal
                    ">
                        Tek kitaplar
                    </h2>
                </div>

                <span className="
                    h-px
                    flex-1
                    bg-white/10
                " />
            </div>

            <BooksGrid books={books} />

        </section>
    );
};

export default StandaloneSection;
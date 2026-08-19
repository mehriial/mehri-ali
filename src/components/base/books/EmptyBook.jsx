import Button from "../../ui/Button.jsx";

const EmptyBooks = ({ onClear }) => {
    return (
        <div className="
            flex
            min-h-[300px]
            flex-col
            items-center
            justify-center
            text-center
        ">
            <p className="
                font-heading
                text-2xl
            ">
                Kitap bulunamadı.
            </p>

            <p className="
                mt-3
                text-sm
                text-shadow-white/40
            ">
                Arama veya filtre seçeneklerini
                değiştirmeyi deneyebilirsin.
            </p>

            <Button
                variant="outline"
                className="mt-6"
                onClick={onClear}
            >
                Filtreleri temizle
            </Button>
        </div>
    );
};

export default EmptyBooks;
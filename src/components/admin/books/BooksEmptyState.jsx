import { BookOpen } from "lucide-react";

function BooksEmptyState() {
    return (
        <tr>
            <td
                colSpan={7}
                className="px-5 py-16 text-center"
            >
                <div className="mx-auto flex max-w-sm flex-col items-center">
                    <div
                        className="
                            mb-3
                            flex
                            h-12
                            w-12
                            items-center
                            justify-center
                            rounded-xl
                            bg-white/[0.04]
                        "
                    >
                        <BookOpen className="h-5 w-5 text-white/30" />
                    </div>

                    <p className="text-sm font-medium text-white">
                        Kitap bulunamadı
                    </p>

                    <p className="mt-1 text-xs text-white/30">
                        Arama veya filtre kriterlerini
                        değiştirmeyi deneyin.
                    </p>
                </div>
            </td>
        </tr>
    );
}

export default BooksEmptyState;
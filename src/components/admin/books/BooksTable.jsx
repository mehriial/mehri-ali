import { BookOpen } from "lucide-react";
import BookTableRow from "@/components/admin/books/BooksTableRow.jsx";


function BooksTable({
                        books,
                        onView,
                        onEdit,
                        onDelete,
                    }) {
    if (!books.length) {
        return (
            <div className="rounded-2xl border border-white/[0.07] bg-[#0d0d0d] py-16 text-center">
                <BookOpen className="mx-auto h-8 w-8 text-white/20" />

                <p className="mt-4 text-sm font-medium text-white/60">
                    Kitap bulunamadı
                </p>

                <p className="mt-1 text-xs text-white/30">
                    Arama veya filtre kriterlerinizi değiştirin.
                </p>
            </div>
        );
    }

    return (
        <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0d0d0d]">
            <div className="overflow-x-auto">
                <table className="w-full min-w-[1000px]">
                    <thead>
                    <tr className="border-b border-white/[0.07]">
                        <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-white/30">
                            Kitap
                        </th>

                        <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-white/30">
                            Kategori
                        </th>

                        <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-white/30">
                            Seri
                        </th>

                        <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-white/30">
                            Bölüm
                        </th>

                        <th className="px-5 py-4 text-left text-xs font-medium uppercase tracking-wider text-white/30">
                            Durum
                        </th>

                        <th className="px-5 py-4 text-right text-xs font-medium uppercase tracking-wider text-white/30">
                            İşlemler
                        </th>
                    </tr>
                    </thead>

                    <tbody>
                    {books.map((book) => (
                        <BookTableRow
                            key={book.id}
                            book={book}
                            onView={onView}
                            onEdit={onEdit}
                            onDelete={onDelete}
                        />
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default BooksTable;
import {
    BookOpen,
    Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";

function BooksHeader({ onCreate }) {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-white/40" />

                    <h1 className="text-2xl font-semibold tracking-tight text-white">
                        Kitap Yönetimi
                    </h1>
                </div>

                <p className="mt-1 text-sm text-white/40">
                    Kitaplarını oluştur, düzenle ve yönet.
                </p>
            </div>

            <Button
                type="button"
                onClick={onCreate}
                className="
                    h-10
                    gap-2
                    rounded-xl
                    bg-white
                    px-4
                    text-black
                    hover:bg-white/90
                "
            >
                <Plus className="h-4 w-4" />
                Yeni Kitap
            </Button>
        </div>
    );
}

export default BooksHeader;
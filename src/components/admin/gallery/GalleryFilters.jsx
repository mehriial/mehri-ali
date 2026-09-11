import { Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

function GalleryFilters({
                            search,
                            selectedBook,
                            books,
                            onSearchChange,
                            onBookChange,
                            onClear,
                        }) {
    const hasFilters =
        search.trim() !== "" || selectedBook !== "all";

    return (
        <div className="rounded-2xl border border-white/[0.07] bg-[#0d0d0d] p-4">
            <div className="flex flex-col gap-3 lg:flex-row">
                <div className="relative flex-1">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />

                    <Input
                        value={search}
                        onChange={(event) =>
                            onSearchChange(event.target.value)
                        }
                        placeholder="Görsel veya kitap ara..."
                        className="h-10 border-white/[0.08] bg-black pl-9 text-white placeholder:text-white/25 focus-visible:ring-0"
                    />
                </div>

                <Select
                    value={selectedBook}
                    onValueChange={onBookChange}
                >
                    <SelectTrigger className="h-10 w-full border-white/[0.08] bg-black text-white focus:ring-0 lg:w-[240px]">
                        <SelectValue placeholder="Kitap seçin" />
                    </SelectTrigger>

                    <SelectContent className="border-white/[0.08] bg-[#111111] text-white">
                        <SelectItem
                            value="all"
                            className="focus:bg-white/[0.06] focus:text-white"
                        >
                            Tüm Kitaplar
                        </SelectItem>

                        {books.map((book) => (
                            <SelectItem
                                key={book.id}
                                value={String(book.id)}
                                className="focus:bg-white/[0.06] focus:text-white"
                            >
                                {book.title}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {hasFilters && (
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onClear}
                        className="h-10 gap-2 border-white/[0.08] bg-transparent text-white/60 hover:bg-white/[0.05] hover:text-white"
                    >
                        <X className="h-4 w-4" />
                        Temizle
                    </Button>
                )}
            </div>
        </div>
    );
}

export default GalleryFilters;
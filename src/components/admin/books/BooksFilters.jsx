import {
    Search,
    SlidersHorizontal,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

function BooksFilters({
                          search,
                          category,
                          status,
                          categories,
                          statuses,
                          onSearchChange,
                          onCategoryChange,
                          onStatusChange,
                          onClear,
                      }) {
    return (
        <div
            className="
                rounded-2xl
                border
                border-white/[0.07]
                bg-[#0d0d0d]
                p-4
            "
        >
            <div className="flex flex-col gap-3 lg:flex-row">
                {/* Search */}
                <div className="relative flex-1">
                    <Search
                        className="
                            pointer-events-none
                            absolute
                            left-3
                            top-1/2
                            h-4
                            w-4
                            -translate-y-1/2
                            text-white/30
                        "
                    />

                    <Input
                        value={search}
                        onChange={(event) =>
                            onSearchChange(event.target.value)
                        }
                        placeholder="Kitap, yazar veya slug ara..."
                        className="
                            h-10
                            rounded-xl
                            border-white/[0.08]
                            bg-white/[0.03]
                            pl-9
                            text-white
                            placeholder:text-white/25
                            focus-visible:ring-1
                            focus-visible:ring-white/20
                        "
                    />
                </div>

                {/* Category */}
                <Select
                    value={category}
                    onValueChange={onCategoryChange}
                >
                    <SelectTrigger
                        className="
                            h-10
                            w-full
                            rounded-xl
                            border-white/[0.08]
                            bg-white/[0.03]
                            text-white
                            lg:w-[190px]
                        "
                    >
                        <SelectValue placeholder="Kategori" />
                    </SelectTrigger>

                    <SelectContent
                        className="
                            border-white/[0.08]
                            bg-[#111111]
                            text-white
                        "
                    >
                        <SelectItem value="all">
                            Tüm Kategoriler
                        </SelectItem>

                        {categories.map((item) => (
                            <SelectItem
                                key={item}
                                value={item}
                            >
                                {item}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* Status */}
                <Select
                    value={status}
                    onValueChange={onStatusChange}
                >
                    <SelectTrigger
                        className="
                            h-10
                            w-full
                            rounded-xl
                            border-white/[0.08]
                            bg-white/[0.03]
                            text-white
                            lg:w-[180px]
                        "
                    >
                        <SelectValue placeholder="Durum" />
                    </SelectTrigger>

                    <SelectContent
                        className="
                            border-white/[0.08]
                            bg-[#111111]
                            text-white
                        "
                    >
                        <SelectItem value="all">
                            Tüm Durumlar
                        </SelectItem>

                        {statuses.map((item) => (
                            <SelectItem
                                key={item}
                                value={item}
                            >
                                {item}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Button
                    variant="outline"
                    onClick={onClear}
                    className="
                        h-10
                        gap-2
                        rounded-xl
                        border-white/[0.08]
                        bg-transparent
                        text-white/50
                        hover:bg-white/[0.05]
                        hover:text-white
                    "
                >
                    <SlidersHorizontal className="h-4 w-4" />

                    Temizle
                </Button>
            </div>
        </div>
    );
}

export default BooksFilters;
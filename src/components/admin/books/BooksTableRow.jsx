import {
    Eye,
    MoreHorizontal,
    Pencil,
    Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


import BookStatusBadge from "./BookStatusBadge.jsx";

function BookTableRow({
                          book,
                          onView,
                          onEdit,
                          onDelete,
                      }) {
    const chapterCount = Array.isArray(book.chapters)
        ? book.chapters.length
        : Number(book.chapters) || 0;

    return (
        <tr className="border-b border-white/[0.05] transition-colors last:border-b-0 hover:bg-white/[0.02]">
            {/* BOOK */}
            <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                    <div className="h-12 w-9 shrink-0 overflow-hidden rounded-md border border-white/[0.08] bg-white/[0.03]">
                        {book.image ? (
                            <img
                                src={book.image}
                                alt={book.title}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center">
                                <span className="text-[10px] text-white/20">
                                    Kapak
                                </span>
                            </div>
                        )}
                    </div>

                    <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-white">
                            {book.title}
                        </p>

                        <p className="mt-0.5 text-xs text-white/40">
                            {book.author}
                        </p>

                        <p className="mt-0.5 truncate text-[11px] text-white/20">
                            /{book.slug}
                        </p>
                    </div>
                </div>
            </td>

            {/* CATEGORY */}
            <td className="px-5 py-4">
                <span className="text-sm text-white/60">
                    {book.category || "—"}
                </span>
            </td>

            {/* SERIES */}
            <td className="px-5 py-4">
                {book.series ? (
                    <div>
                        <p className="text-sm text-white/60">
                            {book.series}
                        </p>

                        {book.order !== undefined &&
                            book.order !== null && (
                                <p className="mt-0.5 text-xs text-white/25">
                                    Sıra: {book.order}
                                </p>
                            )}
                    </div>
                ) : (
                    <span className="text-sm text-white/20">
                        Bağımsız
                    </span>
                )}
            </td>

            {/* CHAPTERS */}
            <td className="px-5 py-4">
                <span className="text-sm text-white/60">
                    {chapterCount}
                </span>
            </td>

            {/* STATUS */}
            <td className="px-5 py-4">
                <BookStatusBadge status={book.status} />
            </td>

            {/* ACTIONS */}
            <td className="px-5 py-4">
                <div className="flex justify-end">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-white/40 hover:bg-white/[0.06] hover:text-white"
                            >
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                            align="end"
                            className="w-44 border-white/[0.08] bg-[#111111] text-white"
                        >
                            {/* GÖRÜNTÜLE */}
                            <DropdownMenuItem
                                onClick={() => onView?.(book)}
                                className="cursor-pointer text-white/60 focus:bg-white/[0.06] focus:text-white"
                            >
                                <Eye className="mr-2 h-4 w-4" />
                                Görüntüle
                            </DropdownMenuItem>

                            {/* DÜZENLE */}
                            <DropdownMenuItem
                                onClick={() => onEdit?.(book)}
                                className="cursor-pointer text-white/60 focus:bg-white/[0.06] focus:text-white"
                            >
                                <Pencil className="mr-2 h-4 w-4" />
                                Düzenle
                            </DropdownMenuItem>

                            <DropdownMenuSeparator className="bg-white/[0.08]" />

                            {/* SİL */}
                            <DropdownMenuItem
                                onClick={() => onDelete?.(book)}
                                className="cursor-pointer text-red-400 focus:bg-red-500/10 focus:text-red-400"
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Sil
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </td>
        </tr>
    );
}

export default BookTableRow;
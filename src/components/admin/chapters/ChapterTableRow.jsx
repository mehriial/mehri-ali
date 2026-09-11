import {
    FileText,
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

function ChapterTableRow({
                             chapter,
                             onEdit,
                             onDelete,
                         }) {
    const contentCount = Array.isArray(chapter.content)
        ? chapter.content.length
        : 0;

    return (
        <tr className="border-b border-white/[0.05] transition-colors last:border-b-0 hover:bg-white/[0.02]">
            {/* BOOK */}
            <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                    <div className="h-11 w-8 shrink-0 overflow-hidden rounded-md border border-white/[0.08] bg-white/[0.03]">
                        {chapter.bookImage ? (
                            <img
                                src={chapter.bookImage}
                                alt={chapter.bookTitle}
                                className="h-full w-full object-cover"
                            />
                        ) : (
                            <div className="flex h-full items-center justify-center">
                                <FileText className="h-3 w-3 text-white/20" />
                            </div>
                        )}
                    </div>

                    <p className="max-w-[220px] truncate text-sm font-medium text-white/70">
                        {chapter.bookTitle}
                    </p>
                </div>
            </td>

            {/* NUMBER */}
            <td className="px-5 py-4">
                <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] px-2 text-sm font-medium text-white">
                    {chapter.number}
                </span>
            </td>

            {/* TITLE */}
            <td className="px-5 py-4">
                <div>
                    <p className="text-sm font-medium text-white/70">
                        {chapter.title}
                    </p>

                    <p className="mt-0.5 text-xs text-white/25">
                        Bölüm {chapter.number}
                    </p>
                </div>
            </td>

            {/* DATE */}
            <td className="px-5 py-4">
                <span className="text-sm text-white/50">
                    {chapter.publishedAt || "—"}
                </span>
            </td>

            {/* CONTENT */}
            <td className="px-5 py-4">
                <span className="text-sm text-white/50">
                    {contentCount} paragraf
                </span>
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
                            className="w-40 border-white/[0.08] bg-[#111111] text-white"
                        >
                            <DropdownMenuItem
                                onClick={() =>
                                    onEdit?.(chapter)
                                }
                                className="cursor-pointer text-white/60 focus:bg-white/[0.06] focus:text-white"
                            >
                                <Pencil className="mr-2 h-4 w-4" />
                                Düzenle
                            </DropdownMenuItem>

                            <DropdownMenuSeparator className="bg-white/[0.08]" />

                            <DropdownMenuItem
                                onClick={() =>
                                    onDelete?.(chapter)
                                }
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

export default ChapterTableRow;
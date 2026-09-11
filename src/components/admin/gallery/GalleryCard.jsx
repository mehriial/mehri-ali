import {
    Eye,
    MoreHorizontal,
    Pencil,
    Star,
    Trash2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function GalleryCard({
                         item,
                         onEdit,
                         onDelete,
                     }) {
    return (
        <div className="group overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0d0d0d] transition-colors hover:border-white/[0.12]">
            <div className="relative aspect-[4/3] overflow-hidden bg-black">
                {item.image ? (
                    <img
                        src={item.image}
                        alt={item.title || item.bookTitle}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center">
                        <span className="text-sm text-white/20">
                            Görsel yok
                        </span>
                    </div>
                )}

                <div className="absolute inset-x-0 top-0 flex items-center justify-between p-3">
                    <Badge className="border border-white/[0.08] bg-black/70 text-white/70 backdrop-blur-md hover:bg-black/70">
                        {item.bookTitle}
                    </Badge>

                    {item.featured && (
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-black/70 backdrop-blur-md">
                            <Star className="h-4 w-4 fill-white text-white" />
                        </div>
                    )}
                </div>

                <div className="absolute inset-x-0 bottom-0 flex justify-end bg-gradient-to-t from-black/80 to-transparent p-3 pt-10 opacity-0 transition-opacity group-hover:opacity-100">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                type="button"
                                size="icon"
                                variant="outline"
                                className="h-9 w-9 border-white/[0.1] bg-black/70 text-white hover:bg-white/[0.1] hover:text-white"
                            >
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                            align="end"
                            className="w-44 border-white/[0.08] bg-[#111111] text-white"
                        >
                            <DropdownMenuItem
                                className="cursor-pointer focus:bg-white/[0.06] focus:text-white"
                                onClick={() => onEdit(item)}
                            >
                                <Pencil className="mr-2 h-4 w-4" />
                                Düzenle
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                className="cursor-pointer focus:bg-white/[0.06] focus:text-white"
                                onClick={() => {
                                    window.open(
                                        item.image,
                                        "_blank",
                                        "noopener,noreferrer"
                                    );
                                }}
                            >
                                <Eye className="mr-2 h-4 w-4" />
                                Görüntüle
                            </DropdownMenuItem>

                            <DropdownMenuSeparator className="bg-white/[0.07]" />

                            <DropdownMenuItem
                                className="cursor-pointer text-red-400 focus:bg-red-500/10 focus:text-red-400"
                                onClick={() => onDelete(item)}
                            >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Sil
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className="space-y-2 p-4">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <h3 className="truncate text-sm font-medium text-white">
                            {item.title || "Başlıksız görsel"}
                        </h3>

                        <p className="mt-1 truncate text-xs text-white/35">
                            {item.bookTitle}
                        </p>
                    </div>

                    {item.featured && (
                        <span className="shrink-0 text-[10px] uppercase tracking-wider text-white/30">
                            Öne çıkan
                        </span>
                    )}
                </div>

                {item.description && (
                    <p className="line-clamp-2 text-xs leading-5 text-white/40">
                        {item.description}
                    </p>
                )}
            </div>
        </div>
    );
}

export default GalleryCard;
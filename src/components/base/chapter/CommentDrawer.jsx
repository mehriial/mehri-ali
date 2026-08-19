import { useState } from "react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
} from "@/components/ui/sheet";

const CommentDrawer = ({
                                 open,
                                 onOpenChange,
                                 paragraph,
                                 paragraphIndex,
                                 comments,
                                 onAddComment,
                             }) => {
    const [comment, setComment] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const value = comment.trim();

        if (!value) return;

        onAddComment(value);

        setComment("");
    };

    return (
        <Sheet
            open={open}
            onOpenChange={onOpenChange}
        >
            <SheetContent
                side="right"
                className="
                    w-full
                    border-white/10
                    bg-background
                    text-shadow-white
                    sm:max-w-[500px]
                "
            >

                {/* HEADER */}

                <SheetHeader className="border-b border-white/10 pb-6">

                    <SheetTitle className="
                        font-heading
                        text-2xl
                        font-normal
                        text-shadow-white
                    ">
                        Paragrafa yorum
                    </SheetTitle>

                    <SheetDescription className="
                        text-xs
                        leading-6
                        text-shadow-white/40
                    ">
                        Bölüm {paragraphIndex + 1} hakkında
                        düşüncelerini paylaş.
                    </SheetDescription>

                </SheetHeader>

                {/* CONTENT */}

                <div className="
                    flex
                    h-full
                    flex-col
                    overflow-hidden
                ">

                    {/* PARAGRAPH */}

                    <div className="
                        mt-6
                        border-l
                        border-header-accent/40
                        pl-4
                    ">

                        <p className="
                            line-clamp-5
                            font-serif
                            text-sm
                            leading-7
                            text-shadow-white/55
                        ">
                            {paragraph}
                        </p>

                    </div>

                    {/* COMMENTS */}

                    <div className="
                        mt-8
                        flex-1
                        overflow-y-auto
                        pr-2
                    ">

                        <div className="
                            mb-5
                            flex
                            items-center
                            justify-between
                        ">

                            <p className="
                                text-[10px]
                                uppercase
                                tracking-[0.25em]
                                text-header-accent
                            ">
                                Yorumlar
                            </p>

                            <span className="
                                text-[10px]
                                text-shadow-white/30
                            ">
                                {comments.length}
                            </span>

                        </div>

                        {comments.length > 0 ? (

                            <div className="space-y-5">

                                {comments.map((item) => (
                                    <div
                                        key={item.id}
                                        className="
                                            border-b
                                            border-white/10
                                            pb-5
                                        "
                                    >
                                        <p className="
                                            text-sm
                                            leading-7
                                            text-shadow-white/70
                                        ">
                                            {item.text}
                                        </p>
                                    </div>
                                ))}

                            </div>

                        ) : (

                            <div className="
                                py-12
                                text-center
                            ">

                                <p className="
                                    font-heading
                                    text-lg
                                    text-shadow-white/50
                                ">
                                    Henüz yorum yok
                                </p>

                                <p className="
                                    mt-2
                                    text-xs
                                    leading-6
                                    text-shadow-white/30
                                ">
                                    Bu paragraf hakkında
                                    ilk yorumu sen yap.
                                </p>

                            </div>

                        )}

                    </div>

                    {/* FORM */}

                    <form
                        onSubmit={handleSubmit}
                        className="
                            mt-6
                            border-t
                            border-white/10
                            pt-6
                        "
                    >

                        <textarea
                            value={comment}
                            onChange={(e) =>
                                setComment(e.target.value)
                            }
                            placeholder="Bu paragraf hakkında ne düşünüyorsun?"
                            rows={4}
                            className="
                                w-full
                                resize-none
                                border
                                border-white/10
                                bg-white/[0.02]
                                px-4
                                py-3
                                text-sm
                                leading-6
                                text-white
                                outline-none
                                placeholder:text-shadow-white/20
                                focus:border-header-accent
                            "
                        />

                        <button
                            type="submit"
                            disabled={!comment.trim()}
                            className="
                                mt-3
                                w-full
                                border
                                border-header-accent
                                px-5
                                py-3
                                text-[9px]
                                uppercase
                                tracking-[0.2em]
                                text-header-accent
                                transition-all
                                hover:bg-header-accent
                                hover:text-white
                                disabled:cursor-not-allowed
                                disabled:opacity-30
                            "
                        >
                            Yorum gönder
                        </button>

                    </form>

                </div>

            </SheetContent>
        </Sheet>
    );
};

export default CommentDrawer;
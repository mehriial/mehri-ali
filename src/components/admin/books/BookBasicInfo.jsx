import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function BookBasicInfo({ form }) {
    const {
        register,
        formState: {
            errors,
        },
    } = form;

    return (
        <section
            className="
                rounded-2xl
                border
                border-white/[0.07]
                bg-[#0d0d0d]
            "
        >
            <div className="border-b border-white/[0.07] px-5 py-4">
                <h2 className="text-sm font-medium text-white">
                    Temel Bilgiler
                </h2>

                <p className="mt-1 text-xs text-white/30">
                    Kitabın temel bilgilerini girin.
                </p>
            </div>

            <div className="grid gap-5 p-5">
                {/* Title */}
                <div className="space-y-2">
                    <label className="text-xs font-medium text-white/60">
                        Kitap Adı
                    </label>

                    <Input
                        {...register("title", {
                            required:
                                "Kitap adı zorunludur.",
                        })}
                        placeholder="Örn. Yazgı Paradoksu"
                        className="
                            h-10
                            rounded-xl
                            border-white/[0.08]
                            bg-white/[0.03]
                            text-white
                            placeholder:text-white/20
                        "
                    />

                    {errors.title && (
                        <p className="text-xs text-red-400">
                            {errors.title.message}
                        </p>
                    )}
                </div>

                {/* Slug */}
                <div className="space-y-2">
                    <label className="text-xs font-medium text-white/60">
                        Slug
                    </label>

                    <Input
                        {...register("slug", {
                            required:
                                "Slug zorunludur.",
                        })}
                        placeholder="yazgi-paradoksu"
                        className="
                            h-10
                            rounded-xl
                            border-white/[0.08]
                            bg-white/[0.03]
                            text-white
                            placeholder:text-white/20
                        "
                    />

                    <p className="text-[11px] text-white/25">
                        URL adresinde kullanılacak.
                    </p>
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <label className="text-xs font-medium text-white/60">
                        Açıklama
                    </label>

                    <Textarea
                        {...register("description")}
                        placeholder="Kitap hakkında kısa bir açıklama..."
                        className="
                            min-h-[130px]
                            resize-none
                            rounded-xl
                            border-white/[0.08]
                            bg-white/[0.03]
                            text-white
                            placeholder:text-white/20
                        "
                    />
                </div>

                {/* Author */}
                <div className="space-y-2">
                    <label className="text-xs font-medium text-white/60">
                        Yazar
                    </label>

                    <Input
                        {...register("author")}
                        className="
                            h-10
                            rounded-xl
                            border-white/[0.08]
                            bg-white/[0.03]
                            text-white
                        "
                    />
                </div>
            </div>
        </section>
    );
}

export default BookBasicInfo;
import { Minus, Plus, X } from "lucide-react";

const fonts = [
    {
        value: "Inter",
        label: "Inter",
    },
    {
        value: "Georgia",
        label: "Georgia",
    },
    {
        value: "Times New Roman",
        label: "Times New Roman",
    },
    {
        value: "Outfit",
        label: "Outfit",
    },
];

const backgrounds = [
    {
        value: "white",
        label: "Beyaz",
        className: "bg-white",
        textClassName: "text-black",
    },
    {
        value: "cream",
        label: "Krem",
        className: "bg-[#eee9df]",
        textClassName: "text-[#29251f]",
    },
    {
        value: "black",
        label: "Siyah",
        className: "bg-[#050505]",
        textClassName: "text-white",
    },
];

function ReaderSettings({
                            open,
                            settings,
                            onChange,
                            onClose,
                        }) {
    if (!open) {
        return null;
    }

    const update = (key, value) => {
        onChange((current) => ({
            ...current,
            [key]: value,
        }));
    };

    return (
        <>
            <div
                className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px]"
                onClick={onClose}
            />

            <aside
                className="
                    fixed
                    right-0
                    top-0
                    z-50
                    flex
                    h-full
                    w-full
                    max-w-sm
                    flex-col
                    border-l
                    border-white/[0.08]
                    bg-black
                    text-white
                    shadow-2xl
                "
            >
                {/* Header */}
                <div className="flex h-16 items-center justify-between border-b border-white/[0.08] px-5">
                    <div>
                        <span className="text-[9px] uppercase tracking-[0.3em] text-white/30">
                            Okuma
                        </span>

                        <h2 className="mt-1 font-serif text-xl text-white">
                            Ayarlar
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            flex
                            h-9
                            w-9
                            items-center
                            justify-center
                            rounded-full
                            text-white/40
                            transition-colors
                            hover:bg-white/5
                            hover:text-white
                        "
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-5">
                    {/* Font */}
                    <section>
                        <span className="text-[9px] font-medium uppercase tracking-[0.25em] text-white/35">
                            Yazı tipi
                        </span>

                        <div className="mt-4 space-y-2">
                            {fonts.map((font) => {
                                const active =
                                    settings.font === font.value;

                                return (
                                    <button
                                        key={font.value}
                                        type="button"
                                        onClick={() =>
                                            update(
                                                "font",
                                                font.value
                                            )
                                        }
                                        className="
                                            flex
                                            w-full
                                            items-center
                                            justify-between
                                            rounded-lg
                                            border
                                            px-4
                                            py-3
                                            text-left
                                            text-white
                                            transition-colors
                                            hover:bg-white/[0.03]
                                        "
                                        style={{
                                            borderColor: active
                                                ? "var(--book-accent)"
                                                : "rgba(255,255,255,.08)",
                                            backgroundColor:
                                                active
                                                    ? "color-mix(in srgb, var(--book-accent) 8%, transparent)"
                                                    : "transparent",
                                        }}
                                    >
                                        <span
                                            style={{
                                                fontFamily: font.value,
                                            }}
                                        >
                                            {font.label}
                                        </span>

                                        {active && (
                                            <span
                                                className="h-1.5 w-1.5 rounded-full"
                                                style={{
                                                    backgroundColor:
                                                        "var(--book-accent)",
                                                }}
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </section>

                    {/* Font Size */}
                    <section className="mt-10">
                        <div className="flex items-center justify-between">
                            <span className="text-[9px] font-medium uppercase tracking-[0.25em] text-white/35">
                                Yazı boyutu
                            </span>

                            <span className="text-xs text-white/40">
                                {settings.fontSize}px
                            </span>
                        </div>

                        <div className="mt-4 flex items-center justify-between rounded-lg border border-white/[0.08] p-2">
                            <button
                                type="button"
                                onClick={() =>
                                    update(
                                        "fontSize",
                                        Math.max(
                                            14,
                                            settings.fontSize - 1
                                        )
                                    )
                                }
                                className="
                                    flex
                                    h-10
                                    w-10
                                    items-center
                                    justify-center
                                    rounded-md
                                    text-white/50
                                    transition-colors
                                    hover:bg-white/5
                                    hover:text-white
                                "
                            >
                                <Minus className="h-4 w-4" />
                            </button>

                            <span className="font-serif text-lg text-white">
                                Aa
                            </span>

                            <button
                                type="button"
                                onClick={() =>
                                    update(
                                        "fontSize",
                                        Math.min(
                                            28,
                                            settings.fontSize + 1
                                        )
                                    )
                                }
                                className="
                                    flex
                                    h-10
                                    w-10
                                    items-center
                                    justify-center
                                    rounded-md
                                    text-white/50
                                    transition-colors
                                    hover:bg-white/5
                                    hover:text-white
                                "
                            >
                                <Plus className="h-4 w-4" />
                            </button>
                        </div>
                    </section>

                    {/* Background */}
                    <section className="mt-10">
                        <span className="text-[9px] font-medium uppercase tracking-[0.25em] text-white/35">
                            Arka plan
                        </span>

                        <div className="mt-4 grid grid-cols-3 gap-3">
                            {backgrounds.map((background) => {
                                const active =
                                    settings.background ===
                                    background.value;

                                return (
                                    <button
                                        key={background.value}
                                        type="button"
                                        onClick={() =>
                                            update(
                                                "background",
                                                background.value
                                            )
                                        }
                                        className={`
                                            ${background.className}
                                            ${background.textClassName}
                                            flex
                                            h-20
                                            items-end
                                            rounded-lg
                                            border
                                            p-3
                                            text-left
                                            text-xs
                                            transition-transform
                                            hover:scale-[1.02]
                                        `}
                                        style={{
                                            borderColor: active
                                                ? "var(--book-accent)"
                                                : "rgba(255,255,255,.08)",
                                        }}
                                    >
                                        {background.label}
                                    </button>
                                );
                            })}
                        </div>
                    </section>
                </div>
            </aside>
        </>
    );
}

export default ReaderSettings;
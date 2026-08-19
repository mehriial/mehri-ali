import { useState } from "react";
import {
    HiCog,
    HiX,
} from "react-icons/hi";

const FONT_SIZES = [
    {
        label: "Küçük",
        value: "text-[16px]",
    },
    {
        label: "Normal",
        value: "text-[18px]",
    },
    {
        label: "Büyük",
        value: "text-[20px]",
    },
    {
        label: "Çok büyük",
        value: "text-[22px]",
    },
];

const FONT_FAMILIES = [
    {
        label: "Serif",
        value: "font-serif",
    },
    {
        label: "Sans",
        value: "font-sans",
    },
    {
        label: "Mono",
        value: "font-mono",
    },
];

const ReaderSettings = ({
                            fontSize,
                            setFontSize,
                            fontFamily,
                            setFontFamily,
                        }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* SETTINGS BUTTON */}

            <button
                type="button"
                onClick={() => setIsOpen(true)}
                aria-label="Okuma ayarları"
                title="Okuma ayarları"
                className="
                    fixed
                    bottom-6
                    right-6
                    z-30
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    border
                    border-white/10
                    bg-background
                    text-white
                    shadow-xl
                    transition-all
                    duration-300
                    hover:border-header-accent
                    hover:text-header-accent
                "
            >
                <HiCog className="h-5 w-5" />
            </button>

            {/* OVERLAY */}

            {isOpen && (
                <div
                    className="
                        fixed
                        inset-0
                        z-40
                        bg-black/50
                        backdrop-blur-[2px]
                    "
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* DRAWER */}

            <aside
                className={`
                    fixed
                    bottom-0
                    left-0
                    right-0
                    z-50
                    border-t
                    border-white/10
                    bg-background
                    shadow-2xl
                    transition-transform
                    duration-300
                    ${
                    isOpen
                        ? "translate-y-0"
                        : "translate-y-full"
                }
                `}
            >
                <div
                    className="
                        mx-auto
                        max-w-[760px]
                        px-6
                        py-6
                        lg:px-10
                    "
                >

                    {/* HEADER */}

                    <div
                        className="
                            flex
                            items-center
                            justify-between
                        "
                    >
                        <div>
                            <p
                                className="
                                    text-[9px]
                                    uppercase
                                    tracking-[0.25em]
                                    text-header-accent
                                "
                            >
                                Okuma ayarları
                            </p>

                            <p
                                className="
                                    mt-1
                                    text-xs
                                    text-shadow-white/40
                                "
                            >
                                Metin görünümünü kendine göre
                                özelleştir.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="
                                flex
                                h-8
                                w-8
                                items-center
                                justify-center
                                text-shadow-white/40
                                transition-colors
                                hover:text-white
                            "
                            aria-label="Kapat"
                        >
                            <HiX className="h-5 w-5" />
                        </button>
                    </div>

                    {/* FONT SIZE */}

                    <div className="mt-7">

                        <p
                            className="
                                mb-3
                                text-[9px]
                                uppercase
                                tracking-[0.2em]
                                text-shadow-white/30
                            "
                        >
                            Yazı boyutu
                        </p>

                        <div
                            className="
                                grid
                                grid-cols-2
                                gap-2
                                sm:grid-cols-4
                            "
                        >
                            {FONT_SIZES.map((size) => {
                                const active =
                                    fontSize === size.value;

                                return (
                                    <button
                                        key={size.value}
                                        type="button"
                                        onClick={() =>
                                            setFontSize(size.value)
                                        }
                                        className={`
                                            border
                                            px-3
                                            py-3
                                            text-xs
                                            transition-all
                                            duration-300
                                            ${
                                            active
                                                ? "border-header-accent text-header-accent"
                                                : "border-white/10 text-shadow-white/50 hover:border-white/30 hover:text-white"
                                        }
                                        `}
                                    >
                                        {size.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* FONT FAMILY */}

                    <div className="mt-7">

                        <p
                            className="
                                mb-3
                                text-[9px]
                                uppercase
                                tracking-[0.2em]
                                text-shadow-white/30
                            "
                        >
                            Yazı tipi
                        </p>

                        <div
                            className="
                                grid
                                grid-cols-3
                                gap-2
                            "
                        >
                            {FONT_FAMILIES.map((font) => {
                                const active =
                                    fontFamily === font.value;

                                return (
                                    <button
                                        key={font.value}
                                        type="button"
                                        onClick={() =>
                                            setFontFamily(font.value)
                                        }
                                        className={`
                                            border
                                            px-3
                                            py-3
                                            text-sm
                                            transition-all
                                            duration-300
                                            ${font.value}
                                            ${
                                            active
                                                ? "border-header-accent text-header-accent"
                                                : "border-white/10 text-shadow-white/50 hover:border-white/30 hover:text-white"
                                        }
                                        `}
                                    >
                                        {font.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </aside>
        </>
    );
};

export default ReaderSettings;
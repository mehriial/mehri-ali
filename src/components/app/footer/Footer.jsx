import { useEffect, useState } from "react";

function Footer() {
    const [bookTheme, setBookTheme] = useState(null);

    useEffect(() => {
        const updateTheme = () => {
            try {
                const stored = localStorage.getItem("bookTheme");

                if (!stored) {
                    setBookTheme(null);
                    return;
                }

                const parsed = JSON.parse(stored);

                if (!parsed?.slug || !parsed?.mainColor) {
                    setBookTheme(null);
                    return;
                }

                setBookTheme(parsed);
            } catch {
                setBookTheme(null);
            }
        };

        updateTheme();

        window.addEventListener("bookThemeChanged", updateTheme);

        return () => {
            window.removeEventListener("bookThemeChanged", updateTheme);
        };
    }, []);

    return (
        <footer
            className="
                border-t border-white/[0.08]
                backdrop-blur-2xl
            "
            style={{
                backgroundColor: bookTheme
                    ? `${bookTheme.mainColor}99`
                    : "rgba(0, 0, 0, 0.6)",
            }}
        >
            <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-center px-5">
                <p className="text-[11px] tracking-wide text-white/30">
                    © 2026 Mehri Ali. Tüm hakları saklıdır.
                </p>
            </div>
        </footer>
    );
}

export default Footer;
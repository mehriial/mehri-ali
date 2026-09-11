import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import HeaderLogo from "./HeaderLogo.jsx";
import DesktopNavigation from "./DesktopNavigation.jsx";
import HeaderActions from "./HeaderActions.jsx";
import MobileMenu from "./MobileMenu.jsx";

function Header() {
    const location = useLocation();

    const [bookTheme, setBookTheme] = useState(null);
    const [authView, setAuthView] = useState(null);

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

        window.addEventListener(
            "bookThemeChanged",
            updateTheme
        );

        return () => {
            window.removeEventListener(
                "bookThemeChanged",
                updateTheme
            );
        };
    }, []);

    // Route dəyişəndə açıq auth modalını bağla
    useEffect(() => {
        setAuthView(null);
    }, [location.pathname]);

    return (
        <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
            <div className="mx-auto max-w-[1440px]">
                <div
                    className="
                        flex
                        h-[68px]
                        items-center
                        justify-between
                        rounded-2xl
                        border
                        border-white/[0.08]
                        px-3
                        shadow-2xl
                        shadow-black/20
                        backdrop-blur-2xl
                        sm:px-5
                    "
                    style={{
                        backgroundColor: bookTheme
                            ? `${bookTheme.mainColor}99`
                            : "rgba(0, 0, 0, 0.6)",
                    }}
                >
                    <HeaderLogo />

                    <DesktopNavigation />

                    <div className="flex items-center gap-1.5">
                        <HeaderActions
                            authView={authView}
                            setAuthView={setAuthView}
                        />

                        <MobileMenu
                            onLogin={() => setAuthView("login")}
                            onRegister={() => setAuthView("register")}
                        />
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;

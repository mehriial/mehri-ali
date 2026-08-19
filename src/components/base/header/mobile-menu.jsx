import {useEffect} from "react";
import {HiX} from "react-icons/hi";
import {Link, useLocation} from "react-router-dom";

const MobileMenuSheet = ({isOpen, onClose, navigation}) => {
    const location = useLocation();

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    const isActive = (href) => {
        if (href === "/") {
            return location.pathname === "/";
        }

        return location.pathname.startsWith(href);
    };

    return (
        <>
            {/* Overlay */}
            <div
                onClick={onClose}
                className={`
                    fixed inset-0 z-[60]
                   
                    backdrop-blur-[100px]
                    transition-opacity duration-300
                    md:hidden
                    ${
                    isOpen
                        ? "visible opacity-100"
                        : "invisible opacity-0"
                }
                `}
            />

            {/* Sheet */}
            <aside
                className={`
                    fixed left-0 top-0 z-[70]
                    flex h-dvh w-[85%] max-w-[380px]
                    flex-col
                    bg-background
                    shadow-2xl
                    transition-transform duration-500
                    ease-[cubic-bezier(0.22,1,0.36,1)]
                    md:hidden
                    rounded-r-2xl
                    border-r
                    border-gray-600
                 
                    ${
                    isOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                }
                `}
                aria-hidden={!isOpen}
            >
                {/* Header */}
                <div className="flex h-[80px] shrink-0 items-center justify-end border-b border-black/10 px-6">
                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            flex h-10 w-10
                            items-center justify-center
                            text-shadow-white
                            transition-colors
                            duration-300
                            hover:text-header-accent
                        "
                        aria-label="Menüyü kapat"
                    >
                        <HiX className="h-6 w-6"/>
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex flex-1 flex-col p-8">
                    {navigation.map((item, index) => {
                        const active = isActive(item.href);

                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                onClick={onClose}
                                className={`
                                    group flex items-center
                                    border-b border-black/10
                                    py-5
                                    transition-all duration-300
                                    ${
                                    active
                                        ? "text-header-accent"
                                        : "text-shadow-white hover:pl-2 hover:text-header-accent"
                                }
                                `}
                                style={{
                                    transitionDelay: isOpen
                                        ? `${index * 50}ms`
                                        : "0ms",
                                }}
                            >
                                <span
                                    className="
                                        font-heading
                                        text-2xl
                                    "
                                >
                                    {item.name}
                                </span>
                            </Link>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
};

export default MobileMenuSheet;
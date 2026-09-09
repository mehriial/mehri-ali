import { NavLink } from "react-router-dom";
import {navigation} from "@/constants/navigation.js";

function DesktopNavigation() {
    return (
        <nav className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) => (
                <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                        `
                        rounded-xl px-4 py-2.5 text-[13px]
                        transition-all duration-300
                        ${
                            isActive
                                ? "bg-white/[0.09] text-white"
                                : "text-white/50 hover:bg-white/[0.05] hover:text-white"
                        }
                        `
                    }
                >
                    {item.label}
                </NavLink>
            ))}
        </nav>
    );
}

export default DesktopNavigation;
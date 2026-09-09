import { Link } from "react-router-dom";

function HeaderLogo({ mobile = false }) {
    if (mobile) {
        return (
            <Link
                to="/"
                className="flex items-center gap-3"
            >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05]">
                    <span className="font-charm text-base text-white">
                        MA
                    </span>
                </div>
            </Link>
        );
    }

    return (
        <Link
            to="/"
            className="group flex items-center gap-3"
        >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] transition-all duration-300 group-hover:bg-white/[0.1]">
                <span className="font-charm text-lg">
                    MA
                </span>
            </div>
        </Link>
    );
}

export default HeaderLogo;
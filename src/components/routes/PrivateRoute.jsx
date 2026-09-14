import { useEffect, useState } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";
import { getSession } from "@/lib/session.js";

function useSession() {
    const [session, setCurrentSession] = useState(getSession);
    useEffect(() => {
        const update = () => setCurrentSession(getSession());
        window.addEventListener("sessionChanged", update);
        window.addEventListener("storage", update);
        return () => {
            window.removeEventListener("sessionChanged", update);
            window.removeEventListener("storage", update);
        };
    }, []);
    return session;
}

export function AdminRoute() {
    const session = useSession();
    return session?.role === "admin" ? <Outlet /> : <Navigate to="/" replace />;
}

export function OwnProfileRoute() {
    const session = useSession();
    const { username } = useParams();
    if (!session) return <Navigate to="/" replace />;
    if (session.username?.toLocaleLowerCase("tr") !== username?.toLocaleLowerCase("tr")) {
        return <Navigate to={`/profile/${encodeURIComponent(session.username)}`} replace />;
    }
    return <Outlet />;
}

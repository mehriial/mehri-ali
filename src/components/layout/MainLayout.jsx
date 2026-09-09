import { Outlet } from "react-router-dom";
import Header from "../base/header/header.jsx";


const MainLayout = () => {
    const year = new Date().getFullYear();

    return (
        <div className="flex min-h-screen flex-col bg-background">
            <Header />

            <main className="flex-1 pt-[80px]">
                <Outlet />
            </main>

            <footer className="border-t border-white/10 bg-black/10">
                <div className="mx-auto flex max-w-[1400px] flex-col gap-3 px-6 py-8 text-[10px] uppercase tracking-[0.18em] text-shadow-white/35 sm:flex-row sm:items-center sm:justify-between lg:px-10">
                    <span>Mehri Ali · Hikâyelerin dünyası</span>
                    <span>© {year}</span>
                </div>
            </footer>
        </div>
    );
};

export default MainLayout;

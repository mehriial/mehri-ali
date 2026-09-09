import { Outlet } from "react-router-dom";

import Header from "@/components/app/header/Header";
import Footer from "@/components/app/footer/Footer.jsx";

function MainLayout() {
    return (
        <div className="flex min-h-screen flex-col bg-black text-white">

            <Header />

            <main className="flex-1">
                <Outlet />
            </main>

            <Footer />

        </div>
    );
}

export default MainLayout;
import { Outlet } from "react-router-dom";
import Header from "../base/header/header.jsx";


const MainLayout = () => {
    return (
        <div className="min-h-screen">
            <Header />

            <main className="pt-[80px]">
                <Outlet />
            </main>

            {/* Footer daha sonra buraya eklenebilir */}
        </div>
    );
};

export default MainLayout;
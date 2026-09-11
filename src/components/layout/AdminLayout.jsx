import { Outlet } from "react-router-dom";
import AdminHeader from "@/components/admin/header/AdminHeader.jsx";
import AdminSidebar from "@/components/admin/sidebar/AdminSidebar.jsx";


function AdminLayout() {
    return (
        <div className="min-h-screen bg-black font-inter text-white">
            <AdminSidebar />

            <div className="lg:pl-[260px]">
                <AdminHeader />

                <main className="min-h-[calc(100vh-72px)] bg-black px-4 py-6 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-[1440px]">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;
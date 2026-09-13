import { Outlet } from "react-router-dom";
import AdminSidebar from "@/components/app/admin/admin-sidebar/AdminSidebar.jsx";
import AdminHeader from "@/components/app/admin/admin-header/AdminHeader.jsx";


function AdminLayout() {
    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <AdminSidebar />

            <div className="min-h-screen lg:pl-64">
                <AdminHeader />

                <main className="px-5 pb-10 pt-24 sm:px-8 lg:px-10">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;


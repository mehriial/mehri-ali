
import DashboardStats from "./DashboardStats.jsx";
import DashboardPending from "./DashboardPending.jsx";

function Dashboard() {
    return (
        <div className="mx-auto max-w-[1440px]">

            <div className="mb-8">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/25">
                    Genel Bakış
                </p>

                <h1 className="mt-2 text-2xl font-medium tracking-tight text-white sm:text-3xl">
                    Dashboard
                </h1>

                <p className="mt-2 max-w-xl text-sm leading-6 text-white/35">
                    İçeriklerinizi, kullanıcıları ve bekleyen işlemleri
                    buradan yönetebilirsiniz.
                </p>
            </div>

            <DashboardStats />

            <div className="mt-10">
                <DashboardPending />
            </div>

        </div>
    );
}

export default Dashboard;

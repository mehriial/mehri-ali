import {
    CalendarDays,
    Mail,
    Shield,
    User,
} from "lucide-react";

function UserDetails({ user }) {
    if (!user) {
        return null;
    }

    const getStatus = () => {
        if (user.isBlocked) {
            return {
                label: "Engellendi",
                className:
                    "border-red-500/20 bg-red-500/10 text-red-400",
            };
        }

        if (user.status === "active") {
            return {
                label: "Aktif",
                className:
                    "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
            };
        }

        return {
            label: "Pasif",
            className:
                "border-white/10 bg-white/[0.04] text-white/40",
        };
    };

    const status = getStatus();

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-lg font-medium text-white">
                    {user.username?.charAt(0)?.toUpperCase()}
                </div>

                <div className="min-w-0">
                    <h3 className="truncate text-lg font-medium text-white">
                        {user.username}
                    </h3>

                    <p className="truncate text-sm text-white/35">
                        {user.email}
                    </p>
                </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
                    <div className="flex items-center gap-2 text-xs text-white/30">
                        <User className="h-3.5 w-3.5" />
                        Kullanıcı adı
                    </div>

                    <p className="mt-2 text-sm text-white/75">
                        {user.username}
                    </p>
                </div>

                <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
                    <div className="flex items-center gap-2 text-xs text-white/30">
                        <Mail className="h-3.5 w-3.5" />
                        E-posta
                    </div>

                    <p className="mt-2 break-all text-sm text-white/75">
                        {user.email}
                    </p>
                </div>

                <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
                    <div className="flex items-center gap-2 text-xs text-white/30">
                        <Shield className="h-3.5 w-3.5" />
                        Rol
                    </div>

                    <p className="mt-2 text-sm capitalize text-white/75">
                        {user.role === "admin"
                            ? "Admin"
                            : user.role === "moderator"
                                ? "Moderatör"
                                : "Kullanıcı"}
                    </p>
                </div>

                <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
                    <div className="flex items-center gap-2 text-xs text-white/30">
                        Durum
                    </div>

                    <span
                        className={`mt-2 inline-flex rounded-full border px-2.5 py-1 text-xs ${status.className}`}
                    >
                        {status.label}
                    </span>
                </div>

                <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
                    <div className="flex items-center gap-2 text-xs text-white/30">
                        <CalendarDays className="h-3.5 w-3.5" />
                        Kayıt tarihi
                    </div>

                    <p className="mt-2 text-sm text-white/75">
                        {user.createdAt || "-"}
                    </p>
                </div>

                <div className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4">
                    <div className="flex items-center gap-2 text-xs text-white/30">
                        <CalendarDays className="h-3.5 w-3.5" />
                        Son giriş
                    </div>

                    <p className="mt-2 text-sm text-white/75">
                        {user.lastLogin || "-"}
                    </p>
                </div>
            </div>

            {user.isBlocked && (
                <div className="rounded-xl border border-red-500/15 bg-red-500/[0.05] p-4">
                    <p className="text-sm font-medium text-red-400">
                        Bu kullanıcı engellendi.
                    </p>

                    <p className="mt-1 text-xs leading-5 text-red-400/60">
                        Kullanıcı hesabı aktif olsa bile site içerisindeki
                        işlemleri gerçekleştiremez.
                    </p>
                </div>
            )}
        </div>
    );
}

export default UserDetails;
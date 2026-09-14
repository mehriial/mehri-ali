import { useState } from "react";
import {
    Eye,
    EyeOff,
    Loader2,
} from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog.jsx";

import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Label } from "@/components/ui/label.jsx";

function LoginDialog({
                         open,
                         onOpenChange,
                         onRegister,
                         onForgotPassword,
                         onLogin,
                     }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");

        if (!username.trim()) {
            setError("Kullanıcı adını gir.");
            return;
        }

        if (!password) {
            setError("Şifreni gir.");
            return;
        }

        try {
            setLoading(true);

            await onLogin({
                username: username.trim(),
                password,
            });

            setUsername("");
            setPassword("");
        } catch (error) {
            setError(
                error?.message ||
                "Kullanıcı adı veya şifre hatalı."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = () => {
        setError("");
        onOpenChange(false);
        onRegister?.();
    };

    const handleForgotPassword = () => {
        setError("");
        onOpenChange(false);
        onForgotPassword?.();
    };

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent
                className="
                    max-w-sm
                    gap-0
                    overflow-hidden
                    rounded-2xl
                    border-white/[0.08]
                    bg-[#0a0a0a]
                    p-0
                    text-white
                    shadow-2xl
                "
            >
                <DialogHeader className="border-b border-white/[0.06] px-6 py-5">
                    <DialogTitle className="text-sm font-medium text-white">
                        Giriş yap
                    </DialogTitle>

                    <DialogDescription className="text-[10px] leading-5 text-white/30">
                        Hesabına giriş yaparak kütüphanene
                        ve profilinə erişebilirsin.
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit}
                    className="px-6 py-6"
                >
                    <div className="space-y-5">

                        {/* Kullanıcı adı */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="login-username"
                                className="
                                    text-[9px]
                                    font-normal
                                    uppercase
                                    tracking-[0.2em]
                                    text-white/30
                                "
                            >
                                Kullanıcı adı
                            </Label>

                            <Input
                                id="login-username"
                                type="text"
                                value={username}
                                onChange={(event) =>
                                    setUsername(event.target.value)
                                }
                                placeholder="Kullanıcı adın"
                                autoComplete="username"
                                className="
                                    h-10
                                    rounded-lg
                                    border-white/[0.08]
                                    bg-white/[0.025]
                                    text-xs
                                    text-white
                                    shadow-none
                                    placeholder:text-white/20
                                    focus-visible:border-white/[0.18]
                                    focus-visible:ring-0
                                "
                            />
                        </div>

                        {/* Şifre */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label
                                    htmlFor="login-password"
                                    className="
                                        text-[9px]
                                        font-normal
                                        uppercase
                                        tracking-[0.2em]
                                        text-white/30
                                    "
                                >
                                    Şifre
                                </Label>

                                <button
                                    type="button"
                                    onClick={handleForgotPassword}
                                    className="
                                        text-[9px]
                                        text-white/30
                                        transition-colors
                                        hover:text-white
                                    "
                                >
                                    Şifremi unuttum
                                </button>
                            </div>

                            <div className="relative">
                                <Input
                                    id="login-password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    value={password}
                                    onChange={(event) =>
                                        setPassword(
                                            event.target.value
                                        )
                                    }
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                    className="
                                        h-10
                                        rounded-lg
                                        border-white/[0.08]
                                        bg-white/[0.025]
                                        pr-10
                                        text-xs
                                        text-white
                                        shadow-none
                                        placeholder:text-white/20
                                        focus-visible:border-white/[0.18]
                                        focus-visible:ring-0
                                    "
                                />

                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(
                                            (value) => !value
                                        )
                                    }
                                    className="
                                        absolute
                                        right-0
                                        top-0
                                        flex
                                        h-10
                                        w-10
                                        items-center
                                        justify-center
                                        text-white/25
                                        transition-colors
                                        hover:text-white/60
                                    "
                                    aria-label={
                                        showPassword
                                            ? "Şifreyi gizle"
                                            : "Şifreyi göster"
                                    }
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-3.5 w-3.5" />
                                    ) : (
                                        <Eye className="h-3.5 w-3.5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Error */}
                        {error && (
                            <div
                                className="
                                    rounded-lg
                                    border
                                    border-red-500/10
                                    bg-red-500/[0.05]
                                    px-3
                                    py-2.5
                                    text-[10px]
                                    leading-5
                                    text-red-400/80
                                "
                            >
                                {error}
                            </div>
                        )}

                        {/* Submit */}
                        <Button
                            type="submit"
                            disabled={loading}
                            className="
                                h-10
                                w-full
                                rounded-lg
                                bg-white
                                text-xs
                                font-medium
                                text-black
                                shadow-none
                                hover:bg-white/90
                                disabled:opacity-50
                            "
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                    Giriş yapılıyor...
                                </>
                            ) : (
                                "Giriş yap"
                            )}
                        </Button>
                    </div>

                    {/* Register */}
                    <div className="mt-6 border-t border-white/[0.06] pt-5 text-center">
                        <span className="text-[10px] text-white/25">
                            Hesabın yok mu?
                        </span>

                        <button
                            type="button"
                            onClick={handleRegister}
                            className="
                                ml-1.5
                                text-[10px]
                                text-white/60
                                transition-colors
                                hover:text-white
                            "
                        >
                            Kayıt ol
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default LoginDialog;

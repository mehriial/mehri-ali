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

function RegisterDialog({
                            open,
                            onOpenChange,
                            onLogin,
                            onRegister,
                        }) {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] =
        useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] =
        useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const resetForm = () => {
        setName("");
        setUsername("");
        setEmail("");
        setPassword("");
        setPasswordConfirmation("");
        setError("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");

        if (!name.trim()) {
            setError("Adını gir.");
            return;
        }

        if (!username.trim()) {
            setError("Kullanıcı adını gir.");
            return;
        }

        if (!email.trim()) {
            setError("E-posta adresini gir.");
            return;
        }

        if (!password) {
            setError("Şifreni gir.");
            return;
        }

        if (password.length < 6) {
            setError("Şifren en az 6 karakter olmalı.");
            return;
        }

        if (password !== passwordConfirmation) {
            setError("Şifreler eşleşmiyor.");
            return;
        }

        try {
            setLoading(true);

            await onRegister?.({
                name: name.trim(),
                username: username.trim(),
                email: email.trim(),
                password,
            });

            resetForm();
            onOpenChange(false);
        } catch (error) {
            setError(
                error?.message ||
                "Kayıt sırasında bir hata oluştu."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = () => {
        resetForm();
        onOpenChange(false);
        onLogin?.();
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(value) => {
                if (!value) {
                    resetForm();
                }

                onOpenChange(value);
            }}
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
                        Kayıt ol
                    </DialogTitle>

                    <DialogDescription className="text-[10px] leading-5 text-white/30">
                        Hesabını oluştur ve hikâyelerini
                        keşfetmeye başla.
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit}
                    className="max-h-[70vh] overflow-y-auto px-6 py-6"
                >
                    <div className="space-y-5">

                        {/* Ad */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="register-name"
                                className="
                                    text-[9px]
                                    font-normal
                                    uppercase
                                    tracking-[0.2em]
                                    text-white/30
                                "
                            >
                                Ad
                            </Label>

                            <Input
                                id="register-name"
                                value={name}
                                onChange={(event) =>
                                    setName(event.target.value)
                                }
                                placeholder="Adın"
                                autoComplete="name"
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

                        {/* Kullanıcı adı */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="register-username"
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
                                id="register-username"
                                value={username}
                                onChange={(event) =>
                                    setUsername(
                                        event.target.value
                                    )
                                }
                                placeholder="kullaniciadi"
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

                        {/* E-posta */}
                        <div className="space-y-2">
                            <Label
                                htmlFor="register-email"
                                className="
                                    text-[9px]
                                    font-normal
                                    uppercase
                                    tracking-[0.2em]
                                    text-white/30
                                "
                            >
                                E-posta
                            </Label>

                            <Input
                                id="register-email"
                                type="email"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                placeholder="ornek@mail.com"
                                autoComplete="email"
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
                            <Label
                                htmlFor="register-password"
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

                            <div className="relative">
                                <Input
                                    id="register-password"
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
                                    autoComplete="new-password"
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
                                        hover:text-white/60"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-3.5 w-3.5" />
                                    ) : (
                                        <Eye className="h-3.5 w-3.5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label
                                htmlFor="register-password-confirmation"
                                className="
                                    text-[9px]
                                font-normal
                                uppercase
                                tracking-[0.2em]
                                text-white/30">
                                Şifre tekrar
                            </Label>

                            <div className="relative">
                                <Input
                                    id="register-password-confirmation"
                                    type={
                                        showPasswordConfirmation
                                            ? "text"
                                            : "password"
                                    }
                                    value={passwordConfirmation}
                                    onChange={(event) =>
                                        setPasswordConfirmation(
                                            event.target.value
                                        )
                                    }
                                    placeholder="••••••••"
                                    autoComplete="new-password"
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
                                        setShowPasswordConfirmation(
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
                                >
                                    {showPasswordConfirmation ? (
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
                                    Kayıt oluşturuluyor...
                                </>
                            ) : (
                                "Kayıt ol"
                            )}
                        </Button>
                    </div>

                    {/* Login */}
                    <div className="mt-6 border-t border-white/[0.06] pt-5 text-center">
                        <span className="text-[10px] text-white/25">
                            Zaten hesabın var mı?
                        </span>

                        <button
                            type="button"
                            onClick={handleLogin}
                            className="
                                ml-1.5
                                text-[10px]
                                text-white/60
                                transition-colors
                                hover:text-white
                            "
                        >
                            Giriş yap
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default RegisterDialog;
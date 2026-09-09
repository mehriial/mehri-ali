import { useState } from "react";
import {
    Check,
    Eye,
    EyeOff,
    Loader2,
    LockKeyhole,
} from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

function ResetPasswordDialog({
                                 open,
                                 onOpenChange,
                                 onLogin,
                                 onSubmit,
                             }) {
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] =
        useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] =
        useState(false);

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const resetForm = () => {
        setPassword("");
        setPasswordConfirmation("");
        setShowPassword(false);
        setShowPasswordConfirmation(false);
        setLoading(false);
        setSuccess(false);
        setError("");
    };

    const handleOpenChange = (value) => {
        if (!value) {
            resetForm();
        }

        onOpenChange(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");

        if (!password) {
            setError("Yeni şifreni gir.");
            return;
        }

        if (password.length < 6) {
            setError("Şifren en az 6 karakter olmalı.");
            return;
        }

        if (!passwordConfirmation) {
            setError("Yeni şifreni tekrar gir.");
            return;
        }

        if (password !== passwordConfirmation) {
            setError("Şifreler eşleşmiyor.");
            return;
        }

        try {
            setLoading(true);

            await onSubmit?.({
                password,
                passwordConfirmation,
            });

            setSuccess(true);
        } catch (error) {
            setError(
                error?.message ||
                "Şifre yenilenirken bir hata oluştu."
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
            onOpenChange={handleOpenChange}
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
                        Şifreni yenile
                    </DialogTitle>

                    <DialogDescription className="text-[10px] leading-5 text-white/30">
                        Hesabın için yeni bir şifre
                        belirle.
                    </DialogDescription>
                </DialogHeader>

                {success ? (
                    <div className="px-6 py-8">
                        <div className="flex flex-col items-center text-center">

                            <div
                                className="
                                    flex
                                    h-12
                                    w-12
                                    items-center
                                    justify-center
                                    rounded-full
                                    border
                                    border-white/[0.08]
                                    bg-white/[0.04]
                                "
                            >
                                <Check className="h-5 w-5 text-white/70" />
                            </div>

                            <h3 className="mt-5 text-sm font-medium text-white">
                                Şifren yenilendi
                            </h3>

                            <p className="mt-2 max-w-[280px] text-[10px] leading-5 text-white/30">
                                Yeni şifren başarıyla
                                oluşturuldu. Artık yeni
                                şifrenle giriş yapabilirsin.
                            </p>

                            <Button
                                type="button"
                                onClick={handleLogin}
                                className="
                                    mt-6
                                    h-9
                                    rounded-lg
                                    bg-white
                                    px-5
                                    text-[10px]
                                    font-medium
                                    text-black
                                    shadow-none
                                    hover:bg-white/90
                                "
                            >
                                Giriş yap
                            </Button>
                        </div>
                    </div>
                ) : (
                    <form
                        onSubmit={handleSubmit}
                        className="px-6 py-6"
                    >
                        <div className="space-y-5">

                            {/* Icon */}
                            <div className="flex justify-center">
                                <div
                                    className="
                                        flex
                                        h-11
                                        w-11
                                        items-center
                                        justify-center
                                        rounded-xl
                                        border
                                        border-white/[0.08]
                                        bg-white/[0.025]
                                    "
                                >
                                    <LockKeyhole className="h-4 w-4 text-white/40" />
                                </div>
                            </div>

                            {/* Yeni şifre */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="reset-password"
                                    className="
                                        text-[9px]
                                        font-normal
                                        uppercase
                                        tracking-[0.2em]
                                        text-white/30
                                    "
                                >
                                    Yeni şifre
                                </Label>

                                <div className="relative">
                                    <Input
                                        id="reset-password"
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

                                <p className="text-[9px] text-white/20">
                                    En az 6 karakter kullan.
                                </p>
                            </div>

                            {/* Şifre tekrar */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="reset-password-confirmation"
                                    className="
                                        text-[9px]
                                        font-normal
                                        uppercase
                                        tracking-[0.2em]
                                        text-white/30
                                    "
                                >
                                    Şifre tekrar
                                </Label>

                                <div className="relative">
                                    <Input
                                        id="reset-password-confirmation"
                                        type={
                                            showPasswordConfirmation
                                                ? "text"
                                                : "password"
                                        }
                                        value={
                                            passwordConfirmation
                                        }
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
                                                (value) =>
                                                    !value
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
                                            showPasswordConfirmation
                                                ? "Şifreyi gizle"
                                                : "Şifreyi göster"
                                        }
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
                                        Şifre yenileniyor...
                                    </>
                                ) : (
                                    "Şifreyi yenile"
                                )}
                            </Button>
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}

export default ResetPasswordDialog;
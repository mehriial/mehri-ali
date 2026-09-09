import { useState } from "react";
import {
    ArrowLeft,
    Check,
    Loader2,
    Mail,
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

function ForgotPasswordDialog({
                                  open,
                                  onOpenChange,
                                  onLogin,
                                  onSubmit,
                              }) {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const resetForm = () => {
        setEmail("");
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

        if (!email.trim()) {
            setError("E-posta adresini gir.");
            return;
        }

        try {
            setLoading(true);

            await onSubmit?.({
                email: email.trim(),
            });

            setSuccess(true);
        } catch (error) {
            setError(
                error?.message ||
                "İşlem sırasında bir hata oluştu."
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
                        Şifremi unuttum
                    </DialogTitle>

                    <DialogDescription className="text-[10px] leading-5 text-white/30">
                        Hesabına ait e-posta adresini gir.
                        Sana şifreni yenilemen için bir
                        bağlantı göndereceğiz.
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
                                E-postanı kontrol et
                            </h3>

                            <p className="mt-2 max-w-[280px] text-[10px] leading-5 text-white/30">
                                Şifre yenileme bağlantısını
                                <span className="text-white/50">
                                    {" "}{email}
                                </span>
                                {" "}adresine gönderdik.
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

                            {/* Mail icon */}
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
                                    <Mail className="h-4 w-4 text-white/40" />
                                </div>
                            </div>

                            {/* E-posta */}
                            <div className="space-y-2">
                                <Label
                                    htmlFor="forgot-password-email"
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
                                    id="forgot-password-email"
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
                                        Gönderiliyor...
                                    </>
                                ) : (
                                    "Şifre yenileme bağlantısı gönder"
                                )}
                            </Button>
                        </div>

                        {/* Back to login */}
                        <div className="mt-6 border-t border-white/[0.06] pt-5">
                            <button
                                type="button"
                                onClick={handleLogin}
                                className="
                                    mx-auto
                                    flex
                                    items-center
                                    gap-1.5
                                    text-[10px]
                                    text-white/30
                                    transition-colors
                                    hover:text-white
                                "
                            >
                                <ArrowLeft className="h-3 w-3" />
                                Giriş yap
                            </button>
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}

export default ForgotPasswordDialog;
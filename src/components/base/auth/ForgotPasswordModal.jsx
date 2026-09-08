import { useEffect, useState } from "react";
import { HiArrowLeft, HiCheckCircle, HiX } from "react-icons/hi";
import Input from "../../ui/input.jsx";
import Button from "../../ui/Button.jsx";
import { useAuth } from "../../../context/AuthContext.jsx";

const ForgotPasswordModal = ({ isOpen, onClose, onLogin }) => {
    const { resetPassword } = useAuth();
    const [step, setStep] = useState("email");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmation, setConfirmation] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const closeOnEscape = (event) => event.key === "Escape" && onClose();
        if (isOpen) document.addEventListener("keydown", closeOnEscape);
        return () => document.removeEventListener("keydown", closeOnEscape);
    }, [isOpen, onClose]);

    if (!isOpen) return null;
    const close = () => {
        setStep("email"); setEmail(""); setPassword(""); setConfirmation(""); setError("");
        onClose();
    };
    const submit = (event) => {
        event.preventDefault(); setError("");
        if (step === "email") { if (!email.trim()) return setError("E-posta adresinizi girin."); setStep("password"); return; }
        if (password.length < 6) return setError("Şifre en az 6 karakter olmalıdır.");
        if (password !== confirmation) return setError("Şifreler eşleşmiyor.");
        const result = resetPassword({ email, password });
        if (!result.ok) return setError(result.message);
        setStep("success");
    };

    return <div className="fixed inset-0 z-[120] flex items-center justify-center px-6" role="dialog" aria-modal="true" aria-labelledby="reset-title">
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={close} />
        <div className="relative z-10 w-full max-w-[430px] border border-white/10 bg-background shadow-2xl">
            <div className="flex items-start justify-between border-b border-white/10 px-6 py-6">
                <div><p className="text-[9px] uppercase tracking-[0.3em] text-header-accent">Hesap desteği</p><h2 id="reset-title" className="mt-2 font-heading text-3xl">Şifre yenile</h2></div>
                <button type="button" onClick={close} aria-label="Kapat" className="flex h-8 w-8 items-center justify-center text-shadow-white/40 hover:text-white"><HiX className="h-5 w-5" /></button>
            </div>
            {step === "success" ? <div className="p-6 text-center"><HiCheckCircle className="mx-auto h-10 w-10 text-header-accent" /><p className="mt-4 text-sm text-shadow-white/70">Şifreniz güncellendi.</p><Button type="button" onClick={onLogin} className="mt-6 w-full">Girişe dön</Button></div> :
                <form onSubmit={submit} className="space-y-5 p-6">
                    <p className="text-sm leading-6 text-shadow-white/45">{step === "email" ? "Kayıtlı e-posta adresinizi yazın. Bir sonraki adımda yeni şifrenizi belirleyebilirsiniz." : `${email} hesabı için yeni şifrenizi oluşturun.`}</p>
                    {step === "email" ? <Input label="E-posta" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ornek@mail.com" autoFocus /> : <><Input label="Yeni şifre" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="En az 6 karakter" autoFocus /><Input label="Yeni şifre tekrar" type="password" value={confirmation} onChange={(e) => setConfirmation(e.target.value)} placeholder="Şifrenizi tekrar girin" /></>}
                    {error && <p className="text-xs text-red-400">{error}</p>}
                    <Button type="submit" className="w-full">{step === "email" ? "Devam et" : "Şifreyi güncelle"}</Button>
                    {step === "password" && <button type="button" onClick={() => { setStep("email"); setError(""); }} className="mx-auto flex items-center gap-1 text-xs text-shadow-white/45 hover:text-header-accent"><HiArrowLeft /> E-postayı değiştir</button>}
                </form>}
        </div>
    </div>;
};

export default ForgotPasswordModal;

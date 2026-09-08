import { useEffect, useState } from "react";
import { HiX } from "react-icons/hi";
import Input from "../../ui/input.jsx";
import Button from "../../ui/Button.jsx";
import { useAuth } from "../../../context/AuthContext.jsx";

const LoginModal = ({ isOpen, onClose, onRegister, onForgotPassword }) => {
    const { login } = useAuth();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };
    }, [isOpen, onClose]);

    useEffect(() => {
        document.body.style.overflow = isOpen
            ? "hidden"
            : "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.email.trim() || !form.password.trim()) {
            setError("Lütfen e-posta ve şifre alanlarını doldurun.");
            return;
        }

        const result = login(form);
        if (!result.ok) {
            setError(result.message);
            return;
        }
        onClose();
    };

    return (
        <div className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            px-6
        ">

            {/* OVERLAY */}

            <div
                className="
                    absolute
                    inset-0
                    bg-black/70
                    backdrop-blur-sm
                "
                onClick={onClose}
            />

            {/* MODAL */}

            <div className="
                relative
                z-10
                w-full
                max-w-[430px]
                border
                border-white/10
                bg-background
                shadow-2xl
            ">

                {/* HEADER */}

                <div className="
                    flex
                    items-start
                    justify-between
                    border-b
                    border-white/10
                    px-6
                    py-6
                ">

                    <div>

                        <p className="
                            text-[9px]
                            uppercase
                            tracking-[0.3em]
                            text-header-accent
                        ">
                            Hesabınıza giriş yapın
                        </p>

                        <h2 className="
                            mt-2
                            font-heading
                            text-3xl
                        ">
                            Giriş yap
                        </h2>

                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            text-shadow-white/40
                            transition-colors
                            hover:text-white
                        "
                    >
                        <HiX className="h-5 w-5" />
                    </button>

                </div>

                {/* FORM */}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5 p-6"
                >

                    <Input
                        label="E-posta"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="ornek@mail.com"
                    />

                    <Input
                        label="Şifre"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Şifrenizi girin"
                    />

                    {error && (
                        <p className="
                            text-xs
                            text-red-400
                        ">
                            {error}
                        </p>
                    )}

                    <Button
                        type="submit"
                        className="w-full"
                    >
                        Giriş yap
                    </Button>

                    <div className="flex justify-center">
                        <button type="button" onClick={onForgotPassword} className="text-xs text-shadow-white/45 transition-colors hover:text-header-accent">
                            Şifremi unuttum
                        </button>
                    </div>

                </form>

                {/* FOOTER */}

                <div className="
                    border-t
                    border-white/10
                    px-6
                    py-5
                    text-center
                ">

                    <p className="
                        text-xs
                        text-shadow-white/40
                    ">
                        Henüz hesabınız yok mu?
                    </p>

                    <button
                        type="button"
                        onClick={onRegister}
                        className="
                            mt-2
                            text-xs
                            text-header-accent
                            transition-colors
                            hover:text-white
                        "
                    >
                        Hesap oluştur
                    </button>

                </div>

            </div>

        </div>
    );
};

export default LoginModal;

import { useEffect, useState } from "react";
import { HiX } from "react-icons/hi";
import Input from "../../ui/input.jsx";
import Button from "../../ui/Button.jsx";
import { useAuth } from "../../../context/AuthContext.jsx";

const RegisterModal = ({
                           isOpen,
                           onClose,
                           onLogin,
                       }) => {
    const { register } = useAuth();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
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

        if (
            !form.name.trim() ||
            !form.email.trim() ||
            !form.password.trim() ||
            !form.passwordConfirmation.trim()
        ) {
            setError(
                "Lütfen tüm alanları doldurun."
            );
            return;
        }

        if (form.password.length < 6) {
            setError(
                "Şifre en az 6 karakter olmalıdır."
            );
            return;
        }

        if (
            form.password !==
            form.passwordConfirmation
        ) {
            setError(
                "Şifreler eşleşmiyor."
            );
            return;
        }

        const result = register(form);
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
                            Okur hesabı
                        </p>

                        <h2 className="
                            mt-2
                            font-heading
                            text-3xl
                        ">
                            Kayıt ol
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
                    className="
                        space-y-5
                        p-6
                    "
                >

                    <Input
                        label="Ad"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Adınız"
                    />

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
                        placeholder="En az 6 karakter"
                    />

                    <Input
                        label="Şifre tekrar"
                        name="passwordConfirmation"
                        type="password"
                        value={form.passwordConfirmation}
                        onChange={handleChange}
                        placeholder="Şifrenizi tekrar girin"
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
                        Kayıt ol
                    </Button>

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
                        Zaten hesabınız var mı?
                    </p>

                    <button
                        type="button"
                        onClick={onLogin}
                        className="
                            mt-2
                            text-xs
                            text-header-accent
                            transition-colors
                            hover:text-white
                        "
                    >
                        Giriş yap
                    </button>

                </div>

            </div>

        </div>
    );
};

export default RegisterModal;

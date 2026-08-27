import { useEffect, useState } from "react";
import {
    HiX,
    HiMail,
    HiLockClosed,
    HiUser,
} from "react-icons/hi";

const AuthModal = ({
                       type,
                       onClose,
                       onChangeType,
                   }) => {
    const isLogin = type === "login";

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isLogin) {
            console.log("Login:", {
                email: form.email,
                password: form.password,
            });

            return;
        }

        console.log("Register:", form);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener(
            "keydown",
            handleKeyDown
        );

        return () => {
            document.removeEventListener(
                "keydown",
                handleKeyDown
            );
        };
    }, [onClose]);

    return (
        <>
            {/* OVERLAY */}

            <div
                className="
                    fixed
                    inset-0
                    z-[100]
                    bg-black/60
                    backdrop-blur-sm
                "
                onClick={onClose}
            />

            {/* MODAL */}

            <div className="
                fixed
                inset-0
                z-[110]
                flex
                items-center
                justify-center
                px-6
                py-10
            ">

                <div
                    className="
                        relative
                        w-full
                        max-w-[440px]
                        border
                        border-white/10
                        bg-background
                        shadow-2xl
                    "
                    onClick={(e) =>
                        e.stopPropagation()
                    }
                >

                    {/* CLOSE */}

                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            absolute
                            right-5
                            top-5
                            flex
                            h-8
                            w-8
                            items-center
                            justify-center
                            text-shadow-white/40
                            transition-colors
                            hover:text-white
                        "
                        aria-label="Kapat"
                    >
                        <HiX className="h-5 w-5" />
                    </button>

                    {/* HEADER */}

                    <div className="
                        border-b
                        border-white/10
                        px-7
                        py-7
                    ">

                        <p className="
                            text-[9px]
                            uppercase
                            tracking-[0.3em]
                            text-header-accent
                        ">
                            {isLogin
                                ? "Hoş geldin"
                                : "Aramıza katıl"
                            }
                        </p>

                        <h2 className="
                            mt-3
                            font-heading
                            text-3xl
                        ">
                            {isLogin
                                ? "Giriş yap"
                                : "Hesap oluştur"
                            }
                        </h2>

                        <p className="
                            mt-3
                            pr-8
                            text-sm
                            leading-6
                            text-shadow-white/40
                        ">
                            {isLogin
                                ? "Hesabına giriş yap ve okumaya devam et."
                                : "Bir hesap oluştur ve okur topluluğuna katıl."
                            }
                        </p>

                    </div>

                    {/* FORM */}

                    <form
                        onSubmit={handleSubmit}
                        className="px-7 py-7"
                    >

                        {/* NAME */}

                        {!isLogin && (
                            <div className="mb-5">

                                <label className="
                                    mb-2
                                    block
                                    text-[9px]
                                    uppercase
                                    tracking-[0.2em]
                                    text-shadow-white/50
                                ">
                                    Kullanıcı adı
                                </label>

                                <div className="relative">

                                    <HiUser className="
                                        absolute
                                        left-4
                                        top-1/2
                                        h-4
                                        w-4
                                        -translate-y-1/2
                                        text-shadow-white/30
                                    " />

                                    <input
                                        type="text"
                                        name="name"
                                        value={form.name}
                                        onChange={handleChange}
                                        placeholder="Kullanıcı adınız"
                                        required
                                        className="
                                            w-full
                                            border
                                            border-white/10
                                            bg-white/[0.02]
                                            py-3.5
                                            pl-11
                                            pr-4
                                            text-sm
                                            text-white
                                            outline-none
                                            transition-colors
                                            placeholder:text-shadow-white/20
                                            focus:border-header-accent
                                        "
                                    />

                                </div>

                            </div>
                        )}

                        {/* EMAIL */}

                        <div className="mb-5">

                            <label className="
                                mb-2
                                block
                                text-[9px]
                                uppercase
                                tracking-[0.2em]
                                text-shadow-white/50
                            ">
                                E-posta
                            </label>

                            <div className="relative">

                                <HiMail className="
                                    absolute
                                    left-4
                                    top-1/2
                                    h-4
                                    w-4
                                    -translate-y-1/2
                                    text-shadow-white/30
                                " />

                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="ornek@mail.com"
                                    required
                                    className="
                                        w-full
                                        border
                                        border-white/10
                                        bg-white/[0.02]
                                        py-3.5
                                        pl-11
                                        pr-4
                                        text-sm
                                        text-white
                                        outline-none
                                        transition-colors
                                        placeholder:text-shadow-white/20
                                        focus:border-header-accent
                                    "
                                />

                            </div>

                        </div>

                        {/* PASSWORD */}

                        <div className="mb-5">

                            <label className="
                                mb-2
                                block
                                text-[9px]
                                uppercase
                                tracking-[0.2em]
                                text-shadow-white/50
                            ">
                                Şifre
                            </label>

                            <div className="relative">

                                <HiLockClosed className="
                                    absolute
                                    left-4
                                    top-1/2
                                    h-4
                                    w-4
                                    -translate-y-1/2
                                    text-shadow-white/30
                                " />

                                <input
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    required
                                    className="
                                        w-full
                                        border
                                        border-white/10
                                        bg-white/[0.02]
                                        py-3.5
                                        pl-11
                                        pr-4
                                        text-sm
                                        text-white
                                        outline-none
                                        transition-colors
                                        placeholder:text-shadow-white/20
                                        focus:border-header-accent
                                    "
                                />

                            </div>

                        </div>

                        {/* PASSWORD CONFIRMATION */}

                        {!isLogin && (
                            <div className="mb-6">

                                <label className="
                                    mb-2
                                    block
                                    text-[9px]
                                    uppercase
                                    tracking-[0.2em]
                                    text-shadow-white/50
                                ">
                                    Şifre tekrar
                                </label>

                                <div className="relative">

                                    <HiLockClosed className="
                                        absolute
                                        left-4
                                        top-1/2
                                        h-4
                                        w-4
                                        -translate-y-1/2
                                        text-shadow-white/30
                                    " />

                                    <input
                                        type="password"
                                        name="passwordConfirmation"
                                        value={
                                            form.passwordConfirmation
                                        }
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        required
                                        className="
                                            w-full
                                            border
                                            border-white/10
                                            bg-white/[0.02]
                                            py-3.5
                                            pl-11
                                            pr-4
                                            text-sm
                                            text-white
                                            outline-none
                                            transition-colors
                                            placeholder:text-shadow-white/20
                                            focus:border-header-accent
                                        "
                                    />

                                </div>

                            </div>
                        )}

                        {/* LOGIN EXTRA */}

                        {isLogin && (
                            <div className="
                                mb-6
                                flex
                                justify-end
                            ">
                                <button
                                    type="button"
                                    className="
                                        text-[9px]
                                        uppercase
                                        tracking-[0.15em]
                                        text-shadow-white/40
                                        transition-colors
                                        hover:text-header-accent
                                    "
                                >
                                    Şifremi unuttum
                                </button>
                            </div>
                        )}

                        {/* SUBMIT */}

                        <button
                            type="submit"
                            className="
                                w-full
                                border
                                border-header-accent
                                px-5
                                py-3.5
                                text-[9px]
                                uppercase
                                tracking-[0.2em]
                                text-header-accent
                                transition-all
                                duration-300
                                hover:bg-header-accent
                                hover:text-white
                            "
                        >
                            {isLogin
                                ? "Giriş yap"
                                : "Hesap oluştur"
                            }
                        </button>

                        {/* SWITCH */}

                        <div className="
                            mt-6
                            border-t
                            border-white/10
                            pt-6
                            text-center
                        ">

                            <p className="
                                text-xs
                                text-shadow-white/30
                            ">
                                {isLogin
                                    ? "Henüz hesabın yok mu?"
                                    : "Zaten hesabın var mı?"
                                }

                                <button
                                    type="button"
                                    onClick={() =>
                                        onChangeType(
                                            isLogin
                                                ? "register"
                                                : "login"
                                        )
                                    }
                                    className="
                                        ml-2
                                        text-header-accent
                                        transition-colors
                                        hover:text-white
                                    "
                                >
                                    {isLogin
                                        ? "Kayıt ol"
                                        : "Giriş yap"
                                    }
                                </button>

                            </p>

                        </div>

                    </form>

                </div>

            </div>
        </>
    );
};

export default AuthModal;
import { HiOutlineSearch } from "react-icons/hi";

import LoginDialog from "@/components/app/auth/LoginDialog";
import RegisterDialog from "@/components/app/auth/RegisterDialog";
import ForgotPasswordDialog from "@/components/app/auth/ForgotPasswordDialog";
import ResetPasswordDialog from "@/components/app/auth/ResetPasswordDialog";
import ProfileMenu from "./ProfileMenu.jsx";
import { setSession } from "@/lib/session.js";

function HeaderActions({
                           authView,
                           setAuthView,
                           user,
                       }) {
    const openLogin = () => {
        setAuthView("login");
    };

    const openRegister = () => {
        setAuthView("register");
    };

    const openForgotPassword = () => {
        setAuthView("forgot-password");
    };

    const handleLogin = async ({
                                   username,
                                   password,
                               }) => {
        void password;
        // The current project has no authentication API. Never infer admin
        // privileges from a username entered into this demo form.
        setSession({ username, name: username, role: "user" });
        setAuthView(null);
    };

    const handleRegister = async ({
                                      name,
                                      username,
                                      email,
                                      password,
                                  }) => {
        void password;
        setSession({ name, username, email, role: "user" });
        setAuthView(null);
    };

    const handleForgotPassword = async ({
                                            email,
                                        }) => {
        void email;

        setAuthView("reset-password");
    };

    const handleResetPassword = async ({
                                           password,
                                           passwordConfirmation,
                                       }) => {
        void password;
        void passwordConfirmation;

        setAuthView("login");
    };

    return (
        <>
            <div className="flex items-center gap-1.5">

                {/* Search */}
                <button
                    type="button"
                    className="
                        flex
                        h-10
                        w-10
                        cursor-pointer
                        items-center
                        justify-center
                        rounded-xl
                        text-white/50
                        transition-all
                        duration-300
                        hover:bg-white/[0.07]
                        hover:text-white
                    "
                    aria-label="Ara"
                >
                    <HiOutlineSearch className="text-[20px]" />
                </button>

                {/* Desktop Login */}
                {!user && <button
                    type="button"
                    onClick={openLogin}
                    className="
                        hidden
                        cursor-pointer
                        rounded-xl
                        px-4
                        py-2.5
                        text-[13px]
                        text-white/55
                        transition-colors
                        hover:text-white
                        sm:block
                    "
                >
                    Giriş Yap
                </button>}

                {/* Desktop Register */}
                {!user && <button
                    type="button"
                    onClick={openRegister}
                    className="
                        hidden
                        cursor-pointer
                        rounded-xl
                        bg-white
                        px-4
                        py-2.5
                        text-[13px]
                        font-medium
                        text-black
                        transition-all
                        duration-300
                        hover:bg-white/90
                        sm:block
                    "
                >
                    Kayıt Ol
                </button>}
                {user && <ProfileMenu user={user} />}
            </div>

            <LoginDialog
                open={authView === "login"}
                onOpenChange={(open) => {
                    if (!open) {
                        setAuthView(null);
                    }
                }}
                onRegister={openRegister}
                onForgotPassword={openForgotPassword}
                onLogin={handleLogin}
            />

            <RegisterDialog
                open={authView === "register"}
                onOpenChange={(open) => {
                    if (!open) {
                        setAuthView(null);
                    }
                }}
                onLogin={openLogin}
                onRegister={handleRegister}
            />

            <ForgotPasswordDialog
                open={authView === "forgot-password"}
                onOpenChange={(open) => {
                    if (!open) {
                        setAuthView(null);
                    }
                }}
                onLogin={openLogin}
                onSubmit={handleForgotPassword}
            />

            <ResetPasswordDialog
                open={authView === "reset-password"}
                onOpenChange={(open) => {
                    if (!open) {
                        setAuthView(null);
                    }
                }}
                onLogin={openLogin}
                onSubmit={handleResetPassword}
            />
        </>
    );
}

export default HeaderActions;

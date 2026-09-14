import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select.jsx";
import { Button } from "@/components/ui/button.jsx";

const EMPTY_FORM = {
    username: "",
    email: "",
    role: "user",
    status: "active",
};

function UserForm({
                      user,
                      onSubmit,
                      onCancel,
                  }) {
    const [form, setForm] = useState(EMPTY_FORM);
    useEffect(() => {
        if (user) {
            setForm({
                username: user.username ?? "",
                email: user.email ?? "",
                role: user.role ?? "user",
                status: user.status ?? "active",
            });
        } else {
            setForm(EMPTY_FORM);
        }
    }, [user]);

    const handleChange = (field, value) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        onSubmit(form);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5"
        >
            <div className="space-y-2">
                <Label
                    htmlFor="username"
                    className="text-white/70"
                >
                    Kullanıcı adı
                </Label>

                <Input
                    id="username"
                    value={form.username}
                    onChange={(event) =>
                        handleChange(
                            "username",
                            event.target.value
                        )
                    }
                    placeholder="Kullanıcı adı"
                    required
                    className="h-11 border-white/[0.08] bg-white/[0.03] text-white placeholder:text-white/25"
                />
            </div>

            <div className="space-y-2">
                <Label
                    htmlFor="email"
                    className="text-white/70"
                >
                    E-posta
                </Label>

                <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(event) =>
                        handleChange(
                            "email",
                            event.target.value
                        )
                    }
                    placeholder="ornek@email.com"
                    required
                    className="h-11 border-white/[0.08] bg-white/[0.03] text-white placeholder:text-white/25"
                />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                    <Label className="text-white/70">
                        Rol
                    </Label>

                    <Select
                        value={form.role}
                        onValueChange={(value) =>
                            handleChange("role", value)
                        }
                    >
                        <SelectTrigger className="h-11 w-full border-white/[0.08] bg-white/[0.03] text-white">
                            <SelectValue placeholder="Rol seçin" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="user">
                                Kullanıcı
                            </SelectItem>

                            <SelectItem value="moderator">
                                Moderatör
                            </SelectItem>

                            <SelectItem value="admin">
                                Admin
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label className="text-white/70">
                        Durum
                    </Label>

                    <Select
                        value={form.status}
                        onValueChange={(value) =>
                            handleChange("status", value)
                        }
                    >
                        <SelectTrigger className="h-11 w-full border-white/[0.08] bg-white/[0.03] text-white">
                            <SelectValue placeholder="Durum seçin" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="active">
                                Aktif
                            </SelectItem>

                            <SelectItem value="inactive">
                                Pasif
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
                <Button
                    type="button"
                    variant="ghost"
                    onClick={onCancel}
                    className="cursor-pointer text-white/50 hover:bg-white/[0.05] hover:text-white"
                >
                    Vazgeç
                </Button>

                <Button
                    type="submit"
                    className="cursor-pointer bg-white px-5 text-black hover:bg-white/90"
                >
                    {user ? "Değişiklikleri kaydet" : "Kullanıcı oluştur"}
                </Button>
            </div>
        </form>
    );
}

export default UserForm;
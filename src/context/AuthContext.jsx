/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
const USERS_KEY = "mehri-ali-users";
const SESSION_KEY = "mehri-ali-session";

const seedUsers = [
    {
        id: "admin-1",
        name: "Yönetici",
        email: "admin@mehriali.com",
        password: "Admin123!",
        role: "admin",
    },
];

const read = (key, fallback) => {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : fallback;
    } catch {
        return fallback;
    }
};

export const AuthProvider = ({ children }) => {
    const [users, setUsers] = useState(() => read(USERS_KEY, seedUsers));
    const [user, setUser] = useState(() => read(SESSION_KEY, null));

    useEffect(() => {
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }, [users]);

    const persistSession = (nextUser) => {
        const safeUser = nextUser ? {
            id: nextUser.id,
            name: nextUser.name,
            email: nextUser.email,
            role: nextUser.role,
            avatar: nextUser.avatar,
            bio: nextUser.bio,
        } : null;
        setUser(safeUser);
        if (safeUser) localStorage.setItem(SESSION_KEY, JSON.stringify(safeUser));
        else localStorage.removeItem(SESSION_KEY);
    };

    const login = ({ email, password }) => {
        const found = users.find((item) => item.email.toLowerCase() === email.trim().toLowerCase());
        if (!found || found.password !== password) {
            return { ok: false, message: "E-posta veya şifre hatalı." };
        }
        persistSession(found);
        return { ok: true, user: found };
    };

    const register = ({ name, email, password }) => {
        const normalizedEmail = email.trim().toLowerCase();
        if (users.some((item) => item.email.toLowerCase() === normalizedEmail)) {
            return { ok: false, message: "Bu e-posta ile daha önce kayıt olunmuş." };
        }
        const nextUser = { id: crypto.randomUUID(), name: name.trim(), email: normalizedEmail, password, role: "reader" };
        setUsers((current) => [...current, nextUser]);
        persistSession(nextUser);
        return { ok: true, user: nextUser };
    };

    const resetPassword = ({ email, password }) => {
        const normalizedEmail = email.trim().toLowerCase();
        const found = users.find((item) => item.email.toLowerCase() === normalizedEmail);
        if (!found) return { ok: false, message: "Bu e-posta ile kayıtlı bir hesap bulunamadı." };
        setUsers((current) => current.map((item) => item.email.toLowerCase() === normalizedEmail ? { ...item, password } : item));
        return { ok: true };
    };

    const removeUser = (id) => {
        if (id === user?.id) {
            return { ok: false, message: "Kendi hesabınızı silemezsiniz." };
        }

        setUsers((current) => current.filter((item) => item.id !== id));
        return { ok: true };
    };

    const libraryBookIds = user
        ? users.find((item) => item.id === user.id)?.libraryBookIds ?? []
        : [];

    const toggleLibraryBook = (bookId) => {
        if (!user) return { ok: false, message: "Bu işlem için giriş yapmalısınız." };

        setUsers((current) => current.map((item) => {
            if (item.id !== user.id) return item;

            const savedBooks = item.libraryBookIds ?? [];
            return {
                ...item,
                libraryBookIds: savedBooks.includes(bookId)
                    ? savedBooks.filter((id) => id !== bookId)
                    : [...savedBooks, bookId],
            };
        }));

        return { ok: true };
    };

    const updateProfile = ({ name, email, avatar, bio }) => {
        if (!user) return { ok: false, message: "Bu işlem için giriş yapmalısınız." };

        const normalizedName = name.trim();
        const normalizedEmail = email.trim().toLowerCase();
        if (!normalizedName || !normalizedEmail) {
            return { ok: false, message: "Ad ve e-posta alanları zorunludur." };
        }
        if (users.some((item) => item.id !== user.id && item.email.toLowerCase() === normalizedEmail)) {
            return { ok: false, message: "Bu e-posta başka bir hesapta kullanılıyor." };
        }

        const updatedUser = { ...user, name: normalizedName, email: normalizedEmail, avatar, bio: bio.trim() };
        setUsers((current) => current.map((item) => item.id === user.id ? { ...item, ...updatedUser } : item));
        persistSession(updatedUser);
        return { ok: true };
    };

    const value = { users, user, libraryBookIds, login, register, resetPassword, removeUser, toggleLibraryBook, updateProfile, logout: () => persistSession(null) };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth, AuthProvider içinde kullanılmalıdır.");
    return context;
};

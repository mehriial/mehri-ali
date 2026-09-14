const KEY = "mehri-session";

export function getSession() {
    try {
        return JSON.parse(localStorage.getItem(KEY)) || null;
    } catch {
        return null;
    }
}

export function setSession(user) {
    if (user) localStorage.setItem(KEY, JSON.stringify(user));
    else localStorage.removeItem(KEY);
    window.dispatchEvent(new Event("sessionChanged"));
}

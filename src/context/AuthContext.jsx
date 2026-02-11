import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("currentUser"));
        if (saved) setUser(saved);
    }, []);

    function login(userData) {
        setUser(userData);
        localStorage.setItem("currentUser", JSON.stringify(userData));
    }

    function logout() {
        setUser(null);
        localStorage.removeItem("currentUser");
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
import { createContext, useContext, useEffect, useState } from "react";
import { decodeToken, saveToken, getToken, removeToken } from "../helpers/authHelper";

interface AuthContextType {
    token: string | null;
    user: { id: string; email: string; role: string } | null;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(getToken());
    const [user, setUser] = useState<{ id: string; email: string; role: string } | null>(null);

    useEffect(() => {
        if (token) {
            saveToken(token);
            setUser(decodeToken(token));
        } else {
            removeToken();
            setUser(null);
        }
    }, [token]);

    const login = (jwtToken: string) => setToken(jwtToken);
    const logout = () => {
        removeToken();
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within an AuthProvider");
    return context;
};
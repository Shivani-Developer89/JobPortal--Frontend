import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [token, setToken] = useState(null);
    const [role, setRole] = useState(null);
    const [name, setName] = useState(null);

    // Restore login after page refresh
    useEffect(() => {

        const storedToken = localStorage.getItem("token");
        const storedRole = localStorage.getItem("role");
        const storedName = localStorage.getItem("name");

        if (storedToken) {
            setToken(storedToken);
            setRole(storedRole);
            setName(storedName);
        }

    }, []);

    // Login
    const login = ({ token, role, name }) => {

        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("name", name);

        setToken(token);
        setRole(role);
        setName(name);
    };

    // Logout
    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("name");

        setToken(null);
        setRole(null);
        setName(null);
    };

    const value = {
        token,
        role,
        name,
        login,
        logout,
        isAuthenticated: !!token
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [token, setToken] = useState(null);
    const [role, setRole] = useState(null);
    const [name, setName] = useState(null);


    // -----------------------------------
    // Check JWT expiration
    // -----------------------------------
    const isTokenExpired = (jwtToken) => {

        try {

            const decoded = jwtDecode(jwtToken);

            if (!decoded.exp) {
                return true;
            }

            return decoded.exp * 1000 <= Date.now();

        } catch (error) {

            console.error("Invalid JWT:", error);

            return true;
        }
    };


    // -----------------------------------
    // Logout
    // -----------------------------------
    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("name");

        setToken(null);
        setRole(null);
        setName(null);
    };


    // -----------------------------------
    // Login
    // -----------------------------------
    const login = ({ token, role, name }) => {

        localStorage.setItem("token", token);
        localStorage.setItem("role", role);
        localStorage.setItem("name", name);

        setToken(token);
        setRole(role);
        setName(name);
    };


    // -----------------------------------
    // Restore login after page refresh
    // -----------------------------------
    useEffect(() => {

        const storedToken =
            localStorage.getItem("token");

        const storedRole =
            localStorage.getItem("role");

        const storedName =
            localStorage.getItem("name");


        if (!storedToken) {
            return;
        }


        // Check if stored JWT is expired
        if (isTokenExpired(storedToken)) {

            console.log(
                "Stored JWT expired. Logging out."
            );

            logout();

            return;
        }


        // JWT is still valid
        setToken(storedToken);
        setRole(storedRole);
        setName(storedName);

    }, []);


    // -----------------------------------
    // Automatically logout when JWT expires
    // -----------------------------------
    useEffect(() => {

        if (!token) {
            return;
        }


        try {

            const decodedToken =
                jwtDecode(token);


            if (!decodedToken.exp) {

                console.error(
                    "JWT does not contain expiration."
                );

                return;
            }


            const expirationTime =
                decodedToken.exp * 1000;


            const remainingTime =
                expirationTime - Date.now();


            // Token already expired
            if (remainingTime <= 0) {

                console.log(
                    "JWT already expired."
                );

                logout();

                window.location.replace("/login");

                return;
            }


            console.log(
                `JWT expires in ${Math.round(
                    remainingTime / 1000
                )} seconds`
            );


            // Schedule logout
            const timer = setTimeout(() => {

                console.log(
                    "JWT expired. Logging out automatically."
                );

                logout();

                window.location.replace("/login");

            }, remainingTime);


            // Clear timer if token changes
            // or component unmounts
            return () => {

                clearTimeout(timer);

            };

        } catch (error) {

            console.error(
                "Failed to decode JWT:",
                error
            );

            logout();

            window.location.replace("/login");
        }

    }, [token]);


    // -----------------------------------
    // Listen for 401 from Axios
    // -----------------------------------
    useEffect(() => {

        const handleAuthExpired = () => {

            console.log(
                "Authentication expired."
            );

            setToken(null);
            setRole(null);
            setName(null);

        };


        window.addEventListener(
            "auth-expired",
            handleAuthExpired
        );


        return () => {

            window.removeEventListener(
                "auth-expired",
                handleAuthExpired
            );

        };

    }, []);


    // -----------------------------------
    // Context value
    // -----------------------------------
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


// -----------------------------------
// useAuth hook
// -----------------------------------
export function useAuth() {

    return useContext(AuthContext);

}
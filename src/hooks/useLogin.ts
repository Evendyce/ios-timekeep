import { useState } from "react";
import { loginUser } from "../services/userService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { formatError } from "../helpers/systemHelper";

export const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (email: string, password: string) => {
        setLoading(true);
        setError("");

        try {
            const token = await loginUser(email, password);
            login(token); // Store token in AuthContext
            navigate("/home"); // Redirect to dashboard after login
        } catch (err) {
            setError(formatError(err));
        } finally {
            setLoading(false);
        }
    };

    return { handleLogin, loading, error };
};

import { formatError } from "../helpers/systemHelper";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:7272";

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/authentication/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (!data.success) throw new Error(data.message);

        return data.data.token;
    } catch (error) {
        throw new Error(formatError(error));
    }
};

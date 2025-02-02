export const decodeToken = (jwtToken: string) => {
    try {
        const payload = JSON.parse(atob(jwtToken.split(".")[1])); // Decode JWT
        return {
            id: payload.nameid,
            email: payload.email,
            role: payload.role,
        };
    } catch (error) {
        console.error("Failed to decode token:", error);
        return null;
    }
};

export const saveToken = (token: string) => {
    localStorage.setItem("token", token);
};

export const getToken = (): string | null => {
    return localStorage.getItem("token");
};

export const removeToken = () => {
    localStorage.removeItem("token");
};

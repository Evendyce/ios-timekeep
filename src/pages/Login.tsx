import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { handleLogin, loading, error } = useLogin();

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <input className="border p-2 mb-2 w-full" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="border p-2 mb-2 w-full" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="bg-blue-500 text-white px-4 py-2" onClick={() => handleLogin(email, password)} disabled={loading}>
                {loading ? "Logging in..." : "Login"}
            </button>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default Login;

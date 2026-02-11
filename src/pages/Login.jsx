import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem("users")) || [];
        const existingUser = users.find(u => u.email === email && u.password === password);

        if (!existingUser) {
            setError("Invalid email or password");
            return;
        }

        login(existingUser); // store in context + localStorage 
        navigate("/dashboard");
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-500">{error}</p>}

            <input
                type="email"
                placeholder="Email"
                className="w-full p-2 border rounded"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                className="w-full p-2 border rounded"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />

            <button
                type="submit"
                className="w-full bg-indigo-600 text-white p-2 rounded"
            >
                Login
            </button>
            <p className="text-center text-sm text-gray-600">
                Don’t have an account?
                <a href="/register" className="text-indigo-600 font-medium hover:underline ml-1">
                    Create one
                </a>
            </p>
        </form>
    );
}
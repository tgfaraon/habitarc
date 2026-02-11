import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        const users = JSON.parse(localStorage.getItem("users")) || [];

        // Check if email already exists 
        const existing = users.find(u => u.email === email);
        if (existing) {
            setError("An account with this email already exists");
            return;
        }

        const newUser = { name, email, password };

        // Save to localStorage 
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        // Redirect to login 
        navigate("/");
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-500">{error}</p>}

            <input
                type="text"
                placeholder="Name"
                className="w-full p-2 border rounded"
                value={name}
                onChange={e => setName(e.target.value)}
            />

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
                Create Account
            </button>
        </form>
    );
}
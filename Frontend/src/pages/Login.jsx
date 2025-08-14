import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = ({ setUser }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email.trim()) return;

        const loginCreds = {
            email,
            password,
        };

        if (typeof setUser === "function") {
            setUser(loginCreds);
        } else {
            console.error("setUser is not a function — check props.");
        }

        // Role-based navigation
        const routes = {
            doctor: "/doctor_dashboard",
            finance: "/finance",
            patient: "/patient_dashboard",
        };

        let res = await fetch("http://localhost:4000/api/auth/login", {
            method: "POST",
            body: JSON.stringify(loginCreds),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            console.error("Request has failed");
            return;
        }

        let { data: user, token } = await res.json();
        setUser({ ...user, token });
        navigate(routes[user.userType] || "/");
    };

    return (
        <div className="login">
            <div className="login-container">
                <h2 className="login-title">Login</h2>

                <form onSubmit={handleLogin} className="login-form">
                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="login-label">
                            Enter Your Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="login-input"
                            placeholder="mail@mail.com"
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label htmlFor="name" className="login-label">
                            Enter Your Password
                        </label>
                        <input
                            id="name"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="login-input"
                            placeholder="Jane Doe"
                            required
                        />
                    </div>

                    {/* Submit */}
                    <button type="submit" className="login-button">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;

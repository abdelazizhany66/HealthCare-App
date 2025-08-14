import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = ({ setUser }) => {
    const [role, setRole] = useState("patient");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!name.trim()) return;

        const newUser = {
            name: name.trim(),
            email: email.trim(),
            userType: role,
            password,
        };

        if (typeof setUser === "function") {
            setUser(newUser);
        } else {
            console.error("setUser is not a function — check props.");
        }

        // Role-based navigation
        const routes = {
            doctor: "/doctor_dashboard",
            finance: "/finance",
            patient: "/patient_dashboard",
        };

        let res = await fetch("http://localhost:4000/api/auth/signup", {
            method: "POST",
            body: JSON.stringify(newUser),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            console.error("Request has failed");
            return;
        }

        let { token, data: user } = await res.json();
        setUser({ ...user, token });
        navigate(routes[role] || "/");
    };

    return (
        <div className="login">
            <div className="login-container">
                <h2 className="login-title">Signup</h2>

                <form onSubmit={handleSignup} className="login-form">
                    {/* Role Selection */}
                    <div>
                        <label htmlFor="role" className="login-label">
                            Select Your Role
                        </label>
                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="login-select"
                        >
                            <option value="patient">Patient</option>
                            <option value="doctor">Doctor</option>
                            <option value="finance">Finance</option>
                        </select>
                    </div>

                    {/* Name Input */}
                    <div>
                        <label htmlFor="name" className="login-label">
                            Enter Your Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="login-input"
                            placeholder="e.g., Jane Doe"
                            required
                        />
                    </div>

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
                            placeholder="Jane@doe.com"
                            required
                        />
                    </div>

                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="login-label">
                            Enter Your password
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="login-input"
                            placeholder="password"
                            required
                        />
                    </div>

                    {/* Submit */}
                    <button type="submit" className="login-button">
                        Sign up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;

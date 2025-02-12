import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user is already logged in
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/dashboard");
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        
        try {
            const res = await axios.post("http://localhost:3001/auth/login", { 
                email, 
                password 
            });
            
            if (res.data.token) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user", JSON.stringify(res.data.user));
                navigate("/dashboard");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError(err.response?.data?.message || "Error logging in. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '400px', margin: 'auto', padding: '30px', backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ marginBottom: '20px', color: '#333', fontFamily: 'Arial, sans-serif' }}>Login</h2>
            {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px', fontSize: '14px' }}>{error}</div>}
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                    disabled={loading}
                    required 
                    style={{ width: '100%', padding: '12px', margin: '10px 0', border: '1px solid #007BFF', borderRadius: '5px', fontSize: '16px', transition: 'border-color 0.3s' }}
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    disabled={loading}
                    required 
                    style={{ width: '100%', padding: '12px', margin: '10px 0', border: '1px solid #007BFF', borderRadius: '5px', fontSize: '16px', transition: 'border-color 0.3s' }}
                />
                <button type="submit" disabled={loading} style={{ width: '100%', padding: '12px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', transition: 'background-color 0.3s' }}>
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    );
};

export default Login;

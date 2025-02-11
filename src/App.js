import { BrowserRouter as Router, Route, Routes, Navigate, Link, useLocation } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Group from "./components/Group"; // Import Group Component
import './App.css';

function Navbar() {
    const location = useLocation();
    
    // Hide the navbar on the dashboard and group pages
    if (location.pathname === "/dashboard" || location.pathname === "/group") {
        return null;
    }

    return (
        <nav>
            <Link to="/signup">Signup</Link> | <Link to="/login">Login</Link>
        </nav>
    );
}

function App() {
    const isAuthenticated = !!localStorage.getItem('token');

    return (
        <Router>
            <div className="app-container">
                <Navbar />
                <Routes>
                    <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
                    <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
                    <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Signup />} />
                    <Route path="/dashboard" element={!isAuthenticated ? <Navigate to="/login" /> : <Dashboard />} />
                    <Route path="/group" element={!isAuthenticated ? <Navigate to="/login" /> : <Group />} /> {/* Added Group Route */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;

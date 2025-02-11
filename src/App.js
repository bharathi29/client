import { BrowserRouter as Router, Route, Routes, Navigate, Link } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import './App.css';

function App() {
    const isAuthenticated = !!localStorage.getItem('token');

    return (
        <Router>
            <div className="app-container">
                <nav>
                    <Link to="/signup">Signup</Link> | <Link to="/login">Login</Link>
                </nav>
                <Routes>
                    <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
                    <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
                    <Route path="/signup" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Signup />} />
                    <Route path="/dashboard" element={!isAuthenticated ? <Navigate to="/login" /> : <Dashboard />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

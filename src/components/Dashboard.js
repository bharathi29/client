import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check authentication on component mount
        const checkAuth = () => {
            const token = localStorage.getItem('token');
            const userData = localStorage.getItem('user');
            
            if (!token || !userData) {
                navigate('/login');
                return;
            }

            try {
                setUser(JSON.parse(userData));
            } catch (err) {
                console.error('Error parsing user data:', err);
                handleLogout();
            }
        };

        checkAuth();
    }, [navigate]);

    const handleLogout = () => {
        // Clear all auth data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        // Navigate to login
        navigate('/login');
    };

    if (!user) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h2>Welcome, {user.name}!</h2>
                <button onClick={handleLogout} className="logout-button">
                    Logout
                </button>
            </div>
            <div className="dashboard-content">
                <div className="user-info">
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

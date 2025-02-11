import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [groupSize, setGroupSize] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem("token");
            const userData = localStorage.getItem("user");
            
            if (!token || !userData) {
                navigate("/login");
                return;
            }

            try {
                setUser(JSON.parse(userData));
            } catch (err) {
                console.error("Error parsing user data:", err);
                handleLogout();
            }
        };

        checkAuth();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    const handleProceed = () => {
        navigate("/group", { state: { groupSize } });
    };

    const handleBack = () => {
        navigate(-1);
    };

    if (!user) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="dashboard-wrapper">
            <div className="dashboard-header">
                <h2 className="welcome-text">Welcome, {user.name}!</h2>
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>

            <div className="dashboard-container">
                <h1>Group Discussion Setup</h1>

                <div className="topics-section">
                    <div className="topics-title">Choose a Discussion Topic</div>
                    <div className="topics-container">
                        {["Cloud Computing", "Artificial Intelligence", "Cybersecurity"].map((topic, index) => (
                            <div key={index} className="topic-card">{topic}</div>
                        ))}
                    </div>
                </div>

                <div className="group-size-section">
                    <div className="group-size-title">Choose Number of People in the Group</div>
                    <div className="group-size-container">
                        {[1, 2, 3, 4].map((size) => (
                            <div
                                key={size}
                                className={`group-size-card ${groupSize === size ? "selected" : ""}`}
                                onClick={() => setGroupSize(size)}
                            >
                                {size} Person{size > 1 ? "s" : ""}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="button-section">
                    <button className="back-button" onClick={handleBack}>Back</button>
                    <button className="proceed-button" onClick={handleProceed}>Proceed</button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

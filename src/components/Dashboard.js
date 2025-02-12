import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { AI_PERSONAS } from './Group';

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
        console.log("Proceeding with group size:", groupSize);
        navigate("/group", { state: { groupSize } });
    };

    const handleGroupSizeClick = (size) => {
        console.log("Group size clicked:", size);
        setGroupSize(size);
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
                <h2 className="welcome-text" style={{ fontSize: '18px', textAlign: 'left', width: '100%', padding: '10px', color: '#007BFF' }}>Welcome, {user.name}!</h2>
            </div>

            <div className="dashboard-container">
                <div className="topics-section">
                    <div className="topics-title">Choose a Discussion Topic</div>
                    <div className="topics-container">
                        {/* <div className="participants-title">Number of Participants: {AI_PERSONAS.slice(0, groupSize).length}</div> */}
                        <div className="topic-card">Cloud Computing</div>
                    </div>
                </div>

                <div className="group-size-section">
                    <div className="group-size-title">Choose Number of People in the Group</div>
                    <div className="group-size-container">
                        {[1, 2, 3].map((size) => (
                            <div
                                key={size}
                                className={`group-size-card ${groupSize === size ? "selected" : ""}`}
                                onClick={() => handleGroupSizeClick(size)}
                            >
                                {size} Person{size > 1 ? "s" : ""}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="button-container" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                    <button className="back-button" onClick={handleBack} style={{ margin: '0 10px', padding: '8px 16px', fontSize: '14px', border: 'none', borderRadius: '5px', backgroundColor: '#007BFF', color: 'white', cursor: 'pointer', transition: 'background-color 0.3s' }}>
                        Back
                    </button>
                    <button className="proceed-button" onClick={handleProceed} style={{ margin: '0 10px', padding: '8px 16px', fontSize: '14px', border: 'none', borderRadius: '5px', backgroundColor: '#007BFF', color: 'white', cursor: 'pointer', transition: 'background-color 0.3s' }}>
                        Proceed
                    </button>
                    <button className="logout-button" onClick={handleLogout} style={{ margin: '0 10px', padding: '6px 12px', fontSize: '12px', border: 'none', borderRadius: '5px', backgroundColor: '#dc3545', color: 'white', cursor: 'pointer', transition: 'background-color 0.3s' }}>
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

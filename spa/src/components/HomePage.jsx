import React from "react";
import { useNavigate } from "react-router-dom";
import './index.css';

const HomePage = () => {
    const navigate = useNavigate();
    return (
        <div className="homepage">
            <button onClick={() => navigate('/devices')}>Devices</button>
            <button onClick={() => navigate('/commands')}>Commands</button>
        </div>
    );
};

export default HomePage;
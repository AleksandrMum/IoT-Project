import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();
    return (
        <div>
            <button onClick={() => navigate('/devices')}>Devices</button>
            <button onClick={() => navigate('/commands')}>Commands</button>
        </div>
    );
};

export default HomePage;
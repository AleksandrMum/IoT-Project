import React from "react";
import { useNavigate } from "react-router-dom";
import './index.css';

const HomePage = () => {
    const navigate = useNavigate();
    return (
        <div className="homepage">
            <h2>IoT Система управления</h2>
            <p>Выберите раздел для работы:</p>
            <div className="navigation-buttons">
                <button onClick={() => navigate('/devices')}>Устройства</button>
                <button onClick={() => navigate('/temperatures')}>Температура</button>
                <button onClick={() => navigate('/motions')}>Движение</button>
            </div>
        </div>
    );
};

export default HomePage;

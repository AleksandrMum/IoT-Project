import React from 'react';
import { useNavigate } from "react-router-dom";
import './index.css';
import { useTemperatures } from '../hooks';
import { formatDateTime } from '../utils';

const Temperatures = () => {
    const navigate = useNavigate();
    const { temperatures, error, loading, loadTemperatures } = useTemperatures();

    if (loading) return (
        <div>
            <button onClick={() => navigate('/')}>← На главную страницу</button>
            <p>Загрузка...</p>
        </div>
    );
    
    if (error) return (
        <div>
            <button onClick={() => navigate('/')}>← На главную страницу</button>
            <p>Ошибка: {error}</p>
            <button onClick={loadTemperatures}>Повторить попытку</button>
        </div>
    );
    
    return (
        <div>
            <h2>Данные температуры</h2>
            <button onClick={() => navigate('/')}>← На главную страницу</button>
            <button onClick={loadTemperatures}>🔄 Обновить данные</button>
            
            <table className="custom-table">
                <thead>
                    <tr>
                        <th>UUID</th>
                        <th>Устройство</th>
                        <th>Температура (°C)</th>
                        <th>Время измерения</th>
                    </tr>
                </thead>
                <tbody>
                    {temperatures.map((temp) => (
                        <tr key={temp.uuid}>
                            <td>{temp.uuid}</td>
                            <td>{temp.device ? temp.device.name : temp.deviceId}</td>
                            <td>{temp.value}°C</td>
                            <td>{formatDateTime(temp.createdAt)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            {temperatures.length === 0 && (
                <p style={{textAlign: 'center', marginTop: '20px'}}>
                    Нет данных о температуре
                </p>
            )}
        </div>
    );
};

export default Temperatures;
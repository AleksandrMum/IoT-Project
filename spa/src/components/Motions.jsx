import React from 'react';
import { useNavigate } from "react-router-dom";
import './index.css';
import { useMotions } from '../hooks';
import { formatDateTime } from '../utils';

const Motions = () => {
    const navigate = useNavigate();
    const { motions, error, loading, loadMotions } = useMotions();

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
            <button onClick={loadMotions}>Повторить попытку</button>
        </div>
    );
    
    return (
        <div>
            <h2>Данные датчиков движения</h2>
            <button onClick={() => navigate('/')}>← На главную страницу</button>
            <button onClick={loadMotions}>🔄 Обновить данные</button>
            
            <table className="custom-table">
                <thead>
                    <tr>
                        <th>UUID</th>
                        <th>Устройство</th>
                        <th>Движение обнаружено</th>
                        <th>Время обнаружения</th>
                    </tr>
                </thead>
                <tbody>
                    {motions.map((motion) => (
                        <tr key={motion.uuid} className={motion.motionDetected ? 'motion-detected' : ''}>
                            <td>{motion.uuid}</td>
                            <td>{motion.device ? motion.device.name : motion.deviceId}</td>
                            <td>
                                <span className={`motion-status ${motion.motionDetected ? 'detected' : 'not-detected'}`}>
                                    {motion.motionDetected ? '✓ Да' : '✗ Нет'}
                                </span>
                            </td>
                            <td>{formatDateTime(motion.createdAt)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            
            {motions.length === 0 && (
                <p style={{textAlign: 'center', marginTop: '20px'}}>
                    Нет данных о движении
                </p>
            )}
        </div>
    );
};

export default Motions;
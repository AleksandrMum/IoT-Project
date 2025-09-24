import React from 'react';
import { useNavigate } from "react-router-dom";
import './index.css';
import DevicesForm from './DevicesForm';
import { useDevices } from '../hooks';
import { formatDateTime } from '../utils';

const Devices = () => {
    const navigate = useNavigate();
    const { devices, error, loading, loadDevices, handleAddDevice } = useDevices();

    if (loading) return (
        <div>
            <button onClick={() => navigate('/')}>На главную страницу</button>
            <p>Loading...</p>
        </div>
    );
    else if (error) return (
        <div>
            <button onClick={() => navigate('/')}>На главную страницу</button>
            <p>Ошибка: {error}</p>
            <button onClick={loadDevices}>Повторить попытку</button>
        </div>
    );
    else return (
        <div>
            <h2>Устройства (Devices)</h2>
            <button onClick={() => navigate('/')}>На главную страницу</button>
            <DevicesForm onAddDevice={handleAddDevice} />
            <button onClick={loadDevices}>Обновить данные</button>
            <table className="custom-table">
                <thead>
                    <tr>
                        <th>UUID</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Temperature</th>
                        <th>Updated At</th>
                    </tr>
                </thead>
                <tbody>
                    {devices.map((device) => (
                        <tr key={device.uuid}>
                            <td>{device.uuid}</td>
                            <td>{device.name}</td>
                            <td>{device.status ? 'Включено' : 'Выключено'}</td>
                            <td>{device.temperature ?? '-'}</td>
                            <td>{formatDateTime(device.updatedAt)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Devices;

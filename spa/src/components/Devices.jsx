import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './index.css';
import DevicesForm from './DevicesForm';

const Devices = () => {
    const navigate = useNavigate();
    const [devices, setDevices] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // Функция для загрузки данных по устройствам из БД
    const fetchDevices = () => {
        setLoading(true);
        axios.get('http://localhost:8080/devices')
            .then((res) => {
                setDevices(res.data);
                setError(null);
            })
            .catch((err) => {
                setError(err.message);
                console.log(err);
            })
            .finally(() => setLoading(false));
    };

    // Загрузка данных по устройствам из БД
    useEffect(() => {
        fetchDevices();
    }, []);

    // Функция для добавления устройства в таблицу
    const handleAddDevice = (newDevice) => {
        setDevices((prev) => [...prev, newDevice]);
    };

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
            <button onClick={fetchDevices}>Повторить попытку</button>
        </div>
    );
    else return (
        <div>
            <button onClick={() => navigate('/')}>На главную страницу</button>
            <h2>Устройства (Devices)</h2>
            <DevicesForm onAddDevice={handleAddDevice} />
            <button onClick={fetchDevices}>Обновить данные</button>
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
                            <td>{device.status ? 'Enabled' : 'Disabled'}</td>
                            <td>{device.temperature ?? '-'}</td>
                            <td>{device.updatedAt ? new Date(device.updatedAt).toLocaleString() : '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Devices;

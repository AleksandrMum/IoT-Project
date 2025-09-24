import axios from 'axios';
import React, { useState } from 'react';
import './index.css';
import { REACT_APP_API_URL } from './const.js';

const DevicesForm = ({ onAddDevice }) => {
    const [name, setName] = useState('');
    const [status, setStatus] = useState(true);
    const [temperature, setTemperature] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // Функция для отправки формы и добавления нового устройства
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${REACT_APP_API_URL}/devices`, {
                name,
                status,
                temperature: temperature === '' ? null : Number(temperature),
                updatedAt: new Date().toISOString()
            });
            if (onAddDevice) {
                onAddDevice(response.data);
            }
            setName('');
            setStatus(true);
            setTemperature('');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-block">
            <h3>Добавить устройство</h3>
            <div>
                <label>Имя:</label>
                <input value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div>
                <label>Статус:</label>
                <select value={status} onChange={e => setStatus(e.target.value === 'true')}>
                    <option value="true">Enabled</option>
                    <option value="false">Disabled</option>
                </select>
            </div>
            <div>
                <label>Температура:</label>
                <input type="number" value={temperature} onChange={e => setTemperature(e.target.value)} />
            </div>
            <button type="submit" disabled={loading}>{loading ? 'Отправка...' : 'Добавить'}</button>
            {error && <div style={{ color: 'red' }}>Ошибка: {error}</div>}
        </form>
    );
};

export default DevicesForm;

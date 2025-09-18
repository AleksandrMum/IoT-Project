import axios from 'axios';
import React, { useState } from 'react';
import './index.css';

const CommandsForm = ({ onAddCommand }) => {
    const [deviceId, setDeviceId] = useState('');
    const [command, setCommand] = useState('');
    const [status, setStatus] = useState(false);
    const [timestamp, setTimestamp] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post('http://localhost:8080/commands', {
                deviceId,
                command,
                status,
                timestamp: timestamp ? new Date(timestamp).toISOString() : new Date().toISOString()
            });
            if (onAddCommand) {
                onAddCommand(response.data);
            }
            setDeviceId('');
            setCommand('');
            setStatus(false);
            setTimestamp('');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-block">
            <h3>Добавить команду</h3>
            <div>
                <label>Device ID:</label>
                <input value={deviceId} onChange={e => setDeviceId(e.target.value)} required />
            </div>
            <div>
                <label>Command:</label>
                <input value={command} onChange={e => setCommand(e.target.value)} required />
            </div>
            <div>
                <label>Status:</label>
                <select value={status} onChange={e => setStatus(e.target.value === 'true')}>
                    <option value="false">Ожидание</option>
                    <option value="true">Выполнено</option>
                </select>
            </div>
            <div>
                <label>Timestamp:</label>
                <input type="datetime-local" value={timestamp} onChange={e => setTimestamp(e.target.value)} />
            </div>
            <button type="submit" disabled={loading}>{loading ? 'Отправка...' : 'Добавить'}</button>
            {error && <div style={{ color: 'red' }}>Ошибка: {error}</div>}
        </form>
    );
};

export default CommandsForm;

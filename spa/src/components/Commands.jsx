import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import './index.css';
import CommandsForm from './CommandsForm';
import { REACT_APP_API_URL } from './const.js';

const Commands = () => {
    const navigate = useNavigate();
    const [commands, setCommands] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchCommands = () => {
        setLoading(true);
        axios.get(`${REACT_APP_API_URL}/commands`)
            .then((res) => {
                setCommands(res.data);
                setError(null);
            })
            .catch((err) => {
                setError(err.message);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchCommands();
    }, []);

    const handleAddCommand = (newCommand) => {
        setCommands((prev) => [...prev, newCommand]);
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
            <button onClick={fetchCommands}>Повторить попытку</button>
        </div>
    );
    else return (
        <div>
            <h2>Команды (Commands)</h2>
            <button onClick={() => navigate('/')}>На главную страницу</button>
            <CommandsForm onAddCommand={handleAddCommand} />
            <button onClick={fetchCommands}>Обновить данные</button>
            <table className="custom-table">
                <thead>
                    <tr>
                        <th>UUID</th>
                        <th>Device ID</th>
                        <th>Command</th>
                        <th>Status</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {commands.map((cmd) => (
                        <tr key={cmd.uuid}>
                            <td>{cmd.uuid}</td>
                            <td>{cmd.deviceId}</td>
                            <td>{cmd.command}</td>
                            <td>{cmd.status ? 'Выполнено' : 'Ожидание'}</td>
                            <td>{cmd.timestamp ? new Date(cmd.timestamp).toLocaleString() : '-'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Commands;

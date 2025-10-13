import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './index.css';
import { useDevices } from '../hooks';
import { formatDateTime, updateDevice } from '../utils';

const Devices = () => {
    const navigate = useNavigate();
    const { devices, error, loading, loadDevices } = useDevices();
    const [editingDevice, setEditingDevice] = useState(null);
    const [editForm, setEditForm] = useState({ name: '', location: '', isActive: true });

    const handleEdit = (device) => {
        setEditingDevice(device.uuid);
        setEditForm({
            name: device.name,
            location: device.location || '',
            isActive: device.isActive
        });
    };

    const handleSave = async (deviceId) => {
        try {
            await updateDevice(deviceId, editForm);
            setEditingDevice(null);
            loadDevices(); // Перезагрузить данные
        } catch (err) {
            console.error('Ошибка при обновлении устройства:', err);
        }
    };

    const handleCancel = () => {
        setEditingDevice(null);
        setEditForm({ name: '', location: '', isActive: true });
    };

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
            <button onClick={loadDevices}>Повторить попытку</button>
        </div>
    );
    
    return (
        <div>
            <h2>Устройства</h2>
            <button onClick={() => navigate('/')}>← На главную страницу</button>
            <button onClick={loadDevices}>🔄 Обновить данные</button>
            
            <table className="custom-table">
                <thead>
                    <tr>
                        <th>UUID</th>
                        <th>Название</th>
                        <th>Тип</th>
                        <th>Местоположение</th>
                        <th>Статус</th>
                        <th>Создано</th>
                        <th>Обновлено</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {devices.map((device) => (
                        <tr key={device.uuid}>
                            <td>{device.uuid}</td>
                            <td>
                                {editingDevice === device.uuid ? (
                                    <input
                                        value={editForm.name}
                                        onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                                        className="edit-input"
                                    />
                                ) : (
                                    device.name
                                )}
                            </td>
                            <td>{device.type === 'temperatureSensor' ? 'Датчик температуры' : 'Датчик движения'}</td>
                            <td>
                                {editingDevice === device.uuid ? (
                                    <input
                                        value={editForm.location}
                                        onChange={(e) => setEditForm({...editForm, location: e.target.value})}
                                        placeholder="Местоположение"
                                        className="edit-input"
                                    />
                                ) : (
                                    device.location || '-'
                                )}
                            </td>
                            <td>
                                {editingDevice === device.uuid ? (
                                    <select
                                        value={editForm.isActive}
                                        onChange={(e) => setEditForm({...editForm, isActive: e.target.value === 'true'})}
                                        className="edit-input"
                                    >
                                        <option value="true">Активно</option>
                                        <option value="false">Неактивно</option>
                                    </select>
                                ) : (
                                    device.isActive ? 'Активно' : 'Неактивно'
                                )}
                            </td>
                            <td>{formatDateTime(device.createdAt)}</td>
                            <td>{formatDateTime(device.updatedAt)}</td>
                            <td>
                                {editingDevice === device.uuid ? (
                                    <div>
                                        <button onClick={() => handleSave(device.uuid)} className="save-btn">✓</button>
                                        <button onClick={handleCancel} className="cancel-btn">✗</button>
                                    </div>
                                ) : (
                                    <button onClick={() => handleEdit(device)} className="edit-btn">✏️</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Devices;

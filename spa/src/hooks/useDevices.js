import { useState, useEffect } from 'react';
import { fetchDevices } from '../utils';

export default function useDevices() {
    const [devices, setDevices] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadDevices = async () => {
        setLoading(true);
        try {
            const data = await fetchDevices();
            setDevices(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDevices();
    }, []);

    const handleAddDevice = (newDevice) => {
        setDevices((prev) => [...prev, newDevice]);
    };

    return { devices, error, loading, loadDevices, handleAddDevice };
}

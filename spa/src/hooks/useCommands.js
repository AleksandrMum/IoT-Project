import { useState, useEffect } from 'react';
import { fetchCommands } from '../utils';

export default function useCommands() {
    const [commands, setCommands] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadCommands = async () => {
        setLoading(true);
        try {
            const data = await fetchCommands();
            setCommands(data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCommands();
    }, []);

    const handleAddCommand = (newCommand) => {
        setCommands((prev) => [...prev, newCommand]);
    };

    return { commands, error, loading, loadCommands, handleAddCommand };
}

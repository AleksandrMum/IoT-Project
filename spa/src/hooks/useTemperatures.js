import { useState, useEffect } from 'react';
import { fetchTemperatures } from '../utils';

export default function useTemperatures() {
    const [temperatures, setTemperatures] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadTemperatures = async () => {
        setLoading(true);
        try {
            const data = await fetchTemperatures();
            setTemperatures(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTemperatures();
    }, []);

    return { temperatures, error, loading, loadTemperatures };
}
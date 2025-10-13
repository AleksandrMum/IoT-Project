import { useState, useEffect } from 'react';
import { fetchMotions } from '../utils';

export default function useMotions() {
    const [motions, setMotions] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const loadMotions = async () => {
        setLoading(true);
        try {
            const data = await fetchMotions();
            setMotions(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMotions();
    }, []);

    return { motions, error, loading, loadMotions };
}
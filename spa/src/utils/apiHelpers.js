import axios from 'axios';

const REACT_APP_API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

// Device API functions
export const fetchDevices = async () => {
    try {
        const res = await axios.get(`${REACT_APP_API_URL}/devices`);
        return res.data;
    } catch (err) {
        throw err;
    }
};

export const updateDevice = async (deviceId, updates) => {
    try {
        const res = await axios.patch(`${REACT_APP_API_URL}/devices/${deviceId}`, updates);
        return res.data;
    } catch (err) {
        throw err;
    }
};

// Temperature API functions
export const fetchTemperatures = async () => {
    try {
        const res = await axios.get(`${REACT_APP_API_URL}/temperatures`);
        return res.data;
    } catch (err) {
        throw err;
    }
};

// Motion API functions
export const fetchMotions = async () => {
    try {
        const res = await axios.get(`${REACT_APP_API_URL}/motions`);
        return res.data;
    } catch (err) {
        throw err;
    }
};

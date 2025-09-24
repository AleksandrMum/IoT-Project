import axios from 'axios';

const REACT_APP_API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

export const fetchDevices = async () => {
    try {
        const res = await axios.get(`${REACT_APP_API_URL}/devices`);
        return res.data;
    } catch (err) {
        throw err;
    }
};

export const fetchCommands = async () => {
    try {
        const res = await axios.get(`${REACT_APP_API_URL}/commands`);
        return res.data;
    } catch (err) {
        throw err;
    }
};

export const addDevice = async (device) => {
    try {
        const res = await axios.post(`${REACT_APP_API_URL}/devices`, device);
        return res.data;
    } catch (err) {
        throw err;
    }
};

export const addCommand = async (command) => {
    try {
        const res = await axios.post(`${REACT_APP_API_URL}/commands`, command);
        return res.data;
    } catch (err) {
        throw err;
    }
};

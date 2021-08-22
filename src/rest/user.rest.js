import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

export const getUser = async (request) => {
    const response = await axios.post(`${BASE_URL}/user`, request);

    return response.data;
};

export const updateUser = async (request) => {
    const response = await axios.put(`${BASE_URL}/user`, request);

    return response.data;
};

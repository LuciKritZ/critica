import axios from 'axios';

const BASE_URL_AUTH = process.env.REACT_API_URL;

export const getUser = async (request) => {
    const response = await axios.post(`${BASE_URL_AUTH}/user`, request);
    return response.data;
};

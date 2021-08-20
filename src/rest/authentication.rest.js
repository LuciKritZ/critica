import axios from 'axios';

const BASE_URL_AUTH = process.env.REACT_APP_API_URL;

export const login = async (request) => {
    const response = await axios.post(`${BASE_URL_AUTH}/user`, request);

    return response.data;
};

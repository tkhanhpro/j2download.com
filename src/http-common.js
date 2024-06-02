import axios from 'axios';
import config from './config';

const configData = {
    baseURL: config.API_URL,
    headers: {
        "content-type": "application/json",
        "token": "eyJ0eXAiOiJqd3QiLCJhbGciOiJIUzI1NiJ9.eyJxxx"
    },
};

export default axios.create(configData);
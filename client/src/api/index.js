import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

// Get API key from environment
const API_KEY = process.env.REACT_APP_STABILITY_API_KEY;

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY
    }
});

// Add response interceptor for error handling
api.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        const errorMessage = error.response?.data?.message || error.message;
        console.error('API Error:', errorMessage);
        throw new Error(errorMessage);
    }
);

export const GetPosts = async () => {
    try {
        const response = await api.get('/posts');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const CreatePost = async (data) => {
    try {
        const response = await api.post('/posts', data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const GenerateAIImage = async (data) => {
    try {
        const response = await api.post('/generateImage', data);
        if (!response.data?.photo) {
            throw new Error('No image data received from server');
        }
        return response.data;
    } catch (error) {
        throw error;
    }
};

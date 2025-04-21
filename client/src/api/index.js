import axios from 'axios';

// Get API URL from environment or use default for local development
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

// Use environment variable for API key
const API_KEY = process.env.REACT_APP_API_KEY;

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY || '', // fallback to empty string if undefined
    }
});

// Response interceptor for error handling
api.interceptors.response.use(
    response => response,
    error => {
        const message =
            error?.response?.data?.message ||
            error?.message ||
            'Error while using API';
        return Promise.reject(new Error(message));
    }
);

// GET /posts
export const GetPosts = async () => {
    const response = await api.get('/posts');
    return response.data;
};

// POST /posts
export const CreatePost = async (data) => {
    const response = await api.post('/posts', data);
    return response.data;
};

// POST /generateImage
export const GenerateAIImage = async (data) => {
    const response = await api.post('/generateImage', data);
    if (!response.data?.photo) {
        throw new Error('No image data received from server');
    }
    return response.data;
};
//suresh

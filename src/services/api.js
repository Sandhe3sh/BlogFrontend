import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8089/api';


// Create Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for logging
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (email, password) => api.post('/auth/register', { email, password }),
};

// Blog API
export const blogAPI = {
  getBlogs: (page = 0, size = 10) => api.get(`/blogs?page=${page}&size=${size}`),
  getBlog: (id) => api.get(`/blogs/${id}`),
  
  createBlog: (title, content) => {
    if (!title || !content) {
      return Promise.reject({ message: 'Title and content are required' });
    }
    return api.post('/blogs', { title, content });
  },

  updateBlog: (id, title, content) => {
    if (!title || !content) {
      return Promise.reject({ message: 'Title and content are required' });
    }
    return api.put(`/blogs/${id}`, { title, content });
  },

  deleteBlog: (id) => api.delete(`/blogs/${id}`),
};

export default api;

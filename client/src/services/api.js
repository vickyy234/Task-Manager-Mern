import axios from 'axios';

// Set up axios defaults
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
axios.defaults.baseURL = API_BASE_URL;
axios.defaults.withCredentials = true;

// API service functions
export const api = {
  // User related APIs
  getUserDetails: async () => {
    try {
      const response = await axios.get('/getuserdetails');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user details');
    }
  },

  // Task related APIs
  getAllTasks: async () => {
    try {
      const response = await axios.get('/getAllTasks');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch tasks');
    }
  },

  addNewTask: async (taskData) => {
    try {
      const response = await axios.post('/addNewTask', taskData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create task');
    }
  },

  updateTask: async (taskId, updateData) => {
    try {
      const response = await axios.put(`/update/${taskId}`, updateData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update task');
    }
  },

  deleteTask: async (taskId) => {
    try {
      const response = await axios.delete(`/delete/${taskId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete task');
    }
  },

  shareTask: async (taskId, email) => {
    try {
      const response = await axios.post('/shareTask', {
        taskId,
        email
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to share task');
    }
  },

  // Authentication related
  logout: async () => {
    try {
      const response = await axios.post('/auth/logout');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to logout');
    }
  }
};

// Request interceptor for handling authentication
axios.interceptors.request.use(
  (config) => {
    // Add any auth tokens or headers here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Redirect to login if unauthorized
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;
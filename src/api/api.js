import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      const errorMessage = error.response.data.message || "An unexpected error occurred. Please try again later.";
      if (error.response.status === 401) {
        // toast.info("Please login to access aplakaam.");
      } else {
        console.error(errorMessage);
      }
    } else {
      console.error("An unexpected error occurred. Please try again later.", 'error');
    }
    return Promise.reject(error);
  }
);

// Authentication related API calls
export const checkAuth = () => {
  return api.get('/auth/checkAuth').then(response => {
    const { role } = response.data.user;
    return { ...response, data: { ...response.data, role } };
  });
};


export const loginUser = ( email, password) => api.post(`/admin/login`, { email, password });
export const logoutApi = () => api.post('/logout');

export default api;

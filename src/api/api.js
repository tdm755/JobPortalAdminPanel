import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/admin';

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

export const checkAdminAuth = () => {
  return api.get('/checkAdminAuth').then(response => {
    const { role } = response.data.admin;
    return { ...response, data: { ...response.data, role } };
  });
};


export const loginUser = ( email, password) => api.post(`/login`, { email, password });
export const logoutApi = () => {
  return api.post('/logout');
};

export default api;

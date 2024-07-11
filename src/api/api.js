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


export const fetchCandidateData = async (prop, arg2) => {
  try {
    const response = await fetch(`${API_BASE_URL}/candidates`);
    const data = await response.json();
    if (prop !== undefined) {
      prop(data.data.candidates);
    }    
    if (arg2) {
      arg2(data.data.candidates.length);      
    }
    
  } catch (error) {
    console.error('Error fetching candidates:', error);
  }
};


export const fetchEmployersData = async (prop, setEmployersCount) => {
  try {
    const response = await fetch(`${API_BASE_URL}/employers`);
    const data = await response.json();
    if (prop !== undefined) {
      prop(data.data.employers)      
    }
    if (setEmployersCount) {
      setEmployersCount(data.data.employers.length)
    }
  } catch (error) {
    console.error('Error fetching candidates:', error);

  }
}

// In api.js or similar file

// Create or update a package
export const createOrUpdatePackage = (packageData) => {
  return api.post('/packages', packageData);
};

// Get all packages
export const getAllPackages = () => {
  return api.get('/packages');
};

// Update package details
export const updatePackageDetails = (packageName, updates) => {
  return api.patch('/packages', { packageName, updates });
};

export default api;

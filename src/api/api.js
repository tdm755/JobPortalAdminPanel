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

export const requestPasswordReset = (email) => api.post('/request-password-reset', { email });

export const resetPassword = (token, newPassword) => api.post('/reset-password', { token, newPassword });

export const changeAdminPassword = (currentPassword, newPassword) => 
  api.post('/change-password', { currentPassword, newPassword });

export const uploadAdminProfileImage = (imageFile) => {
  const formData = new FormData();
  formData.append('profileImage', imageFile);
  return api.post('/upload-profile-image', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getAdminProfileImage = () => {
  return api.get('/profile-image', {
    responseType: 'blob',
  }).then(response => {
    return URL.createObjectURL(response.data);
  });
};

// Updated activate and deactivate functions
export const deactivateCandidate = (candidateId) => api.put(`/candidates/${candidateId}/deactivate`);
export const activateCandidate = (candidateId) => api.put(`/candidates/${candidateId}/activate`);
export const deactivateEmployer = (employerId) => api.put(`/employers/${employerId}/deactivate`);
export const activateEmployer = (employerId) => api.put(`/employers/${employerId}/activate`);

// Package APIs
export const getAllPackages = () => {
  return api.get('/packages');
};

export const updatePackageDetails = (packageId, updates) => {
  console.log('Sending update request:', { packageId, updates });
  return api.put('/packages', { packageId, updates });
};

export const getTotalCounts = () => {
  return api.get('/total-counts')
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
};

export const fetchCandidateData = async (setCandidates, setTotalCandidates, setTotalPages, sortOrder = 'ASC', search = '', page = 1, limit = 5) => {
  try {
    const response = await fetch(`${API_BASE_URL}/candidates?sortOrder=${sortOrder}&search=${encodeURIComponent(search)}&page=${page}&limit=${limit}`);
    const data = await response.json();
    
    if (data.data && data.data.candidates) {
      // Sort the candidates based on the sortOrder
      const sortedCandidates = data.data.candidates.sort((a, b) => {
        if (sortOrder === 'ASC') {
          return a.CandidateProfile.cid - b.CandidateProfile.cid;
        } else {
          return b.CandidateProfile.cid - a.CandidateProfile.cid;
        }
      });
      
      setCandidates(sortedCandidates);
      setTotalCandidates(data.data.totalCandidates);
      setTotalPages(data.data.totalPages);
     
    } else {
      console.error('Unexpected data structure:', data);
    }
  } catch (error) {
    console.error('Error fetching candidates:', error);
  }
};

export const fetchEmployersData = async (setEmployers, setTotalEmployers, setTotalPages, sortOrder = 'ASC', search = '', page = 1, limit = 5) => {
  try {
    const response = await fetch(`${API_BASE_URL}/employers?sortOrder=${sortOrder}&search=${encodeURIComponent(search)}&page=${page}&limit=${limit}`);
    const data = await response.json();

    if (data.data && data.data.employers) {
      // Sort the employers based on the sortOrder
      const sortedEmployers = data.data.employers.sort((a, b) => {
        if (sortOrder === 'ASC') {
          return a.EmployerProfile.eid - b.EmployerProfile.eid;
        } else {
          return b.EmployerProfile.eid - a.EmployerProfile.eid;
        }
      });

      setEmployers(sortedEmployers);
      setTotalEmployers(data.data.totalEmployers);
      setTotalPages(data.data.totalPages);
    } else {
      console.error('Unexpected data structure:', data);
    }
  } catch (error) {
    console.error('Error fetching employers:', error);
  }
};

export async function fetchDetailsOfFeatures(setFeatureData, pathname) {
  try {
    const response = await fetch(`${API_BASE_URL}${pathname.includes('category') ? '/jobCategory' : '/jobType'}`, {
      credentials: 'include',
    });
    const dataInsideAPI = await response.json();

    if (dataInsideAPI && dataInsideAPI.data) {
      setFeatureData(() => {
        console.log(dataInsideAPI);

        let parsedData;
        try {
          // Attempt to parse the data field if it's a JSON string
          parsedData = typeof dataInsideAPI.data === 'string' 
            ? JSON.parse(dataInsideAPI.data) 
            : dataInsideAPI.data;
        } catch (parseError) {
          console.error('Error parsing data:', parseError);
          parsedData = [];
        }

        // Ensure parsedData is an array before using map and sort
        const processedData = Array.isArray(parsedData)
          ? parsedData.map(item => item.trim()).sort((a, b) => a.localeCompare(b))
          : [];

        return {
          ...dataInsideAPI,
          data: processedData,
          Ccount: processedData.length
        };
      });
    } else {
      if (!dataInsideAPI) {
        setFeatureData({});
      } else if (!dataInsideAPI.data) {
        setFeatureData((preVal) => {
          return { ...preVal, data: [] };
        });
      }
    }
  } catch (error) {
    console.log('Error:', error);
  }
}

export default api;

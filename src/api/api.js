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

// Package APIs
export const getAllPackages = () => {
  return api.get('/packages');
};

export const updatePackageDetails = (packageId, updates) => {
  console.log('Sending update request:', { packageId, updates });
  return api.put('/packages', { packageId, updates });
};

export const fetchCandidateData = async (prop, arg2) => {
  try {
    const response = await fetch(`${API_BASE_URL}/candidates`);
    const data = await response.json();
    if (prop !== undefined) {
      prop(data.data.candidates);
    }    
    if (arg2) {
      arg2(data.data.candidates ? data.data.candidates.length : 0);      
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
      setEmployersCount(data.data.employers ? data.data.employers.length : 0)
    }
  } catch (error) {
    console.error('Error fetching candidates:', error);

  }
}



// export async function fetchDetailsOfFeatures(setFeatureData, pathname) {
//   try {
//       const response = await fetch(`${API_BASE_URL}${pathname.includes('category') ? '/jobCategory' : '/jobType'}`, {
//           credentials: 'include',
//       });
//       const dataInsideAPI = await response.json();

//       if (dataInsideAPI && dataInsideAPI.data) {
//           setFeatureData(()=>{
//             console.log(dataInsideAPI);
//              let lengthOfData = (dataInsideAPI.data ? dataInsideAPI.data.length : '');
//               return {...dataInsideAPI, data : dataInsideAPI.data.map(item => item.trim()).sort((a, b) => a.localeCompare(b)), Ccount : lengthOfData}                        
//           });
//       } else {
//           if (!dataInsideAPI) {
//               setFeatureData({}); 
//           }
//           else if(!dataInsideAPI.data){
//               setFeatureData((preVal)=>{
//                   return {...preVal, data : []};
//               })
//           }
//       }
//   } catch (error) {
//       console.log('Error:', error);
//   }
// }

export async function fetchDetailsOfFeatures(setFeatureData, pathname) {
  try {

    const endpoint = pathname.includes('category') 
      ? '/jobCategory' 
      : pathname.includes('jobtype') 
        ? '/jobType' 
        : '/jobLocation';


    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
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

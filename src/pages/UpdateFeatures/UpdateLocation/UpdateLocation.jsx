import { useEffect, useState } from 'react';
import React from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import { API_BASE_URL } from '../../../api/api';
import axios from 'axios';

const FileInput = ({ onChange }) => {
  const [fileName, setFileName] = useState('No file chosen');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      onChange(event);
    }
  };

  return (
    <div className="flex items-center space-x-4 border p-0.5 rounded-md w-[]100%">
      <label className="bg-blue-600 text-white text-sm font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 cursor-pointer">
        Choose File
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
          accept="image/*"
        />
      </label>
      <span className="text-gray-600 text-sm">{fileName}</span>
    </div>
  );
};

const JobCard = ({ location, onImageChange, states, cities, index, handleUpdateLocation }) => {
  const [stateId, setStateId] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);

  useEffect(() => {
    if (location.state) {
      const state = states.find(s => s.StateName === location.state);
      if (state) {
        setStateId(state.StateId.toString());
      }
    }
  }, [location.state, states]);

  useEffect(() => {
    const filtered = cities.filter((item) => item.StateId === parseInt(stateId));
    setFilteredCities(filtered);
  }, [stateId, cities]);

  const handleChangeState = (e) => {
    const selectedValue = e.target.value;
    const selectedText = e.target.options[e.target.selectedIndex].text;

    setStateId(selectedValue);
    handleUpdateLocation(index, 'state', selectedText);
  };

  const handleChangeCity = (e) => {
    const selectedText = e.target.options[e.target.selectedIndex].text;
    handleUpdateLocation(index, 'city', selectedText);
  };

  return (
    <div className="">
      <div className="mb-3">
        <FileInput onChange={(e) => onImageChange(e, location.id, index)} />
      </div>
      <div className="bg-white rounded-lg overflow-hidden shadow-lg">
        <div
          className="border border-[#e0e6f7] rounded-md p-3 m-3 h-48 bg-cover bg-center"
          style={{ backgroundImage: `url(${location.locationImage})` }}
        />
        <div className="p-4 flex flex-col">
          <select onChange={handleChangeState} value={stateId} className="border mb-4">
            <option value="">select state</option>
            {states.map((item) => (
              <option key={item.StateId} value={item.StateId}>
                {item.StateName}
              </option>
            ))}
          </select>
          <select onChange={handleChangeCity} value={location.city || ''} className="border mb-4">
            <option value="">select city</option>
            {filteredCities.map((item) => (
              <option key={item.CityId} value={item.CityName}>
                {item.CityName}
              </option>
            ))}
          </select>
          <p className="text-gray-600">
            <span className="font-semibold text-blue-600">{location.vacancy} Vacancy</span>
            <span className="float-right text-gray-500">{location.companies} companies</span>
          </p>
        </div>
      </div>
    </div>
  );
};

const UpdateLocation = () => {
  const [locations, setLocations] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const fetchLocations = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/job-locations`);
      setLocations(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchStateDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/states`);
        setStates(response.data.data.states);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchCityDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/cities`);
        setCities(response.data.data.cities);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStateDetails();
    fetchCityDetails();
    fetchLocations();
  }, []);

  const handleUpdateLocation = (index, field, value) => {
    setLocations((prevLocations) => {
      const newLocations = [...prevLocations];
      newLocations[index] = {
        ...newLocations[index],
        [field]: value,
      };
      return newLocations;
    });
  };

  const handleImageChange = (event, id, index) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setLocations((prevLocations) => {
          const newLocations = [...prevLocations];
          newLocations[index] = {
            ...newLocations[index],
            locationImage: reader.result,
          };
          return newLocations;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const MAX_LOCATIONS = 4;  // Change this number to increase the limit

  const handleAddLocation = () => {
    if (locations.length < MAX_LOCATIONS) {
      setLocations((prevLocations) => [
        ...prevLocations,
        { id: `new-${Date.now()}`, state: '', city: '', locationImage: null },
      ]);
    }
  };

  const handleSaveData = async () => {
    const formData = new FormData();
    formData.append('locations', JSON.stringify(locations.map(loc => ({
      id: loc.id,  // Make sure this is the id from the backend
      state: loc.state,
      city: loc.city,
      isHide: loc.isHide
    }))));
  
    locations.forEach((location, index) => {
      if (location.locationImage && location.locationImage.startsWith('data:image')) {
        const base64Data = location.locationImage.split(',')[1];
        const binaryData = atob(base64Data);
        const arrayBuffer = new ArrayBuffer(binaryData.length);
        const uint8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < binaryData.length; i++) {
          uint8Array[i] = binaryData.charCodeAt(i);
        }
        const blob = new Blob([arrayBuffer], { type: 'image/jpeg' });
        formData.append(`locationImage`, blob, `image_${index}.jpg`);
      }
    });
  
    try {
      const response = await axios.post(`${API_BASE_URL}/job-locations`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('data after save:', response.data);
      // Fetch updated locations after successful save
      fetchLocations();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DefaultLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-2">Jobs by Location</h1>
        <p className="text-xl text-gray-600 text-center mb-8">
          Find your favourite jobs and get the benefits of yourself
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 tabOut:grid-cols-3 tabUlu:grid-cols-4 gap-6">
          {locations.map((location, index) => (
            <JobCard
              key={location.id || `new-${index}`}
              index={index}
              states={states}
              cities={cities}
              location={location}
              onImageChange={handleImageChange}
              handleUpdateLocation={handleUpdateLocation}
            />
          ))}
        </div>
        <div className="flex justify-between items-center mt-6">
            {locations.length < MAX_LOCATIONS && (
              <button
                onClick={handleAddLocation}
                className="inline-flex items-center justify-center bg-green-600 py-2 px-4 text-center font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
              >
                Add Location
              </button>
            )}
            <button
              onClick={handleSaveData}
              className="BTNToAddColumn inline-flex items-center justify-center bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            >
              Save Changes
            </button>
          </div>
      </div>
    </DefaultLayout>
  );
};

export default UpdateLocation;
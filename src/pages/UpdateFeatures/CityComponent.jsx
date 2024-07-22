import React, { useState, useRef, useEffect } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import DeleteIcon from '../../images/icon/DeleteIcon.svg';
import EditIcon from '../../images/icon/EditIcon.svg';

function CityComponent() {
  const [states, setStates] = useState([
    { StateId: 1, StateName: 'Maharashtra' },
    { StateId: 2, StateName: 'Karnataka' },
    { StateId: 3, StateName: 'Delhi' },
    { StateId: 4, StateName: 'Tamil Nadu' },
  ]);
  const [cities, setCities] = useState([
    { CityId: 1, CityName: 'Mumbai', StateId: 1 },
    { CityId: 2, CityName: 'Pune', StateId: 1 },
    { CityId: 3, CityName: 'Bengaluru', StateId: 2 },
    { CityId: 4, CityName: 'Mysuru', StateId: 2 },
    { CityId: 5, CityName: 'Delhi', StateId: 3 },
    { CityId: 6, CityName: 'New Delhi', StateId: 3 },
    { CityId: 7, CityName: 'Chennai', StateId: 4 },
    { CityId: 8, CityName: 'Coimbatore', StateId: 4 },
  ]);
  const [selectedState, setSelectedState] = useState('');
  const [newCity, setNewCity] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [highlightIndex, setHighlightIndex] = useState(null);
  const newItemRef = useRef(null);

  const handleAddCity = () => {
    if (!selectedState || !newCity.trim()) return;

    const newCityData = {
      CityId: cities.length + 1, // Simulate new ID
      CityName: newCity,
      StateId: parseInt(selectedState),
    };

    setCities((prevCities) => [...prevCities, newCityData]);
    setNewCity('');
    setHighlightIndex(cities.length);
    newItemRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const handleDeleteCity = (index) => {
    setCities((prevCities) => prevCities.filter((_, i) => i !== index));
  };

  const handleEditCity = (index) => {
    const cityToEdit = cities[index];
    setEditIndex(index);
    setNewCity(cityToEdit.CityName);
    setSelectedState(cityToEdit.StateId.toString());
  };

  const handleSaveEdit = () => {
    if (editIndex === null || !selectedState || !newCity.trim()) return;

    const updatedCities = cities.map((city, i) => {
      if (i === editIndex) {
        return {
          ...city,
          CityName: newCity,
          StateId: parseInt(selectedState),
        };
      }
      return city;
    });

    setCities(updatedCities);
    setEditIndex(null);
    setNewCity('');
    setSelectedState('');
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    setNewCity('');
    setSelectedState('');
  };

  // Filter cities based on selected state
  const filteredCities = selectedState
    ? cities.filter((city) => city.StateId === parseInt(selectedState))
    : cities;

  useEffect(() => {
    if (newItemRef.current) {
      newItemRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [cities]);

  return (
    <DefaultLayout>
      <div className="bg-white w-full p-6">
        <div className="bg-slate-100 p-4 rounded-md relative">
          <div className="absolute top-4 right-4">
            <select
              value={
                editIndex !== null
                  ? cities[editIndex].StateId.toString()
                  : selectedState
              }
              onChange={(e) => setSelectedState(e.target.value)}
              className="outline-none px-4 py-2 w-48 border border-gray-300 rounded-md transition-all duration-300 hover:border-blue-500 hover:shadow-lg bg-white"
            >
              <option value="">All States</option>
              {states.map((state) => (
                <option key={state.StateId} value={state.StateId.toString()}>
                  {state.StateName}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col items-center pt-16">
            <input
              value={newCity}
              onChange={(e) => setNewCity(e.target.value)}
              className="outline-none px-4 py-2 mb-2 w-full max-w-xs border border-gray-300 rounded-md transition-all duration-300 hover:border-blue-500 hover:shadow-lg bg-white"
              type="text"
              placeholder="Enter City Name"
            />
            <div className="flex gap-4 mt-4">
              <button
                onClick={editIndex === null ? handleAddCity : handleSaveEdit}
                className="bg-[#1967d2] h-12 px-6 text-white rounded-md transition-transform duration-300 transform hover:scale-105 hover:bg-[#0f56a4]"
              >
                {editIndex === null ? 'Add City' : 'Save Changes'}
              </button>
              {editIndex !== null && (
                <button
                  onClick={handleCancelEdit}
                  className="bg-red-500 h-12 px-6 text-white rounded-md transition-transform duration-300 transform hover:scale-105 hover:bg-red-700"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="AddedContent mt-10 overflow-x-auto">
          <table className="w-full border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-6 py-3 text-left border-b">City Name</th>
                <th className="px-6 py-3 text-left border-b">State</th>
                <th className="px-6 py-3 text-left border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCities.map((city, index) => (
                <tr
                  key={city.CityId}
                  ref={index === highlightIndex ? newItemRef : null}
                  className={`transition-colors duration-300 ${index === highlightIndex ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                >
                  <td className="px-6 py-3 border-b">{city.CityName}</td>
                  <td className="px-6 py-3 border-b">
                    {
                      states.find((state) => state.StateId === city.StateId)
                        ?.StateName
                    }
                  </td>
                  <td className="px-6 py-3 border-b flex justify-center items-center">
                    <img
                      src={EditIcon}
                      alt="Edit"
                      className="w-6 h-6 cursor-pointer transition-transform duration-300 hover:scale-110 mr-4"
                      onClick={() => handleEditCity(index)}
                    />
                    <img
                      src={DeleteIcon}
                      alt="Delete"
                      className="w-6 h-6 cursor-pointer transition-transform duration-300 hover:scale-110"
                      onClick={() => handleDeleteCity(index)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default CityComponent;

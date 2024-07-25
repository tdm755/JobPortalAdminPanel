import React, { useState, useRef, useEffect } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import DeleteIcon from '../../images/icon/DeleteIcon.svg';
import EditIcon from '../../images/icon/EditIcon.svg';
import { addCity, getAllCities, updateCity, deleteCity, getAllStates } from '../../api/api';
import PopupCard from '../../utils/PopupCard';
import Pagination from '../../components/Pagination'
import { toast } from 'react-toastify';

function CityComponent() {
    const [cities, setCities] = useState([]);
    const [states, setStates] = useState([]);
    const [newCity, setNewCity] = useState({ CityName: '', StateId: '' });
    const [editIndex, setEditIndex] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [cityToDelete, setCityToDelete] = useState(null);
    const [highlightedCityId, setHighlightedCityId] = useState(null);
    const [selectedState, setSelectedState] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;
    const topRef = useRef(null);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (highlightedCityId !== null) {
            const highlightedElement = document.getElementById(`city-${highlightedCityId}`);
            if (highlightedElement) {
                highlightedElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                setTimeout(() => {
                    setHighlightedCityId(null);
                }, 3000);
            }
        }
    }, [highlightedCityId]);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const [citiesResponse, statesResponse] = await Promise.all([
                getAllCities(),
                getAllStates()
            ]);
            setCities(citiesResponse?.data?.cities || []);
            setStates(statesResponse?.data?.states || []);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Failed to fetch data. Please try again later.');
            setCities([]);
            setStates([]);
        } finally {
            setIsLoading(false);
        }
    };

    const capitalizeWords = (string) => {
      return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    };
    
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      let processedValue = value;
      if (name === 'CityName') {
        processedValue = capitalizeWords(value);
      }
      setNewCity(prev => ({ ...prev, [name]: processedValue }));
    };

    const validateCity = () => {
        if (!newCity.CityName.trim()) {
            setError('City Name is required.');
            return false;
        }
        if (!newCity.StateId) {
            setError('State is required.');
            return false;
        }
        return true;
    };

    const handleAddCity = async () => {
        if (!validateCity()) return;

        try {
            setError(null);
            const response = await addCity(newCity);
            const addedCity = response?.data?.city;
            if (addedCity) {
                setCities(prevCities => [...prevCities, addedCity]);
                setNewCity({ CityName: '', StateId: '' });
                setHighlightedCityId(addedCity.CityId);
                toast.success('City added successfully!');
            } else {
                toast.error(response.message || 'Failed to add city. Please try again.');
            }
        } catch (error) {
            console.error('Error adding city:', error);
            toast.error(error.response?.data?.message || 'Failed to add city. Please try again.');
        }
    };

    const handleDeleteConfirmation = (CityId) => {
        setCityToDelete(CityId);
        setShowDeleteConfirmation(true);
    };
    
    const handleDeleteCity = async () => {
        if (!cityToDelete) return;
    
        try {
            setError(null);
            await deleteCity(cityToDelete);
            setCities(prevCities => prevCities.filter(city => city.CityId !== cityToDelete));
            setShowDeleteConfirmation(false);
            setCityToDelete(null);
            toast.success('City deleted successfully!');
        } catch (error) {
            console.error('Error deleting city:', error);
            toast.error(error.response?.data?.message || 'Failed to delete city. Please try again.');
        }
    };

    const handleEditCity = (index) => {
      setEditIndex(index);
      setNewCity(cities[index]);
      if (topRef.current) {
          topRef.current.scrollIntoView({ behavior: 'smooth' });
      }
  };

    const handleSaveEdit = async () => {
        if (!validateCity()) return;
    
        try {
            setError(null);
            const response = await updateCity(newCity.CityId, newCity);
            const updatedCity = response?.data?.city;
            if (updatedCity) {
                setCities(prevCities => prevCities.map(city => 
                    city.CityId === updatedCity.CityId ? updatedCity : city
                ));
                setEditIndex(null);
                setNewCity({ CityName: '', StateId: '' });
                setHighlightedCityId(updatedCity.CityId);
                toast.success('City updated successfully!');
            } else {
                toast.error(response.message || 'Failed to update city. Please try again.');
            }
        } catch (error) {
            console.error('Error updating city:', error);
            toast.error(error.response?.data?.message || 'Failed to update city. Please try again.');
        }
    };

    const handleCancelEdit = () => {
        setEditIndex(null);
        setNewCity({ CityName: '', StateId: '' });
        setError(null);
    };

    if (isLoading) {
        return <DefaultLayout><div>Loading...</div></DefaultLayout>;
    }

    

    const filteredCities = selectedState
        ? cities.filter((city) => city.StateId === parseInt(selectedState))
        : cities;

        const totalPages = Math.ceil(filteredCities.length / itemsPerPage);

        const handlePageChange = (page) => {
            setCurrentPage(page);
        };
    
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = filteredCities.slice(indexOfFirstItem, indexOfLastItem);
    return (
        <DefaultLayout>
           <div className='bg-white w-full p-6' ref={topRef}>
    {error && <div className="text-red-500 mb-4">{error}</div>}
    <div className="flex flex-col items-center bg-slate-100 p-4 rounded-md">
        <div className="grid gap-4 w-full max-w-4xl sm:grid-cols-1 md:grid-cols-2">
            <input
                name="CityName"
                value={newCity.CityName}
                onChange={handleInputChange}
                className='w-full outline-none px-4 py-2 border border-gray-300 rounded-md transition-all duration-300 hover:border-blue-500 hover:shadow-lg'
                type="text"
                placeholder="Enter City Name"
            />
            <select
                name="StateId"
                value={newCity.StateId}
                onChange={handleInputChange}
                className='w-full outline-none px-4 py-2 border border-gray-300 rounded-md transition-all duration-300 hover:border-blue-500 hover:shadow-lg'
            >
                <option value="">Select State</option>
                {states.map((state) => (
                    <option key={state.StateId} value={state.StateId}>
                        {state.StateName}
                    </option>
                ))}
            </select>
        </div>
        <div className="flex flex-wrap gap-4 mt-4">
                <button
                    onClick={editIndex === null ? handleAddCity : handleSaveEdit}
                    className='bg-[#1967d2] h-12 px-6 text-white rounded-md transition-transform duration-300 transform hover:scale-105 hover:bg-[#0d47a1] hover:shadow-lg'
                >
                    {editIndex === null ? 'Add City' : 'Save Changes'}
                </button>
                {editIndex !== null && (
                    <button
                        onClick={handleCancelEdit}
                        className='bg-red-500 h-12 px-6 text-white rounded-md transition-transform duration-300 transform hover:scale-105 hover:bg-red-700 hover:shadow-lg'
                    >
                        Cancel
                    </button>
                )}
            </div>
        </div>
                <div className="mt-4">
                    <select
                        value={selectedState}
                        onChange={(e) => setSelectedState(e.target.value)}
                        className="outline-none px-4 py-2 w-48 border border-gray-300 rounded-md transition-all duration-300 hover:border-blue-500 hover:shadow-lg bg-white"
                    >
                        <option value="">All States</option>
                        {states.map((state) => (
                            <option key={state.StateId} value={state.StateId}>
                                {state.StateName}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="AddedContent mt-10 overflow-x-auto">
                    {filteredCities.length > 0 ? (
                      <>
                        <table className='w-full border-collapse min-w-[600px]'>
                            <thead>
                                <tr className='bg-gray-200'>
                                    <th className='px-6 py-3 text-left border-b'>Sr. No.</th>
                                    <th className='px-6 py-3 text-left border-b'>City Name</th>
                                    <th className='px-6 py-3 text-left border-b'>State</th>
                                    <th className='px-6 py-3 text-left border-b'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems
                                    .sort((a, b) => a.CityName.localeCompare(b.CityName))
                                    .map((city, index) => {
                                        const stateObj = states.find(state => state.StateId === parseInt(city.StateId));
                                        const serialNumber = indexOfFirstItem + index + 1;
                                        return (
                                            <tr
                                                key={city.CityId}
                                                id={`city-${city.CityId}`}
                                                className={`transition-colors duration-300 ${city.CityId === highlightedCityId ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                                            >
                                                <td className='px-6 py-3 border-b'>{serialNumber}</td>
                                                <td className='px-6 py-3 border-b'>{city.CityName}</td>
                                                <td className='px-6 py-3 border-b'>{stateObj ? stateObj.StateName : 'Unknown'}</td>
                                                <td className='px-6 py-3 border-b flex justify-center items-center'>
                                                    <img
                                                        src={EditIcon}
                                                        alt="Edit"
                                                        className='w-6 h-6 cursor-pointer transition-transform duration-300 hover:scale-110 mr-4'
                                                        onClick={() => handleEditCity(indexOfFirstItem + index)}
                                                    />
                                                    <img
                                                        src={DeleteIcon}
                                                        alt="Delete"
                                                        className='w-6 h-6 cursor-pointer transition-transform duration-300 hover:scale-110'
                                                        onClick={() => handleDeleteConfirmation(city.CityId)}
                                                    />
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                        <Pagination
                          currentPage={currentPage}
                          totalPages={totalPages}
                          onPageChange={handlePageChange}
                          itemsPerPage={itemsPerPage}
                          totalItems={filteredCities.length}
                        />
                    </>
                    ) : (
                        <div className="text-center py-4">No cities found. Add a new city to get started.</div>
                    )}
                </div>
            </div>
            {showDeleteConfirmation && (
                <PopupCard
                    icon={<span className="text-5xl">⚠️</span>}
                    heading="Warning: Confirm Deletion"
                    description="Are you sure you want to delete this city? This action cannot be undone."
                    buttons={[
                        {
                            text: "Delete",
                            primary: true,
                            onClick: handleDeleteCity
                        },
                        {
                            text: "Cancel",
                            primary: false,
                            onClick: () => setShowDeleteConfirmation(false)
                        }
                    ]}
                    onClose={() => setShowDeleteConfirmation(false)}
                    headingColor="text-red-600"
                    headingHoverColor="hover:text-red-700"
                    descriptionColor="text-gray-700"
                    descriptionHoverOpacity="hover:opacity-90"
                    primaryButtonColor="bg-red-500"
                    primaryButtonHoverColor="hover:bg-red-600"
                    primaryButtonFocusRingColor="focus:ring-red-500"
                    secondaryButtonColor="bg-gray-300"
                    secondaryButtonTextColor="text-gray-800"
                    secondaryButtonHoverColor="hover:bg-gray-400"
                    secondaryButtonFocusRingColor="focus:ring-gray-500"
                />
            )}
        </DefaultLayout>
    );
}

export default CityComponent;
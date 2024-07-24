import { useEffect, useState } from 'react';
import React from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import { API_BASE_URL } from '../../../api/api';


const locations = [
  {
    id: 1,
    name: 'Mumbai, Maharashtra',
    image: '',
    vacancy: 170,
    companies: 720,
  },
  {
    id: 2,
    name: 'Bangalore, Karnataka',
    image: '',
    vacancy: 75,
    companies: 30,
  },
  {
    id: 3,
    name: 'Delhi',
    image: '',
    vacancy: 45,
    companies: 120,
  },
  {
    id: 4,
    name: 'Hyderabad, Telangana',
    image: '',
    vacancy: 60,
    companies: 460,
  },
];





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




const JobCard = ({ location, imageSrc, onImageChange, states, cities }) => {

  function handleChangeState(e) {
    let Val = e.target.value;  
    setStateId(Val);  
    console.log(Val);
  }

  const [stateId, setStateId] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);

  useEffect(()=>{
    const filtered = ()=>{
      return cities && stateId ? cities.filter((item)=>{
                return item.StateId === parseInt(stateId);
              }) : [];
    }
    setFilteredCities(filtered)
  }, [stateId, cities])



  return( <div className="">
    <div className="mb-3">
      <FileInput onChange={(e) => onImageChange(e, location.id)} />
    </div>
    <div className="bg-white rounded-lg overflow-hidden shadow-lg">
      <div
        className="border border-[#e0e6f7] rounded-md p-3 m-3 h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageSrc || location.image})` }}
      />
      <div className="p-4 flex flex-col">
        <select onChange={handleChangeState} className='border mb-4' name="" id="">          
           <option >select state</option>
           {states ? states.map((item)=>{
            return <option value={item.StateId}>{item.StateName}</option>
           }) : ''}

        </select>
        <select className='border mb-4' name="" id="">          
          <option >select city</option>
          {filteredCities ? filteredCities.map((item)=>{
            return <option value={item.CityName}>{item.CityName}</option>
          }) : ''}
        </select>
        <p className="text-gray-600">
          <span className="font-semibold text-blue-600">{location.vacancy} Vacancy</span>
          <span className="float-right text-gray-500">{location.companies} companies</span>
        </p>
      </div>
    </div>
  </div>
  )
};

const UpdateLocation = () => {

  const [imageSrcs, setImageSrcs] = useState({});




  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(()=>{
  async function fetchStateDetails() {
    try {
      const response = await fetch(`${API_BASE_URL}/states`);
      const data = await response.json();
      setStates(data.data.states);
      // console.log(data.data.states);
    } catch (error) {
      console.log(error);
    }
  }
  fetchStateDetails();
}, [])

useEffect(()=>{
  async function fetchCityDetails() {
    try {
      const response = await fetch(`${API_BASE_URL}/cities`);
      const data = await response.json();
      setCities(data.data.cities);
      console.log(data.data.cities);
    } catch (error) {
      console.log(error);
    }
  }
  fetchCityDetails();
}, [])




  const handleImageChange = (event, id) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrcs(prev => ({ ...prev, [id]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };



  return (
    <DefaultLayout>
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-2">Jobs by Location</h1>
      <p className="text-xl text-gray-600 text-center mb-8">
        Find your favourite jobs and get the benefits of yourself
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-2 tabOut:grid-cols-3 tabUlu:grid-cols-4 gap-6">

        {locations.map((location, index) => (

          <JobCard
            key={location.id}
            states={states}
            cities={cities}
            location={location}
            imageSrc={imageSrcs[location.id]}
            onImageChange={handleImageChange}
          />
        ))}

      </div>
    <div className="Changes flex justify-end gap-3 mt-10">
        <button className="BTNToAddColumn inline-flex items-center justify-center bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10" >
          Save Changes
        </button>
    </div>
    </div>
  </DefaultLayout>
  );
};

export default UpdateLocation;
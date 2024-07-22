import { useState } from 'react';
import React from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';


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
    <div className="flex items-center space-x-4 border p-0.5 rounded-md w-72">
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





const JobCard = ({ location, imageSrc, onImageChange }) => (
  <div className="">
    <div className="mb-3">
      <FileInput onChange={(e) => onImageChange(e, location.id)} />
    </div>
    <div className="bg-white rounded-lg overflow-hidden shadow-lg">
      <div
        className="border border-[#e0e6f7] rounded-md p-3 m-3 h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${imageSrc || location.image})` }}
      />
      <div className="p-4">
        <select name="" id="">
          <option >select location</option>

        </select>
        <p className="text-gray-600">
          <span className="font-semibold text-blue-600">{location.vacancy} Vacancy</span>
          <span className="float-right text-gray-500">{location.companies} companies</span>
        </p>
      </div>
    </div>
  </div>
);

const UpdateLocation = () => {

  const [imageSrcs, setImageSrcs] = useState({});

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {locations.map((location, index) => (

          <JobCard
            key={location.id}
            location={location}
            imageSrc={imageSrcs[location.id]}
            onImageChange={handleImageChange}
          />
        ))}

      </div>
    </div>
  </DefaultLayout>
  );
};

export default UpdateLocation;
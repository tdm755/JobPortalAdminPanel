import React, { useEffect, useState } from 'react'
import DefaultLayout from '../../../layout/DefaultLayout'
import './EmployerProfile.css';
import { useParams } from 'react-router-dom';

function EmployerProfile() {

  const {profileId} = useParams();
  


  const baseUrl = `http://localhost:5000/api/admin/employers/profile/${profileId}`;


  const [EmpData, setEmpData] = useState({});


  useEffect(()=>{
    async function fetchData() {
     try {
        const response = await fetch(baseUrl);
        const data = await response.json();
        setEmpData(data.data.employerProfile);
        console.log(data.message);
     } catch (error) {
      console.log('Error : ', error);
     }
    }
    fetchData();
  },[])



  function handleInputChange(e) {
    let Val = e.target.value;
    setEmpData((PreVal)=>{
      return {...PreVal, [e.target.name] : Val};
    })
  }

  console.log(EmpData);

  
  
  return (
    <DefaultLayout>
      <form action="">

        <div className="EmpProf max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4 sm:p-6">
            <h1 className='text-black font-bold mb-10 text-2xl'>Employer Details</h1>

            <div className="flex flex-wrap gap-5 Details">
              <div className="w-60 h-12 relative flex rounded-xl">
                <input
                  required
                  className=" peer w-full bg-transparent outline-none px-4 text-base rounded-xl bg-white border border-[#1967d2] focus:shadow-md"
                  id="company_name"
                  type="text"
                  name='company_name'
                  value={EmpData.company_name || ""}
                  onChange={(e)=>{handleInputChange(e)}}
                />
                <label
                  className=" absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
                >
                  Company Name
                </label>
              </div>

              <div className="w-60 h-12 relative flex rounded-xl">
                <input
                  required
                  className="peer w-full bg-transparent outline-none px-4 text-base rounded-xl bg-white border border-[#1967d2] focus:shadow-md"
                  id="phone"
                  type="text"
                  name='phone_number'
                  value={EmpData.phone_number|| ""}
                  onChange={(e)=>{handleInputChange(e)}}
                />
                <label
                  className="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
                >
                  Phone
                </label>
              </div>

              <div className="w-60 h-12 relative flex rounded-xl">
                <input
                  required
                  className="peer w-full bg-transparent outline-none px-4 text-base rounded-xl bg-white border border-[#1967d2] focus:shadow-md"
                  id="email"
                  type="email"
                  name='email'
                  value={EmpData.email || ""}
                  onChange={(e)=>{handleInputChange(e)}}
                />
                <label
                  className="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
                >
                  Email Address
                </label>
              </div>

              <div className="w-60 h-12 relative flex rounded-xl">
                <input
                  required
                  className="peer w-full bg-transparent outline-none px-4 text-base rounded-xl bg-white border border-[#1967d2] focus:shadow-md"
                  id="website"
                  type="text"
                  name='company_website'
                  value={EmpData.company_website || ""}
                  onChange={(e)=>{handleInputChange(e)}}
                 
                />
                <label
                  className="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
                >
                  Website
                </label>
              </div>

              <div className="w-60 h-12 relative flex rounded-xl">
                <input
                  required
                  className="peer w-full bg-transparent outline-none px-4 text-base rounded-xl bg-white border border-[#1967d2] focus:shadow-md"
                  id="employees"
                  type="text"
                  name='staffSize'
                  value={EmpData.staffSize || ""}
                  onChange={(e)=>{handleInputChange(e)}}
                />
                <label
                  className="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
                >
                  Number Of Employees
                </label>
              </div>

              <div className="w-60 h-12 relative flex rounded-xl">
                <input
                  required
                  className="peer w-full bg-transparent outline-none px-4 text-base rounded-xl bg-white border border-[#1967d2] focus:shadow-md"
                  id="country"
                  type="text"
                  name='country'
                  value={EmpData.country || ""}
                  onChange={(e)=>{handleInputChange(e)}}
                />
                <label
                  className="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
                >
                  Country
                </label>
              </div>

              <div className="w-60 h-12 relative flex rounded-xl">
                <input
                  required
                  className="peer w-full bg-transparent outline-none px-4 text-base rounded-xl bg-white border border-[#1967d2] focus:shadow-md"
                  id="city"
                  type="text"
                  name='city'
                  value={EmpData.city || ""}
                  onChange={(e)=>{handleInputChange(e)}}
                  
                />
                <label
                  className="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
                >
                  City
                </label>
              </div>

              <div className="w-60 h-12 relative flex rounded-xl">
                <input
                  required
                  className="peer w-full bg-transparent outline-none px-4 text-base rounded-xl bg-white border border-[#1967d2] focus:shadow-md"
                  id="pincode"
                  type="text"
                  name='pincode'
                  value={EmpData.pincode || ""}
                  onChange={(e)=>{handleInputChange(e)}}
                />
                <label
                  className="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
                >
                  Pincode
                </label>
              </div>

              <div className="w-60 h-12 relative flex rounded-xl">
                <input
                  required
                  className="peer w-full bg-transparent outline-none px-4 text-base rounded-xl bg-white border border-[#1967d2] focus:shadow-md"
                  id="estSince"
                  type="text"
                  name='estSince'
                  value={EmpData.estSince || ""}
                  onChange={(e)=>{handleInputChange(e)}}
                />
                <label
                  className="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
                >
                  Est. Since
                </label>
              </div>

              <div className="w-60 h-12 relative flex rounded-xl">
                <input
                  required
                  className="peer w-full bg-transparent outline-none px-4 text-base rounded-xl bg-white border border-[#1967d2] focus:shadow-md"
                  id="full_address"
                  type="text"
                  name='full_address'
                  value={EmpData.full_address || ""}
                  onChange={(e)=>{handleInputChange(e)}}
                />
                <label
                  className="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
                >
                  Full Address
                </label>
              </div>

              <div className="w-full relative flex rounded-xl">
                <textarea
                  required
                  className="peer w-full bg-transparent outline-none px-4 py-2 text-base rounded-xl bg-white border border-[#1967d2] focus:shadow-md"
                  id="description"
                  rows="3"
                  name='description'
                  value={EmpData.description || ""}
                  onChange={(e)=>{handleInputChange(e)}}
                >

                </textarea>
                <label
                  className="absolute top-2 bg-white left-4 px-2 peer-focus:top-[-10px] peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:top-[-10px] peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
                >
                  Description
                </label>
              </div>
            </div>
          </div>

          <div className="mt-18 p-4 sm:p-6 panel panel-default">
            <div className="panel-heading wt-panel-heading p-a20">
              <h4 className="text-2xl mb-10 font-bold text-black">Social Network</h4>
            </div>
            <div className="panel-body wt-panel-body p-a20">

              <div className="flex gap-5 row">
                <div className="w-60 h-12 relative flex rounded-xl">
                  <input
                    required
                    className="peer w-full bg-transparent outline-none px-4 text-base rounded-xl bg-white border border-[#1967d2] focus:shadow-md"
                    id="linkedin"
                    type="text"
                    name="linkedin"
                    value={EmpData.linkedin || ""}
                    onChange={(e)=>{handleInputChange(e)}}
                  />
                  <label
                    className="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
                  >
                    LinkedIn
                  </label>
                </div>

                <div className="w-60 h-12 relative flex rounded-xl">
                  <input
                    required
                    className="peer w-full bg-transparent outline-none px-4 text-base rounded-xl bg-white border border-[#1967d2] focus:shadow-md"
                    id="github"
                    type="text"
                    name="github"
                    value={EmpData.github || ""}
                    onChange={(e)=>{handleInputChange(e)}}
                  />
                  <label
                    className="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
                  >
                    GitHub
                  </label>
                </div>

                <div className="w-60 h-12 relative flex rounded-xl">
                  <input
                    required
                    className="peer w-full bg-transparent outline-none px-4 text-base rounded-xl bg-white border border-[#1967d2] focus:shadow-md"
                    id="instagram"
                    type="text"
                    name="instagram"
                  value={EmpData.instagram || ""}
                  onChange={(e)=>{handleInputChange(e)}}
                  />
                  <label
                    className="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
                  >
                    Instagram
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

    </DefaultLayout>
  )
}

export default EmployerProfile

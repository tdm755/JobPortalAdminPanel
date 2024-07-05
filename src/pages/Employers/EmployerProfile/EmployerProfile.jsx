import React, { useEffect } from 'react'
import DefaultLayout from '../../../layout/DefaultLayout'
import './EmployerProfile.css';
import { useParams } from 'react-router-dom';

function EmployerProfile() {

  const {profileId} = useParams();


  const baseUrl = `http://localhost:5000/api/admin/employers/profile/${profileId}`;

  useEffect(()=>{
    async function fetchData() {
      const response = await fetch(baseUrl);
      const data = await response.json();
      console.log(data);
    }
    fetchData();
  },[])

  // console.log(id);
  
  return (
    <DefaultLayout>
      <form action="">

        <div className="EmpProf max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4 sm:p-6">
            <h1 className='mb-10 text-2xl'>Employer Details</h1>

            <div className="flex flex-wrap gap-5 Details">
              <div className="w-60 h-12 relative flex rounded-xl">
                <input
                  required
                  className="peer w-full bg-transparent outline-none px-4 text-base rounded-xl bg-white border border-[#1967d2] focus:shadow-md"
                  id="company_name"
                  type="text"
                />
                <label
                  className="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
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
                ></textarea>
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
              <h4 className="text-2xl mb-10 text-black">Social Network</h4>
            </div>
            <div className="panel-body wt-panel-body p-a20">

              <div className="flex gap-5 row">
                <div className="w-60 h-12 relative flex rounded-xl">
                  <input
                    required
                    className="peer w-full bg-transparent outline-none px-4 text-base rounded-xl bg-white border border-[#1967d2] focus:shadow-md"
                    id="linkedin"
                    name="linkedin"
                    type="text"
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
                    name="github"
                    type="text"
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
                    name="instagram"
                    type="text"
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

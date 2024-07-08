import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import DefaultLayout from '../../layout/DefaultLayout.js'
import viewIcon from '../../images/icon/viewEyeIcon.svg'
import deleteIcon from '../../images/icon/DeleteIcon.svg'
import { fetchEmployersData } from '../../api/api.js'

import './EmployerTable.css';

function EmployerCards() {

  const [employers, setEmployers] = useState([]);
  // const baseUrl = `http://localhost:5000/api/admin/employers`;

  useEffect(() => {    
    fetchEmployersData(setEmployers);
  }, [])



  return (
    <DefaultLayout>
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
            All Employers
          </h1>
          <div className="flex flex-col sm:flex-row justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <span>Show</span>
              <select className="border rounded px-2 py-1">
                <option>5</option>
              </select>
              <span>entries</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>Search:</span>
              <input type="text" className="border rounded px-2 py-1 flex-grow" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left"> id </th>
                  <th className="px-4 py-2 text-left">Company Name</th>
                  <th className="px-4 py-2 text-left">Email Id</th>
                  <th className="px-4 py-2 text-left">Website Link</th>
                  <th className="px-4 py-2 text-left">Phone Number</th>
                  <th className="px-4 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>


                {employers.map((employer) => {
                  return <tr key={employer.EmployerProfile.eid} className="border-b">
                    <td className="px-4 py-2">{employer.EmployerProfile.eid}</td>
                    <td className="px-4 py-2">
                      <div className="flex items-center">
                        <div>
                          <div className="font-medium text-[#1967d2]">{employer.EmployerProfile.company_name}</div>
                          <div className="text-xs sm:text-sm text-gray-500">
                            {employer.EmployerProfile.city}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2">{employer.email}</td>
                    <td className="px-4 py-2 text-sm">
                      {employer.EmployerProfile.company_website}
                    </td>
                    <td className="px-4 py-2">
                      <span className="px-2 py-1 text-xs leading-4 font-semibold rounded-full">
                        {employer.EmployerProfile.phone_number}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex space-x-2 sm:space-x-3">

                        <Link to={`/viewandeditdetails/${employer.EmployerProfile.eid}`}>
                          <button  className=" bg-gray hover:bg-[#e2ebf4] p-1 rounded-md">
                            <img className='w-5' src={viewIcon} alt="" />
                          </button>
                        </Link>

                        <button className=" bg-gray hover:bg-[#e2ebf4] py-1 px-2 rounded-md"><img className='w-4' src={deleteIcon} alt="" /></button>

                      </div>
                    </td>
                  </tr>
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DefaultLayout>

  )
}

export default EmployerCards

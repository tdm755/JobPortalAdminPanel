import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DefaultLayout from '../../layout/DefaultLayout.js'
import viewIcon from '../../images/icon/viewEyeIcon.svg'
import deleteIcon from '../../images/icon/DeleteIcon.svg'
// import './EmployerTable.css';
import { fetchCandidateData } from '../../api/api.js'

function CandidateDetails() {


  const [candidates, setCandidates] = useState([]);

  useEffect(() => {    
    fetchCandidateData(setCandidates);
  }, []);


  return (
    <DefaultLayout>
      <>
      {/* <form action="#">
 
      </form> */}
        <div className="text-black max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 sm:p-6">
          <h1 className="Titles text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
            All Candidates
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
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email Id</th>
                <th className="px-4 py-2 text-left">Qualification</th>
                <th className="px-4 py-2 text-left">Phone Number</th>
                <th className="px-4 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>


            
              {candidates.map((candidate) => (
                  <tr key={candidate.CandidateProfile.cid} className="border-b">
                  <td className="px-4 py-2">{candidate.CandidateProfile.cid}</td>
                  <td className="px-4 py-2">
                    <div className="flex items-center">                  
                      <div>
                        <div className="font-medium text-[#1967d2]">{candidate.CandidateProfile.candidate_name}</div>
                        <div className="text-xs sm:text-sm text-gray-500">
                          {candidate.CandidateProfile.city}
                        </div>
                      </div>
                    </div>
                  </td>              
                  <td className="px-4 py-2">{candidate.email}</td>
                  <td className="px-4 py-2 text-sm">
                    {candidate.CandidateProfile.qualification}     
                  </td>
                  <td className="px-4 py-2">
                    <span className="px-2 py-1 text-xs leading-4 font-semibold rounded-full">
                      {candidate.CandidateProfile.phone_number}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex space-x-2 sm:space-x-3">
                      <Link to={`/viewandeditdetailsofcandidate/${candidate.CandidateProfile.cid}`}>
                      <button 
                        className=" bg-gray hover:bg-[#e2ebf4] p-1 rounded-md">
                        <img className='w-5' src={viewIcon} alt="" />
                      </button>
                      </Link>

                      <button className=" bg-gray hover:bg-[#e2ebf4] py-1 px-2 rounded-md"><img className='w-4' src={deleteIcon} alt=""/></button>
                    </div>
                  </td>
                </tr>
              ))}



              </tbody>
            </table>
          </div>
        </div>
        </div>
      </>
    </DefaultLayout>
  
  )
}

export default CandidateDetails

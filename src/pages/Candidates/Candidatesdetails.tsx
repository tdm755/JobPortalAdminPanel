import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DefaultLayout from '../../layout/DefaultLayout.js'
import viewIcon from '../../images/icon/viewEyeIcon.svg'
import deleteIcon from '../../images/icon/DeleteIcon.svg'
// import './EmployerTable.css';
import { fetchCandidateData } from '../../api/api.js'
import PopupCard from '../../utils/PopupCard.jsx'

function CandidateDetails() {
  const [candidates, setCandidates] = useState([]);
  const [totalCandidates, setTotalCandidates] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [sortOrder, setSortOrder] = useState('ASC');
  const [search, setSearch] = useState('');
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [candidateToDelete, setCandidateToDelete] = useState(null);
  
  useEffect(() => {    
    fetchCandidateData(setCandidates, setTotalCandidates, setTotalPages, sortOrder, search, currentPage, limit);
  }, [sortOrder, search, currentPage, limit]);

  const toggleSort = () => {
    setSortOrder(prevOrder => prevOrder === 'ASC' ? 'DESC' : 'ASC');
  };

  const getSortIndicator = () => {
    return sortOrder === 'ASC' ? ' ▲' : ' ▼';
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value));
    setCurrentPage(1); // Reset to first page when changing limit
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleDeleteClick = (candidate) => {
    setCandidateToDelete(candidate);
    setShowDeletePopup(true);
  };

  const handleConfirmDelete = () => {
    // Implement your delete logic here
    console.log(`Deleting candidate with ID: ${candidateToDelete.CandidateProfile.cid}`);
    setShowDeletePopup(false);
    setCandidateToDelete(null);
  };


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
              <select 
                className="border rounded px-2 py-1" 
                value={limit} 
                onChange={handleLimitChange}
              >
                <option value="1">1</option>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
              </select>
              <span>entries</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>Search:</span>
              <input type="text" className="border rounded px-2 py-1 flex-grow" value={search} onChange={handleSearch}/>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left cursor-pointer" onClick={toggleSort}>
                    id {getSortIndicator()}
                  </th>            
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

                      {/* <button className=" bg-gray hover:bg-[#e2ebf4] py-1 px-2 rounded-md"><img className='w-4' src={deleteIcon} alt=""/></button> */}
                      <button 
                  className="bg-gray hover:bg-[#e2ebf4] py-1 px-2 rounded-md"
                  onClick={() => handleDeleteClick(candidate)}
                >
                  <img className='w-4' src={deleteIcon} alt=""/>
                </button>
                    </div>
                  </td>
                </tr>
              ))}



              </tbody>
            </table>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div>
              Showing {(currentPage - 1) * limit + 1} to {Math.min(currentPage * limit, totalCandidates)} of {totalCandidates} entries
            </div>
            <div className="flex items-center">
              {totalPages > 1 && currentPage > 1 && (
                <button 
                  onClick={() => handlePageChange(currentPage - 1)} 
                  className="px-3 py-1 border rounded mr-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold transition duration-150 ease-in-out"
                >
                  Previous
                </button>
              )}
              {totalPages > 1 && (
                <span className="text-sm text-gray-700">{currentPage} of {totalPages}</span>
              )}
              {totalPages > 1 && currentPage < totalPages && (
                <button 
                  onClick={() => handlePageChange(currentPage + 1)} 
                  className="px-3 py-1 border rounded ml-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold transition duration-150 ease-in-out"
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
        </div>
      </>
      {showDeletePopup && (
      <PopupCard
        icon={<img src={deleteIcon} alt="Delete" className="w-8 h-8" />}
        heading="Confirm Deletion"
        description={`Are you sure you want to delete the candidate ${candidateToDelete.CandidateProfile.candidate_name}?`}
        buttons={[
          {
            text: "Cancel",
            primary: false,
            onClick: () => setShowDeletePopup(false)
          },
          {
            text: "Delete",
            primary: true,
            onClick: handleConfirmDelete
          }
        ]}
        onClose={() => setShowDeletePopup(false)}
        bgColor="bg-white"
        headingHoverColor="hover:text-red-600"
        descriptionColor="text-gray-700"
        descriptionHoverOpacity="hover:opacity-90"
        primaryButtonColor="bg-red-600"
        primaryButtonHoverColor="hover:bg-red-600"
        primaryButtonFocusRingColor="focus:ring-red-500"
        secondaryButtonColor="bg-gray-200"
        secondaryButtonTextColor="text-gray-700"
        secondaryButtonHoverColor="hover:bg-gray-300"
        secondaryButtonFocusRingColor="focus:ring-gray-400"
      />
    )}
    </DefaultLayout>
  
  )
}

export default CandidateDetails

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DefaultLayout from '../../layout/DefaultLayout.js'
import viewIcon from '../../images/icon/viewEyeIcon.svg'
import settingIcon from '../../images/icon/SettingIcon.svg'
import { fetchCandidateData, deactivateCandidate, activateCandidate, getCandidateStatus } from '../../api/api.js'
import PopupCard from '../../utils/PopupCard.jsx'
import Pagination from '../../components/Pagination.jsx'
import { toast } from 'react-toastify'

function CandidateDetails() {
  const [candidates, setCandidates] = useState([]);
  const [totalCandidates, setTotalCandidates] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [sortOrder, setSortOrder] = useState('ASC');
  const [search, setSearch] = useState('');
  const [showStatusPopup, setShowStatusPopup] = useState(false);
  const [candidateToToggle, setCandidateToToggle] = useState(null);
  const [candidateStatuses, setCandidateStatuses] = useState({});  
  
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
    setCurrentPage(1);
  };

  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    candidates.forEach(candidate => {
      fetchCandidateStatus(candidate.CandidateProfile.cid);
    });
  }, [candidates]);

  const fetchCandidateStatus = async (candidateId) => {
    try {
      const response = await getCandidateStatus(candidateId);
      setCandidateStatuses(prev => ({...prev, [candidateId]: response.data.data.isDeactive}));
    } catch (error) {
      console.error('Error fetching candidate status:', error);
    }
  };


  const handleStatusClick = async (candidate) => {
    setCandidateToToggle(candidate);
    setShowStatusPopup(true);
  };
  
  const handleConfirmStatusChange = async () => {
    if (!candidateToToggle) return;
  
    try {
      const currentStatus = candidateStatuses[candidateToToggle.CandidateProfile.cid];
      if (currentStatus) {
        await activateCandidate(candidateToToggle.CandidateProfile.cid);
        toast.success('Candidate activated successfully');
      } else {
        await deactivateCandidate(candidateToToggle.CandidateProfile.cid);
        toast.success('Candidate deactivated successfully');
      }
  
      fetchCandidateData(setCandidates, setTotalCandidates, setTotalPages, sortOrder, search, currentPage, limit);
      fetchCandidateStatus(candidateToToggle.CandidateProfile.cid);
      
      setShowStatusPopup(false);
      setCandidateToToggle(null);
    } catch (error) {
      console.error('Error changing candidate status:', error);
      toast.error('Failed to change candidate status. Please try again.');
    }
  };
  
  return (
    <DefaultLayout>
      <>
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
                    <th className="px-4 py-2 text-center">Current Status</th>
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
                            <button className="bg-gray hover:bg-[#e2ebf4] p-1 rounded-md">
                              <img className='w-5' src={viewIcon} alt="" />
                            </button>
                          </Link>
                          <button
                            className={`bg-gray hover:bg-[#e2ebf4] py-1 px-2 rounded-md ${
                              candidateStatuses[candidate.CandidateProfile.cid] ? 'text-red-500' : 'text-green-500'
                            }`}
                            onClick={() => handleStatusClick(candidate)}
                          >
                            <img className='w-4' src={settingIcon} alt="" />
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex items-center justify-center"> 
                          <span className={`text-sm ${
                            candidateStatuses[candidate.CandidateProfile.cid] ? 'text-red-500' : 'text-green-500'
                          }`}>
                            {candidateStatuses[candidate.CandidateProfile.cid] ? 'Deactivated' : 'Active'}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              itemsPerPage={limit}
              totalItems={totalCandidates}
            />
          </div>
        </div>
      </>
      {showStatusPopup && (
        <PopupCard
          icon={<img src={settingIcon} alt="Status" className="w-8 h-8" />}
          heading={`Confirm ${candidateStatuses[candidateToToggle?.CandidateProfile.cid] ? 'Activation' : 'Deactivation'}`}
          description={`Are you sure you want to ${candidateStatuses[candidateToToggle?.CandidateProfile.cid] ? 'activate' : 'deactivate'} the candidate ${candidateToToggle?.CandidateProfile.candidate_name}?`}
          buttons={[
            {
              text: "Cancel",
              primary: false,
              onClick: () => {
                setShowStatusPopup(false);
                setCandidateToToggle(null);
              }
            },
            {
              text: candidateStatuses[candidateToToggle?.CandidateProfile.cid] ? "Activate" : "Deactivate",
              primary: true,
              onClick: handleConfirmStatusChange,
            }
          ]}
          onClose={() => {
            setShowStatusPopup(false);
            setCandidateToToggle(null);
          }}
          bgColor="bg-white"
          headingHoverColor="hover:text-red-600"
          descriptionColor="text-gray-700"
          descriptionHoverOpacity="hover:opacity-90"
          primaryButtonColor={candidateStatuses[candidateToToggle?.CandidateProfile.cid] ? "bg-green-600" : "bg-red-600"}
          primaryButtonHoverColor={candidateStatuses[candidateToToggle?.CandidateProfile.cid] ? "hover:bg-green-700" : "hover:bg-red-700"}
          primaryButtonFocusRingColor={candidateStatuses[candidateToToggle?.CandidateProfile.cid] ? "focus:ring-green-500" : "focus:ring-red-500"}
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
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DefaultLayout from '../../layout/DefaultLayout.js'
import viewIcon from '../../images/icon/viewEyeIcon.svg'
import settingIcon from '../../images/icon/SettingIcon.svg'
import { fetchEmployersData, deactivateEmployer, activateEmployer, getEmployerStatus } from '../../api/api.js'
import PopupCard from '../../utils/PopupCard.jsx'
import { toast } from 'react-toastify'
import Pagination from '../../components/Pagination.jsx'

function EmployerCards() {
  const [employers, setEmployers] = useState([]);
  const [totalEmployers, setTotalEmployers] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [sortOrder, setSortOrder] = useState('ASC');
  const [search, setSearch] = useState('');
  const [showStatusPopup, setShowStatusPopup] = useState(false);
  const [employerToToggle, setEmployerToToggle] = useState(null);
  const [employerStatuses, setEmployerStatuses] = useState({});

  useEffect(() => {    
    fetchEmployersData(setEmployers, setTotalEmployers, setTotalPages, sortOrder, search, currentPage, limit);
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

  useEffect(() => {
    employers.forEach(employer => {
      fetchEmployerStatus(employer.EmployerProfile.eid);
    });
  }, [employers]);

  const fetchEmployerStatus = async (employerId) => {
    try {
      const response = await getEmployerStatus(employerId);
      setEmployerStatuses(prev => ({...prev, [employerId]: response.data.data.isDeactive}));
    } catch (error) {
      console.error('Error fetching employer status:', error);
    }
  };

  const handleStatusClick = async (employer) => {
    setEmployerToToggle(employer);
    setShowStatusPopup(true);
  };

  const handleConfirmStatusChange = async () => {
    if (!employerToToggle) return;

    try {
      const currentStatus = employerStatuses[employerToToggle.EmployerProfile.eid];
      if (currentStatus) {
        await activateEmployer(employerToToggle.EmployerProfile.eid);
        toast.success('Employer activated successfully');
      } else {
        await deactivateEmployer(employerToToggle.EmployerProfile.eid);
        toast.success('Employer deactivated successfully');
      }

      fetchEmployersData(setEmployers, setTotalEmployers, setTotalPages, sortOrder, search, currentPage, limit);
      fetchEmployerStatus(employerToToggle.EmployerProfile.eid);
      
      setShowStatusPopup(false);
      setEmployerToToggle(null);
    } catch (error) {
      console.error('Error changing employer status:', error);
      toast.error('Failed to change employer status. Please try again.');
    }
  };


  return (
    <DefaultLayout>
      <div className="text-black max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 sm:p-6">
          <h1 className="Titles text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
            All Employers
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
                  <th className="px-4 py-2 text-left">Company Name</th>
                  <th className="px-4 py-2 text-left">Email Id</th>
                  <th className="px-4 py-2 text-left">Website Link</th>
                  <th className="px-4 py-2 text-left">Phone Number</th>
                  <th className="px-4 py-2 text-left">Action</th>
                  <th className="px-4 py-2 text-left">Current Status</th>
                </tr>
              </thead>
              <tbody>
                {employers.map((employer) => (
                  <tr key={employer.EmployerProfile.eid} className="border-b">
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
                  <button className="bg-gray hover:bg-[#e2ebf4] p-1 rounded-md">
                    <img className='w-5' src={viewIcon} alt="" />
                  </button>
                </Link>
                <button
                  className={`bg-gray hover:bg-[#e2ebf4] py-1 px-2 rounded-md ${
                    employerStatuses[employer.EmployerProfile.eid] ? 'text-red-500' : 'text-green-500'
                  }`}
                  onClick={() => handleStatusClick(employer)}
                >
                  <img className='w-4' src={settingIcon} alt="" />
                </button>
              </div>
            </td>
            <td className="px-4 py-2">
              <div className="flex items-center justify-center"> 
                <span className={`text-sm ${
                  employerStatuses[employer.EmployerProfile.eid] ? 'text-red-500' : 'text-green-500'
                }`}>
                  {employerStatuses[employer.EmployerProfile.eid] ? 'Deactivated' : 'Active'}
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
              totalItems={totalEmployers}
            />
        </div>
      </div>
      {showStatusPopup && (
        <PopupCard
          icon={<img src={settingIcon} alt="Status" className="w-8 h-8" />}
          heading={`Confirm ${employerStatuses[employerToToggle?.EmployerProfile.eid] ? 'Activation' : 'Deactivation'}`}
          description={`Are you sure you want to ${employerStatuses[employerToToggle?.EmployerProfile.eid] ? 'activate' : 'deactivate'} the employer ${employerToToggle?.EmployerProfile.company_name}?`}
          buttons={[
            {
              text: "Cancel",
              primary: false,
              onClick: () => {
                setShowStatusPopup(false);
                setEmployerToToggle(null);
              }
            },
            {
              text: employerStatuses[employerToToggle?.EmployerProfile.eid] ? "Activate" : "Deactivate",
              primary: true,
              onClick: handleConfirmStatusChange,
            }
          ]}
          onClose={() => {
            setShowStatusPopup(false);
            setEmployerToToggle(null);
          }}
          bgColor="bg-white"
          headingHoverColor="hover:text-red-600"
          descriptionColor="text-gray-700"
          descriptionHoverOpacity="hover:opacity-90"
          primaryButtonColor={employerStatuses[employerToToggle?.EmployerProfile.eid] ? "bg-green-600" : "bg-red-600"}
          primaryButtonHoverColor={employerStatuses[employerToToggle?.EmployerProfile.eid] ? "hover:bg-green-700" : "hover:bg-red-700"}
          primaryButtonFocusRingColor={employerStatuses[employerToToggle?.EmployerProfile.eid] ? "focus:ring-green-500" : "focus:ring-red-500"}
          secondaryButtonColor="bg-gray-200"
          secondaryButtonTextColor="text-gray-700"
          secondaryButtonHoverColor="hover:bg-gray-300"
          secondaryButtonFocusRingColor="focus:ring-gray-400"
        />
      )}
    </DefaultLayout>
  )
}

export default EmployerCards
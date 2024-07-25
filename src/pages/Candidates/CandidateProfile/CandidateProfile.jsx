import React, { useEffect, useState } from 'react'
import DefaultLayout from '../../../layout/DefaultLayout'
// import './EmployerProfile.css';
import '../../../utils/utils.css'
import { useParams } from 'react-router-dom';
import removeUserIcon from '../../../../public/remove-user-24.svg'
import addUserIcon from '../../../../public/add-user-2-24.svg'
import { toast} from "react-toastify";
import { deactivateCandidate, activateCandidate, getCandidateStatus } from '../../../api/api' 
import { API_BASE_URL } from '../../../api/api';
import PopupCard from '../../../utils/PopupCard';
import settingIcon from '../../../images/icon/SettingIcon.svg'


function CandidateProfile() {

  const { profileId } = useParams();
  const [CanData, setCanData] = useState({});
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [showStatusPopup, setShowStatusPopup] = useState(false);

  const baseUrl = `${API_BASE_URL}/candidates/profile/${profileId}`;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(baseUrl);
        const data = await response.json();
        setCanData(data.data.candidateProfile);
        setRegisteredEmail(data.data.candidateProfile.Candidate.email);

        // Fetch the candidate's status
        const statusResponse = await getCandidateStatus(profileId);
        setIsActive(!statusResponse.data.data.isDeactive);
      } catch (error) {
        console.log('Error : ', error);
      }
    }
    fetchData();
  }, [])


  async function handleDeactivate(e) {
    e.preventDefault();
    setShowStatusPopup(true);
  }

  async function handleActivate(e) {
    e.preventDefault();
    setShowStatusPopup(true);
  }

  async function handleConfirmStatusChange() {
    try {
      if (isActive) {
        await deactivateCandidate(profileId);
        setIsActive(false);
        toast.success('Candidate deactivated successfully. An email has been sent to inform them of the deactivation.');
      } else {
        await activateCandidate(profileId);
        setIsActive(true);
        toast.success('Candidate activated successfully. An email has been sent to inform them of the activation.');
      }
    } catch (error) {
      console.error('Error changing candidate status:', error);
      toast.error(`Failed to ${isActive ? 'deactivate' : 'activate'} candidate`);
    }
  }

  async function HandlePostClick(e) {
    e.preventDefault();
    try {
      const response = await fetch(baseUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...CanData,
          registeredEmail: registeredEmail
        })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      toast.success('Profile Updated Successfully!')
      // const result = await response.json();
      // console.log(result);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  function handleInputChange(e) {
    let Val = e.target.value;
    setCanData((PreVal) => {
      return { ...PreVal, [e.target.name]: Val };
    })
  }

  function handleRegisteredEmailChange(e) {
    setRegisteredEmail(e.target.value);
  }

  function handleInputChangeForRegisEmail(e) {
    setCanData((PreVal) => {
      return { ...PreVal, Candidate: { ...PreVal.Candidate, email: e.target.value } }
    })
  }

  console.log(CanData);



  return (
    <DefaultLayout>
      <form action="">

        <div className="p-6 text-black EmpProf max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <h1 className='text-black font-bold mb-10 text-2xl Titles'>Candidate Details</h1>
          <div className="p-4 sm:p-6">

            <h1 className='Titles2  mb-10 font-bold text-black '>Personal Details</h1>



            <div className="UpperPart flex flex-col tabIn:flex-row mb-7 gap-12">

              <div class="shadow-3 h-50 w-55 px-6 py-8 sm:p-10 sm:pb-6">
                  <div className="grid items-center justify-center w-full grid-cols-1 text-left">
                  <img className='w-full h-full'  src={CanData.candidate_image ? `data:image/jpeg;base64,${CanData.candidate_image}` : ""} alt="Candidate" />
                  </div>
                </div>

              <div className=" flex flex-col gap-7 w-full  w-1/2  tabIn:gap-15 tabIn:mt-7 rightside">
                <div className="w-full h-12 relative flex  ">
                  <input
                    required
                    className="peer w-full bg-transparent outline-none px-4 text-lg  bg-white border border-[#64748b] focus:shadow-md"
                    id="registeredEmail"
                    type="email"
                    name='registeredEmail'
                    value={registeredEmail}
                    onChange={handleRegisteredEmailChange}
                  />
                  <label
                    className="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-lg peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
                  >
                    Registered Email Address
                  </label>
                </div>

                <div className="w-full h-12 relative flex ">
                  <input
                    required
                    className="peer w-full bg-transparent outline-none px-4 text-lg  bg-white border border-[#64748b] focus:shadow-md"
                    id="profileEmail"
                    type="email"
                    name='email'
                    value={CanData.email || ""}
                    onChange={handleInputChange}
                  />
                  <label
                    className="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-lg peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
                  >
                    Profile Email Address
                  </label>
                </div>
              </div>

            </div>



            <div className="flex flex-wrap gap-y-5 justify-between Details">
              <div className="w-full sm:w-[48%] tabIn:w-[32%] h-12 relative flex">
                <input
                  required
                  className=" peer w-full bg-transparent outline-none px-4 text-lg  bg-white border border-[#64748b] focus:shadow-md"
                  id="company_name"
                  type="text"
                  name='candidate_name'
                  value={CanData.candidate_name || ""}
                  onChange={(e) => { handleInputChange(e) }}
                />
                <label
                  className=" absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
                >
                  Candidate Name
                </label>
              </div>

              <div className="w-full sm:w-[48%] tabIn:w-[32%] h-12 relative flex">
                <input
                  required
                  className="peer w-full bg-transparent outline-none px-4 text-lg  bg-white border border-[#64748b] focus:shadow-md"
                  id="phone"
                  type="text"
                  name='phone_number'
                  value={CanData.phone_number || ""}
                  onChange={(e) => { handleInputChange(e) }}
                />
                <label
                  className="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
                >
                  Phone
                </label>
              </div>



              <div className="w-full sm:w-[48%] tabIn:w-[32%] h-12 relative flex">
                <input
                  required
                  className="peer w-full bg-transparent outline-none px-4 text-lg  bg-white border border-[#64748b] focus:shadow-md"
                  id="website"
                  type="text"
                  name='website'
                  value={CanData.website || ""}
                  onChange={(e) => { handleInputChange(e) }}

                />
                <label
                  className="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
                >
                  Website
                </label>
              </div>

              {/* <div className="w-full sm:w-[48%] tabIn:w-[32%] h-12 relative flex">
                <input
                  required
                  className="peer w-full bg-transparent outline-none px-4 text-lg  bg-white border border-[#64748b] focus:shadow-md"
                  id="employees"
                  type="text"
                  name='staffSize'
                  value={CanData.staffSize || ""}
                  onChange={(e)=>{handleInputChange(e)}}
                />
                <label
                  className="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
                >
                  Number Of Employees
                </label>
              </div> */}

              <div className="w-full sm:w-[48%] tabIn:w-[32%] h-12 relative flex">
                <input
                  required
                  className="peer w-full bg-transparent outline-none px-4 text-lg  bg-white border border-[#64748b] focus:shadow-md"
                  id="country"
                  type="text"
                  name='country'
                  value={CanData.country || ""}
                  onChange={(e) => { handleInputChange(e) }}
                />
                <label
                  className="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
                >
                  Country
                </label>
              </div>

              <div className="w-full sm:w-[48%] tabIn:w-[32%] h-12 relative flex">
                <input
                  required
                  className="peer w-full bg-transparent outline-none px-4 text-lg  bg-white border border-[#64748b] focus:shadow-md"
                  id="estSince"
                  type="text"
                  name='dob'
                  value={CanData.dob || ""}
                  onChange={(e) => { handleInputChange(e) }}
                />
                <label
                  className="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
                >
                  DOB
                </label>
              </div>

              <div className="w-full sm:w-[48%] tabIn:w-[32%] h-12 relative flex">
                <input
                  required
                  className="peer w-full bg-transparent outline-none px-4 text-lg  bg-white border border-[#64748b] focus:shadow-md"
                  id="estSince"
                  type="text"
                  name='experience'
                  value={CanData.experience || ""}
                  onChange={(e) => { handleInputChange(e) }}
                />
                <label
                  className="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
                >
                  Experience
                </label>
              </div>

              <div className="w-full sm:w-[48%] tabIn:w-[32%] h-12 relative flex">
                <input
                  required
                  className="peer w-full bg-transparent outline-none px-4 text-lg  bg-white border border-[#64748b] focus:shadow-md"
                  id="estSince"
                  type="text"
                  name='gender'
                  value={CanData.gender || ""}
                  onChange={(e) => { handleInputChange(e) }}
                />
                <label
                  className="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
                >
                  Gender
                </label>
              </div>

              <div className="w-full sm:w-[48%] tabIn:w-[32%] h-12 relative flex">
                <input
                  required
                  className="peer w-full bg-transparent outline-none px-4 text-lg  bg-white border border-[#64748b] focus:shadow-md"
                  id="estSince"
                  type="text"
                  name='jobCategory'
                  value={CanData.jobCategory || ""}
                  onChange={(e) => { handleInputChange(e) }}
                />
                <label
                  className="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
                >
                  Job Category
                </label>
              </div>

              <div className="w-full sm:w-[48%] tabIn:w-[32%] h-12 relative flex">
                <input
                  required
                  className="peer w-full bg-transparent outline-none px-4 text-lg  bg-white border border-[#64748b] focus:shadow-md"
                  id="estSince"
                  type="text"
                  name='jobrole'
                  value={CanData.jobrole || ""}
                  onChange={(e) => { handleInputChange(e) }}
                />
                <label
                  className="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
                >
                  Job Role
                </label>
              </div>

              <div className="w-full sm:w-[48%] tabIn:w-[32%] h-12 relative flex">
                <input
                  required
                  className="peer w-full bg-transparent outline-none px-4 text-lg  bg-white border border-[#64748b] focus:shadow-md"
                  id="estSince"
                  type="text"
                  name='qualification'
                  value={CanData.qualification || ""}
                  onChange={(e) => { handleInputChange(e) }}
                />
                <label
                  className="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
                >
                  Qualification
                </label>
              </div>

              <div className="w-full sm:w-[48%] tabIn:w-[32%] h-12 relative flex">
                <input
                  required
                  className="peer w-full bg-transparent outline-none px-4 text-lg  bg-white border border-[#64748b] focus:shadow-md"
                  id="city"
                  type="text"
                  name='city'
                  value={CanData.city || ""}
                  onChange={(e) => { handleInputChange(e) }}

                />
                <label
                  className="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
                >
                  City
                </label>
              </div>

              <div className="w-full sm:w-[48%] tabIn:w-[32%] h-12 relative flex">
                <input
                  required
                  className="peer w-full bg-transparent outline-none px-4 text-lg  bg-white border border-[#64748b] focus:shadow-md"
                  id="pincode"
                  type="text"
                  name='pincode'
                  value={CanData.pincode || ""}
                  onChange={(e) => { handleInputChange(e) }}
                />
                <label
                  className="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
                >
                  Pincode
                </label>
              </div>


              <div className="w-full h-12 relative flex">
                <input
                  required
                  className="peer w-full bg-transparent outline-none px-4 text-lg  bg-white border border-[#64748b] focus:shadow-md"
                  id="full_address"
                  type="text"
                  name='fullAddress'
                  value={CanData.fullAddress || ""}
                  onChange={(e) => { handleInputChange(e) }}
                />
                <label
                  className="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
                >
                  Full Address
                </label>
              </div>

              <div className="w-full relative flex">
                <textarea
                  required
                  className="peer w-full bg-transparent outline-none px-4 py-2 text-base bg-white border  border-[#64748b] focus:shadow-md"
                  id="description"
                  rows="3"
                  name='aboutme'
                  value={CanData.aboutme || ""}
                  onChange={(e) => { handleInputChange(e) }}
                >

                </textarea>
                <label
                  className="absolute top-2 bg-white left-4 px-2 peer-focus:top-[-10px] peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:top-[-10px] peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
                >
                  About
                </label>
              </div>
            </div>
          </div>

          <div className="mt-18 p-4 sm:p-6 panel panel-default">
            <div className="panel-heading wt-panel-heading p-a20">
              <h4 className=" mb-10 font-bold text-black Titles2">Social Network</h4>
            </div>
            <div className="panel-body wt-panel-body p-a20">

              <div className="flex gap-5 row">
                <div className="w-full sm:w-[48%] tabIn:w-[32%] h-12 relative flex">
                  <input
                    required
                    className="peer w-full bg-transparent outline-none px-4 text-lg  bg-white border border-[#64748b] focus:shadow-md"
                    id="linkedin"
                    type="text"
                    name="linkedIn"
                    value={CanData.linkedIn || ""}
                    onChange={(e) => { handleInputChange(e) }}
                  />
                  <label
                    className="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
                  >
                    LinkedIn
                  </label>
                </div>

                <div className="w-full sm:w-[48%] tabIn:w-[32%] h-12 relative flex">
                  <input
                    required
                    className="peer w-full bg-transparent outline-none px-4 text-lg  bg-white border border-[#64748b] focus:shadow-md"
                    id="github"
                    type="text"
                    name="github"
                    value={CanData.github || ""}
                    onChange={(e) => { handleInputChange(e) }}
                  />
                  <label
                    className="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
                  >
                    GitHub
                  </label>
                </div>

                <div className="w-full sm:w-[48%] tabIn:w-[32%] h-12 relative flex">
                  <input
                    required
                    className="peer w-full bg-transparent outline-none px-4 text-lg  bg-white border border-[#64748b] focus:shadow-md"
                    id="facebook"
                    type="text"
                    name="facebook"
                    value={CanData.facebook || ""}
                    onChange={(e) => { handleInputChange(e) }}
                  />
                  <label
                    className="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
                  >
                    Facebook
                  </label>
                </div>

                <div className="w-full sm:w-[48%] tabIn:w-[32%] h-12 relative flex">
                  <input
                    required
                    className="peer w-full bg-transparent outline-none px-4 text-lg  bg-white border border-[#64748b] focus:shadow-md"
                    id="instagram"
                    type="text"
                    name="instagram"
                    value={CanData.instagram || ""}
                    onChange={(e) => { handleInputChange(e) }}
                  />
                  <label
                    className="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
                  >
                    Instagram
                  </label>
                </div>


                <div className="w-full sm:w-[48%] tabIn:w-[32%] h-12 relative flex">
                  <input
                    required
                    className="peer w-full bg-transparent outline-none px-4 text-lg  bg-white border border-[#64748b] focus:shadow-md"
                    id="twitter"
                    type="text"
                    name="twitter"
                    value={CanData.twitter || ""}
                    onChange={(e) => { handleInputChange(e) }}
                  />
                  <label
                    className="absolute top-1/2 translate-y-[-50%] bg-white left-4 px-2 peer-focus:top-0 peer-focus:left-3 font-light text-base peer-focus:text-sm peer-focus:text-[#4070f4] peer-valid:-top-0 peer-valid:left-3 peer-valid:text-sm peer-valid:text-[#4070f4] duration-150"
                  >
                    Twitter
                  </label>
                </div>


              </div>
            </div>
          </div>

          <div className="Changes flex justify-end gap-3 mt-27">
        {isActive ? (
          <button 
            onClick={handleDeactivate} 
            className="inline-flex items-center justify-center gap-2.5 border border-red-600 py-4 px-10 text-center font-medium text-red-600 hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            <span>
              <img src={removeUserIcon} alt="" style={{ width: '20px', height: '20px' }} />
            </span>
            Deactivate this account
          </button>
        ) : (
          <button 
            onClick={handleActivate}
            className="inline-flex items-center justify-center gap-2.5 border border-[#10b981] py-4 px-10 text-center font-medium text-[#10b981] hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            <span>
              <img src={addUserIcon} alt="" style={{ width: '20px', height: '20px' }} />
            </span>
            Activate this account
          </button>
        )}
        <button onClick={HandlePostClick} className="BTNToAddColumn inline-flex items-center justify-center bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10" >
          Save Changes
        </button>
      </div>
        </div>
      </form>
      {showStatusPopup && (
        <PopupCard
          icon={<img src={settingIcon} alt="Status" className="w-8 h-8" />}
          heading={`Confirm ${isActive ? 'Deactivation' : 'Activation'}`}
          description={`Are you sure you want to ${isActive ? 'deactivate' : 'activate'} this candidate account?`}
          buttons={[
            {
              text: "Cancel",
              primary: false,
              onClick: () => setShowStatusPopup(false)
            },
            {
              text: isActive ? "Deactivate" : "Activate",
              primary: true,
              onClick: handleConfirmStatusChange,
            }
          ]}
          onClose={() => setShowStatusPopup(false)}
          bgColor="bg-white"
          headingHoverColor="hover:text-red-600"
          descriptionColor="text-gray-700"
          descriptionHoverOpacity="hover:opacity-90"
          primaryButtonColor={isActive ? "bg-red-600" : "bg-green-600"}
          primaryButtonHoverColor={isActive ? "hover:bg-red-700" : "hover:bg-green-700"}
          primaryButtonFocusRingColor={isActive ? "focus:ring-red-500" : "focus:ring-green-500"}
          secondaryButtonColor="bg-gray-200"
          secondaryButtonTextColor="text-gray-700"
          secondaryButtonHoverColor="hover:bg-gray-300"
          secondaryButtonFocusRingColor="focus:ring-gray-400"
        />
      )}


    </DefaultLayout>
  )
}

export default CandidateProfile

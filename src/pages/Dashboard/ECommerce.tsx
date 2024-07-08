import React, { useEffect, useState } from 'react';
import CardDataStats from '../../components/CardDataStats';
import ChartOne from '../../components/Charts/ChartOne';
import ChartThree from '../../components/Charts/ChartThree';
import ChartTwo from '../../components/Charts/ChartTwo';
import ChatCard from '../../components/Chat/ChatCard';
import MapOne from '../../components/Maps/MapOne';
// import TableOne from '../../components/Tables/TableOne';
import DefaultLayout from '../../layout/DefaultLayout';
import { fetchCandidateData } from '../../api/api';
import { fetchEmployersData } from '../../api/api';

import candidateIcon from '../../../public/5856.jpg'
import TotalUsers from '../../../public/5879.jpg'
import employerIcon from '../../../public/preview.jpg'


const ECommerce: React.FC = () => {

  const [CandidateCount, setCandidateCounts] = useState(null);
  const [EmployerCount, setEmployerCount] = useState(null);


  useEffect(()=>{
       fetchCandidateData(undefined, setCandidateCounts);
  }, [CandidateCount]);

  useEffect(()=>{
       fetchEmployersData(undefined, setEmployerCount);
  }, [CandidateCount]);
  



  return (
    <DefaultLayout>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Total Candidate's" total={CandidateCount} rate="0.43%" levelUp>
          <img className="mix-blend-multiply  fill-primary dark:fill-white"
            width="22"
            height="25"
            src={candidateIcon} alt="" />
        </CardDataStats>
        <CardDataStats title="Total Employer's" total={EmployerCount} rate="4.35%" levelUp>
        <img className="mix-blend-multiply  fill-primary dark:fill-white"
            width="24"
            height="25"
            src={employerIcon} alt="" />
        </CardDataStats>
        <CardDataStats title="Total Profit" total="$2.450" rate="2.59%" levelUp>
          <svg
            className="fill-primary dark:fill-white"
            width="22"
            height="25"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.1063 18.0469L19.3875 3.23126C19.2157 1.71876 17.9438 0.584381 16.3969 0.584381H5.56878C4.05628 0.584381 2.78441 1.71876 2.57816 3.23126L0.859406 18.0469C0.756281 18.9063 1.03128 19.7313 1.61566 20.3844C2.20003 21.0375 2.99066 21.3813 3.85003 21.3813H18.1157C18.975 21.3813 19.8 21.0031 20.35 20.3844C20.9 19.7656 21.2094 18.9063 21.1063 18.0469ZM19.2157 19.3531C18.9407 19.6625 18.5625 19.8344 18.15 19.8344H3.85003C3.43753 19.8344 3.05941 19.6625 2.78441 19.3531C2.50941 19.0438 2.37191 18.6313 2.44066 18.2188L4.12503 3.43751C4.19378 2.71563 4.81253 2.16563 5.56878 2.16563H16.4313C17.1532 2.16563 17.7719 2.71563 17.875 3.43751L19.5938 18.2531C19.6282 18.6656 19.4907 19.0438 19.2157 19.3531Z"
              fill=""
            />
            <path
              d="M14.3345 5.29375C13.922 5.39688 13.647 5.80938 13.7501 6.22188C13.7845 6.42813 13.8189 6.63438 13.8189 6.80625C13.8189 8.35313 12.547 9.625 11.0001 9.625C9.45327 9.625 8.1814 8.35313 8.1814 6.80625C8.1814 6.6 8.21577 6.42813 8.25015 6.22188C8.35327 5.80938 8.07827 5.39688 7.66577 5.29375C7.25327 5.19063 6.84077 5.46563 6.73765 5.87813C6.6689 6.1875 6.63452 6.49688 6.63452 6.80625C6.63452 9.2125 8.5939 11.1719 11.0001 11.1719C13.4064 11.1719 15.3658 9.2125 15.3658 6.80625C15.3658 6.49688 15.3314 6.1875 15.2626 5.87813C15.1595 5.46563 14.747 5.225 14.3345 5.29375Z"
              fill=""
            />
          </svg>
        </CardDataStats>
        <CardDataStats title="Total Users" total={CandidateCount + EmployerCount} rate="0.95%" levelDown>
        <img className=" mix-blend-multiply fill-primary dark:fill-white"
            width="32"
            height="37"
            src={TotalUsers} alt="" />
        </CardDataStats>
        
        <div className="bg-white shadow-3 h-50 w-100 px-6 py-8 sm:p-10 sm:pb-6">
                  <div className="grid items-center justify-center w-full grid-cols-1 text-left">
                  {/* <img className='w-full h-full'  src={CanData.candidate_image ? `data:image/jpeg;base64,${CanData.candidate_image}` : ""} alt="Candidate" /> */}
                  </div>
                </div>
        
        
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        {/* <ChartOne /> */}



        {/* <ChartTwo /> */}



        {/* <ChartThree /> */}
        {/* <MapOne /> */}
        {/* <div className="col-span-12 xl:col-span-8">
        </div> */}
        {/* <ChatCard /> */}
        
      </div>
    </DefaultLayout>
  );
};

export default ECommerce;

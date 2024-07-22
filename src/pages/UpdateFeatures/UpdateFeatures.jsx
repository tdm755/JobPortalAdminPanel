import React, { useEffect, useState } from 'react'
import DefaultLayout from '../../layout/DefaultLayout'
import CategoryIcon from '../../../public/JobCateIcon.svg'
import JobTypeIcon from '../../../public/JobIcon.svg'
import cityIcon from '../../../public/CityIcon.svg'
import LocationIcon from '../../../public/LocationIcon.svg'


import stateIcon from '../../../public/stateIcon.svg';
import { Link } from 'react-router-dom'
import { FeaturesOfCatType } from '../../App'
import { useContext } from 'react'

function UpdateFeatures() {

  const { FeatureData } = useContext(FeaturesOfCatType);

  const [counts, setCounts] = useState({
    CatCount: "",
    TypeCount: "",
  });

  useEffect(() => {
    async function fetchCategoryData() {
      try {
        const response = await fetch(`http://localhost:5000/api/admin/jobCategory`, {
          credentials: 'include',
        });
        const dataOfApi = await response.json();
        setCounts((preVal) => {
          return { ...preVal, CatCount: dataOfApi.data ? dataOfApi.data.length : 0 }
        })

      } catch (error) {
        console.log(error);
        setCounts((preVal) => ({ ...preVal, CatCount: "" }));
      }
    }
    fetchCategoryData();
  }, [])

  useEffect(() => {
    async function fetchCategoryData() {
      try {
        const response = await fetch(`http://localhost:5000/api/admin/jobType`, {
          credentials: 'include',
        });
        const dataOfApi = await response.json();
        setCounts((preVal) => {
          return { ...preVal, TypeCount: dataOfApi.data ? dataOfApi.data.length : 0 }
        })

      } catch (error) {
        console.log(error);
      }
    }
    fetchCategoryData();
  }, [])

  //  useEffect(()=>{
  //   async function fetchCategoryData() {
  //    try {
  //      const response = await fetch(`http://localhost:5000/api/admin/jobLocation`, {
  //        credentials: 'include',
  //      });
  //      const dataOfApi = await response.json();
  //      setCounts((preVal)=>{
  //        return {...preVal, TypeCount : dataOfApi.data ? dataOfApi.data.length : 0}
  //      })

  //    } catch (error) {
  //      console.log(error);
  //    }
  //  }
  //  fetchCategoryData();
  // },[])





  return (
    <>
      <DefaultLayout>
        <div className="flex grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-7 gap-y-7">
          <Link to={`/updateFeature/${"category"}`} >
            <div className='flex p-3 flex-col justify-end h-45 w-full bg-white shadow-4 dark:border-strokedark dark:bg-boxdark'>
              <div className="mb-10 flex gap-2 TotalCategories">
                <img className='h-10 w-15' src={CategoryIcon} alt="" />

                <div className=" TotalCount">
                  <span className='text-black font-bold text-2xl' >{counts.CatCount}</span>
                  <p className='text-sm font-medium' >Total Categories</p>
                </div>


              </div>
              <div className='flex items-end justify-end text-[#10b981] cursor-pointer'>Update Category</div>
            </div>
          </Link>

          <Link to={`/updateFeature/${"jobtype"}`} >
            <div className='flex p-3 flex-col justify-end h-45 w-full bg-white shadow-4 dark:border-strokedark dark:bg-boxdark'>
              <div className="mb-10 flex gap-2 TotalCategories">
                <img className='h-10 w-15' src={JobTypeIcon} alt="" />

                <div className=" TotalCount">
                  <span className='text-black font-bold text-2xl' >{counts.TypeCount}</span>
                  <p className='text-sm font-medium' >Total Job Types</p>
                </div>


              </div>
              <div className='flex items-end justify-end text-[#10b981] cursor-pointer'>Update Job Types</div>
            </div>
          </Link>

          <Link to={`/updateFeature/${"jobLocation"}`} >
            <div className='flex p-3 flex-col justify-end h-45 w-full bg-white shadow-4 dark:border-strokedark dark:bg-boxdark'>
              <div className="mb-10 flex gap-2 TotalCategories">
                <img className='h-10 w-15' src={stateIcon} alt="" />

                <div className=" TotalCount">
                  <span className='text-black font-bold text-2xl' >States</span>
                  <p className='text-sm font-medium' >update</p>
                </div>


              </div>
              <div className='flex items-end justify-end text-[#10b981] cursor-pointer'>Update States</div>
            </div>
          </Link>


          <Link to={`/updateFeature/${"jobLocation"}`} >
            <div className='flex p-3 flex-col justify-end h-45 w-full bg-white shadow-4 dark:border-strokedark dark:bg-boxdark'>
              <div className="mb-10 flex gap-2 TotalCategories">
                <img className='h-10 w-15' src={cityIcon} alt="" />

                <div className=" TotalCount">
                  <span className='text-black font-bold text-2xl' >Cities</span>
                  <p className='text-sm font-medium' >update</p>
                </div>


              </div>
              <div className='flex items-end justify-end text-[#10b981] cursor-pointer'>Update Cities</div>
            </div>
          </Link>
        

          <Link to={`/updatelocation`} >
            <div className='flex p-3 flex-col justify-end h-45 w-full bg-white shadow-4 dark:border-strokedark dark:bg-boxdark'>
              <div className="mb-10 flex gap-2 TotalCategories">
                <img className='h-10 w-15' src={LocationIcon} alt="" />

                <div className=" TotalCount">
                  <span className='text-black font-bold text-2xl' >By Location</span>
                  <p className='text-sm font-medium' >Job Search By Location</p>
                </div>
              </div>
              <div className='flex items-end justify-end text-[#10b981] cursor-pointer'>Update Job Search By Location</div>
            </div>
          </Link>       




        </div>
      </DefaultLayout>
    </>
  )
}

export default UpdateFeatures
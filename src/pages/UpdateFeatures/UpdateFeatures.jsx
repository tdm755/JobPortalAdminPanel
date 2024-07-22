import React, { useEffect, useState } from 'react'
import DefaultLayout from '../../layout/DefaultLayout'
import CategoryIcon from '../../../public/CategoryIcon.jpeg'
import { Link } from 'react-router-dom'
import { FeaturesOfCatType } from '../../App'
import { useContext } from 'react'

function UpdateFeatures() {
<<<<<<< HEAD

  const { FeatureData } = useContext(FeaturesOfCatType);

=======
  const { FeatureData } = useContext(FeaturesOfCatType);
>>>>>>> 9b389de3ba92f73323995ba1217346696860103e
  const [counts, setCounts] = useState({
    CatCount: "",
    TypeCount: "",
  });

<<<<<<< HEAD

=======
>>>>>>> 9b389de3ba92f73323995ba1217346696860103e
  useEffect(() => {
    async function fetchCategoryData() {
      try {
        const response = await fetch(`http://localhost:5000/api/admin/jobCategory`, {
          credentials: 'include',
        });
        const dataOfApi = await response.json();
<<<<<<< HEAD
        setCounts((preVal) => {
          return { ...preVal, CatCount: dataOfApi.data ? dataOfApi.data.length : 0 }
        })

=======
        setCounts((preVal) => ({
          ...preVal,
          CatCount: dataOfApi.data && dataOfApi.data.length ? dataOfApi.data.length.toString() : ""
        }));
>>>>>>> 9b389de3ba92f73323995ba1217346696860103e
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
<<<<<<< HEAD
        setCounts((preVal) => {
          return { ...preVal, TypeCount: dataOfApi.data ? dataOfApi.data.length : 0 }
        })

      } catch (error) {
        console.log(error);
=======
        setCounts((preVal) => ({
          ...preVal,
          TypeCount: dataOfApi.data && dataOfApi.data.length ? dataOfApi.data.length.toString() : ""
        }));
      } catch (error) {
        console.log(error);
        setCounts((preVal) => ({ ...preVal, TypeCount: "" }));
>>>>>>> 9b389de3ba92f73323995ba1217346696860103e
      }
    }
    fetchCategoryData();
  }, [])
<<<<<<< HEAD

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




=======
>>>>>>> 9b389de3ba92f73323995ba1217346696860103e

  return (
    <>
      <DefaultLayout>
        <div className="flex grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-7 gap-y-7">
<<<<<<< HEAD

=======
>>>>>>> 9b389de3ba92f73323995ba1217346696860103e
          <Link to={`/updateFeature/${"category"}`} >
            <div className='flex p-3 flex-col justify-end h-45 w-full bg-white shadow-4 dark:border-strokedark dark:bg-boxdark'>
              <div className="mb-10 flex gap-2 TotalCategories">
                <img className='h-13 w-15' src={CategoryIcon} alt="" />
<<<<<<< HEAD

                <div className=" TotalCount">
                  <span className='text-black font-bold text-2xl' >{counts.CatCount}</span>
                  <p className='text-sm font-medium' >Total Categories</p>
                </div>


=======
                <div className=" TotalCount">
                  {counts.CatCount && (
                    <span className='text-black font-bold text-2xl'>{counts.CatCount}</span>
                  )}
                  <p className='text-sm font-medium'>Total Categories</p>
                </div>
>>>>>>> 9b389de3ba92f73323995ba1217346696860103e
              </div>
              <div className='flex items-end justify-end text-[#10b981] cursor-pointer'>Update Category</div>
            </div>
          </Link>

          <Link to={`/updateFeature/${"jobtype"}`} >
            <div className='flex p-3 flex-col justify-end h-45 w-full bg-white shadow-4 dark:border-strokedark dark:bg-boxdark'>
              <div className="mb-10 flex gap-2 TotalCategories">
                <img className='h-13 w-15' src={CategoryIcon} alt="" />
<<<<<<< HEAD

                <div className=" TotalCount">
                  <span className='text-black font-bold text-2xl' >{counts.TypeCount}</span>
                  <p className='text-sm font-medium' >Total Job Types</p>
                </div>


=======
                <div className=" TotalCount">
                  {counts.TypeCount && (
                    <span className='text-black font-bold text-2xl'>{counts.TypeCount}</span>
                  )}
                  <p className='text-sm font-medium'>Total Job Types</p>
                </div>
>>>>>>> 9b389de3ba92f73323995ba1217346696860103e
              </div>
              <div className='flex items-end justify-end text-[#10b981] cursor-pointer'>Update Job Types</div>
            </div>
          </Link>
<<<<<<< HEAD

          <Link to={`/updateFeature/${"jobLocation"}`} >
            <div className='flex p-3 flex-col justify-end h-45 w-full bg-white shadow-4 dark:border-strokedark dark:bg-boxdark'>
              <div className="mb-10 flex gap-2 TotalCategories">
                <img className='h-13 w-15' src={CategoryIcon} alt="" />

                <div className=" TotalCount">
                  <span className='text-black font-bold text-2xl' ></span>
                  <p className='text-sm font-medium' >States</p>
                </div>


              </div>
              <div className='flex items-end justify-end text-[#10b981] cursor-pointer'>States</div>
            </div>
          </Link>


          <Link to={`/updateFeature/${"jobLocation"}`} >
            <div className='flex p-3 flex-col justify-end h-45 w-full bg-white shadow-4 dark:border-strokedark dark:bg-boxdark'>
              <div className="mb-10 flex gap-2 TotalCategories">
                <img className='h-13 w-15' src={CategoryIcon} alt="" />

                <div className=" TotalCount">
                  <span className='text-black font-bold text-2xl' ></span>
                  <p className='text-sm font-medium' >Cities</p>
                </div>


              </div>
              <div className='flex items-end justify-end text-[#10b981] cursor-pointer'>Update Cities</div>
            </div>
          </Link>
        

          <Link to={`/updatelocation`} >
            <div className='flex p-3 flex-col justify-end h-45 w-full bg-white shadow-4 dark:border-strokedark dark:bg-boxdark'>
              <div className="mb-10 flex gap-2 TotalCategories">
                <img className='h-13 w-15' src={CategoryIcon} alt="" />

                <div className=" TotalCount">
                  <span className='text-black font-bold text-2xl' ></span>
                  <p className='text-sm font-medium' >Job Search By Location</p>
                </div>
              </div>
              <div className='flex items-end justify-end text-[#10b981] cursor-pointer'>Update Job Search By Location</div>
            </div>
          </Link>       




=======
>>>>>>> 9b389de3ba92f73323995ba1217346696860103e
        </div>
      </DefaultLayout>
    </>
  )
}

export default UpdateFeatures
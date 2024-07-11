import React, { useEffect } from 'react'
import DefaultLayout from '../../layout/DefaultLayout'
import CategoryIcon from '../../../public/CategoryIcon.jpeg'
import { Link } from 'react-router-dom'
import { FeaturesOfCatType } from '../../App'
import { useContext } from 'react'

function UpdateFeatures() {  
  
  const {FeatureData} = useContext(FeaturesOfCatType);


  return (
    <>
      <DefaultLayout>
        <div className="flex grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-7 gap-y-7">

        <Link to={`/updateFeature/${"category"}`} >
                <div className='flex p-3 flex-col justify-end h-45 w-full bg-white shadow-4 dark:border-strokedark dark:bg-boxdark'>
                    <div className="mb-10 flex gap-2 TotalCategories">
                    <img className='h-13 w-15' src={CategoryIcon} alt="" />

                      <div className=" TotalCount">
                        <span className='text-black font-bold text-2xl' >{FeatureData.count}</span>
                        <p className='text-sm font-medium' >Total Categories</p>
                      </div>


                    </div>
                   <div className= 'flex items-end justify-end text-[#10b981] cursor-pointer'>Update Category</div>
                </div>
                </Link>

                <Link to={`/updateFeature/${"jobtype"}`} >
                <div className='flex p-3 flex-col justify-end h-45 w-full bg-white shadow-4 dark:border-strokedark dark:bg-boxdark'>
                    <div className="mb-10 flex gap-2 TotalCategories">
                    <img className='h-13 w-15' src={CategoryIcon} alt="" />

                      <div className=" TotalCount">
                        <span className='text-black font-bold text-2xl' >{FeatureData.count}</span>
                        <p className='text-sm font-medium' >Total Job Types</p>
                      </div>


                    </div>
                      <div className= 'flex items-end justify-end text-[#10b981] cursor-pointer'>Update Job Types</div>
                </div>
                </Link>

                
                
                
        </div>
      </DefaultLayout>
    </>
  )
}

export default UpdateFeatures

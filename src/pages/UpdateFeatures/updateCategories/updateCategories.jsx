import React, { useEffect } from 'react'
import DefaultLayout from '../../../layout/DefaultLayout'
import DeletIcon from '../../../../public/DeleteIcon.svg'
import { useLocation } from 'react-router-dom'

function UpdateFeturesComponent(props) {

    const location = useLocation();
    const {pathname} = location;

    const baseUrl = `http://localhost:5000/api/admin`;
    useEffect(()=>{
        async function fetchDetails() {
            try {
                const response = await fetch(`${baseUrl}${pathname.includes('category') ? '/jobCategory' : '/jobType'}`)
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.log('Error :', error);
            }
        }
        fetchDetails();
    },[])

  return (
    <DefaultLayout>
    <div className='bg-white w-full p-6'>
        <div className="flex items-center justify-center ToAddMoreCategories h-30 bg-slate-100">
            <div className="addFeatures">
                <input className='outline-none px-4 w-90 h-12 rounded-l-md ' type="text" />
                <button className='bg-[#1967d2] h-12 p-2 text-white ml-1 rounded-r-md'>Add {pathname.includes('category') ? "Category" : 'Job Type'}</button>
            </div>
        </div>
       <div className="AddedContent mt-10">
       <table>
            <thead>            
                <tr>
                  <th className='px-6 text-center'>{pathname.includes('category') ? "Categories" : 'Job Types'}</th>
                  <th className='px-6 text-center'>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className='px-6 text-center'></td>
                    <td className='px-6 py-3 cursor-pointer text-center flex justify-center items-center'><img src={DeletIcon} alt="" /></td>
                </tr>

            </tbody>
        </table>
       </div>
    </div>
    </DefaultLayout>
  )
}

export default UpdateFeturesComponent

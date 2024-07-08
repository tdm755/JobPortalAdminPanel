import React from 'react'
import DefaultLayout from '../../../layout/DefaultLayout'
import DeletIcon from '../../../../public/DeleteIcon.svg'

function UpdateCategories() {
  return (
    <DefaultLayout>
    <div className='bg-white w-full p-6'>
        <div className="ToAddMoreCategories h-30 bg-slate-100">
            <input type="text" />
            <button>Add Cate</button>
        </div>
       <div className="AddedContent mt-10">
       <table>
            <thead>            
                <tr>
                  <th className='px-6 text-center'>Categories</th>
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

export default UpdateCategories

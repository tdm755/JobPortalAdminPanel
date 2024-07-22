import React from 'react'
import { Link } from 'react-router-dom'
import DefaultLayout from '../../layout/DefaultLayout'
import viewIcon from '../../images/icon/viewEyeIcon.svg'
import deleteIcon from '../../images/icon/DeleteIcon.svg'

function ManageAds() {
  return (
    <DefaultLayout>
          <h1 className="Titles text-black text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
            Manage Ads
          </h1>
      <div className="max-w-6xl mx-auto bg-white shadow-md -lg overflow-hidden">
        <div className="p-4 sm:p-6">
          <div className="h-30 bg-[#f1f5f9]">
          </div>
          
          <div className="overflow-x-auto mt-8">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left px-4 py-2 font-semibold">Placement</th>
                  <th className="text-left px-4 py-2 font-semibold">Price</th>
                  <th className="text-center px-4 py-2 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3].map((_, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">
                      <input 
                        className="w-full border  px-2 py-1" 
                        type="text" 
                        defaultValue="Image-Top(720x90)"
                      />
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex items-center">
                        <input 
                          className="w-20 border  px-2 py-1 mr-2" 
                          type="number" 
                          placeholder="25"
                        />
                        <span className="text-gray-600">/days</span>
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex justify-center">
                        <button className="p-1 hover:bg-gray-200 ">
                          <img className="w-5 h-5" src={deleteIcon} alt="Delete" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}

export default ManageAds
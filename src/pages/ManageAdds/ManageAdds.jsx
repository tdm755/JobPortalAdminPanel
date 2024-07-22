import React from 'react'
import { Link } from 'react-router-dom'
import DefaultLayout from '../../layout/DefaultLayout'
import viewIcon from '../../images/icon/viewEyeIcon.svg'
import deleteIcon from '../../images/icon/DeleteIcon.svg'
import './ManageAdds.css';

function ManageAds() {
  return (
    <DefaultLayout>
      <>
        <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-4 sm:p-6">
            <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
              Adds
            </h1>
            <div className="flex flex-col sm:flex-row justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
              <div className="flex items-center space-x-2">
                <span>Show</span>
                <select className="border rounded px-2 py-1">
                  <option>5</option>
                </select>
                <span>entries</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="text-center px-4 py-2 text-left">Placement</th>
                    <th className="text-center px-4 py-2 text-left">Price</th>
                    <th className="text-center px-4 py-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Image-Top(720x90)</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div>
                          25/day
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex">
                        <span>view</span>
                        {/* Uncomment and use appropriate paths for icons */}
                        {/* <button className="btn btn-light btn-sm"><img className='w-5' src={viewIcon} alt="" /></button> */}
                        {/* <button className="btn btn-light btn-sm"><img className='w-4' src={deleteIcon} alt=""/></button> */}
                      </div>
                    </td>
                  </tr>
                  <tr>

                    <td>Image-Top(720x90)</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div>
                          25/day
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex">
                        <span>view</span>
                        {/* Uncomment and use appropriate paths for icons */}
                        {/* <button className="btn btn-light btn-sm"><img className='w-5' src={viewIcon} alt="" /></button> */}
                        {/* <button className="btn btn-light btn-sm"><img className='w-4' src={deleteIcon} alt=""/></button> */}
                      </div>
                    </td>
                  </tr>

                  <tr>

                    <td>Image-Top(720x90)</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div>
                          25/day
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="d-flex">
                        <span>view</span>
                        {/* Uncomment and use appropriate paths for icons */}
                        {/* <button className="btn btn-light btn-sm"><img className='w-5' src={viewIcon} alt="" /></button> */}
                        {/* <button className="btn btn-light btn-sm"><img className='w-4' src={deleteIcon} alt=""/></button> */}
                      </div>
                    </td>
                  </tr>



                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    </DefaultLayout>

  )
}

export default ManageAds

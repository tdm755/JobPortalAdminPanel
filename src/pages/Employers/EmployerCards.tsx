import React from 'react'
import { Link } from 'react-router-dom'

function EmployerCards() {
  return (
    <div className='flex flex-col pt-6 justify-between items-center h-100 EmCards rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
      <div className="ProfileImage w-[110px] h-[110px] bg-black">

      </div>
      
      <div className="infoDetails">
        <h3>Arpit Tiwari</h3>
        <p className="jobRole">React Developer</p>
      </div>
        <Link to={'/viewprofile'}> <span className='text-[#1967d2]'>View Profile</span> </Link>

      <div className="flex items-center justify-between px-6 bottomSide w-full bg-[#f3f8ff] h-17">
        <span className="location">
          Mumbai
        </span>
        <button className='border px-2 bg-[#1967d2] text-white' >Save</button>
      </div>
    </div>
  )
}

export default EmployerCards

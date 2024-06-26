import React from 'react'
import DefaultLayout from '../../layout/DefaultLayout.js'
import EmployerCards from './EmployerCards.js'

function Employers() {
  return (
    <DefaultLayout>
    <>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5'>

        <EmployerCards />
               
      </div>
    </>
    </DefaultLayout>
  )
}

export default Employers

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DefaultLayout from '../../layout/DefaultLayout'
import viewIcon from '../../images/icon/viewEyeIcon.svg'
import deleteIcon from '../../images/icon/DeleteIcon.svg'
import { API_BASE_URL } from '../../api/api'

function ManageAds() {

  useEffect(()=>{
    async function fetchDetails() {
      try {
        const response = await fetch(`${API_BASE_URL}/ads`)
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log("error while fetching : ", error);
      }
    }
    fetchDetails();
   }, [])


    async function postDetails() {
      try {
        const response = await fetch(`${API_BASE_URL}/ads`, {
          method : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(ads) 
        })
        const data = await response.json();
        // console.log(data);
      } catch (error) {
        console.log('Error : ', error);
      }
    }
 

  const [ads, setAds] = useState([
    {
      placementName : '',
      price : '',
      durationType : '',
    },
    {
      placementName : '',
      price : '',
      durationType : '',
    },
    {
      placementName : '',
      price : '',
      durationType : '',
    }
  ]);

  function handleChange(e, index) {
    let {name, value} = e.target;

    if (name === 'price') {
      value = value === '' ? 0 : Number(value);
    }

    setAds((preVal)=>{
      let newArray = [...preVal];
      newArray[index] = {...newArray[index], [name] : value}
      return newArray;
    })
  }

  console.log(ads);

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
                {ads.map((item, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-2">
                      <input 
                        name='placementName'
                        className="w-full border  px-2 py-1" 
                        type="text" 
                        onChange={(e)=>{handleChange(e, index)}}
                        value={item.placementName}
                      />
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex items-center">
                        <input 
                          name='price'
                          className="w-20 border  px-2 py-1 mr-2" 
                          type="number" 
                          placeholder="25"    
                          onChange={(e)=>{handleChange(e, index)}}
                          value={item.price}                      
                        />
                        
                      </div>
                      <div className="flex items-center" >
                        <select 
                            name="durationType" 
                            id="" 
                            onChange={(e)=>{handleChange(e, index)}}
                            value={item.durationType}
                        >
                          <option >select</option>
                          <option value="day">day</option>
                          <option value="month">month</option>
                          <option value="years">year</option>
                          
                        </select>                       
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
        <button onClick={postDetails}>SAVE DETAILS</button>
      </div>
    </DefaultLayout>
  )
}

export default ManageAds
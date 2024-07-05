import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './EmployersPakage2.css';
// import ScrollToTop from '../../../MINComponents/ScrollToTop/ScrollToTop';
import CheckIcon from '../../../../public/CheckIcon.svg'
import CrossIcon from '../../../../public/redCross.svg'
import deleteIcon from '../../../../public/DeleteIcon.svg'
import ArrowToRight from '../../../../public/ArrowToRight.svg';
import DefaultLayout from '../../../layout/DefaultLayout';

function EmployersPakage2() {   



    const [inclusions, setInclusions] = useState([             
        {
            position : "",
            th : "Company Profiles",
            td1 : "CheckIcon",
            td2 : "CheckIcon",
            td3 : "CheckIcon",
            td4 : "CheckIcon",
            td5 : "CheckIcon",            
        },
        {
            position : "",
            th : "5 candidate profile unlocks",
            td1 : "CheckIcon",
            td2 : "CheckIcon",
            td3 : "CheckIcon",
            td4 : "CheckIcon",
            td5 : "CheckIcon",            
        },
        {
            position : "",
            th : "Resume Database Access",
            td1 : "CrossIcon",
            td2 : "CheckIcon",
            td3 : "CheckIcon",
            td4 : "CheckIcon",
            td5 : "CheckIcon",            
        },
        {
            position : "",
            th : "Integration with Other Platforms",
            td1 : "CrossIcon",
            td2 : "CheckIcon",
            td3 : "CheckIcon",
            td4 : "CheckIcon",
            td5 : "CheckIcon",            
        },
        {
            position : "",
            th : "Job Posting",
            td1 : "CrossIcon",
            td2 : "CheckIcon",
            td3 : "CheckIcon",
            td4 : "CheckIcon",
            td5 : "CheckIcon",            
        },
        {
            position : "",
            th : "Search And Filters",
            td1 : "CrossIcon",
            td2 : "CheckIcon",
            td3 : "CheckIcon",
            td4 : "CheckIcon",
            td5 : "CheckIcon",            
        },
        {
            position : "",
            th : "Analytics And Reporting",
            td1 : "CrossIcon",
            td2 : "CheckIcon",
            td3 : "CheckIcon",
            td4 : "CheckIcon",
            td5 : "CheckIcon",            
        },
        
    ]);


    function handleAddRowClick() {
        let newArray = [
            ...inclusions, 
            {
                position : "",
                th : "",
                td1 : "",
                td2 : "",
                td3 : "",
                td4 : "",
                td5 : "",            
            }
        ]

        setInclusions(newArray);
    }


    function removeElement(index) {
        const newInclusions = inclusions.filter((_, i) => i !== index);
        setInclusions(newInclusions);
    }



    function HandleInputChange(e, index) {
        let newInclusions = [...inclusions];
        newInclusions[index].th = e.target.value;
        setInclusions(newInclusions);

    }


    const [Prices, setPrices] = useState({

        Free : {
            price: "",
            days: "",
        },
        Bronze : {
            price: "199",
            days: "14",
        },
        Silver : {
            price: "299",
            days: "20",
        },
        Platinum : {
            price: "499",
            days: "25",
        },
        Gold : {
            price: "899",
            days: "30",
        },
        
    });

    function handlePriceChange(e, field) {
        const newValues = {...Prices};
        newValues[field] = {...newValues[field], [e.target.name] : e.target.value}
        setPrices(newValues);
    }

    console.log(Prices);


    return (
        <>
            <DefaultLayout>
                {/* <ScrollToTop /> */}
                {/* PRICING TABLE SECTION START */}
                <div className="EmployerPakage EmployerPakage2">
                    <div className="containerInEmSec">
                        {/* TITLE START*/}
                        <div className="section-head left wt-small-separator-outer">
                            <div className="wt-small-separator site-text-primary">
                                <div><h1 className='text-4xl mb-13'>Set Your Plan</h1></div>
                            </div>
                        </div>
                        {/* TITLE END*/}

                        <div className="section-content">
                            <div className="twm-tabs-style-1">

                                <div className="tab-content" id="myTab3Content">
                                    <div
                                        className="tab-pane fade show active"
                                        id="home"
                                        role="tabpanel"
                                        aria-labelledby="Monthly"
                                    >
                                        <div className="pricing-block-outer TableXAuto">
                                            <div className=" justify-content-center ">

                                                <div className="table_responsive_InEmPack2">
                                                    <table>
                                                        <thead>
                                                        
                                                            <th>
                                                                <div className="ForColorInEmPack2 ForColorInEmPack2Inclusions circle-blue">

                                                                    <div className="p-table-title">
                                                                        <h4 className="wt-title">Inclusions</h4>
                                                                        <div className="p-table-price h-13">
                                                                            {/* <span></span>
                                                                        <span className="original-price" ></span>

                                                                        <p></p> */}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </th>
                                                            <th>
                                                                <div className="ForColorInEmPack2 circle-blue">

                                                                    <div className="p-table-title">
                                                                        <h4 className="wt-title">Free</h4>
                                                                        <div className="p-table-price h-13">
                                                                            <span></span>

                                                                            <p></p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </th>
                                                            <th>
                                                                <div className="ForColorInEmPack2 cirle-lightBlue">
                                                                    <div className="p-table-title">
                                                                        <h4 className="wt-title bronzeTitle">Bronze</h4>
                                                                        <div className= "flex flex-col p-table-price h-13">
                                                                        <span>₹<input
                                                                         className='w-19 border border-[#8db5d8] outline-none px-1 bg-transparent'
                                                                          type="text" 
                                                                          name='price'
                                                                          value={Prices.Bronze.price}
                                                                          onChange={(e)=>{handlePriceChange(e, 'Bronze')}}
                                                                          />
                                                                          </span>
                                                                        <span>
                                                                            <input 
                                                                            className='w-15 border border-[#8db5d8] outline-none px-1 bg-transparent'
                                                                             type="text"
                                                                             name='days'
                                                                             value={Prices.Bronze.days}
                                                                             onChange={(e)=>{handlePriceChange(e, 'Bronze')}}
                                                                              />
                                                                              </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </th>
                                                            <th>
                                                                <div className="ForColorInEmPack2 circle-yellow">
                                                                    <div className="p-table-title">
                                                                        <h4 className="wt-title silverTitle">Silver</h4>
                                                                        <div className="flex flex-col p-table-price h-13">
                                                                        <span>₹<input
                                                                         className='w-19 border border-[#8db5d8] outline-none px-1 bg-transparent'
                                                                          type="text" 
                                                                          name='price'
                                                                          value={Prices.Silver.price}
                                                                          onChange={(e)=>{handlePriceChange(e, 'Silver')}}
                                                                          />
                                                                          </span>
                                                                        <span>
                                                                            <input 
                                                                            className='w-15 border border-[#8db5d8] outline-none px-1 bg-transparent'
                                                                             type="text"
                                                                             name='days'
                                                                             value={Prices.Silver.days}
                                                                             onChange={(e)=>{handlePriceChange(e, 'Silver')}}
                                                                              />
                                                                              </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </th>
                                                            <th>
                                                                <div className="ForColorInEmPack2 circle-pink">
                                                                    <div className="p-table-title">
                                                                        <h4 className="wt-title platinumTitle">Platinum</h4>
                                                                        <div className="flex flex-col p-table-price h-13">
                                                                        <span>₹<input
                                                                         className='w-19 border border-[#8db5d8] outline-none px-1 bg-transparent'
                                                                          type="text" 
                                                                          name='price'
                                                                          value={Prices.Platinum.price}
                                                                          onChange={(e)=>{handlePriceChange(e, 'Platinum')}}
                                                                          />
                                                                          </span>
                                                                        <span>
                                                                            <input 
                                                                            className='w-15 border border-[#8db5d8] outline-none px-1 bg-transparent'
                                                                             type="text"
                                                                             name='days'
                                                                             value={Prices.Platinum.days}
                                                                             onChange={(e)=>{handlePriceChange(e, 'Platinum')}}
                                                                              />
                                                                              </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </th>
                                                            <th>
                                                                <div className="ForColorInEmPack2 PremiumColor">

                                                                    <div className="p-table-title PremiumOf">
                                                                        <h4 className="pakageColor wt-title">Gold</h4>
                                                                        <div className="flex flex-col p-table-price h-13">
                                                                        <span>₹<input
                                                                         className='w-19 border border-[#8db5d8] outline-none px-1 bg-transparent'
                                                                          type="text" 
                                                                          name='price'
                                                                          value={Prices.Gold.price}
                                                                          onChange={(e)=>{handlePriceChange(e, 'Gold')}}
                                                                          />
                                                                          </span>
                                                                        <span>
                                                                            <input 
                                                                            className='w-15 border border-[#8db5d8] outline-none px-1 bg-transparent'
                                                                             type="text"
                                                                             name='days'
                                                                             value={Prices.Gold.days}
                                                                             onChange={(e)=>{handlePriceChange(e, 'Gold')}}
                                                                              />
                                                                              </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </th>
                                                            <th>
                                                                <div className="ForColorInEmPack2 PremiumColor">

                                                                    <div className="p-table-title PremiumOf">
                                                                        <h4 className="pakageColor wt-title">Action</h4>
                                                                        <div className="p-table-price h-13">
                                                                            <span className=""></span>
                                                                            <p></p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </th>
                                                   
                                        
                                                        </thead>
                                                        <tbody>
                                                            
                                                            {inclusions.map((item, index)=>{
                                                               return <tr key={index}>
                                                               
                                                                    <th>
                                                                        <input 
                                                                        value={item.th}
                                                                        type="text"
                                                                        onChange={(e)=>{HandleInputChange(e, index)}}
                                                                        />
                                                                    </th>
                                                                    <td>
                                                                        <div className="contentInTd">
                                                                            {item.td1 === "CheckIcon" ? <img src={CheckIcon} alt=''></img> : <img src={CrossIcon} alt=''></img> }
                                                                            <select 
                                                                            style={item.td1 === 'CrossIcon' ? {border : "1px solid red"} : {border : "1px solid green"}}
                                                                            value={item.td1} 
                                                                            onChange={(e)=>{
                                                                                const newInclusions = [...inclusions];
                                                                                newInclusions[index].td1 = e.target.value; 
                                                                                setInclusions(newInclusions);
                                                                            }} 
                                                                            name="" 
                                                                            id="">
                                                                                <option value="CheckIcon">check</option>
                                                                                <option value="CrossIcon">Cross</option>
                                                                            </select>
                                                                        </div>
                                                                    </td>

                                                                    <td>
                                                                    <div className="contentInTd">
                                                                    {item.td2 === "CheckIcon" ? <img src={CheckIcon} alt=''></img> : <img src={CrossIcon} alt=''></img> }
                                                                        <select 
                                                                        style={item.td2 === 'CrossIcon' ? {border : "1px solid red"} : {border : "1px solid green"}}
                                                                        value={item.td2} 
                                                                        onChange={(e)=>{
                                                                            const newInclusions = [...inclusions];
                                                                            newInclusions[index].td2 = e.target.value; 
                                                                            setInclusions(newInclusions);
                                                                        }} 
                                                                        name="" 
                                                                        id="">
                                                                        
                                                                            <option value="CheckIcon">Check</option>
                                                                            <option value="CrossIcon">Cross</option>
                                                                        </select>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                    <div className="contentInTd">
                                                                    {item.td3 === "CheckIcon" ? <img src={CheckIcon} alt=''></img> : <img src={CrossIcon} alt=''></img> }
                                                                        <select 
                                                                        style={item.td3 === 'CrossIcon' ? {border : "1px solid red"} : {border : "1px solid green"}}
                                                                        value={item.td3} 
                                                                        onChange={(e)=>{
                                                                            
                                                                            const newInclusions = [...inclusions];
                                                                            newInclusions[index].td3 = e.target.value; 
                                                                            setInclusions(newInclusions);
                                                                        }} 
                                                                        name="" 
                                                                        id="">
                                                                            <option value="CheckIcon">Check <img src={CheckIcon} alt="" /></option>
                                                                            <option value="CrossIcon">Cross</option>
                                                                        </select>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                    <div className="contentInTd">
                                                                    {item.td4 === "CheckIcon" ? <img src={CheckIcon} alt=''></img> : <img src={CrossIcon} alt=''></img> }
                                                                        <select 
                                                                        style={item.td4 === 'CrossIcon' ? {border : "1px solid red"} : {border : "1px solid green"}}
                                                                        value={item.td4} 
                                                                        onChange={(e)=>{
                                                                            
                                                                            const newInclusions = [...inclusions];
                                                                            newInclusions[index].td4 = e.target.value; 
                                                                            setInclusions(newInclusions);
                                                                        }} 
                                                                        name="" 
                                                                        id="">
                                                                            <option value="CheckIcon">Check <img src={CheckIcon} alt="" /></option>
                                                                            <option value="CrossIcon">Cross</option>
                                                                        </select>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                    <div className="contentInTd">
                                                                    {item.td5 === "CheckIcon" ? <img src={CheckIcon} alt=''></img> : <img src={CrossIcon} alt=''></img> }
                                                                        <select 
                                                                        style={item.td5 === 'CrossIcon' ? {border : "1px solid red"} : {border : "1px solid green"}}
                                                                        value={item.td5} 
                                                                        onChange={(e)=>{
                                                                            
                                                                            const newInclusions = [...inclusions];
                                                                            newInclusions[index].td5 = e.target.value; 
                                                                            setInclusions(newInclusions);
                                                                        }} 
                                                                        name="" 
                                                                        id="">
                                                                            <option value="CheckIcon">Check <img src={CheckIcon} alt="" /></option>
                                                                            <option value="CrossIcon">Cross</option>
                                                                        </select>
                                                                        </div>
                                                                    </td>
                                                                    
                                                                    <td>
                                                                        <button onClick={()=>{removeElement(index)}} >
                                                                            <img src={deleteIcon} alt="" />
                                                                        </button>
                                                                    </td>
                                                               
                                                                </tr>
                                                            })}                                                            
                                                        </tbody>
                                                    </table>
                                                </div>

                                               <div className="ActionBTNs mt-8">
                                               <div className="AddColumn flex justify-end ">
                                                    <Link
                                                        to="#"
                                                    >
                                                        <button onClick={handleAddRowClick} className="BTNToAddColumn inline-flex items-center justify-center bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10" >

                                                            Add Row

                                                        </button>
                                                    </Link>
                                                </div>
                                                <div className="SayChanges flex justify-end ">
                                                    <Link
                                                        to="#"
                                                    >
                                                        <button className="BTNToAddColumn inline-flex items-center justify-center bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10" >

                                                            Save Changes

                                                        </button>
                                                    </Link>
                                                </div>

                                               </div>



                                            </div>
                                        </div>
                                    </div>


                                </div>
                            </div> 
                        </div>

                    </div>
                </div>
            </DefaultLayout>
        </>
    )
}

export default EmployersPakage2

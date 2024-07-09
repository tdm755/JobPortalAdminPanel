import React, { useEffect, useRef, useState } from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import DeleteIcon from '../../../../public/DeleteIcon.svg';
import { useLocation } from 'react-router-dom';

function UpdateFeturesComponent(props) {
    const location = useLocation();
    const { pathname } = location;

    const [categoryOf, setCategoryOf] = useState({});
    const [highlightIndex, setHighlightIndex] = useState(null);
    const newItemRef = useRef(null);

    const baseUrl = `http://localhost:5000/api/admin`;

    useEffect(() => {
        async function fetchDetails() {
            try {
                const response = await fetch(`${baseUrl}${pathname.includes('category') ? '/jobCategory' : '/jobType'}`, {
                    credentials: 'include',
                });
                const dataInsideAPI = await response.json();
                // console.log('ApiData is : ', dataInsideAPI);

                if (dataInsideAPI && dataInsideAPI.data) {
                    setCategoryOf(()=>{
                        return {...dataInsideAPI, data : dataInsideAPI.data.split(',').map(item => item.trim().replace(/[\[\]\"]/g, ''))}                        
                    });
                } else {
                    if (!dataInsideAPI) {
                        setCategoryOf({}); 
                    }
                    else if(!dataInsideAPI.data){
                        setCategoryOf((preVal)=>{
                            return {...preVal, data : []};
                        })
                    }
                }
            } catch (error) {
                console.log('Error:', error);
            }
        }
        fetchDetails();
    }, [pathname]);
    
    // console.log(categoryOf);
    const InputRef = useRef("");
    
    const handleAddClick = (e) => {
        const Val = InputRef.current.value;

        setCategoryOf((prevVal) => {
            let newObj = {...prevVal, data : [...prevVal.data, Val]};
            newObj.data.sort((a, b) => a.localeCompare(b));
            setHighlightIndex(newObj.data.indexOf(Val));
            return newObj;
        });
    };


    useEffect(() => {
        if (newItemRef.current) {
            newItemRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(() => {
                setHighlightIndex(null);
            }, 3000);
        }
    }, [categoryOf]);

    return (
        <DefaultLayout>
            <div className='bg-white w-full p-6'>
                <div className="flex items-center justify-center ToAddMoreCategories h-30 bg-slate-100">
                    <div className="addFeatures">
                        <input ref={InputRef}  className='outline-none px-4 w-90 h-12 rounded-l-md' type="text" />
                        <button onClick={handleAddClick} className='bg-[#1967d2] h-12 p-2 text-white ml-1 rounded-r-md'>
                            Add {pathname.includes('category') ? "Category" : 'Job Type'}
                        </button>
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
                            {console.log(categoryOf.data)}
                            {(categoryOf.data) ? categoryOf.data.map((item, index) => (
                                <tr
                                    key={index}
                                    ref={index === highlightIndex ? newItemRef : null}
                                    style={index === highlightIndex ? { backgroundColor: '#f0f6fe', transition: 'background-color 1s' } : {}}
                                >
                                    <td className='px-6 text-center'>{item}</td>
                                    <td className='px-6 py-3 cursor-pointer text-center flex justify-center items-center'>
                                        <img src={DeleteIcon} alt="" />
                                    </td>
                                </tr>
                            )) : ""}
                        </tbody>
                    </table>
                </div>
            </div>
        </DefaultLayout>
    );
}

export default UpdateFeturesComponent;

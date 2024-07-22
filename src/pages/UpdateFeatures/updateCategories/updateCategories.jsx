import React, { useEffect, useRef, useState } from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import DeleteIcon from '../../../../public/DeleteIcon.svg';
import { useLocation } from 'react-router-dom';
import { FeaturesOfCatType } from '../../../App';
import { useContext } from 'react';
import { fetchDetailsOfFeatures } from '../../../api/api';

function UpdateFeturesComponent() {

    const { FeatureData, setFeatureData } = useContext(FeaturesOfCatType);
    console.log(FeatureData);
    const location = useLocation();
    const { pathname } = location;

    const [highlightIndex, setHighlightIndex] = useState(null);
    const newItemRef = useRef(null);

    const baseUrl = `http://localhost:5000/api/admin`;
    const isCategory = pathname.includes('category');
    const isJobType = pathname.includes('jobtype');
    const isJobLocation = pathname.includes('jobLocation');

    const endpoint = isCategory ? '/jobCategory' : (isJobType ? '/jobType' : '/jobLocation');



    useEffect(() => {
        fetchDetailsOfFeatures(setFeatureData, pathname);
    }, [pathname]);

    // console.log(FeatureData);
    const InputRef = useRef("");


    const handleAddClick = async () => {
        const val = InputRef.current.value.trim();
        if (!val) return;

        try {
            const response = await fetch(`${baseUrl}${endpoint}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    [isCategory ? 'jobCategory' : (isJobType ? 'jobType' : 'jobLocation')]: [...FeatureData.data, val]
                }),
            });

            if (response.ok) {
                setFeatureData(prevVal => {
                    const newData = [...prevVal.data, val].sort((a, b) => a.localeCompare(b));
                    setHighlightIndex(newData.indexOf(val));
                    return { ...prevVal, data: newData };
                });
                InputRef.current.value = '';
            } else {
                console.log('Failed to add item');
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    const handleDeleteClick = async (index) => {
        try {
            const newData = FeatureData.data.filter((_, i) => i !== index);
            const response = await fetch(`${baseUrl}${endpoint}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    [pathname.includes('category') ? 'jobCategory' : 
                     pathname.includes('jobType') ? 'jobType' : 'jobLocation']: newData
                }),
    
            });

            if (response.ok) {
                setFeatureData(prevVal => ({ ...prevVal, data: newData }));
            } else {
                console.log('Failed to delete item');
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    useEffect(() => {
        if (newItemRef.current) {
            newItemRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(() => {
                setHighlightIndex(null);
            }, 3000);
        }
    }, [FeatureData]);

    return (
        <DefaultLayout>
            <div className='bg-white w-full p-6'>
                <div className="flex items-center justify-center ToAddMoreCategories h-30 bg-slate-100">
                    <div className="addFeatures">
                        <input ref={InputRef} className='outline-none px-4 w-90 h-12 rounded-l-md' type="text" />
                        <button onClick={handleAddClick} className='bg-[#1967d2] h-12 p-2 text-white ml-1 rounded-r-md'>
                            Add {isCategory ? "Category" : (isJobType ? 'Job Type' : 'Job Location')}
                        </button>
                    </div>
                </div>
                <div className="AddedContent mt-10">
                    <table>
                        <thead>
                            <tr>
                                <th className='px-6 text-center'>
                                    {isCategory ? "Categories" : (isJobType ? 'Job Types' : 'Job Locations')}
                                </th>
                                <th className='px-6 text-center'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {console.log(FeatureData.count)} */}
                            {(FeatureData.data) ? FeatureData.data.map((item, index) => (
                                <tr
                                    key={index}
                                    ref={index === highlightIndex ? newItemRef : null}
                                    style={index === highlightIndex ? { backgroundColor: '#f0f6fe', transition: 'background-color 1s' } : {}}
                                >
                                    <td className='px-6 text-center'>{item}</td>
                                    <td onClick={() => { handleDeleteClick(index) }} className='px-6 py-3 cursor-pointer text-center flex justify-center items-center'>
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

// import React, { useEffect, useRef, useState } from 'react';
// import DefaultLayout from '../../../layout/DefaultLayout';
// import DeleteIcon from '../../../../public/DeleteIcon.svg';
// import { useLocation } from 'react-router-dom';

// function UpdateFeturesComponent(props) {
//     const location = useLocation();
//     const { pathname } = location;

//     const [featureData, setFeatureData] = useState({ data: [] });
//     const [highlightIndex, setHighlightIndex] = useState(null);
//     const newItemRef = useRef(null);
//     const inputRef = useRef(null);

//     const baseUrl = `http://localhost:5000/api/admin`;
//     const isCategory = pathname.includes('category');
//     const endpoint = isCategory ? '/jobCategory' : '/jobType';

//     useEffect(() => {
//         fetchDetails();
//     }, [pathname]);

//     const fetchDetails = async () => {
//         try {
//             const response = await fetch(`${baseUrl}${endpoint}`, {
//                 credentials: 'include',
//             });
//             const dataInsideAPI = await response.json();

//             if (dataInsideAPI && dataInsideAPI.data) {
//                 setFeatureData({
//                     data: Array.isArray(dataInsideAPI.data)
//                         ? dataInsideAPI.data
//                         : dataInsideAPI.data.split(',').map(item => item.trim().replace(/[\[\]\"]/g, ''))
//                 });
//             } else {
//                 setFeatureData({ data: [] });
//             }
//         } catch (error) {
//             console.log('Error:', error);
//         }
//     };

//     const handleAddClick = async () => {
//         const val = inputRef.current.value.trim();
//         if (!val) return;

//         try {
//             const response = await fetch(`${baseUrl}${endpoint}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 credentials: 'include',
//                 body: JSON.stringify({
//                     [isCategory ? 'jobCategory' : 'jobType']: [...featureData.data, val]
//                 }),
//             });

//             if (response.ok) {
//                 setFeatureData(prevVal => {
//                     const newData = [...prevVal.data, val].sort((a, b) => a.localeCompare(b));
//                     setHighlightIndex(newData.indexOf(val));
//                     return { ...prevVal, data: newData };
//                 });
//                 inputRef.current.value = '';
//             } else {
//                 console.log('Failed to add item');
//             }
//         } catch (error) {
//             console.log('Error:', error);
//         }
//     };

//     const handleDeleteClick = async (index) => {
//         try {
//             const newData = featureData.data.filter((_, i) => i !== index);
//             const response = await fetch(`${baseUrl}${endpoint}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 credentials: 'include',
//                 body: JSON.stringify({
//                     [isCategory ? 'jobCategory' : 'jobType']: newData
//                 }),
//             });

//             if (response.ok) {
//                 setFeatureData(prevVal => ({ ...prevVal, data: newData }));
//             } else {
//                 console.log('Failed to delete item');
//             }
//         } catch (error) {
//             console.log('Error:', error);
//         }
//     };

//     useEffect(() => {
//         if (newItemRef.current) {
//             newItemRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
//             setTimeout(() => {
//                 setHighlightIndex(null);
//             }, 3000);
//         }
//     }, [featureData]);

//     return (
//         <DefaultLayout>
//             <div className='bg-white w-full p-6'>
//                 <div className="flex items-center justify-center ToAddMoreCategories h-30 bg-slate-100">
//                     <div className="addFeatures">
//                         <input ref={inputRef} className='outline-none px-4 w-90 h-12 rounded-l-md' type="text" />
//                         <button onClick={handleAddClick} className='bg-[#1967d2] h-12 p-2 text-white ml-1 rounded-r-md'>
//                             Add {isCategory ? "Category" : 'Job Type'}
//                         </button>
//                     </div>
//                 </div>
//                 <div className="AddedContent mt-10">
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th className='px-6 text-center'>{isCategory ? "Categories" : 'Job Types'}</th>
//                                 <th className='px-6 text-center'>Action</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {featureData.data.map((item, index) => (
//                                 <tr
//                                     key={index}
//                                     ref={index === highlightIndex ? newItemRef : null}
//                                     style={index === highlightIndex ? { backgroundColor: '#f0f6fe', transition: 'background-color 1s' } : {}}
//                                 >
//                                     <td className='px-6 text-center'>{item}</td>
//                                     <td className='px-6 py-3 cursor-pointer text-center flex justify-center items-center'>
//                                         <img src={DeleteIcon} alt="" onClick={() => handleDeleteClick(index)} />
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </DefaultLayout>
//     );
// }

// export default UpdateFeturesComponent;
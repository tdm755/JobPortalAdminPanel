import React, { useEffect, useRef, useState } from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import DeleteIcon from '../../../images/icon/DeleteIcon.svg';
import { useLocation } from 'react-router-dom';
import { FeaturesOfCatType } from '../../../App';
import { useContext } from 'react';
import { fetchDetailsOfFeatures, API_BASE_URL } from '../../../api/api';
import PopupCard from '../../../utils/PopupCard';
import { toast } from 'react-toastify';

function UpdateFeturesComponent() {
    const { FeatureData, setFeatureData } = useContext(FeaturesOfCatType);
    const location = useLocation();
    const { pathname } = location;

    const [highlightIndex, setHighlightIndex] = useState(null);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const newItemRef = useRef(null);

    const baseUrl = `${API_BASE_URL}`;
    const isCategory = pathname.includes('category');
    const isJobType = pathname.includes('jobtype');

    const endpoint = isCategory ? '/jobCategory' : '/jobType';

    useEffect(() => {
        fetchDetailsOfFeatures(setFeatureData, pathname);
    }, [pathname]);

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
                    [isCategory ? 'jobCategory' : 'jobType']: [...FeatureData.data, val]
                }),
            });

            if (response.ok) {
                setFeatureData(prevVal => {
                    const newData = [...prevVal.data, val].sort((a, b) => a.localeCompare(b));
                    setHighlightIndex(newData.indexOf(val));
                    return { ...prevVal, data: newData };
                });
                InputRef.current.value = '';
                toast.success(`${isCategory ? "Category" : "Job Type"} added successfully!`);
            } else {
                console.log('Failed to add item');
                toast.error(`Failed to add ${isCategory ? "category" : "job type"}. Please try again.`);
            }
        } catch (error) {
            console.log('Error:', error);
            toast.error(`An error occurred while adding ${isCategory ? "category" : "job type"}. Please try again.`);
        }
    };

    const handleDeleteClick = (index) => {
        setItemToDelete(index);
        setShowDeletePopup(true);
    };

    const confirmDelete = async () => {
        if (itemToDelete === null) return;

        try {
            const newData = FeatureData.data.filter((_, i) => i !== itemToDelete);
            const response = await fetch(`${baseUrl}${endpoint}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    [isCategory ? 'jobCategory' : 'jobType']: newData
                }),
            });

            if (response.ok) {
                setFeatureData(prevVal => ({ ...prevVal, data: newData }));
                toast.success(`${isCategory ? "Category" : "Job Type"} deleted successfully!`);
            } else {
                console.log('Failed to delete item');
                toast.error(`Failed to delete ${isCategory ? "category" : "job type"}. Please try again.`);
            }
        } catch (error) {
            console.log('Error:', error);
            toast.error(`An error occurred while deleting ${isCategory ? "category" : "job type"}. Please try again.`);
        }

        setShowDeletePopup(false);
        setItemToDelete(null);
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
                            Add {isCategory ? "Category" : 'Job Type'}
                        </button>
                    </div>
                </div>
                <div className="AddedContent mt-10">
                    <table>
                        <thead>
                            <tr>
                                <th className='px-6 text-center'>Sr. No.</th>
                                <th className='px-6 text-center'>
                                    {isCategory ? "Categories" : 'Job Types'}
                                </th>
                                <th className='px-6 text-center'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {(FeatureData.data) ? FeatureData.data.map((item, index) => (
                                <tr
                                    key={index}
                                    ref={index === highlightIndex ? newItemRef : null}
                                    style={index === highlightIndex ? { backgroundColor: '#f0f6fe', transition: 'background-color 1s' } : {}}
                                >
                                    <td className='px-6 text-center'>{index + 1}</td>
                                    <td className='px-6 text-center'>{item}</td>
                                    <td onClick={() => handleDeleteClick(index)} className='px-6 py-3 cursor-pointer text-center flex justify-center items-center'>
                                        <img src={DeleteIcon} alt="" />
                                    </td>
                                </tr>
                            )) : ""}
                        </tbody>
                    </table>
                </div>
            </div>
            {showDeletePopup && (
                <PopupCard
                    icon={<img src={DeleteIcon} alt="Delete" className="w-8 h-8" />}
                    heading="Confirm Deletion"
                    description={`Are you sure you want to delete "${FeatureData.data[itemToDelete]}" ${isCategory ? "category" : "job type"}?`}
                    buttons={[
                        { 
                            text: "Cancel", 
                            primary: false, 
                            onClick: () => setShowDeletePopup(false) 
                        },
                        { 
                            text: "Delete", 
                            primary: true, 
                            onClick: confirmDelete 
                        }
                    ]}
                    onClose={() => setShowDeletePopup(false)}
                    bgColor="bg-white"
                    headingHoverColor="hover:text-red-600"
                    descriptionColor="text-gray-600"
                    descriptionHoverOpacity="hover:opacity-80"
                    primaryButtonColor="bg-red-500"
                    primaryButtonHoverColor="hover:bg-red-600"
                    primaryButtonFocusRingColor="focus:ring-red-500"
                    secondaryButtonColor="bg-gray-200"
                    secondaryButtonTextColor="text-gray-700"
                    secondaryButtonHoverColor="hover:bg-gray-300"
                    secondaryButtonFocusRingColor="focus:ring-gray-400"
                />
            )}
        </DefaultLayout>
    );
}

export default UpdateFeturesComponent;
import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../../layout/DefaultLayout';
import { API_BASE_URL } from '../../../api/api';
import {toast } from 'react-toastify';
import { debounce } from 'lodash';
import deleteIcon from '../../../../public/DeleteIcon.svg'

function UpdateFAQs() {
    const [FAQ, setFAQ] = useState([]);
    const [Error, setError] = useState({});

    useEffect(() => {
        async function fetchDetailsOfFAQ() {
            try {
                const response = await fetch(`${API_BASE_URL}/faqs`);
                const data = await response.json();
                setFAQ(data.data);
                console.log(data.data);
            } catch (error) {
                console.error('Error fetching FAQ details:', error);
            }
        }
        fetchDetailsOfFAQ();

        return () => {
            DebouncePostFAQ.cancel();
        };
    }, []);

    function handleAddFaqFunction() {
        setFAQ((prevVal) => [...prevVal, { question: '', answer: '' , forWhom : ''}]);
    }

    
    function validateField(name, value) {
        let error = '';
        if (!value) {
            error = 'This field is required';
        }
        return error;
    }
    
    function validateForm() {
        let formIsValid = true;
        let newErrors = {};

        FAQ.forEach((item, index) => {
            const questionError = validateField('question', item.question);
            const answerError = validateField('answer', item.answer);
            
            if (questionError || answerError) {
                formIsValid = false;
                newErrors[index] = {
                    question: questionError,
                    answer: answerError,
                };
            }
        });

        setError(newErrors);
        return formIsValid;
    }

    

    const DebouncePostFAQ = debounce(async function PostFAQdetails() {
        if (!validateForm()) {
            return;
        }

        try {
            const response = await fetch(`${API_BASE_URL}/faqs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(FAQ),
            });
            const data = await response.json();
            console.log('Success:', data);
            if(response.ok){
                toast.success("FAQ's Updated Successfully!")
            }
        } catch (error) {
            console.error('Error posting FAQ details:', error);
        }
    }, 300);

    function PostFAQdetails() {
        DebouncePostFAQ();
    }
    
    function handleChangeInQuestion(e, index) {
        let { value } = e.target;
        let trimmedValue = value.trim();
        let error = validateField('question', trimmedValue);

        setError((prevVal) => ({
            ...prevVal,
            [index]: { ...prevVal[index], question: error },
        }));

        setFAQ((prevVal) => {
            let newArray = [...prevVal];
            newArray[index].question = value;
            return newArray;
        });
    }

    function handleChangeInAnswer(e, index) {
        let { value } = e.target;
        let trimmedValue = value.trim();
        let error = validateField('answer', trimmedValue);

        setError((prevVal) => ({
            ...prevVal,
            [index]: { ...prevVal[index], answer: error },
        }));

        setFAQ((prevVal) => {
            let newArray = [...prevVal];
            newArray[index].answer = value;
            return newArray;
        });
    }

    function handleSelectForWhomChange(e, index) {
        let Val = e.target.value;
        
        setFAQ((preVal)=>{
            let newArray = [...preVal];
            newArray[index].forWhom = Val;
            return newArray;
        })
    }

    // console.log(FAQ);

    
    async function handleDeleteClick(e, id) {
        try {
            const response = await fetch(`${API_BASE_URL}/faqs/${id}` , {
                method: 'DELETE',
            });

             if (response.ok) {
                setFAQ((prevVal) => prevVal.filter((item) => item.id !== id));
                toast.success("FAQ deleted successfully!");
            } else {
                console.error('Error deleting FAQ:', response.statusText);
            }
            
        } catch (error) {
            
        }
    }

    //  async function handleDeleteClick(e, id) {
    //     try {
    //         const response = await fetch(`${API_BASE_URL}/faqs/${id}`, {
    //             method: 'DELETE',
    //         });

    //         if (response.ok) {
    //             setFAQ((prevVal) => prevVal.filter((item) => item.id !== id));
    //             toast.success("FAQ deleted successfully!");
    //         } else {
    //             console.error('Error deleting FAQ:', response.statusText);
    //         }
    //     } catch (error) {
    //         console.error('Error deleting FAQ:', error);
    //     }
    // }


    return (
        <DefaultLayout>
            <div className='bg-white w-full p-6'>
                <div className="flex items-center justify-center h-30 bg-slate-100">
                    <div>
                        <div
                            onClick={handleAddFaqFunction}
                            className="inline-flex items-center justify-center bg-primary py-4 px-10 text-center font-medium text-white hover:translate-x-1 lg:px-8 xl:px-10 cursor-pointer"
                        >
                            Add FAQ's
                        </div>
                    </div>
                </div>

                <div className="faq flex flex-col-reverse">
                    {FAQ.map((item, index) => (
                        <div className='flex flex-row-reverse items-center justify-around'>
                        <div key={index} className="QA w-[75%] m-auto mt-10">
                            <div className="selectFor flex justify-between">
                            <span className='bg-[#d4e6ff] text-black p-2 rounded-t-md'>{index + 1}</span>
                                <div className="">
                                    <label htmlFor="ForWhom">For : </label>
                                    <select value={item.forWhom} onChange={(e)=>{handleSelectForWhomChange(e, index)}} className='border border-[#d4e6ff] h-full' name="" id="ForWhom">
                                        <option value="Candidate">Candidate</option>
                                        <option value="Employer">Employer</option>
                                        <option value="Both">Both</option>
                                        <option value="Payment">Payment</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>
                            <div className="title mb-2">
                                <input
                                    type='text'
                                    value={item.question}
                                    onChange={(e) => handleChangeInQuestion(e, index)}
                                    className='border p-2 border-[#cde1fd] w-full text-xl font-bold text-black'
                                />
                                {Error[index]?.question && <span className="text-red-500">{Error[index].question}</span>}
                               
                            </div>
                            
                            <div className="title">
                                <textarea
                                    value={item.answer}
                                    onChange={(e) => handleChangeInAnswer(e, index)}
                                    className='w-full p-2 text-black border border-[#c8dbf2]'
                                />
                                {Error[index]?.answer && <span className="text-red-500">{Error[index].answer}</span>}
                            </div>
                        </div>
                        <button onClick={(e)=>{handleDeleteClick(e, item.id)}} ><img src={deleteIcon} alt="" /></button>
                        </div>
                    ))}
                </div>

                <div className="Changes flex justify-end gap-3 mt-10">
                    <button
                        onClick={PostFAQdetails}
                        className="BTNToAddColumn inline-flex items-center justify-center bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </DefaultLayout>
    );
}

export default UpdateFAQs;

import React, { useState, useRef, useEffect } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import DeleteIcon from '../../images/icon/DeleteIcon.svg';
import EditIcon from '../../images/icon/EditIcon.svg';
import { addState, getAllStates, updateState, deleteState } from '../../api/api';
import PopupCard from '../../utils/PopupCard';
import { toast } from 'react-toastify';

function StatesComponent() {
    const [states, setStates] = useState([]);
    const [newState, setNewState] = useState({ StateName: '', StateCode: '', Capital: '' });
    const [editIndex, setEditIndex] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [stateToDelete, setStateToDelete] = useState(null);
    const [highlightedStateId, setHighlightedStateId] = useState(null);
    const topRef = useRef(null);

    useEffect(() => {
        fetchStates();
    }, []);

    useEffect(() => {
        if (highlightedStateId !== null) {
            const highlightedElement = document.getElementById(`state-${highlightedStateId}`);
            if (highlightedElement) {
                highlightedElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                setTimeout(() => {
                    setHighlightedStateId(null);
                }, 3000);
            }
        }
    }, [highlightedStateId]);

    const fetchStates = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await getAllStates();
            setStates(response?.data?.states || []);
        } catch (error) {
            console.error('Error fetching states:', error);
            toast.error('Failed to fetch states. Please try again later.');
            setStates([]);
        } finally {
            setIsLoading(false);
        }
    };

    const capitalizeWords = (string) => {
        return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    };
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let processedValue = value;
        if (name === 'StateName' || name === 'Capital') {
            processedValue = capitalizeWords(value);
        } else if (name === 'StateCode') {
            processedValue = value.toUpperCase();
        }
        setNewState(prev => ({ ...prev, [name]: processedValue }));
    };

    const validateState = () => {
        if (!newState.StateName.trim()) {
            setError('State Name is required.');
            return false;
        }
        if (!newState.StateCode.trim()) {
            setError('State Code is required.');
            return false;
        }
        if (!newState.Capital.trim()) {
            setError('Capital is required.');
            return false;
        }
        return true;
    };

    const handleAddState = async () => {
        if (!validateState()) return;

        try {
            setError(null);
            const response = await addState(newState);
            const addedState = response?.data?.state;
            if (addedState) {
                setStates(prevStates => [...prevStates, addedState]);
                setNewState({ StateName: '', StateCode: '', Capital: '' });
                setHighlightedStateId(addedState.StateId);
                toast.success('State added successfully!');
            } else {
                toast.error(response.message || 'Failed to add state. Please try again.');
            }
        } catch (error) {
            console.error('Error adding state:', error);
            toast.error(error.response?.data?.message || 'Failed to add state. Please try again.');
        }
    };

    const handleDeleteConfirmation = (StateId) => {
        setStateToDelete(StateId);
        setShowDeleteConfirmation(true);
    };
    
    const handleDeleteState = async () => {
        if (!stateToDelete) return;
    
        try {
            setError(null);
            await deleteState(stateToDelete);
            setStates(prevStates => prevStates.filter(state => state.StateId !== stateToDelete));
            setShowDeleteConfirmation(false);
            setStateToDelete(null);
            toast.success('State deleted successfully!');
        } catch (error) {
            console.error('Error deleting state:', error);
            toast.error(error.response?.data?.message || 'Failed to delete state. Please try again.');
        }
    };

    const handleEditState = (index) => {
        setEditIndex(index);
        setNewState(states[index]);
         // Scroll to the top of the component
        if (topRef.current) {
            topRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleSaveEdit = async () => {
        if (!validateState()) return;
    
        try {
            setError(null);
            const response = await updateState(newState.StateId, newState);
            const updatedState = response?.data?.state;
            if (updatedState) {
                setStates(prevStates => prevStates.map(state => 
                    state.StateId === updatedState.StateId ? updatedState : state
                ));
                setEditIndex(null);
                setNewState({ StateName: '', StateCode: '', Capital: '' });
                setHighlightedStateId(updatedState.StateId);
                toast.success('State updated successfully!');
            } else {
                toast.error(response.message || 'Failed to update state. Please try again.');
            }
        } catch (error) {
            console.error('Error updating state:', error);
            toast.error(error.response?.data?.message || 'Failed to update state. Please try again.');
        }
    };

    const handleCancelEdit = () => {
        setEditIndex(null);
        setNewState({ StateName: '', StateCode: '', Capital: '' });
        setError(null);
    };

    if (isLoading) {
        return <DefaultLayout><div>Loading...</div></DefaultLayout>;
    }

    return (
        <>
        <DefaultLayout>
            <div className='bg-white w-full p-6' ref={topRef}>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <div className="flex flex-col items-center bg-slate-100 p-4 rounded-md">
                    <div className="grid gap-4 lg:grid-cols-3 lg:gap-6 w-full max-w-4xl">
                        <input
                            name="StateName"
                            value={newState.StateName}
                            onChange={handleInputChange}
                            className='outline-none px-4 py-2 border border-gray-300 rounded-md transition-all duration-300 hover:border-blue-500 hover:shadow-lg'
                            type="text"
                            placeholder="Enter State Name"
                        />
                        <input
                            name="StateCode"
                            value={newState.StateCode}
                            onChange={handleInputChange}
                            className='outline-none px-4 py-2 border border-gray-300 rounded-md transition-all duration-300 hover:border-blue-500 hover:shadow-lg'
                            type="text"
                            placeholder="Enter State Code"
                        />
                        <input
                            name="Capital"
                            value={newState.Capital}
                            onChange={handleInputChange}
                            className='outline-none px-4 py-2 border border-gray-300 rounded-md transition-all duration-300 hover:border-blue-500 hover:shadow-lg'
                            type="text"
                            placeholder="Enter Capital"
                        />
                    </div>
                    <div className="flex gap-4 mt-4">
                        <button
                            onClick={editIndex === null ? handleAddState : handleSaveEdit}
                            className='bg-[#1967d2] h-12 px-6 text-white rounded-md transition-transform duration-300 transform hover:scale-105 hover:bg-[#0d47a1] hover:shadow-lg'>
                            {editIndex === null ? 'Add State' : 'Save Changes'}
                        </button>
                        {editIndex !== null && (
                            <button
                                onClick={handleCancelEdit}
                                className='bg-red-500 h-12 px-6 text-white rounded-md transition-transform duration-300 transform hover:scale-105 hover:bg-red-700 hover:shadow-lg'>
                                Cancel
                            </button>
                        )}
                    </div>
                </div>
                <div className="AddedContent mt-10 overflow-x-auto">
                {states.length > 0 ? (
                    <table className='w-full border-collapse min-w-[600px]'>
                        <thead>
                            <tr className='bg-gray-200'>
                                <th className='px-6 py-3 text-left border-b'>Sr. No.</th>
                                <th className='px-6 py-3 text-left border-b'>State Name</th>
                                <th className='px-6 py-3 text-left border-b'>State Code</th>
                                <th className='px-6 py-3 text-left border-b'>Capital</th>
                                <th className='px-6 py-3 text-left border-b'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {states
                                .sort((a, b) => a.StateName.localeCompare(b.StateName))
                                .map((state, index) => (
                                <tr
                                    key={state.StateId}
                                    id={`state-${state.StateId}`}
                                    className={`transition-colors duration-300 ${state.StateId === highlightedStateId ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                                >
                                    <td className='px-6 py-3 border-b'>{index + 1}</td>
                                    <td className='px-6 py-3 border-b'>{state.StateName}</td>
                                    <td className='px-6 py-3 border-b'>{state.StateCode}</td>
                                    <td className='px-6 py-3 border-b'>{state.Capital}</td>
                                    <td className='px-6 py-3 border-b flex justify-center items-center'>
                                        <img
                                            src={EditIcon}
                                            alt="Edit"
                                            className='w-6 h-6 cursor-pointer transition-transform duration-300 hover:scale-110 mr-4'
                                            onClick={() => handleEditState(index)}
                                        />
                                    <img
                                            src={DeleteIcon}
                                            alt="Delete"
                                            className='w-6 h-6 cursor-pointer transition-transform duration-300 hover:scale-110'
                                            onClick={() => handleDeleteConfirmation(state.StateId)}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="text-center py-4">No states found. Add a new state to get started.</div>
                )}
            </div>
            </div>
            {showDeleteConfirmation && (
            <PopupCard
                icon={<span className="text-5xl">⚠️</span>} // Warning emoji as icon
                heading="Warning: Confirm Deletion"
                description="Are you sure you want to delete this state? This action will also delete all associated cities and cannot be undone."
                buttons={[
                    {
                        text: "Delete",
                        primary: true,
                        onClick: handleDeleteState
                    },
                    {
                        text: "Cancel",
                        primary: false,
                        onClick: () => setShowDeleteConfirmation(false)
                    }
                ]}
                onClose={() => setShowDeleteConfirmation(false)}
                // bgColor="bg-yellow-50"
                headingColor="text-red-600"
                headingHoverColor="hover:text-red-700"
                descriptionColor="text-gray-700"
                descriptionHoverOpacity="hover:opacity-90"
                primaryButtonColor="bg-red-500"
                primaryButtonHoverColor="hover:bg-red-600"
                primaryButtonFocusRingColor="focus:ring-red-500"
                secondaryButtonColor="bg-gray-300"
                secondaryButtonTextColor="text-gray-800"
                secondaryButtonHoverColor="hover:bg-gray-400"
                secondaryButtonFocusRingColor="focus:ring-gray-500"
            />
        )}
        </DefaultLayout>
        </>
    );
}

export default StatesComponent;
import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout.js';
import { fetchContactMessages, deleteContactMessageById, updateMessageReadStatus, deleteAllContactMessages } from '../../api/api.js';
import Pagination from '../../components/Pagination.jsx';
import openIcon from '../../images/icon/openEye.svg'
import closeIcon from '../../images/icon/closeEye.svg'
import DeleteIconSVG from '../../images/icon/DeleteIcon.svg'
import PopupCard from '../../utils/PopupCard.jsx';
import { toast } from 'react-toastify';

function ContactMessages() {
  const [messages, setMessages] = useState([]);
  const [totalMessages, setTotalMessages] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('DESC');
  const [search, setSearch] = useState('');
  const [expandedMessageId, setExpandedMessageId] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState(null);

  useEffect(() => {
    fetchContactMessages(setMessages, setTotalMessages, setTotalPages, sortBy, sortOrder, search, currentPage, limit);
  }, [sortBy, sortOrder, search, currentPage, limit]);

  const toggleSort = (field) => {
    if (field === sortBy) {
      setSortOrder(prevOrder => prevOrder === 'ASC' ? 'DESC' : 'ASC');
    } else {
      setSortBy(field);
      setSortOrder('ASC');
    }
  };

  const getSortIndicator = (field) => {
    if (field === sortBy) {
      return sortOrder === 'ASC' ? ' ▲' : ' ▼';
    }
    return '';
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };


  const toggleMessageExpansion = async (id) => {
    setExpandedMessageId(prevId => {
      const newExpandedId = prevId === id ? null : id;
      
      if (newExpandedId !== null) {
        // Message is being expanded, mark it as read
        updateMessageReadStatus(id, true)
          .then(() => {
            // Update the local state to reflect the change
            setMessages(prevMessages => 
              prevMessages.map(msg => 
                msg.id === id ? { ...msg, isRead: true } : msg
              )
            );
          })
          .catch(error => {
            console.error('Failed to update message read status:', error);
            // Optionally, show an error toast here
          });
      }
      
      return newExpandedId;
    });
  };

  const handleDeleteClick = (message) => {
    setMessageToDelete(message);
    setShowDeletePopup(true);
  };

  const handleClearAll = () => {
    const unreadCount = messages.filter(msg => !msg.isRead).length;
    setShowDeletePopup(true);
    setMessageToDelete({ id: 'all', name: 'all messages', unreadCount });
  };

  const handleDeleteConfirm = async () => {
    if (messageToDelete) {
      try {
        if (messageToDelete.id === 'all') {
          await deleteAllContactMessages();
          setMessages([]);
          setTotalMessages(0);
          setTotalPages(1);
          setCurrentPage(1);
          toast.success('All messages deleted successfully');
        } else {
          await deleteContactMessageById(messageToDelete.id);
          setMessages(prevMessages => prevMessages.filter(msg => msg.id !== messageToDelete.id));
          setTotalMessages(prevTotal => prevTotal - 1);
          setTotalPages(Math.ceil((totalMessages - 1) / limit));
          if (messages.length === 1 && currentPage > 1) {
            setCurrentPage(prevPage => prevPage - 1);
          }
          toast.success('Message deleted successfully');
        }
      } catch (error) {
        toast.error('Failed to delete message(s):', error);
      } finally {
        setShowDeletePopup(false);
        setMessageToDelete(null);
      }
    }
  };



  return (
    <DefaultLayout>
      <div className="text-black max-w-6xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 sm:p-6">
          <h1 className="Titles text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
            Contact Messages
          </h1>
          <div className="flex flex-col sm:flex-row justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-2">
              <span>Show</span>
              <select
                className="border rounded px-2 py-1"
                value={limit}
                onChange={handleLimitChange}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
              <span>entries</span>
            </div>
            <div className="flex items-center space-x-2">
              <span>Search:</span>
              <input 
                type="text" 
                className="border rounded px-2 py-1 flex-grow" 
                value={search} 
                onChange={handleSearch} 
              />
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                onClick={handleClearAll}
              >
                Clear All
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left cursor-pointer" onClick={() => toggleSort('createdAt')}>
                    Date {getSortIndicator('createdAt')}
                  </th>
                  <th className="px-4 py-2 text-left cursor-pointer" onClick={() => toggleSort('name')}>
                    Name {getSortIndicator('name')}
                  </th>
                  <th className="px-4 py-2 text-left cursor-pointer" onClick={() => toggleSort('email')}>
                    Email {getSortIndicator('email')}
                  </th>
                  <th className="px-4 py-2 text-left cursor-pointer" onClick={() => toggleSort('subject')}>
                    Subject {getSortIndicator('subject')}
                  </th>
                  <th className="px-4 py-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((message) => (
                  <React.Fragment key={message.id}>
                    <tr className={`border-b ${!message.isRead ? 'font-semibold text-[#1967d2]' : ''}`}>
                      <td className="px-4 py-2">{new Date(message.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-2">{message.name}</td>
                      <td className="px-4 py-2">{message.email}</td>
                      <td className="px-4 py-2">{message.subject}</td>
                      <td className="px-4 py-2 flex gap-2">
                        <button
                          className="bg-gray hover:bg-[#e2ebf4] p-1 rounded-md"
                          onClick={() => toggleMessageExpansion(message.id)}
                        >
                          <img 
                            src={expandedMessageId === message.id ? openIcon : closeIcon} 
                            alt={expandedMessageId === message.id ? "View" : "Close"} 
                            className="w-5 h-5"
                          />
                        </button>
                        <button
                          className="p-1 rounded-md hover:bg-red-100"
                          onClick={() => handleDeleteClick(message)}
                        >
                          <img src={DeleteIconSVG} alt="Delete" className="w-6 h-6" />
                        </button>
                      </td>
                    </tr>
                    <tr className='toMakeBlaB'>
                      <td colSpan={5} className="border">
                        <div
                          className={`border rounded-br-3xl rounded-bl-3xl border-[#64748b] border-t-0 overflow-hidden transition-all duration-1000 ease-out ${expandedMessageId === message.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                        >
                          <div className="rounded-br-3xl rounded-bl-3xl p-4 space-y-2">
                            <div className="font-bold">Message:</div>
                            <div>{message.message}</div>
                            {message.phoneNumber && (
                              <div>
                                <span className="font-bold">Phone:</span> {message.phoneNumber}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              itemsPerPage={limit}
              totalItems={totalMessages}
            />
        </div>
      </div>
      {showDeletePopup && (
  <PopupCard
    icon={<img src={DeleteIconSVG} alt="Delete" className="w-12 h-12" />}
    heading="Confirm Deletion"
    description={messageToDelete?.id === 'all' 
      ? (
          <span>
            Are you sure you want to delete all messages? 
            {messageToDelete.unreadCount > 0 && (
              <span>
                {' '}There {messageToDelete.unreadCount === 1 ? 'is' : 'are'}{' '}
                <span className="text-red-500 font-bold">{messageToDelete.unreadCount}</span> 
                {' '}unread message{messageToDelete.unreadCount === 1 ? '' : 's'}.
              </span>
            )}
          </span>
        )
      : `Are you sure you want to delete the message from ${messageToDelete?.name}?`
    }
    buttons={[
      {
        text: 'Cancel',
        onClick: () => setShowDeletePopup(false),
        primary: false,
      },
      {
        text: 'Delete',
        onClick: handleDeleteConfirm,
        primary: true,
      },
    ]}
    onClose={() => setShowDeletePopup(false)}
    bgColor="bg-white"
    headingHoverColor="hover:text-red-600"
    descriptionColor="text-gray-700"
    descriptionHoverOpacity="hover:opacity-90"
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

export default ContactMessages;
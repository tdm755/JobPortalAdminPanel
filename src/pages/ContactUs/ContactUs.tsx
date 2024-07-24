import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout.js';
import { fetchContactMessages } from '../../api/api.js';
import Pagination from '../../components/Pagination.jsx';
import openIcon from '../../images/icon/openEye.svg'
import closeIcon from '../../images/icon/closeEye.svg'
import deleteIcon from '../../images/icon/DeleteIcon.svg'

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


  const toggleMessageExpansion = (id) => {
    setExpandedMessageId(prevId => prevId === id ? null : id);
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
              <input type="text" className="border rounded px-2 py-1 flex-grow" value={search} onChange={handleSearch} />
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
                    <tr className="border-b">
                      <td className="px-4 py-2">{new Date(message.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-2">{message.name}</td>
                      <td className="px-4 py-2">{message.email}</td>
                      <td className="px-4 py-2">{message.subject}</td>
                      <td className="px-4 py-2">
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
                        className=""
                        onClick={() => {/* Add delete functionality here */}}
                      >
                         <img
                                            src={deleteIcon}
                                            alt="Delete"
                                            className='w-6 h-6 cursor-pointer transition-transform duration-300 hover:scale-110'
                                    
                                        />
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
                            <div>
                              <span className="font-bold">Phone:</span> {message.phoneNumber}
                            </div>
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
    </DefaultLayout>
  );
}

export default ContactMessages;
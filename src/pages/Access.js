import React, { useState } from 'react';
import { FaCheckCircle, FaBan } from 'react-icons/fa';

const AccessManagement = ({ darkMode }) => {
  // Data . . .
  const greenListedUsers = [
    {
      id: 1,
      userName: 'John Doe',
      accessStatus: 'Green Listed',
    },
    {
      id: 2,
      userName: 'Jane Smith',
      accessStatus: 'Green Listed',
    },
    {
      id: 3,
      userName: 'Bob Johnson',
      accessStatus: 'Green Listed',
    },
    // Add more green-listed users as needed
  ];

  const blackListedUsers = [
    {
      id: 4,
      userName: 'Mike Brown',
      accessStatus: 'Black Listed',
    },
    {
      id: 5,
      userName: 'Emily White',
      accessStatus: 'Black Listed',
    },
    {
      id: 6,
      userName: 'Chris Davis',
      accessStatus: 'Black Listed',
    },
    // Add more black-listed users as needed
  ];

  const AccessCard = ({ record, onAddToBlackList, onRemoveFromBlackList }) => {
    return (
      <div className="bg-white rounded-md overflow-hidden shadow-md m-4 flex">
        <div className="p-4 flex-1">
          <h2 className="text-lg font-semibold">User: {record.userName}</h2>
          <p className={`text-sm ${record.accessStatus === 'Green Listed' ? 'text-green-600' : 'text-red-600'}`}>
            Access Status: {record.accessStatus}
          </p>
          {record.accessStatus === 'Green Listed' && (
            <button onClick={() => onAddToBlackList(record.id)} className="text-red-600 mt-2 focus:outline-none">
              Add to Black List <FaBan className="inline-block ml-1" />
            </button>
          )}
          {record.accessStatus === 'Black Listed' && (
            <button onClick={() => onRemoveFromBlackList(record.id)} className="text-red-600 mt-2 focus:outline-none">
              Remove from Black List <FaBan className="inline-block ml-1" />
            </button>
          )}
        </div>
      </div>
    );
  };

  const addToBlackList = (userId) => {
    // Handle adding user to the black list
    console.log(`Add user with ID ${userId} to Black List`);
  };

  const removeUserFromBlackList = (userId) => {
    // Handle removing user from the black list
    console.log(`Remove user with ID ${userId} from Black List`);
  };

  return (
    <div className={`min-h-screen bg-[#f6f6f6] pl-[15px]`}>
      <Header />
      <div>
        <h2 className="text-lg font-semibold mb-2">Green-Listed Users</h2>
        <div>
          {greenListedUsers.map((user) => (
            <div key={user.id} className="mb-4">
              <AccessCard record={user} onAddToBlackList={addToBlackList} onRemoveFromBlackList={removeUserFromBlackList} />
            </div>
          ))}
        </div>

        <h2 className="text-lg font-semibold mt-6 mb-2">Black-Listed Users</h2>
        <div>
          {blackListedUsers.map((user) => (
            <div key={user.id} className="mb-4">
              <AccessCard record={user} onAddToBlackList={addToBlackList} onRemoveFromBlackList={removeUserFromBlackList} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <div>
      <div className={`px-[25px] py-[20px] bg-white rounded-bl-[5px] mb-[20px]`}>
        <div className='flex flex-col md:flex-row justify-between items-center'>
          <div className='mb-[10px] md:mb-0'>
            <p className='text-[#23255c] text-[20px] leading-[25px] font-bold'>Access Management</p>
          </div>
          <div className='flex items-center justify-center'></div>
        </div>
      </div>
    </div>
  );
};

export default AccessManagement;

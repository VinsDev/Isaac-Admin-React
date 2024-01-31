import React, { useState } from 'react';
import { FaHistory } from 'react-icons/fa';

const CheckInHistory = ({ darkMode }) => {
  // Data . . .
  const checkInHistory = [
    {
      id: 1,
      userName: 'John Doe',
      checkInTime: '2022-02-15T14:30:00',
    },
    {
      id: 2,
      userName: 'Jane Smith',
      checkInTime: '2022-02-20T10:45:00',
    },
    {
      id: 3,
      userName: 'Bob Johnson',
      checkInTime: '2022-02-25T16:20:00',
    },
    // Add more check-in history data as needed
  ];

  const CheckInCard = ({ record }) => {
    return (
      <div className="bg-white rounded-md overflow-hidden shadow-md m-4 flex">
        <div className="p-4 flex-1">
          <h2 className="text-lg font-semibold">User: {record.userName}</h2>
          <p className="text-gray-500 text-sm">Checked in on {new Date(record.checkInTime).toLocaleString()}</p>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen bg-[#f6f6f6] pl-[15px]`}>
      <Header />
      <div>
        <h2 className="text-lg font-semibold mb-2">Check-In History</h2>
        <div>
          {checkInHistory.map((record) => (
            <div key={record.id} className="mb-4">
              <CheckInCard record={record} />
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
            <p className='text-[#23255c] text-[20px] leading-[25px] font-bold'>Check-In History</p>
          </div>
          <div className='flex items-center justify-center'>
            <div className='pr-[20px] border-r-[1px]'></div>
            <div className='flex items-center gap-[20px] px-[20px]'>
              <FaHistory color='#3c3e6e' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckInHistory;

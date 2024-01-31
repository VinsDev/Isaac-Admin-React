import React, { useState } from 'react';
import { FaUserPlus, FaEllipsisV, FaCheck, FaTimes } from 'react-icons/fa';

const RegistrationRequests = () => {
  // Data . . .
  const dummyRequests = [
    {
      id: 1,
      userName: 'John Doe',
      registrationTime: '2022-02-15T14:30:00',
      status: 'pending', // 'approved' or 'rejected'
    },
    {
      id: 2,
      userName: 'Jane Smith',
      registrationTime: '2022-02-20T10:45:00',
      status: 'pending',
    },
    {
      id: 3,
      userName: 'Bob Johnson',
      registrationTime: '2022-02-25T16:20:00',
      status: 'pending',
    },
    // Add more registration request data as needed
  ];

  const [approvedRequests, setApprovedRequests] = useState([
    {
      id: 4,
      userName: 'Alice Cooper',
      registrationTime: '2022-03-01T08:15:00',
      status: 'approved',
    },
    // Add more approved request data as needed
  ]);

  const [rejectedRequests, setRejectedRequests] = useState([
    {
      id: 5,
      userName: 'Eve Brown',
      registrationTime: '2022-03-05T14:50:00',
      status: 'rejected',
    },
    // Add more rejected request data as needed
  ]);

  const handleApprove = (request) => {
    // Handle approve operation
    setApprovedRequests((prev) => [...prev, request]);
  };

  const handleReject = (request) => {
    // Handle reject operation
    setRejectedRequests((prev) => [...prev, request]);
  };

  const RequestCard = ({ request }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle = () => {
      setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
      setIsMenuOpen(false);
    };

    return (
      <div className="bg-white rounded-md overflow-hidden shadow-md m-4 flex">
        <div className="p-4 flex-1">
          <h2 className="text-lg font-semibold">User: {request.userName}</h2>
          <p className="text-gray-500 text-sm">Requested on {new Date(request.registrationTime).toLocaleString()}</p>

          {/* Approve and Reject buttons */}
          {request.status === 'pending' && (
            <div className="mt-2 flex justify-end">
              <button
                onClick={() => handleApprove(request)}
                className="text-green-600 hover:text-green-800 focus:outline-none focus:text-green-800"
              >
                <FaCheck />
              </button>
              <button
                onClick={() => handleReject(request)}
                className="ml-2 text-red-600 hover:text-red-800 focus:outline-none focus:text-red-800"
              >
                <FaTimes />
              </button>
            </div>
          )}

          {/* Three dots menu */}
          <div className="mt-2 flex justify-end">
            <button
              onClick={handleMenuToggle}
              className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
            >
              <FaEllipsisV />
            </button>

            {/* Other menu options */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-md overflow-hidden">
                {/* Add other menu options here if needed */}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen bg-[#f6f6f6] pl-[15px]`}>
      <Header />
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Pending Requests</h2>
        <div>
          {dummyRequests.map((request) => (
            <div key={request.id} className="mb-4">
              <RequestCard request={request} />
            </div>
          ))}
        </div>
      </div>

      {/* Approved Requests */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Approved Requests</h2>
        <div>
          {approvedRequests.map((request) => (
            <div key={request.id} className="mb-4">
              <RequestCard request={request} />
            </div>
          ))}
        </div>
      </div>

      {/* Rejected Requests */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Rejected Requests</h2>
        <div>
          {rejectedRequests.map((request) => (
            <div key={request.id} className="mb-4">
              <RequestCard request={request} />
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
            <p className='text-[#23255c] text-[20px] leading-[25px] font-bold'>Registration Requests</p>
          </div>
          <div className='flex items-center justify-center'>
            <div className='pr-[20px] border-r-[1px]'></div>
            <div className='flex items-center gap-[20px] px-[20px]'>
              <FaUserPlus color='#3c3e6e' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationRequests;

import React, { useState, useEffect } from 'react';
import { FaUserPlus, FaCheck, FaTimes } from 'react-icons/fa';
import { getRegistrationRequests, updateRequestStatus, createUser } from '../services/firebaseServices';
import { TailSpin } from 'react-loader-spinner';


const RegistrationRequests = () => {
  const [allRequests, setAllRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requests = await getRegistrationRequests();
        // Sort requests by status so that pending requests come first
        const sortedRequests = requests.sort((a, b) => {
          if (a.status === 'pending') return -1;
          if (b.status === 'pending') return 1;
          return 0;
        });
        setAllRequests(sortedRequests);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching requests:', error);
        setLoading(false);
      }
    };

    // Initial fetch
    fetchData();

    // Fetch requests every 5 seconds
    const intervalId = setInterval(fetchData, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Separate requests based on status
  const pendingRequests = allRequests.filter((request) => request.status === 'pending');
  const approvedRequests = allRequests.filter((request) => request.status === 'approved');
  const rejectedRequests = allRequests.filter((request) => request.status === 'rejected');

  const handleApprove = async (request) => {
    try {
      setLoading(true);

      // Update the request status to 'approved'
      await updateRequestStatus(request.id, 'approved');

      // Create a user with the approved phone number
      await createUser(request.number);

      // Fetch the updated registration requests
      const updatedRequests = await getRegistrationRequests();
      setAllRequests(updatedRequests);
    } catch (error) {
      console.error('Error approving request:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (request) => {
    try {
      setLoading(true);
      await updateRequestStatus(request.id, 'rejected');
    } catch (error) {
      console.error('Error rejecting request:', error);
    } finally {
      // No need to fetch requests here, as the interval will handle it
      setLoading(false);
    }
  };

  const RequestCard = ({ request }) => {
    return (
      <div className="bg-white rounded-md overflow-hidden shadow-md m-4 flex">
        <div className="p-4 flex-1">
          <h2 className="text-lg font-semibold">User: {request.number}</h2>
          <p className="text-gray-500 text-sm">Requested on {request.creationTime}</p>

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
          {request.status === 'approved' && (
            <div className="mt-2 flex justify-end">
              <button
                onClick={() => handleApprove(request)}
                className="text-green-600 hover:text-green-800 focus:outline-none focus:text-green-800"
              >
                <FaCheck />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <TailSpin type="TailSpin" color="blue" height={50} width={50} />
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-[#f6f6f6] pl-[15px]`}>
      <Header />
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Pending Requests</h2>
        <div>
          {pendingRequests.map((request) => (
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

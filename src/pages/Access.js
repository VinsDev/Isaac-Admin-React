import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaBan } from 'react-icons/fa';
import { getUsers, changeUserStatus } from '../services/firebaseServices';
import { TailSpin } from 'react-loader-spinner';

const AccessManagement = ({ darkMode }) => {
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingAddToBlackList, setLoadingAddToBlackList] = useState(false);
  const [loadingRemoveFromBlackList, setLoadingRemoveFromBlackList] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        // Handle error
        console.error('Error fetching users:', error);
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

  const greenListedUsers = users.filter((user) => user.status === 'active');
  const blackListedUsers = users.filter((user) => user.status === 'inactive');

  const AccessCard = ({ user, onAddToBlackList, onRemoveFromBlackList }) => {
    return (
      <div className="bg-white rounded-md overflow-hidden shadow-md m-4 flex">
        <div className="p-4 flex-1">
          <h2 className="text-lg font-semibold">User: {user.phone}</h2>
          <p className={`text-sm ${user.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
            Access Status: {user.status === 'active' ? 'Green Listed' : 'Black Listed'}
          </p>
          {user.status === 'active' && (
            <button
              onClick={() => onAddToBlackList(user.phone)}
              className={`text-red-600 mt-2 focus:outline-none ${loadingAddToBlackList && 'opacity-50 cursor-not-allowed'}`}
              disabled={loadingAddToBlackList}
            >
              {loadingAddToBlackList ? 'Adding to Black List...' : 'Add to Black List'} <FaBan className="inline-block ml-1" />
            </button>
          )}
          {user.status === 'inactive' && (
            <button
              onClick={() => onRemoveFromBlackList(user.phone)}
              className={`text-red-600 mt-2 focus:outline-none ${loadingRemoveFromBlackList && 'opacity-50 cursor-not-allowed'}`}
              disabled={loadingRemoveFromBlackList}
            >
              {loadingRemoveFromBlackList ? 'Removing from Black List...' : 'Remove from Black List'} <FaBan className="inline-block ml-1" />
            </button>
          )}
        </div>
      </div>
    );
  };

  const addToBlackList = async (phone) => {
    try {
      setLoadingAddToBlackList(true);
      await changeUserStatus(phone, "inactive");
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error('Error adding user to Black List:', error);
    } finally {
      setLoadingAddToBlackList(false);
    }
  };

  const removeUserFromBlackList = async (phone) => {
    try {
      setLoadingRemoveFromBlackList(true);
      await changeUserStatus(phone, "active");
      const fetchedUsers = await getUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error('Error removing user from Black List:', error);
    } finally {
      setLoadingRemoveFromBlackList(false);
    }
  };

  if (loadingUsers) {
    return (
      <div className="flex items-center justify-center h-full">
        <TailSpin type="TailSpin" color="blue" height={50} width={50} />
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-[#f6f6f6] pl-[15px]`}>
      <Header />
      <div>
        <h2 className="text-lg font-semibold mb-2">Green-Listed Users</h2>
        <div>
          {greenListedUsers.map((user) => (
            <div key={user.id} className="mb-4">
              <AccessCard user={user} onAddToBlackList={addToBlackList} onRemoveFromBlackList={removeUserFromBlackList} />
            </div>
          ))}
        </div>

        <h2 className="text-lg font-semibold mt-6 mb-2">Black-Listed Users</h2>
        <div>
          {blackListedUsers.map((user) => (
            <div key={user.id} className="mb-4">
              <AccessCard user={user} onAddToBlackList={addToBlackList} onRemoveFromBlackList={removeUserFromBlackList} />
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

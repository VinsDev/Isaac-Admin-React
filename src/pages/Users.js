import React, { useEffect, useRef, useState } from 'react';
import { FaEllipsisV, FaEdit, FaTrash, FaGlobe, FaUser } from 'react-icons/fa';

const Users = ({ darkMode, setDarkMode }) => {
    // Data . . .
    const dummyUsers = [
        {
            id: 1,
            name: 'John Doe',
            image: 'https://placekitten.com/300/200', // Placeholder image
            phoneNumber: '123-456-7890',
            registrationDate: '2022-02-15',
        },
        {
            id: 2,
            name: 'Jane Smith',
            image: 'https://placekitten.com/300/201', // Placeholder image
            phoneNumber: '987-654-3210',
            registrationDate: '2022-02-20',
        },
        {
            id: 3,
            name: 'Jane Smith',
            image: 'https://placekitten.com/300/201', // Placeholder image
            phoneNumber: '987-654-3210',
            registrationDate: '2022-02-20',
        },
        {
            id: 4,
            name: 'Jane Smith',
            image: 'https://placekitten.com/300/201', // Placeholder image
            phoneNumber: '987-654-3210',
            registrationDate: '2022-02-20',
        },
        {
            id: 5,
            name: 'Jane Smith',
            image: 'https://placekitten.com/300/201', // Placeholder image
            phoneNumber: '987-654-3210',
            registrationDate: '2022-02-20',
        },
    ];

    const UserList = () => {
        return (
            <div>
                {dummyUsers.map((user) => (
                    <div key={user.id} className="mb-4">
                        <UserCard user={user} />
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className={`min-h-screen bg-[#f6f6f6] pl-[15px]`}>
            <Header />
            <UserList />
        </div>
    )
};

// Components . . .
const Header = () => {
    return (<div>
        <div className={`px-[25px] py-[20px] bg-white rounded-bl-[5px] mb-[20px]`}>
            <div className='flex flex-col md:flex-row justify-between items-center'>
                <div className='mb-[10px] md:mb-0'>
                    <p className='text-[#23255c] text-[20px] leading-[25px] font-bold'>Users</p>
                </div>
                <div className='flex items-center justify-center'>
                    <div className='pr-[20px] border-r-[1px]'>
                    </div>
                    <div className='flex items-center gap-[20px] px-[20px]'>
                        <FaGlobe color='#3c3e6e' />
                        <FaUser color='#3c3e6e' />
                    </div>
                </div>
            </div>
        </div>
    </div>)
};

const UserCard = ({ user }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleEdit = () => {
        // Handle edit operation
        console.log(`Edit user: ${user.name}`);
        closeMenu();
    };

    const handleDelete = () => {
        // Handle delete operation
        console.log(`Delete user: ${user.name}`);
        closeMenu();
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <div className="bg-white rounded-md overflow-hidden shadow-md m-4 flex">
            <img src={user.image} alt={`${user.name}'s profile`} className="w-32 h-32 object-cover object-left" />

            <div className="p-4 flex-1">
                <h2 className="text-lg font-semibold">{user.name}</h2>
                <p className="text-gray-600">{user.phoneNumber}</p>
                <p className="text-gray-500 text-sm">Registered on {user.registrationDate}</p>

                {/* Three dots menu */}
                <div className="mt-2 flex justify-end">
                    <button
                        onClick={handleMenuToggle}
                        className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600"
                    >
                        <FaEllipsisV />
                    </button>

                    {/* Edit and Delete menu */}
                    {isMenuOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-md overflow-hidden">
                            <button
                                onClick={handleEdit}
                                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 focus:outline-none"
                            >
                                <FaEdit className="inline-block mr-2" />
                                Edit
                            </button>
                            <button
                                onClick={handleDelete}
                                className="block px-4 py-2 text-red-600 hover:bg-red-100 focus:outline-none"
                            >
                                <FaTrash className="inline-block mr-2" />
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};


export default Users

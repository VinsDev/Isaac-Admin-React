import React, { useState } from 'react';
import { FaEllipsisV, FaTrash, FaKey, FaClock } from 'react-icons/fa';

const Otps = ({ darkMode }) => {
    // Data . . .
    const dummyOtps = [
        {
            id: 1,
            userId: 1, // Associated user ID
            code: '123456',
            expirationTime: '2022-02-15T12:00:00',
        },
        {
            id: 2,
            userId: 2, // Associated user ID
            code: '123456',
            expirationTime: '2022-02-15T12:00:00',
        },
        {
            id: 3,
            userId: 3, // Associated user ID
            code: '123456',
            expirationTime: '2022-02-15T12:00:00',
        },
        {
            id: 4,
            userId: 4, // Associated user ID
            code: '123456',
            expirationTime: '2022-02-15T12:00:00',
        },
        {
            id: 5,
            userId: 5, // Associated user ID
            code: '123456',
            expirationTime: '2022-02-15T12:00:00',
        },
    ];

    const dummyUsers = [
        {
            id: 1,
            name: 'John Doe',
            phoneNumber: '123-456-7890',
        },
        {
            id: 2,
            name: 'John Doe',
            phoneNumber: '123-456-7890',
        },
        {
            id: 3,
            name: 'John Doe',
            phoneNumber: '123-456-7890',
        },
        {
            id: 4,
            name: 'John Doe',
            phoneNumber: '123-456-7890',
        },
        {
            id: 5,
            name: 'John Doe',
            phoneNumber: '123-456-7890',
        },
    ];

    const getUserById = (userId) => {
        return dummyUsers.find((user) => user.id === userId);
    };

    const OtpList = () => {
        return (
            <div>
                {dummyOtps.map((otp) => (
                    <div key={otp.id} className="mb-4">
                        <OtpCard otp={otp} user={getUserById(otp.userId)} />
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className={`min-h-screen bg-[#f6f6f6] pl-[15px]`}>
            <Header />
            <OtpList />
        </div>
    );
};

const Header = () => {
    return (
        <div>
            <div className={`px-[25px] py-[20px] bg-white rounded-bl-[5px] mb-[20px]`}>
                <div className='flex flex-col md:flex-row justify-between items-center'>
                    <div className='mb-[10px] md:mb-0'>
                        <p className='text-[#23255c] text-[20px] leading-[25px] font-bold'>OTPs</p>
                    </div>
                    <div className='flex items-center justify-center'>
                        <div className='pr-[20px] border-r-[1px]'></div>
                        <div className='flex items-center gap-[20px] px-[20px]'>
                            <FaKey color='#3c3e6e' />
                            <FaClock color='#3c3e6e' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const OtpCard = ({ otp, user }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleDelete = () => {
        // Handle delete operation
        console.log(`Delete OTP with code: ${otp.code}`);
        closeMenu();
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <div className="bg-white rounded-md overflow-hidden shadow-md m-4 flex">
            <div className="p-4 flex-1">
                <h2 className="text-lg font-semibold">OTP Code: {otp.code}</h2>
                <p className="text-gray-500 text-sm">Expires on {new Date(otp.expirationTime).toLocaleString()}</p>

                {/* Associated User Info */}
                {user && (
                    <div className="mt-2">
                        <p className="text-sm text-gray-600">Associated User:</p>
                        <p className="text-sm font-semibold">{user.name}</p>
                        <p className="text-sm">{user.phoneNumber}</p>
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

                    {/* Delete menu */}
                    {isMenuOpen && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-md overflow-hidden">
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

export default Otps;

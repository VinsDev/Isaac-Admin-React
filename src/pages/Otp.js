import React, { useState, useEffect } from 'react';
import { FaEllipsisV, FaTrash, FaKey, FaClock } from 'react-icons/fa';
import { getAllOTPs, getUsers } from '../services/firebaseServices';
import { format, parseISO } from 'date-fns';
import { TailSpin } from 'react-loader-spinner';

const Otps = () => {
    const [otps, setOtps] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedOtps = await getAllOTPs();
                const fetchedUsers = await getUsers();

                // Sort OTPs by expirationDate in descending order (latest first)
                const sortedOtps = fetchedOtps.sort(
                    (a, b) => parseISO(b.expirationDate) - parseISO(a.expirationDate)
                );

                setOtps(sortedOtps);
                setUsers(fetchedUsers);
                setLoading(false);
            } catch (error) {
                // Handle error
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        // Fetch data initially
        fetchData();

        // Refresh data every 5 seconds
        const intervalId = setInterval(fetchData, 5000);

        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    const getUserByPhone = (phone) => {
        return users.find((user) => user.phone === phone);
    };

    const OtpList = () => {
        return (
            <div>
                {otps.map((otp) => (
                    <div key={otp.id} className="mb-4">
                        <OtpCard otp={otp} user={getUserByPhone(otp.phoneNumber)} />
                    </div>
                ))}
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
            <OtpList />
        </div>
    );
};

const Header = () => {
    return (
        <div>
            <div className={`px-[25px] py-[20px] bg-white rounded-bl-[5px] mb-[20px]`}>
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-[10px] md:mb-0">
                        <p className="text-[#23255c] text-[20px] leading-[25px] font-bold">OTPs</p>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="pr-[20px] border-r-[1px]"></div>
                        <div className="flex items-center gap-[20px] px-[20px]">
                            <FaKey color="#3c3e6e" />
                            <FaClock color="#3c3e6e" />
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
                <p className="text-gray-500 text-sm">Expires on {otp.expirationDate}</p>

                {/* Associated User Info */}
                {user && (
                    <div className="mt-2">
                        <p className="text-sm text-gray-600">Associated User:</p>
                        <p className="text-md font-semibold">{user.phone}</p>
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

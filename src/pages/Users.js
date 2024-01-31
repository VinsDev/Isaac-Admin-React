import React, { useEffect, useRef, useState } from 'react';
import { FaEllipsisV, FaEdit, FaTrash, FaGlobe, FaUser } from 'react-icons/fa';
import { getUsers, editUser, deleteUser } from '../services/firebaseServices';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { TailSpin } from 'react-loader-spinner';


const Users = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const fetchedUsers = await getUsers();
                setUsers(fetchedUsers);
            } catch (error) {
                // Handle error
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const UserList = () => {
        if (loading) {
            return (
                <div className="flex items-center justify-center h-full">
                    <TailSpin type="TailSpin" color="blue" height={50} width={50} />
                </div>
            );
        }

        return (
            <div>
                {users.map((user) => (
                    <div key={user.id} className="mb-4">
                        <UserCard user={user} setLoading={setLoading} />
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
    );
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

const UserCard = ({ user, setLoading }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleEdit = () => {
        // Call the editUser function from your services
        // const newData = {};
        // editUser(user.id, newData)
        //     .then(() => {
        //         console.log(`User edited successfully: ${user.name}`);
        //         // You may want to refetch the users after editing
        //         // For simplicity, I'm just logging the success for now
        //     })
        //     .catch((error) => {
        //         console.error('Error editing user:', error);
        //     });

        closeMenu();
    };

    const handleDelete = async () => {
        try {
            await deleteUser(user.id);
            console.log(`User deleted successfully: ${user.name}`);
            setLoading(true);
            await getUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        } finally {
            closeMenu();
            setLoading(false);
        }
    };


    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <div className="bg-white rounded-md overflow-hidden shadow-md m-4 flex">
            {user.image ? (
                <img src={user.image} alt={`${user.name}'s profile`} className="w-32 h-32 object-cover object-left" />
            ) : (
                <div className="w-32 h-32 bg-blue-300 flex items-center justify-center">
                    <FaUser size={40} color="#FFFFFF" />
                </div>
            )}

            <div className="p-4 flex-1">
                <h2 className="text-lg font-semibold">{user.name}</h2>
                <p className="text-gray-600">{user.phoneNumber}</p>
                <p className="text-gray-500 text-sm">Registered on {user.registration_date}</p>

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

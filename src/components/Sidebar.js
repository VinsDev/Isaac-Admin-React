import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaAccessibleIcon, FaUniversity, FaShoppingCart, FaClipboardList } from 'react-icons/fa';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedActiveItem = localStorage.getItem('activeItem');
    setActiveItem(storedActiveItem || "Users");
  }, []);

  const handleItemClick = (itemName) => {
    // Set the clicked item as active and navigate to the corresponding route
    setActiveItem(itemName);
    navigate(`/app/${itemName.toLowerCase()}`);
    localStorage.setItem('activeItem', itemName);
  };

  const handleLogout = () => {
    // Clear user information from localStorage and navigate to the login page
    localStorage.removeItem('activeItem');
    navigate('/');
  };

  const sidebarItems = [
    { icon: <FaUser />, text: "Users" },
    { icon: <FaAccessibleIcon />, text: "Access" },
    { icon: <FaUniversity />, text: "OTP" },
    { icon: <FaShoppingCart />, text: "Requests" },
    { icon: <FaClipboardList />, text: "History" },
  ];

  return (
    <div className="min-h-screen px-[10px]">
      {/* Logo */}
      <div className='pt-[30px] pb-[20px] items-center justify-center'>
        <div className='flex justify-center relative'>
          <h2 className={`text-[#24245c]/[0.9] text-[18px] leading-[25px] font-bold tracking-wide $`}>DOOR SECURITY</h2>
        </div>
        <div className='flex justify-center items-center'>
          <h2 className={`text-[#24245c]/[0.9] text-[18px] leading-[25px] font-bold tracking-wide $`}>SYSTEM</h2>
        </div>
      </div>
      {sidebarItems.map((item, index) => (
        <SidebarItem
          key={index}
          icon={item.icon}
          text={item.text}
          isActive={activeItem === item.text}
          onItemClick={() => handleItemClick(item.text)}
        />
      ))}
      {/* Logout button */}
      <button
        className={`flex items-center justify-center gap-[15px] py-[8px] pl-[50px] pr-[50px] mt-[25px] cursor-pointer text-blue-500 border border-blue-500 hover:text-white hover:bg-blue-500 hover:border-transparent focus:outline-none rounded-full`}
        onClick={handleLogout}
      >
        <p className={`text-[18px] font-normal tracking-wide`}>Logout</p>
      </button>


    </div>
  );
};

const SidebarItem = ({ icon, text, isActive, onItemClick }) => {
  return (
    <div
      className={`flex items-center gap-[15px] py-[8px] pl-[30px] pr-[50px] my-[2px] cursor-pointer ${isActive ? 'bg-[#56bce4] rounded-[8px]' : 'text-[#9fa1b8]'
        }`}
      onClick={onItemClick}
    >
      {icon}
      <p className={`text-[14px] font-normal ${isActive ? 'text-white' : 'text-black'} tracking-wide`}>{text}</p>
    </div>
  );
};

export default Sidebar;

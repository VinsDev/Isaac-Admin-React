import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaUser, FaUniversity, FaShoppingCart, FaClipboardList, FaAddressCard, FaAccessibleIcon } from 'react-icons/fa';

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const navigate = useNavigate();

  const handleItemClick = (itemName) => {
    // Set the clicked item as active and navigate to the corresponding route
    setActiveItem(itemName);
    navigate(`/app/${itemName.toLowerCase()}`); // Assuming the route names match the item names
  };

  const sidebarItems = [
    { icon: <FaHome />, text: "Dashboard" },
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

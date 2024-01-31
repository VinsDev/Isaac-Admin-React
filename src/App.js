import './App.css';
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import { Outlet } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';


function App({darkMode}) {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };
  const closeSidebar = () => {
    setSidebarVisible(false);
  };

  return (
    <div className="flex max-w-screen">
      {sidebarVisible && (
        <div className='md:hidden'>
          <div
            className="fixed inset-0 bg-white opacity-5 z-40"
            onClick={closeSidebar}
          ></div>
        </div>

      )}

      <div className={`md:basic-[20%] bg-white text-white ${sidebarVisible ? 'translate-x-0' : '-translate-x-full'} transform transition-transform duration-300 ease-in-out fixed top-0 left-0 md:static md:translate-x-0 md:flex md:inset-0`} style={{ zIndex: sidebarVisible ? '50' : '0' }}>
        <Sidebar darkMode={darkMode} />
      </div>
      <div className='md:basic-[80%] w-full'>
        <div className='md:hidden pl-8 pt-8 bg-transparent'>
          <FaBars onClick={toggleSidebar} size={25} color='#b0b0b0' />
        </div>
        <div>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
}

export default App;

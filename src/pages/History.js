import React, { useState, useEffect } from 'react';
import { FaHistory } from 'react-icons/fa';
import { getAllOTPHistory } from '../services/firebaseServices';

const CheckInHistory = ({ darkMode }) => {
  const [otpHistory, setOTPHistory] = useState([]);

  const fetchOTPHistory = async () => {
    try {
      const history = await getAllOTPHistory();
      setOTPHistory(history);
    } catch (error) {
      console.error('Error fetching OTP history:', error);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchOTPHistory();

    // Fetch OTP history every 5 seconds
    const intervalId = setInterval(fetchOTPHistory, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const OTPCard = ({ otp }) => {
    return (
      <div className="bg-white rounded-md overflow-hidden shadow-lg m-4 flex">
        <div className="p-4 flex-1">
          <h2 className="text-lg font-semibold">Code: {otp.code}</h2>
          <p className="text-gray-500 text-sm">
            Phone Number: {otp.phoneNumber}, Verified on {new Date(otp.verificationTime).toLocaleString()}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className={`min-h-screen bg-[#f6f6f6] pl-[15px]`}>
      <Header />
      <div>
        <h2 className="text-lg font-semibold mb-2">Check-In History</h2>

        {/* Render OTP history */}
        {otpHistory.map((otp) => (
          <div key={otp.id} className="mb-4">
            <OTPCard otp={otp} />
          </div>
        ))}
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
            <p className='text-[#23255c] text-[20px] leading-[25px] font-bold'>Check-In History</p>
          </div>
          <div className='flex items-center justify-center'>
            <div className='pr-[20px] border-r-[1px]'></div>
            <div className='flex items-center gap-[20px] px-[20px]'>
              <FaHistory color='#3c3e6e' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckInHistory;

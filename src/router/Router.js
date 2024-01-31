import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import App from '../App';
import Login from '../pages/Login';
import Users from '../pages/Users';
import Otps from '../pages/Otp';
import RegistrationRequests from '../pages/Requests';
import CheckInHistory from '../pages/History';
import AccessManagement from '../pages/Access';

const Router = () => {
    const [darkMode, setDarkMode] = useState(false);

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/app" element={<App darkMode={darkMode} />}>
                        <Route index path='/app/dashboard' element={<Dashboard />} />
                        <Route path='/app/users' element={<Users />} />
                        <Route path='/app/otp' element={<Otps />} />
                        <Route path='/app/requests' element={<RegistrationRequests />} />
                        <Route path='/app/history' element={<CheckInHistory />} />
                        <Route path='/app/access' element={<AccessManagement />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default Router;

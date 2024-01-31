import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import 'tailwindcss/tailwind.css';

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(null);

  const users = [
    { username: 'Vincent', email: 'vincent@example.com', phone: '1234567890', password: '123' },
    { username: 'Isaac', email: 'john.doe@example.com', phone: '9876543210', password: '123' },
    { username: 'Manji', email: 'john.doe@example.com', phone: '9876543210', password: '1234' },
  ];

  // Wake server up . . .
  useEffect(() => {
    const wakeUpServer = async () => {
      try {
        await fetch('https://door-lock-system.onrender.com/getUsers');
        console.log('Server woke up successfully!');
      } catch (error) {
        console.error('Error waking up server:', error);
      }
    };

    wakeUpServer();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    // Check the entered credentials against the list of users
    const matchedUser = users.find(
      (user) => (user.username === username || user.email === username || user.phone === username) && user.password === password
    );

    if (matchedUser) {
      // Redirect to the app if the credentials are correct
      navigate('/app/users');
    } else {
      // Display an error message if the credentials are incorrect
      setLoginStatus('Incorrect username or password! Try Again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-fixed" style={{ backgroundImage: 'url("/image.jpg")' }}>
      <Box className="bg-white opacity-90 p-8 rounded-lg shadow-lg w-96 border-[1px]">
        <div className="mb-8 flex justify-center">
          <div className=" text-black  flex items-center justify-center text-[24px] font-normal p-[8px]">
            Door Security System Login
          </div>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <TextField
              fullWidth
              label="Username/Email/Phone"
              variant="outlined"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <TextField
              fullWidth
              type="password"
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {loginStatus && (
            <div id="loginStatus" className="alert alert-danger mb-4 text-red-700">
              {loginStatus}
            </div>
          )}

          <Button type="submit" variant="outlined" color="primary" fullWidth>
            Login
          </Button>
          <a href="#" className="text-right block mt-4 text-blue-500">Forgot Password</a>
        </form>
      </Box>
    </div>
  );
};

export default Login;

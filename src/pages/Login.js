import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS

const Login = () => {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();

    // Check the entered username and password
    if (username === 'Vincent' && password === '123') {
      // Redirect to the app if the credentials are correct
      navigate('/app/dashboard');
    } else {
      // Display an error message if the credentials are incorrect
      setLoginStatus('Incorrect username or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-fixed" style={{ backgroundImage: 'url("assets/images/background.jpg")' }}>
      <div className="bg-whitesmoke p-8 rounded-lg shadow-lg w-96">
        <div className="mb-8 flex justify-center">
          <div className="bg-blue-500 text-white font-bold flex items-center justify-center text-[20px] p-[8px] rounded-[8px]">
            Door Security System Login
          </div>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700">Username</label>
            <input
              type="text"
              className="form-input mt-1 block w-full"
              id="username"
              name="username"
              aria-describedby="emailHelp"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              className="form-input mt-1 block w-full"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4 flex items-center">
            <input type="checkbox" className="form-checkbox" id="remember" />
            <label className="ml-2 text-gray-700" htmlFor="remember">Remember account</label>
          </div>

          {loginStatus && (
            <div id="loginStatus" className="alert alert-danger mb-4">
              {loginStatus}
            </div>
          )}

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md block mx-auto">
            Login
          </button>
          <a href="#" className="text-right block mt-4 text-blue-500">Forgot Password</a>
        </form>
      </div>
    </div>
  );
};

export default Login;

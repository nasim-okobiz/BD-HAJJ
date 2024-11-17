import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // Import useSelector
import api from '../components/axios/Axios';
import { toast } from 'react-toastify';
import { setCredentials } from '../redux/slices/auth/authslice';

const LoginCard = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Retrieve user and accessToken from Redux state
  const { user, accessToken } =  ((state) => state.auth);

  // Redirect to home if user is already logged in
  useEffect(() => {
    if (user && accessToken) {
      navigate('/'); // Redirect to the home page
    }
  }, [user, accessToken, navigate]);

  const notify = (message, type) => {
    toast[type](message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const validateForm = () => {
    let isValid = true;
    const loginRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+|^(0|\+880)[1-9]\d{9}$/;

    if (!login) {
      notify('Email or Phone Number is required', 'error');
      setLoginError(true);
      isValid = false;
    } else if (!loginRegex.test(login)) {
      notify('Please enter a valid email or phone number', 'error');
      setLoginError(true);
      isValid = false;
    } else {
      setLoginError(false);
    }

    if (!password) {
      notify('Password is required', 'error');
      setPasswordError(true);
      isValid = false;
    } else {
      setPasswordError(false);
    }

    return isValid;
  };

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
    setLoginError(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const payload = login.includes('@')
          ? { email: login, password }
          : { phone: login, password };

        const response = await api.post('/auth/singin', payload);
        console.log('Login successful:', response.data.data);

        // Dispatch the action to store the credentials
        dispatch(setCredentials({
          accessToken: response.data.data.accessToken,
          user: response.data.data.user,
        }));

        notify('Login successful!', 'success');
        setLogin('');
        setPassword('');

        // Navigate to the dashboard or another page
        navigate('/'); // Adjust this path as needed
      } catch (error) {
        console.error('Login error:', error.response ? error.response.data : error.message);
        notify('Login failed, please try again.', 'error');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md mb-32">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="login" className="block text-sm font-medium text-gray-700 mb-3">
                Email or Phone Number
              </label>
              <input
                type="text"
                id="login"
                value={login}
                onChange={handleLoginChange}
                required
                className={`block w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-1 ${loginError ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500`}
                placeholder="you@example.com or 01234567890"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-3">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
                required
                className={`block w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-1 ${passwordError ? 'border-red-500' : 'border-gray-300'} focus:ring-blue-500`}
                placeholder="********"
              />
            </div>
            <p className="text-sm text-right">
              <Link to="/forget-password" className="text-black hover:text-semisecondary transition-all ease-linear duration-200">
                Forget your password?
              </Link>
            </p>
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-6 transition-all ease-linear duration-200 text-white bg-primary rounded-md hover:bg-transparent border hover:text-primary font-semibold hover:border-primary"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-center">
          Don't have an account?{' '}
          <Link className="text-semisecondary font-semibold" to="/registration">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginCard;

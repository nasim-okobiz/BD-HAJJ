// src/components/SuccessPage.js

import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { clearCredentials, setCredentials } from '../../redux/slices/auth/authslice';
const SuccessPage = ({ message }) => {
    const dispatch = useDispatch()
    const location = useLocation();
    const query = new URLSearchParams(location.search);

    // Retrieve `data` from the query parameters and parse it back into an object
    const data = query.get('data');
    let parsedData;

    try {
        parsedData = JSON.parse(decodeURIComponent(data));
    } catch (error) {
        console.error("Failed to parse data:", error);
        parsedData = data; // Fallback in case of error
    }
    if (parsedData) {
        dispatch(clearCredentials())
        dispatch(setCredentials({
            accessToken: parsedData.accessToken,
            user: parsedData.user
        }));
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-green-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h2 className="text-3xl font-bold text-green-600">Success!</h2>
                <p className="mt-4 text-gray-600">{message || "Your operation was successful."}</p>
                <div className="mt-6">
                    <a href="/" className="text-white bg-green-600 hover:bg-green-700 font-bold py-2 px-4 rounded">
                        Go to Dashboard
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SuccessPage;

// src/components/FailurePage.js

import React from 'react';

const FailurePage = ({ message }) => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-red-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h2 className="text-3xl font-bold text-red-600">Oops!</h2>
                <p className="mt-4 text-gray-600">{message || "Something went wrong. Please try again."}</p>
                <div className="mt-6">
                    <a href="/" className="text-white bg-red-600 hover:bg-red-700 font-bold py-2 px-4 rounded">
                        Return to Home
                    </a>
                </div>
            </div>
        </div>
    );
};

export default FailurePage;

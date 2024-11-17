import React from 'react';

const Header = () => {
    return (
        <div className="flex items-center justify-between bg-blue-600 p-4 text-white">
            <div className="flex items-center">
                <div className="w-16 h-16 bg-gray-300 rounded-full mr-4">
                    {/* Profile Picture */}
                </div>
                <span className="font-bold">Silver Member</span>
            </div>
            <div className="text-orange-400">ID NO:</div>
            <div className="flex space-x-4">
                <div className="bg-blue-800 rounded-full px-4 py-2">Umrah Pkg</div>
                <div className="bg-blue-800 rounded-full px-4 py-2">Hajj Pkg</div>
                <div className="bg-blue-800 rounded-full px-4 py-2">Tour Pkg</div>
                <div className="bg-blue-800 rounded-full px-4 py-2">Free Pkg</div>
            </div>
        </div>
    );
};

export default Header;

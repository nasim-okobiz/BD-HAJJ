import React from "react";
import { FaYoutube, FaWhatsapp } from "react-icons/fa"; // React Icons for YouTube and WhatsApp

const SocialMediaIcons = () => {
    return (
        <div className="fixed left-4 bottom-4 sm:top-1/2 sm:left-0  z-30">
            {/* YouTube Icon */}
           <div className="w-10 h-10  bg-red-600 flex justify-center items-center mb-1 hover:scale-105 duration-200">
           <a
                href="https://www.youtube.com/@hajjandumrahtrips"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-3xl sm:text-4xl transition-colors"
            >
                <FaYoutube className="p-1"/>
            </a>
           </div>

            {/* WhatsApp Icon */}
           <div className="w-10 h-10  bg-green-500 flex justify-center items-center mb-5 hover:scale-105 duration-200">
           <a
                href="https://wa.me/+8801777899993"
                target="_blank"
                rel="noopener noreferrer"
               className="text-white text-3xl sm:text-4xl transition-colors"
            >
                <FaWhatsapp className="p-1"/>
            </a>
           </div>
        </div>
    );
};

export default SocialMediaIcons;

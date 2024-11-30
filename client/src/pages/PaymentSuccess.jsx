import React, { useEffect, useState } from "react";
import { TiArrowBackOutline } from "react-icons/ti";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Start the animation when the component mounts
    setAnimate(true);
  }, []);

  return (
    <div className=" bg-gray-100  flex items-center justify-center sm:h-screen">
      <div className="flex  flex-col items-center shadow-md rounded-md justify-center border-b-[4px] border-b-green-600  px-40 py-16 bg-white font-merriweather">
        <svg width="200" height="200" className="mb-4">
          {/* Circle Animation */}
          <circle
            fill="none"
            stroke="#16a34a"
            strokeWidth="16"
            cx="100"
            cy="100"
            r="90"
            className={`${animate ? "animate-circle" : ""}`}
            strokeLinecap="round"
            transform="rotate(-90 100 100)"
          />

          {/* Checkmark Animation */}
          <polyline
            fill="none"
            stroke="#16a34a"
            strokeWidth="14"
            points="44,107 87,142 152,69"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${animate ? "animate-tick" : ""}`}
          />
        </svg>

        {/* Payment Success Text */}
        <h2
          className={`text-4xl mt-7 font-bold text-gray-800 opacity-0 ${
            animate ? "animate-title" : ""
          }`}
        >
          Payment Success
        </h2>

        <Link
          to={`/dashboard`}
          className="py-2.5 mt-12  rounded-lg text-white px-6 flex items-center gap-1 bg-semisecondary text-[20px] font-medium"
        >
          <TiArrowBackOutline /> Go To Dashboard
        </Link>

        {/* Styles for keyframes and animations */}
        <style jsx>{`
          @keyframes circle {
            from {
              stroke-dashoffset: 1194;
            }
            to {
              stroke-dashoffset: 2388;
            }
          }

          @keyframes tick {
            from {
              stroke-dashoffset: 350;
            }
            to {
              stroke-dashoffset: 0;
            }
          }

          @keyframes title {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }

          .animate-circle {
            stroke-dasharray: 1194;
            stroke-dashoffset: 1194;
            animation: circle 1s ease-in-out forwards;
          }

          .animate-tick {
            stroke-dasharray: 350;
            stroke-dashoffset: 350;
            animation: tick 0.8s ease-out forwards;
            animation-delay: 0.95s;
          }

          .animate-title {
            animation: title 0.6s ease-in-out forwards;
            animation-delay: 1.2s;
          }
        `}</style>
      </div>
    </div>
  );
};

export default PaymentSuccess;

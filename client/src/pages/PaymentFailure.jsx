import React from "react";
import { TiArrowBackOutline } from "react-icons/ti";
import { Link } from "react-router-dom";
import { MdErrorOutline } from "react-icons/md";

const PaymentFailure = () => {
  return (
    <div className="flex justify-center sm:h-screen items-center bg-gray-100 font-merriweather">
      <div className="col-md-5 w-full max-w-lg rounded-md px-6 py-10 bg-white shadow-lg text-center border-b-4 border-red-500 mt-10">
        <div className="text-red-500 mb-4 flex justify-center animate-fadeInDown delay-150">
          <MdErrorOutline className="text-[180px]" />
        </div>
        <h2 className="text-4xl font-semibold mb-2 animate-fadeInDown delay-300">
          Your payment failed
        </h2>
        <p className="text-lg text-gray-600 font-medium animate-fadeInDown delay-500">
          Try again later
        </p>
        <Link
          to={`/dashboard`}
          className="py-2.5 mt-12 inline-block rounded-lg text-white px-6 bg-semisecondary text-[18px] font-medium animate-fadeInDown delay-700"
        >
          <h3 className="flex items-center gap-1.5">
            <TiArrowBackOutline /> Go To Dashboard
          </h3>
        </Link>
      </div>

      <style jsx>{`
        @keyframes fadeInDown {
          0% {
            opacity: 0;
            transform: translateY(-20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInDown {
          animation: fadeInDown 0.8s ease forwards;
        }
        .delay-150 {
          animation-delay: 0.15s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .delay-500 {
          animation-delay: 0.5s;
        }
        .delay-700 {
          animation-delay: 0.7s;
        }
      `}</style>
    </div>
  );
};

export default PaymentFailure;

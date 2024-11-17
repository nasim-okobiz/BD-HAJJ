import React from "react";
import Containar from "../components/container/Containar";
import { GiMoneyStack } from "react-icons/gi";
import { FcMoneyTransfer } from "react-icons/fc";
import { FaUserFriends } from "react-icons/fa";
import AgentButtons from "./AgentButtons";

const BalanceProfile = ({ userData }) => {
  const bookingUsers = userData?.referUsers || 0;
  const balanceAmount = userData?.userRef?.amount || 0;
  const receivedAmount = userData?.userRef?.receivedAmount || 0;

  // Set max progress based on bookingUsers
  const maxUsers = 100;
  let maxProgress = maxUsers;
  if (bookingUsers > 500) {
    maxProgress = 1000;
  } else if (bookingUsers > maxUsers) {
    maxProgress = 500;
  }

  const progress = (bookingUsers / maxProgress) * 100;
  
  // Determine progress bar color and agent type
  let progressColor;
  let agentType = userData?.agentType || "silver";
  
  switch (agentType) {
    case "gold":
      progressColor = "bg-yellow-500";
      break;
    case "diamond":
      progressColor = "bg-blue-300";
      break;
    default:
      progressColor = "bg-gray-400";
  }

  return (
    <div className="bg-gray-100 pb-5">
      <Containar>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-5">
          {/* Balance Section */}
          <div className="col-span-1 lg:col-span-2 flex justify-center items-center bg-white rounded-lg shadow-md p-4">
            <div className="text-center">
              <h2 className="text-3xl flex justify-center text-green-600">
                <GiMoneyStack />
              </h2>
              <h3 className="text-lg font-semibold text-gray-700">
                Balance Amount
              </h3>
              <p className="text-xl font-bold text-green-600 mt-1.5">
                Tk. {balanceAmount?.toLocaleString()} /-
              </p>
            </div>
          </div>

          {/* Received Amount Section */}
          <div className="col-span-1 lg:col-span-2 flex justify-center items-center bg-white rounded-lg shadow-md p-4">
            <div className="text-center">
              <h2 className="text-3xl flex justify-center text-green-600">
                <FcMoneyTransfer />
              </h2>
              <h3 className="text-lg font-semibold text-gray-700">
                Received Amount
              </h3>
              <p className="text-xl font-bold text-green-600 mt-1.5">
                Tk. {receivedAmount?.toLocaleString()} /-
              </p>
            </div>
          </div>

          {/* Booking Users Section */}
          <div className="col-span-1 lg:col-span-2 flex justify-center items-center bg-white rounded-lg shadow-md p-4">
            <div className="text-center">
              <h2 className="text-3xl flex justify-center text-semisecondary">
                <FaUserFriends />
              </h2>
              <h3 className="text-lg font-semibold text-gray-700">
                Total Booking Users
              </h3>
              <p className="text-xl font-bold text-semisecondary mt-1.5">
                {bookingUsers}
              </p>
            </div>
          </div>

          {/* Progress to Next Level */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-6 bg-white rounded-lg shadow-md p-6">
            <AgentButtons type={agentType} />
            <div className="border-t border-gray-300 pt-5 mt-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700 text-lg font-medium">
                  Progress to Next Level
                </span>
                <span className="font-semibold">
                  {bookingUsers}/{maxProgress}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className={`${progressColor} h-4 rounded-full transition-all duration-500`}
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </Containar>
    </div>
  );
};

export default BalanceProfile;

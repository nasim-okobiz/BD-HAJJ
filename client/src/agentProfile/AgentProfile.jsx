import React, { useEffect, useState } from "react";
import api from "../components/axios/Axios";
import BalanceProfile from "./BalanceProfile";
import { API_BASE_URL } from "../components/axios/config";
import Containar from "../components/container/Containar";

const AgentProfile = ({ userId }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get(`/membership/user/${userId}`);
        if (response.data.status === "success") {
          setUserData(response.data.data);
        }
      } catch (error) {
        console.error(error.response.data?.message);
      }
    };

    fetchUserData();
  }, [userId]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="py-10 bg-gray-100">
      <BalanceProfile userData={userData} />
      <Containar >
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-6">
          
          {/* Profile Sidebar */}
          <div className="col-span-1 sm:col-span-4 bg-white shadow-md rounded-lg">
            <div className="sticky top-28 p-6 flex flex-col items-center">
              <div className="w-[125px] h-[125px] flex justify-center items-center mb-5">
                <img
                  className="w-full h-full rounded-full object-cover"
                  src={`${API_BASE_URL}${userData.photo}`}
                  alt="User"
                />
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-medium capitalize">
                  {userData.name || userData.userRef?.name}
                </h2>
                <p className="text-lg font-bold text-[#292929] mt-2 capitalize">
                  {userData.agentType || "Agent"}
                </p>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="col-span-1 sm:col-span-8">
            <div className="flex flex-col sm:flex-row gap-4">
              
              {/* Left Profile Details */}
              <div className="w-full sm:w-[49%] bg-white shadow-md rounded-lg p-4 sm:p-6">
                {[
                  {
                    label: "Full Name",
                    value: userData.name || userData.userRef?.name,
                    classname: "capitalize",
                  },
                  { label: "Email", value: userData.userRef?.email || "N/A" },
                  {
                    label: "Phone Number",
                    value: userData.phone || userData.userRef?.phone || "N/A",
                  },
                  { label: "Address", value: userData.union || "N/A" },
                  { label: "Refer Code", value: userData.referCode || "N/A" },
                ].map((detail, index) => (
                  <div key={index} className="flex gap-x-1 py-2">
                    <div className="w-[50%] font-semibold text-[14px] sm:text-[18px] capitalize">
                      {detail.label}
                    </div>
                    <div className={`${detail?.classname ? detail?.classname : "" } w-[48%] text-[14px] sm:text-[18px]`}>
                      {detail.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Profile Details */}
              <div className="w-full sm:w-[49%] bg-white shadow-md rounded-lg p-4 sm:p-6">
                {[
                  { label: "Occupation", value: userData.occupation || "N/A" },
                  { label: "Agent Type", value: userData.agentType || "N/A" },
                  { label: "District", value: userData.district || "N/A" },
                  { label: "Division", value: userData.division || "N/A" },
                  { label: "Person Category", value: userData.personCategory || "N/A" },
                ].map((detail, index) => (
                  <div key={index} className="flex gap-x-1 py-2">
                    <div className="w-[50%] font-semibold text-[14px] sm:text-[18px] capitalize">
                      {detail.label}
                    </div>
                    <div className="w-[48%] text-[14px] sm:text-[18px]">
                      {detail.value}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>
      </Containar>
    </div>
  );
};

export default AgentProfile;

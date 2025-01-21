import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";
import { useSelector } from "react-redux";
import Containar from "../components/container/Containar";
import Loader from "../components/loader/Loader";
import api from "../components/axios/Axios";
import { API_BASE_URL } from "../components/axios/config";

const MembershipPage = () => {
  const role = useSelector((store) => store?.auth?.user?.role);
  const [joinuss, setJoinuss] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [membershipParameter, setMembershipParameter] = useState([]);
  const [membershipInfo, setMembershipInfo] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Join Us data
        const joinUsResponse = await api.get(`/join-us`);
        setJoinuss(joinUsResponse?.data?.data || []);

        // Fetch Membership Parameters
        const parameterResponse = await api.get(`/membership-parameter`);
        setMembershipParameter(parameterResponse?.data?.data || []);

        // Fetch Membership Info
        const infoResponse = await api.get(`/membershipinfo`);
        setMembershipInfo(infoResponse?.data?.data || []);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <section className="membership-inner-header font-merriweather">
        <div className="py-5 pl-4 sm:pl-[140px] bg-gray-100 z-10">
          <Containar>
            <nav className="flex items-center space-x-2 text-gray-600 text-base sm:text-lg">
              <Link to="/" className="hover:text-semisecondary font-bold">
                Home
              </Link>
              <AiOutlineRight />
              <span className="text-sm sm:text-lg">Membership</span>
            </nav>
          </Containar>
        </div>
        <Containar className="py-16">
          <h1
            className="text-center text-[32px] sm:text-[60px] font-semibold text-semisecondary"
            style={{ textShadow: "1px 1px 1px #000000b0" }}
          >
            {membershipInfo.length > 0 ? membershipInfo[0]?.header : "Loading..."}
          </h1>
          {membershipInfo.length > 0 && membershipInfo[0]?.photo && (
            <img
              src={API_BASE_URL + membershipInfo[0]?.photo}
              className="w-full mt-6 rounded-xl"
              alt="BD Umrah Hajj Kafela Membership"
            />
          )}
        </Containar>
      </section>

      <section className="mt-4 membership-questions font-merriweather pb-16 md:pb-36">
        <Containar>
          <div>
            <h2 className="text-[22px] sm:text-[36px] font-bold mb-4">
              {membershipInfo.length > 0 ? membershipInfo[0]?.title : "Loading..."}
            </h2>
            <p className="text-justify mb-6 text-[16px] sm:text-[18px]">
              {membershipInfo.length > 0 ? membershipInfo[0]?.description : ""}
            </p>
          </div>

          <div className="grid grid-cols-1">
            <div className="col-span-1">
              <div className="card bg-white shadow-md p-4">
                <div className="overflow-x-auto">
                  <table className="table-auto w-full text-left">
                    <thead className="bg-gray-200 text-[16px] sm:text-[20px]">
                      <tr>
                        <th className="px-4 py-2">PARTICULARS</th>
                        <th className="px-4 py-2">DIAMOND</th>
                        <th className="px-4 py-2">GOLD</th>
                        <th className="px-4 py-2">SILVER</th>
                      </tr>
                    </thead>
                    <tbody className="customtable text-[16px] sm:text-[18px]">
                      {membershipParameter.map((member, index) => (
                        <tr key={index}>
                          <td className="border px-4 py-2">{member?.particular}</td>
                          <td className="border px-4 py-2">{member?.diamoan}</td>
                          <td className="border px-4 py-2">{member?.gold}</td>
                          <td className="border px-4 py-2">{member?.silver}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold text-[20px] sm:text-[22px]">
                  Silver For General
                </p>
                <p className="text-[18px] sm:text-[20px]">
                  Rs {joinuss.length > 0 ? joinuss[0]?.amount : "N/A"}/-
                </p>
              </div>
            </div>
          </div>

          <div
            className="membership-reg-instruction mt-6 text-[16px] sm:text-[18px]"
            dangerouslySetInnerHTML={{
              __html: membershipInfo.length > 0 ? membershipInfo[0]?.detail : "",
            }}
          ></div>

          <div className="text-center md:text-left mt-10 sm:mt-20">
            <div className="flex justify-center">
              <Link to="/membership/membership-details-form">
                <button className="bg-primary text-white font-bold py-3 px-6 rounded transition-all duration-300 transform hover:scale-105 hover:shadow-md uppercase">
                  Apply Now
                </button>
              </Link>
            </div>
          </div>
        </Containar>
      </section>
    </div>
  );
};

export default MembershipPage;

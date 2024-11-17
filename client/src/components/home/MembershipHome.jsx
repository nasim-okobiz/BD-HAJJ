import React, { useEffect, useState } from "react";
import Containar from "../container/Containar";
import HajjButton from "./HajjButton";
import btnshapeup from "../../assets/add/masjid.png";
import btnshapedown from "../../assets/add/masjidshape.png";
import tick from "../../assets/add/tick.png";
import bgshape from "../../assets/pattern/pattern.jpg"
import { Link, useLocation } from "react-router-dom";
import { API_BASE_URL } from "../axios/config";
import api from "../axios/Axios";
import { useSelector } from "react-redux";

const JoinusHome = () => {
  const role = useSelector((store)=> store?.auth?.user?.role)
  const [joinuss, setJoinuss] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const getJoinuss = async () => {
    try {
      const response = await api.get(`/join-us`);
      setJoinuss(response?.data?.data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getJoinuss();
  }, []);
  console.log(joinuss);

  return (
    <div className="py-12 sm:py-28 font-philo relative">
      <div className="absolute left-0 top-0 w-full h-full opacity-20">
        <img className="w-full h-full" src={bgshape} />
      </div>
      <Containar className={" bg-slate-200 p-5 rounded-md"}>
        <div className="flex flex-wrap justify-between ">
          {/* Image Section */}
          <div className="w-full md:w-[47.5%] z-10  mb-4">
            <img
              src={API_BASE_URL + joinuss[0]?.photo}
              alt="Joinus"
              className="w-full"
            />
          </div>

          {/* Content Section */}
          <div className="w-full z-10 md:w-[47.5%] ">
            <div className="heading mb-4">
              <h2
                className="text-[24px] sm:text-[40px] font-semibold text-secondary"
                style={{ textShadow: "2px 2px 2px #0000002d" }}
              >
                Join Us
              </h2>
              <p
                className="font-semibold text-[22px] sm:text-[30px] text-semisecondary"
                style={{
                  textShadow: "2px 2px 2px #0000002d",
                }}
              >
                {joinuss[0]?.title}
              </p>
            </div>
            <div className="joinus mb-4">
              <p className="text-[16px] sm:text-[20px] text-gray-700 mb-4  text-justify">
                {joinuss[0]?.description}
              </p>
              <ul className="list-inside text-[16px] sm:text-[20px]">
                {joinuss[0]?.condition.map((condition, index) => {
                  return <li className="flex items-center mb-2">
                    <img
                      src={tick}
                      alt="Tick"
                      className="h-4 w-4 mr-3"
                    />
                    {condition}
                  </li>
                })}
              </ul>
              <p className="text-left text-[20px] sm:text-[36px] font-semibold mt-4 text-[#0163b4]">
                Starting From
              </p>
              <p className="text-left text-[24px] sm:text-[40px] text-[#292929] font-bold mb-4">
                TK.  {joinuss[0]?.amount} /- Only
              </p>
              <div className="mt-12">
                <div className={`flex flex-start`}>
                {role !== "agent" &&
                  <div className="relative group cursor-pointer ">
                    <img
                      className="w-[60px] absolute group-hover:left-[70%] left-[10%] transition-all ease-in-out duration-300 -top-[80%]"
                      src={btnshapeup}
                    />
                    <img className="w-[300px] " src={btnshapedown} />
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-2xl font-semibold">
                      <Link to={"/membership/membership-details-form"} className="button ">Know More</Link>
                    </div>
                  </div>
}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Containar>
    </div>
  );
};

export default JoinusHome;

import React from "react";
import Containar from "../container/Containar";
import bgshape from "../../assets/pattern/pattern.jpg";
import { RiDoubleQuotesL } from "react-icons/ri";
import { Link } from "react-router-dom";
// Iimport { FaCopy, FaCheck } from 'react-icons/fa';
// import Swiper core and required modules
import { FaCopy, FaCheck } from 'react-icons/fa';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import bghajj from "../../assets/pattern/hajj.jpg";
// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";
import { API_BASE_URL } from "../axios/config";
import { useState } from "react";
import { useEffect } from "react";
import api from "../axios/Axios";

const HomeMember = () => {
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copiedStates, setCopiedStates] = useState(Array(10).fill(false)); // Track copied states for each membership



  const fetchMemberships = async () => {
    try {
      const response = await api.get(
        `${API_BASE_URL}/membership/pagination?page=1&limit=10&order=DESC`
      );
      setMemberships(response?.data?.data?.result);
    } catch (err) {
      // setError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMemberships();
  }, []);
  const handleCopy = (code, index) => {
    navigator.clipboard.writeText(code);
    // Update the specific copied state
    setCopiedStates((prev) => {
      const newCopiedStates = [...prev];
      newCopiedStates[index] = true; // Set the copied state for the current index
      return newCopiedStates;
    });
    setTimeout(() => {
      setCopiedStates((prev) => {
        const newCopiedStates = [...prev];
        newCopiedStates[index] = false; 
        return newCopiedStates;
      });
    }, 2000);
  };

  return (
    <div className="relative font-philo pt-2 sm:pt-28">
      {/* <div className="absolute left-0 top-0 w-full h-full opacity-20">
        <img className="w-full h-full" src={bgshape} />
      </div> */}

      <div
        className="bg-cover bg-fixed bg-no-repeat relative"
        style={{
          backgroundImage: `url(${bghajj})`,
          height: "auto", // Adjust height for responsiveness
        }}
      >
        <div className="absolute inset-0 bg-black/80"></div>
        <Containar>
          <h2 className="pt-20 text-[24px] sm:text-[40px] font-semibold text-left sm:text-center text-white drop-shadow-lg">
            Our Members
          </h2>
          <p className="text-[22px] sm:text-[30px] text-gray-300 pb-5 text-left sm:text-center font-semibold text-secondary-color font-century drop-shadow-md">
            Approvals &amp; Certification Of BD Umrah Hajj Kafela
          </p>
          <div className="relative z-10 mb-12">
            <div className="px-4 py-3.5 bg-primary flex flex-col sm:flex-row justify-between items-center shadow-md rounded-md">
              <h3 className="text-[24px] sm:text-[30px] font-semibold text-center sm:text-left capitalize">
                Membership Details
              </h3>
              <div className="mt-4 sm:mt-0">
                <Link
                  className="py-1.5 px-6 bg-semisecondary text-white text-[18px] sm:text-[20px] rounded-lg font-semibold hover:bg-white hover:text-semisecondary border border-semisecondary transition-all ease-linear duration-150"
                  to={`/membership/details`}
                >
                  View All
                </Link>
              </div>
            </div>
          </div>
          <div className="memberships sm:mt-10  p-5 mb-10 rounded-md ">
            <section className="section__container relative ">
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={26}
                loop={true}
                speed={1000}
                autoplay={{
                  delay: 3000,
                  pauseOnMouseEnter: true,
                  disableOnInteraction: true,
                }}
                navigation
                pagination={{ clickable: true }}
                className="py-3 custom-swiper-button"
                breakpoints={{
                  640: {
                    slidesPerView: 1,
                  },
                  768: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 4,
                  },
                }}
              >
                {memberships?.map((membership, index) => (
                  <SwiperSlide key={index}>
                    <div className="section__card  max-h-[550px] max-w-[300px] ">
                      <div className="absolute left-4 top-4 text-white text-[28px]">
                        <RiDoubleQuotesL />
                      </div>
                      <img
                        src={API_BASE_URL + membership?.photo}
                        alt={membership?.name}
                        className="h-28 w-28 mb-4 rounded-full"
                      />
                      <h5>{membership?.name}</h5>
                      {/* <h6>{membership.position}</h6> */}
                      <span>
                        <i className="ri-double-quotes-l"></i>
                      </span>

                      {/* <p className="line-clamp-4 m-0">{membership?.referCode}</p> */}
                      <div className="flex items-center space-x-2 mb-2">
                        <p className="line-clamp-4 m-0 text-gray-800 ">
                          MemberShip ID: {membership?.referCode}
                        </p>
                        <button
                          // onClick={() => handleCopy(membership?.referCode, index)}
                          className="text-blue-500 hover:text-blue-700 focus:outline-none"
                        >
                          <p>
                            {copiedStates[index] ? (
                              <FaCheck className="text-green-500" />
                            ) : (
                              <FaCopy />
                            )}
                          </p>
                        </button>
                      </div>

                      {/* Additional Information Section */}
                      <div className="text-left">
                        <p className=" m-0 font-medium ">
                          Phone: {membership?.phone}
                        </p>
                        <p className=" m-0 font-medium ">
                          Agent Type: {membership?.agentType}
                        </p>
                        <p className=" m-0 font-medium ">
                          Occupation: {membership?.occupation}
                        </p>
                        <p className=" m-0 font-medium ">
                          Person: {membership?.personCategory}
                        </p>
                      </div>
                      <div className="p-8"></div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </section>
          </div>
        </Containar>
      </div>
    </div>
  );
};

export default HomeMember;

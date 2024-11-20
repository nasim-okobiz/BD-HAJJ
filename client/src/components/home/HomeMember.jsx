import React, { useState, useEffect } from "react";
import Containar from "../container/Containar";
import { RiDoubleQuotesL } from "react-icons/ri";
import { Link } from "react-router-dom";
import { FaCopy, FaCheck } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import bghajj from "../../assets/pattern/hajj.jpg";
import "swiper/css";
import "swiper/css/autoplay";
import { API_BASE_URL } from "../axios/config";
import api from "../axios/Axios";
import Skeleton from "react-loading-skeleton"; // Make sure you import the Skeleton component
import "react-loading-skeleton/dist/skeleton.css"; // Import Skeleton styles

const HomeMember = () => {
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedStates, setCopiedStates] = useState(Array(10).fill(false));

  const fetchMemberships = async () => {
    try {
      const response = await api.get(
        `${API_BASE_URL}/membership/pagination?page=1&limit=10&order=DESC`
      );
      setMemberships(response?.data?.data?.result);
    } catch (err) {
      console.error("Error fetching memberships:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMemberships();
  }, []);

  const handleCopy = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedStates((prev) => {
      const newCopiedStates = [...prev];
      newCopiedStates[index] = true;
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
      <div
        className="bg-cover bg-fixed bg-no-repeat relative"
        style={{
          backgroundImage: `url(${bghajj})`,
          height: "auto",
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

          {/* Membership Section with Skeleton Loader */}
          <div className="memberships sm:mt-10 p-5 mb-10 rounded-md">
            <section className="section__container relative">
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
                {loading ? (
                  // Skeleton loader when data is loading
                  <div className="flex space-x-4">
                    {Array(4)
                      .fill()
                      .map((_, idx) => (
                        <div key={idx} className="w-full max-w-[300px]">
                          <Skeleton circle={true} height={112} width={112} />
                          <Skeleton height={20} width="60%" />
                          <Skeleton height={15} />
                          <Skeleton width="50%" />
                        </div>
                      ))}
                  </div>
                ) : (
                  memberships?.map((membership, index) => (
                    <SwiperSlide key={index}>
                      <div className="section__card max-h-[550px] max-w-[300px]">
                        <div className="absolute left-4 top-4 text-white text-[28px]">
                          <RiDoubleQuotesL />
                        </div>
                        {loading ? (
                          <Skeleton circle={true} height={112} width={112} className="mb-4" />
                        ) : (
                          <img
                            src={API_BASE_URL + membership?.photo}
                            alt={membership?.name}
                            className="h-28 w-28 mb-4 rounded-full"
                          />
                        )}
                        <h5>{loading ? <Skeleton width="80%" /> : membership?.name}</h5>

                        <div className="flex items-center space-x-2 mb-2">
                          <p className="line-clamp-4 m-0 text-gray-800 ">
                            {loading ? (
                              <Skeleton width="50%" />
                            ) : (
                              `MemberShip ID: ${membership?.referCode}`
                            )}
                          </p>
                          <button
                            onClick={() => handleCopy(membership?.referCode, index)}
                            className="text-blue-500 hover:text-blue-700 focus:outline-none"
                          >
                            {copiedStates[index] ? (
                              <FaCheck className="text-green-500" />
                            ) : (
                              <FaCopy />
                            )}
                          </button>
                        </div>

                        <div className="text-left">
                          <p className="m-0 font-medium ">
                            {loading ? <Skeleton width="60%" /> : `Phone: ${membership?.phone}`}
                          </p>
                          <p className="m-0 font-medium ">
                            {loading ? <Skeleton width="60%" /> : `Agent Type: ${membership?.agentType}`}
                          </p>
                          <p className="m-0 font-medium ">
                            {loading ? <Skeleton width="60%" /> : `Occupation: ${membership?.occupation}`}
                          </p>
                          <p className="m-0 font-medium ">
                            {loading ? <Skeleton width="60%" /> : `Person: ${membership?.personCategory}`}
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))
                )}
              </Swiper>
            </section>
          </div>
        </Containar>
      </div>
    </div>
  );
};

export default HomeMember;

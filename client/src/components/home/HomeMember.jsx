import React, { useState, useEffect } from "react";
import Containar from "../container/Containar";
import { RiDoubleQuotesL } from "react-icons/ri";
import { Link } from "react-router-dom";
import { FaCopy, FaCheck } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import bghajj from "../../assets/pattern/hajj.jpg";
import bgshape from "../../assets/pattern/bg-vector-3-1.png";
import "swiper/css";
import "swiper/css/autoplay";
import { API_BASE_URL } from "../axios/config";
import api from "../axios/Axios";
import Skeleton from "react-loading-skeleton"; // Make sure you import the Skeleton component
import "react-loading-skeleton/dist/skeleton.css"; // Import Skeleton styles
import headingLine from "../../assets/pattern/heading-line.png";

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
    <div className="relative font-merriweather">
      <div
        className="bg-cover bg-fixed bg-no-repeat relative"
        // style={{
        //   backgroundImage: `url(${bghajj})`,
        //   height: "auto",
        // }}
      >
        {/* <div className="absolute inset-0 bg-black/80"></div> */}
        <div className="absolute bottom-0 left-0 rotate-90 w-1/2 md:w-1/4 lg:w-1/5 xl:w-1/6 h-auto opacity-50 lg:opacity-70">
          <img
            className="w-full h-auto"
            src={bgshape}
            alt="Background Pattern"
          />
        </div>
        <Containar>
          <div className="py-8 lg:py-16">
            <div>
              <h2 className="text-[24px] lg:text-[36px] text-center uppercase">
                Our Members
              </h2>
              <p className="text-[16px] lg:text-[20px] text-center mt-3">
                Approvals &amp; Certification Of BD Umrah Hajj Kafela
              </p>
              <div className="relative w-full flex justify-center mt-2">
                <img
                  src={headingLine}
                  alt="Heading Line"
                  className="w-[40%] md:w-2/3 lg:w-auto"
                />
              </div>
            </div>
            {/* <div className="relative z-10 mb-12">
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
          </div> */}

            {/* Membership Section with Skeleton Loader */}
            <div className="memberships lg:p-5 rounded-md">
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
                  pagination={false}
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
                        <div className="section__card h-[400px] lg:max-w-[300px] uppercase">
                          <div className="absolute left-4 top-4 text-white text-[28px]">
                            <RiDoubleQuotesL />
                          </div>
                          <p className="mb-5">
                            {loading ? (
                              <Skeleton width="60%" />
                            ) : (
                              `${membership?.agentType} member`
                            )}
                          </p>
                          <div className="flex justify-between items-center">
                            {/* Photo Section */}
                            <div>
                              {loading ? (
                                <Skeleton
                                  circle={true}
                                  height={112}
                                  width={112}
                                  className="mb-4"
                                />
                              ) : (
                                <img
                                  src={API_BASE_URL + membership?.photo}
                                  alt={membership?.name}
                                  className="h-24 w-24 mb-4 rounded-full"
                                />
                              )}
                            </div>

                            {/* Location Pin Section */}
                            <div className="flex flex-col items-center">
                              <div className="bg-primary text-white p-2 rounded-full shadow-lg">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="2"
                                  stroke="currentColor"
                                  className="h-6 w-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 2C8.134 2 5 5.134 5 9c0 4.8 7 13 7 13s7-8.2 7-13c0-3.866-3.134-7-7-7zM12 11a2 2 0 100-4 2 2 0 000 4z"
                                  />
                                </svg>
                              </div>
                              <p className="mt-2 text-sm font-semibold text-gray-700">
                                Dhaka
                              </p>
                            </div>
                          </div>

                          <div className="text-left mt-5">
                            <div className="flex items-center justify-between">
                              <p className="line-clamp-4 m-0 text-gray-800 ">
                                {loading ? (
                                  <Skeleton width="50%" />
                                ) : (
                                  <>
                                    <strong>Id no:</strong>{" "}
                                    <span className="text-gray-400">
                                      {membership?.referCode}
                                    </span>
                                  </>
                                )}
                              </p>
                              <div className="relative group">
                                <button
                                  onClick={() =>
                                    handleCopy(membership?.referCode, index)
                                  }
                                  className="text-primary focus:outline-none"
                                >
                                  {copiedStates[index] ? (
                                    <FaCheck className="text-green-500" />
                                  ) : (
                                    <FaCopy />
                                  )}
                                </button>
                                {/* Tooltip */}
                                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-700 text-white text-xs font-medium py-1 px-2 rounded shadow-lg">
                                  Copy
                                </div>
                              </div>
                            </div>
                            <p className="m-0 font-medium ">
                              {loading ? (
                                <Skeleton width="60%" />
                              ) : (
                                <>
                                  <strong>Name:</strong>{" "}
                                  <span className="text-gray-400">
                                    {membership?.name}
                                  </span>
                                </>
                              )}
                            </p>
                            <p className="m-0 font-medium ">
                              {loading ? (
                                <Skeleton width="60%" />
                              ) : (
                                <>
                                  <strong>Address:</strong>{" "}
                                  <span className="text-gray-400">
                                    {membership?.postOffice},{" "}
                                    {membership?.district},{" "}
                                    {membership?.division}
                                  </span>
                                </>
                              )}
                            </p>
                            <p className="m-0 font-medium ">
                              {loading ? (
                                <Skeleton width="60%" />
                              ) : (
                                <>
                                  <strong>Hotline:</strong>
                                  <span className="text-gray-400">
                                    +880 1605959999
                                  </span>
                                </>
                              )}
                            </p>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))
                  )}
                </Swiper>
              </section>
            </div>
          </div>
        </Containar>
      </div>
    </div>
  );
};

export default HomeMember;

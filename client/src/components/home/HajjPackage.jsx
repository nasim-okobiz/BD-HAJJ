import React, { useEffect, useState } from "react";
import Containar from "../container/Containar";
import { Link, Navigate, useNavigate } from "react-router-dom";
import bgshape from "../../assets/pattern/hajj.jpg";
import HajjButton from "./HajjButton";
import api from "../axios/Axios";
import { API_BASE_URL } from "../axios/config";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules"; // Import modules from "swiper/modules"
import "swiper/css";
import "swiper/css/autoplay";
import { FaLongArrowAltRight } from "react-icons/fa";

import bghajj from "../../assets/pattern/hajj.jpg";
import Loader from "../loader/Loader";

const HajjPackage = () => {
  const [packagesData, setPackagesData] = useState([]);
  const [earlyBirdPackage, setEarlyBirdPackage] = useState(null);
  const [packageHead, setPackageHead] = useState(null);
  const [lengthData, setLengthData] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await api.get("/package?priority=2");
        if (response.data.statusCode === 200) {
          const fetchedPackages = response.data.data;
          setLengthData(fetchedPackages?.length);
          setPackageHead(fetchedPackages[0]?.packageRef);

          // Filter out packages that are not early bird
          const filteredPackages = fetchedPackages.filter(
            (pkg) => pkg.earlyBird === false
          );
          setPackagesData(filteredPackages);

          // Find the first early bird package if needed
          const earlyBird = fetchedPackages.find((pkg) => pkg.earlyBird);
          setEarlyBirdPackage(earlyBird);
        }
      } catch (error) {
        console.error("Error fetching package data:", error);
      }
    };

    fetchPackages();
  }, []);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {lengthData > 0 && (
        <div className="font-philo relative">
          {/* <div className="absolute left-0 top-0 w-full h-full opacity-20 z-0">
            <img
              className="w-full h-full"
              src={bgshape}
              alt="Background Pattern"
            />
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
              <div className="relative z-10">
                <div className="text-white py-10 sm:py-20">
                  <p className="uppercase text-center tracking-wider text-base sm:text-xl text-[#FACC15]">
                    packages
                  </p>
                  <h3 className="uppercase text-center tracking-wider text-[24px] sm:text-[30px] sm:py-2">
                    {packageHead?.name}
                  </h3>
                  <h3 className="text-white text-[30px] sm:text-[50px] text-center">
                    Choose Your Package
                  </h3>
                  <div className="w-40 sm:w-80 h-px mx-auto bg-gray-300"></div>
                </div>
                <div className="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-center pb-20">
                  {/* Left Section */}
                  <div className="text-white space-y-6 md:col-span-1">
                    {earlyBirdPackage && (
                      <Link to={`package/${earlyBirdPackage?._id}`}>
                        <div className="py-5">
                          <h2 className="text-xl sm:text-3xl font-semibold">
                            {earlyBirdPackage.name}
                          </h2>
                          <h2 className="text-[16px] xl:text-[55px] text-semisecondary font-semibold text-secondary-color font-century textshadow">
                            TK {earlyBirdPackage?.mrpPrice?.toLocaleString()}/-
                            <span className="line-through font-normal text-sm">
                              TK {earlyBirdPackage?.price?.toLocaleString()}
                            </span>
                          </h2>

                          <div className="w-60 lg:w-full bg-gradient-to-r from-red-500 via-red-400 to-red-300 text-white py-1 px-3 xl:py-2 xl:px-4 rounded-full text-sm xl:text-xl font-extrabold shadow-lg transform xl:scale-105 transition-all duration-300">
                            Save TK{" "}
                            {earlyBirdPackage?.discount?.toLocaleString()}/-
                          </div>

                          <ul className="text-[14px] xl:text-xl mt-5 list-disc pl-5">
                            <li>
                              {earlyBirdPackage?.roomType?.replace(
                                /<[^>]*>?/gm,
                                ""
                              )}
                            </li>
                            <li>
                              {earlyBirdPackage?.hotalDistance.join(", ")}
                            </li>
                          </ul>
                          <button
                            align={earlyBirdPackage?._id}
                            className="bg-yellow-400 text-black py-1.5 px-6 rounded font-semibold hover:bg-yellow-500 transition duration-300 hidden sm:block mt-10"
                          >
                            Book Now
                          </button>
                        </div>
                      </Link>
                    )}
                  </div>

                  {/* Right Section */}
                  <div className="md:col-span-2 lg:border-l p-5">
                    <Swiper
                      spaceBetween={20}
                      slidesPerView={1} // Default for small screens
                      loop={true}
                      speed={1000}
                      breakpoints={{
                        640: { slidesPerView: 2 }, // 2 items on medium screens
                        1024: { slidesPerView: 2 }, // 4 items on large screens
                      }}
                      autoplay={{
                        delay: 3000,
                        disableOnInteraction: true,
                        pauseOnMouseEnter: true,
                      }}
                      pagination={{ clickable: true }}
                      modules={[Autoplay, Pagination]}
                      className={`mt-8 ${
                        packagesData?.length > 4 && "shadow-md"
                      }`}
                    >
                      {packagesData.map((pkg) => {
                        const validDate = pkg?.validDate;
                        const isValid = validDate
                          ? new Date(validDate) > Date.now()
                          : false;
                        return (
                          <SwiperSlide key={pkg._id}>
                            <div className="overflow-hidden group cursor-pointer h-full p-4 bg-white shadow-xl rounded-lg relative z-20">
                              <div className="h-[160px] sm:h-[280px] w-full overflow-hidden">
                                <img
                                  onClick={() =>
                                    navigate(`/package/${pkg._id}`)
                                  }
                                  className="h-full w-full object-cover group-hover:scale-105 transition-all ease-linear duration-300"
                                  src={API_BASE_URL + pkg.photo}
                                  alt={pkg.name}
                                />
                              </div>
                              <div className="flex flex-col justify-between h-[270px]">
                                <div className="mt-3">
                                  <h3
                                    onClick={() =>
                                      navigate(`/package/${pkg._id}`)
                                    }
                                    className="text-[16px] sm:text-[20px] font-semibold leading-7 mb-2"
                                  >
                                    {pkg.name}
                                  </h3>
                                  <h4 className="text-[14px] sm:text-[18px] font-semibold flex items-center gap-2">
                                    TK {pkg?.mrpPrice?.toLocaleString()}
                                    {pkg.price > pkg.mrpPrice && (
                                      <span className="line-through font-normal text-sm">
                                        TK {pkg?.price?.toLocaleString()}
                                      </span>
                                    )}
                                  </h4>
                                  <div className="flex flex-col gap-1 mt-2">
                                    <p className="text-[13px] sm:text-[15px]">
                                      {pkg.roomType.replace(/<[^>]*>?/gm, "")}
                                    </p>
                                    <p className="text-[13px] sm:text-[15px]">
                                      {pkg.hotalDistance.join(", ")}
                                    </p>
                                  </div>
                                </div>
                                {pkg?.discountPrice > 0 ? (
                                  isValid ? (
                                    <Link
                                      to={`/package/${pkg._id}`}
                                      className="w-full block bg-semisecondary hover:text-semisecondary border border-semisecondary text-white py-2 px-4 rounded hover:bg-white font-bold transition-all ease-linear duration-200 my-5"
                                    >
                                      Place Order
                                    </Link>
                                  ) : (
                                    <button
                                      disabled={true}
                                      className="w-full block border border-red-600 text-red-600 py-2 px-4 rounded font-bold transition-all ease-linear duration-200 my-5"
                                    >
                                      Package Expired
                                    </button>
                                  )
                                ) : (
                                  <Link
                                    to={`/package/${pkg._id}`}
                                    className="w-full block bg-semisecondary hover:text-semisecondary border border-semisecondary text-white py-2 px-4 rounded hover:bg-white font-bold transition-all ease-linear duration-200 my-5"
                                  >
                                    Place Order
                                  </Link>
                                )}
                              </div>
                            </div>
                          </SwiperSlide>
                        );
                      })}
                    </Swiper>
                    <div className="mt-4 sm:mt-20 w-40 mx-auto">
                      <Link
                        className="py-1 bg-yellow-500 text-white text-[18px] sm:text-[20px] rounded font-semibold hover:bg-white hover:text-semisecondary transition-all ease-linear duration-150 flex items-center gap-3 justify-center group"
                        to={`/packages/category/${packageHead?._id}`}
                      >
                        View All{" "}
                        <FaLongArrowAltRight className="group-hover:translate-x-2 duration-200" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* <div className="px-4 py-3.5 bg-primary flex flex-col sm:flex-row justify-between items-center shadow-md rounded-md">
                  <h3 className="text-[24px] sm:text-[30px] font-semibold  sm:text-left capitalize">
                    {packageHead?.name}
                  </h3>
                  <div className="mt-4 sm:mt-0">
                    <Link
                      className="py-1.5 px-6 bg-semisecondary text-white text-[18px] sm:text-[20px] rounded-lg font-semibold hover:bg-white hover:text-semisecondary border border-semisecondary transition-all ease-linear duration-150"
                      to={`/packages/category/${packageHead?._id}`}
                    >
                      View All
                    </Link>
                  </div>
                </div> */}
              </div>
            </Containar>
          </div>
        </div>
      )}
    </>
  );
};

export default HajjPackage;

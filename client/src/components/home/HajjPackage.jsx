import React, { useEffect, useState } from "react";
import Containar from "../container/Containar";
import { Link, useNavigate } from "react-router-dom";
import bgshape from "../../assets/pattern/hajj.jpg";
import HajjButton from "./HajjButton";
import decoration from "../../assets/pattern/decoration.png";
import api from "../axios/Axios";
import { API_BASE_URL } from "../axios/config";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import { FaLongArrowAltRight } from "react-icons/fa";
import headingLine from "../../assets/pattern/heading-line.png";

import bghajj from "../../assets/pattern/bg-white-parallax.jpg";
import Skeleton from "react-loading-skeleton"; // Import Skeleton

const HajjPackage = ({ page }) => {
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

  return (
    <>
      {lengthData > 0 ? (
        <div className="font-merriweather relative">
          <div
            className="bg-cover bg-fixed bg-no-repeat relative py-10 lg:py-16"
            style={{
              backgroundImage: `url(${bghajj})`,
              height: "auto",
            }}
          >
            {!page && (
              <div className="absolute hidden md:block right-0 top-0 z-10">
                <img className="w-[100px] lg:w-[400px]" src={decoration} />
              </div>
            )}
            <div className="absolute inset-0 bg-white/80" />
            <Containar>
              <div className="relative z-10">
                {/* <div className="text-gray-700 pb-10 sm:pb-5">
                  <h3 className="uppercase text-center tracking-wider text-[24px] lg:text-[30px] sm:py-2">
                    {packageHead ? (
                      packageHead.name
                    ) : (
                      <Skeleton width={200} height={30} />
                    )}
                  </h3>
                  <h3 className="text-gray-700 text-[30px] md:text-[30px] lg:text-[40px] text-center">
                    {packageHead ? (
                      "Choose Your Package"
                    ) : (
                      <Skeleton width={300} height={50} />
                    )}
                    <div className="relative w-full flex justify-center mt-2">
                      <img
                        src={headingLine}
                        alt="Heading Line"
                        className="w-[40%] md:w-2/3 lg:w-auto"
                      />
                    </div>
                  </h3>
                </div> */}
                <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0 z-10 mb-4">
                  {/* Heading Section */}
                  <div className="flex flex-col items-center lg:text-xl">
                    {/* Heading and Text */}
                    <div className="uppercase flex items-center space-x-2">
                      <p className="text-center tracking-wider">hajj / হজ্জ  package /</p>
                    </div>

                    {/* Underline Image */}
                    <div className="relative w-full flex justify-center mt-2">
                      <img
                        src={headingLine}
                        alt="Heading Line"
                        className="w-[40%] md:w-2/3 lg:w-auto"
                      />
                    </div>
                  </div>

                  {/* Button Section */}
                  <Link to="/packages">
                    <button className="bg-primary text-white font-bold py-1 lg:py-2 px-4 lg:px-4 rounded transition-all duration-300 transform hover:scale-105 hover:shadow-md uppercase lg:text-sm">
                      View All Package
                    </button>
                  </Link>
                </div>
                <div className="mx-auto grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
                  {/* Left Section */}
                  <div className="text-gray-700 space-y-6">
                    {earlyBirdPackage ? (
                      <Link to={`package/${earlyBirdPackage?._id}`}>
                        <div className="py-5 flex items-center justify-center">
                          <div className="">
                            <h2 className="text-lg sm:text-xl font-semibold">
                              {earlyBirdPackage.name}
                            </h2>
                            <h2 className="text-[16px] xl:text-[30px] text-semisecondary font-semibold text-secondary-color font-century textshadow">
                              TK {earlyBirdPackage?.mrpPrice?.toLocaleString()}
                              /-
                              <span className="line-through font-normal text-sm">
                                TK {earlyBirdPackage?.price?.toLocaleString()}
                              </span>
                            </h2>

                            <div className="w-60 lg:w-full bg-gradient-to-r from-red-500 via-red-400 to-red-300 text-gray-700 py-1 px-3 xl:py-2 xl:px-4 rounded-full text-sm xl:text-xl font-extrabold shadow-lg transform xl:scale-105 transition-all duration-300 mt-5">
                              Save TK{" "}
                              {earlyBirdPackage?.discount?.toLocaleString()}/-
                            </div>

                            <ul className="text-[14px] xl:text-[16px] mt-5 list-disc pl-5">
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
                              className="bg-primary text-white font-bold py-2 px-6 rounded transition-all duration-300 transform hover:scale-105 hover:shadow-md uppercase mt-5 lg:mt-10"
                            >
                              Book Now
                            </button>
                          </div>
                        </div>
                      </Link>
                    ) : (
                      <Skeleton height={150} />
                    )}
                  </div>

                  {/* Right Section */}
                  <div className="md:col-span-3 lg:border-l-2 p-5 h-auto">
                    <Swiper
                      spaceBetween={20}
                      slidesPerView={1}
                      loop={true}
                      speed={1000}
                      breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                      }}
                      autoplay={{
                        delay: 3000,
                        disableOnInteraction: true,
                        pauseOnMouseEnter: true,
                      }}
                      pagination={false}
                      modules={[Autoplay, Pagination]}
                      className={`${packagesData?.length > 4 && "shadow-md"}`}
                    >
                      {packagesData.length > 0 ? (
                        packagesData.map((pkg) => (
                          <SwiperSlide key={pkg._id}>
                            <div className="overflow-hidden group cursor-pointer p-4 h-full shadow-xl rounded-lg relative z-20">
                              <div className="h-[160px] md:h-[100px] w-full overflow-hidden">
                                <img
                                  onClick={() =>
                                    navigate(`/package/${pkg._id}`)
                                  }
                                  className="h-full w-full object-cover group-hover:scale-105 transition-all ease-linear duration-300"
                                  src={API_BASE_URL + pkg.photo}
                                  alt={pkg.name}
                                />
                              </div>
                              <div className="flex flex-col justify-between">
                                <div className="mt-3">
                                  <h3
                                    onClick={() =>
                                      navigate(`/package/${pkg._id}`)
                                    }
                                    className="text-[10px] sm:text-[16px] font-semibold leading-7 mb-2"
                                  >
                                    {pkg.name}
                                  </h3>
                                  <h4 className="text-[14px] sm:text-[14px] font-semibold flex items-center gap-2">
                                    TK {pkg?.mrpPrice?.toLocaleString()}
                                    {pkg.price > pkg.mrpPrice && (
                                      <span className="line-through font-normal text-sm">
                                        TK {pkg?.price?.toLocaleString()}
                                      </span>
                                    )}
                                  </h4>
                                  <div className="flex flex-col gap-1 mt-2">
                                    <p className="text-[13px] sm:text-[12px]">
                                      {pkg.roomType.replace(/<[^>]*>?/gm, "")}
                                    </p>
                                    <p className="text-[13px] sm:text-[12px]">
                                      {pkg.hotalDistance
                                        .join(", ")
                                        .slice(0, 50)
                                        .replace(/\s\S*$/, "") + " . . ."}
                                    </p>
                                  </div>
                                </div>
                                {pkg?.discountPrice > 0 ? (
                                  <Link
                                    to={`/package/${pkg._id}`}
                                    className="w-full block bg-semisecondary hover:text-semisecondary border border-semisecondary py-2 px-4 rounded text-white hover:bg-white font-bold transition-all ease-linear duration-200 text-center mt-5"
                                  >
                                    Place Order
                                  </Link>
                                ) : (
                                  <Skeleton height={40} />
                                )}
                              </div>
                            </div>
                          </SwiperSlide>
                        ))
                      ) : (
                        <Skeleton count={3} height={200} />
                      )}
                    </Swiper>
                  </div>
                </div>
              </div>
            </Containar>
          </div>
        </div>
      ) : (
        <Skeleton height="80vh" />
      )}
    </>
  );
};

export default HajjPackage;

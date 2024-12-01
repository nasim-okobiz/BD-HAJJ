import React, { useEffect, useState } from "react";
import Containar from "../container/Containar";
import { Link, Navigate, useNavigate } from "react-router-dom";
import bgshape1 from "../../assets/pattern/bg-vector-2-1.png";
import bgshape2 from "../../assets/pattern/bg-vector-3-1.png";
import headingLine from "../../assets/pattern/heading-line.png";
import HajjButton from "./HajjButton";
import api from "../axios/Axios";
import { API_BASE_URL } from "../axios/config";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules"; // Import modules from "swiper/modules"
import "swiper/css";
import "swiper/css/autoplay";
import bird from "../../assets/add/sp-of-bg.jpg";
import { FaLongArrowAltRight } from "react-icons/fa";
import Loader from "../loader/Loader";

const UmrahPackage = () => {
  const [packagesData, setPackagesData] = useState([]);
  const [earlyBirdPackage, setEarlyBirdPackage] = useState(null);
  const [packageHead, setPackageHead] = useState(null);
  const [lengthData, setLengthData] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await api.get("/package?priority=1");
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
      <div className="relative w-full">
        {lengthData > 0 && (
          <div className="py-10 md:py-10 lg:py-20 font-merriweather relative">
            {/* Background Shape 1 */}
            <div className="absolute top-0 left-0 w-1/2 md:w-1/4 lg:w-1/5 xl:w-1/6 h-auto opacity-50 lg:opacity-70">
              <img
                className="w-full h-auto"
                src={bgshape1}
                alt="Background Pattern"
              />
            </div>

            {/* Background Shape 2 */}
            <div className="absolute bottom-0 right-0 w-1/2 md:w-1/4 lg:w-1/5 xl:w-1/6 h-auto opacity-50 lg:opacity-70">
              <img
                className="w-full h-auto"
                src={bgshape2}
                alt="Background Pattern"
              />
            </div>

            <Containar>
              <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0 z-10 mb-12 text-base sm:text-xl">
                {/* Heading Section */}
                <div className="flex flex-col items-center">
                  {/* Heading and Text */}
                  <div className="uppercase flex items-center space-x-2">
                    <p className="text-center tracking-wider">umrah /</p>
                    <h3 className="text-center tracking-wider">
                      {packageHead?.name}
                    </h3>
                  </div>

                  {/* Underline Image */}
                  <div className="relative w-full flex justify-center mt-2">
                    <img
                      src={headingLine}
                      alt="Heading Line"
                      className="w-3/4 sm:w-2/3 md:w-auto"
                    />
                  </div>
                </div>

                {/* Button Section */}
                <Link to="/packages">
                  <button className="bg-primary text-white font-bold py-1 sm:py-2 px-4 sm:px-6 rounded transition-all duration-300 transform hover:scale-105 hover:shadow-md uppercase">
                    View All Package
                  </button>
                </Link>
              </div>

              {/* Other Elements */}
              {earlyBirdPackage && (
                <div className="flex flex-col sm:items-center text-center relative py-6">
                  <div className="w-full relative">
                    <img
                      className="w-full opacity-30 h-[200px] sm:h-auto"
                      src={bird}
                      alt="Early Bird Package"
                    />
                    <div className="absolute left-0 top-0 w-full h-full flex justify-center items-center">
                      <Link to={`package/${earlyBirdPackage?._id}`}>
                        <div>
                          <h2 className="text-[16px] xl:text-[40px] font-semibold text-center text-secondary">
                            {earlyBirdPackage.name}
                          </h2>
                          <h2 className="text-[16px] xl:text-[55px] text-semisecondary text-center font-semibold text-secondary-color font-century textshadow">
                            TK {earlyBirdPackage.mrpPrice?.toLocaleString()}/-
                            <span className="line-through font-normal text-sm">
                              TK {earlyBirdPackage.price?.toLocaleString()}
                            </span>
                          </h2>

                          {/* Discount Badge */}
                          <div className="absolute -top-4 right-4 bg-gradient-to-r from-red-500 via-red-400 to-red-300 text-white py-2 px-3 text-sm font-bold rounded-md shadow-md transition-all duration-300">
                            Save TK{" "}
                            {earlyBirdPackage.discount?.toLocaleString()}/-
                          </div>

                          <p className="text-[14px] xl:text-xl text-center">
                            {earlyBirdPackage.roomType.replace(
                              /<[^>]*>?/gm,
                              ""
                            )}
                          </p>
                          <p className="text-[14px] xl:text-xl mt-2 px-2 sm:px-0 text-center mx-auto max-w-[360px]">
                            {earlyBirdPackage.hotalDistance.join(", ")}
                          </p>
                          <div className="mt-12 hidden sm:block">
                            {/* <HajjButton align={earlyBirdPackage?._id} /> */}
                            <Link to={`package/${earlyBirdPackage?._id}`}>
                              <button className="bg-primary text-white font-bold py-2 px-6 rounded transition-all duration-300 transform hover:scale-105 hover:shadow-md uppercase">
                                Book Now
                              </button>
                            </Link>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
              <div
                className={`mb-14 ${
                  packagesData?.length > 0 && "bg-slate-200"
                }  lg:p-5 rounded-md`}
              >
                <Swiper
                  spaceBetween={20}
                  slidesPerView={1}
                  loop={true}
                  speed={1000}
                  breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 4 },
                  }}
                  autoplay={{
                    delay: 3000, // 3 seconds
                    disableOnInteraction: true,
                    pauseOnMouseEnter: true,
                  }}
                  pagination={{ clickable: true }} // Add pagination if needed
                  modules={[Autoplay, Pagination]} // Include all required modules here
                  className={`${packagesData?.length > 4 && "shadow-md"}`}
                >
                  {packagesData.map((pkg) => {
                    const validDate = pkg?.validDate;
                    const isValid = validDate
                      ? new Date(validDate) > Date.now()
                      : false;
                    return (
                      <SwiperSlide key={pkg._id}>
                        <div className="overflow-hidden group cursor-pointer h-full p-4 bg-white shadow-xl rounded-lg relative z-20">
                          <div className="h-[160px] sm:h-[180px] w-full overflow-hidden">
                            <img
                              onClick={() => navigate(`/package/${pkg._id}`)}
                              className="h-full w-full object-contain group-hover:scale-105 transition-all ease-linear duration-300"
                              src={API_BASE_URL + pkg.photo}
                              alt={pkg.name}
                            />
                          </div>

                          <div className="flex flex-col justify-between min-h-[220px]">
                            <div className="mt-3">
                              <h3
                                onClick={() => navigate(`/package/${pkg._id}`)}
                                className="text-[10px] sm:text-[16px] font-semibold leading-7 mb-2"
                              >
                                {pkg.name}
                              </h3>
                              <h4 className="text-[14px] sm:text-[14px] font-semibold flex items-center gap-2">
                                TK {pkg.mrpPrice?.toLocaleString()}
                                {pkg.price > pkg.mrpPrice && (
                                  <span className="line-through font-normal text-sm">
                                    TK {pkg.price?.toLocaleString()}
                                  </span>
                                )}
                              </h4>
                              <div className="flex flex-col gap-1 mt-2">
                                <p className="text-[13px] sm:text-[12px]">
                                  {pkg.roomType.replace(/<[^>]*>?/gm, "")}
                                </p>
                                <p className="text-[13px] sm:text-[12px]">
                                  {pkg.hotalDistance.join(", ")}
                                </p>
                              </div>
                            </div>
                            {pkg?.discountPrice > 0 ? (
                              <>
                                {isValid ? (
                                  <>
                                    {" "}
                                    <Link
                                      to={`/package/${pkg._id}`}
                                      className=" w-full block text-center bg-semisecondary hover:text-semisecondary border border-semisecondary text-white py-2 px-4 rounded hover:bg-white font-bold transition-all ease-linear duration-200"
                                    >
                                      Place Order
                                    </Link>
                                  </>
                                ) : (
                                  <>
                                    <button
                                      // to={`/package/${pkg._id}`}
                                      disabled={true}
                                      className=" w-full block text-center b  border border-red-600 text-red-600 py-2 px-4 rounded  font-bold transition-all ease-linear duration-200"
                                    >
                                      Package Expired
                                    </button>
                                  </>
                                )}
                              </>
                            ) : (
                              <>
                                <Link
                                  to={`/package/${pkg._id}`}
                                  className=" w-full block text-center bg-semisecondary hover:text-semisecondary border border-semisecondary text-white py-2 px-4 rounded hover:bg-white font-bold transition-all ease-linear duration-200"
                                >
                                  Place Order
                                </Link>
                              </>
                            )}
                            {/* <div className="flex justify-center mt-3">
                          <Link
                            className="px-4 py-1.5 w-full text-center bg-semisecondary text-white rounded-lg font-bold hover:bg-white hover:text-semisecondary border border-semisecondary transition-all ease-linear duration-150"
                            to={`/package/${pkg._id}`}
                          >
                            Book Now
                          </Link>
                        </div> */}
                          </div>
                        </div>
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </Containar>
          </div>
        )}
      </div>
    </>
  );
};

export default UmrahPackage;

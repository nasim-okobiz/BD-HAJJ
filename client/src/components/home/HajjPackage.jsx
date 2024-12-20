import React, { useEffect, useState } from "react";
import Containar from "../container/Containar";
import { Link, Navigate, useNavigate } from "react-router-dom";
import bgshape from "../../assets/pattern/pattern.jpg";
import HajjButton from "./HajjButton";
import api from "../axios/Axios";
import { API_BASE_URL } from "../axios/config";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules"; // Import modules from "swiper/modules"
import "swiper/css";
import "swiper/css/autoplay";

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

  return (
    <>
      {lengthData > 0 && (
        <div className="py-8 sm:py-20 font-philo relative">
          <div className="absolute left-0 top-0 w-full h-full opacity-20 z-0">
            <img
              className="w-full h-full"
              src={bgshape}
              alt="Background Pattern"
            />
          </div>
          <Containar>
            <div className="relative z-10 mb-12 ">
              <div className="px-4 py-3.5 bg-primary flex flex-col sm:flex-row justify-between items-center shadow-md rounded-md">
                <h3 className="text-[24px] sm:text-[30px] font-semibold text-center sm:text-left capitalize">
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
              </div>
            </div>

            {/* Early Bird Package Section */}
            {earlyBirdPackage && (
              <div className="flex flex-col sm:items-center text-center relative z-10 shadow-lg mb-16 p-6 rounded-[30px] bg-white">
                <div className="w-full relative">
                  <img
                    className="w-full opacity-30 h-[200px] sm:h-auto rounded-[30px]"
                    src={"https://mynilnod.com/frontend/Images/sp-of-bg.jpg"}
                    alt="Early Bird Package"
                  />
                  <div className="absolute left-0 top-0 w-full h-full flex justify-center items-center">
                    <Link to={`package/${earlyBirdPackage?._id}`}>
                      <div>
                        <h2 className="text-[16px] xl:text-[45px] font-semibold text-center text-secondary">
                          {earlyBirdPackage.name}
                        </h2>
                        <h2 className="text-[16px] xl:text-[55px] text-semisecondary text-center font-semibold text-secondary-color font-century textshadow">
                          TK {earlyBirdPackage?.mrpPrice?.toLocaleString()}/-
                          <span className="line-through font-normal text-sm">
                            TK {earlyBirdPackage?.price?.toLocaleString()}
                          </span>
                        </h2>

                        {/* Enhanced Discount Badge */}
                        <div className="absolute top-2 right-2 bg-gradient-to-r from-red-500 via-red-400 to-red-300 text-white py-1 px-3 xl:py-2 xl:px-4 rounded-full text-sm xl:text-xl font-extrabold shadow-lg transform xl:scale-105 transition-all duration-300">
                          Save TK {earlyBirdPackage?.discount?.toLocaleString()}/-
                        </div>


                        <p className="text-[14px] xl:text-xl text-center">
                          {earlyBirdPackage?.roomType?.replace(/<[^>]*>?/gm, "")}
                        </p>
                        <p className="text-[14px] xl:text-xl mt-2 px-2 sm:px-0 text-center mx-auto max-w-[360px]">
                          {earlyBirdPackage?.hotalDistance.join(", ")}
                        </p>
                        <div className="mt-12 hidden sm:block">
                          <HajjButton align={earlyBirdPackage?._id} />
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            )}

          </Containar>
          <Containar className={`mb-14 ${packagesData?.length > 0  && "bg-slate-200"}  p-5 rounded-md`}>
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
              className={`mt-8 ${packagesData?.length > 4 && "shadow-md"}`}
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
                      <div className="flex flex-col justify-between h-[270px]">
                        <div className="mt-3">
                          <h3
                            onClick={() => navigate(`/package/${pkg._id}`)}
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
          </Containar>
        </div>
      )}
    </>
  );
};

export default HajjPackage;

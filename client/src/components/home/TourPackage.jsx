import React, { useEffect, useState } from "react";
import Containar from "../container/Containar";
import { Link, useNavigate } from "react-router-dom";
import bgshape from "../../assets/pattern/visa.png";
import HajjButton from "./HajjButton";
import api from "../axios/Axios";
import { API_BASE_URL } from "../axios/config";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules"; // Import modules from "swiper/modules"
import "swiper/css";
import "swiper/css/autoplay";
import { FaLongArrowAltRight } from "react-icons/fa";
import bird from "../../assets/add/sp-of-bg.jpg";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import headingLine from "../../assets/pattern/heading-line.png";

const TourPackage = () => {
  const [packagesData, setPackagesData] = useState([]);
  const [earlyBirdPackage, setEarlyBirdPackage] = useState(null);
  const [packageHead, setPackageHead] = useState(null);
  const [lengthData, setLengthData] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await api.get("/package?priority=3");
        console.log("This are products", response.data);
        if (response.data.statusCode === 200) {
          const fetchedPackages = response.data.data;
          setLengthData(fetchedPackages?.length);
          setPackageHead(fetchedPackages[0]?.packageRef);

          // Filter out packages that are not early bird
          // const filteredPackages = fetchedPackages.filter(
          //   (pkg) => pkg.earlyBird === false
          // );
          setPackagesData(fetchedPackages);

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

  console.log("This is all visa", packagesData);

  // Show skeleton loader until data is fetched
  if (lengthData === 0) {
    return (
      <div
        className="py-8 lg:py-16 font-merriweather relative"
        style={{ height: "80vh" }}
      >
        {/* <div className="absolute left-0 top-0 w-full h-full opacity-80 z-0">
          <img
            className="w-full h-full lg:h-auto mx-auto"
            src={bgshape}
            alt="Background Pattern"
          />
        </div> */}
        <div className="pt-20 xl:pt-0 2xl:pt-10 md:w-[80%] lg:w-auto mx-auto">
          <Containar>
            {/* Skeleton for package header */}
            <div className="relative z-10 mb-12">
              <div className="sm:flex justify-between items-end rounded sm:border p-5 sm:bg-[#2A2A2A] sm:text-white">
                <div>
                  <Skeleton width={150} height={30} />
                  <Skeleton width={250} height={40} className="mt-2" />
                </div>
                <div className="mt-4 sm:mt-0">
                  <Skeleton width={120} height={40} />
                </div>
              </div>
            </div>

            {/* Skeleton for early bird package */}
            <div className="flex flex-col sm:items-center text-center relative z-10 mb-16 bg-white">
              <div className="w-full relative">
                <Skeleton height={200} />
                <div className="absolute left-0 top-0 w-full h-full flex justify-center items-center pt-20 md:pt-0">
                  <Skeleton width={200} height={40} />
                  <Skeleton width={100} height={40} className="mt-2" />
                  <Skeleton width={200} height={20} className="mt-2" />
                </div>
              </div>
            </div>

            {/* Skeleton for package cards */}
            <Containar className="bg-slate-200 p-5 rounded-md mb-14 md:mb-0 lg:mb-28">
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
                  delay: 3000,
                  disableOnInteraction: true,
                  pauseOnMouseEnter: true,
                }}
                pagination={false}
                modules={[Autoplay, Pagination]}
                className="mt-8"
              >
                {Array(4)
                  .fill()
                  .map((_, index) => (
                    <SwiperSlide key={index}>
                      <div className="overflow-hidden group cursor-pointer h-full p-4 bg-white shadow-xl rounded-lg relative z-20">
                        <Skeleton height={180} />
                        <div className="flex flex-col justify-between h-[270px] mt-3">
                          <Skeleton width={150} height={20} />
                          <Skeleton width={100} height={15} className="mt-2" />
                          <Skeleton width={200} height={15} className="mt-2" />
                          <Skeleton width={120} height={40} className="mt-6" />
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </Containar>
          </Containar>
        </div>
      </div>
    );
  }

  return (
    <>
      {lengthData > 0 && (
        <div className="py-8 lg:py-16 font-merriweather relative">
          {/* <div className="absolute left-0 top-0 w-full h-full opacity-80 z-0">
            <img
              className="w-full h-full lg:h-auto mx-auto"
              src={bgshape}
              alt="Background Pattern"
            />
          </div> */}
          <div className="md:w-[80%] lg:w-auto mx-auto">
            {/* <Containar>
              <div className="relative z-10 mb-12">
                <div className="sm:flex justify-between items-end rounded sm:border p-5 sm:bg-[#2A2A2A] sm:text-white">
                  <div>
                    <p className="uppercase tracking-wider text-base sm:text-xl text-center md:text-start">
                      - package
                    </p>
                    <h3 className="uppercase tracking-wider text-[24px] sm:text-[30px] sm:py-2 text-center md:text-start">
                      {packageHead?.name}
                    </h3>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <Link
                      className="py-1.5 px-6 text-[18px] sm:text-[20px] rounded font-semibold transition-all ease-linear duration-150 flex items-center gap-2 bg-[#AA8751] text-white group hover:bg-primary justify-center"
                      to={`/packages/category/${packageHead?._id}`}
                    >
                      View All{" "}
                      <FaLongArrowAltRight className="group-hover:translate-x-2 duration-200" />
                    </Link>
                  </div>
                </div>
              </div>

              {earlyBirdPackage && (
                <div className="flex flex-col sm:items-center text-center relative z-10  mb-16 bg-white">
                  <div className="w-full relative">
                    <img
                      className="w-full opacity-30 h-[200px] sm:h-auto hidden md:block"
                      src={bird}
                      alt="Early Bird Package"
                    />
                    <div className="absolute left-0 top-0 w-full h-full flex justify-center items-center pt-20 md:pt-0">
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

                          <div className="absolute top-2 right-2 bg-gradient-to-r from-red-500 via-red-400 to-red-300 text-white py-1 px-3 xl:py-2 xl:px-4 rounded-full text-sm xl:text-xl font-extrabold shadow-lg transform xl:scale-105 transition-all duration-300">
                            Save TK{" "}
                            {earlyBirdPackage?.discount?.toLocaleString()}
                            /-
                          </div>

                          <p className="text-[14px] xl:text-xl text-center">
                            {earlyBirdPackage?.roomType?.replace(
                              /_/g,
                              " "
                            )}{" "}
                            | {earlyBirdPackage?.person} Person
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </Containar> */}

            {/* Packages Section */}
            <Containar>
              <div className="relative z-10 mb-2">
                <div className="sm:flex justify-between items-center rounded p-5">
                  <div>
                    <p className="uppercase tracking-wider text-base sm:text-xl text-center md:text-start">
                      Visa/ ভিসা Processing
                    </p>
                    <div className="relative w-full flex justify-center mt-2">
                      <img
                        src={headingLine}
                        alt="Heading Line"
                        className="w-[40%] md:w-2/3 lg:w-auto"
                      />
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <Link to={`/packages/category/${packageHead?._id}`}>
                      <button className="bg-primary text-white font-bold py-1 sm:py-2 px-4 sm:px-6 rounded transition-all duration-300 transform hover:scale-105 hover:shadow-md uppercase">
                        View All
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <Swiper
                spaceBetween={20}
                slidesPerView={1}
                loop={true}
                speed={1000}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 5 },
                }}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: true,
                  pauseOnMouseEnter: true,
                }}
                pagination={false}
                modules={[Autoplay, Pagination]}
                className=""
              >
                {packagesData?.map((pkg) => (
                  <SwiperSlide key={pkg._id}>
                    <div className="overflow-hidden group cursor-pointer h-full p-4 bg-white shadow-xl rounded-lg relative z-20">
                      <img
                        className="w-full h-[200px] object-cover rounded"
                        src={`${API_BASE_URL}${pkg?.photo}`}
                        alt={pkg?.name}
                      />
                      <div className="flex flex-col justify-between mt-3 space-y-5">
                        <h5 className="text-[16px] sm:text-[16px] text-[#4F5B69] font-semibold line-clamp-2">
                          {pkg.name.slice(0, 20).replace(/\s\S*$/, "") + " ..."}
                        </h5>
                        <p className="text-[13px] sm:text-[12px] text-[#7D8B99] line-clamp-2">
                          {pkg?.title.slice(0, 20).replace(/\s\S*$/, "") +
                            " . . ."}
                        </p>
                        <div className="flex items-center gap-4">
                          <span className="text-[14px] font-semibold text-[#AA8751]">
                            TK {pkg?.mrpPrice?.toLocaleString()}/-
                          </span>
                          <div>
                            <span className="line-through text-[#6C7A84] text-[13px] font-medium">
                              TK {pkg?.price?.toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <Link
                          to={`/package/${pkg._id}`}
                          className="w-full block bg-semisecondary hover:text-semisecondary border border-semisecondary py-2 px-4 rounded text-white hover:bg-white font-bold transition-all ease-linear duration-200 text-center mt-5"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </Containar>
          </div>
        </div>
      )}
    </>
  );
};

export default TourPackage;

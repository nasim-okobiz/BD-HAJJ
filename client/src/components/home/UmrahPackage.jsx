import React, { useEffect, useState } from "react";
import Containar from "../container/Containar";
import { Link, Navigate, useNavigate } from "react-router-dom";
import bgshape1 from "../../assets/pattern/bg-vector-2-1.png";
import bgshape2 from "../../assets/pattern/bg-vector-3-1.png";
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
          <div className="py-8 sm:py-20 font-philo relative">
            {/* Background Shape 1 */}
            <div className="absolute top-0 left-0 w-1/2 md:w-1/4 lg:w-2/3 h-auto opacity-40 sm:opacity-50 lg:opacity-70">
              <img
                className="w-full h-auto"
                src={bgshape1}
                alt="Background Pattern"
              />
            </div>

            {/* Background Shape 2 */}
            <div className="absolute bottom-0 right-0 w-1/2 md:w-1/4 lg:w-2/3 h-auto opacity-40 sm:opacity-50 lg:opacity-70">
              <img
                className="w-full h-auto"
                src={bgshape2}
                alt="Background Pattern"
              />
            </div>

            <Containar>
              <div className="relative z-10 mb-12">
                <div>
                  <p className="uppercase text-center tracking-wider text-base sm:text-xl">
                    packages
                  </p>
                  <h3 className="uppercase text-center tracking-wider text-[24px] sm:text-[30px] sm:py-2">
                    {packageHead?.name}
                  </h3>
                  <div className="w-40 sm:w-80 h-px mx-auto bg-gray-300"></div>
                </div>
              </div>

              {/* Other Elements */}
              {earlyBirdPackage && (
                <div className="flex flex-col sm:items-center text-center relative mb-16 p-6">
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
                          <div className="absolute -top-2 md:-top-10 2xl:-top-5 right-0 left-0 flex justify-center mx-auto w-52 bg-gradient-to-r from-red-500 via-red-400 to-red-300 text-white py-1 px-3 xl:py-2 xl:px-4 text-sm xl:text-xl font-extrabold shadow-lg transform xl:scale-105 transition-all duration-300">
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
                            <HajjButton align={earlyBirdPackage?._id} />
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* More Elements */}
            </Containar>
          </div>
        )}
      </div>
    </>
  );
};

export default UmrahPackage;

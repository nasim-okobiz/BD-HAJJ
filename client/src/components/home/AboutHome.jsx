import React, { useEffect, useState } from "react";
import Containar from "../container/Containar";
import pattern from "../../assets/pattern/pattern.jpg";
import decoration from "../../assets/pattern/decoration.png";
import about from "../../assets/about/about.jpg";
import HajjButton from "./HajjButton";
import btnshapeup from "../../assets/add/masjid.png";
import btnshapedown from "../../assets/add/masjidshape.png";
import { API_BASE_URL } from "../axios/config";
import { Link, useLocation } from "react-router-dom";
import api from "../axios/Axios";
import Loader from "../loader/Loader";
const AboutHome = ({ page }) => {
  const [aboutUss, setAboutUss] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const getAboutUss = async () => {
    try {
      const response = await api.get(`/about-us`);
      setAboutUss(response?.data?.data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getAboutUss();
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  console.log(aboutUss);
  return (
    <div
      className={`${page ? "sm:pt-0 " : "pt-10 sm:py-20"} relative font-philo`}
    >
      {!page && (
        <div className="absolute hidden md:block right-0 -top-10 -z-10">
          <img
            className=" w-[300px] lg:w-[400px] xl:w-[600px]"
            src={decoration}
          />
        </div>
      )}
      {!page && (
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${pattern})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.2,
            zIndex: -1,
          }}
        />
      )}

      {!page && (
        <Containar>
          <h3 className="text text-[24px] sm:text-[45px] text-center font-philo">
            {/* BD HAJJ Bangladesh Umrah Hajj Kafela */}
            {aboutUss[0]?.title}
          </h3>
          <div className="w-40 sm:w-80 h-px mx-auto bg-gray-300"></div>
        </Containar>
      )}

      {/* <section className=" mt-10 md:mt-10 pb-0 sm:pb-24">
        <Containar>
          <div className="flex flex-wrap justify-between">
           
            <div className="w-full  md:w-[42%]  mb-6 md:mb-0">
              <div className="w-full sticky top-36 z-20">
                <img
                  src={API_BASE_URL + aboutUss[0]?.photo}
                  className="w-full sm:w-[400px]  sm:h-[400px] h-[350px] border-[10px] border-white shadow-xl rounded-xl "
                  alt="BD Hajj Kafela"
                />
                <img
                  className="w-[300px]  hidden sm:block border-[10px] border-white absolute -left-16 -bottom-20 shadow-xl rounded-lg"
                  src={API_BASE_URL + aboutUss[0]?.bgPhoto}
                />
                <div className="rounded-lg hidden sm:block p-5 text-center absolute right-28 -bottom-10 bg-primary text-white border-white border-[10px] shdaow-xl">
                  <h3 className="text-[32px] font-bold">10+</h3>
                  <h4 className="text-[22px]">Years of Experience</h4>
                </div>
              </div>
            </div>

   
            <div className="w-full md:w-[55%] mb-6 md:mb-0">
              <div className="flex items-center mb-4">
                <div>
                  <h2
                    className="text-[24px] sm:text-[44px] font-semibold text-secondary"
                    style={{ textShadow: "2px 2px 2px #0000002d" }}
                  >
                    About Us
                  </h2>

                  <p
                    className="font-semibold text-[22px] sm:text-[36px] text-semisecondary"
                    style={{
                      textShadow: "2px 2px 2px #0000002d",
                    }}
                  >
               
                    {aboutUss[0]?.header}
                  </p>
                </div>
              </div>
              {page ? (
                <div className="text-[16px] sm:text-[22px] text-gray-700 mb-2 mt-5 sm:mt-16 text-justify ">
                  {aboutUss[0]?.description}
                </div>
              ) : (
                <p className="text-[16px] sm:text-[22px] text-gray-700 mb-2 mt-5 sm:mt-16 text-justify line-clamp-6">
                  {aboutUss[0]?.description}
                </p>

              )}
              {!page && (
                <div className="text-center md:text-left mt-10 sm:mt-16">
                  <div className={`flex justify-start`}>
                    <div className="relative group cursor-pointer ">
                      <img
                        className="w-[38px] sm:w-[45px] absolute group-hover:left-[70%] left-[10%] transition-all ease-in-out duration-300 -top-[80%]"
                        src={btnshapeup}
                      />
                      <img
                        className="w-[180px] sm:w-[230px] "
                        src={btnshapedown}
                      />

                      <div className="absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 text-white text-[16px] sm:text-xl font-semibold">
                        <Link to={"/about-us"} className="button block">
                          Know More
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {page && (
                <div className="text-right mt-10">
                  <p className="text-[16px] sm:text-[22px]">Best wishes,</p>
                  <p className="text-[16px] sm:text-[22px]">( {aboutUss[0]?.honorName})</p>
                  <p className="font-bold text-[16px] sm:text-[26px]">
                    {aboutUss[0]?.agencyName}
                  </p>
                  <p className="text-[16px] sm:text-[20px]">
                    Contact: 24/7 | WhatsApp:{" "}
                    <a href={`tel:+88${aboutUss[0]?.whatsApp}`} className="underline">
                      +88 {aboutUss[0]?.whatsApp}
                    </a>{" "}
                    | Email:{" "}
                    <a href={`mailto:${aboutUss[0]?.email}`} className="underline">
                      {aboutUss[0]?.email}
                    </a>
                  </p>

                </div>
              )}
            </div>
          </div>
        </Containar>
      </section> */}

      <div className="container mx-auto px-4 py-16 grid md:grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Section */}
        <div className="space-y-6 relative">
          <img
            src={API_BASE_URL + aboutUss[0]?.photo}
            alt="Kaaba"
            className="rounded-lg shadow-lg w-[350px] md:w-[450px] lg:w-[350px] h-auto mx-auto"
          />

          <div className="bg-gray-900 text-white p-2 xl:p-4 rounded-lg shadow-lg absolute top-0 xl:bottom-14 md:left-0 w-[150px] md:w-[200px] xl:w-[300px]">
            <img
              src={API_BASE_URL + aboutUss[0]?.bgPhoto}
              alt="Kaaba"
              className="rounded-lg shadow-lg w-[150px] sm:w-[350px] h-auto"
            />
            <p className="text-sm xl:text-lg font-medium mt-5">
              BD Umrah Hajj Kafela operate their activities according to Quran
              and Sunnah. !
            </p>
            <p className="inline-block mt-4 text-yellow-400 font-semibold hover:underline">
              10 years Experience →
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div>
          <p className="text-sm text-yellow-500 uppercase font-semibold tracking-wide">
            About Us
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-snug mt-2">
            {aboutUss[0]?.header}
          </h2>
          <p className="text-gray-600 mt-4 leading-relaxed font-sans">
            {page ? (
              <div className="text-[16px] sm:text-[22px]  mb-2  text-justify ">
                {aboutUss[0]?.description}
              </div>
            ) : (
              <p className="text-[16px] sm:text-[22px]  mb-2 text-justify line-clamp-6">
                {aboutUss[0]?.description}
              </p>
            )}

            {!page && (
              <div className="text-center md:text-left mt-10 sm:mt-16">
                <div className={`flex justify-start`}>
                  <div className="relative group cursor-pointer ">
                    <img
                      className="w-[38px] sm:w-[45px] absolute group-hover:left-[70%] left-[10%] transition-all ease-in-out duration-300 -top-[80%]"
                      src={btnshapeup}
                    />
                    <img
                      className="w-[180px] sm:w-[230px] "
                      src={btnshapedown}
                    />

                    <div className="absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 text-white text-[16px] sm:text-xl font-semibold">
                      <Link to={"/about-us"} className="button block">
                        Know More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {page && (
              <div className="text-right mt-10">
                <p className="text-[16px] sm:text-[22px]">Best wishes,</p>
                <p className="text-[16px] sm:text-[22px]">
                  ( {aboutUss[0]?.honorName})
                </p>
                <p className="font-bold text-[16px] sm:text-[26px]">
                  {aboutUss[0]?.agencyName}
                </p>
                <p className="text-[16px] sm:text-[20px]">
                  Contact: 24/7 | WhatsApp:{" "}
                  <a
                    href={`tel:+88${aboutUss[0]?.whatsApp}`}
                    className="underline"
                  >
                    +88 {aboutUss[0]?.whatsApp}
                  </a>{" "}
                  | Email:{" "}
                  <a
                    href={`mailto:${aboutUss[0]?.email}`}
                    className="underline"
                  >
                    {aboutUss[0]?.email}
                  </a>
                </p>
              </div>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutHome;

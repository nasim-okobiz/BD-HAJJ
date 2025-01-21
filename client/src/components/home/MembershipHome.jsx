import React, { useEffect, useState } from "react";
import Containar from "../container/Containar";
import HajjButton from "./HajjButton";
import btnshapeup from "../../assets/add/masjid.png";
import btnshapedown from "../../assets/add/masjidshape.png";
import tick from "../../assets/add/tick.png";
import bgshape from "../../assets/pattern/pattern.jpg";
import decoration1 from "../../assets/pattern/decoration.png";
import decoration2 from "../../assets/pattern/decoration-2.png";
import { Link, useLocation } from "react-router-dom";
import { API_BASE_URL } from "../axios/config";
import api from "../axios/Axios";
import { useSelector } from "react-redux";
import bghajj from "../../assets/pattern/bg-white-parallax.jpg";
import Skeleton from "react-loading-skeleton"; // Import Skeleton loader
import "react-loading-skeleton/dist/skeleton.css"; // Import styles
import headingLine from "../../assets/pattern/heading-line.png";

const JoinusHome = ({ page }) => {
  const role = useSelector((store) => store?.auth?.user?.role);
  const [joinuss, setJoinuss] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const getJoinuss = async () => {
    try {
      const response = await api.get(`/join-us`);
      setJoinuss(response?.data?.data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getJoinuss();
  }, []);

  return (
    <div className="font-merriweather relative">
      {/* Background Image */}
      <div
        className="bg-cover bg-fixed bg-no-repeat relative"
        style={{
          backgroundImage: `url(${bghajj})`,
          height: "auto", // Adjust height for responsiveness
        }}
      >
        <div className="absolute inset-0 bg-white/80"></div>
        {/* {!page && (
          <div className="absolute hidden md:block left-0 top-0 z-10">
            <img
              className=" w-[100px] lg:w-[400px]"
              src={decoration2}
            />
          </div>
        )} */}
        {!page && (
          <div className="absolute hidden md:block right-0 top-0 z-10">
            <img className=" w-[100px] lg:w-[400px]" src={decoration1} />
          </div>
        )}
        <Containar>
          <div className="flex flex-col lg:flex-row justify-between space-y-5 lg:space-y-0 pt-16 pb-28">
            {/* Content Section */}
            <div className="w-full z-10 lg:w-[47.5%]">
              <div className="heading mb-4">
                {isLoading ? (
                  <Skeleton width={200} height={40} />
                ) : (
                  <h2 className="text-[24px] sm:text-[40px]">
                    Join Us
                  </h2>
                )}
                {isLoading ? (
                  <Skeleton width={300} height={30} />
                ) : (
                  <p
                    className="text-[22px] sm:text-[30px]"
                    style={{
                      textShadow: "2px 2px 2px #0000002d",
                    }}
                  >
                    {joinuss[0]?.title}
                  </p>
                )}
                <div className="relative w-full flex justify-start mt-2">
                  <img
                    src={headingLine}
                    alt="Heading Line"
                    className="w-[40%] md:w-2/3 lg:w-auto"
                  />
                </div>
              </div>
              <div className="joinus mb-4">
                {/* Skeleton Loader for Description */}
                {isLoading ? (
                  <Skeleton count={3} height={20} />
                ) : (
                  <p className="text-[10px] sm:text-[16px] mb-4 text-justify">
                    {joinuss[0]?.description}
                  </p>
                )}

                {/* Skeleton Loader for Conditions */}
                {isLoading ? (
                  <Skeleton count={3} height={20} />
                ) : (
                  <ul className="list-inside text-[10px] sm:text-[16px]">
                    {joinuss[0]?.condition.map((condition, index) => (
                      <li key={index} className="flex items-center mb-2">
                        <img src={tick} alt="Tick" className="h-4 w-4 mr-3" />
                        {condition}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Skeleton Loader for Pricing */}
                {isLoading ? (
                  <Skeleton width={200} height={30} />
                ) : (
                  <div>
                    <p className="text-left text-[10px] sm:text-[26px] font-semibold mt-4">
                      Starting From
                    </p>
                    <p className="text-left text-[12px] sm:text-[30px] font-bold mb-2">
                      TK. {joinuss[0]?.amount} /- Only
                    </p>
                  </div>
                )}

                {/* Skeleton Loader for Button */}
                {isLoading ? (
                  <Skeleton width={200} height={50} />
                ) : (
                  <div className="mt-8">
                    <div className={`flex flex-start`}>
                      {role !== "agent" && (
                        // <div className="relative group cursor-pointer">
                        //   <img
                        //     className="w-[60px] absolute group-hover:left-[70%] left-[10%] transition-all ease-in-out duration-300 -top-[80%]"
                        //     src={btnshapeup}
                        //   />
                        //   <img className="w-[300px]" src={btnshapedown} />
                        //   <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-2xl font-semibold">
                        //     <Link
                        //       to={"/membership/membership-details-form"}
                        //       className="button"
                        //     >
                        //       Know More
                        //     </Link>
                        //   </div>
                        // </div>
                        <Link to="/membership">
                          <button className="bg-primary text-white font-bold py-3 px-6 rounded transition-all duration-300 transform hover:scale-105 hover:shadow-md uppercase">
                            Know More
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Image Section */}
            <div className="w-full lg:w-[47.5%] z-10 mb-4 hidden lg:flex items-center">
              {/* Skeleton Loader for Image */}
              {isLoading ? (
                <Skeleton height={400} width="100%" />
              ) : (
                (() => {
                  // Extract videoId directly from the URL
                  const videoUrl = joinuss[0]?.videoUrl;  // Assuming video URL is available

                  const videoIdMatch = videoUrl?.match(/(?:https:\/\/www\.youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);

                  if (!videoIdMatch) {
                    return <p>Invalid YouTube URL</p>;  // In case the URL is not valid
                  }

                  const videoId = videoIdMatch[1];  // Extracted videoId from the YouTube URL

                  // Construct the YouTube embed URL
                  const embedUrl = `https://www.youtube.com/embed/${videoId}`;

                  return (
                    <iframe
                      width="660"
                      height="350"
                      src={embedUrl}
                      frameborder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen
                      className="rounded-2xl"
                    ></iframe>
                  );
                })()
              )}
            </div>



          </div>
        </Containar>
      </div>
    </div>
  );
};

export default JoinusHome;

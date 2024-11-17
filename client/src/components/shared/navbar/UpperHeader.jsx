import React, { useState, useEffect } from "react";
import Containar from "../../container/Containar";
import Ticker from "react-ticker";
import { Link } from "react-router-dom";
import api from "../../axios/Axios";
import { FaPhone } from "react-icons/fa";
import { AiOutlineYoutube } from "react-icons/ai";
import { RiFacebookCircleLine } from "react-icons/ri";
import { CiLinkedin } from "react-icons/ci";
import { RiTelegramLine } from "react-icons/ri";
function Header() {
  const [isPaused, setIsPaused] = useState(false);
  const [announcements, setAnnouncements] = useState();
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await api.get("/notice");
      console.log("API Response:", response);
      console.log("API Response:", response.data.data[0]);
      setAnnouncements(response?.data?.data[0]?.notice);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log("Announcements:", announcements);

  return (
    <section className="bg-semisecondary py-1 flex items-center justify-between font-philo">
      <Containar>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center text-white space-x-2 sm:mb-2 md:mb-0 md:w-[15%]">
            <FaPhone className="rotate-[110deg]" />
            <span className="font-medium text-xs sm:text-sm">
              <a href="tel:+8801777899993" className="leading-loose hover:text-red-700">
                +88 01777899993
              </a>
            </span>
          </div>

          <div
            className="w-full md:w-[85%] overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            style={{ whiteSpace: "nowrap" }}
          >
            {/* {loading ? (
              <span className="text-white text-xs sm:text-sm font-bold">
                Loading announcements...
              </span>
            ) : announcements.length > 0 ? ( */}
            {announcements && (
              <Ticker speed={7} mode="smooth" move={!isPaused}>
                {() => (
                  <div className="flex space-x-8 text-white text-xs sm:text-sm font-bold">
                    {announcements}
                  </div>
                )}
              </Ticker>
            )

            }

            {/* // ) : (
            //   <span className="text-white text-xs sm:text-sm font-bold">
            //     No announcements available.
            //   </span>
            // )} */}
          </div>
          {/* social icon and link add  */}
          <div className="flex items-center sm:pl-4 space-x-3 text-white text-xl md:w-[15%]">
            <a href="https://www.facebook.com/bdumrahhajjkafela?mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer">
              <RiFacebookCircleLine className="hover:text-blue-500" />
            </a>
            <a href="https://www.youtube.com/@hajjandumrahtrips" target="_blank" rel="noopener noreferrer">
              <AiOutlineYoutube className="hover:text-blue-400" />
            </a>
            <a href="https://www.linkedin.com/in/bd-umrah-hajj-kafela-85b32a1a6?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noopener noreferrer">
              <CiLinkedin className="hover:text-pink-500" />
            </a>
            <a href="https://www.youtube.com/@hajjandumrahtrips" target="_blank" rel="noopener noreferrer">
              <RiTelegramLine className="hover:text-blue-400" />
            </a>
          </div>
        </div>
      </Containar>
    </section>
  );
}

export default Header;

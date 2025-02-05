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
      const response = await api.get("/notice");;
      setAnnouncements(response?.data?.data);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <section className="bg-semisecondary py-2 flex items-center justify-between font-merriweather">
      <Containar>
        <div className="flex flex-col md:flex-row justify-between items-center">

          <div
            className="w-full overflow-hidden mx-auto"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            style={{ whiteSpace: "nowrap" }}
          >
            {announcements && (
              <Ticker speed={10} mode="smooth" move={!isPaused}>
                {() => (
                  <div className="flex space-x-8 text-white text-lg font-semibold">
                    {announcements.map((announcement) => (
                      // <Link
                      //   key={announcement._id}
                      //   to={`/notice/${announcement._id}`}
                      //   className="hover:text-primary"
                      // >
                      <p className="px-20">{announcement?.notice}</p>
                      // </Link>
                    ))}
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
        </div>
      </Containar>
    </section>
  );
}

export default Header;

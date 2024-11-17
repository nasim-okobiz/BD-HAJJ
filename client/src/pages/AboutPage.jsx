import React from "react";
import AboutHome from "../components/home/AboutHome";
import Containar from "../components/container/Containar";
import { AiOutlineRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import bgshape from "../assets/pattern/pattern.jpg"

const AboutPage = () => {
  return (
    <div className="relative">
      <div className="absolute left-0 top-0 w-full h-full opacity-20 -z-10">
        <img className="w-full h-full" src={bgshape} />
      </div>
      <div className="py-5 sm:pl-[140px] bg-gray-100 z-10">
        <Containar>
          <div className="">
            <nav className="flex items-center space-x-2 text-gray-600 text-sm sm:text-lg">
              <Link to="/" className="hover:text-semisecondary font-bold">
                Home
              </Link>
              <AiOutlineRight />
              <span>About Us</span>
            </nav>
          </div>
        </Containar>
      </div>
      <div className="pb-12 md:pb-[200px]">
        <AboutHome page={true} />
      </div>
    </div>
  );
};

export default AboutPage;

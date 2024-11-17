import React from "react";
import Containar from "../container/Containar";
import background from "../../assets/pattern/pattern.jpg";
import HajjButton from "./HajjButton";

const MiddleAdsBanner = () => {
  return (
    <div className="relative pt-10 sm:pt-24 sm:pb-20 font-philo">
      {/* Background Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${background})`,
          opacity: 0.2,
        }}
      />
      <Containar>
        <div className="flex flex-col sm:items-center text-center relative z-10">
          <h2 className="text-[22px] sm:text-[40px] font-semibold text-start sm:text-center text-secondary drop-shadow-lg">
            Special Offers Just For You!
          </h2>
          <p className="text-[18px] sm:text-[30px] mt-5 max-w-[700px] text-semisecondary text-left sm:text-center font-semibold text-secondary-color font-century drop-shadow-md">
            Don't miss out on our limited-time offers and discounts. Grab them
            while they last!
          </p>

          <div className="w-full mb-4 mt-7 sm:mt-20">
            <img
              className="w-full"
              src="https://mynilnod.com/frontend/Images/77.png"
              alt="Ad 1"
            />
          </div>
          {/* <div className="w-full mb-4 mt-5 sm:mt-28 relative">
            <img
              className="w-full opacity-30 h-[180px] sm:h-auto rounded-[30px]"
              src="https://mynilnod.com/frontend/Images/sp-of-bg.jpg"
              alt="Ad 2"
            />
            <div className="absolute left-0 top-0 w-full h-full flex justify-center items-center">
              <div>
                <h2 className="text-[16px] sm:text-[54px] font-semibold text-center text-secondary ">
                  VIP Package with Mahabur Mondal
                </h2>
                <h2 className="text-[16px] sm:text-[64px] text-semisecondary text-center font-semibold text-secondary-color font-century textshadow">
                  TK 1,20,000/-
                </h2>
                <p className="text-[14px] sm:text-xl text-center">👨 4/5 Person Private Rooms</p>
                <p className="text-[14px] sm:text-xl mt-2 px-2 sm:px-0 text-center">
                  🏡 10-15 min from makkah (M1000-1200) - 10-15 min from madinah
                  (M1000-1200)
                </p>
                <div  className="mt-16 hidden sm:block">
                  <HajjButton />
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </Containar>
    </div>
  );
};

export default MiddleAdsBanner;

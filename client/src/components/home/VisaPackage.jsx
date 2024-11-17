import React from "react";
import Containar from "../container/Containar";
import HajjButton from "./HajjButton";
import Package from "./Package";
import bgshape from "../../assets/pattern/pattern.jpg"
import bird from "../../assets/add/sp-of-bg.jpg"

const VisaPackage = () => {
  return (
    <div className="font-philo relative">
      <div className="absolute left-0 top-0 w-full h-full opacity-20">
        <img className="w-full h-full" src={bgshape} />
      </div>
      <Containar>
        <div>
          {/* <div> */}
            {/* <img
              className="w-full"
              src="https://bdhajj.com/assets/lfm/files/1/77444fff.jpg"
            /> */}
          {/* </div> */}
          <div>
            <div className="w-full mb-4 mt-5 sm:mt-28 relative">
              <img
                className="w-full opacity-40 h-[180px] sm:h-auto rounded-[30px]"
                src={bird}
                alt="Ad 2"
              />
              <div className="absolute left-0 top-0 w-full h-full flex justify-center items-center">
                <div>
                  <h2 className="text-[16px] sm:text-[54px] font-semibold text-center text-secondary ">
                    Umra Package with Hajj Kafela
                  </h2>
                  <h2 className="text-[16px] sm:text-[64px] text-semisecondary text-center font-semibold text-secondary-color font-century textshadow">
                    TK 99,000/-
                  </h2>
                  <p className="text-[14px] sm:text-xl text-center">
                    👨 4/5 Person Private Rooms
                  </p>
                  <p className="text-[14px] sm:text-xl mt-2 px-2 text-center sm:px-0">
                    🏡 10-15 min from makkah (M1000-1200) - 10-15 min from
                    madinah (M1000-1200)
                  </p>
                  <div className="mt-16 hidden sm:block">
                    <HajjButton />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Containar>
      <Package
        bgImage={
          "https://marketplace.canva.com/EAGBUQRUZEM/1/0/900w/canva-blue-watercolor-mosque-and-lantern-background-instagram-story-nHFoKk3I3o4.jpg"
        }
      />
    </div>
  );
};

export default VisaPackage;

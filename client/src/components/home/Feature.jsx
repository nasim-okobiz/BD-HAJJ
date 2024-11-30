import React from "react";
import {
  FaPlane,
  FaPassport,
  FaShieldAlt,
  FaHotel,
  FaUserTie,
  FaUtensils,
} from "react-icons/fa";
import image from "../../assets/pattern/1.png";
import Containar from "../container/Containar";
import bgshape from "../../assets/pattern/pattern.jpg"
import service from "../../assets/service/sevice3.png"

const Features = () => {
  // Array of features with icons and labels
  const features = [
    {
      imgSrc: "https://mynilnod.com/frontend/Images/icon/1.png",
      text: "Flight (With Return)",
    },
    { imgSrc: "https://mynilnod.com/frontend/Images/icon/2.png", text: "Visa" },
    {
      imgSrc: "https://mynilnod.com/frontend/Images/icon/3.png",
      text: "Insurance",
    },
    {
      imgSrc: "https://mynilnod.com/frontend/Images/icon/4.png",
      text: "Hotel",
    },
    {
      imgSrc: "https://mynilnod.com/frontend/Images/icon/5.png",
      text: "Tour Guide",
    },
    {
      imgSrc: "https://mynilnod.com/frontend/Images/icon/6.png",
      text: "Unlimited Indian Buffet Food",
    },
    {
      imgSrc: "https://mynilnod.com/frontend/Images/icon/7.png",
      text: "Unlimited Laundry",
    },
    {
      imgSrc: "https://mynilnod.com/frontend/Images/icon/8.png",
      text: "24/7 Customer Support",
    },
    {
      imgSrc: "https://mynilnod.com/frontend/Images/icon/9.png",
      text: "Complete Transport",
    },
    {
      imgSrc: "https://mynilnod.com/frontend/Images/icon/10.png",
      text: "Ziyarat Full Free",
    },
    {
      imgSrc: "https://mynilnod.com/frontend/Images/icon/11.png",
      text: "Welcome Kit",
    },
    {
      imgSrc: "https://mynilnod.com/frontend/Images/icon/12.png",
      text: "ZamZam",
    },
  ];

  return (
    <div className="relative font-merriweather">
      <div className="absolute left-0 top-0 w-full h-full opacity-20">
        <img className="w-full h-full" src={bgshape} />
      </div>
      <Containar>
        <div className="features">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div
                  className="bg-no-repeat bg-center bg-contain flex justify-center items-center h-40 w-full"
                  style={{
                    backgroundImage:
                      `url(${service})`,
                  }}
                >
                  <img
                    src={feature.imgSrc}
                    alt={feature.text}
                    className="h-16 w-16 sm:h-16 sm:w-16 md:h-20 md:w-20 rounded-full p-4 transform transition-transform duration-200 hover:scale-110"
                  />
                </div>
                <p className="mt-2 text-sm md:text-[22px] leading-7 font-bold">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Containar>
    </div>
  );
};

export default Features;

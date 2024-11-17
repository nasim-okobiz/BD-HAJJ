import React from "react";
import btnshapeup from "../../assets/add/masjid.png";
import btnshapedown from "../../assets/add/masjidshape.png";
import { Link } from "react-router-dom";

const HajjButton = ({align}) => {
  console.log("first", align);
  return (
    // <div className={`${align ? align : " justify-center"} flex`}   >
    <div className={`justify-center flex`}   >
      <div className="relative group cursor-pointer ">
        <img
          className="w-[50px] absolute group-hover:left-[70%] left-[10%] transition-all ease-in-out duration-300 -top-[80%]"
          src={btnshapeup}
        />
        <img className="w-[200px] sm:w-[260px] " src={btnshapedown} />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-[22px] font-semibold">
        <Link to={`package/${align}`}>
          <button className="button ">Book Now</button>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default HajjButton;

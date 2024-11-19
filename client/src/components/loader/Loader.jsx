import React from "react";
import Lottie  from "lottie-react";
import loader from "../../assets/loading/loader.json"; // Ensure this path is correct

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center h-64">
      <Lottie
        animationData={loader}
        loop={true}
        autoplay={true}
        style={{ width: 200, height: 200 }}
      />

      <span className="ml-4 text-lg font-semibold">Loading...</span>
    </div>
  );
};

export default Loader;

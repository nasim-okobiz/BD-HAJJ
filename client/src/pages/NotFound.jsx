import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Containar from "../components/container/Containar";
import notfoundimg from "../assets/notfound/notfound.gif";

const NotFound = () => {
  const digits = ["4", "0", "4"];
  const [displayedDigits, setDisplayedDigits] = useState(["", "", ""]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false); // Track if we completed displaying "404"

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isComplete) return; // If we have completed displaying, do nothing

      // Update the displayed digits
      setDisplayedDigits((prev) => {
        const newDigits = [...prev];
        newDigits[currentIndex] = digits[currentIndex]; // Show the current digit

        // Move to the next index
        const nextIndex = (currentIndex + 1) % digits.length; // Loop back to start
        setCurrentIndex(nextIndex); // Update currentIndex for the next interval

        // If we've reached the last digit, set isComplete to true
        if (nextIndex === 0) {
          setIsComplete(true); // Mark completion
          setTimeout(() => {
            setDisplayedDigits(["", "", ""]); // Hide digits
            setIsComplete(false); // Reset completion flag
          }, 500); // Delay before hiding digits
        }

        return newDigits; // Return the updated digits
      });
    }, 1000); // Change digit every 1000ms

    // If digits are completed, set a timeout for the 2000ms delay
    if (isComplete) {
      const delayId = setTimeout(() => {
        setCurrentIndex(0); // Reset to the start for the next sequence
        setDisplayedDigits(["", "", ""]); // Clear displayed digits before restart
      }, 2000); // 2000 ms delay after showing "404"

      return () => clearTimeout(delayId); // Cleanup delay on unmount or before resetting
    }

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, [currentIndex, isComplete]); // Dependency includes isComplete

  return (
    <div className="py-10 md:py-20 h-screen relative overflow-hidden font-merriweather">
      <Containar>
        <div className="text-center relative">
          <div className="relative w-full md:w-[40%] mx-auto mb-5">
            <h3 className="absolute -left-[2%] -top-[12%] -rotate-[30deg] text-[80px] md:text-[120px] font-bold text">
              {displayedDigits.map((digit, index) => (
                <span
                  key={index}
                  className={`transition-all duration-500 ease-in-out transform ${
                    digit ? "opacity-100 scale-100" : "opacity-0 scale-0"
                  }`}
                >
                  {digit}
                </span>
              ))}
            </h3>
            <img 
              src={notfoundimg} 
              alt="404 Not Found" 
              className="w-full max-w-full h-auto" 
            />

            <div className="absolute left-1/2 bottom-0 bg-white w-[160px] -translate-x-1/2 py-3.5"></div>
          </div>

          <h1 className="text-2xl md:text-[5xl] font-bold text-gray-800 mb-4">
            Oops! Page Not Found
          </h1>
          <p className="text-base md:text-xl text-gray-600 max-w-[600px] mx-auto mb-8 px-4">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>

          <Link
            to="/"
            className="bg-primary hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Back to Home
          </Link>
        </div>
      </Containar>
    </div>
  );
};

export default NotFound;

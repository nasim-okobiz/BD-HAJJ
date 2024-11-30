import React, { useEffect } from "react";
import Containar from "../components/container/Containar";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { AiOutlineRight } from "react-icons/ai";
import BookingList from "../components/booking/BookingList";
import { useSelector } from "react-redux"; // Import useSelector

const Dashboard = () => {
  const navigate = useNavigate(); // Initialize navigate
  const { accessToken, user } = useSelector((state) => state.auth); // Retrieve accessToken and user from Redux state

  useEffect(() => {
    // Check if user is not authenticated
    if (!accessToken || !user) {
      navigate("/package"); // Redirect to "/package"
    }
  }, [accessToken, user, navigate]);

  return (
    <div className="font-merriweather">
      <div className="py-5 pl-4 md:pl-[140px] bg-gray-100 z-10">
        <Containar>
          <div>
            <nav className="flex items-center space-x-1 md:space-x-2 text-gray-600 text-xs sm:text-lg">
              <Link to="/" className="hover:text-semisecondary font-bold">
                Home
              </Link>
              <AiOutlineRight className="hidden sm:block" />
              <span className="text-gray-800 font-semibold">Dashboard</span>
            </nav>
          </div>
        </Containar>
      </div>
      <div>
        <Containar>
          <BookingList />
        </Containar>
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { AiOutlineMenu, AiOutlineRight } from "react-icons/ai";
import { useSelector } from "react-redux";
import AgentProfile from "../../agentProfile/AgentProfile";
import Containar from "../../components/container/Containar";
import api from "../../components/axios/Axios";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css"; // Import drawer styles

const Profile = () => {
  const location = useLocation();
  const pathname = location.pathname;
  const [packageTypes, setPackageTypes] = useState([]);
  const [membershipData, setMembershipData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchPackageTypes = async () => {
      try {
        const response = await api.get("/package-type");
        if (response.data.statusCode === 200) {
          setPackageTypes(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching package types:", error);
      }
    };

    fetchPackageTypes();
  }, []);

  useEffect(() => {
    const fetchMembershipData = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/membership/user/${user?.id}`);
        if (response.data.statusCode === 200) {
          setMembershipData(response.data.data);
        }
      } catch (error) {
        setError("Error fetching membership data");
        console.error("Error fetching membership data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembershipData();
  }, [user]);

  const toggleDrawer = () => setIsDrawerOpen((prev) => !prev);

  return (
    <div className="font-philo bg-gray-100 min-h-screen">
      <AgentProfile userId={user?.id} />
      <Containar className="pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Category Sidebar for Desktop */}
          <div className="col-span-1 hidden md:block">
            <div className="bg-white shadow-md rounded-lg pt-6 px-6 pb-8 sticky top-36">
              <h3 className="text-2xl font-bold mb-8 text-center">
                Booking History
              </h3>
              <ul className="space-y-3">
                <li className="group capitalize">
                  <Link
                    to={`/profile/${membershipData?._id}`}
                    className={`${
                      pathname === `/profile/${membershipData?._id}`
                        ? "bg-semisecondary text-white"
                        : "text-gray-800"
                    } font-semibold flex items-center rounded-md justify-between px-4 group-hover:text-white group-hover:bg-semisecondary transition-all duration-300 ease-in-out py-3`}
                  >
                    Latest Booking
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      <AiOutlineRight />
                    </span>
                  </Link>
                </li>
                {packageTypes.map((pkg) => {
                  const pkgPath = `/profile/${user?.id}/${pkg._id}/membership/${membershipData?._id}`;
                  return (
                    <li key={pkg?._id} className="group capitalize">
                      <Link
                        to={pkgPath}
                        className={`${
                          pathname === pkgPath
                            ? "bg-semisecondary text-white"
                            : "text-gray-800"
                        } font-semibold flex items-center rounded-md justify-between px-4 group-hover:text-white group-hover:bg-semisecondary transition-all duration-300 ease-in-out py-3`}
                      >
                        {pkg?.name}
                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                          <AiOutlineRight />
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Mobile Category Drawer */}
          <div className="md:hidden">
            <button
              onClick={toggleDrawer}
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              <AiOutlineMenu className="mr-2" />
              Categories
            </button>
            
            <Drawer
              open={isDrawerOpen}
              onClose={toggleDrawer}
              direction="right"
              className="z-[999999999]"
            >
              <div className="z-[999999999] p-6 overflow-y-auto">
                <h3 className="text-xl font-bold mb-8">Booking History</h3>
                <ul className="space-y-3">
                  <li className="group capitalize">
                    <Link
                      to={`/profile/${membershipData?._id}`}
                      className={`${
                        pathname === `/profile/${membershipData?._id}`
                          ? "bg-semisecondary text-white"
                          : "text-gray-800"
                      } font-semibold flex items-center rounded-md justify-between px-4 group-hover:text-white group-hover:bg-semisecondary transition-all duration-300 ease-in-out py-3`}
                      onClick={toggleDrawer}
                    >
                      Latest Booking
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        <AiOutlineRight />
                      </span>
                    </Link>
                  </li>
                  {packageTypes.map((pkg) => {
                    const pkgPath = `/profile/${user?.id}/${pkg._id}/membership/${membershipData?._id}`;
                    return (
                      <li key={pkg?._id} className="group capitalize">
                        <Link
                          to={pkgPath}
                          className={`${
                            pathname === pkgPath
                              ? "bg-semisecondary text-white"
                              : "text-gray-800"
                          } font-semibold flex items-center rounded-md justify-between px-4 group-hover:text-white group-hover:bg-semisecondary transition-all duration-300 ease-in-out py-3`}
                          onClick={toggleDrawer}
                        >
                          {pkg?.name}
                          <span className="group-hover:translate-x-1 transition-transform duration-300">
                            <AiOutlineRight />
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </Drawer>
          </div>

          {/* Main Content Area (Outlet) */}
          <div className="col-span-1 md:col-span-3">
            <Outlet />
          </div>
        </div>
      </Containar>
    </div>
  );
};

export default Profile;

import React, { useEffect, useState, useRef } from "react";
import { AiOutlineRight, AiOutlineMenu } from "react-icons/ai";
import { Link, Outlet, useLocation } from "react-router-dom";
import Containar from "../components/container/Containar";
import api from "../components/axios/Axios";

const PackageLayout = () => {
  const location = useLocation();
  const [packageTypes, setPackageTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const drawerRef = useRef(null);

  const getPackageTypes = async () => {
    try {
      const response = await api.get(`/package-type`);
      setPackageTypes(response?.data?.data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPackageTypes();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setIsDrawerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [drawerRef]);

  return (
    <div className="font-philo">
      <div className="py-5 pl-4 sm:pl-[140px] bg-gray-50 z-10">
        <Containar>
          <nav className="flex items-center space-x-2 text-gray-600 text-lg">
            <Link to="/" className="hover:text-semisecondary font-bold block">
              Home
            </Link>
            <AiOutlineRight />
            <span>Packages</span>
          </nav>
        </Containar>
      </div>
      <section className="pt-10 pb-20 bg-gray-100">
        <Containar>
          <div className="grid grid-cols-12 gap-y-6 sm:gap-6">
            {/* Sidebar for larger screens */}
            <div className="hidden lg:block col-span-3">
              <div className="pt-7 pb-7 bg-white shadow-lg rounded-md sticky px-5 top-36">
                <h3 className="text-lg font-bold mb-4">Package Categories</h3>
                <ul>
                  <li className="rounded-md border-b">
                    <Link
                      to="/packages"
                      className={`font-semibold px-3 py-3 block rounded-md ${
                        location.pathname === "/packages"
                          ? "bg-semisecondary text-white"
                          : ""
                      }`}
                    >
                      All Packages
                    </Link>
                  </li>
                  {packageTypes.map((type) => (
                    <li
                      key={type?._id}
                      className="rounded-md border-b capitalize"
                    >
                      <Link
                        to={`/packages/category/${type?._id}`}
                        className={`font-semibold py-3 px-3 block rounded-md ${
                          location.pathname ===
                          `/packages/category/${type?._id}`
                            ? "text-white bg-semisecondary"
                            : ""
                        }`}
                      >
                        {type?.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Drawer for smaller screens */}
            <div className="lg:hidden col-span-12">
              <button
                className="flex items-center gap-2 text-lg font-semibold bg-semisecondary text-white py-2 px-4 rounded-md"
                onClick={() => setIsDrawerOpen(true)}
              >
                <AiOutlineMenu className="text-xl" />
                Select Package Type
              </button>

              {/* Drawer with transition from right */}
              <div
                className={`fixed inset-0 z-20 ${
                  isDrawerOpen ? "flex" : "hidden"
                }`}
              >
                <div
                  className="bg-black bg-opacity-50 w-full"
                  onClick={() => setIsDrawerOpen(false)}
                />
                <div
                  ref={drawerRef}
                  className={`fixed right-0 top-0 h-full bg-white w-4/5  sm:w-1/2 max-w-xs p-5 shadow-lg transform transition-transform duration-300 ease-in-out ${
                    isDrawerOpen ? "translate-x-0" : "translate-x-full"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold mb-4">
                      Package Categories
                    </h3>
                    <button
                      className="text-red-600 text-lg mb-4"
                      onClick={() => setIsDrawerOpen(false)}
                    >
                      Close
                    </button>
                  </div>

                  <ul>
                    <li className="rounded-md border-b">
                      <Link
                        to="/packages"
                        className={`font-semibold px-7 py-3 block rounded-md ${
                          location.pathname === "/packages"
                            ? "bg-semisecondary text-white"
                            : ""
                        }`}
                        onClick={() => setIsDrawerOpen(false)}
                      >
                        All Packages
                      </Link>
                    </li>
                    {packageTypes.map((type) => (
                      <li
                        key={type?._id}
                        className="rounded-md border-b capitalize"
                      >
                        <Link
                          to={`/packages/category/${type?._id}`}
                          className={`font-semibold py-3 px-7 block rounded-md ${
                            location.pathname ===
                            `/packages/category/${type?._id}`
                              ? "text-white bg-semisecondary"
                              : ""
                          }`}
                          onClick={() => setIsDrawerOpen(false)}
                        >
                          {type?.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Main content area */}
            <div className="col-span-12 lg:col-span-9">
              <Outlet />
            </div>
          </div>
        </Containar>
      </section>
    </div>
  );
};

export default PackageLayout;

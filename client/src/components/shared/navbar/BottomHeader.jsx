import React, { useState, useEffect, useRef } from "react";
import Containar from "../../container/Containar";
import image from "../../../assets/logo/logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { menuList } from "../../constants/constants";
import { IoMenu } from "react-icons/io5";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { clearCredentials } from "../../../redux/slices/auth/authslice";
import { MdOutlineDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import api from "../../axios/Axios";

const BottomHeader = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState([]);
  const [membershipData, setMembershipData] = useState([]);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubCategory, setActiveSubCategory] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef(null);
  const toggleDrawer = () => setIsOpen((prevState) => !prevState);
  const navigate = useNavigate();
  const role = useSelector((store) => store?.auth?.user?.role);
  const { accessToken, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    api
      .get("/package/group")
      .then((response) => setData(response.data.data))
      .catch((err) => setError(err));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY >= 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

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
      } finally {
        setLoading(false);
      }
    };

    fetchMembershipData();
  }, [user?.id]);

  const handleCategoryMouseEnter = (title) => {
    setActiveCategory(title);
    setActiveSubCategory(null);
  };

  const handleSubCategoryMouseEnter = (title) => {
    setActiveSubCategory(title);
  };

  const handleMouseLeave = () => {
    setActiveCategory(null);
    setActiveSubCategory(null);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <div
      className={`w-full font-merriweather transition-all z-[9999] py-2 ease-in-out duration-500 bg-[#FCFBF6] ${
        isSticky ? "fixed top-0 left-0 bg-[#FCFBF6] shadow-md z-50" : ""
      }`}
    >
      <Containar>
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="w-12">
              <img
                onClick={() => navigate("/")}
                className="w-full cursor-pointer group-hover:scale-105 duration-200"
                src={image}
                alt="Logo"
              />
            </div>
            <h3
              onClick={() => navigate("/")}
              className="text-[#e9bf55] text-[16px] sm:text-[22px] font-semibold group-hover:translate-x-1 duration-200"
            >
              BD Umrah Hajj Kafela
            </h3>
          </div>
          <div className="flex justify-end items-center ">
            <nav className="xl:flex justify-end items-center hidden">
              <ul className="flex space-x-5 xl:space-x-4 flex-wrap text-secondary font-semibold items-center uppercase">
                {menuList.map((item, index) => (
                  <li
                    key={index}
                    className="relative group h-[70px] flex items-center"
                    onMouseEnter={() =>
                      item.categoryMenu && handleCategoryMouseEnter(item.title)
                    }
                    onMouseLeave={handleMouseLeave}
                  >
                    <NavLink
                      to={item.Link}
                      className={({ isActive }) =>
                        isActive
                          ? "bg-primary text-white py-1 px-2 rounded-lg"
                          : "hover:text-primary hover:bg-white hover:border-primary transition-colors ease-in-out duration-300"
                      }
                    >
                      {item.title}
                    </NavLink>
                    {data.length > 0 && activeCategory === item.title && (
                      <div className="absolute -left-1 top-[90%] bg-white shadow-lg rounded-md z-50 min-w-48 border border-gray-200">
                        <ul className="flex flex-col">
                          {data.map((category, catIndex) => (
                            <li
                              key={catIndex}
                              className="relative group/edit border-b last:border-b-0"
                            >
                              <Link
                                to={`/packages/category/${category.id}`}
                                className="block px-4 py-2 text-black capitalize hover:text-primary transition-all duration-150"
                              >
                                {category.packageType}
                              </Link>
                              {category?.packages.length > 0 && (
                                <div className="absolute hidden group-hover/edit:block left-full top-0 min-w-48 py-2 px-4 shadow-sm bg-[#FCFBF6]">
                                  {category?.packages.map((item, index) => (
                                    <Link
                                      key={index}
                                      to={`/package/${item?.id}`}
                                      className={`text-black py-2 block ${
                                        category?.packages.length !== index + 1
                                          ? "border-b"
                                          : ""
                                      } text-sm capitalize hover:text-primary`}
                                    >
                                      {item?.name}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}

                {accessToken && user ? (
                  <div
                    className="relative flex items-center space-x-1"
                    ref={dropdownRef}
                  >
                    <img
                      src={user.avatar || "https://i.ibb.co/Z8J4QHN/user.jpg"}
                      alt="User Avatar"
                      className="w-10 h-10 rounded-full cursor-pointer"
                      onClick={toggleDropdown}
                    />
                    <span
                      className="text-[#000000] cursor-pointer capitalize"
                      onClick={toggleDropdown}
                    >
                      {user.name.split(" ").slice(0, 2).join(" ")}
                    </span>
                    {isDropdownOpen && (
                      <div className="absolute right-0 top-[100%] bg-white shadow-lg rounded-md z-50 w-48 mt-2 border border-gray-200">
                        <ul className="flex flex-col">
                          {role === "agent" && (
                            <li onClick={toggleDropdown}>
                              <Link
                                to={`/profile/${membershipData?._id}`}
                                className="dropdown-item px-4 py-2 flex items-center gap-1 text-semisecondary hover:bg-gray-100"
                              >
                                <CgProfile /> Profile
                              </Link>
                            </li>
                          )}
                          <li onClick={toggleDropdown}>
                            <Link
                              to="/dashboard"
                              className="dropdown-item px-4 py-2 flex items-center gap-1 text-semisecondary hover:bg-gray-100"
                            >
                              <MdOutlineDashboard /> Dashboard
                            </Link>
                          </li>
                          <li onClick={toggleDropdown}>
                            <div
                              className="dropdown-item text-red-600 px-4 py-2 cursor-pointer flex items-center gap-1 hover:bg-gray-100"
                              onClick={() => dispatch(clearCredentials())}
                            >
                              <IoIosLogOut /> Logout
                            </div>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="hover:text-primary bg-primary border border-primary text-white py-1 px-4 rounded tracking-wide hover:bg-white transition-colors"
                  >
                    Login
                  </Link>
                )}
              </ul>
            </nav>
            <div className="xl:hidden ">
              <IoMenu
                onClick={toggleDrawer}
                className="text-2xl text-[#000000] cursor-pointer"
              />
              <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction="right"
                className="z-50"
              >
                <div className="bg-white h-screen p-5 overflow-y-auto  flex flex-col justify-start items-start">
                  <div className="flex justify-between items-center w-full">
                    <img className="w-[60px]" src={image} />
                    <RxCross2
                      onClick={toggleDrawer}
                      className="text-2xl text-gray-700 cursor-pointer"
                    />
                  </div>
                  <ul className="space-y-3 font-semibold text-gray-700 mt-5">
                    {menuList.map((item, index) => (
                      <li key={index}>
                        <NavLink
                          to={item.Link}
                          onClick={toggleDrawer}
                          className={({ isActive }) =>
                            isActive
                              ? "text-primary"
                              : "hover:text-primary transition-colors ease-in-out duration-300"
                          }
                        >
                          {item.title}
                        </NavLink>
                      </li>
                    ))}
                    {accessToken && user ? (
                      <>
                        <li className="mt-5 flex items-center space-x-2">
                          <img
                            src={
                              user.avatar || "https://i.ibb.co/Z8J4QHN/user.jpg"
                            }
                            alt="User Avatar"
                            className="w-10 h-10 rounded-full"
                          />
                          <span className="text-[#000000] capitalize">
                            {user.name.split(" ").slice(0, 2).join(" ")}
                          </span>
                        </li>
                        {role === "agent" && (
                          <li onClick={toggleDrawer}>
                            <Link
                              to={`/profile/${membershipData?._id}`}
                              className="dropdown-item px-2 py-1 flex items-center gap-1 text-semisecondary hover:bg-gray-100"
                            >
                              <CgProfile /> Profile
                            </Link>
                          </li>
                        )}
                        <li onClick={toggleDrawer}>
                          <Link
                            to="/dashboard"
                            className="dropdown-item px-2 py-1 flex items-center gap-1 text-semisecondary hover:bg-gray-100"
                          >
                            <MdOutlineDashboard /> Dashboard
                          </Link>
                        </li>
                        <li
                          onClick={() => {
                            dispatch(clearCredentials());
                            toggleDrawer();
                          }}
                        >
                          <div className="dropdown-item text-red-600 px-2 py-1 cursor-pointer flex items-center gap-1 hover:bg-gray-100">
                            <IoIosLogOut /> Logout
                          </div>
                        </li>
                      </>
                    ) : (
                      <li>
                        <Link
                          to="/login"
                          onClick={toggleDrawer}
                          className="hover:text-primary bg-primary border border-primary text-white py-1 px-4 rounded-lg hover:bg-white transition-colors"
                        >
                          Login
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              </Drawer>
            </div>
          </div>
        </div>
      </Containar>
    </div>
  );
};

export default BottomHeader;

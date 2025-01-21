import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { AiOutlineRight, AiOutlineMenu } from "react-icons/ai";
import Containar from "../components/container/Containar";
// import component 👇
import Drawer from "react-modern-drawer";

//import styles 👇
import "react-modern-drawer/dist/index.css";
import { useEffect } from "react";
import api from "../components/axios/Axios";

const BlogLayout = () => {
  const [isOpen, setIsOpen] = useState(false); // State to control the drawer

  const location = useLocation(); // Get current route
  const pathname = location.pathname;
  const [blogTypes, setblogTypes] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const getblogTypes = async () => {
    try {
      const response = await api.get(`/blog-category`);
      setblogTypes(response?.data?.data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getblogTypes();
  }, []);


  // Get the current category from the pathname
  const currentCategoryId = pathname.split("/").pop();

  // Breadcrumb generation logic
  const generateBreadcrumbs = () => {
    const pathParts = pathname.split("/").filter((part) => part);
    const breadcrumbItems = [];

    pathParts.forEach((part, index) => {
      const path = `/${pathParts.slice(0, index + 1).join("/")}`;

      if (part === "blog") {
        breadcrumbItems.push(
          <Link
            key={index}
            to="/blog"
            className="text-gray-600 hover:text-semisecondary font-bold"
          >
            Blog
          </Link>
        );
      } else if (part === "category") {
        breadcrumbItems.push(
          <span key={index} className="text-gray-500 font-semibold">
            Category
          </span>
        );
      } else {
        // Check if the part is a category ID, and if so, replace it with the category name
        const category = blogTypes.find((type) => type._id === part);
        const displayText = category ? category.name : part;

        breadcrumbItems.push(
          <span key={index} className="text-gray-500 capitalize">
            {displayText}
          </span>
        );
      }

      // Add separator
      if (index < pathParts.length - 1) {
        breadcrumbItems.push(
          <AiOutlineRight
            key={`separator-${index}`}
            className="text-gray-400 mx-2"
          />
        );
      }
    });

    return breadcrumbItems;
  };

  return (
    <section className="all-blog-section relative font-merriweather bg-gray-50 pb-0 sm:pb-32">
      {/* Breadcrumb */}
      <div className="py-5 pl-4 xl:pl-[160px] bg-gray-100">
        <Containar>
          <nav className="flex   items-center text-sm sm:text-lg">
            <Link
              to="/"
              className="text-gray-600 hover:text-blue-600 font-bold"
            >
              Home
            </Link>
            <AiOutlineRight className="text-gray-400 mx-2" />
            {generateBreadcrumbs()}
          </nav>
        </Containar>
      </div>

      {/* Main Container */}
      <Containar className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Category Sidebar for Desktop */}
          <div className="col-span-1 hidden md:block">
            <div className="bg-white shadow-md rounded-lg pt-6 px-6 pb-8 sticky top-36">
              <h3 className="text-2xl font-bold mb-8 text-center">
                Categories
              </h3>
              <ul className="space-y-3">
                <li className="group capitalize">
                  <Link
                    to={`/blog`}
                    className={`flex items-center rounded-md justify-between px-4 text-gray-800 group-hover:text-white  group-hover:bg-primary  transition-all duration-300 ease-in-out  py-3 ${pathname =='/blog' && "bg-primary text-white font-bold"}`}
                  >
                    {/* {type?.name} */}All Blogs
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      <AiOutlineRight />
                    </span>
                  </Link>
                </li>
                {blogTypes.map((type, index) => (
                  <li key={type._id} className="group capitalize">
                    <Link
                      to={`/blog/category/${type._id}`}
                      className={`flex items-center justify-between px-4 text-gray-800 rounded-md group-hover:text-white  group-hover:bg-primary  transition-all duration-300 ease-in-out ${
                        currentCategoryId === `${type._id}`
                          ? "font-bold bg-primary text-white" // Active type styling
                          : blogTypes.length - 1 != index
                          ? ""
                          : ""
                      } py-3`}
                    >
                      {type?.name}
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        <AiOutlineRight />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Mobile Category Drawer */}
          <div className="md:hidden">
            <button
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md"
              onClick={() => setIsOpen(true)}
            >
              <AiOutlineMenu className="mr-2" />
              Categories
            </button>

            <Drawer
              open={isOpen}
              onClose={() => setIsOpen(false)}
              direction="right" // You can change this to "left", "top", or "bottom"
              duration={300}
            >
              <div className="bg-white w-64 h-full p-6 shadow-lg">
                <h3 className="text-2xl font-bold mb-6 text-center">
                  Categories
                </h3>
                <ul className="space-y-4">
                  {blogTypes?.map((category) => (
                    <li key={category._id} className="group">
                      <Link
                        to={`/blog/category/${category._id}`}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center justify-between text-gray-800 group-hover:text-blue-600 transition-all duration-300 ease-in-out ${
                          currentCategoryId === `${category.id}`
                            ? "font-bold text-blue-600"
                            : ""
                        }`}
                      >
                        {category.name}
                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                          <AiOutlineRight />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <button
                  className="mt-4 text-red-600 hover:text-red-800"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </button>
              </div>
            </Drawer>
          </div>

          {/* Main Content Area (Outlet) */}
          <div className="col-span-1 md:col-span-3">
            <Outlet />
          </div>
        </div>
      </Containar>
    </section>
  );
};

export default BlogLayout;

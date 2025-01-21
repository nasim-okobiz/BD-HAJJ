import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import api from "../axios/Axios";
import { Link, useLocation, useParams } from "react-router-dom";
import { API_BASE_URL } from "../axios/config";
import Loader from "../loader/Loader";

const PackageCategory = () => {
  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const { id } = useParams();

  const getPackages = async () => {
    try {
      const response = await api.get(`/package/pagination?packageRef=${id}`);
      setPackages(response?.data?.data?.result);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPackages();
  }, [id]);

  if (isLoading) {
    return (
      <Loader/>
    );
  }

  return (
    <>
      {packages.length > 0 ? (
        <div className="w-full p-4 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => {
              const validDate = pkg?.validDate;
              const isValid = validDate
                ? new Date(validDate) > Date.now()
                : false;
              return (
                <div
                  key={pkg._id}
                  className="border bg-white flex flex-col justify-between rounded-lg sm:p-6 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-in-out"
                >
                  <div>
                    <img
                      src={API_BASE_URL + pkg.photo}
                      alt={pkg.name}
                      className="w-full h-[180px] object-cover rounded-md mb-4"
                    />
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 text-semisecondary">
                      {pkg.name}
                    </h3>
                    <div className="flex gap-2 items-end ">
                      <p className="text-lg sm:text-xl font-bold text-semisecondary mb-2">
                        Tk.{" "}
                        {new Intl.NumberFormat("en-BD").format(pkg.mrpPrice)}
                      </p>
                      {pkg.discountPrice > 0 && (
                        <p className="text-base sm:text-base font-bold text-red-500 mb-2 line-through">
                          Tk. {new Intl.NumberFormat("en-BD").format(pkg.price)}
                        </p>
                      )}
                    </div>

                    <ul className="mb-4  text-gray-700">
                      {pkg?.packageIncludes
                        ?.slice(0, 4)
                        .map((feature, index) => (
                          <li key={index} className="relative pl-5">
                            {feature}
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 text-black">
                              <FaCheck />
                            </span>
                          </li>
                        ))}
                    </ul>
                  </div>
                  {pkg?.discountPrice > 0 ? (
                    <>
                      {isValid ? (
                        <>
                          {" "}
                          <Link
                            to={`/package/${pkg._id}`}
                            className=" w-full block text-center bg-semisecondary hover:text-semisecondary border border-semisecondary text-white py-2 px-4 rounded hover:bg-white font-bold transition-all ease-linear duration-200"
                          >
                            Place Order
                          </Link>
                        </>
                      ) : (
                        <>
                          <button
                            // to={`/package/${pkg._id}`}
                            disabled={true}
                            className=" w-full block text-center b  border border-red-600 text-red-600 py-2 px-4 rounded  font-bold transition-all ease-linear duration-200"
                          >
                            Package Expired
                          </button>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <Link
                        to={`/package/${pkg._id}`}
                        className=" w-full block text-center bg-semisecondary hover:text-semisecondary border border-semisecondary text-white py-2 px-4 rounded hover:bg-white font-bold transition-all ease-linear duration-200"
                      >
                        Place Order
                      </Link>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="h-screen flex justify-center items-center">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl text-gray-300">
            Package not available
          </h2>
        </div>
      )}
    </>
  );
};

export default PackageCategory;

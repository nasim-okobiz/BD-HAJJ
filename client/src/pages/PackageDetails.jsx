import React, { useState, useEffect } from "react";
import Containar from "../components/container/Containar";
import { Link, useLocation, useParams } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";
import btnshapeup from "../assets/add/masjid.png";
import btnshapedown from "../assets/add/masjidshape.png";
import api from "../components/axios/Axios";
import { API_BASE_URL } from "../components/axios/config";

const PackageDetails = () => {
  const [packages, setPackages] = useState(null); // Updated to handle null initially
  const [isLoading, setIsLoading] = useState(true);
  const [isAgreed, setIsAgreed] = useState(false);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [isExpanded, setIsExpanded] = useState(false);

  const getPackages = async () => {
    try {
      const response = await api.get(`/package/${id}`);
      setPackages(response?.data?.data);
    } catch (error) {
      setError("Failed to load package details. Please try again later.");
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPackages();
  }, [id]);

  const handleAgreement = () => {
    setIsAgreed(!isAgreed);
  };
  const termsAndConditions = packages?.termsAndConditions || "";

  // Split the text into a truncated part and a full part
  const truncatedText =
    termsAndConditions.length > 400
      ? termsAndConditions.substring(0, 400) + "..."
      : termsAndConditions;

  const validDate = packages?.validDate;
  const isValid = validDate ? new Date(validDate) > Date.now() : false;

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="font-merriweather">
      <div className="py-5 sm:pl-[140px] bg-gray-100 z-10">
        <Containar>
          <nav className="flex items-center space-x-2 text-gray-600 text-lg">
            <Link to="/" className="hover:text-semisecondary font-bold">
              Home
            </Link>
            <AiOutlineRight />
            <span>Package</span>
          </nav>
        </Containar>
      </div>

      <div className="pb-10 pt-6 md:pb-32 md:pt-12">
        {/* Main Package Details Section */}
        <section className="pb-5">
          <Containar className="">
            <div className="flex flex-wrap justify-between items-center gap-6">
              <div className="w-full md:w-[48%]">
                <img
                  className="h-[250px] sm:h-[420px] object-cover"
                  src={`${API_BASE_URL}${packages?.photo}`}
                  alt="Package"
                />
              </div>
              <div className="w-full md:w-[48%] flex flex-col justify-start text-center md:text-left">
                <h1 className="text-2xl lg:text-[30px] font-bold mb-4">
                  {packages?.name}
                </h1>
                <h2 className="text-xl lg:text-[20px] font-semibold mt-1">
                  {packages?.title}
                </h2>
                <div className="flex justify-center sm:justify-start gap-3.5 mt-7 mb-5">
                  <p className="text-3xl lg:text-[40px] font-semibold tex  text-semisecondary">
                    Tk. {packages?.mrpPrice}/-
                  </p>
                  {packages.discountPrice > 0 && (
                    <p className="text-[20px] self-end lg:text-[20px] font-semibold line-through text-red-500">
                      Tk. {packages?.price}/-
                    </p>
                  )}
                </div>

                <p
                  className="text-lg lg:text-[15px] mt-3"
                  dangerouslySetInnerHTML={{ __html: packages?.roomType }}
                ></p>
                <p className="font-semibold text-lg sm:text-[18px] mt-2">
                  Hotel distance
                </p>
                {packages?.hotalDistance?.map((distance, index) => (
                  <p key={index} className="text-lg sm:text-[18px] mt-2">
                    {distance}
                  </p>
                ))}
                {isValid && packages?.discountPrice > 0 && (
                  <div className="">
                    <h3 className=" py-3 bg-white  mt-2 inline-block text-gray-700 font-medium text-[20px]">
                      Discount End:{" "}
                      {packages?.validDate
                        ? new Date(packages.validDate).toLocaleDateString(
                            "en-GB",
                            { day: "2-digit", month: "long", year: "numeric" }
                          )
                        : "N/A"}
                    </h3>
                  </div>
                )}
              </div>
            </div>
          </Containar>
        </section>

        {/* Package Sub-Details Section */}
        <section className="mt-10">
          <Containar className="">
            <div className="flex flex-wrap gap-6 items-center">
              {/* Package Includes */}
              <div className="w-full md:w-1/2">
                <h2 className="text-2xl lg:text-[28px] font-bold">
                  Package Includes
                </h2>
                <ul className="list-disc pl-5 mt-3">
                  {packages?.packageIncludes?.map((item, index) => (
                    <li key={index} className="text-lg sm:text-[18px]">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                {/* Package Excludes */}
                <div className="w-full">
                  <h2 className="text-2xl sm:text-[32px] font-bold">
                    Package Excludes
                  </h2>
                  <ul className="list-disc pl-5 mt-3">
                    {packages?.packageExcludes?.map((item, index) => (
                      <li key={index} className="text-lg sm:text-[18px]">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Documents Required */}
                <div className="w-full  mt-5">
                  <h2 className="text-2xl sm:text-[32px] font-bold">
                    Documents Required
                  </h2>
                  <ul className="list-disc pl-5 mt-3">
                    {packages?.documentsRequired?.map((item, index) => (
                      <li key={index} className="text-lg sm:text-[18px]">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Containar>
        </section>

        {packages?.discountPrice > 0 ? (
          <>
            {isValid ? (
              <>
                <section className="single-pg-package-sub-details mt-12 tandc-page-mn pb-10">
                  <Containar>
                    <h2 className="text-2xl sm:text-[32px] font-bold mb-5">
                      Terms and Conditions
                    </h2>
                    <div
                      className="my-3 inner-div text-sm sm:text-lg"
                      dangerouslySetInnerHTML={{
                        __html: isExpanded ? termsAndConditions : truncatedText,
                      }}
                    />
                    <button
                      onClick={() => setIsExpanded((prev) => !prev)}
                      className="mt-3 text-semisecondary underline"
                    >
                      {isExpanded ? "Show Less" : "Show More"}
                    </button>
                  </Containar>
                </section>

                {/* Booking Section */}
                <section className="text-center mt-5">
                  <div className="flex justify-center items-center px-4">
                    <label
                      htmlFor="tandcAgree-book"
                      className="pl-3 text-lg sm:text-[20px] cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        id="tandcAgree-book"
                        value="1"
                        checked={isAgreed}
                        onChange={handleAgreement}
                        className="mr-2 mt-1"
                      />
                      I Agree to accept T & C of BD Umrah Hajj Kafela
                    </label>
                  </div>

                  {/* <div className="text-center md:text-left mt-10 sm:mt-28">
                    <div className="flex justify-center">
                      <div className="relative group cursor-pointer">
                        <img
                          className="w-[20px] sm:w-[60px] absolute group-hover:left-[70%] left-[10%] transition-all ease-in-out duration-300 -top-[40%] sm:-top-[80%]"
                          src={btnshapeup}
                          alt="Button Shape Up"
                        />
                        <img
                          className="w-[200px] md:w-[300px]"
                          src={btnshapedown}
                          alt="Button Shape Down"
                        />
                        <div className="absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 text-white text-sm sm:text-2xl font-semibold">
                          <Link
                            to={isAgreed ? `/booking/${id}` : "#"}
                            className={`button ${isAgreed ? "" : "opacity-50 cursor-not-allowed"
                              }`}
                          >
                            Book Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  <div className="mt-10 lg:mt-10">
                    <Link
                      to={isAgreed ? `/booking/${id}` : "#"}
                      className={`button ${
                        isAgreed ? "" : "opacity-50 cursor-not-allowed"
                      }`}
                    >
                      <button className="bg-primary text-white font-bold py-2 px-6 rounded transition-all duration-300 transform hover:scale-105 hover:shadow-md uppercase">
                        Book Now
                      </button>
                    </Link>
                  </div>
                </section>
              </>
            ) : (
              <>
                <div>
                  <Containar>
                    <div className="text-[20px] sm:text-[32px] py-6 sm:py-10 text-center mt-7 sm:mt-14 text-red-600">
                      <h2>Package Discount Validity Expired</h2>
                    </div>
                  </Containar>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            <section className="single-pg-package-sub-details mt-12 tandc-page-mn pb-10">
              <Containar>
                <h2 className="text-2xl sm:text-[32px] font-bold mb-5">
                  Terms and Conditions
                </h2>
                <div
                  className="my-3 inner-div text-sm sm:text-lg"
                  dangerouslySetInnerHTML={{
                    __html: isExpanded ? termsAndConditions : truncatedText,
                  }}
                />
                <button
                  onClick={() => setIsExpanded((prev) => !prev)}
                  className="mt-3 text-semisecondary underline"
                >
                  {isExpanded ? "Show Less" : "Show More"}
                </button>
              </Containar>
            </section>

            {/* Booking Section */}
            <section className="text-center mt-5">
              <div className="flex justify-center items-center px-4">
                <label
                  htmlFor="tandcAgree-book"
                  className="pl-3 text-lg sm:text-[20px] cursor-pointer"
                >
                  <input
                    type="checkbox"
                    id="tandcAgree-book"
                    value="1"
                    checked={isAgreed}
                    onChange={handleAgreement}
                    className="mr-2 mt-1"
                  />
                  I Agree to accept T & C of BD Umrah Hajj Kafela
                </label>
              </div>

              <div className="text-center md:text-left mt-10 sm:mt-28">
                <div className="flex justify-center">
                  <div className="relative group cursor-pointer">
                    <img
                      className="w-[20px] sm:w-[60px] absolute group-hover:left-[70%] left-[10%] transition-all ease-in-out duration-300 -top-[40%] sm:-top-[80%]"
                      src={btnshapeup}
                      alt="Button Shape Up"
                    />
                    <img
                      className="w-[200px] md:w-[300px]"
                      src={btnshapedown}
                      alt="Button Shape Down"
                    />
                    <div className="absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 text-white text-sm sm:text-2xl font-semibold">
                      <Link
                        to={isAgreed ? `/booking/${id}` : "#"}
                        className={`button ${
                          isAgreed ? "" : "opacity-50 cursor-not-allowed"
                        }`}
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default PackageDetails;

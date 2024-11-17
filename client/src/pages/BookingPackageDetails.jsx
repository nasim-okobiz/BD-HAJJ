import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import Containar from "../components/container/Containar";
import api from "../components/axios/Axios";
import { API_BASE_URL } from "../components/axios/config";
import { AiOutlineRight } from "react-icons/ai";
import PrintBookingDetails from "../components/booking/PrintBookingDetails";
import PrintPaymentDetails from "../components/booking/PrintPaymnetDetails";

const BookingPackageDetails = () => {
  const location = useLocation();
  const bookingId = location.pathname.split("/").pop();
  const [bookingData, setBookingData] = useState(null);
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await api.get(`/payment?bookingRef=${bookingId}`);
        if (response.data.statusCode === 200) {
          setPaymentData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching booking data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookingData();
  }, [bookingId]);
  useEffect(() => {
    const fetchBookingData = async () => {
      try {
        const response = await api.get(`/booking/${bookingId}`);
        if (response.data.statusCode === 200) {
          setBookingData(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching booking data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookingData();
  }, [bookingId]);

  // if (!bookingData) {
  //   return <div>Booking data not found.</div>;
  // }

  const validDate = bookingData?.packageRef?.validDate;
  const isValid = validDate ? new Date(validDate) > Date.now() : false;

  console.log(bookingData);

  return (
    <>
      <div className="py-5 sm:pl-[140px] bg-gray-50 z-10">
        <Containar>
          <nav className="flex items-center space-x-2 text-gray-600 text-lg">
            <Link to="/" className="hover:text-semisecondary font-bold">
              Home
            </Link>
            <AiOutlineRight />
            <Link
              to="/dashboard"
              className="hover:text-semisecondary font-bold"
            >
              Dashboard
            </Link>
            <AiOutlineRight />
            <span>Booking Package Details</span>
          </nav>
        </Containar>
      </div>

      <div className="pt-10 sm:pt-16 pb-20 bg-gray-100 font-philo">
        <Containar className="">
          <div className="flex flex-col md:flex-row mb-10 gap-4">
            {/* Package Details */}
            <div className="md:w-2/3 bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row pb-4 pt-4 md:mb-0">
              <div className="flex-shrink-0  md:h-auto md:w-80">
                <img
                  className="w-full h-[200px] object-cover pl-5"
                  src={`${API_BASE_URL}${bookingData?.packageRef?.photo}`}
                  alt="VIP Package"
                />
              </div>
              <div className="p-4 md:p-6 flex-1">
                <h2 className="font-bold text-xl md:text-2xl text-gray-800 mb-2">
                  {bookingData?.packageRef?.name}
                </h2>
                {bookingData?.packageRef?.hotalDistance.map((item, index) => (
                  <p
                    key={index}
                    className="text-gray-600 text-sm md:text-base mb-1"
                  >
                    {item}
                  </p>
                ))}

                {/* <p className="text-gray-600 text-sm md:text-base mb-1">
                2 min from Madinah (100 mtr)
              </p> */}
                <p
                  className="text-gray-600 text-sm md:text-base mb-1"
                  dangerouslySetInnerHTML={{
                    __html: bookingData?.packageRef?.roomType,
                  }}
                />

                <p className="font-semibold text-lg text-green-600 mt-2">
                  <span className="text-black">Package Price: </span>Tk.{" "}
                  {bookingData?.packageRef?.mrpPrice}{" "}
                  <span className="line-through text-sm text-gray-800">
                    {bookingData?.packageRef?.price}
                  </span>
                </p>
              </div>
            </div>

            {/* Booking Details */}
            <div className="md:w-1/3 bg-white shadow-lg rounded-lg p-4 md:p-6 relative">
              <div className="col-flex">
                <div><PrintBookingDetails bookingData={bookingData} /></div>
                <div><PrintPaymentDetails paymentData={paymentData}  /></div>
              </div>

              <h3 className="font-bold text-lg md:text-xl mb-2">
                Booking Details
              </h3>
              <p className="text-sm md:text-base mb-1">
                Booking Date:{" "}
                <span className="font-semibold">
                  {new Date(bookingData?.bookingDate).toLocaleDateString()}
                </span>
              </p>
              <p className="text-sm md:text-base mb-1">
                Total Person:{" "}
                <span className="font-semibold">
                  {bookingData?.totalPerson}{" "}
                </span>
              </p>
              <p className="text-sm md:text-base mb-1">
                Total Payment Required:{" "}
                <span className="font-semibold">
                  Tk. {bookingData?.totalPrice} /-
                </span>
              </p>
              <p className="text-sm md:text-base mb-1">
                Total Payment Done:{" "}
                <span className="font-semibold">
                  Tk. {bookingData?.totalPay} /-
                </span>
              </p>
              {bookingData?.totalDue > 0 ? (
                <p className="text-sm md:text-base">
                  Total Payment Due:{" "}
                  <span className="font-semibold text-red-600">
                    Tk. {bookingData?.totalDue} /-
                  </span>
                </p>
              ) : (
                <p className="text-sm md:text-base text-green-600 font-bold">
                  Payment Complete
                </p>
              )}
            </div>
          </div>

          {/* People Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {bookingData?.personRef?.map((person, index) => (
              <div
                key={person?._id}
                className="bg-white shadow-md rounded-lg py-8 flex flex-col items-center text-center"
              >
                {console.log(person)}
                {person?.name && person?.phone ? (
                  <div className="flex flex-wrap items-center gap-5">
                    <div className="w-28 h-28 ">
                      <img
                        className="w-full h-full object-cover rounded-full"
                        src={`${API_BASE_URL}${person?.passportPhoto}`}
                      />
                    </div>
                    <div className="text-left">
                      <p className="text-[26px] font-semibold mb-4">
                        {/* {person?.name} */}
                        Person {index + 1}
                      </p>
                      <Link
                        to={`/booking/person/view-edit/${person?._id}`}
                        className="bg-green-600 text-white py-2 px-4 rounded transition inline-block duration-200 "
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-[26px] font-semibold mb-4">
                      Person {index + 1}
                    </p>
                    <Link
                      to={`/booking/person/${person?._id}`}
                      className="bg-semisecondary text-white mt-2 py-2 px-4 inline-block rounded transition duration-200 hover:bg-blue-700"
                    >
                      Add Data
                    </Link>
                  </>
                )}
              </div>
            ))}
          </div>
          {
            // console.log(bookingData?.packageRef?.discountPrice)

            bookingData?.packageRef?.discountPrice > 0 ? (
              <>
                {isValid ? (
                  <>
                    {bookingData?.totalDue > 0 && (
                      <div className=" mt-10">
                        <Link
                          to={`/booking/payment/${bookingData?._id}`}
                          className="w-full block bg-semisecondary border border-semisecondary hover:border-semisecondary hover:text-semisecondary transition-all ease-linear duration-150 text-white py-3.5 rounded-lg text-center shadow-md hover:bg-white font-bold text-lg md:text-xl"
                        >
                          Make Payment
                        </Link>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div
                      class="p-6 mb-4 text-sm text-red-800 rounded-lg bg-white  shadow-lg mt-20 dark:text-red-400"
                      role="alert"
                    >
                      <span class="font-semibold text-[20px]">Discount Expired Alert!</span>
                    </div>
                  </>
                )}
              </>
            ) : (
              <>
                {bookingData?.totalDue > 0 && (
                  <div className=" mt-10">
                    <Link
                      to={`/booking/payment/${bookingData?._id}`}
                      className="w-full block bg-semisecondary border border-semisecondary hover:border-semisecondary hover:text-semisecondary transition-all ease-linear duration-150 text-white py-3.5 rounded-lg text-center shadow-md hover:bg-white font-bold text-lg md:text-xl"
                    >
                      Make Payment
                    </Link>
                  </div>
                )}
              </>
            )
          }
        </Containar>

        {/* Payment Button */}
      </div>
    </>
  );
};

export default BookingPackageDetails;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../axios/config";
import { useSelector } from "react-redux";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { accessToken, user } = useSelector((state) => state.auth);

  useEffect(() => {
    // Fetch bookings data from the API using axios
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/booking/user/${user?.id}`
        );
        setBookings(response?.data?.data);
        setLoading(false);
      } catch (err) {
        setError(err?.response?.data?.message || "Something went wrong!");
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user?.id]);



  // const validDate = bookingData?.packageRef?.validDate;
  // const isValid = validDate ? new Date(validDate) > Date.now() : false;

  if (loading) return <div className="text-center py-5">Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="py-5 md:py-28">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((booking) => {
          const validDate = booking?.packageRef?.validDate;
          const isValid = validDate ? new Date(validDate) > Date.now() : false;
          return (
            <div
              key={booking?._id}
              className="each-bk-db shadow-lg rounded-lg overflow-hidden"
            >
              <img
                src={`${API_BASE_URL}${booking?.packageRef?.photo}`}
                alt={booking?.packageRef?.title}
                className="w-full h-[200px] sm:h-[280px] object-cover"
              />
              <div className="p-3 sm:p-4 flex flex-col justify-between">
                <div>
                  <div className="booking-id text-base mb-3 mt-2 font-bold py-1 px-3 bg-semisecondary rounded-md text-white inline-block">
                    {booking?.bookingId}
                  </div>
                  <p className="font-bold text-lg sm:text-[20px] mt-1.5">
                    {booking?.packageRef?.name}
                  </p>
                  <p className="mt-2 text-sm sm:text-base">
                    Booking Date:{" "}
                    {new Date(booking?.bookingDate).toLocaleDateString()}
                  </p>
                  <p className="mt-1 text-sm sm:text-base">
                    Number Of Persons: {booking?.totalPerson}
                  </p>
                  <p className="mt-1 text-sm sm:text-base">
                    Total Payment Required:{" "}
                    {`TK. ${booking?.totalPrice?.toLocaleString()} /-`}
                  </p>
                  <p className="mt-1 text-sm sm:text-base">
                    Total Payment Done:{" "}
                    {`TK. ${booking?.totalPay?.toLocaleString()} /-`}
                  </p>
                  <p className="mt-1 text-sm sm:text-base">
                    Total Payment Due:{" "}
                    {`TK. ${booking?.totalDue?.toLocaleString()} /-`}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 mt-3">
                  <Link
                    to={`/dashboard/booking/${booking?._id}`}
                    className="bg-semisecondary text-white p-2 w-full text-center rounded hover:bg-white hover:text-semisecondary border border-semisecondary transition-all ease-linear duration-150"
                  >
                    View Details
                  </Link>

                  {booking?.packageRef?.discountPrice > 0 ? (
                    <>
                      {isValid && (
                        <>
                          {booking?.totalDue > 0 && (
                            <Link
                              to={`/booking/payment/${booking?._id}`}
                              className="bg-green-700 text-white p-2 w-full text-center rounded hover:bg-white hover:text-green-700 transition border border-green-700"
                            >
                              Make Payment
                            </Link>
                          )}
                        </>
                      ) }
                    </>
                  ) : (
                    <>
                      {booking?.totalDue > 0 && (
                        <Link
                          to={`/booking/payment/${booking?._id}`}
                          className="bg-green-700 text-white p-2 w-full text-center rounded hover:bg-white hover:text-green-700 transition border border-green-700"
                        >
                          Make Payment
                        </Link>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookingList;

import React, { useState, useEffect } from "react";
import { AiOutlineRight } from "react-icons/ai";
import { Link, useParams } from "react-router-dom";
import api from "../components/axios/Axios";
import Containar from "../components/container/Containar";
import { Bounce, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { IoCheckmarkCircleOutline } from "react-icons/io5";

const BookingPayment = () => {
  const [isFullPayment, setIsFullPayment] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [partialPayment, setPartialPayment] = useState("");
  const [bookingData, setBookingData] = useState(null);
  const { id } = useParams();
  const { accessToken } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await api.get(`/booking/${id}`);
        setBookingData(response.data.data);
      } catch (error) {
        console.error("Error fetching booking details:", error);
        toast.error("Failed to load booking details.");
      }
    };
    fetchBookingDetails();
  }, [id]);

  if (!bookingData) {
    return <div>Loading...</div>;
  }

  const { packageRef, totalPerson, totalPay, minBookingPrice, totalDue } =
    bookingData;
  const totalAmount = packageRef?.mrpPrice * totalPerson;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    let paymentAmount;
    if (isFullPayment) {
      paymentAmount = totalDue;
      toast.success(`Proceeding with full payment of Tk. ${paymentAmount}`);
    } else {
      paymentAmount = parseFloat(partialPayment);
      if (totalDue > minBookingPrice && paymentAmount < minBookingPrice) {
        toast.error(`Minimum Payment Tk. ${minBookingPrice}`);
        setBtnLoading(false);
        return;
      } else if (paymentAmount > totalDue) {
        toast.error(`Due Payment Tk. ${totalDue}`);
        setBtnLoading(false);
        return;
      } else {
        toast.success(
          `Proceeding with partial payment of Tk. ${paymentAmount || 0}`
        );
      }
    }

    try {
      const paymentData = {
        amount: paymentAmount,
        bookingRef: id,
      };

      const response = await api.post("/booking/payment", paymentData, {
        headers: {
          Authorization: accessToken,
        },
      });

      if (response.status === 201 && response.data.status === "success") {
        const paymentUrl = response.data.data.url;
        toast.success("Redirecting to payment gateway...");
        setTimeout(() => {
          window.location.href = paymentUrl;
        }, 1000);
      } else {
        toast.error("Failed to initiate payment. Please try again.");
      }
      // setBtnLoading(false);
    } catch (error) {
      console.error("Error submitting payment:", error);
      toast.error("Payment submission failed. Please try again.");
      setBtnLoading(false);
    }
  };

  return (
    <section className="booking-section font-merriweather">
      <div className="py-5 px-4 md:px-[140px] bg-gray-100 z-10">
        <Containar>
          <nav className="flex flex-wrap items-center space-x-2 text-gray-600 text-xs sm:text-base">
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
            <Link
              to={`/dashboard/booking/${id}`}
              className="hover:text-semisecondary font-bold"
            >
              {packageRef?.name || "Package Details"}
            </Link>
            <AiOutlineRight />
            <span>Payment Confirm</span>
          </nav>
        </Containar>
      </div>

      <Containar className="py-16 md:py-28">
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="booking-details">
              <h2 className="text-[24px] md:text-[28px] font-bold">
                {packageRef?.name} {packageRef?.title}
              </h2>
              <h3 className="text-[16px] md:text-[20px] font-semibold mt-2">
                {packageRef?.title}
              </h3>
              <div className="text-[16px] md:text-[18px] mt-7">
                {packageRef?.hotalDistance?.map((distance, index) => (
                  <p key={index} className="mt-2">
                    {distance}
                  </p>
                ))}
                <p
                  className="mt-2"
                  dangerouslySetInnerHTML={{
                    __html: `Room Type: ${packageRef?.roomType}`,
                  }}
                ></p>

                <p className="mt-2">Number of Bookings: {totalPerson}</p>
              </div>
            </div>
            {!totalDue < 1 ? (
              <div>
                <p className="total-amount-show text-lg font-medium">
                  Total Payable Amount TK. {packageRef?.mrpPrice} x{" "}
                  {totalPerson} = <b>Tk {totalAmount} /-</b>
                </p>
                <p className="text-md font-medium mt-2">
                  Amount Already Paid: Tk {totalPay} /-
                </p>
                <p className="text-md font-medium mt-2">
                  Due Amount: Tk {totalDue} /-
                </p>
                <p className="text-md font-medium mt-2">
                  Minimum Payment TK {minBookingPrice} /-
                </p>

                <form onSubmit={handleSubmit} className="mt-4">
                  <div className="flex items-center mt-6">
                    <input
                      type="checkbox"
                      id="fullPayment"
                      value="1"
                      name="wantToPayFull"
                      checked={isFullPayment}
                      onChange={() => setIsFullPayment(!isFullPayment)}
                      className="mr-2"
                    />
                    <label
                      htmlFor="fullPayment"
                      className="text-[16px] md:text-[18px] font-bold cursor-pointer"
                    >
                      Yes, I want to Pay Full Amount
                    </label>
                  </div>

                  <div className="form-group mt-5 text-[16px] md:text-[18px]">
                    <label htmlFor="partialPayment" className="mb-1.5 block">
                      No, I want To Pay Other Amount
                    </label>
                    <input
                      type="number"
                      id="partialPayment"
                      name="wantToPayPartial"
                      placeholder={
                        totalDue > minBookingPrice
                          ? `Minimum Payment TK. ${minBookingPrice}/-`
                          : `You can pay any amount up to Tk. ${totalDue}/-`
                      }
                      min={0}
                      disabled={isFullPayment}
                      value={partialPayment}
                      onChange={(e) => setPartialPayment(e.target.value)}
                      className="form-control mt-1.5 p-2 border rounded w-full"
                    />
                  </div>

                  {btnLoading ? (
                    <button
                      className="bg-gray-400 p-3 w-full flex items-center justify-center gap-x-2 "
                      disabled
                    >
                      <div className="flex gap-x-2 text-white font-bold">
                        <svg
                          className="w-5 h-5 mr-2 text-white animate-spin"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          ></path>
                        </svg>
                        Loading...
                      </div>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="bg-semisecondary text-white p-3 w-full mt-10 rounded hover:bg-white hover:text-semisecondary border border-semisecondary transition"
                    >
                      Proceed
                    </button>
                  )}
                </form>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <h3 className="text-[32px] text-green-700 flex items-center gap-2 font-semibold  ">
                  <IoCheckmarkCircleOutline className="text-[42px]" /> Payment
                  Complete
                </h3>
              </div>
            )}
          </div>
        </div>
      </Containar>
    </section>
  );
};

export default BookingPayment;

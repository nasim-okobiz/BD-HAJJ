import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Containar from "../components/container/Containar";
import { Link } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";
import api from "../components/axios/Axios";
import { API_BASE_URL } from "../components/axios/config";
import { useSelector } from "react-redux";
import { toast, Bounce } from "react-toastify";

const BookConfirm = () => {
  const [memberId, setMemberId] = useState("");
  const [numberOfPerson, setNumberOfPerson] = useState("");
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const { accessToken } = useSelector((state) => state.auth);

  const location = useLocation();
  const packageId = location.pathname.split("/").pop();
  const navigate = useNavigate();
  const role = useSelector((store)=> store?.auth?.user?.role)
  // if no role than naviagte login page will be displayed in the navigation 
  if (!role) {
    navigate('/login');
  }
  useEffect(() => {

    const fetchPackageData = async () => {
      try {
        const response = await api.get(`/package/${packageId}`);
        if (response.data.status === "success") {
          setPackageData(response.data.data);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPackageData();
  }, [packageId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(memberId){
      try {
        const response = await api.get(`/membership/find/${memberId}`);
      } catch (err) {
        toast.error("Invalid member ID", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        return;
      }
    }

    const formData = {
      packageRef: packageId,
      totalPerson: Number(numberOfPerson),
      ...(memberId && { memberId }),
    };

    try {
      const response = await api.post("/booking", formData, {
        headers: {
          Authorization: `${accessToken}`,
        },
      });
      if (response.data.status === "success") {
        setBookingSuccess("Booking successful!");
        setMemberId("");
        setNumberOfPerson("");
        toast.success("Booking successful!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        navigate(`/dashboard/booking/${response?.data?.data?._id}`);
      } else {
        setError("Booking failed. Please try again.");
        toast.error("Booking successful!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      setError(error);
    }
  };

  return (
    <section className="booking-section bg-gray-100 font-philo">
      <div className="py-5 px-4 md:px-[140px] bg-gray-50 z-10">
        <Containar>
          <nav className="flex flex-wrap items-center space-x-2 text-gray-600 text-xs sm:text-lg">
            <Link to="/" className="hover:text-semisecondary font-bold">
              Home
            </Link>
            <AiOutlineRight />
            <Link to="/packages" className="hover:text-semisecondary font-bold">
              Package
            </Link>
            <AiOutlineRight />
            <Link
              to={`/package/${packageId}`}
              className="hover:text-semisecondary font-bold"
            >
              {packageData?.name}
            </Link>
            <AiOutlineRight />
            <span>Booking Confirm</span>
          </nav>
        </Containar>
      </div>
      <Containar className="py-6 md:py-12">
        <div className="max-w-2xl mx-auto bg-white p-4 md:p-6 border rounded-lg shadow">
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <div className="booking-details text-center">
            <img
              className="w-full aspect-video object-cover"
              src={`${API_BASE_URL}${packageData?.photo}`}
              alt={packageData?.name}
            />
            <h1 className="text-2xl md:text-[28px] font-bold mt-4 md:mt-6 mb-2 md:mb-3 text-semisecondary">
              {packageData?.name}
            </h1>
            <h2 className="text-base md:text-lg font-bold mt-1 mb-3">
              {packageData?.title}
            </h2>
            {packageData?.hotalDistance.map((distance, index) => (
              <p key={index} className="text-sm md:text-[18px] mb-2">
                {distance}
              </p>
            ))}
            <p className="text-lg md:text-xl font-semibold">
              Package Price:{" "}
              <span className="text-semisecondary text-xl md:text-2xl">
                Tk. {packageData?.price}/-
              </span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6">
            <input
              type="hidden"
              name="_token"
              value="DwJqY04swzNUAJUQsaoQNeqMnmqRbWddw8YeppFK"
            />

            <div className="form-group mb-4">
              <label
                htmlFor="memberId"
                className="block text-gray-600 text-sm md:text-base"
              >
                Member ID (If Any) (Optional)
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded mt-1"
                placeholder="Member ID"
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
                name="memberId"
              />
            </div>

            <div className="form-group mb-4">
              <label
                htmlFor="numberOfPerson"
                className="block text-gray-600 text-sm md:text-base"
              >
                Booking for no of person
              </label>
              <select
                className="w-full border border-gray-300 p-2 rounded mt-1"
                value={numberOfPerson}
                onChange={(e) => setNumberOfPerson(e.target.value)}
                name="numberOfPerson"
                required
              >
                <option value="" disabled>
                  Booking for no of person
                </option>
                {[...Array(10).keys()].map((num) => (
                  <option key={num + 1} value={num + 1}>
                    {num + 1}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-semisecondary border border-semisecondary hover:bg-white transition-all ease-linear hover:text-semisecondary font-bold text-white p-3 rounded mt-3"
            >
              Proceed
            </button>

          </form>
        </div>
      </Containar>
    </section>
  );
};

export default BookConfirm;

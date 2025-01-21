import React, { useState, useRef } from "react";
import Containar from "../components/container/Containar";
import api from "../components/axios/Axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import nidFront from "../assets/person/NID_F.jpeg";
import nidBack from "../assets/person/NID_B.jpeg";
import passportFront from "../assets/person/Passport_F.jpeg";
import passportBack from "../assets/person/Passport_B.jpeg";
import person from "../assets/person/person.jpg";
const PersonBookingUpdate = () => {
  const [preview, setPreview] = useState({
    passportFront: passportFront,
    passportBack: passportBack,
    aadhaarFront: nidFront,
    aadhaarBack: nidBack,
    personFace: person,
  });

  const formRef = useRef(null); // Form reference
  const { id } = useParams();
  const navigate = useNavigate()
  const [buttonLoading, setButtonLoading] = useState(false);

  const handleImagePreview = (e, key) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview((prev) => ({ ...prev, [key]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current); // Use form reference directly
    setButtonLoading(true);
    try {
      const response = await api.put(`person/${id}`, formData);
      navigate(-1)
    } catch (error) {
      toast.error(error.response.data.message)
    } finally {
      setButtonLoading(false); // Set button loading back to false after request completes
    }
  };

  return (
    <section className="membership-form py-16 bg-gray-100 font-merriweather">
      <Containar>
        <div className="bg-white px-8 pt-10 pb-8 shadow-md">
          <div className="mb-10">
            <h3 className="text-center text-[28px] font-bold">
              Update Booking Details
            </h3>
          </div>
          <form ref={formRef} onSubmit={handleSubmit} className="rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div>
                <div className="mb-4">
                  <label className="block text-lg font-bold">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    className="form-input w-full py-2 px-4 outline-none border rounded-lg mt-1.5"
                    placeholder="Your Full Name"
                    name="name"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-lg font-bold">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-input w-full py-2 px-4 outline-none border rounded-lg mt-1.5"
                    placeholder="Enter email"
                    name="eamil"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-lg font-bold">
                    Phone Number
                  </label>
                  <input
                    type="number"
                    className="form-input w-full py-2 px-4 outline-none border rounded-lg mt-1.5"
                    placeholder="Enter Your Phone"
                    name="phone"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-lg font-bold">
                    Present Address
                  </label>
                  <input
                    type="text"
                    className="form-input w-full py-2 px-4 outline-none border rounded-lg mt-1.5"
                    placeholder="Enter Your Present Address"
                    name="presentAddress"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-lg font-bold">
                    Permanent Address
                  </label>
                  <input
                    type="text"
                    className="form-input w-full py-2 px-4 outline-none border rounded-lg mt-1.5"
                    placeholder="Enter Your Permanent Address"
                    name="permanentAddress"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-lg font-bold">
                    Post Code
                  </label>
                  <input
                    type="number"
                    className="form-input w-full py-2 px-4 outline-none border rounded-lg mt-1.5"
                    placeholder="Enter Your Post Code"
                    name="postCode"
                    required
                  />
                </div>
              </div>

              {/* Right Column */}
              <div>
                <div className="mb-4">
                  <label className="block text-lg font-bold">Division</label>
                  <input
                    type="text"
                    className="form-input w-full py-2 px-4 outline-none border rounded-lg mt-1.5"
                    placeholder="Division"
                    name="division"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-lg font-bold">District</label>
                  <input
                    type="text"
                    className="form-input w-full py-2 px-4 outline-none border rounded-lg mt-1.5"
                    placeholder="District"
                    name="district"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-lg font-bold">Upazila</label>
                  <input
                    type="text"
                    className="form-input w-full py-2 px-4 outline-none border rounded-lg mt-1.5"
                    placeholder="Upazila"
                    name="upazila"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-lg font-bold">Post Office</label>
                  <input
                    type="text"
                    className="form-input w-full py-2 px-4 outline-none border rounded-lg mt-1.5"
                    placeholder="Post Office"
                    name="postOffice"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-lg font-bold">Union</label>
                  <input
                    type="text"
                    className="form-input w-full py-2 px-4 outline-none border rounded-lg mt-1.5"
                    placeholder="Union"
                    name="union"
                  />
                </div>
              </div>
            </div>

            {/* File Uploads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* Update name attributes to match API requirements */}
              <div className="mb-4">
                <label className="block text-lg font-bold mb-1.5">
                  Upload Passport Front
                </label>
                <div>
                  <input
                    type="file"
                    className="form-input w-full border"
                    name="passportFront"
                    onChange={(e) => handleImagePreview(e, "passportFront")}
                  />
                  <img
                    className="w-full h-[360px] mt-3"
                    src={preview?.passportFront}
                    alt="Preview"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-lg font-bold mb-1.5">
                  Upload Passport Back
                </label>
                <div>
                  <input
                    type="file"
                    className="form-input w-full border"
                    name="passportBack"
                    onChange={(e) => handleImagePreview(e, "passportBack")}
                  />
                  <img
                    className="w-full h-[360px] mt-3"
                    src={preview.passportBack}
                    alt="Preview"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-lg font-bold mb-1.5">
                  NID Front
                </label>
                <div>
                  <input
                    type="file"
                    className="form-input w-full border"
                    name="nidFront"
                    onChange={(e) => handleImagePreview(e, "aadhaarFront")}
                  />
                  <img
                    className="w-full h-[360px] mt-3 "
                    src={preview.aadhaarFront}
                    alt="Preview"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-lg font-bold mb-1.5">
                  NID Back
                </label>
                <div>
                  <input
                    type="file"
                    className="form-input w-full border"
                    name="nidBack"
                    onChange={(e) => handleImagePreview(e, "aadhaarBack")}
                  />
                  <img
                    className="w-full h-[360px] mt-3 "
                    src={preview.aadhaarBack}
                    alt="Preview"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-lg font-bold mb-1.5">
                  Passport size Photo
                </label>
                <div>
                  <input
                    type="file"
                    className="form-input w-full border"
                    name="passportPhoto"
                    onChange={(e) => handleImagePreview(e, "personFace")}
                  />
                  <img
                    className="w-full h-[220px] mt-3 object-contain"
                    src={preview.personFace}
                    alt="Preview"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            {/* <button
              type="submit"
              className="bg-semisecondary text-white px-4 py-3 font-bold text-[22px] rounded-md hover:bg-white border border-semisecondary hover:text-semisecondary transition-all ease-linear duration-150 w-full mt-6"
            >
              Submit
            </button> */}
            <button
              type="submit"
              className={`w-full py-3 px-4 rounded-lg transition duration-300 ${buttonLoading ? "bg-gray-400 cursor-not-allowed" : "bg-semisecondary hover:bg-white hover:text-semisecondary border border-semisecondary text-white"
                }`}
              disabled={buttonLoading} // Disable button while loading
            >
              {buttonLoading ? "Submiting..." : "Submit"} {/* Show loading text if buttonLoading is true */}
            </button>
          </form>
        </div>
      </Containar>
    </section>
  );
};

export default PersonBookingUpdate;

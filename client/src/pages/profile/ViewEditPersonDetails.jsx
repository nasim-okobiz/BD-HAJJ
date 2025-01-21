import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Containar from "../../components/container/Containar";
import api from "../../components/axios/Axios";
import { API_BASE_URL } from "../../components/axios/config";
import { toast } from "react-toastify";
import nidFront from "../../assets/person/NID_F.jpeg";
import nidBack from "../../assets/person/NID_B.jpeg";
import passportFront from "../../assets/person/Passport_F.jpeg";
import passportBack from "../../assets/person/Passport_B.jpeg";
import person from "../../assets/person/person.jpg";
const ViewEditPersonDetails = () => {
  const [preview, setPreview] = useState({
    passportFront: passportFront,
    passportBack: passportBack,
    aadhaarFront: nidFront,
    aadhaarBack: nidBack,
    personFace: person,
  });

  const [persondata, setPersonData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const formRef = useRef(null);
  const [buttonLoading, setButtonLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/person/${id}`);
        setPersonData(response.data.data);

        setPreview((prev) => ({
          ...prev,
          passportFront: response.data.data.passportFront ? API_BASE_URL + response.data.data.passportFront : prev.passportFront,
          passportBack: response.data.data.passportBack ? API_BASE_URL + response.data.data.passportBack : prev.passportBack,
          nidFront: response.data.data.nidFront ? API_BASE_URL + response.data.data.nidFront : prev.aadhaarFront, // Corrected to nidFront
          nidBack: response?.data?.data?.nidBack ? API_BASE_URL + response?.data?.data?.nidBack : prev.aadhaarBack, // Corrected to nidBack
          passportPhoto: response.data.data.passportPhoto ? API_BASE_URL + response.data.data.passportPhoto : prev.personFace,
        }));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

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
    const formData = new FormData(formRef.current);
    setButtonLoading(true);
    try {
      // Update this line to change 'email' to 'eamil'
      const response = await api.put(`/person/${id}`, formData);
      navigate(-1); // Navigate back after successful update
    } catch (error) {
      toast.error(error.response.data.message)
      console.error("Error:", error.response ? error.response.data.message : error.message);
      setError("An error occurred while updating the details.");
    } finally {
      setButtonLoading(false); // Set button loading back to false after request completes
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="membership-form py-16 bg-gray-100 font-merriweather">
      <Containar>
        <div className="bg-white px-8 pt-10 pb-8 shadow-md">
          <div className="mb-10">
            <h3 className="text-center text-[28px] font-bold">Edit Booking Details</h3>
          </div>
          <form ref={formRef} onSubmit={handleSubmit} className="rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div>
                <div className="mb-4">
                  <label className="block text-lg font-bold">Your Full Name</label>
                  <input
                    type="text"
                    className="form-input w-full py-2 px-4 outline-none border rounded-lg mt-1.5"
                    placeholder="Your Full Name"
                    name="name"
                    defaultValue={persondata?.name || ""}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-lg font-bold">Email address</label>
                  <input
                    type="email"
                    className="form-input w-full py-2 px-4 outline-none border rounded-lg mt-1.5"
                    placeholder="Enter email"
                    name="eamil" // Changed 'email' to 'eamil'
                    defaultValue={persondata?.eamil || ""} // Changed 'email' to 'eamil'
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-lg font-bold">Phone Number</label>
                  <input
                    type="tel" // changed to 'tel' for better validation
                    className="form-input w-full py-2 px-4 outline-none border rounded-lg mt-1.5"
                    placeholder="Enter Your Phone"
                    name="phone"
                    defaultValue={persondata?.phone || ""}
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
                    defaultValue={persondata?.presentAddress || ""}
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
                    defaultValue={persondata?.permanentAddress || ""}
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
                    defaultValue={persondata?.postCode || ""}
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
                    defaultValue={persondata?.division || ""}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-lg font-bold">District</label>
                  <input
                    type="text"
                    className="form-input w-full py-2 px-4 outline-none border rounded-lg mt-1.5"
                    placeholder="District"
                    name="district"
                    defaultValue={persondata?.district || ""}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-lg font-bold">Upazila</label>
                  <input
                    type="text"
                    className="form-input w-full py-2 px-4 outline-none border rounded-lg mt-1.5"
                    placeholder="Upazila"
                    name="upazila"
                    defaultValue={persondata?.upazila || ""}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-lg font-bold">Post Office</label>
                  <input
                    type="text"
                    className="form-input w-full py-2 px-4 outline-none border rounded-lg mt-1.5"
                    placeholder="Post Office"
                    name="postOffice"
                    defaultValue={persondata?.postOffice || ""}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-lg font-bold">Union</label>
                  <input
                    type="text"
                    className="form-input w-full py-2 px-4 outline-none border rounded-lg mt-1.5"
                    placeholder="Union"
                    name="union"
                    defaultValue={persondata?.union || ""}
                  />
                </div>
              </div>
            </div>

            {/* File Uploads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="mb-4">
                <label className="block text-lg font-bold mb-1.5">Upload Passport Front</label>
                <div>
                  <input
                    type="file"
                    className="form-input w-full border"
                    name="passportFront"
                    onChange={(e) => handleImagePreview(e, "passportFront")}
                  />
                  <img
                    className="w-full h-[280px] mt-3 object-contain"
                    src={preview?.passportFront}
                    alt="Passport Front Preview"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-lg font-bold mb-1.5">Upload Passport Back</label>
                <div>
                  <input
                    type="file"
                    className="form-input w-full border"
                    name="passportBack"
                    onChange={(e) => handleImagePreview(e, "passportBack")}
                  />
                  <img
                    className="w-full h-[280px] mt-3 object-contain"
                    src={preview?.passportBack}
                    alt="Passport Back Preview"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-lg font-bold mb-1.5">NID Front</label>
                <div>
                  <input
                    type="file"
                    className="form-input w-full border"
                    name="nidFront"
                    onChange={(e) => handleImagePreview(e, "nidFront")}
                  />
                  <img
                    className="w-full h-[220px] mt-3 object-contain"
                    src={preview.nidFront}
                    alt="NID Front Preview"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-lg font-bold mb-1.5">NID Back</label>
                <div>
                  <input
                    type="file"
                    className="form-input w-full border"
                    name="nidBack"
                    onChange={(e) => handleImagePreview(e, "nidBack")}
                  />
                  <img
                    className="w-full h-[220px] mt-3 object-contain"
                    src={preview.nidBack}
                    alt="NID Back Preview"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-lg font-bold mb-1.5">Your Face Photo</label>
                <div>
                  <input
                    type="file"
                    className="form-input w-full border"
                    name="passportPhoto"
                    onChange={(e) => handleImagePreview(e, "passportPhoto")}
                  />
                  <img
                    className="w-full h-[220px] mt-3 object-contain"
                    src={preview.passportPhoto}
                    alt="Face Photo Preview"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6">
              {/* <button
                type="submit"
                className="w-full bg-semisecondary hover:bg-white hover:text-semisecondary border border-semisecondary text-white py-3 px-4 rounded-lg transition duration-300"
              >
                Update
              </button> */}

              <button
                type="submit"
                className={`w-full py-3 px-4 rounded-lg transition duration-300 ${buttonLoading ? "bg-gray-400 cursor-not-allowed" : "bg-semisecondary hover:bg-white hover:text-semisecondary border border-semisecondary text-white"
                  }`}
                disabled={buttonLoading} // Disable button while loading
              >
                {buttonLoading ? "Updating..." : "Update"} {/* Show loading text if buttonLoading is true */}
              </button>
            </div>
          </form>
        </div>
      </Containar>
    </section>
  );
};

export default ViewEditPersonDetails;

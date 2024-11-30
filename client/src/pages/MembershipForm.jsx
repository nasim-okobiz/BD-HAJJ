import React, { useState } from "react";
import Containar from "../components/container/Containar";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";
import api from "../components/axios/Axios"; // Ensure the axios instance is imported
import { useDispatch, useSelector } from "react-redux";
import { toast, Bounce } from 'react-toastify';
import person_dummy from "../assets/membership/person-dummy.jpg";
import { useEffect } from "react";

const MembershipForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    eamil: "",
    phone: "",
    occupation: "",
    postOffice: "",
    upazila: "",
    district: "",
    division: "",
    memberPin: "",
    union: "",
    personCategory: "",
    photo: "",
    nidFront: "",
    nidBack: "",
    memberTandC: false, // Initialize checkbox state
  });
  const [joinUs, setJoinUs] = useState()
  // Retrieve user and accessToken from Redux state
  const [isLoading, setIsLoading] = useState(false);
  const role = useSelector((store) => store?.auth?.user?.role);
  const { accessToken } = useSelector((state) => state.auth);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImagePreview = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      document.getElementById(`Preview${e.target.name}`).src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  // /join-us api where to get Payable
  const handleJoinUs = async () => {
    const response = await api.get("/join-us",);
    // set data setJoinUs satate fild
    setJoinUs(response?.data?.data[0]);
  };

  useEffect(() => {
    handleJoinUs();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Form Data:", formData); // Log form data for debugging

    const formDataToSend = new FormData();
    // Append form data
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      if (!accessToken) {
        toast.error('Please Login First', {
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
        navigate('/login')
        setIsLoading(false);
        return;
      }
      const response = await api.post("/membership", formDataToSend, {
        headers: {
          "Authorization": `${accessToken}`,
        },
      });
      console.log("response ----:", response);
      console.log("Success:", response?.data?.data?.url);

      window.location.replace(response?.data?.data?.url)
      toast.success('Membership Successful', {
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
      //  window.location.replace(location)

      // dispatch(clearCredentials())
      // dispatch(setCredentials({
      //   accessToken: response.data.data.accessToken,
      //   user: response.data.data.user
      // }));
      // Handle success (e.g., display a success message or redirect)
    } catch (error) {
      // console.error("Error submitting the form:", error);
      // if (error.response) {
      //   console.error("API Response:", error.response.data); // Log API response
      // }
      toast.error(error.response.data.message, {
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
      // Handle error (e.g., display an error message)
    } finally {
      setIsLoading(false); // Stop loading after response
    }
  };

  return (
    <div className="font-merriweather">
      <div className="py-5 pl-4 md:pl-[140px] bg-gray-100 z-10">
        <Containar>
          <nav className="flex items-center space-x-2 text-gray-600 text-xs sm:text-lg">
            <Link to="/" className="hover:text-semisecondary font-bold">
              Home
            </Link>
            <AiOutlineRight />
            <Link to="/membership" className="hover:text-semisecondary font-bold">
              Membership
            </Link>
            <AiOutlineRight />
            <span>Membership Form</span>
          </nav>
        </Containar>
      </div>
      <div className="pt-8 md:pt-16 pb-16 md:pb-36">
        <Containar>
          <form onSubmit={handleSubmit} className="w-full mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left Side */}
              <div>
                <div className="mb-4">
                  <label className="block text-lg mb-2">Your Full Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input w-full border border-gray-300 p-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-lg mb-2">Email address</label>
                  <input
                    type="email"
                    name="eamil"
                    placeholder="Enter email"
                    value={formData.eamil}
                    onChange={handleChange}
                    className="form-input w-full border border-gray-300 p-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-lg mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter Your Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input w-full border border-gray-300 p-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-lg mb-2">Occupation</label>
                  <input
                    type="text"
                    name="occupation"
                    placeholder="Occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    className="form-input w-full border border-gray-300 p-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-lg mb-2">Photo</label>
                  <div className="flex items-center">
                    <input
                      type="file"
                      name="photo"
                      onChange={(e) => {
                        handleChange(e);
                        handleImagePreview(e);
                      }}
                      className="form-input w-full border border-gray-300 p-2"
                      required
                    />
                    <img
                      id="Previewphoto"
                      src={person_dummy}
                      alt="Preview"
                      className="ml-4 w-[44px] h-[44px] object-cover"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-lg mb-2">Photo</label>
                  <div className="flex items-center">
                    <input
                      type="file"
                      name="nidFront"
                      onChange={(e) => {
                        handleChange(e);
                        handleImagePreview(e);
                      }}
                      className="form-input w-full border border-gray-300 p-2"
                      required
                    />
                    <img
                      id="PreviewnidFront"
                      src={person_dummy}
                      alt="Preview"
                      className="ml-4 w-[44px] h-[44px] object-cover"
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-lg mb-2">Photo</label>
                  <div className="flex items-center">
                    <input
                      type="file"
                      name="nidBack"
                      onChange={(e) => {
                        handleChange(e);
                        handleImagePreview(e);
                      }}
                      className="form-input w-full border border-gray-300 p-2"
                      required
                    />
                    <img
                      id="PreviewnidBack"
                      src={person_dummy}
                      alt="Preview"
                      className="ml-4 w-[44px] h-[44px] object-cover"
                    />
                  </div>
                </div>
                {/* <FileUploadField label="Photo" name="photo" handleChange={handleChange} previewId="Previewphoto" /> */}
                {/* <FileUploadField label="NID Front" name="nidFront" handleChange={handleChange} previewId="PreviewnidFront" />
                <FileUploadField label="NID Back" name="nidBack" handleChange={handleChange} previewId="PreviewnidBack" /> */}

              </div>

              {/* Right Side */}
              <div>
                <div className="mb-4">
                  <label className="block text-lg mb-2">Union</label>
                  <input
                    type="text"
                    name="union"
                    placeholder="Union"
                    value={formData.union}
                    onChange={handleChange}
                    className="form-input w-full border border-gray-300 p-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-lg mb-2">Post Office</label>
                  <input
                    type="text"
                    name="postOffice"
                    placeholder="Post Office"
                    value={formData.postOffice}
                    onChange={handleChange}
                    className="form-input w-full border border-gray-300 p-2"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-lg mb-2">Upazila</label>
                  <input
                    type="text"
                    name="upazila"
                    placeholder="Upazila"
                    value={formData.upazila}
                    onChange={handleChange}
                    className="form-input w-full border border-gray-300 p-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-lg mb-2">District</label>
                  <input
                    type="text"
                    name="district"
                    placeholder="District"
                    value={formData.district}
                    onChange={handleChange}
                    className="form-input w-full border border-gray-300 p-2"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-lg mb-2">Division</label>
                  <input
                    type="text"
                    name="division"
                    placeholder="Division"
                    value={formData.division}
                    onChange={handleChange}
                    className="form-input w-full border border-gray-300 p-2"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mb-4 mt-3">
              <select
                name="personCategory"
                value={formData.personCategory}
                onChange={handleChange}
                className="form-select w-full border border-gray-300 p-3"
                required
              >
                <option value="" disabled>
                  Select Person Category
                </option>
                <option value="alem">Alem</option>
                <option value="mufti">Mufti</option>
                <option value="moulana">Moulana</option>
                <option value="hafez">Hafez</option>
                <option value="imam">Imam</option>
                <option value="teacher">Teacher</option>
                <option value="general">General</option>
              </select>
            </div>

            <div className="mb-4 cursor-pointer">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="memberTandC"
                  checked={formData.memberTandC}
                  onChange={handleChange}
                  className="form-checkbox mr-2"
                  required
                />
                I agree to the Terms and Conditions
              </label>
            </div>
            <div className="final-order-review text-center py-8 px-4 bg-white shadow-md rounded-md">
              <h2 className="text-2xl font-bold mb-4">Payment For Membership</h2>
              <h3 className="text-lg font-medium mb-2">
                Your Account Status Is <span className="text-gray-500">Silver</span>
              </h3>
              <p className="text-xl font-bold mb-6">
                Total Payable Amount: <span className="text-green-600">₹ ${joinUs?.amount}/-</span>
              </p>

            </div>
            {/* <button
              type="submit"
              className="bg-semisecondary text-[24px] mt-14 text-white w-full py-2 font-bold hover:border hover:border-semisecondary border border-semisecondary hover:bg-white hover:text-semisecondary transition-all ease-linear duration-150 rounded"
            >
              Submit
            </button> */}
            <button
              type="submit"
              className={`bg-semisecondary text-[24px] mt-14 text-white w-full py-2 font-bold hover:border hover:border-semisecondary border border-semisecondary hover:bg-white hover:text-semisecondary transition-all ease-linear duration-150 rounded ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </Containar>
      </div>
    </div>
  );
};

export default MembershipForm;

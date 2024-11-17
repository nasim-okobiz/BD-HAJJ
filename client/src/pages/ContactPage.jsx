import React, { useState, useEffect } from "react";
import Containar from "../components/container/Containar";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";
import bgshape from "../assets/pattern/pattern.jpg";
import api from "../components/axios/Axios";
import { Bounce, toast } from "react-toastify";

const ContactPage = () => {
  const [contactInfos, setContactInfos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    emailId: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Phone number validation (11 digits)
    // if (!/^\d{11}$/.test(formData.phoneNumber)) {
    //   alert("Phone number must be exactly 11 digits.");
    //   return;
    // }

    const dataToSend = {
      name: formData.fullName,
      phone: formData.phoneNumber,
      email: formData.emailId, // optional
      subject: formData.subject,
      massage: formData.message,
    };

    try {
      setIsLoading(true);
      const response = await api.post(`/contact-us`, dataToSend);
      console.log("Form submitted successfully:", response.data);
      toast.success("Form submitted successfully", {
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

      // Clear form after submission
      setFormData({
        fullName: "",
        phoneNumber: "",
        emailId: "",
        subject: "",
        message: "",
      });
      setIsLoading(false);
    } catch (error) {
      console.error("Error submitting form:", error.response.data.message);
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

      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const getContactInfos = async () => {
    try {
      const response = await api.get(`/contact-info`);
      setContactInfos(response?.data?.data[0]);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getContactInfos();
  }, []);

  return (
    <div className="relative">
      <div className="absolute -z-10 left-0 top-0 w-full h-full opacity-20">
        <img
          className="w-full h-full object-cover"
          src={bgshape}
          alt="Background"
        />
      </div>
      <div className="py-5 pl-4 md:pl-[140px] bg-gray-100 z-10">
        <Containar>
          <nav className="flex items-center space-x-2 text-gray-600 text-lg">
            <Link to="/" className="hover:text-semisecondary font-bold">
              Home
            </Link>
            <AiOutlineRight />
            <span>Contact Us</span>
          </nav>
        </Containar>
      </div>
      <div className="pb-32 pt-16 font-philo">
        <Containar>
          <h1 className="text-left text text-[36px] md:text-[44px] font-bold mb-4">
            BD Umrah Hajj Kafela
          </h1>
          <div className="main-heading mb-4">
            <h2 className="text-[28px] md:text-[32px] font-semibold">
              Contact With Us
            </h2>
            <p className="text-gray-600 text-[16px] md:text-[20px]">
              We are happy to help you
            </p>
          </div>
          <div className="flex flex-col md:flex-row mt-10 gap-5 md:gap-12">
            <div className="w-full md:w-1/2  mb-8 md:mb-0">
              <form
                className="contact-sp-from"
                // action="https://mynilnod.com/contact-us-submit"
                method="post"
                onSubmit={handleSubmit}
              >
                <input
                  type="hidden"
                  name="_token"
                  value="vGTUBJhhZ9IWkewN7REodZFY2C3lNR4iKDeNIs4h"
                />
                <div className="form-group mb-4">
                  <label
                    htmlFor="form_name"
                    className="block mb-2 font-semibold"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    id="form_name"
                    placeholder="Please enter your full name *"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="form-group mb-4">
                  <label
                    htmlFor="phoneNumber"
                    className="block mb-2 font-semibold"
                  >
                    Phone Number
                  </label>
                  <input
                    type="number"
                    name="phoneNumber"
                    placeholder="Enter your phone number *"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="emailId" className="block mb-2 font-semibold">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    name="emailId"
                    placeholder="Please enter your email"
                    value={formData.emailId}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="subject" className="block mb-2 font-semibold">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Write your subject *"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="form-group mb-4">
                  <label htmlFor="message" className="block mb-2 font-semibold">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    placeholder="Write your message here."
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    rows="5"
                    required
                  ></textarea>
                </div>
                {isLoading ? (
                  <button
                    className="relative flex w-full items-center justify-center px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
                    disabled
                  >
                    <svg
                      className="w-5 h-5 mr-2 animate-spin text-white"
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
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291a7.962 7.962 0 01-2-5.291H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Loading...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="w-full bg-semisecondary text-white py-3 rounded-md hover:bg-white border border-semisecondary transition-all ease-linear duration-100 hover:text-semisecondary"
                  >
                    Send Message
                  </button>
                )}
              </form>
            </div>
            <div className="w-full md:w-1/2 pl-4">
              <div className="contact-info mb-8">
                <h3 className="text-[28px] md:text-[32px] font-semibold mb-4 text-gray-700">
                  Contact Info
                </h3>
                <p className="mb-2">
                  <i className="fas fa-user mr-2 text-gray-500"></i>
                  {contactInfos?.agencyName}
                </p>
                <p className="mb-2">
                  <i className="fas fa-location-dot mr-2 text-gray-500"></i>
                  {contactInfos?.address?.map((ads) => (
                    <p>{ads}</p>
                  ))}
                </p>
                <p className="mb-2">
                  <i className="fas fa-envelope mr-2 text-gray-500"></i>
                  <a
                    href="mailto:info@bdhajj.com"
                    className="text-blue-500 hover:underline"
                  >
                    {contactInfos?.email?.map((mail) => (
                      <span className="pr-5">{mail}</span>
                    ))}
                  </a>
                </p>
                <p className="mb-2">
                  <i className="fas fa-phone mr-2 text-gray-500"></i>
                  <a
                    href="tel:+918585802821"
                    className="text-blue-500 hover:underline"
                  >
                    {contactInfos?.phone?.map((number) => (
                      <span className="pr-5">{number}</span>
                    ))}
                  </a>
                </p>
                <p className="mb-2">
                  <i className="fab fa-whatsapp mr-2 text-gray-500"></i>
                  <a
                    href="https://wa.me/+918585802821"
                    className="text-blue-500 hover:underline"
                  >
                    {contactInfos?.whatsapp?.map((number) => (
                      <span className="pr-5">{number}</span>
                    ))}
                  </a>
                </p>
              </div>

              {/* Google Maps */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.9616876760925!2d90.3633727!3d23.8281708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ5JzQxLjQiTiA5MMKwMjEnNDguMSJF!5e0!3m2!1sen!2sin!4v1713928171417!5m2!1sen!2sin"
                width="100%"
                height="270"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location at 23°49'41.4'N, 90°21'48.1'E"
              />

            </div>
          </div>
        </Containar>
      </div>
    </div>
  );
};

export default ContactPage;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Add useNavigate for redirection after success
import api from "../components/axios/Axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const RegistrationCard = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });
  const [apiError, setApiError] = useState(""); // Handle API-level errors
  const navigate = useNavigate();

  // Retrieve user and accessToken from Redux state
  const { user, accessToken } = useSelector((state) => state.auth);

  // Redirect to home if user is already logged in
  useEffect(() => {
    if (user && accessToken) {
      navigate("/"); // Redirect to the home page
    }
  }, [user, accessToken, navigate]);

  // Notify function
  const notify = (message, type) => {
    toast[type](message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", phone: "", email: "", password: "" };

    // Validate Name
    if (!name) {
      newErrors.name = "Name is required";
      isValid = false;
    }

    // Validate Phone Number
    const phoneRegex = /^\d{11}$/; // Regex for 11-digit phone number
    if (!phone) {
      newErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!phoneRegex.test(phone)) {
      newErrors.phone = "Please enter a valid 11-digit phone number";
      isValid = false;
    }

    // Validate Password
    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      const registrationData = {
        name,
        phone,
        email,
        password,
      };

      try {
        // Make the API call
        const response = await api.post("/auth/singup", registrationData);
        console.log(response);

        if (
          response.data.statusCode === 200 &&
          response.data.status === "success"
        ) {
          // Handle success
          notify("Registration successful. Redirecting to login...", "success");
          setApiError("");
          setName("");
          setPhone("");
          setEmail("");
          setPassword("");

          // Redirect to login after 2 seconds
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        } else {
          // Handle any unexpected response
          notify(
            response.data.message || "Registration failed. Please try again.",
            "error"
          );
          setApiError(
            response.data.message || "Registration failed. Please try again."
          );
        }
      } catch (error) {
        console.log(error);

        // Handle API error
        const errorMessage =
          error.response?.data?.message ||
          "Something went wrong. Please try again.";
        notify(errorMessage, "error");
        setApiError(errorMessage);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-md mb-32">
        <h2 className="text-2xl font-bold text-center">Registration</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-3"
              >
                Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={`block w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Your Name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-3"
              >
                Phone Number <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className={`block w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="01734567896"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-3"
              >
                Email (optional)
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-3"
              >
                Password <span className="text-red-600">*</span>
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`block w-full p-2 mt-1 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="********"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
          </div>

          {/* Success and Error messages */}
          <button
            type="submit"
            className="w-full py-3 mt-4 transition-all ease-linear duration-200 text-white bg-primary rounded-md hover:bg-transparent border hover:text-primary font-semibold hover:border-primary "
          >
            Register
          </button>
        </form>
        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link className="text-semisecondary font-semibold" to="/login">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationCard;

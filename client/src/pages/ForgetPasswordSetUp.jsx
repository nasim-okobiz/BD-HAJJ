import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../components/axios/Axios";

const ForgetPasswordSetUpCard = () => {
  const [step, setStep] = useState(1); // Step 1: Enter email, Step 2: Verify OTP and reset password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

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

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      notify("Email is required", "error");
      return false;
    } else if (!emailRegex.test(email)) {
      notify("Please enter a valid email", "error");
      return false;
    }
    return true;
  };

  const validatePasswordForm = () => {
    if (!otp || otp.length !== 4) {
      notify("Please enter a valid 4-digit OTP", "error");
      return false;
    }
    if (!password || password.length < 6) {
      notify("Password must be at least 6 characters", "error");
      return false;
    }
    return true;
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    if (validateEmail()) {
      setLoading(true);
      try {
        const response = await api.post("/auth/forget-password", { email });
        notify(`${response?.data?.message}`, "success");
        setStep(2); // Move to OTP verification step
      } catch (error) {
        notify(`${error?.response?.data?.message || "Failed to send OTP"}`, "error");
      } finally {
        setLoading(false);
      }
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (validatePasswordForm()) {
      setLoading(true);
      try {
        const response = await api.post("/auth/forget-password/otp-verification", {
          email,
          otp,
          password,
        });
        notify(`${response?.data?.message}`, "success");
        navigate("/login"); // Redirect to login after success
      } catch (error) {
        notify(`${error?.response?.data?.message || "Failed to reset password"}`, "error");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold text-center">Forget Password</h2>
            <form onSubmit={handleEmailSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="block w-full p-2 mt-1 border rounded-md focus:outline-none border-gray-300 focus:ring-blue-500"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 mt-6 text-white bg-primary rounded-md hover:bg-transparent border hover:text-primary font-semibold hover:border-primary transition-all ease-linear duration-200"
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-2xl font-bold text-center">Reset Password</h2>
            <form onSubmit={handlePasswordReset}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                    OTP
                  </label>
                  <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={4}
                    required
                    className="block w-full p-2 mt-1 border rounded-md focus:outline-none border-gray-300 focus:ring-blue-500"
                    placeholder="Enter 4-digit OTP"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block w-full p-2 mt-1 border rounded-md focus:outline-none border-gray-300 focus:ring-blue-500"
                    placeholder="Enter new password"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 mt-6 text-white bg-primary rounded-md hover:bg-transparent border hover:text-primary font-semibold hover:border-primary transition-all ease-linear duration-200"
              >
                {loading ? "Resetting Password..." : "Reset Password"}
              </button>
            </form>
          </>
        )}

        <p className="text-sm text-center">
          Remember your password?{" "}
          <Link className="text-primary font-semibold" to="/login">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgetPasswordSetUpCard;

import React, { useState, useEffect } from "react";
import Navbar from "../components/shared/navbar/Navbar";
import Footer from "../components/shared/footer/Footer";
import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/shared/scrolltotop/ScrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SocialMediaIcons from "../components/Social/SocialMediaIcons";

const RootLayout = () => {
  return (
    <div className="scroll-smooth">
      <ToastContainer
        position="top-right"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ zIndex: 9999999 }}
      />
      <ScrollToTop />
      <Navbar />
      <Outlet />
      <Footer />
      <SocialMediaIcons />
    </div>
  );
};

export default RootLayout;

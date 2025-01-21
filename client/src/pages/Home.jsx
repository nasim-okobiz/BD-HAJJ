import React, { useEffect, useState } from "react";
import Banner from "../components/home/Banner";
import AboutHome from "../components/home/AboutHome";
import HomeMember from "../components/home/HomeMember";
import MiddleAdsBanner from "../components/home/MiddleAdsBanner";
import Package from "../components/home/Package";
import UmrahPackage from "../components/home/UmrahPackage";
import VisaPackage from "../components/home/VisaPackage";
import Features from "../components/home/Feature";
import MembershipHome from "../components/home/MembershipHome";
import HajjPackage from "../components/home/HajjPackage";
import TourPackage from "../components/home/TourPackage";
import GallerySection from "../components/home/GallerySection";
import Loader from "../components/loader/Loader";

const Home = () => {

  return (
    <>
      <Banner />
      <UmrahPackage />
      <HajjPackage />
      <VisaPackage />
      <TourPackage />
      <AboutHome />
      <HomeMember />
      {/* <GallerySection /> */}
      <MembershipHome />
    </>
  );
};

export default Home;

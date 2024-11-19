import React, { useState, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import RootLayout from "./Layouts/RootLayout";
// import About from "./pages/About";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import GalleryPage from "./pages/GalleryPage";
import AboutPage from "./pages/AboutPage";
import FAQPage from "./pages/FAQPage";
import ContactPage from "./pages/ContactPage";
import BlogPage from "./pages/BlogPage";
import BlogLayout from "./Layouts/BlogLayout";
import BlogCategory from "./components/category/BlogCategory";
import MembershipHome from "./components/home/MembershipHome";
import MembershipPage from "./pages/MembershipPage";
import MembershipForm from "./pages/MembershipForm";
import SingeBlogPage from "./pages/SingeBlogPage";
import PackageLayout from "./Layouts/PackageLayout";
import AllPackage from "./components/package/AllPackage";
import PackageCategory from "./components/package/PackageCategory";
import PackageDetails from "./pages/PackageDetails";
import LoginCard from "./pages/LoginCard";
import c from "./pages/RegistrationCard";
import Dashboard from "./pages/Dashboard";
import BookingPackageDetails from "./pages/BookingPackageDetails";
import BookConfirm from "./pages/BookConfirm";

import PersonBookingUpdate from "./pages/PersonBookingUpdate.jsx";

import FailurePage from "./pages/membershipFailAndScucces/FailurePage";
import SuccessPage from "./pages/membershipFailAndScucces/SuccessPage";

import BookingPayment from "./pages/BookingPayment";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailure from "./pages/PaymentFailure";
import NewBooking from "./agentProfile/NewBooking";

import MemberDetails from "./pages/memberDetails.jsx";
import GroupBooking from "./agentProfile/GroupBooking.jsx";
import Profile from "./pages/profile/Profile.jsx";

import PrivacyPolicy from "./pages/footer/PrivacyPolicy.jsx";
import RefundPolicy from "./pages/footer/RefundPolicy.jsx";

import RegistrationCard from "./pages/RegistrationCard";
import ViewEditPersonDetails from "./pages/profile/ViewEditPersonDetails.jsx";
import TermsAndConditions from "./pages/footer/TermsAndConditions.jsx";
import ForgetPasswordSetUpCard from "./pages/ForgetPasswordSetUp.jsx";
import Loader from "./components/loader/Loader"; // Assuming this is the correct import

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate a loading delay
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 2000);
  //   return () => clearTimeout(timer); // Clean up the timer when component unmounts
  // }, []);

  // if (isLoading) {
  //   return (
  //     <div className="h-screen flex justify-center items-center">
  //       <Loader />
  //     </div>
  //   );
  // }

  // Define your routes
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/our-gallery" element={<GalleryPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/about-us" element={<AboutPage />} />
        <Route path="/membership" element={<MembershipPage />} />
        <Route path="/membership/details" element={<MemberDetails />} />
        <Route path="/login" element={<LoginCard />} />
        <Route path="/registration" element={<RegistrationCard />} />
        <Route path="/forget-password" element={<ForgetPasswordSetUpCard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile/:id" element={<Profile />}>
          <Route index element={<NewBooking />} />
          <Route
            path=":packageid/membership/:memberid"
            element={<GroupBooking />}
          />
        </Route>
        <Route path="/booking/:id" element={<BookConfirm />} />
        <Route path="/booking/person/:id" element={<PersonBookingUpdate />} />
        <Route
          path="/booking/person/view-edit/:id"
          element={<ViewEditPersonDetails />}
        />
        <Route
          path="/dashboard/booking/:id"
          element={<BookingPackageDetails />}
        />
        <Route path="/booking/payment/:id" element={<BookingPayment />} />
        <Route path="/package/:id" element={<PackageDetails />} />
        <Route path="/packages" element={<PackageLayout />}>
          <Route index element={<AllPackage />} />
          <Route path="category/:id" element={<PackageCategory />} />
        </Route>

        <Route
          path="/membership/membership-details-form"
          element={<MembershipForm />}
        />
        <Route path="/blog/:id" element={<SingeBlogPage />} />
        <Route path="/user/success" element={<PaymentSuccess />} />
        <Route path="/user/fail" element={<PaymentFailure />} />
        <Route path="/blog" element={<BlogLayout />}>
          <Route index element={<BlogPage />} />
          <Route path="category/:id" element={<BlogCategory />} />
        </Route>
        <Route path="/contact-us" element={<ContactPage />} />
        <Route path="/membership/fail" element={<FailurePage />} />
        <Route path="/membership/success" element={<SuccessPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

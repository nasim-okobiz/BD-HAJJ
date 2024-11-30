import React, { useState, useEffect, lazy, Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import RootLayout from "./Layouts/RootLayout";
// import About from "./pages/About";
// import Home from "./pages/Home";
const Home = lazy(() => import("./pages/Home"));
const NotFound = lazy(() => import("./pages/NotFound"));
const GalleryPage = lazy(() => import("./pages/GalleryPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const FAQPage = lazy(() => import("./pages/FAQPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogLayout = lazy(() => import("./Layouts/BlogLayout"));
const BlogCategory = lazy(() => import("./components/category/BlogCategory"));
const MembershipHome = lazy(() => import("./components/home/MembershipHome"));
const MembershipPage = lazy(() => import("./pages/MembershipPage"));
const MembershipForm = lazy(() => import("./pages/MembershipForm"));
const VisaCenter = lazy(() => import("./pages/VisaCenter"));
const SingeBlogPage = lazy(() => import("./pages/SingeBlogPage"));
const PackageLayout = lazy(() => import("./Layouts/PackageLayout"));
const AllPackage = lazy(() => import("./components/package/AllPackage"));
const PackageCategory = lazy(() => import("./components/package/PackageCategory"));
const PackageDetails = lazy(() => import("./pages/PackageDetails"));
const LoginCard = lazy(() => import("./pages/LoginCard"));
const c = lazy(() => import("./pages/RegistrationCard"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const BookingPackageDetails = lazy(() => import("./pages/BookingPackageDetails"));
const BookConfirm = lazy(() => import("./pages/BookConfirm"));
const PersonBookingUpdate = lazy(() => import("./pages/PersonBookingUpdate.jsx"));
const FailurePage = lazy(() => import("./pages/membershipFailAndScucces/FailurePage"));
const SuccessPage = lazy(() => import("./pages/membershipFailAndScucces/SuccessPage"));
const BookingPayment = lazy(() => import("./pages/BookingPayment"));
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"));
const PaymentFailure = lazy(() => import("./pages/PaymentFailure"));
const NewBooking = lazy(() => import("./agentProfile/NewBooking"));
const MemberDetails = lazy(() => import("./pages/memberDetails.jsx"));
const GroupBooking = lazy(() => import("./agentProfile/GroupBooking.jsx"));
const Profile = lazy(() => import("./pages/profile/Profile.jsx"));
const PrivacyPolicy = lazy(() => import("./pages/footer/PrivacyPolicy.jsx"));
const RefundPolicy = lazy(() => import("./pages/footer/RefundPolicy.jsx"));
const RegistrationCard = lazy(() => import("./pages/RegistrationCard"));
const ViewEditPersonDetails = lazy(() => import("./pages/profile/ViewEditPersonDetails.jsx"));
const TermsAndConditions = lazy(() => import("./pages/footer/TermsAndConditions.jsx"));
const ForgetPasswordSetUpCard = lazy(() => import("./pages/ForgetPasswordSetUp.jsx"));
const Loader = lazy(() => import("./components/loader/Loader"));

// import RegistrationCard from "./pages/RegistrationCard";
// import ViewEditPersonDetails from "./pages/profile/ViewEditPersonDetails.jsx";
// import TermsAndConditions from "./pages/footer/TermsAndConditions.jsx";
// import ForgetPasswordSetUpCard from "./pages/ForgetPasswordSetUp.jsx";
// import Loader from "./components/loader/Loader"; // Assuming this is the correct import

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
        <Route
          index
          element={
            <Suspense fallback={<div></div>}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/our-gallery"
          element={
            <Suspense fallback={<div></div>}>
              <GalleryPage />
            </Suspense>
          }
        />
        {/* <Route path="/our-gallery" element={<GalleryPage />} /> */}
        <Route
          path="/faq"
          element={
            <Suspense fallback={<div></div>}>
              <FAQPage />
            </Suspense>
          }
        />
        {/* <Route path="/faq" element={<FAQPage />} /> */}
        <Route
          path="/about-us"
          element={
            <Suspense fallback={<div></div>}>
              <AboutPage />
            </Suspense>
          }
        />
        {/* <Route path="/about-us" element={<AboutPage />} /> */}
        <Route
          path="/visa-center"
          element={
            <Suspense fallback={<div></div>}>
              <VisaCenter />
            </Suspense>
          }
        />
        {/* <Route path="/visa-center" element={<VisaCenter />} /> */}
        <Route
          path="/membership"
          element={
            <Suspense fallback={<div></div>}>
              <MembershipPage />
            </Suspense>
          }
        />
        {/* <Route path="/membership" element={<MembershipPage />} /> */}
        <Route
          path="/membership/details"
          element={
            <Suspense fallback={<div></div>}>
              <MemberDetails />
            </Suspense>
          }
        />
        {/* <Route path="/membership/details" element={<MemberDetails />} /> */}
        <Route
          path="/login"
          element={
            <Suspense fallback={<div></div>}>
              <LoginCard />
            </Suspense>
          }
        />
        {/* <Route path="/login" element={<LoginCard />} /> */}
        <Route
          path="/registration"
          element={
            <Suspense fallback={<div></div>}>
              <RegistrationCard />
            </Suspense>
          }
        />
        {/* <Route path="/registration" element={<RegistrationCard />} /> */}
        <Route
          path="/forget-password"
          element={
            <Suspense fallback={<div></div>}>
              <ForgetPasswordSetUpCard />
            </Suspense>
          }
        />
        {/* <Route path="/forget-password" element={<ForgetPasswordSetUpCard />} /> */}
        <Route
          path="/dashboard"
          element={
            <Suspense fallback={<div></div>}>
              <Dashboard />
            </Suspense>
          }
        />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        <Route
          path="/profile/:id"
          element={
            <Suspense fallback={<div></div>}>
              <Profile />
            </Suspense>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<div></div>}>
                <NewBooking />
              </Suspense>
            }
          />
          <Route
            path=":packageid/membership/:memberid"
            element={<GroupBooking />}
          ></Route>
        </Route>
        {/* <Route path="/profile/:id" element={<Profile />}>
          <Route index element={<NewBooking />} />
          <Route
            path=":packageid/membership/:memberid"
            element={<GroupBooking />}
          />
        </Route> */}
        <Route
          path="/booking/:id"
          element={
            <Suspense fallback={<div></div>}>
              <BookConfirm />
            </Suspense>
          }
        />
        {/* <Route path="/booking/:id" element={<BookConfirm />} /> */}
        <Route
          path="/booking/person/:id"
          element={
            <Suspense fallback={<div></div>}>
              <PersonBookingUpdate />
            </Suspense>
          }
        />
        {/* <Route path="/booking/person/:id" element={<PersonBookingUpdate />} /> */}
        <Route
          path="/booking/person/view-edit/:id"
          element={
            <Suspense fallback={<div></div>}>
              <ViewEditPersonDetails />
            </Suspense>
          }
        />
        {/* <Route
          path="/booking/person/view-edit/:id"
          element={<ViewEditPersonDetails />}
        /> */}
        <Route
          path="/dashboard/booking/:id"
          element={
            <Suspense fallback={<div></div>}>
              <BookingPackageDetails />
            </Suspense>
          }
        />
        {/* <Route
          path="/dashboard/booking/:id"
          element={<BookingPackageDetails />}
        /> */}
        <Route
          path="/booking/payment/:id"
          element={
            <Suspense fallback={<div></div>}>
              <BookingPayment />
            </Suspense>
          }
        />
        {/* <Route path="/booking/payment/:id" element={<BookingPayment />} /> */}
        <Route
          path="/package/:id"
          element={
            <Suspense fallback={<div></div>}>
              <PackageDetails />
            </Suspense>
          }
        />
        {/* <Route path="/package/:id" element={<PackageDetails />} /> */}
        <Route
          path="/packages"
          element={
            <Suspense fallback={<div></div>}>
              <PackageLayout />
            </Suspense>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<div></div>}>
                <AllPackage />
              </Suspense>
            }
          />
          <Route
            path="category/:id"
            element={
              <Suspense fallback={<div></div>}>
                <PackageCategory />
              </Suspense>
            }
          />
        </Route>
        {/* <Route path="/packages" element={<PackageLayout />}>
          <Route index element={<AllPackage />} />
          <Route path="category/:id" element={<PackageCategory />} />
        </Route> */}

        <Route
          path="/membership/membership-details-form"
          element={
            <Suspense fallback={<div></div>}>
              <MembershipForm />
            </Suspense>
          }
        />
        {/* <Route
            path="/membership/membership-details-form"
            element={<MembershipForm />}
          /> */}
        <Route
          path="/blog/:id"
          element={
            <Suspense fallback={<div></div>}>
              <SingeBlogPage />
            </Suspense>
          }
        />
        {/* <Route path="/blog/:id" element={<SingeBlogPage />} /> */}

        <Route
          path="/user/success"
          element={
            <Suspense fallback={<div></div>}>
              <PaymentSuccess />
            </Suspense>
          }
        />

        {/* <Route path="/user/success" element={<PaymentSuccess />} /> */}

        <Route
          path="/user/fail"
          element={
            <Suspense fallback={<div></div>}>
              <PaymentFailure />
            </Suspense>
          }
        />
        {/* <Route path="/user/fail" element={<PaymentFailure />} /> */}

        <Route
          path="/blog"
          element={
            <Suspense fallback={<div></div>}>
              <BlogLayout />
            </Suspense>
          }
        >
          <Route
            index
            element={
              <Suspense fallback={<div></div>}>
                <BlogPage />
              </Suspense>
            }
          />
          <Route
            path="category/:id"
            element={
              <Suspense fallback={<div></div>}>
                <BlogCategory />
              </Suspense>
            }
          />
        </Route>
        {/* <Route path="/blog" element={<BlogLayout />}>
          <Route index element={<BlogPage />} />
          <Route path="category/:id" element={<BlogCategory />} />
        </Route> */}
        <Route
          path="/contact-us"
          element={
            <Suspense fallback={<div></div>}>
              <ContactPage />
            </Suspense>
          }
        />
        {/* <Route path="/contact-us" element={<ContactPage />} /> */}
        <Route
          path="/membership/fail"
          element={
            <Suspense fallback={<div></div>}>
              <FailurePage />
            </Suspense>
          }
        />
        {/* <Route path="/membership/fail" element={<FailurePage />} /> */}
        <Route
          path="/membership/success"
          element={
            <Suspense fallback={<div></div>}>
              <SuccessPage />
            </Suspense>
          }
        />
        {/* <Route path="/membership/success" element={<SuccessPage />} /> */}
        <Route
          path="/privacy-policy"
          element={
            <Suspense fallback={<div></div>}>
              <PrivacyPolicy />
            </Suspense>
          }
        />
        {/* <Route path="/privacy-policy" element={<PrivacyPolicy />} /> */}
        <Route
          path="/terms-and-conditions"
          element={
            <Suspense fallback={<div></div>}>
              <TermsAndConditions />
            </Suspense>
          }
        />
        {/* <Route path="/terms-and-conditions" element={<TermsAndConditions />} /> */}
        <Route
          path="/refund-policy"
          element={
            <Suspense fallback={<div></div>}>
              <RefundPolicy />
            </Suspense>
          }
        />
        {/* <Route path="/refund-policy" element={<RefundPolicy />} /> */}
        <Route
          path="/*"
          element={
            <Suspense fallback={<div></div>}>
              <NotFound />
            </Suspense>
          }
        />
        {/* <Route path="*" element={<NotFound />} /> */}
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

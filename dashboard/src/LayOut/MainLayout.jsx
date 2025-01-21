import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  FileOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { IoMdLogOut } from "react-icons/io";

import { Button, Layout, Menu, theme, message } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Home from "../Pages/DashBoardHome";
import { Input, Space } from "antd";




import { useDispatch, useSelector } from "react-redux";
import logoImage from "../../src/assets/logo.png";

import { activeUser, logoutUser } from "../Slices/userSlices";
import { MdEmojiEvents } from "react-icons/md";
import { CiShop } from "react-icons/ci";
import { BiCategory } from "react-icons/bi";
import { FaBlogger } from "react-icons/fa";
import { LiaHistorySolid } from "react-icons/lia";
import { RiCustomerService2Line } from "react-icons/ri";
import { FaUserFriends } from "react-icons/fa";
import { MdContacts } from "react-icons/md";
import { GiKnightBanner } from "react-icons/gi";
import { RiDiscountPercentFill } from "react-icons/ri";
import AllBlog from "../Pages/blog/AllBlog";
import BlogCategorysComponent from "../Pages/blog_Category/AllBlogCategory.jsx";
import BannersComponent from "../Pages/banner/AllBanner.jsx";
import AboutUssComponent from "../Pages/About_Us/AllAboutUs.jsx";
import ImageGallerysComponent from "../Pages/Image_Gallery/AllImageGallery.jsx";
import FAQComponent from "../Pages/faq/AllFaq.jsx";
import ContactUsComponent from "../Pages/contact_us/AllContactUs.jsx";
import ContactInfosComponent from "../Pages/contact_info/AllContactInfo.jsx";
import PackageTypesComponent from "../Pages/Package_Type/AllPackageType.jsx";
import PackagesComponent from "../Pages/package/AllPackage.jsx";
import BookingsComponent from "../Pages/booking/AllBooking.jsx";
import UsersComponent from "../Pages/user/AllUser.jsx";
import MembershipsComponent from "../Pages/membership/AllMembership.jsx";
import JoinUssComponent from "../Pages/Join_Us/AllJoinUs.jsx";
import MembershipValidateComponent from "../Pages/membership/MembershipValidate/MembershipValidate.jsx";
import VisaPackagesComponent from "../Pages/Visapackage/AllPackage.jsx";
import HajjPackagesComponent from "../Pages/Hajjpackage/AllPackage.jsx";
import UmrahPackagesComponent from "../Pages/Umrahpackage/AllPackage.jsx";
import VideoComponent from "../Pages/video_Gallery/AllVideo.jsx";
import PrivacyPolicyComponent from "../Pages/Privacy_Policy/PrivacyPolicy.jsx";
import RefundPolicyComponent from "../Pages/Refund_Policy/RefundPolicy.jsx";
import TermsAndConditionsComponent from "../Pages/Terms&Conditions/Terms&Conditions.jsx";
import { logoutCookies } from "../utils/Cookies/cookies.js";
import { AiOutlineNotification } from "react-icons/ai";
import { MdOutlinePolicy } from "react-icons/md";
import { MdJoinInner } from "react-icons/md";
import { LuPackagePlus } from "react-icons/lu";
import { MdOutlineCardMembership } from "react-icons/md";
import NoticeComponent from "../Pages/notice/Notice.jsx";
import TourPackagesComponent from "../Pages/Tour/AllPackage.jsx";
import MembershipParameterComponent from "../Pages/membership_Info/MembershipInfo.jsx";
import MembershipInfoComponent from "../Pages/membership_Parameter/MembershipParameter.jsx";
import { HiOutlineClipboardDocument } from "react-icons/hi2";
import { MdOutlineRememberMe } from "react-icons/md";


const { Search } = Input;
const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState(
    localStorage.getItem("selectedMenuItem") || "1"
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMenuItemClick = (key) => {
    setSelectedMenuItem(key);
    localStorage.setItem("selectedMenuItem", key);
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/");
    }
  }, [navigate]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }

  let content = null;
  switch (selectedMenuItem) {
    case "1":
      content = <UsersComponent />;
      break;
    case "2":
      content = <BannersComponent />;
      break;
    case "3":
      content = <AboutUssComponent />;
      break;
    case "4":
      content = <AboutUssComponent />;
      break;

    case "5":
      content = <ImageGallerysComponent />;
      break;

    case "6":
      content = <BlogCategorysComponent />;
      break;
    case "7":
      content = <AllBlog />;
      break;
    case "8":
      content = <FAQComponent />;
      break;
    case "9":
      content = <ContactUsComponent />;
      break;
    case "10":
      content = <ContactInfosComponent />;
      break;
    case "11":
      content = <PackageTypesComponent />;
      break;
    case "12":
      content = <PackagesComponent />;
      break;
    case "13":
      content = <BookingsComponent />;
      break;
      // case "14":
      //   content = <UsersComponent />; 
      break;
    case "15":
      content = <MembershipsComponent />;
      break;
    case "16":
      content = <MembershipValidateComponent />;
      break;
    case "17":
      content = <JoinUssComponent />;
      break;
    case "18":
      content = <UmrahPackagesComponent />;
      break;
    case "19":
      content = <HajjPackagesComponent />;
      break;
    case "20":
      content = <VisaPackagesComponent />;
      break;
    case "26":
      content = <TourPackagesComponent />;
      break;
    case "21":
      content = <VideoComponent />;
      break;

    case "22":
      content = <PrivacyPolicyComponent />;
      break;
    case "23":
      content = <RefundPolicyComponent />;
      break;
    case "24":
      content = <TermsAndConditionsComponent />;
      break;
    case "25":
      content = <NoticeComponent />;
      break;
    case "27":
      content = <MembershipInfoComponent />;
      break;
    case "28":
      content = <MembershipParameterComponent />;
      break;

    default:
      content = (
        <div className="text-center text-xl font-bold py-10">
          Okobiz Default Content
        </div>
      );
  }

  let items = [
    getItem(" All Users", "1", <UserOutlined />),

    getItem(" Banners", "2", <CiShop />),
    getItem(" About Us", "3", <BiCategory />),
    getItem(" Image Gallery", "5", <UploadOutlined />),
    getItem(" Video Gallery", "21", <GiKnightBanner />),
    getItem("Blog", "sub2", <FaBlogger />, [
      getItem("Blog Category", "6"),
      getItem("All Blog", "7"),
    ]),
    getItem(" FAQ", "8", <LiaHistorySolid />),
    getItem(" Contact Us", "9", <RiCustomerService2Line />),
    getItem(" Contact Info", "10", <MdEmojiEvents />),
    getItem("Package", "sub3", <LuPackagePlus />, [
      getItem("Package Type", "11"),
      getItem("All Package", "12"),
      getItem("Umrah Package", "18"),
      getItem("Hajj Package", "19"),
      getItem("Visa Package", "20"),
      getItem("Tour Package", "26"),
    ]),
    getItem(" Booking", "13", <FaUserFriends />),
    // getItem(" User", "14", <MdContacts />),
    getItem("Membership", "sub4", <MdOutlineCardMembership />, [
      getItem(" Memberships", "15", <GiKnightBanner />),
      getItem(" Membership Validate", "16", <GiKnightBanner />),
    ]),
    getItem(" Join Us", "17", <MdJoinInner />),
    getItem("Policy", "sub5", <MdOutlinePolicy />, [
      getItem("Privacy Policy", "22"),
      getItem("Refund Policy", "23"),
      getItem("Terms & Conditions", "24"),
    ]),
    getItem(" Notice", "25", <AiOutlineNotification />),
    getItem(" Membership Document", "28", <MdOutlineRememberMe />),
    getItem(" Membership Parameter", "27", <HiOutlineClipboardDocument />),

  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    logoutCookies()
    dispatch(logoutUser());
    message.success("You have been logged out!");
    navigate("/");
  };
  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          // height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="text-white  mx-auto  font-bold text-2xl w-[80px] h-[80px] leading-[80px] text-center rounded-full  my-10 ">
          <img src={logoImage} />
        </div>
        <Menu
          theme="dark"
          className="text-white !font-bold"
          onClick={({ key }) => handleMenuItemClick(key)}
          defaultSelectedKeys={["sub1"]}
          mode="inline"
          selectedKeys={[selectedMenuItem]}
          items={items}
        />
        {/* <div
          onClick={handelLogout}
          className="text-center text-white flex justify-center items-center gap-x-1 absolute bottom-10 left-[50%] translate-x-[-50%] cursor-pointer font-bold"
        >
          <IoMdLogOut size={25} />
          <p>Log Out</p>
        </div> */}
      </Sider>
      <Layout
        style={{
          marginLeft: collapsed ? 70 : 200, // Adjust marginLeft dynamically
        }}
      >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <div className="flex justify-between items-center">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
            <div
              className="cursor-pointer font-medium mr-10"
              onClick={handleLogout}
            >
              <IoMdLogOut size={30} />
            </div>
          </div>
        </Header>
        <Content
          className="bg-[#F6F8FA] px-5 pb-20 overflow-hidden"
          style={{
            overflow: "initial",
          }}
        >
          {content}
        </Content>
        <h1 className="my-10 " style={{ textAlign: "center" }}>
          Developed by{" "}
          <Link className="font-bold text-black" to={"https://okobiz.com"}>
            okobiz
          </Link>
        </h1>
      </Layout>
    </Layout>
  );
};

export default MainLayout;

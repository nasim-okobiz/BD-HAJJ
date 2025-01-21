import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import api from "../axios/Axios";
import { API_BASE_URL } from "../axios/config";
import btnshapeup from "../../assets/add/masjid.png";
import btnshapedown from "../../assets/add/masjidshape.png";
import Loader from "../loader/Loader";
import Skeleton from "react-loading-skeleton"; // Import the skeleton loader
import "react-loading-skeleton/dist/skeleton.css"; // Import the skeleton styles

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const getBanners = async () => {
    try {
      const response = await api.get(`/banner`);
      setBanners(response?.data?.data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBanners();
  }, []);

  const handelBannerPackage = (id) => {
    // id to redirect Url
    navigate(`/package/${id}`);
  };

  return (
    <div>
      {/* Check if data is loading */}
      {isLoading ? (
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          loop={true}
          speed={1500}
          modules={[Navigation, Pagination, Autoplay]}
          className="w-full custom-swiper-button"
        >
          {/* Skeleton loader for each slide */}
          <SwiperSlide>
            <div className="relative w-full">
              <Skeleton className="xl:h-[80vh] w-full" />{" "}
              {/* Skeleton for image */}
              <div className="absolute ml-20 top-2/3 left-2/4 hidden md:block transform -translate-x-3/4 text-white px-6 py-2 rounded-full z-10">
                <Skeleton width={200} height={40} /> {/* Skeleton for button */}
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      ) : (
        // Actual content once data is loaded
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          navigation
          pagination={false}
          autoplay={{ delay: 5000 }}
          loop={true}
          speed={1500}
          modules={[Navigation, Pagination, Autoplay]}
          className="w-full custom-swiper-button"
        >
          {/* Swiper slides */}
          {banners?.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full">
                {/* Updated button */}
                <div className="absolute top-2/3 left-1/2 hidden md:block transform -translate-x-1/2 text-white px-6 py-2 rounded-full z-10">
                  {/* <Link to=`/package`> */}
                  <button onClick={() => handelBannerPackage(slide?.packageRef?._id)} className="bg-primary text-white font-bold py-2 px-6 rounded transition-all duration-300 transform hover:scale-105 hover:shadow-md uppercase">
                    Book Now
                  </button>
                </div>
                <img
                  className="xl:h-[50vh] w-full "
                  src={API_BASE_URL + slide?.photo}
                  alt={`Banner ${index}`}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default Banner;

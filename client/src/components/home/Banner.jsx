import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import { Link, useLocation } from "react-router-dom";
import api from "../axios/Axios";
import { API_BASE_URL } from "../axios/config";
import btnshapeup from "../../assets/add/masjid.png";
import btnshapedown from "../../assets/add/masjidshape.png";
import Loader from "../loader/Loader";
import Skeleton from "react-loading-skeleton";  // Import the skeleton loader
import "react-loading-skeleton/dist/skeleton.css";  // Import the skeleton styles

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

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
              <Skeleton className="xl:h-[80vh] w-full"/> {/* Skeleton for image */}
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
          pagination={{ clickable: true }}
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
                <Link to={"/packages"}>
                  <div className="absolute ml-20 top-2/3 left-2/4 hidden md:block transform -translate-x-3/4 text-white px-6 py-2 rounded-full z-10">
                    <div className="relative group cursor-pointer ">
                      <img
                        className="w-[38px] sm:w-[45px] absolute group-hover:left-[70%] left-[10%] transition-all ease-in-out duration-300 -top-[80%]"
                        src={btnshapeup}
                      />
                      <img
                        className="w-[180px] sm:w-[230px] "
                        src={btnshapedown}
                      />

                      <div className="absolute left-1/2 top-[60%] -translate-x-1/2 -translate-y-1/2 text-white text-[16px] sm:text-xl font-semibold">
                        <Link to={"/packages"} className="button block">
                          Know More
                        </Link>
                      </div>
                    </div>
                  </div>
                </Link>
                <img
                  className="xl:h-[80vh] w-full"
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

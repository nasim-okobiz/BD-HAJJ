import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";

import { AiOutlineRight } from "react-icons/ai"; // Import the arrow icon
import Containar from "../components/container/Containar";
import { Link, useLocation, useParams } from "react-router-dom";
import bgshape from "../assets/pattern/pattern.jpg"
import api from "../components/axios/Axios";
import { useEffect } from "react";
import { API_BASE_URL } from "../components/axios/config";

const GalleryPage = () => {

  const [imageGallerys, setImageGallerys] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
  const location = useLocation();
  const { id } = useParams();
  console.log(id);
  
  const getImageGallerys = async () => {
    try {
      const response = await api.get(`/image-gallery`);
      setImageGallerys(response?.data?.data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false); 
    }
  };
  useEffect(() => {
    getImageGallerys();
  }, [id]);
  console.log("imageGallerys", imageGallerys);

  return (
    <div className="images-gallery-section font-philo relative ">
      <div className="absolute -z-10 left-0 top-0 w-full h-full opacity-20">
        <img className="w-full h-full" src={bgshape} />
      </div>
      <div className="py-5 sm:pl-[140px] bg-gray-100 z-10">
        <Containar>
          <div className="">
            <nav className="flex items-center space-x-2 text-gray-600 text-lg">
              <Link to="/" className="hover:text-semisecondary font-bold">
                Home
              </Link>
              <AiOutlineRight />
              <span>Gallery</span>
            </nav>
          </div>
        </Containar>
      </div>

      <div className="py-16 ">
        <div className="">
          <Containar>
            <h2 className="text-[28px] sm:text-[40px] font-bold text-semisecondary mb-5 sm:mb-10">
              Makka Images Gallery
            </h2>

            {/* Wrap the Swiper component with PhotoProvider */}
            <PhotoProvider>
              <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                spaceBetween={10}
                slidesPerView={1}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                  },
                }}
              >
                {imageGallerys?.map((data, index) => (
                  ( data.galleryType == 'Makka' &&
                  <SwiperSlide key={index}>
                    <div className="h-[200px]">
                      {/* Wrap image with PhotoView to enable zoom functionality */}
                      <PhotoView src={API_BASE_URL+data?.photo}>
                        <img
                          src={API_BASE_URL+data?.photo}
                          className="h-full object-cover w-full cursor-pointer"
                          alt={`Image ${index}`}
                        />
                      </PhotoView>
                    </div>
                  </SwiperSlide>
                                    )
                ))}
              </Swiper>
            </PhotoProvider>
          </Containar>
        </div>

        <div className="mt-14 sm:mt-28">
          <Containar>
            <h2 className="text-[28px] sm:text-[40px] font-bold text-semisecondary mb-5 sm:mb-10">
              Madina Images Gallery
            </h2>

            {/* Wrap the Swiper component with PhotoProvider */}
            <PhotoProvider>
              <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                spaceBetween={10}
                slidesPerView={1}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                  },
                }}
              >
                {imageGallerys?.map((data, index) => (
                                    ( data.galleryType == 'Madina' &&
                  <SwiperSlide key={index}>
                    <div className="h-[200px]">
                      {/* Wrap image with PhotoView to enable zoom functionality */}
                      <PhotoView src={API_BASE_URL+data?.photo}>
                        <img
                          src={API_BASE_URL+data?.photo}
                          className="h-full object-cover w-full cursor-pointer"
                          alt={`Image ${index}`}
                        />
                      </PhotoView>
                    </div>
                  </SwiperSlide>
                                    )
                ))}
              </Swiper>
            </PhotoProvider>
          </Containar>
        </div>

        <div className="mt-14 sm:mt-28">
          <Containar>
            <h2 className="text-[28px] sm:text-[40px] font-bold text-semisecondary mb-5 sm:mb-10">
            Other Images Gallery
            </h2>

            {/* Wrap the Swiper component with PhotoProvider */}
            <PhotoProvider>
              <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
                spaceBetween={10}
                slidesPerView={1}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 5,
                    spaceBetween: 20,
                  },
                }}
              >
                {imageGallerys?.map((data, index) => (
                  ( data.galleryType == 'Other' &&
                  <SwiperSlide key={index}>
                    <div className="h-[200px]">
                      {/* Wrap image with PhotoView to enable zoom functionality */}
                      <PhotoView src={API_BASE_URL+data?.photo}>
                        <img
                          src={API_BASE_URL+data?.photo}
                          className="h-full object-cover w-full cursor-pointer"
                          alt={`Image ${index}`}
                        />
                      </PhotoView>
                    </div>
                  </SwiperSlide>
                  )
                ))}
              </Swiper>
            </PhotoProvider>
          </Containar>
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import api from "../axios/Axios";
import { API_BASE_URL } from "../axios/config";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "react-router-dom";
import Loader from "../loader/Loader";
const GallerySection = () => {
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch images and videos from APIs
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await api.get("image-gallery");

        setImages(response?.data?.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    const fetchVideos = async () => {
      try {
        const response = await api.get("video-gallery");
        console.log(
          "first======================================,",
          response?.data?.data
        );
        setVideos(response?.data?.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchImages();
    fetchVideos();
    setLoading(false);
  }, []);

  // Swiper settings

  useEffect(() => {
    const timer = setTimeout(() => {
      setloading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div>
          <p className="uppercase text-center tracking-wider text-base sm:text-xl">
            Images Gallery & Videos
          </p>
          <h3 className="uppercase text-center tracking-wider text-[24px] sm:text-[30px] sm:py-2">
            Some Beautiful Moments During Tour
          </h3>
          <div className="w-40 sm:w-80 h-px mx-auto bg-gray-300"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="py-10">
            <p className="text-yellow-500 sm:text-xl uppercase">
              - Our Images Gallery
            </p>

            <Swiper
              spaceBetween={10}
              slidesPerView={1} // Default is 1 for smaller screens
              loop={true}
              autoplay={{ delay: 3000 }}
              //   pagination={{ clickable: true }}
              navigation={true}
              breakpoints={{
                // For small screens, show 1 image
                640: { slidesPerView: 1 },
                // For medium to larger screens, show 2 images
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 2 },
              }}
              modules={[Autoplay, Navigation]}
              className="custom-swiper-button py-10"
            >
              {images.map((img, index) => (
                <SwiperSlide key={index}>
                  <div className="relative w-full h-64 md:h-80">
                    <img
                      src={API_BASE_URL + img?.photo}
                      alt={`Gallery image ${index + 1}`}
                      className="object-contain w-full h-full rounded shadow"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="border-l px-10 md:py-10">
            <p className="text-yellow-500 sm:text-xl uppercase">
              - Our Tour Videos
            </p>

            <div className="space-y-6">
              <div className="video-item py-5">
                {videos[0]?.video && (
                  <iframe
                    src={`https://www.youtube.com/embed/${
                      videos[0]?.video.split("v=")[1]
                    }`} // Convert the watch URL to an embed URL
                    title="Video"
                    className="w-full h-64 md:h-80 rounded-lg shadow-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-4 flex justify-center">
          <Link
            to="/our-gallery"
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition"
          >
            View All
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;

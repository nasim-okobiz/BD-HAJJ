import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import api from '../axios/Axios';
import { API_BASE_URL } from '../axios/config';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
const GallerySection = () => {
    const [images, setImages] = useState([]);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch images and videos from APIs
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await api.get('image-gallery');

                setImages(response?.data?.data);
            } catch (error) {
                console.error("Error fetching images:", error);
            }
        };

        const fetchVideos = async () => {
            try {
                const response = await api.get('video-gallery');
                console.log("first======================================,", response?.data?.data)
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


    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <section className="bg-gray-100 py-10">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row md:space-x-6">

                    {/* Image Gallery Section */}
                    <div className="md:w-1/2 mb-8 md:mb-0">
                        <div className="text-center mb-6">
                            <h2
                                className="text-[24px] sm:text-[44px] font-semibold text-secondary"
                                style={{ textShadow: "2px 2px 2px #0000002d" }}
                            >
                                Our Images Gallery
                            </h2>

                            <p
                                className="font-semibold text-[22px] sm:text-[36px] text-semisecondary line-clamp-1"
                                style={{
                                    textShadow: "2px 2px 2px #0000002d",
                                }}
                            >
                                Some Beautiful Moments During Tour
                            </p>
                        </div>

                        <Swiper
                            spaceBetween={10}
                            loop={true}
                            autoplay={{ delay: 3000 }}
                            pagination={{ clickable: true }}
                            navigation={true}
                            modules={[Autoplay, Pagination, Navigation]}
                            className="custom-swiper-button"
                        >
                            {images.map((img, index) => (
                                <SwiperSlide key={index}>
                                    <div className="relative w-full h-64 md:h-80">  {/* This is your container */}
                                        <img
                                            src={API_BASE_URL + img?.photo}
                                            alt={`Gallery image ${index + 1}`}
                                            className="object-contain w-full h-full rounded-lg shadow-lg"
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        <div className="text-center mt-4">
                            <a href="/our-gallery" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition">
                                View All
                            </a>
                        </div>
                    </div>

                    {/* Video Section */}
                    <div className="md:w-1/2">
                        <div className="text-center mb-6">
                            <h2
                                className="text-[24px] sm:text-[44px] font-semibold text-secondary"
                                style={{ textShadow: "2px 2px 2px #0000002d" }}
                            >
                                Our Tour Videos
                            </h2>

                            <p
                                className="font-semibold text-[22px] sm:text-[36px] text-semisecondary line-clamp-1"
                                style={{
                                    textShadow: "2px 2px 2px #0000002d",
                                }}
                            >
                                Some Beautiful Moments During Tour
                            </p>
                        </div>

                        {/* Video Section */}
                        <div className="space-y-6">
                            <div className="video-item">
                                {/* Ensure the video URL is transformed into an embed URL */}
                                {videos[0]?.video && (
                                    <iframe
                                        src={`https://www.youtube.com/embed/${videos[0]?.video.split('v=')[1]}`} // Convert the watch URL to an embed URL
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
            </div>
        </section>
    );
};

export default GallerySection;

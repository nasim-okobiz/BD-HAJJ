import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules"; // Import Swiper modules
import { Link, useLocation } from "react-router-dom";
import api from "../axios/Axios";
import { API_BASE_URL } from "../axios/config";

const RecentBlog = (blogCategoryRef) => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const getBlogs = async () => {
    try {
      const response = await api.get(`/blog/pagination?limit=5`);
      setBlogs(response?.data?.data?.result);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getBlogs();
  }, []);
  console.log(blogs);

  return (
    <section className="pt-16 pb-32 font-merriweather">
      <div className="container mx-auto">
        <h3 className="mb-3 text-2xl font-semibold">Recent Blogs</h3>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation
          loop={true}
          speed={1000}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
          }}
        >
          {blogs.map((blog) => (
            <SwiperSlide key={blog._id}> 
              <div className="bg-white shadow-lg rounded-lg overflow-hidden  mb-5">
                <div>
                  <Link to={`/blog/${blog?._id}`}>
                    <img
                      className="w-full sm:h-[280px] object-cover"
                      src={API_BASE_URL + blog?.photo}
                      alt="Card image cap"
                    />
                  </Link>
                </div>

                <div className="p-4">
                  <Link to={`/blog/${blog?._id}`} className="text-xl font-bold line-clamp-2">{blog.title}</Link>
                  <p className="text-gray-700 line-clamp-2">{blog.description}</p>
                </div>
                <div className="p-4">
                  <Link
                    to={`/blog/${blog?._id}`}
                    className="inline-block bg-blue-500 text-white px-4 py-1.5 rounded hover:bg-blue-600 transition-all duration-300"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default RecentBlog;

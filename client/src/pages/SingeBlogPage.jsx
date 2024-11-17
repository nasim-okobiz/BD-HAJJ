import React, { useEffect, useState } from "react";
import Containar from "../components/container/Containar";
import { Link, useLocation, useParams } from "react-router-dom";
import { AiOutlineRight } from "react-icons/ai";
import RecentBlog from "../components/blog/RecentBlog";
import api from "../components/axios/Axios";
import { API_BASE_URL } from "../components/axios/config";

const SingeBlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const { id } = useParams();
  console.log(id);

  const getBlogs = async () => {
    try {
      const response = await api.get(`/blog/${id}`);
      setBlogs(response?.data?.data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getBlogs();
  }, [id]);
  console.log("single blogs", blogs);

  return (
    <>
      <section className="bg-white py-16 border-b-2 border-semisecondary font-philo">
        <Containar>
          <div className="flex flex-wrap">
            <div className="w-full md:w-[47%] my-auto pr-10">
              <div className="blog-title ">
                <h1 className="font-century font-semibold text-semisecondary text-4xl">
                  {blogs?.title}
                </h1>
                <p className="font-semibold text-xl mt-5">
                  {blogs?.description}
                </p>
                <p className="mt-5 text-xl">
                  Publish On : <span>{blogs?.createdAt}</span>
                </p>
              </div>
            </div>

            <div className="w-full md:w-[47%]">
              <img
                className="w-full"
                src={API_BASE_URL + blogs?.photo}
                alt=""
              />
            </div>
          </div>
        </Containar>
      </section>
      <div className="py-5 mt-10 bg-gray-50 z-10">
        <Containar>
          <div>
            <nav className="flex items-center space-x-2 text-gray-600 text-base sm:text-lg">
              <Link to="/" className="hover:text-semisecondary font-bold">
                Home
              </Link>
              <AiOutlineRight />
              <Link to="/blog" className="hover:text-semisecondary font-bold">
                Blog
              </Link>
              <AiOutlineRight />
              <span className="text-sm sm:text-lg">{blogs?.title}</span>
            </nav>
          </div>
        </Containar>
      </div>
      <section className="mb-4 pb-16 font-philo border-b-2 border-semisecondary">
        <p
          className="container mx-auto"
          dangerouslySetInnerHTML={{ __html: blogs?.textEditor }}
        ></p>
      </section>
      <RecentBlog />
    </>
  );
};

export default SingeBlogPage;

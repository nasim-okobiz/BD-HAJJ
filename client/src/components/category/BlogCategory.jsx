import React, { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import api from "../axios/Axios";
import { API_BASE_URL } from "../axios/config";
import { useEffect } from "react";
const BlogCategory = () => {

  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const { id } = useParams();
  console.log(id);

  const getBlogs = async () => {
    try {
      const response = await api.get(`/blog/pagination?blogCategoryRef=${id}`);
      setBlogs(response?.data?.data?.result);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getBlogs();
  }, [id]);
  console.log("blogs", blogs);

  return (
    <div className="col-span-3 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {blogs.map((blog) => (
        <div key={blog.id} className="col-span-1 ">
          <div className="card bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
            <Link  to={`/blog/${blog._id}`}>

              <img
                className="card-img-top w-full h-[220px] object-cover"
                src={API_BASE_URL+blog?.photo}
                alt={blog.title}
              />
            </Link>

            <div className="card-body px-5 py-4">
              <Link to={`/blog/${blog._id}`} className="text-xl font-semibold mb-3 line-clamp-2">
                {blog.title}
              </Link>
              <p className="text-gray-600 mb-3 line-clamp-3">{blog.description.replace(/<img[^>]*>/g, '').replace(/<\/?[^>]+(>|$)/g, '')}</p>


              <div className="each-blog-button">
                <Link
                  to={`/blog/${blog._id}`}
                  className="inline-block bg-blue-500 text-white px-4 py-1.5 rounded hover:bg-blue-600 transition-all duration-300"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogCategory;

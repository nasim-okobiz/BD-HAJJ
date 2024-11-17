// src/components/BlogsComponent.js

import React, { useEffect, useState } from "react";
import { Table, Button, message, Popconfirm } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axiosInstance from "../../Components/Axios";
import { API_BASE_URL } from "../../Components/config";
import CreateAndEditBlog from "./CreateAndEditBlog";
import { CiEdit } from "react-icons/ci";
import { MdOutlineViewInAr } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
const BlogsComponent = () => {
  const [blogs, setBlogs] = useState([]);
  const [blogCategories, setBlogCategories] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null); // State for the blog being edited

  useEffect(() => {
    fetchBlogs();
    fetchBlogCategories();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axiosInstance.get("/blog");
      setBlogs(response?.data?.data);
    } catch (error) {
      message.error("Failed to fetch blogs.");
    }
  };

  const fetchBlogCategories = async () => {
    try {
      const response = await axiosInstance.get("/blog-category");
      setBlogCategories(response?.data?.data);
    } catch (error) {
      message.error( error?.response?.data?.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/blog/${id}`);
      message.success("Blog deleted successfully.");
      fetchBlogs();
    } catch (error) {
      message.error("Failed to delete blog.");
    }
  };

  const showModal = (blog) => {
    setEditingBlog(blog);
    setVisible(true);
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Category",
      dataIndex: "blogCategoryRef",
      key: "blogCategoryRef",
      render: (blogCategoryRef) => blogCategoryRef?.name || "No Category",
    },
    {
      title: "Photos",
      dataIndex: "photo",
      key: "photo",
      render: (photo) => (
        <img
          src={`${API_BASE_URL}${photo}`}
          alt="blog"
          style={{ width: "100px", marginRight: "10px" }}
        />
      ),
    },
    {
      title: "Content",
      dataIndex: "textEditor",
      render: (textEditor) => textEditor.replace(/<[^>]*>?/gm, ""),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div>
          <Button icon={<CiEdit  style={{ fontSize: '22px' }}/>} type="link" onClick={() => showModal(record)}>
            {/* Edit */}
          </Button>
          <Popconfirm
            title="Are you sure delete this blog?"
            onConfirm={() => handleDelete(record?._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<AiOutlineDelete  style={{ fontSize: '22px' }}/>} type="link" danger>
              {/* Delete */}
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto py-5">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">All Blogs</h1>
        <Button
          type="primary"
          onClick={() => {
            setEditingBlog(null); // Reset editing blog
            setVisible(true);
          }}
          style={{ marginBottom: 16 }}
        >
          <PlusOutlined /> Create Blog
        </Button>
      </div>

      <Table columns={columns} dataSource={blogs} rowKey="_id"  scroll={{ x: 800 }}/>

      <CreateAndEditBlog
        visible={visible}
        setVisible={setVisible}
        fetchBlogs={fetchBlogs}
        blogCategories={blogCategories}
        editingBlog={editingBlog} // Pass the editing blog
      />
    </div>
  );
};

export default BlogsComponent;

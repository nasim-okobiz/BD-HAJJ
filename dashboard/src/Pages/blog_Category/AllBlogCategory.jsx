// src/components/BlogCategorysComponent.js

import React, { useEffect, useState } from "react";
import { Table, Button, message, Popconfirm } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axiosInstance from "../../Components/Axios";
import { API_BASE_URL } from "../../Components/config";
import CreateAndEditBlogCategory from "./CreateAndEditBlogCategory";
import { CiEdit } from "react-icons/ci";
import { MdOutlineViewInAr } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
// import CreateAndEditBlogCategory from "./CreateAndEditBlogCategory";

const BlogCategorysComponent = () => {
  const [blogCategorys, setBlogCategorys] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editingBlogCategory, setEditingBlogCategory] = useState(null); // State for the blogCategory being edited

  useEffect(() => {
    fetchBlogCategorys();
  }, []);

  const fetchBlogCategorys = async () => {
    try {
      const response = await axiosInstance.get("/blog-category");
      setBlogCategorys(response?.data?.data);
    } catch (error) {
      message.error( error?.response?.data?.message);
    }
  };



  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/blog-category/${id}`);
      message.success("BlogCategory deleted successfully.");
      fetchBlogCategorys();
    } catch (error) {
      message.error( error?.response?.data?.message);
    }
  };

  const showModal = (blogCategory) => {
    setEditingBlogCategory(blogCategory);
    setVisible(true);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
            title="Are you sure delete this blogCategory?"
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
        <h1 className="text-2xl font-bold">All BlogCategorys</h1>
        <Button
          type="primary"
          onClick={() => {
            setEditingBlogCategory(null);
            setVisible(true);
          }}
          style={{ marginBottom: 16 }}
        >
          <PlusOutlined /> Create BlogCategory
        </Button>
      </div>

      <Table columns={columns} dataSource={blogCategorys} rowKey="_id" scroll={{ x: 800 }}/>

      <CreateAndEditBlogCategory
        visible={visible}
        setVisible={setVisible}
        fetchBlogCategorys={fetchBlogCategorys}
        editingBlogCategory={editingBlogCategory} // Pass the editing blogCategory
      />
    </div>
  );
};

export default BlogCategorysComponent;

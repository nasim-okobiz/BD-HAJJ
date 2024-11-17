// src/components/AboutUssComponent.js

import React, { useEffect, useState } from "react";
import { Table, Button, message, Popconfirm } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axiosInstance from "../../Components/Axios";
import { API_BASE_URL } from "../../Components/config";
import CreateAndEditAboutUs from "./CreateAndEditAboutUs";
import { CiEdit } from "react-icons/ci";
import { MdOutlineViewInAr } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
const AboutUssComponent = () => {
  const [aboutUss, setAboutUss] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editingAboutUs, setEditingAboutUs] = useState(null); // State for the aboutUs being edited

  useEffect(() => {
    fetchAboutUss();
  }, []);

  const fetchAboutUss = async () => {
    try {
      const response = await axiosInstance.get("/about-us");
      setAboutUss(response?.data?.data);
    } catch (error) {
      message.error("Failed to fetch aboutUss.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/aboutUs/${id}`);
      message.success("AboutUs deleted successfully.");
      fetchAboutUss();
    } catch (error) {
      message.error(error?.response?.data?.message);
    }
  };

  const showModal = (aboutUs) => {
    setEditingAboutUs(aboutUs);
    setVisible(true);
  };

  const columns = [
    {
      title: "Header",
      dataIndex: "header",
      key: "header",
    },
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
      title: "Photos",
      dataIndex: "photo",
      key: "photo",
      render: (photo) => (
        <img
          src={`${API_BASE_URL}${photo}`}
          alt="aboutUs"
          style={{ width: "100px", marginRight: "10px" }}
        />
      ),
    },
    {
      title: "Background Image",
      dataIndex: "bgPhoto",
      key: "bgPhoto",
      render: (bgPhoto) => (
        <img
          src={`${API_BASE_URL}${bgPhoto}`}
          alt="aboutUs"
          style={{ width: "100px", marginRight: "10px" }}
        />
      ),
    },
    {
      title: "Agency Name",
      dataIndex: "agencyName",
      key: "agencyName",
    },
    {
      title: "Honor Name",
      dataIndex: "honorName",
      key: "honorName",
    },
    {
      title: "WhatsApp",
      dataIndex: "whatsApp",
      key: "whatsApp",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
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
            title="Are you sure delete this aboutUs?"
            onConfirm={() => handleDelete(record?._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button  icon={<AiOutlineDelete  style={{ fontSize: '22px' }}/>} type="link" danger>
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
        <h1 className="text-2xl font-bold">All AboutUss</h1>
        <Button
          type="primary"
          onClick={() => {
            setEditingAboutUs(null); // Reset editing aboutUs
            setVisible(true);
          }}
          style={{ marginBottom: 16 }}
        >
          <PlusOutlined /> Create AboutUs
        </Button>
      </div>

      <Table columns={columns} dataSource={aboutUss} rowKey="_id"  scroll={{ x: 800 }}/>

      <CreateAndEditAboutUs
        visible={visible}
        setVisible={setVisible}
        fetchAboutUss={fetchAboutUss}
        editingAboutUs={editingAboutUs} // Pass the editing aboutUs
      />
    </div>
  );
};

export default AboutUssComponent;

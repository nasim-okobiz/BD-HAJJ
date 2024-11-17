// src/components/BannersComponent.js

import React, { useEffect, useState } from "react";
import { Table, Button, message, Popconfirm } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axiosInstance from "../../Components/Axios";
import { API_BASE_URL } from "../../Components/config";
import CreateAndEditBanner from "./CreateAndEditBanner";
import { CiEdit } from "react-icons/ci";
import { MdOutlineViewInAr } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
const BannersComponent = () => {
  const [banners, setBanners] = useState([]);
  // const [bannerCategories, setBannerCategories] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null); // State for the banner being edited

  useEffect(() => {
    fetchBanners();
    // fetchBannerCategories();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await axiosInstance.get("/banner");
      setBanners(response?.data?.data);
    } catch (error) {
      message.error("Failed to fetch banners.");
    }
  };

  // const fetchBannerCategories = async () => {
  //   try {
  //     const response = await axiosInstance.get("/banner-category");
  //     setBannerCategories(response?.data?.data);
  //   } catch (error) {
  //     message.error("Failed to fetch categories.");
  //   }
  // };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/banner/${id}`);
      message.success("Banner deleted successfully.");
      fetchBanners();
    } catch (error) {
      message.error( error?.response?.data?.message);
    }
  };

  const showModal = (banner) => {
    setEditingBanner(banner);
    setVisible(true);
  };

  const columns = [

    {
      title: "Photos",
      dataIndex: "photo",
      key: "photo",
      render: (photo) => (
        <img
          src={`${API_BASE_URL}${photo}`}
          alt="banner"
          style={{ width: "100px", marginRight: "10px" }}
        />
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div>
          <Button  icon={<CiEdit  style={{ fontSize: '22px' }}/>} type="link" onClick={() => showModal(record)}>
            {/* Edit */}
          </Button>
          <Popconfirm
            title="Are you sure delete this banner?"
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
        <h1 className="text-2xl font-bold">All Banners</h1>
        <Button
          type="primary"
          onClick={() => {
            setEditingBanner(null); // Reset editing banner
            setVisible(true);
          }}
          style={{ marginBottom: 16 }}
        >
          <PlusOutlined /> Create Banner
        </Button>
      </div>

      <Table columns={columns} dataSource={banners} rowKey="_id"  scroll={{ x: 800 }}/>

      <CreateAndEditBanner
        visible={visible}
        setVisible={setVisible}
        fetchBanners={fetchBanners}
        // bannerCategories={bannerCategories}
        editingBanner={editingBanner} // Pass the editing banner
      />
    </div>
  );
};

export default BannersComponent;

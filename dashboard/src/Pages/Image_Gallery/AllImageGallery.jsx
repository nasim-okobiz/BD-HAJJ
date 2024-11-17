// src/components/ImageGallerysComponent.js

import React, { useEffect, useState } from "react";
import { Table, Button, message, Popconfirm } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axiosInstance from "../../Components/Axios";
import { API_BASE_URL } from "../../Components/config";
import CreateAndEditImageGallery from "./CreateAndEditImageGallery";
import { CiEdit } from "react-icons/ci";
import { MdOutlineViewInAr } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
const ImageGallerysComponent = () => {
  const [imageGallerys, setImageGallerys] = useState([]);
  const [imageGalleryCategories, setImageGalleryCategories] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editingImageGallery, setEditingImageGallery] = useState(null); // State for the imageGallery being edited

  useEffect(() => {
    fetchImageGallerys();
  }, []);

  const fetchImageGallerys = async () => {
    try {
      const response = await axiosInstance.get("/image-gallery");
      setImageGallerys(response?.data?.data);
    } catch (error) {
      message.error("Failed to fetch imageGallerys.");
    }
  };



  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/image-gallery/${id}`);
      message.success("ImageGallery deleted successfully.");
      fetchImageGallerys();
    } catch (error) {
      message.error( error?.response?.data?.message);
    }
  };

  const showModal = (imageGallery) => {
    setEditingImageGallery(imageGallery);
    setVisible(true);
  };

  const columns = [
    {
      title: "Gallery Type", 
      dataIndex: "galleryType",
      key: "galleryType",
    },
    {
      title: "Photos",
      dataIndex: "photo",
      key: "photo",
      render: (photo) => (
        <img
          src={`${API_BASE_URL}${photo}`}
          alt="imageGallery"
          style={{ width: "100px", marginRight: "10px" }}
        />
      ),
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
            title="Are you sure delete this imageGallery?"
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
        <h1 className="text-2xl font-bold">All ImageGallerys</h1>
        <Button
          type="primary"
          onClick={() => {
            setEditingImageGallery(null); // Reset editing imageGallery
            setVisible(true);
          }}
          style={{ marginBottom: 16 }}
        >
          <PlusOutlined /> Create ImageGallery
        </Button>
      </div>

      <Table columns={columns} dataSource={imageGallerys} rowKey="_id" scroll={{ x: 800 }}/>

      <CreateAndEditImageGallery
        visible={visible}
        setVisible={setVisible}
        fetchImageGallerys={fetchImageGallerys}
        imageGalleryCategories={imageGalleryCategories}
        editingImageGallery={editingImageGallery} // Pass the editing imageGallery
      />
    </div>
  );
};

export default ImageGallerysComponent;

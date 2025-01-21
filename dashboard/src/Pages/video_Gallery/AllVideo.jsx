// src/components/VideoComponent.js

import React, { useEffect, useState } from "react";
import { Table, Button, message, Popconfirm } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axiosInstance from "../../Components/Axios";
import { API_BASE_URL } from "../../Components/config";
import CreateAndEditFaq from "./CreateAndEditVideo";
import { CiEdit } from "react-icons/ci";
import { MdOutlineViewInAr } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";


const VideoComponent = () => {
  const [videos, setVideos] = useState([]);
  const [videoCategories, setVideoCategories] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editingVideo, setEditingVideo] = useState(null); // State for the video being edited

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axiosInstance.get("/video-gallery");
      setVideos(response?.data?.data);
    } catch (error) {
      message.error( error?.response?.data?.message);
    }
  };


  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/video-gallery/${id}`);
      message.success("Video deleted successfully.");
      fetchVideos();
    } catch (error) {
      message.error("Failed to delete video.");
    }
  };

  const showModal = (video) => {
    setEditingVideo(video);
    setVisible(true);
  };

  const columns = [
    {
      title: "Video",
      dataIndex: "video",
      key: "video",
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
            title="Are you sure delete this video?"
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
        <h1 className="text-2xl font-bold">All Videos</h1>
        <Button
          type="primary"
          onClick={() => {
            setEditingVideo(null); // Reset editing video
            setVisible(true);
          }}
          style={{ marginBottom: 16 }}
        >
          <PlusOutlined /> Create Video
        </Button>
      </div>

      <Table columns={columns} dataSource={videos} rowKey="_id" scroll={{ x: 800 }}/>

      <CreateAndEditFaq
        visible={visible}
        setVisible={setVisible}
        fetchVideos={fetchVideos}
        editingVideo={editingVideo} // Pass the editing video
      />
    </div>
  );
};

export default VideoComponent;

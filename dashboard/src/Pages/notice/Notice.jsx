// src/components/NoticeComponent.js

import React, { useEffect, useState } from "react";
import { Table, Button, message, Popconfirm } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axiosInstance from "../../Components/Axios";
import { API_BASE_URL } from "../../Components/config";
import CreateAndEditFaq from "./CreateAndEditNotice";
import { CiEdit } from "react-icons/ci";
import { MdOutlineViewInAr } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";


const NoticeComponent = () => {
  const [notices, setNotices] = useState([]);
  const [noticeCategories, setNoticeCategories] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null); // State for the notice being edited

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const response = await axiosInstance.get("/notice");
      setNotices(response?.data?.data);
    } catch (error) {
      message.error( error?.response?.data?.message);
    }
  };
console.log(notices)


  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/notice/${id}`);
      message.success("Notice deleted successfully.");
      fetchNotices();
    } catch (error) {
      message.error("Failed to delete notice.");
    }
  };

  const showModal = (notice) => {
    setEditingNotice(notice);
    setVisible(true);
  };

  const columns = [
    {
      title: "Notice",
      dataIndex: "notice",
      key: "notice",
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
            title="Are you sure delete this notice?"
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
        <h1 className="text-2xl font-bold">Notices</h1>
        <Button
          type="primary"
          onClick={() => {
            setEditingNotice(null); // Reset editing notice
            setVisible(true);
          }}
          style={{ marginBottom: 16 }}
        >
          <PlusOutlined /> Create Notice
        </Button>
      </div>

      <Table columns={columns} dataSource={notices} rowKey="_id" scroll={{ x: 800 }}/>

      <CreateAndEditFaq
        visible={visible}
        setVisible={setVisible}
        fetchNotices={fetchNotices}
        editingNotice={editingNotice} // Pass the editing notice
      />
    </div>
  );
};

export default NoticeComponent;

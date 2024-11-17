// src/components/JoinUssComponent.js

import React, { useEffect, useState } from "react";
import { Table, Button, message, Popconfirm } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axiosInstance from "../../Components/Axios";
import { API_BASE_URL } from "../../Components/config";
import CreateAndEditJoinUs from "./CreateAndEditJoinUs";
import { CiEdit } from "react-icons/ci";
import { MdOutlineViewInAr } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";

const JoinUssComponent = () => {
  const [joinUss, setJoinUss] = useState([]);
  const [joinUsCategories, setJoinUsCategories] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editingJoinUs, setEditingJoinUs] = useState(null); // State for the joinUs being edited

  useEffect(() => {
    fetchJoinUss();
  }, []);

  const fetchJoinUss = async () => {
    try {
      const response = await axiosInstance.get("/join-us");
      setJoinUss(response?.data?.data);
    } catch (error) {
      message.error("Failed to fetch joinUss.");
    }
  };


  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/join-us/${id}`);
      message.success("JoinUs deleted successfully.");
      fetchJoinUss();
    } catch (error) {
      message.error("Failed to delete joinUs.");
    }
  };

  const showModal = (joinUs) => {
    setEditingJoinUs(joinUs);
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
      title: "Condition",
      dataIndex: "condition",
      key: "condition",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Photos",
      dataIndex: "photo",
      key: "photo",
      render: (photo) => (
        <img
          src={`${API_BASE_URL}${photo}`}
          alt="joinUs"
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
            title="Are you sure delete this joinUs?"
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
        <h1 className="text-2xl font-bold">All JoinUss</h1>
        <Button
          type="primary"
          onClick={() => {
            setEditingJoinUs(null); // Reset editing joinUs
            setVisible(true);
          }}
          style={{ marginBottom: 16 }}
        >
          <PlusOutlined /> Create JoinUs
        </Button>
      </div>

      <Table columns={columns} dataSource={joinUss} rowKey="_id" scroll={{ x: 800 }}/>

      <CreateAndEditJoinUs
        visible={visible}
        setVisible={setVisible}
        fetchJoinUss={fetchJoinUss}
        editingJoinUs={editingJoinUs} // Pass the editing joinUs
      />
    </div>
  );
};

export default JoinUssComponent;

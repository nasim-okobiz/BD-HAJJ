// src/components/MembershipInfoComponent.js

import React, { useEffect, useState } from "react";
import { Table, Button, message, Popconfirm } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axiosInstance from "../../Components/Axios";
import { API_BASE_URL } from "../../Components/config";
import CreateAndEditMembershipInfo from "./CreateAndEditMembershipInfo";
import { CiEdit } from "react-icons/ci";
import { MdOutlineViewInAr } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";


const MembershipInfoComponent = () => {
  const [notices, setMembershipInfos] = useState([]);
  const [noticeCategories, setMembershipInfoCategories] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editingMembershipInfo, setEditingMembershipInfo] = useState(null); // State for the membershipInfo being edited

  useEffect(() => {
    fetchMembershipInfos();
  }, []);

  const fetchMembershipInfos = async () => {
    try {
      const response = await axiosInstance.get("/membershipinfo");

      setMembershipInfos(response?.data?.data);
    } catch (error) {
      message.error(error?.response?.data?.message);
    }
  };


  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/membershipinfo/${id}`);
      message.success("MembershipInfo deleted successfully.");
      fetchMembershipInfos();
    } catch (error) {
      message.error("Failed to delete membershipInfo.");
    }
  };

  const showModal = (membershipInfo) => {
    setEditingMembershipInfo(membershipInfo);
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
      title: "Detail",
      dataIndex: "detail",
      key: "detail",
    },
    {
      title: "Photos",
      dataIndex: "photo",
      key: "photo",
      render: (photo) => (
        <img
          src={`${API_BASE_URL}${photo}`}
          alt=""
        />
      ),
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div>
          <Button icon={<CiEdit style={{ fontSize: '22px' }} />} type="link" onClick={() => showModal(record)}>
            {/* Edit */}
          </Button>
          <Popconfirm
            title="Are you sure delete this membershipInfo?"
            onConfirm={() => handleDelete(record?._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<AiOutlineDelete style={{ fontSize: '22px' }} />} type="link" danger>
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
        <h1 className="text-2xl font-bold">Membership Document</h1>
        <Button
          type="primary"
          onClick={() => {
            setEditingMembershipInfo(null); // Reset editing membershipInfo
            setVisible(true);
          }}
          style={{ marginBottom: 16 }}
        >
          <PlusOutlined /> Create Membership Document
        </Button>
      </div>

      <Table columns={columns} dataSource={notices} rowKey="_id" scroll={{ x: 800 }} />

      <CreateAndEditMembershipInfo
        visible={visible}
        setVisible={setVisible}
        fetchMembershipInfos={fetchMembershipInfos}
        editingMembershipInfo={editingMembershipInfo} // Pass the editing membershipInfo
      />
    </div>
  );
};

export default MembershipInfoComponent;

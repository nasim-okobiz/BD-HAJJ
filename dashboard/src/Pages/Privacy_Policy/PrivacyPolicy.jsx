// src/components/PrivacyPolicyComponent.js

import React, { useEffect, useState } from "react";
import { Table, Button, message, Popconfirm } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axiosInstance from "../../Components/Axios";
import { API_BASE_URL } from "../../Components/config";
import CreateAndEditFaq from "./CreateAndEditPrivacyPolicy";
import { CiEdit } from "react-icons/ci";
import { MdOutlineViewInAr } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";


const PrivacyPolicyComponent = () => {
  const [privacyPolicys, setPrivacyPolicys] = useState([]);
  const [privacyPolicyCategories, setPrivacyPolicyCategories] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editingPrivacyPolicy, setEditingPrivacyPolicy] = useState(null); // State for the privacyPolicy being edited

  useEffect(() => {
    fetchPrivacyPolicys();
  }, []);

  const fetchPrivacyPolicys = async () => {
    try {
      const response = await axiosInstance.get("/policy/privacy-policy");
      setPrivacyPolicys(response?.data?.data);
    } catch (error) {
      message.error( error?.response?.data?.message);
    }
  };


  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/policy/privacy-policy/${id}`);
      message.success("PrivacyPolicy deleted successfully.");
      fetchPrivacyPolicys();
    } catch (error) {
      message.error("Failed to delete privacyPolicy.");
    }
  };

  const showModal = (privacyPolicy) => {
    setEditingPrivacyPolicy(privacyPolicy);
    setVisible(true);
  };

  const columns = [
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
      render: (details) => (
        <div dangerouslySetInnerHTML={{ __html: details }} />
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
            title="Are you sure delete this privacyPolicy?"
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
        <h1 className="text-2xl font-bold">PrivacyPolicys</h1>
        <Button
          type="primary"
          onClick={() => {
            setEditingPrivacyPolicy(null); // Reset editing privacyPolicy
            setVisible(true);
          }}
          style={{ marginBottom: 16 }}
        >
          <PlusOutlined /> Create PrivacyPolicy
        </Button>
      </div>

      <Table columns={columns} dataSource={privacyPolicys} rowKey="_id" scroll={{ x: 800 }}/>

      <CreateAndEditFaq
        visible={visible}
        setVisible={setVisible}
        fetchPrivacyPolicys={fetchPrivacyPolicys}
        editingPrivacyPolicy={editingPrivacyPolicy} // Pass the editing privacyPolicy
      />
    </div>
  );
};

export default PrivacyPolicyComponent;

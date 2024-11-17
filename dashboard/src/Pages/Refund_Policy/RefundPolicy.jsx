// src/components/RefundPolicyComponent.js

import React, { useEffect, useState } from "react";
import { Table, Button, message, Popconfirm } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axiosInstance from "../../Components/Axios";
import { API_BASE_URL } from "../../Components/config";
import CreateAndEditFaq from "./CreateAndEditRefundPolicy";
import { CiEdit } from "react-icons/ci";
import { MdOutlineViewInAr } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";


const RefundPolicyComponent = () => {
  const [refundPolicys, setRefundPolicys] = useState([]);
  const [refundPolicyCategories, setRefundPolicyCategories] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editingRefundPolicy, setEditingRefundPolicy] = useState(null); // State for the refundPolicy being edited

  useEffect(() => {
    fetchRefundPolicys();
  }, []);

  const fetchRefundPolicys = async () => {
    try {
      const response = await axiosInstance.get("/policy/refund-policy");
      setRefundPolicys(response?.data?.data);
    } catch (error) {
      message.error( error?.response?.data?.message);
    }
  };
console.log(refundPolicys)


  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/policy/refund-policy/${id}`);
      message.success("RefundPolicy deleted successfully.");
      fetchRefundPolicys();
    } catch (error) {
      message.error("Failed to delete refundPolicy.");
    }
  };

  const showModal = (refundPolicy) => {
    setEditingRefundPolicy(refundPolicy);
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
            title="Are you sure delete this refundPolicy?"
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
        <h1 className="text-2xl font-bold">RefundPolicys</h1>
        <Button
          type="primary"
          onClick={() => {
            setEditingRefundPolicy(null); // Reset editing refundPolicy
            setVisible(true);
          }}
          style={{ marginBottom: 16 }}
        >
          <PlusOutlined /> Create RefundPolicy
        </Button>
      </div>

      <Table columns={columns} dataSource={refundPolicys} rowKey="_id" scroll={{ x: 800 }}/>

      <CreateAndEditFaq
        visible={visible}
        setVisible={setVisible}
        fetchRefundPolicys={fetchRefundPolicys}
        editingRefundPolicy={editingRefundPolicy} // Pass the editing refundPolicy
      />
    </div>
  );
};

export default RefundPolicyComponent;

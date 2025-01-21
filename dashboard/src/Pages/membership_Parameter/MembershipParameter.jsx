// src/components/MembershipParameterComponent.js

import React, { useEffect, useState } from "react";
import { Table, Button, message, Popconfirm } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axiosInstance from "../../Components/Axios";
import { API_BASE_URL } from "../../Components/config";
import CreateAndEditMembershipParameter from "./CreateAndEditMembershipParameter";
import { CiEdit } from "react-icons/ci";
import { MdOutlineViewInAr } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";


const MembershipParameterComponent = () => {
  const [notices, setMembershipParameters] = useState([]);
  const [noticeCategories, setMembershipParameterCategories] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editingMembershipParameter, setEditingMembershipParameter] = useState(null); // State for the membershipParameter being edited

  useEffect(() => {
    fetchMembershipParameters();
  }, []);

  const fetchMembershipParameters = async () => {
    try {
      const response = await axiosInstance.get("/membership-parameter");
      setMembershipParameters(response?.data?.data);
    } catch (error) {
      message.error(error?.response?.data?.message);
    }
  };


  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/membership-parameter/${id}`);
      message.success("MembershipParameter deleted successfully.");
      fetchMembershipParameters();
    } catch (error) {
      message.error("Failed to delete membershipParameter.");
    }
  };

  const showModal = (membershipParameter) => {
    setEditingMembershipParameter(membershipParameter);
    setVisible(true);
  };

  const columns = [
    {
      title: "Particular",
      dataIndex: "particular",
      key: "particular",
    },
    {
      title: "Diamoand",
      dataIndex: "diamoan",
      key: "diamoan",
    },
    {
      title: "Gold",
      dataIndex: "gold",
      key: "gold",
    },
    {
      title: "Silver",
      dataIndex: "silver",
      key: "silver",
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
            title="Are you sure delete this membershipParameter?"
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
        <h1 className="text-2xl font-bold">Membership Parameters</h1>
        <Button
          type="primary"
          onClick={() => {
            setEditingMembershipParameter(null); // Reset editing membershipParameter
            setVisible(true);
          }}
          style={{ marginBottom: 16 }}
        >
          <PlusOutlined /> Create Membership Parameter
        </Button>
      </div>

      <Table columns={columns} dataSource={notices} rowKey="_id" scroll={{ x: 800 }} />

      <CreateAndEditMembershipParameter
        visible={visible}
        setVisible={setVisible}
        fetchMembershipParameters={fetchMembershipParameters}
        editingMembershipParameter={editingMembershipParameter} // Pass the editing membershipParameter
      />
    </div>
  );
};

export default MembershipParameterComponent;

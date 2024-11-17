// src/components/ContactInfosComponent.js

import React, { useEffect, useState } from "react";
import { Table, Button, message, Popconfirm } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axiosInstance from "../../Components/Axios";
import { API_BASE_URL } from "../../Components/config";
import CreateAndEditContactInfo from "./CreateAndEditContactInfo";
import { CiEdit } from "react-icons/ci";
import { MdOutlineViewInAr } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";

const ContactInfosComponent = () => {
  const [contactInfos, setContactInfos] = useState([]);
  const [contactInfoCategories, setContactInfoCategories] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editingContactInfo, setEditingContactInfo] = useState(null); // State for the contactInfo being edited

  useEffect(() => {
    fetchContactInfos();
    // fetchContactInfoCategories();
  }, []);

  const fetchContactInfos = async () => {
    try {
      const response = await axiosInstance.get("/contact-info");
      setContactInfos(response?.data?.data);
    } catch (error) {
      message.error("Failed to fetch contactInfos.");
    }
  };



  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/contact-info/${id}`);
      message.success("ContactInfo deleted successfully.");
      fetchContactInfos();
    } catch (error) {
      message.error( error?.response?.data?.message);
    }
  };

  const showModal = (contactInfo) => {
    setEditingContactInfo(contactInfo);
    setVisible(true);
  };

  const columns = [
    {
      title: "Agency Name",
      dataIndex: "agencyName",
      key: "agencyName",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (addresses) => addresses.join(", "), // Convert array to a string
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (emails) => emails.join(", "), // Convert array to a string
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
      render: (phones) => phones.join(", "), // Convert array to a string
    },
    {
      title: "Whats App",
      dataIndex: "whatsapp",
      key: "whatsapp",
      render: (whatsapps) => whatsapps.join(", "), // Convert array to a string
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
            title="Are you sure delete this contactInfo?"
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
        <h1 className="text-2xl font-bold">All ContactInfos</h1>
        <Button
          type="primary"
          onClick={() => {
            setEditingContactInfo(null); // Reset editing contactInfo
            setVisible(true);
          }}
          style={{ marginBottom: 16 }}
        >
          <PlusOutlined /> Create ContactInfo
        </Button>
      </div>

      <Table columns={columns} dataSource={contactInfos} rowKey="_id"  scroll={{ x: 800 }}/>

      <CreateAndEditContactInfo
        visible={visible}
        setVisible={setVisible}
        fetchContactInfos={fetchContactInfos}
        contactInfoCategories={contactInfoCategories}
        editingContactInfo={editingContactInfo} // Pass the editing contactInfo
      />
    </div>
  );
};

export default ContactInfosComponent;

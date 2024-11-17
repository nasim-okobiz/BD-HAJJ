// src/components/ContactUsComponent.js

import React, { useEffect, useState } from "react";
import { Table, Button, message, Popconfirm } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axiosInstance from "../../Components/Axios";
import { API_BASE_URL } from "../../Components/config";
import { CiEdit } from "react-icons/ci";
import { MdOutlineViewInAr } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";


const ContactUsComponent = () => {
  const [contactUss, setContactUss] = useState([]);
  const [contactUsCategories, setContactUsCategories] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editingContactUs, setEditingContactUs] = useState(null); // State for the contactUs being edited

  useEffect(() => {
    fetchContactUss();
  }, []);

  const fetchContactUss = async () => {
    try {
      const response = await axiosInstance.get("/contact-us");
      setContactUss(response?.data?.data);
    } catch (error) {
      message.error("Failed to fetch contactUss.");
    }
  };
console.log(contactUss)


  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/contact-us/${id}`);
      message.success("ContactUs deleted successfully.");
      fetchContactUss();
    } catch (error) {
      message.error( error?.response?.data?.message);
    }
  };

  const showModal = (contactUs) => {
    setEditingContactUs(contactUs);
    setVisible(true);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Details",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Massage",
      dataIndex: "massage",
      key: "massage",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div>
          <Popconfirm
            title="Are you sure delete this contactUs?"
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
        <h1 className="text-2xl font-bold">All Contact Us</h1>
      </div>

      <Table columns={columns} dataSource={contactUss} rowKey="_id" scroll={{ x: 800 }}/>

      {/* <CreateAndEditFaq
        visible={visible}
        setVisible={setVisible}
        fetchContactUss={fetchContactUss}
        editingContactUs={editingContactUs} // Pass the editing contactUs
      /> */}
    </div>
  );
};

export default ContactUsComponent;

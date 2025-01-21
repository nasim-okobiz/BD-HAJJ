// src/components/FAQComponent.js

import React, { useEffect, useState } from "react";
import { Table, Button, message, Popconfirm } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axiosInstance from "../../Components/Axios";
import { API_BASE_URL } from "../../Components/config";
import CreateAndEditFaq from "./CreateAndEditFAQ";
import { CiEdit } from "react-icons/ci";
import { MdOutlineViewInAr } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";


const FAQComponent = () => {
  const [faqs, setFAQs] = useState([]);
  const [faqCategories, setFAQCategories] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editingFAQ, setEditingFAQ] = useState(null); // State for the faq being edited

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const response = await axiosInstance.get("/faq");
      setFAQs(response?.data?.data);
    } catch (error) {
      message.error( error?.response?.data?.message);
    }
  };



  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/faq/${id}`);
      message.success("FAQ deleted successfully.");
      fetchFAQs();
    } catch (error) {
      message.error("Failed to delete faq.");
    }
  };

  const showModal = (faq) => {
    setEditingFAQ(faq);
    setVisible(true);
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Details",
      dataIndex: "details",
      key: "details",
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
            title="Are you sure delete this faq?"
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
        <h1 className="text-2xl font-bold">All FAQs</h1>
        <Button
          type="primary"
          onClick={() => {
            setEditingFAQ(null); // Reset editing faq
            setVisible(true);
          }}
          style={{ marginBottom: 16 }}
        >
          <PlusOutlined /> Create FAQ
        </Button>
      </div>

      <Table columns={columns} dataSource={faqs} rowKey="_id" scroll={{ x: 800 }}/>

      <CreateAndEditFaq
        visible={visible}
        setVisible={setVisible}
        fetchFAQs={fetchFAQs}
        editingFAQ={editingFAQ} // Pass the editing faq
      />
    </div>
  );
};

export default FAQComponent;

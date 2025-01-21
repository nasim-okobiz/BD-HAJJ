// src/components/CreateAndEditFAQ.js

import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axiosInstance from "../../Components/Axios";
import { API_BASE_URL } from "../../Components/config";
const { Option } = Select;

const CreateAndEditFaq = ({ visible, setVisible, fetchFAQs,  editingFAQ }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingFAQ) {
      form.setFieldsValue({
        title: editingFAQ.title,
        details: editingFAQ.details,
      });
    } else {
      form.resetFields();
    }
  }, [editingFAQ, form, visible]);

  const handleCreateOrEdit = async (values) => {

    try {
      if (editingFAQ) {
        await axiosInstance.put(`/faq/${editingFAQ._id}`, values);
        message.success("FAQ updated successfully.");
      } else {
        await axiosInstance.post("/faq", values);
        message.success("FAQ created successfully.");
      }

      setVisible(false);
      fetchFAQs();
    } catch (error) {
      message.error( error?.response?.data?.message);
    }
  };



  return (
    <Modal
      visible={visible}
      title={editingFAQ ? "Edit FAQ" : "Create FAQ"}
      onCancel={() => setVisible(false)}
      onOk={() => form.submit()}
    >
      <Form form={form} layout="vertical" onFinish={handleCreateOrEdit}>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please input the faq title!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="details"
          label="Details"
          rules={[{ required: true, message: "Please input the faq Details!" }]}
        >
          <Input />
        </Form.Item>


      </Form>
    </Modal>
  );
};



export default CreateAndEditFaq;

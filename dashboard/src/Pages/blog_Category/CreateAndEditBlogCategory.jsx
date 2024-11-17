// src/components/CreateAndEditBlogCategory.js

import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axiosInstance from "../../Components/Axios";
import { API_BASE_URL } from "../../Components/config";
const { Option } = Select;

const CreateAndEditBlogCategory = ({ visible, setVisible, fetchBlogCategorys,  editingBlogCategory }) => {
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingBlogCategory) {
      form.setFieldsValue({
        name: editingBlogCategory.name,
      });
    } else {
      form.resetFields();
      setFileList([]);
    }
  }, [editingBlogCategory, form, visible]);

  const handleCreateOrEdit = async (values) => {
    console.log("Form Values:", values);

    try {
      if (editingBlogCategory) {
        await axiosInstance.put(`/blog-category/${editingBlogCategory._id}`, values);
        message.success("BlogCategory updated successfully.");
      } else {
        await axiosInstance.post("/blog-category", values);
        message.success("BlogCategory created successfully.");
      }

      setVisible(false);
      fetchBlogCategorys();
    } catch (error) {
      message.error( error?.response?.data?.message);
    }
  };

  const handleFileChange = ({ fileList: newFileList }) => {
    if (newFileList.length > 0) {
      setFileList([newFileList[newFileList.length - 1]]);
    }
  };

  return (
    <Modal
      visible={visible}
      name={editingBlogCategory ? "Edit BlogCategory" : "Create BlogCategory"}
      onCancel={() => setVisible(false)}
      onOk={() => form.submit()}
    >
      <Form form={form} layout="vertical" onFinish={handleCreateOrEdit}>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please input the blog Category name!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};



export default CreateAndEditBlogCategory;

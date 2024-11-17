// src/components/CreateAndEditMembership.js

import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axiosInstance from "../../Components/Axios";
import { API_BASE_URL } from "../../Components/config";
const { Option } = Select;

const CreateAndEditMembership = ({ visible, setVisible, fetchMemberships, membershipCategories, editingMembership }) => {
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingMembership) {
      form.setFieldsValue({
        title: editingMembership.title,
        description: editingMembership.description,
        textEditor: editingMembership.textEditor,
        category: editingMembership.membershipCategoryRef?._id,
      });
      setFileList(editingMembership.photo ? [{ url: API_BASE_URL + editingMembership.photo, originFileObj: null }] : []);
    } else {
      form.resetFields();
      setFileList([]);
    }
  }, [editingMembership, form, visible]);

  const handleCreateOrEdit = async (values) => {
    console.log("Form Values:", values);

    try {
      const formData = new FormData();


      for (const key in values) {
        if (key === "category") {
          if (values.category !== undefined) {
            formData.append("membershipCategoryRef", values.category);
          }
        } else {
          formData.append(key, values[key]);
        }
      }


      if (fileList.length > 0) {
        fileList.forEach(file => {
          if (file.originFileObj) {
            formData.append("photo", file.originFileObj); // Append uploaded photo
          }
        });
      }

      if (editingMembership) {
        await axiosInstance.put(`/membership/${editingMembership._id}`, formData);
        message.success("Membership updated successfully.");
      } else {
        await axiosInstance.post("/membership", formData);
        message.success("Membership created successfully.");
      }

      setVisible(false);
      fetchMemberships();
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
      title={editingMembership ? "Edit Membership" : "Create Membership"}
      onCancel={() => setVisible(false)}
      onOk={() => form.submit()}
    >
      <Form form={form} layout="vertical" onFinish={handleCreateOrEdit}>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please input the membership title!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please input the membership Description!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="textEditor"
          label="Content"
          rules={[{ required: true, message: "Please input the membership content!" }]}
        >
          <ReactQuill />
        </Form.Item>

        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: "Please select a category!" }]}
        >
          <Select placeholder="Select a category">
            {membershipCategories?.map((category) => (
              <Option key={category._id} value={category._id}>
                {category?.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="photo" label="Upload Photo">
          <Upload
            listType="picture"
            fileList={fileList}
            onChange={handleFileChange}
            beforeUpload={() => false} // Prevent automatic upload
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};



export default CreateAndEditMembership;

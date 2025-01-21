// src/components/CreateAndEditPackageType.js

import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axiosInstance from "../../Components/Axios";
import { API_BASE_URL } from "../../Components/config";
const { Option } = Select;

const CreateAndEditPackageType = ({ visible, setVisible, fetchPackageTypes, editingPackageType }) => {
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingPackageType) {
      form.setFieldsValue({
        name: editingPackageType.name,
        priority: editingPackageType.priority,
      });
    } else {
      form.resetFields();
    }
  }, [editingPackageType, form, visible]);
     
  const handleCreateOrEdit = async (values) => {

    try {
      if (editingPackageType) {
        await axiosInstance.put(`/package-type/${editingPackageType._id}`, values);
        message.success("PackageType updated successfully.");
      } else {
        await axiosInstance.post("/package-type", values);
        message.success("PackageType created successfully.");
      }

      setVisible(false);
      fetchPackageTypes();
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
      title={editingPackageType ? "Edit PackageType" : "Create PackageType"}
      onCancel={() => setVisible(false)}
      onOk={() => form.submit()}
    >
      <Form form={form} layout="vertical" onFinish={handleCreateOrEdit}>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please input the packageType name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="priority"
          label="Priority"
          rules={[{ required: true, message: "Please input the packageType priority!" }]}
        >
          <Input />
        </Form.Item>




      </Form>
    </Modal>
  );
};



export default CreateAndEditPackageType;

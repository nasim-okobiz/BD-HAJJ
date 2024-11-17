// src/components/CreateAndEditBanner.js

import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axiosInstance from "../../Components/Axios";
import { API_BASE_URL } from "../../Components/config";
const { Option } = Select;

const CreateAndEditBanner = ({ visible, setVisible, fetchBanners, bannerCategories, editingBanner }) => {
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingBanner) {
      form.setFieldsValue({
      });
      setFileList(editingBanner.photo ? [{ url: API_BASE_URL + editingBanner.photo, originFileObj: null }] : []);
    } else {
      form.resetFields();
      setFileList([]);
    }
  }, [editingBanner, form, visible]);

  const handleCreateOrEdit = async (values) => {
    console.log("Form Values:", values);

    try {
      const formData = new FormData();
      if (fileList.length > 0) {
        fileList.forEach(file => {
          if (file.originFileObj) {
            formData.append("photo", file.originFileObj); // Append uploaded photo
          }
        });
      }

      if (editingBanner) {
        await axiosInstance.put(`/banner/${editingBanner._id}`, formData);
        message.success("Banner updated successfully.");
      } else {
        await axiosInstance.post("/banner", formData);
        message.success("Banner created successfully.");
      }

      setVisible(false);
      fetchBanners();
    } catch (error) {
      message.error(error?.response?.data?.message);
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
      title={editingBanner ? "Edit Banner" : "Create Banner"}
      onCancel={() => setVisible(false)}
      onOk={() => form.submit()}
    >
      <Form form={form} layout="vertical" onFinish={handleCreateOrEdit}>
        <Form.Item name="photo" label="Upload Photo Size(1600px x 600px)">
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



export default CreateAndEditBanner;

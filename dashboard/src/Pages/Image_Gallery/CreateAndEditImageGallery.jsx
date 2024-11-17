// src/components/CreateAndEditImageGallery.js

import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axiosInstance from "../../Components/Axios";
import { API_BASE_URL } from "../../Components/config";
const { Option } = Select;

const CreateAndEditImageGallery = ({ visible, setVisible, fetchImageGallerys,  editingImageGallery }) => {
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingImageGallery) {
      form.setFieldsValue({
        galleryType: editingImageGallery.galleryType,

      });
      setFileList(editingImageGallery.photo ? [{ url: API_BASE_URL + editingImageGallery.photo, originFileObj: null }] : []);
    } else {
      form.resetFields();
      setFileList([]);
    }
  }, [editingImageGallery, form, visible]);

  const handleCreateOrEdit = async (values) => {
    console.log("Form Values:", values);

    try {
      const formData = new FormData();


      for (const key in values) {
          formData.append(key, values[key]);
      }


      if (fileList.length > 0) {
        fileList.forEach(file => {
          if (file.originFileObj) {
            formData.append("photo", file.originFileObj); // Append uploaded photo
          }
        });
      }

      if (editingImageGallery) {
        await axiosInstance.put(`/image-gallery/${editingImageGallery._id}`, formData);
        message.success("ImageGallery updated successfully.");
      } else {
        await axiosInstance.post("/image-gallery", formData);
        message.success("ImageGallery created successfully.");
      }

      setVisible(false);
      fetchImageGallerys();
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
      title={editingImageGallery ? "Edit ImageGallery" : "Create ImageGallery"}
      onCancel={() => setVisible(false)}
      onOk={() => form.submit()}
    >
      <Form form={form} layout="vertical" onFinish={handleCreateOrEdit}>
      <Form.Item
  name="galleryType"
  label="GalleryType"
  rules={[{ required: true, message: "Please select the imageGallery gallery type!" }]}
>
  <Select placeholder="Select a gallery type">
    <Option value="Makka">Makka</Option>
    <Option value="Madina">Madina</Option>
    <Option value="Other">Other</Option>
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



export default CreateAndEditImageGallery;

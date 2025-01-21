import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axiosInstance from "../../Components/Axios";
import { API_BASE_URL } from "../../Components/config";

const CreateAndEditAboutUs = ({ visible, setVisible, fetchAboutUss, editingAboutUs }) => {
  const [photoFileList, setPhotoFileList] = useState([]);
  const [bgPhotoFileList, setBgPhotoFileList] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingAboutUs) {
      form.setFieldsValue({
        header: editingAboutUs.header,
        title: editingAboutUs.title,
        description: editingAboutUs.description,
        agencyName: editingAboutUs.agencyName,
        honorName: editingAboutUs.honorName,
        whatsApp: editingAboutUs.whatsApp,
        email: editingAboutUs.email,
      });

      setPhotoFileList(editingAboutUs.photo ? [{ url: API_BASE_URL + editingAboutUs.photo, originFileObj: null }] : []);
      setBgPhotoFileList(editingAboutUs.bgPhoto ? [{ url: API_BASE_URL + editingAboutUs.bgPhoto, originFileObj: null }] : []);
    } else {
      form.resetFields();
      setPhotoFileList([]);
      setBgPhotoFileList([]);
    }
  }, [editingAboutUs, form, visible]);

  const handleCreateOrEdit = async (values) => {

    try {
      const formData = new FormData();

      for (const key in values) {
        formData.append(key, values[key]);
      }

      if (photoFileList.length > 0) {
        photoFileList.forEach(file => {
          if (file.originFileObj) {
            formData.append("photo", file.originFileObj); 
          }
        });
      }
      if (bgPhotoFileList.length > 0) {
        bgPhotoFileList.forEach(file => {
          if (file.originFileObj) {
            formData.append("bgPhoto", file.originFileObj); 
          }
        });
      }


      if (editingAboutUs) {
        await axiosInstance.put(`/about-us/${editingAboutUs._id}`, formData);
        message.success("About Us updated successfully.");
      } else {
        await axiosInstance.post("/about-us", formData);
        message.success("About Us created successfully.");
      }

      setVisible(false);
      fetchAboutUss();
    } catch (error) {
      message.error( error?.response?.data?.message);
    }
  };

  const handlePhotoChange = ({ fileList: newFileList }) => {
    if (newFileList.length > 0) {
      setPhotoFileList([newFileList[newFileList.length - 1]]);
    } else {
      setPhotoFileList([]);
    }
  };

  const handleBgPhotoChange = ({ fileList: newFileList }) => {
    if (newFileList.length > 0) {
      setBgPhotoFileList([newFileList[newFileList.length - 1]]);
    } else {
      setBgPhotoFileList([]);
    }
  };

  return (
    <Modal
      visible={visible}
      title={editingAboutUs ? "Edit About Us" : "Create About Us"}
      onCancel={() => setVisible(false)}
      onOk={() => form.submit()}
    >
      <Form form={form} layout="vertical" onFinish={handleCreateOrEdit}>
      <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please input the About Us title!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="header"
          label="Header"
          rules={[{ required: true, message: "Please input the About Us header!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please input the About Us description!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="agencyName"
          label="Agency Name"
          rules={[{ required: true, message: "Please input the About Us agency name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="honorName"
          label="Honor Name"
          rules={[{ required: true, message: "Please input the About Us honor name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="whatsApp"
          label="WhatsApp"
          rules={[{ required: true, message: "Please input the About Us WhatsApp!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ required: true, message: "Please input the About Us email!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="photo" label="Upload Photo">
          <Upload
            listType="picture"
            fileList={photoFileList}
            onChange={handlePhotoChange}
            beforeUpload={() => false} // Prevent automatic upload
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item name="bgPhoto" label="Upload Background Photo">
          <Upload
            listType="picture"
            fileList={bgPhotoFileList}
            onChange={handleBgPhotoChange}
            beforeUpload={() => false} // Prevent automatic upload
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateAndEditAboutUs;

// src/components/CreateAndEditBooking.js

import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axiosInstance from "../../Components/Axios";
import { API_BASE_URL } from "../../Components/config";
const { Option } = Select;

const CreateAndEditBooking = ({ visible, setVisible, fetchBookings, editingBooking }) => {
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingBooking) {
      form.setFieldsValue({
        title: editingBooking.title,
        description: editingBooking.description,
        textEditor: editingBooking.textEditor,
        category: editingBooking.bookingCategoryRef?._id,
      });
      setFileList(editingBooking.photo ? [{ url: API_BASE_URL + editingBooking.photo, originFileObj: null }] : []);
    } else {
      form.resetFields();
      setFileList([]);
    }
  }, [editingBooking, form, visible]);

  const handleCreateOrEdit = async (values) => {
    console.log("Form Values:", values);

    try {
      const formData = new FormData();


      for (const key in values) {
        if (key === "category") {
          if (values.category !== undefined) {
            formData.append("bookingCategoryRef", values.category);
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

      if (editingBooking) {
        await axiosInstance.put(`/booking/${editingBooking._id}`, formData);
        message.success("Booking updated successfully.");
      } else {
        await axiosInstance.post("/booking", formData);
        message.success("Booking created successfully.");
      }

      setVisible(false);
      fetchBookings();
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
      title={editingBooking ? "Edit Booking" : "Create Booking"}
      onCancel={() => setVisible(false)}
      onOk={() => form.submit()}
    >
      <Form form={form} layout="vertical" onFinish={handleCreateOrEdit}>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please input the booking title!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please input the booking Description!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="textEditor"
          label="Content"
          rules={[{ required: true, message: "Please input the booking content!" }]}
        >
          <ReactQuill />
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



export default CreateAndEditBooking;

// src/components/CreateAndEditVideo.js

import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axiosInstance from "../../Components/Axios";
import { API_BASE_URL } from "../../Components/config";
const { Option } = Select;

const CreateAndEditFaq = ({ visible, setVisible, fetchVideos,  editingVideo }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingVideo) {
      form.setFieldsValue({
        video: editingVideo.video,
      });
    } else {
      form.resetFields();
    }
  }, [editingVideo, form, visible]);

  const handleCreateOrEdit = async (values) => {
    console.log("Form Values:", values);

    try {
      if (editingVideo) {
        await axiosInstance.put(`/video-gallery/${editingVideo._id}`, values);
        message.success("Video updated successfully.");
      } else {
        await axiosInstance.post("/video-gallery", values);
        message.success("Video created successfully.");
      }

      setVisible(false);
      fetchVideos();
    } catch (error) {
      message.error( error?.response?.data?.message);
    }
  };



  return (
    <Modal
      visible={visible}
      title={editingVideo ? "Edit Video" : "Create Video"}
      onCancel={() => setVisible(false)}
      onOk={() => form.submit()}
    >
      <Form form={form} layout="vertical" onFinish={handleCreateOrEdit}>

        <Form.Item
          name="video"
          label="Video"
          rules={[{ required: true, message: "Please input the video !" }]}
        >
          <Input />
        </Form.Item>


      </Form>
    </Modal>
  );
};



export default CreateAndEditFaq;

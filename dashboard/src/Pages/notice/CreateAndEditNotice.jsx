// src/components/CreateAndEditNotice.js

import React, { useState, useEffect, useRef } from "react";
import { Modal, Form, Input, Select, Upload, Button, message } from "antd";;
import "react-quill/dist/quill.snow.css";
import axiosInstance from "../../Components/Axios";
import JoditEditor from 'jodit-react';

const CreateAndEditFaq = ({ visible, setVisible, fetchNotices,  editingNotice }) => {
  const [form] = Form.useForm();
  const editor = useRef(null);
  const [content, setContent] = React.useState("");
  useEffect(() => {
    if (editingNotice) {
      form.setFieldsValue({
        notice: editingNotice.notice,
      });
    } else {
      form.resetFields();
    }
  }, [editingNotice, form, visible]);

  const handleCreateOrEdit = async (values) => {

    try {
      if (editingNotice) {
        await axiosInstance.put(`/notice/${editingNotice._id}`, values);
        message.success("Notice updated successfully.");
      } else {
        await axiosInstance.post("/notice", values);
        message.success("Notice created successfully.");
      }

      setVisible(false);
      fetchNotices();
    } catch (error) {
      message.error( error?.response?.data?.message);
    }
  };



  return (
    <Modal
      visible={visible}
      title={editingNotice ? "Edit Notice" : "Create Notice"}
      onCancel={() => setVisible(false)}
      onOk={() => form.submit()}
      width='50%'    >
      <Form form={form} layout="vertical" onFinish={handleCreateOrEdit}>
      <Form.Item
          name="notice"
          label="Notice"
          rules={[{ required: true, message: "Please input the Notice!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};



export default CreateAndEditFaq;

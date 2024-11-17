// src/components/CreateAndEditPrivacyPolicy.js

import React, { useState, useEffect, useRef } from "react";
import { Modal, Form, Input, Select, Upload, Button, message } from "antd";;
import "react-quill/dist/quill.snow.css";
import axiosInstance from "../../Components/Axios";
import JoditEditor from 'jodit-react';

const CreateAndEditFaq = ({ visible, setVisible, fetchPrivacyPolicys,  editingPrivacyPolicy }) => {
  const [form] = Form.useForm();
  const editor = useRef(null);
  const [content, setContent] = React.useState("");
  useEffect(() => {
    if (editingPrivacyPolicy) {
      form.setFieldsValue({
        details: editingPrivacyPolicy.details,
      });
    } else {
      form.resetFields();
    }
  }, [editingPrivacyPolicy, form, visible]);

  const handleCreateOrEdit = async (values) => {
    console.log("Form Values:", values);

    try {
      if (editingPrivacyPolicy) {
        await axiosInstance.put(`/policy/privacy-policy/${editingPrivacyPolicy._id}`, values);
        message.success("PrivacyPolicy updated successfully.");
      } else {
        await axiosInstance.post("/policy/privacy-policy", values);
        message.success("PrivacyPolicy created successfully.");
      }

      setVisible(false);
      fetchPrivacyPolicys();
    } catch (error) {
      message.error( error?.response?.data?.message);
    }
  };



  return (
    <Modal
      visible={visible}
      title={editingPrivacyPolicy ? "Edit PrivacyPolicy" : "Create PrivacyPolicy"}
      onCancel={() => setVisible(false)}
      onOk={() => form.submit()}
      width='70%'    >
      <Form form={form} layout="vertical" onFinish={handleCreateOrEdit}>
      <Form.Item
          name="details"
          label="Privacy Policy"
          rules={[{ required: true, message: "Please input your Privacy Policy!" }]}
        >
           <JoditEditor
        ref={editor}
        value={content}
        onChange={newContent => setContent(newContent)}
        config={{
          readonly: false, // Optional: set to true for read-only mode
          toolbarButtonSize: 'medium', // Optional: Customize toolbar size
          height: 400, // Optional: Height of the editor
        }}></JoditEditor>
        </Form.Item>
      </Form>
    </Modal>
  );
};



export default CreateAndEditFaq;

// src/components/CreateAndEditRefundPolicy.js

import React, { useState, useEffect, useRef } from "react";
import { Modal, Form, Input, Select, Upload, Button, message } from "antd";
import JoditEditor from 'jodit-react';
import "react-quill/dist/quill.snow.css";
import axiosInstance from "../../Components/Axios";


const CreateAndEditFaq = ({ visible, setVisible, fetchRefundPolicys,  editingRefundPolicy }) => {
  const [form] = Form.useForm();
  const editor = useRef(null);
  const [content, setContent] = React.useState("");
  useEffect(() => {
    if (editingRefundPolicy) {
      form.setFieldsValue({
        details: editingRefundPolicy.details,
      });
    } else {
      form.resetFields();
    }
  }, [editingRefundPolicy, form, visible]);

  const handleCreateOrEdit = async (values) => {

    try {
      if (editingRefundPolicy) {
        await axiosInstance.put(`/policy/refund-policy/${editingRefundPolicy._id}`, values);
        message.success("RefundPolicy updated successfully.");
      } else {
        await axiosInstance.post("/policy/refund-policy", values);
        message.success("RefundPolicy created successfully.");
      }

      setVisible(false);
      fetchRefundPolicys();
    } catch (error) {
      message.error( error?.response?.data?.message);
    }
  };



  return (
    <Modal
      visible={visible}
      title={editingRefundPolicy ? "Edit RefundPolicy" : "Create RefundPolicy"}
      onCancel={() => setVisible(false)}
      onOk={() => form.submit()}
      width='70%'    >
      <Form form={form} layout="vertical" onFinish={handleCreateOrEdit}>
      <Form.Item
          name="details"
          label="Refund Policy"
          rules={[{ required: true, message: "Please input your Refund Policy!" }]}
        >
          <JoditEditor
        ref={editor}
        value={content}
        onChange={newContent => setContent(newContent)}
        config={{
          readonly: false, // Optional: set to true for read-only mode
          toolbarButtonSize: 'medium', // Optional: Customize toolbar size
          height: 400, // Optional: Height of the editor
        }}
      />
        </Form.Item>
      </Form>
    </Modal>
  );
};



export default CreateAndEditFaq;

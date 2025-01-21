// src/components/CreateAndEditTramsCondition.js

import React, { useState, useEffect, useRef } from "react";
import { Modal, Form, Input, Select, Upload, Button, message } from "antd";;
import "react-quill/dist/quill.snow.css";
import axiosInstance from "../../Components/Axios";
import JoditEditor from 'jodit-react';

const TramsAndCondition = ({ visible, setVisible, fetchTermsAndConditionss, editingTermsAndConditions }) => {
  const [form] = Form.useForm();
  const editor = useRef(null);
  const [content, setContent] = React.useState("");
  useEffect(() => {
    if (editingTermsAndConditions) {
      form.setFieldsValue({
        details: editingTermsAndConditions.details,
      });
    } else {
      form.resetFields();
    }
  }, [editingTermsAndConditions, form, visible]);

  const handleCreateOrEdit = async (values) => {

    try {
      if (editingTermsAndConditions) {
        await axiosInstance.put(`/policy/terms-conditions/${editingTermsAndConditions._id}`, values);
        message.success("TramsCondition updated successfully.");
      } else {
        await axiosInstance.post("/policy/terms-conditions", values);
        message.success("TramsCondition created successfully.");
      }

      setVisible(false);
      fetchTermsAndConditionss();
    } catch (error) {
      message.error(error?.response?.data?.message);
    }
  };



  return (
    <Modal
      visible={visible}
      title={editingTermsAndConditions ? "Edit TramsCondition" : "Create TramsCondition"}
      onCancel={() => setVisible(false)}
      onOk={() => form.submit()}
      width='70%'    >
      <Form form={form} layout="vertical" onFinish={handleCreateOrEdit}>
        <Form.Item
          name="details"
          label="Trams And Condition"
          rules={[{ required: true, message: "Please input your Trams And Condition!" }]}
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



export default TramsAndCondition;

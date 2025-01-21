// src/components/CreateAndEditMembershipParameter.js

import React, { useState, useEffect, useRef } from "react";
import { Modal, Form, Input, Select, Upload, Button, message } from "antd";;
import "react-quill/dist/quill.snow.css";
import axiosInstance from "../../Components/Axios";
import JoditEditor from 'jodit-react';

const CreateAndEditMembershipParameter = ({ visible, setVisible, fetchMembershipParameters,  editingMembershipParameter }) => {
  const [form] = Form.useForm();
  const editor = useRef(null);
  const [content, setContent] = React.useState("");
  useEffect(() => {
    if (editingMembershipParameter) {
      form.setFieldsValue({
        particular: editingMembershipParameter.particular,
        diamoan: editingMembershipParameter.diamoan,
        gold: editingMembershipParameter.gold,
        silver: editingMembershipParameter.silver,
      });
    } else {
      form.resetFields();
    }
  }, [editingMembershipParameter, form, visible]);

  const handleCreateOrEdit = async (values) => {

    try {
      if (editingMembershipParameter) {
        await axiosInstance.put(`/membership-parameter/${editingMembershipParameter._id}`, values);
        message.success("MembershipParameter updated successfully.");
      } else {
        await axiosInstance.post("/membership-parameter", values);
        message.success("MembershipParameter created successfully.");
      }

      setVisible(false);
      fetchMembershipParameters();
    } catch (error) {
      message.error( error?.response?.data?.message);
    }
  };



  return (
    <Modal
      visible={visible}
      title={editingMembershipParameter ? "Edit MembershipParameter" : "Create MembershipParameter"}
      onCancel={() => setVisible(false)}
      onOk={() => form.submit()}
      width='50%'    >
      <Form form={form} layout="vertical" onFinish={handleCreateOrEdit}>
      <Form.Item
          name="particular"
          label="Particular"
          rules={[{ required: true, message: "Please input the Particular!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="diamoan"
          label="Diamoand"
          rules={[{ required: true, message: "Please input the Diamoand!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="gold"
          label="Gold"
          rules={[{ required: true, message: "Please input the Gold!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="silver"
          label="Silver"
          rules={[{ required: true, message: "Please input the Silver!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};



export default CreateAndEditMembershipParameter;

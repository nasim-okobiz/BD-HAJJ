// src/components/CreateAndEditMembershipInfo.js

import React, { useState, useEffect, useRef } from "react";
import { Modal, Form, Input, Select, Upload, Button, message } from "antd";;
import "react-quill/dist/quill.snow.css";
import axiosInstance from "../../Components/Axios";
import JoditEditor from 'jodit-react';
import { UploadOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import { API_BASE_URL } from "../../Components/config";
const CreateAndEditMembershipInfo = ({ visible, setVisible, fetchMembershipInfos,  editingMembershipInfo }) => {
  const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
  const editor = useRef(null);
  const [content, setContent] = React.useState("");
  useEffect(() => {
    if (editingMembershipInfo) {
      form.setFieldsValue({
        header: editingMembershipInfo.header,
        title: editingMembershipInfo.title,
        description: editingMembershipInfo.description,
        detail: editingMembershipInfo.detail,
      });
      setFileList(editingMembershipInfo?.photo ? [{ url: API_BASE_URL + editingMembershipInfo?.photo, originFileObj: null }] : []);
    } else {
      form.resetFields();
      setFileList([]);
    }

  }, [editingMembershipInfo, form, visible]);

  const handleCreateOrEdit = async (values) => {
    const formData = new FormData();
    for (const key in values) {
        formData.append(key, values[key]);
    }
    if (fileList.length > 0) {
      fileList?.forEach(file => {
        if (file?.originFileObj) {
          formData.append("photo", file?.originFileObj); // Append uploaded photo
        }
      });
    }


    try {
      if (editingMembershipInfo) {
        await axiosInstance.put(`/membershipinfo/${editingMembershipInfo._id}`, formData);
        message.success("MembershipInfo updated successfully.");
      } else {
        await axiosInstance.post("/membershipinfo", formData);
        message.success("MembershipInfo created successfully.");
      }

      setVisible(false);
      fetchMembershipInfos();
    } catch (error) {
      message.error( error?.response?.data?.message);
    }
  };
  const handleFileChange = ({ fileList: newFileList }) => {
    if (newFileList?.length > 0) {
      setFileList([newFileList[newFileList?.length - 1]]);
    }
  };


  return (
    <Modal
      visible={visible}
      title={editingMembershipInfo ? "Edit MembershipInfo" : "Create MembershipInfo"}
      onCancel={() => setVisible(false)}
      onOk={() => form.submit()}
      width='50%'    >
      <Form form={form} layout="vertical" onFinish={handleCreateOrEdit}>
      <Form.Item
          name="header"
          label="Header"
          rules={[{ required: true, message: "Please input the Header!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please input the Title!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please input the Description!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="detail"
          label="Detail"
          rules={[{ required: true, message: "Please input the Detail!" }]}
        >
          <ReactQuill />
        </Form.Item>
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



export default CreateAndEditMembershipInfo;

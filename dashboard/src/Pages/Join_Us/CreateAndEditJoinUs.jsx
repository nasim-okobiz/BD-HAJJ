// src/components/CreateAndEditJoinUs.js

import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, Upload, Button, message, Space, Typography } from "antd";
import { } from "@ant-design/icons";
import { UploadOutlined, PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axiosInstance from "../../Components/Axios";
import { API_BASE_URL } from "../../Components/config";
const { Option } = Select;
const { Text } = Typography;
const CreateAndEditJoinUs = ({ visible, setVisible, fetchJoinUss, editingJoinUs }) => {
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingJoinUs) {
      form.setFieldsValue({
        title: editingJoinUs.title,
        description: editingJoinUs.description,
        condition: editingJoinUs.condition,
        amount: editingJoinUs.amount,
        videoUrl: editingJoinUs.videoUrl
      });
    } else {
      form.resetFields();
      setFileList([]);
    }
  }, [editingJoinUs, form, visible]);

  const handleCreateOrEdit = async (values) => {
    // return
    try {
      const formData = new FormData();


      for (const key in values) {
        if (key === 'condition' && Array.isArray(values[key])) {
          // Loop through the conditions array and append each item
          // formData.append(`${key}[]`, item);
          values[key].forEach((condition, index) => {
            formData.append(`condition[${index}]`, condition);
          });
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

      if (editingJoinUs) {
        await axiosInstance.put(`/join-us/${editingJoinUs._id}`, formData);
        message.success("JoinUs updated successfully.");
      } else {
        await axiosInstance.post("/join-us", formData);
        message.success("JoinUs created successfully.");
      }

      setVisible(false);
      fetchJoinUss();
    } catch (error) {
      message.error(error?.response?.data?.message);
    }
  };

  const handleFileChange = ({ fileList: newFileList }) => {
    if (newFileList.length > 0) {
      setFileList([newFileList[newFileList.length - 1]]);
    }
  };
  const renderDynamicField = (name, label, placeholder, message, type = "text") => (
    <Form.List name={name}>
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <Space key={key} style={{ display: "flex", marginBottom: 0 }} align="baseline">
              <Form.Item
                {...restField}
                name={name}
                rules={[
                  { required: true, message },
                  type === "email" && { type: "email", message: "Please enter a valid email address." },
                  type === "phone" && {
                    pattern: /^\d{10,15}$/, // Customize the pattern as needed
                    message: "Please enter a valid phone number.",
                  },
                ].filter(Boolean)}
              >
                <Input placeholder={placeholder} />
              </Form.Item>
              <MinusCircleOutlined onClick={() => remove(name)} />
            </Space>
          ))}
          <Button type="dashed" style={{ marginBottom: 8 }} onClick={() => add()} icon={<PlusOutlined />}>
            Add {label}
          </Button>
        </>
      )}
    </Form.List>
  );

  return (
    <Modal
      visible={visible}
      title={editingJoinUs ? "Edit JoinUs" : "Create JoinUs"}
      onCancel={() => setVisible(false)}
      onOk={() => form.submit()}
    >
      <Form form={form} layout="vertical" onFinish={handleCreateOrEdit}>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please input the joinUs title!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please input the joinUs Description!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="amount"
          label="Amount"
          rules={[{ required: true, message: "Please input the joinUs Amount!" }]}
        >
          <Input type="Number" />
        </Form.Item>
        <div>
          <Text strong>Condition:</Text>
          {renderDynamicField("condition", "Condition", "Enter condition", "Please enter an condition.")}
        </div>



        {/* <Form.Item name="photo" label="Upload Photo">
          <Upload
            listType="picture"
            fileList={fileList}
            onChange={handleFileChange}
            beforeUpload={() => false} // Prevent automatic upload
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item> */}
        <Form.Item
          name="videoUrl"
          label="Video URL"
          rules={[{ required: true, message: "Please input the joinUs Video!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};



export default CreateAndEditJoinUs;

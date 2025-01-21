// src/components/CreateAndEditBlog.js

import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axiosInstance from "../../Components/Axios";
import { API_BASE_URL } from "../../Components/config";
const { Option } = Select;

const CreateAndEditBlog = ({ visible, setVisible, fetchBlogs, blogCategories, editingBlog }) => {
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (editingBlog) {
      form.setFieldsValue({
        title: editingBlog.title,
        description: editingBlog.description,
        textEditor: editingBlog.textEditor,
        category: editingBlog.blogCategoryRef?._id,
      });
      setFileList(editingBlog.photo ? [{ url: API_BASE_URL + editingBlog.photo, originFileObj: null }] : []);
    } else {
      form.resetFields();
      setFileList([]);
    }
  }, [editingBlog, form, visible]);

  const handleCreateOrEdit = async (values) => {

    try {
      const formData = new FormData();


      for (const key in values) {
        if (key === "category") {
          if (values.category !== undefined) {
            formData.append("blogCategoryRef", values.category);
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

      if (editingBlog) {
        await axiosInstance.put(`/blog/${editingBlog._id}`, formData);
        message.success("Blog updated successfully.");
      } else {
        await axiosInstance.post("/blog", formData);
        message.success("Blog created successfully.");
      }

      setVisible(false);
      fetchBlogs();
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
      title={editingBlog ? "Edit Blog" : "Create Blog"}
      onCancel={() => setVisible(false)}
      onOk={() => form.submit()}
    >
      <Form form={form} layout="vertical" onFinish={handleCreateOrEdit}>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please input the blog title!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Please input the blog Description!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="textEditor"
          label="Content"
          rules={[{ required: true, message: "Please input the blog content!" }]}
        >
          <ReactQuill />
        </Form.Item>

        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true, message: "Please select a category!" }]}
        >
          <Select placeholder="Select a category">
            {blogCategories?.map((category) => (
              <Option key={category._id} value={category._id}>
                {category?.name}
              </Option>
            ))}
          </Select>
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



export default CreateAndEditBlog;

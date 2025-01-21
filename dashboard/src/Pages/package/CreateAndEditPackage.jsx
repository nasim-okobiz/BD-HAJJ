// src/components/CreateAndEditPackage.js

import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, Upload, Button, message, DatePicker, Checkbox } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axiosInstance from "../../Components/Axios";
import { API_BASE_URL } from "../../Components/config";
import DynamicFormList from "./DynamicFormList";
import moment from "moment";

const { Option } = Select;

const CreateAndEditPackage = ({ visible, setVisible, fetchPackages, packageTypes, editingPackage }) => {
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();
  const [discountRequired, setDiscountRequired] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  useEffect(() => {
    if (editingPackage) {
      form.setFieldsValue({
        name: editingPackage.name,
        title: editingPackage.title,
        types: editingPackage.packageRef?._id,
        price: editingPackage.price,
        minPayPrice: editingPackage.minPayPrice,
        discountType: editingPackage.discountType,
        discount: editingPackage.discount,
        // validDate: editingPackage.validDate ? editingPackage.validDate : null,
        validDate: editingPackage.validDate ? moment(editingPackage.validDate) : null,
        termsAndConditions: editingPackage.termsAndConditions,
        roomType: editingPackage.roomType,
        hotalDistance: editingPackage.hotalDistance || [],
        packageIncludes: editingPackage.packageIncludes || [],
        packageExcludes: editingPackage.packageExcludes || [],
        documentsRequired: editingPackage.documentsRequired || [],
        bookingPolicy: editingPackage.bookingPolicy || [],
        earlyBird: editingPackage.earlyBird || false, // Set earlyBird value if available
      });
      setFileList(editingPackage.photo ? [{ url: API_BASE_URL + editingPackage.photo, originFileObj: null }] : []);
    } else {
      form.resetFields();
      setFileList([]);
      setDiscountRequired(false);
    }
  }, [editingPackage, form, visible]);

  const handleCreateOrEdit = async (values) => {

    try {
      const formData = new FormData();

      const requiredFields = [
        "hotalDistance",
        "packageIncludes",
        "packageExcludes",
        "documentsRequired",
        "bookingPolicy"
      ];

      // Validate required fields
      for (const field of requiredFields) {
        if (!values[field] || (Array.isArray(values[field]) && values[field].length === 0) || values[field].includes("undefined")) {
          message.error(`${field} is required and must have valid values.`);
          return; // Stop submission if validation fails
        }
      }

      for (const key in values) {
        if (key === "types") {
          if (values.types !== undefined) {
            formData.append("packageRef", values.types);
          }
        } else if (Array.isArray(values[key])) {
          const validItems = values[key].filter(item => item !== 'undefined' && item.trim() !== '');
          if (validItems.length > 0) {
            validItems.forEach(item => {
              formData.append(`${key}[]`, item);
            });
          } else {
            message.success(`${key} is required but contains invalid values.`);
            return;
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

      if (editingPackage) {
        await axiosInstance.put(`/package/${editingPackage._id}`, formData);
        message.success("Package updated successfully.");
      } else {
        await axiosInstance.post("/package", formData);
        message.success("Package created successfully.");
      }

      setVisible(false);
      fetchPackages();
    } catch (error) {
      message.error(error?.response?.data?.message);
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
      title={editingPackage ? "Edit Package" : "Create Package"}
      onCancel={() => setVisible(false)}
      onOk={() => form.submit()}
       width="60%"
    >
      <Form form={form} layout="vertical" onFinish={handleCreateOrEdit}>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please input the package name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please input the package title!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="types"
          label="Package Type"
          rules={[{ required: true, message: "Please select a type!" }]}
        >
          <Select placeholder="Select a type">
            {packageTypes?.map((type) => (
              <Option key={type._id} value={type._id}>
                {type?.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name="price"
          label="Price"
          rules={[{ required: true, message: "Please input the package price!" }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          name="minPayPrice"
          label="Minimum Pay Price"
          rules={[{ required: true, message: "Please input the minimum pay price!" }]}
        >
          <Input type="number" />
        </Form.Item>

        {/* Checkbox to make discount fields required */}
        <Form.Item>
          <Checkbox onChange={() => setDiscountRequired(!discountRequired)}>
            Require Discount Details
          </Checkbox>
        </Form.Item>

        <Form.Item
          name="discountType"
          label="Discount Type"
          rules={[{ required: discountRequired, message: "Please select a discount type!" }]}
        >
          <Select placeholder="Select a discount type">
            <Option value="percent">Percentage</Option>
            <Option value="float">Fixed Amount</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="discount"
          label="Discount"
          rules={[{ required: discountRequired, message: "Please input the discount!" }]}
        >
          <Input type="number" />
        </Form.Item>

        <Form.Item
          name="validDate"
          label="Valid Date"
          rules={[{ required: discountRequired, message: "Please select the valid date!" }]}
        >
          <DatePicker
            style={{ width: "100%" }}
            format="YYYY-MM-DD"
          />
        </Form.Item>

        {/* Early Bird Checkbox */}
        <Form.Item name="earlyBird" valuePropName="checked">
          <Checkbox>Early Bird</Checkbox>
        </Form.Item>

        <Form.Item
          name="roomType"
          label="Room Type"
          rules={[{ required: true, message: "Please input the package room type!" }]}
        >
          <ReactQuill />
        </Form.Item>

        <DynamicFormList
          name="hotalDistance"
          label="Hotel Distance"
          placeholder="Hotel Distance"
          rules={[{ required: true, message: "Please input hotel distance!" }]}
        />

        <DynamicFormList
          name="packageIncludes"
          label="Package Includes"
          placeholder="Package Includes"
          rules={[{ required: true, message: "Please input package includes!" }]}
        />

        <DynamicFormList
          name="packageExcludes"
          label="Package Excludes"
          placeholder="Package Excludes"
          rules={[{ required: true, message: "Please input package excludes!" }]}
        />

        <DynamicFormList
          name="documentsRequired"
          label="Documents Required"
          placeholder="Documents Required"
          rules={[{ required: true, message: "Please input required documents!" }]}
        />

        <DynamicFormList
          name="bookingPolicy"
          label="Booking Policy"
          placeholder="Booking Policy"
          rules={[{ required: true, message: "Please input booking policy!" }]}
        />

        <Form.Item
          name="termsAndConditions"
          label="Terms And Conditions"
          rules={[{ required: true, message: "Please input terms and conditions!" }]}
        >
          <ReactQuill />
        </Form.Item>

        <Form.Item name="photo" label="Upload Photo Size(1000px x 500px)">
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

export default CreateAndEditPackage;

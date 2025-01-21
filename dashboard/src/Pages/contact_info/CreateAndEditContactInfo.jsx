import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Upload, Button, message, Space, Typography } from "antd";
import { UploadOutlined, PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import axiosInstance from "../../Components/Axios";

const { Text } = Typography;

const CreateAndEditContactInfo = ({ visible, setVisible, fetchContactInfos, editingContactInfo }) => {
  const [fileList, setFileList] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    if (visible) {
      form.setFieldsValue({
        agencyName: editingContactInfo?.agencyName || "",
        address: editingContactInfo?.address?.length ? editingContactInfo.address : [""],
        email: editingContactInfo?.email?.length ? editingContactInfo.email : [""],
        phone: editingContactInfo?.phone?.length ? editingContactInfo.phone : [""],
        whatsapp: editingContactInfo?.whatsapp?.length ? editingContactInfo.whatsapp : [""],
      });

      if (editingContactInfo?.photo) {
        setFileList([
          {
            uid: '-1',
            name: 'Existing Photo',
            status: 'done',
            url: editingContactInfo.photo,
          },
        ]);
      } else {
        setFileList([]);
      }
    }
  }, [visible, editingContactInfo, form]);

  const handleCreateOrEdit = async (values) => {

    try {
      if (editingContactInfo) {
        await axiosInstance.put(`/contact-info/${editingContactInfo._id}`, values);
        message.success("Contact information updated successfully.");
      } else {
        await axiosInstance.post("/contact-info", values);
        message.success("Contact information created successfully.");
      }

      setVisible(false);
      fetchContactInfos();
    } catch (error) {
      message.error( error?.response?.data?.message);
    }
  };

  const handleFileChange = ({ fileList: newFileList }) => {
    if (newFileList.length > 0) {
      setFileList([newFileList[newFileList.length - 1]]);
    } else {
      setFileList([]);
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
      title={editingContactInfo ? "Edit Contact Information" : "Create Contact Information"}
      onCancel={() => setVisible(false)}
      onOk={() => form.submit()}
      okText={editingContactInfo ? "Update" : "Create"}
      cancelText="Cancel"
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={handleCreateOrEdit}>
        <Form.Item
          name="agencyName"
          label="Agency Name"
          rules={[{ required: true, message: "Please enter the agency name." }]}
        >
          <Input placeholder="Enter agency name" />
        </Form.Item>
        <div>
          <Text strong>Addresses:</Text>
          {renderDynamicField("address", "Address", "Enter address", "Please enter an address.")}
        </div>
        <div>
          <Text strong>Emails:</Text>
          {renderDynamicField("email", "Email", "Enter email", "Please enter a valid email.", "email")}
        </div>
        <div>
          <Text strong>Phone Numbers:</Text>
          {renderDynamicField("phone", "Phone Number", "Enter phone number", "Please enter a valid phone number.", "phone")}
        </div>
        <div>
          <Text strong>WhatsApp Numbers:</Text>
          {renderDynamicField("whatsapp", "WhatsApp Number", "Enter WhatsApp number", "Please enter a valid WhatsApp number.", "phone")}
        </div>
      </Form>
    </Modal>
  );
};

export default CreateAndEditContactInfo;

// src/components/PackageTypesComponent.js

import React, { useEffect, useState } from "react";
import { Table, Button, message, Popconfirm } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axiosInstance from "../../Components/Axios";
import { API_BASE_URL } from "../../Components/config";
// import CreateAndEditPackageType from "./CreateAndEditPackageType";
import CreateAndEditPackageType from "./CreateAndEditPackageType";
import { CiEdit } from "react-icons/ci";
import { MdOutlineViewInAr } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";

const PackageTypesComponent = () => {
  const [packageTypes, setPackageTypes] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editingPackageType, setEditingPackageType] = useState(null); // State for the packageType being edited

  useEffect(() => {
    fetchPackageTypes();

  }, []);

  const fetchPackageTypes = async () => {
    try {
      const response = await axiosInstance.get("/package-type");
      setPackageTypes(response?.data?.data);
    } catch (error) {
      message.error("Failed to fetch packageTypes.");
    }
  };



  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/package-type/${id}`);
      message.success("PackageType deleted successfully.");
      fetchPackageTypes();
    } catch (error) {
      message.error( error?.response?.data?.message);
    }
  };

  const showModal = (packageType) => {
    setEditingPackageType(packageType);
    setVisible(true);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div>
          <Button icon={<CiEdit  style={{ fontSize: '22px' }}/>} type="link" onClick={() => showModal(record)}>
            {/* Edit */}
          </Button>
          <Popconfirm
            title="Are you sure delete this packageType?"
            onConfirm={() => handleDelete(record?._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<AiOutlineDelete  style={{ fontSize: '22px' }}/>} type="link" danger>
              {/* Delete */}
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto py-5">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">All PackageTypes</h1>
        <Button
          type="primary"
          onClick={() => {
            setEditingPackageType(null); // Reset editing packageType
            setVisible(true);
          }}
          style={{ marginBottom: 16 }}
        >
          <PlusOutlined /> Create PackageType
        </Button>
      </div>

      <Table columns={columns} dataSource={packageTypes} rowKey="_id" scroll={{ x: 800 }}/>

      <CreateAndEditPackageType
        visible={visible}
        setVisible={setVisible}
        fetchPackageTypes={fetchPackageTypes}
        editingPackageType={editingPackageType} // Pass the editing packageType
      />
    </div>
  );
};

export default PackageTypesComponent;

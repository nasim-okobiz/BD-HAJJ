// src/components/UmrahPackagesComponent.js

import React, { useEffect, useState } from "react";
import { Table, Button, message, Popconfirm, List } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axiosInstance from "../../Components/Axios";
import { API_BASE_URL } from "../../Components/config";
import CreateAndEditPackage from "./CreateAndEditPackage";
import { CiEdit } from "react-icons/ci";
import { MdOutlineViewInAr } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";

const UmrahPackagesComponent = () => {
  const [packages, setPackages] = useState([]);
  const [packageTypes, setPackageTypes] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null); // State for the package being edited

  useEffect(() => {
    fetchPackages();
    fetchPackageTypes();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await axiosInstance.get("/package?priority=1");
      setPackages(response?.data?.data);
    } catch (error) {
      message.error("Failed to fetch packages.");
    }
  };

  const fetchPackageTypes = async () => {
    try {
      const response = await axiosInstance.get("/package-type");
      setPackageTypes(response?.data?.data);
    } catch (error) {
      message.error(error?.response?.data?.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/package/${id}`);
      message.success("Package deleted successfully.");
      fetchPackages();
    } catch (error) {
      message.error("Failed to delete package.");
    }
  };

  const showModal = (packages) => {
    setEditingPackage(packages);
    setVisible(true);
  };

  const columns = [
    {
      title: "Description",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Package type",
      dataIndex: "packageRef",
      key: "packageRef",
      render: (packageRef) => packageRef?.name || "No Package type",
    },

    {
      title: "Prices",
      key: "prices",
      render: (text, record) => (
        <div>
          <div><strong>Price:</strong> {record.price}</div>
          <div><strong>MRP Price:</strong> {record.mrpPrice}</div>
          <div><strong>Min. Pay Price:</strong> {record.minPayPrice}</div>
        </div>
      ),
    },

    {
      title: "Discount",
      key: "discount",
      render: (text, record) => (
        <div>
          <div><strong>Discount Type:</strong> {record.discountType}</div>
          <div><strong>Discount:</strong> {record.discount}</div>
          <div><strong>Discount Price:</strong> {record.discountPrice}</div>
        </div>
      ),
    },
    {
      title: "Early Bird",
      dataIndex: "earlyBird",
      key: "earlyBird",
      render: (value) => (
        <span>{value ? "Yes" : "No"}</span>  // Display "Yes" if true, "No" if false
      ),
    },
    {
      title: "Valid Date",
      dataIndex: "validDate",
      key: "validDate",
      render: (validDate) => new Date(validDate).toLocaleDateString(),
    },

    {
      title: "Photos",
      dataIndex: "photo",
      key: "photo",
      render: (photo) => (
        <img
          src={`${API_BASE_URL}${photo}`}
          alt="package"
          style={{ width: "100px", marginRight: "10px" }}
        />
      ),
    },
    {
      title: "Room Type",
      dataIndex: "roomType",
      key: "roomType",
      render: (roomType) => roomType.replace(/<[^>]*>?/gm, ""),
    },

    {
      title: "Hotel Distance",
      dataIndex: "hotalDistance",
      key: "hotalDistance",
      render: (text) => (Array.isArray(text) ? text.join(", ") : ""),
    },
    {
      title: "Package Includes",
      dataIndex: "packageIncludes",
      key: "packageIncludes",
      render: (text) => (Array.isArray(text) ? text.join(", ") : ""),
    },
    {
      title: "Package Excludes",
      dataIndex: "packageExcludes",
      key: "packageExcludes",
      render: (text) => (Array.isArray(text) ? text.join(", ") : ""),
    },
    {
      title: "Documents Required",
      dataIndex: "documentsRequired",
      key: "documentsRequired",
      render: (text) => (Array.isArray(text) ? text.join(", ") : ""),
    },
    {
      title: "Booking Policy",
      dataIndex: "bookingPolicy",
      key: "bookingPolicy",
      render: (text) => (Array.isArray(text) ? text.join(", ") : ""),
    },



    {
      title: "Terms And Conditions",
      dataIndex: "termsAndConditions",
      key: "termsAndConditions",
      render: (termsAndConditions) => (
        <div style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxWidth: '150px'  // Adjust the max width as needed
        }}>
          {termsAndConditions.replace(/<[^>]*>?/gm, "")}
        </div>
      ),
    },

    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div>
          <Button icon={<CiEdit style={{ fontSize: '22px' }} />} type="link" onClick={() => showModal(record)}>
            {/* Edit */}
          </Button>
          <Popconfirm
            title="Are you sure delete this package?"
            onConfirm={() => handleDelete(record?._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<AiOutlineDelete style={{ fontSize: '22px' }} />} type="link" danger>
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
        <h1 className="text-2xl font-bold">All Packages</h1>
        <Button
          type="primary"
          onClick={() => {
            setEditingPackage(null); // Reset editing package
            setVisible(true);
          }}
          style={{ marginBottom: 16 }}
        >
          <PlusOutlined /> Create Package
        </Button>
      </div>

      {/* <Table columns={columns} dataSource={packages} rowKey="_id" />
       */}
      <Table
        columns={columns}
        dataSource={packages}
        rowKey="_id"
        scroll={{ x: 800 }} // Add horizontal scroll when needed
      />


      <CreateAndEditPackage
        visible={visible}
        setVisible={setVisible}
        fetchPackages={fetchPackages}
        packageTypes={packageTypes}
        editingPackage={editingPackage} // Pass the editing package
      />
    </div>
  );
};

export default UmrahPackagesComponent;

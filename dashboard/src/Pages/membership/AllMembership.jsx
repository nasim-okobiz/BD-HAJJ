import React, { useEffect, useState } from "react";
import { Table, Button, Popconfirm,Modal, Input, Select, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axiosInstance from "../../Components/Axios";
import { API_BASE_URL } from "../../Components/config";
import CreateAndEditMembership from "./CreateAndEditMembership";
import { CopyOutlined } from "@ant-design/icons";
import { message } from "antd";
import PaymentForm from "./PaymentForm";
import { FaAmazonPay } from "react-icons/fa6";

import { MdOutlinePayments } from "react-icons/md";
import PaymentList from "./PaymentList";
import { AiOutlineDelete } from "react-icons/ai";
const MembershipsComponent = () => {
  const [memberships, setMemberships] = useState([]);
  const [membershipCategories, setMembershipCategories] = useState([]);
  const [visible, setVisible] = useState(false);
  const [editingMembership, setEditingMembership] = useState(null); // State for the membership being edited

  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [singleMembership, setSingleMembership] = useState(null);
  const [selectedMembership, setSelectedMembership] = useState(null);
  const [paymentListVisible, setPaymentListVisible] = useState(false);

  const [zoomImageSrc, setZoomImageSrc] = useState("");  
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);  


  // useEffect(() => {
  //   fetchMemberships();
  // }, []);

  // const fetchMemberships = async () => {
  //   try {
  //     const response = await axiosInstance.get("/membership/find");
  //     setMemberships(response?.data?.data);
  //   } catch (error) {
  //     message.error("Failed to fetch memberships.");
  //   }
  // };

  const [filters, setFilters] = useState({
    phone: "",
    memberId: "",
    agentType: ""
  });

  useEffect(() => {
    fetchMemberships();
  }, []);

  const fetchMemberships = async () => {
    try {
      const { phone, memberId, agentType } = filters;
      const queryParams = new URLSearchParams();

      if (phone) queryParams.append("phone", phone);
      if (memberId) queryParams.append("memberId", memberId);
      if (agentType) queryParams.append("agentType", agentType);

      const response = await axiosInstance.get(`/membership/find?${queryParams.toString()}`);
      setMemberships(response?.data?.data);
    } catch (error) {
      message.error("Failed to fetch memberships.");
    }
  };

  const handleSearch = () => {
    fetchMemberships(); // Trigger the fetch with updated filters
  };

  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/membership/${id}`);
      message.success("Membership deleted successfully.");
      fetchMemberships();
    } catch (error) {
      message.error("Failed to delete membership.");
    }
  };

  const showModal = (membership) => {
    setEditingMembership(membership);
    setVisible(true);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      message.success("Refer code copied to clipboard!");
    }).catch(() => {
      message.error("Failed to copy refer code.");
    });
  };
  const openPaymentForm = (singlemembership) => {
    setSingleMembership(singlemembership);
    setShowPaymentForm(true);
  };
  const closePaymentForm = () => {
    setShowPaymentForm(false);
    setSingleMembership(null);
  };

  const openPaymentList = (membership) => {
    setSelectedMembership(membership);
    setPaymentListVisible(true);
  };
  const closePaymentList = () => {
    setPaymentListVisible(false);
    setSelectedMembership(null);
  };

  const handleImageClick = (imageSrc) => {
    setZoomImageSrc(imageSrc);
    setIsImageModalVisible(true);
  };
  const closeImageModal = () => {
    setIsImageModalVisible(false);
    setZoomImageSrc("");
  };



  const columns = [
    {
      title: "Membership Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      render: (photo) => (
        <img
          src={`${API_BASE_URL}${photo}`}
          alt="photo"
          style={{ width: "100px", cursor: "pointer" }}
          onClick={() => handleImageClick(`${API_BASE_URL}${photo}`)}
        />
      ),
    },
    {
      title: "NID Front",
      dataIndex: "nidFront",
      key: "nidFront",
      render: (nidFront) => (
        <img
          src={`${API_BASE_URL}${nidFront}`}
          alt="NID Front"
          style={{ width: "100px", cursor: "pointer" }}
          onClick={() => handleImageClick(`${API_BASE_URL}${nidFront}`)}
        />
      ),
    },
    {
      title: "NID Back",
      dataIndex: "nidBack",
      key: "nidBack",
      render: (nidBack) => (
        <img
          src={`${API_BASE_URL}${nidBack}`}
          alt="NID Back"
          style={{ width: "100px", cursor: "pointer" }}
          onClick={() => handleImageClick(`${API_BASE_URL}${nidBack}`)}
        />
      ),
    },
    {
      title: "Occupation",
      dataIndex: "occupation",
      key: "occupation",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Division",
      dataIndex: "division",
      key: "division",
    },
    {
      title: "District",
      dataIndex: "district",
      key: "district",
    },
    {
      title: "Union",
      dataIndex: "union",
      key: "union",
    },
    {
      title: "Person Category",
      dataIndex: "personCategory",
      key: "personCategory",
    },
    {
      title: "Agent Type",
      dataIndex: "agentType",
      key: "agentType",
    },
    {
      title: "Amount",
      dataIndex: "userRef",
      key: "userRef",
      render: (userRef) => userRef?.amount || 0,
    },
    {
      title: "Received Amount",
      dataIndex: "userRef",
      key: "userRef",
      render: (userRef) => userRef?.receivedAmount || 0,
    },
    {
      title: "Refer Users",
      dataIndex: "referUsers",
      key: "referUsers",
    },
    {
      title: "Refer Code",
      dataIndex: "referCode",
      key: "referCode",
      render: (referCode) => (
        <span style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
          <span style={{ color: "", textDecoration: "", marginRight: 8 }}>
            {referCode}
          </span>
          <CopyOutlined onClick={() => copyToClipboard(referCode)} />
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div>
          <Button icon={<FaAmazonPay style={{ fontSize: '22px' }} />} type="link" onClick={() => openPaymentForm(record)}>
          </Button>
          <Button icon={<MdOutlinePayments style={{ fontSize: '22px' }} />} type="link" onClick={() => openPaymentList(record)}>
          </Button>
           <Popconfirm
                      title="Are you sure delete this package?"
                      onConfirm={() => handleDelete(record?._id)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button icon={<AiOutlineDelete style={{ fontSize: '22px', color: 'red' }} />} type="link" >
                      </Button>
                    </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto py-5">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">All Memberships</h1>
      </div>
      {/* Search Filters */}
      <Form layout="inline" onFinish={handleSearch} className="mb-4">
        <Form.Item label="Phone">
          <Input
            value={filters.phone}
            onChange={(e) => setFilters({ ...filters, phone: e.target.value })}
            placeholder="Phone"
          />
        </Form.Item>
        <Form.Item label="Refer Code">
          <Input
            value={filters.memberId}
            onChange={(e) => setFilters({ ...filters, memberId: e.target.value })}
            placeholder="Refer Code"
          />
        </Form.Item>
        <Form.Item label="Agent Type">
          <Select
            value={filters.agentType}
            onChange={(value) => setFilters({ ...filters, agentType: value })}
            placeholder="Select Agent Type"
            allowClear
            style={{ minWidth: '200px' }} 
          >
            <Option value="silver">Silver</Option>
            <Option value="gold">Gold</Option>
            <Option value="diamond">Diamond</Option>
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
        </Form.Item>
      </Form>

      <Table columns={columns} dataSource={memberships} rowKey="_id" scroll={{ x: 800 }}/>

      {/* <CreateAndEditMembership
        visible={visible}
        setVisible={setVisible}
        fetchMemberships={fetchMemberships}
        membershipCategories={membershipCategories}
        editingMembership={editingMembership} // Pass the editing membership
      /> */}
       <Modal
        visible={isImageModalVisible}
        footer={null}
        onCancel={closeImageModal}
        centered
      >
        <img src={zoomImageSrc} alt="Zoomed View" style={{ width: "100%" }} />
      </Modal>
      <PaymentForm
        visible={showPaymentForm}
        onClose={closePaymentForm}
        singleMembership={singleMembership}
        fetchUsers={fetchMemberships}
      />
      <PaymentList
        membershipId={selectedMembership}
        visible={paymentListVisible}
        onClose={closePaymentList}
      />
    </div>
  );
};

export default MembershipsComponent;

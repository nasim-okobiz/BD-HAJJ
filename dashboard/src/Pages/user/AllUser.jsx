import React, { useEffect, useState } from "react";
import { Table, Button, message, Popconfirm } from "antd";
import axiosInstance from "../../Components/Axios";
import { API_BASE_URL } from "../../Components/config";
import { FaAmazonPay } from "react-icons/fa6";
import { MdOutlineViewInAr } from "react-icons/md";
import { MdOutlinePayments } from "react-icons/md";
import PaymentForm from "./PaymentForm";
import PaymentList from "./PaymentList";
import { AiOutlineDelete } from "react-icons/ai";
const UsersComponent = () => {
  const [users, setUsers] = useState([]);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [singleBooking, setSingleBooking] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [paymentListVisible, setPaymentListVisible] = useState(false);
  const [viewingBooking, setViewingBooking] = useState(null); // State for the booking being viewed


  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get("/auth/user");
      const userData = response?.data?.data?.result;
      setUsers(response?.data?.data);
      // if (Array.isArray(userData)) {
      //   setUsers(userData);
      // } else {
      //   setUsers([]);
      //   console.error("Unexpected data format:", userData);
      //   message.error("Failed to fetch users - invalid data format.");
      // }
    } catch (error) {
      message.error("Failed to fetch users.");
    }
  };



  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/auth/user/${id}`);
      message.success("User deleted successfully.");
      fetchUsers();
    } catch (error) {
      message.error("Failed to delete package.");
    }
  };



  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    // {
    //   title: "Is Agent",
    //   dataIndex: "isAgent",
    //   key: "isAgent",
    // },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    // {
    //   title: "Agent Type",
    //   dataIndex: "agentType",
    //   key: "agentType",
    // },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Received Amount",
      dataIndex: "receivedAmount",
      key: "receivedAmount",
    },
    // {
    //   title: "Referred Users",
    //   dataIndex: "referUsers",
    //   key: "referUsers",
    // },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    // {
    //   title: "Photos",
    //   dataIndex: "photo",
    //   key: "photo",
    //   render: (photo) => (
    //     photo ? (
    //       <img
    //         src={`${API_BASE_URL}${photo}`}
    //         alt="user"
    //         style={{ width: "100px", marginRight: "10px" }}
    //       />
    //     ) : (
    //       "No photo"
    //     )
    //   ),
    // },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <div>
          {/* <Button icon={<FaAmazonPay style={{ fontSize: '22px' }} />} type="link" onClick={() => openPaymentForm(record)}>
          </Button> */}

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
        <h1 className="text-2xl font-bold">All Users</h1>
      </div>

      <Table columns={columns} dataSource={users || []} rowKey="_id" scroll={{ x: 800 }} />
    </div>
  );
};

export default UsersComponent;

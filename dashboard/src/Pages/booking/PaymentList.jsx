// src/components/PaymentList.js

import React, { useEffect, useState } from "react";
import { Modal, Table, message } from "antd";
import axiosInstance from "../../Components/Axios";
import moment from "moment";
const PaymentList = ({ bookingId, visible, onClose }) => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    if (bookingId && visible) {
      fetchPayments();
    }
  }, [bookingId, visible]);

  const fetchPayments = async () => {
    try {
      const response = await axiosInstance.get(`/payment?bookingRef=${bookingId}`);
      setPayments(response.data.data);
    } catch (error) {
      message.error("Failed to fetch payments.");
    }
  };
  console.log("payments", payments)
  const columns = [

    {
      title: "Pay Name",
      dataIndex: "userRef",
      key: "userRef.name",
      render: (userRef) => userRef?.name || "No Name",
    },
    {
      title: "Pay Role",
      dataIndex: "userRef",
      key: "userRef.role",
      render: (userRef) => userRef?.role || "No Role",
    },
    {
      title: "Booking Price",
      dataIndex: "bookingRef",
      key: "bookingRef.totalPrice",
      render: (bookingRef) => bookingRef?.totalPrice || "No Price",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Bank Name",
      dataIndex: "bankName",
      key: "bankName",
    },
    {
      title: "Account Number",
      dataIndex: "accountNumber",
      key: "accountNumber",
    },
    {
      title: "Date",
      dataIndex: "paymentDate",
      key: "paymentDate",
      render: (paymentDate) => (paymentDate ? moment(paymentDate).format("DD/MM/YYYY") : "No Date"),
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      render: (paymentMethod) => paymentMethod || "No Method",
    },
  ];

  return (
    <Modal
      title="Payment List"
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={800}
    >
      <Table columns={columns} dataSource={payments} rowKey="_id" />
    </Modal>
  );
};

export default PaymentList;

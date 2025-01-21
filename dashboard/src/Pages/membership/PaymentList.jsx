// src/components/PaymentList.js

import React, { useEffect, useState } from "react";
import { Modal, Table, message } from "antd";
import axiosInstance from "../../Components/Axios";
import moment from "moment";
const PaymentList = ({ membershipId, visible, onClose }) => {
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        if (membershipId && visible) {
            fetchPayments();
        }
    }, [membershipId, visible]);

    const fetchPayments = async () => {
        try {
            const response = await axiosInstance.get(`/payment/user?userIdPayRef=${membershipId?.userRef?._id}`);
            //   /payment/user?userIdPayRef=671615c8b4357d796d6ee2d3
            setPayments(response.data.data);
        } catch (error) {
            message.error("Failed to fetch payments.");
        }
    };

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
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
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

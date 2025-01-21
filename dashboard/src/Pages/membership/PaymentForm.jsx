// src/components/PaymentForm.js

import React, { useState } from "react";
import { Modal, Input, Button, message } from "antd";
import axiosInstance from "../../Components/Axios";


const PaymentForm = ({ visible, onClose, singleMembership, fetchUsers }) => {
  const [amount, setAmount] = useState("");
  
  const handlePayment = async () => {
    // Prevent payment if the amount is greater than totalDue
    if (!amount || isNaN(amount) || amount <= 0 || amount > singleMembership?.userRef?.amount) {
      message.error("Please enter a valid amount. Amount cannot be greater than User Amount.");
      return;
    }

    try {
      await axiosInstance.post(`/payment/user`, { userIdPayRef: singleMembership?.userRef?._id, amount });
      message.success("Payment successful!");
      fetchUsers(); // Refresh the booking list
      onClose();
    } catch (error) {
      message.error("Failed to process payment.");
    }
  };

  return (
    <Modal
      title="Make Payment"
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <div className="mb-4">
        <p><strong>User Amount:</strong> {singleMembership?.userRef?.amount} </p>
        <p><strong>Total Received Amount:</strong> {singleMembership?.userRef?.receivedAmount} </p>
      </div>

      <Input
        type="number"
        placeholder="Enter amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <div className="flex justify-end mt-4">
        <Button type="primary" onClick={handlePayment}>
          Bank Pay
        </Button>
      </div>
    </Modal>
  );
};

export default PaymentForm;

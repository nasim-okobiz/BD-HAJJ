import React, { useState } from "react";
import { Modal, Input, Button, message } from "antd";
import axiosInstance from "../../Components/Axios";

const PaymentForm = ({ visible, onClose, singleBooking, fetchBookings }) => {
  const [amount, setAmount] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [loading, setLoading] = useState(false); // Loading state for the button

  const handlePayment = async () => {
    // Prevent payment if the amount is greater than totalDue
    if (!amount || isNaN(amount) || amount <= 0 || amount > singleBooking.totalDue) {
      message.error("Please enter a valid amount. Amount cannot be greater than Total Due.");
      return;
    }

    try {
      setLoading(true); // Start loading when the payment process begins
      await axiosInstance.post(`/booking/bank/payment`, { bookingRef: singleBooking._id, amount, bankName, accountNumber });
      message.success("Payment successful!");
      fetchBookings(); // Refresh the booking list
      onClose();
    } catch (error) {
      message.error("Failed to process payment.");
    } finally {
      setLoading(false); // Stop loading after payment is processed
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
        <p><strong>Total Price:</strong> {singleBooking?.totalPrice?.toLocaleString()}</p>
        <p><strong>Total Paid:</strong> {singleBooking?.totalPay?.toLocaleString()}</p>
        <p><strong>Total Due:</strong> {singleBooking?.totalDue?.toLocaleString()}</p>
      </div>
      <div className="mt-3">
        <label>Bank Name:</label>
        <Input
          type="text"
          placeholder="Enter Bank Name"
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
        />
      </div>
      <div className="mt-3">
        <label>Account Number:</label>
        <Input
          type="text"
          placeholder="Enter Account Number"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
        />
      </div>
      <div className="mt-3">
        <label>Amount:</label>
        <Input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="flex justify-end mt-4">
        <Button
          type="primary"
          onClick={handlePayment}
          loading={loading} // Show loading spinner when the payment is being processed
          disabled={loading} // Disable the button during loading to prevent multiple clicks
        >
          Bank Pay
        </Button>
      </div>
    </Modal>
  );
};

export default PaymentForm;

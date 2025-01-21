// src/components/BookingsComponent.js

import React, { useEffect, useRef, useState } from "react";
import { Table, Button, message, Popconfirm } from "antd";
import { PlusOutlined, DownloadOutlined } from "@ant-design/icons";

import axiosInstance from "../../Components/Axios";
import CreateAndEditBooking from "./CreateAndEditBooking";
import ViewBookingDetails from "./ViewBookingDetails"; // Import the new component
import moment from "moment";
import PaymentForm from "./PaymentForm";
import PaymentList from "./PaymentList";
import { FaRegFilePdf } from "react-icons/fa";
import { FaAmazonPay } from "react-icons/fa6";
import { MdOutlineViewInAr } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlinePayments } from "react-icons/md";
import { pdf } from "@react-pdf/renderer";
import BookingPDFDocument from "./BookingPDFDocument";


const BookingsComponent = () => {
  const [bookings, setBookings] = useState([]);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [singleBooking, setSingleBooking] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [paymentListVisible, setPaymentListVisible] = useState(false);
  const [payments, setPayments] = useState([]);
  // const [visible, setVisible] = useState(false);
  // const [editingBooking, setEditingBooking] = useState(null); // State for the booking being edited
  const [viewingBooking, setViewingBooking] = useState(null); // State for the booking being viewed

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axiosInstance.get("/booking");
      setBookings(response?.data?.data);
    } catch (error) {
      message.error("Failed to fetch bookings.");
    }
  };


  const handleDelete = async (id) => {
    try {
      await axiosInstance.delete(`/booking/${id}`);
      message.success("Booking deleted successfully.");
      fetchBookings();
    } catch (error) {
      message.error("Failed to delete booking.");
    }
  };

  // const showModal = (booking) => {
  //   setEditingBooking(booking);
  //   setVisible(true);
  // };

  const showViewModal = (booking) => {
    setViewingBooking(booking);
  };

  const closeViewModal = () => {
    setViewingBooking(null);
  };

  const openPaymentForm = (singlebooking) => {
    setSingleBooking(singlebooking);
    setShowPaymentForm(true);
  };

  const closePaymentForm = () => {
    setShowPaymentForm(false);
    setSingleBooking(null);
  };
  const openPaymentList = (booking) => {
    setSelectedBooking(booking);
    setPaymentListVisible(true);
  };

  const closePaymentList = () => {
    setPaymentListVisible(false);
    setSelectedBooking(null);
  };




  const fetchPayments = async (bookingId) => {
    try {
      const response = await axiosInstance.get(`/payment?bookingRef=${bookingId}`);
      setPayments(response.data.data);
    } catch (error) {
      message.error("Failed to fetch payments.");
    }
  };


  const downloadPDF = async (booking) => {
    try {
      // Generate PDF blob
      await fetchPayments(booking?._id);

      const blob = await pdf(<BookingPDFDocument booking={booking} payments={payments} />).toBlob();
      const url = URL.createObjectURL(blob);

      // Create a temporary link and trigger download
      const a = document.createElement("a");
      a.href = url;
      a.download = `Booking_${booking.bookingId || "default"}.pdf`;
      document.body.appendChild(a); // Append to the body for Firefox support
      a.click();

      // Clean up by removing the link and revoking the object URL
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };


  const columns = [
    {
      title: "Booking Id",
      dataIndex: "bookingId",
      key: "bookingId",
    },
    {
      title: "Booking Name",
      dataIndex: "userRef",
      key: "userRef",
      render: (userRef) => userRef?.name || "No User",
    },
    {
      title: "Booking Phone",
      dataIndex: "userRef",
      key: "userRef",
      render: (userRef) => userRef?.phone || "No User",
    },
    {
      title: "Package Name",
      dataIndex: "packageRef",
      key: "packageRef",
      render: (packageRef) => packageRef?.name || "No Package",
    },
    {
      title: "Total Person",
      dataIndex: "totalPerson",
      key: "totalPerson",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Total Payment",
      dataIndex: "totalPay",
      key: "totalPay",
    },
    {
      title: "Total Due",
      dataIndex: "totalDue",
      key: "totalDue",
    },
    {
      title: "Agent Name",
      dataIndex: "membershipRef",
      key: "membershipRef",
      render: (membershipRef) => membershipRef?.name || "N/A",
    },
    {
      title: "Agent Phone",
      dataIndex: "membershipRef",
      key: "membershipRef",
      render: (membershipRef) => membershipRef?.phone || "N/A",
    },
    {
      title: "Agent Commissions",
      dataIndex: "agentCommissions",
      key: "agentCommissions",
    },
    {
      title: "Payment Status",
      key: "paymentStatus",
      render: (text, record) => (
        <span
          style={{
            color: record.totalDue <= 0 ? "green" : "red",
            fontWeight: "bold",
          }}
        >
          {record.totalDue <= 0 ? "Paid" : "Uncomplete"}
        </span>
      ),
    },
    {
      title: "Discount Valid Date",
      dataIndex: "dicountValidDate",
      key: "dicountValidDate",
      render: (date) => (date ? moment(date).format("DD/MM/YYYY") : "No Date"),
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
          <Button icon={<MdOutlineViewInAr style={{ fontSize: '22px' }} />} type="link" onClick={() => showViewModal(record)}>

          </Button>
          {/* <Button type="link" onClick={() => showModal(record)}>
            Edit
          </Button> */}
          <Popconfirm
            title="Are you sure delete this booking?"
            onConfirm={() => handleDelete(record?._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button icon={<AiOutlineDelete style={{ fontSize: '22px' }} />} type="link" danger>

            </Button>
          </Popconfirm>
        </div>
      ),
    },
    // {
    //   title: "Download PDF", // New Download Column
    //   key: "download",
    //   render: (text, record) => (
    //     <Button 
    //       type="link" 
    //       icon={<FaRegFilePdf  style={{ fontSize: '24px' }}/>} 
    //       onClick={() => downloadPDF(record)} // Function to handle PDF download
    //     >
    //     </Button>
    //   ),
    // },
    {
      title: "Download PDF",
      key: "download",
      render: (text, record) => (
        <Button
          type="link"
          icon={<FaRegFilePdf style={{ fontSize: "24px", color: 'red' }} />}
          onClick={() => downloadPDF(record)}
        />
      ),
    },

  ];



  return (
    <div className="container mx-auto py-5">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">All Bookings</h1>
        {/* <Button
          type="primary"
          onClick={() => {
            setEditingBooking(null); // Reset editing booking
            setVisible(true);
          }}
          style={{ marginBottom: 16 }}
        >
          <PlusOutlined /> Create Booking
        </Button> */}
      </div>
      <Table columns={columns} dataSource={bookings} rowKey="_id" scroll={{ x: 800 }} />
      {/* <CreateAndEditBooking
        visible={visible}
        setVisible={setVisible}
        fetchBookings={fetchBookings}
        editingBooking={editingBooking} // Pass the editing booking
      /> */}

      <ViewBookingDetails
        visible={!!viewingBooking}
        onClose={closeViewModal}
        booking={viewingBooking}
      />

      <PaymentForm
        visible={showPaymentForm}
        onClose={closePaymentForm}
        singleBooking={singleBooking}
        fetchBookings={fetchBookings}
      />
      <PaymentList
        bookingId={selectedBooking?._id}
        visible={paymentListVisible}
        onClose={closePaymentList}
      />
    </div>
  );
};

export default BookingsComponent;

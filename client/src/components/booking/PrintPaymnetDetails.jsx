import React from "react";

const PrintPaymentDetails = ({ paymentData }) => {
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");

    // Check if the window was blocked by a pop-up blocker
    if (!printWindow) {
      alert("Pop-up blocked! Please allow pop-ups for this site to print.");
      return;
    }

    // Generate payment details HTML
    const paymentDetailsHtml = paymentData
      .map((payment, index) => {
        return `
          <div class="passenger">
            <h3>Payment ${index + 1}</h3>
            <p><strong>Name:</strong> ${payment.userRef?.name || "N/A"}</p>
            <p><strong>Phone:</strong> ${payment.userRef?.phone || "N/A"}</p>
            <p><strong>Amount:</strong> ${payment?.amount + " TK" || "N/A"}</p>
            <p><strong>Bank Name:</strong> ${payment?.bankName || "N/A"}</p>
            <p><strong>Account Number:</strong> ${payment?.accountNumber || "N/A"}</p>
            <p><strong>Payment Method:</strong> ${payment?.paymentMethod || "N/A"}</p>
          </div>
        `;
      })
      .join(""); // Join all mapped items into a single string

    // Small delay to ensure the print window is ready
    setTimeout(() => {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Payment Details</title>
            <style>
              body {
                font-family: 'Arial', sans-serif;
                padding: 20px;
                background-color: #f4f4f4;
                color: #333;
              }
              h2, h3 {
                color: #0056b3;
                border-bottom: 2px solid #0056b3;
                padding-bottom: 5px;
              }
              img {
                max-width: 100%;
                height: auto;
                border-radius: 8px;
                margin-bottom: 10px;
              }
              .paid_image {
                width: 180px; 
                position: absolute;
                right: 0;
                top: 64%;
                transform: translateY(-50%);
              }
              ul {
                list-style-type: circle;
                padding-left: 20px;
              }
              .booking-summary {
                background: white;
                border-radius: 8px;
                position: relative;
                margin-bottom: 20px;
              }
              .margin {
                margin-top: 60px;
                padding: 15px;
                border: 1px solid #ddd;
                border-radius: 8px;
                background-color: #fafafa;
              }
              .title {
                text-align: center;
                margin-bottom: 40px;
              }
              .passenger {
                margin-bottom: 20px;
                border: 1px solid #ddd;
                border-radius: 8px;
                padding: 15px;
                background-color: #fafafa;
              }
              .justify {
                text-align: justify;
              }
              .documents {
                display: flex;
                gap: 10px;
                margin-top: 10px;
              }
              a {
                text-decoration: none;
              }
              .document-image {
                width: 80px;
                height: auto;
                border-radius: 5px;
                border: 1px solid #ccc;
              }
              .footer {
                text-align: center;
                margin-top: 80px;
                padding: 10px;
                border-radius: 5px;
              }
              .paid_booking {
                position: relative;
              }
              .logo_home {
                display: flex;
                justify-content: center;
              }
              .logo_png {
                width: 120px;
                margin: 0 auto;
              }
              .booking_id {
                position: absolute;
                right: 0;
                top: -10px;
                padding: 8px 20px; 
                border: 1px solid #ccc; 
                border-radius: 5px;
              }
              .mt_red {
                margin-top: -5px;
              }
              .mt_top {
                margin-top: 30px;
              }
              @media print {
                body {
                  -webkit-print-color-adjust: exact;
                }
              }
            </style>
          </head>
          <body>
                          <h1 class="title">Payment Details</h1>
            <div class="booking-summary">
              <h2>Booking Details</h2>
              <p><strong>Total Persons:</strong> ${paymentData[0]?.bookingRef?.totalPerson || "N/A"}</p>
              <p><strong>Total Price:</strong> ${paymentData[0]?.bookingRef?.totalPrice || "N/A"}</p>
              <p><strong>Total Due:</strong> ${paymentData[0]?.bookingRef?.totalDue || "N/A"}</p>
              <p><strong>Total Paid:</strong> ${paymentData[0]?.bookingRef?.totalPay || "N/A"}</p>
              <h2>Payment Details</h2>
              ${paymentDetailsHtml}
            </div>
          </body>
        </html>
      `);

      printWindow.document.close();

      // Wait for the content to load before triggering print
      printWindow.onload = () => {
        printWindow.print();
        printWindow.close();
      };
    }, 100); // 100 ms delay to ensure print window is fully ready
  };

  return (
    <div className="relative">
      {
        paymentData?.length !== 0 && (
          <button
          className="px-5 rounded-md py-1.5 absolute right-0 top-0 mt-10 bg-semisecondary text-white font-bold transition"
          onClick={handlePrint}
        >
          Payment
        </button>
        )
      }
     
    </div>
  );
};

export default PrintPaymentDetails;

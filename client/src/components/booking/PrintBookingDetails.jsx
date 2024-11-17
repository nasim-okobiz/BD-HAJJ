import React, { useRef } from "react";
import { API_BASE_URL } from "../axios/config";
import logo from "../../assets/logo/logo.png"
const PrintBookingDetails = ({ bookingData }) => {
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");

       setTimeout(() => {
         printWindow.document.write(`
      <html>
        <head>
          <title>Print Booking Details</title>
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
            .paid_image{
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
            //   box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
              margin-bottom: 20px;
            }
              .margin{
              margin-top: 60px;}
              .title{
              text-align: center;
              margin-bottom:40px;
              }
            .passenger {
              margin-bottom: 20px;
              border: 1px solid #ddd;
              border-radius: 8px;
              padding: 15px;
              background-color: #fafafa;
            }
              .justify{
              text-align: justify;}
            .documents {
              display: flex;
              gap: 10px;
              margin-top: 10px;
            }
              a{
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
              .paid_booking{
              position: relative;
              }
              .logo_home{
              display: flex;
              justify-content: center;
              }
              .logo_png{
              width: 120px;
              margin:0 auto;
              }
              .booking_id{
              position: absolute;
              right: 0;
              top: -10px;
              padding: 8px 20px; 
              border:1px solid #ccc; 
              border-radius: 5px;
              }
              .mt_red{
              margin-top: -5px;}
              .mt_top{
              margin-top: 30px;}
            @media print {
              body {
                -webkit-print-color-adjust: exact;
              }
            }
          </style>
        </head>
        <body>
          <div class="booking-summary">
          <div class="booking_id">
            <p><strong>Booking ID:</strong></p>
            <p class="mt_red"><strong> ${
                bookingData.bookingId
            }</strong></p>
          </div>

          <div class="logo_home">
            <img class="logo_png" src=${logo} />
          </div>
         
            <div class="paid_booking">
                <h1 class="title">Booking Details</h1>
                            <h2>Package Information</h2>
            
            <p><strong>Package Name:</strong> ${bookingData.packageRef.name}</p>
            <p><strong>Title:</strong> ${bookingData.packageRef.title}</p>
            <p><strong>Total Price:</strong> ${bookingData.totalPrice} BDT</p>
            <p><strong>Total Due:</strong> ${bookingData?.totalDue} BDT</p>
            <p><strong>Discount:</strong> ${
              bookingData.packageRef.discount
            }%</p>
            <p><strong>Valid Until:</strong> ${new Date(
              bookingData.packageRef.validDate
            ).toLocaleDateString()}</p>
                ${
                  bookingData?.totalDue < 1
                    ? `<img class="paid_image" src="https://i.ibb.co/fYtdbh7/paid.webp" alt="Paid" /> `
                    : `<img class="paid_image" src="https://i.ibb.co.com/wzVWdfs/360-F-506442070-Ud7su3y-Jr7-Ic2-UTh-Ioz-B8t3-J3iz-Q5u1-S.jpg" alt="Due" />`
                }
            </div>
            

            
            <h3 class="">Included in Package:</h3>
            <ul>
              ${bookingData.packageRef.packageIncludes
                .map((item) => `<li>${item}</li>`)
                .join("")}
            </ul>
            <h3 class="">Excludes:</h3>
            <ul>
              ${bookingData.packageRef.packageExcludes
                .map((item) => `<li>${item}</li>`)
                .join("")}
            </ul>

          </div>
          <h2>Passenger Information</h2>
          ${bookingData.personRef
            .map(
              (person) => `
              <div class="passenger">
                <p><strong>Name:</strong> ${person.name}</p>
                <p><strong>Email:</strong> ${person.eamil}</p>
                <p><strong>Phone:</strong> ${person.phone}</p>
                <div class="documents">
                  <img class="document-image" src="${
                    API_BASE_URL + person.nidFront
                  }" alt="NID Front" />
                  <img class="document-image" src="${
                    API_BASE_URL + person.nidBack
                  }" alt="NID Back" />
                  <img class="document-image" src="${
                    API_BASE_URL + person.passportFront
                  }" alt="Passport Front" />
                  <img class="document-image" src="${
                    API_BASE_URL + person.passportBack
                  }" alt="Passport Back" />
                  <img class="document-image" src="${
                    API_BASE_URL + person.passportPhoto
                  }" alt="Passport Photo" />
                </div>
              </div>`
            )
            .join("")}
            <h3 class="margin">Terms & Conditions:</h3>
            <p class="justify">${bookingData.packageRef.termsAndConditions}</p>
            <div class="footer">
                <p>Thank you for booking with <strong>BD Hajj</strong>.</p>
                <p>Contact us for any inquiries.</p>
                <p> <a  href="telto:01955-900800">01955-900800</a></p>
                <p><a href="telto: 01605959999"> 01605959999</a></p>
                <p><strong>BD Hajj</strong> All rights reserved.</p>
            </div>

        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  }, 100);
  };

  return (
    <div className="relative">
      <button
        className="px-8 rounded-md py-1.5 absolute right-0 top-0 bg-semisecondary text-white font-bold  transition"
        onClick={handlePrint}
      >
        Print
      </button>
    </div>
  );
};

export default PrintBookingDetails;

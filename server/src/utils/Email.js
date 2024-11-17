const nodemailer = require("nodemailer");
const { convert } = require("html-to-text");

module.exports = class Email {
  constructor(user, OTP) {
    this.to = user.email;
    this.firstName = user.name ? user.name.split(" ")[0] : "Admin";
    this.OTP = OTP;
    this.from = `BD Umrah Hajj Kafela <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  // Send the actual email
  async send(html, subject) {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: convert(html), // Optionally convert HTML to plain text
    };

    // Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    const html = `
      <h1>Welcome to the Agro Infusion Family, ${this.firstName}!</h1>
      <p>We are excited to have you onboard.</p>
      <p>Click <a href="${this.OTP}">here</a> to get verified.</p>
    `;

    await this.send(html, "Welcome to the Agro Infusion Family!");
  }

  async sendForgetPasswordOTP() {
    const html = `
      <div style="font-family: Arial, sans-serif; color: #333; padding: 20px; max-width: 600px; margin: auto;">
        <h1 style="color: #4CAF50;">Password Forget Request</h1>
        <p>Hi ${this.firstName},</p>
        <p>We received a request to forget your password. Please click the link below to forget your password:</p>
        <p>
          <a href="#" style="background-color: #4CAF50; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">
          ${this.OTP}
          </a>
        </p>
        <p>If you did not request a password forget, please ignore this email.</p>
        <p>This link will expire in 5 minutes.</p>
        <p> জাযাকাল্লাহু খাইরান,</p>
        <p><strong>The BD Umrah Hajj Kafela</strong></p>
      </div>  
    `;

    await this.send(html, "Your password forget token (valid only for 5 minutes)");
  }

  // use this method 
  async sendAgentPaymentInvoice(userAgentPayment) {
    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h1 style="background-color: #4CAF50; color: white; padding: 10px 20px; border-radius: 5px; text-align: center;">
          Your Payment Invoice for Withdrawals
        </h1>
        <p style="font-size: 16px;">Assalamu Alaikum ${this.firstName},</p>
        <p style="font-size: 14px; margin-bottom: 20px;">
          Below are the details of your last 10 payment withdrawals:
        </p>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
          <thead>
            <tr style="background-color: #f4f4f4;">
              <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">Pay Name</th>
              <th style="border: 1px solid #ddd; padding: 10px; text-align: right;">Amount</th>
              <th style="border: 1px solid #ddd; padding: 10px; text-align: center;">Date</th>
              <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">Payment Method</th>
            </tr>
          </thead>
          <tbody>
            ${userAgentPayment
        ?.slice(0, 10) // Limit to 10 items
        .map((item) => {
          const formattedDate = new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }).format(new Date(item?.paymentDate));

          return `
                  <tr>
                    <td style="border: 1px solid #ddd; padding: 10px;">${item?.userRef.name}</td>
                    <td style="border: 1px solid #ddd; padding: 10px; text-align: right;">৳ ${item.amount}</td>
                    <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">${formattedDate}</td>
                    <td style="border: 1px solid #ddd; padding: 10px;">${item.paymentMethod}</td>
                  </tr>
                `;
        })
        .join("")}
          </tbody>
        </table>
  
        <p style="font-size: 14px; margin-top: 20px;">
          জাযাকাল্লাহু খাইরান
        </p>
        <p style="font-size: 14px; color: #555;">
          Developed and powered by <a href='https://www.okobiz.com' style="color: #4CAF50;">okobiz</a>
        </p>
      </div>
    `;

    await this.send(html, "Your Payment Invoice for Withdrawals");
  }
  // use this method 
  async sendbookingPaymnetOnlineInvoice(result) { //
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(result.paymentDate));

    const html = `
      <html>
        <head>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              background-color: #f9f9f9;
              color: #333;
              margin: 0;
              padding: 0;
            }
            .container {
              width: 100%;
              max-width: 700px;
              margin: 20px auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }
            h1 {
              color: #333;
              font-size: 28px;
              margin-bottom: 10px;
              text-align: center;
            }
            p {
              font-size: 16px;
              line-height: 1.6;
              margin: 10px 0;
            }
            .invoice-details {
              margin-bottom: 20px;
              padding: 15px;
              background-color: #f0f0f0;
              border-radius: 8px;
              border: 1px solid #ddd;
            }
            .invoice-table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            .invoice-table th, .invoice-table td {
              padding: 12px;
              text-align: center;
              border: 1px solid #ddd;
            }
            .invoice-table th {
              background-color: #007BFF;
              color: white;
            }
            .invoice-table td {
              background-color: #f9f9f9;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              font-size: 14px;
            }
            .footer a {
              color: #007BFF;
              text-decoration: none;
            }
            .highlight {
              font-weight: bold;
              color: #007BFF;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Your Payment Invoice</h1>
            <p>Assalamu Alaikum ${this.firstName},</p>
            <p>Thank you for your payment! Here are the payment details:</p>

            <div class="invoice-details">
              <p><strong>Package Details:</strong></p>
              <p><strong>Total Price:</strong> ৳ ${result.bookingRef.totalPrice}</p>
              <p><strong>Total Paid:</strong> ৳ ${result?.bookingRef?.totalPay + result.amount}</p>
              <p><strong>Total Due:</strong> ৳ ${result?.bookingRef?.totalDue - result.amount}</p>
              <p><strong>Booking ID:</strong> <span class="highlight">${result.bookingRef.bookingId}</span></p>
            </div>

            <p>Here are the payment details:</p>
            <table class="invoice-table">
              <thead>
                <tr>
                  <th>Pay Name</th>
                  <th>Booking Price</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Payment Method</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>${result.userRef.name}</td>
                  <td>৳ ${result.bookingRef.totalPrice}</td>
                  <td>৳ ${result.amount || 'N/A'}</td>
                  <td>${formattedDate}</td>
                  <td>${result.paymentMethod}</td>
                </tr>
              </tbody>
            </table>

            <p>Thank you for your business! If you have any questions, feel free to reach out.</p>

            <div class="footer">
              <p>জাযাকাল্লাহু খাইরান</p>
              <p>Developed and powered by <a href="https://www.okobiz.com" target="_blank">okobiz</a></p>
            </div>
          </div>
        </body>
      </html>
    `;

    await this.send(html, "Your Payment Invoice");
  }
  // use this method 
  async sendbookingPaymnetBankInvoice(result) {
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(new Date(result.paymentDate));

    const html = `
      <html>
        <head>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              background-color: #f9f9f9;
              color: #333;
              margin: 0;
              padding: 0;
            }
            .container {
              width: 100%;
              max-width: 700px;
              margin: 20px auto;
              padding: 20px;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            }
            h1 {
              color: #333;
              font-size: 28px;
              margin-bottom: 10px;
              text-align: center;
            }
            p {
              font-size: 16px;
              line-height: 1.6;
              margin: 10px 0;
            }
            .invoice-details {
              margin-bottom: 20px;
              padding: 15px;
              background-color: #f0f0f0;
              border-radius: 8px;
              border: 1px solid #ddd;
            }
            .invoice-table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
            }
            .invoice-table th, .invoice-table td {
              padding: 12px;
              text-align: center;
              border: 1px solid #ddd;
            }
            .invoice-table th {
              background-color: #007BFF;
              color: white;
            }
            .invoice-table td {
              background-color: #f9f9f9;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              font-size: 14px;
            }
            .footer a {
              color: #007BFF;
              text-decoration: none;
            }
            .highlight {
              font-weight: bold;
              color: #007BFF;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Your Payment Invoice</h1>
            <p>Assalamu Alaikum ${this.firstName},</p>
            <p>Thank you for your payment! Here are the payment details:</p>

            <div class="invoice-details">
              <p><strong>Package Details:</strong></p>
              <p><strong>Total Price:</strong> ৳ ${result.bookingRef.totalPrice}</p>
              <p><strong>Total Paid:</strong> ৳ ${result?.bookingRef?.totalPay + result.amount}</p>
              <p><strong>Total Due:</strong> ৳ ${result?.bookingRef?.totalDue - result.amount}</p>
              <p><strong>Booking ID:</strong> <span class="highlight">${result.bookingRef.bookingId}</span></p>
            </div>

            <p>Here are the payment details:</p>
            <table class="invoice-table">
              <thead>
                <tr>
                  <th>Pay Name</th>
                  <th>Booking Price</th>
                  <th>Amount</th>
                  <th>Bank Name</th>
                  <th>Account Number</th>
                  <th>Date</th>
                  <th>Payment Method</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>${result.userRef.name}</td>
                  <td>৳ ${result.bookingRef.totalPrice}</td>
                  <td>৳ ${result.amount || 'N/A'}</td>
                  <td>${result.bankName}</td>
                  <td>${result.accountNumber}</td>
                  <td>${formattedDate}</td>
                  <td>${result.paymentMethod}</td>
                </tr>
              </tbody>
            </table>

            <p>Thank you for your business! If you have any questions, feel free to reach out.</p>

            <div class="footer">
              <p>জাযাকাল্লাহু খাইরান</p>
              <p>Developed and powered by <a href="https://www.okobiz.com" target="_blank">okobiz</a></p>
            </div>
          </div>
        </body>
      </html>
    `;

    await this.send(html, "Your Payment Invoice");
  }

  async sendInvoice(order) {
    const html = `
      <h1>Your Order Invoice</h1>
      <p>Hi ${this.firstName},</p>
      <p>Thank you for your order. Here are the details:</p>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr>
            <th style="border: 1px solid #ddd; padding: 8px;">Product</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Quantity</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Size</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Price</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Discount (Per Unit)</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${order.products
        .map((item) => {
          const originalPrice = item.product.price;
          const discountPrice = item.product.salePrice || originalPrice;
          const discountAmount = originalPrice - discountPrice;

          const discountPercentage = (
            (discountAmount / originalPrice) *
            100
          ).toFixed(2);

          const subtotal = discountPrice * item.quantity;

          return `
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${item.product.title
            }</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${item.quantity
            }</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">${item.product.size || "N/A"
            }</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">৳ ${originalPrice.toFixed(
              2
            )}</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">৳ ${discountAmount.toFixed(
              2
            )} (${discountPercentage}%)</td>
                <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">৳ ${subtotal.toFixed(
              2
            )}</td>
              </tr>
            `;
        })
        .join("")}
        </tbody>
      </table>
      <p><strong>Sub-Total: ৳ ${order.totalCost}</strong></p>
      <p><strong>Order Status: ${order.orderStatus.toUpperCase()}</strong></p>
      <p>Thanks for shopping with us!</p>
      <p>Developed and powered by <a href='https://www.okobiz.com'>okobiz</a></p>
    `;

    await this.send(html, "Your Order Invoice");
  }

  async sendStockAlert(product) {
    const html = `
      <h1>Stock Alert for Product: ${product.title}</h1>
      <p>Dear Admin,</p>
      <p>The stock for the product "<strong>${product.title}</strong>" (SKU: ${product.sku}) is running low or is out of stock.</p>
      <p>Current stock: <strong>${product.stock}</strong></p>
      <p>Please consider restocking the product to ensure availability for future orders.</p>
      <p>Thanks,</p>
      <p>The Agro Infusion System</p>
    `;

    await this.send(
      html,
      `Stock Alert: ${product.title} (SKU: ${product.sku})`
    );
  }
};

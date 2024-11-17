const cors = require("cors");
const express = require("express");
const moment = require("moment-timezone");
const morgan = require("morgan");
const mongoose = require("mongoose");
const rootRouter = require("./api/routes/index.js");
const config = require("./config/config.js");
const globalErrorHandler = require("./middleware/errors/globalErrorHandler.js");
const colors = require("colors");
// const SSLCommerzPayment = require('sslcommerz-lts')
require("dotenv/config");
const app = new express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

moment.tz.setDefault("Asia/Dhaka");
const currentDate = moment();
console.log(currentDate.format("YYYY-MM-DD HH:mm:ss"));

app.use(`/api/v1${config.uploadPath}`, express.static(config.uploadFolder));
app.use("/api/v1", rootRouter);

app.get("/api", (req, res, next) => {
  res.send("welcome to okobiz");
});

app.get("/time", (req, res, next) => {
  res.send(currentDate.format("YYYY-MM-DD HH:mm:ss"));
});

app.use(globalErrorHandler);

mongoose
  .connect(config.databaseUrl, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("Database connection successful! --------------"))
  .catch((err) => {
    console.error("Database connection error:", err.message);
    console.error("Full error details:", err);
  });

app.listen(config.port, () => {
  console.log(`app listening to port `, config.port);
});

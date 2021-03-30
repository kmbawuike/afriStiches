// Package Imports
const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");

// Routes
const UserRoutes = require("./routes/user");

// Database setup
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Database is connected"))
  .catch((e) => console.log(e));
// Defined App
const app = express();

// middleware
app.use(morgan("dev"));
app.use(express.urlencoded());
app.use(express.json());
app.use(cookieParser());
app.use(expressValidator());

// Router Middleware
app.use("/api", UserRoutes);

// Port
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening to port ${port}`));

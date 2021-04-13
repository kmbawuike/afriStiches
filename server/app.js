// Package Imports
const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const cors = require('cors')

// Routes
const AuthRoutes = require("./routes/auth");
const UserRoutes = require("./routes/user");
const CategoryRoutes = require("./routes/category");
const ProductRoutes = require("./routes/product")

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
app.use(cors())

// Router Middleware
app.use("/api", AuthRoutes);
app.use("/api", UserRoutes);
app.use("/api", CategoryRoutes);
app.use("/api", ProductRoutes)

// Port
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening to port ${port}`));

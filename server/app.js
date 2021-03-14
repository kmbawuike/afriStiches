const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Database is connected"))
  .catch((e) => console.log(e));
// Defined App
const app = express();

// Routes
app.get("/", (req, res) => {
  res.send("Running node for thr first time");
});

// Port
const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Listening to port ${port}`));

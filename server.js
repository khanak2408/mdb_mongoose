const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const studentRoutes = require("./Routes/studentRoutes");
const app = express();
app.use(express.json());

app.use("/api/students", studentRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () => {
      console.log("Server running on Port 5000");
    });
  })
  .catch((error) => {
    console.error("MongoDB Connection Failed");
  });

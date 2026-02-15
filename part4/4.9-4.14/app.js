require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const BlogsRouter = require("./controllers/blogs");
const config = require("./utils/config");
const app = express();

app.use(express.json());

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.error("error connecting to MongoDB:", error.message);
  });

app.use("/api/blogs", BlogsRouter);

module.exports = app;

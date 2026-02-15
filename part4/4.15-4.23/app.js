const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const usersRouter = require("./controllers/users");
const blogsRouter = require("./controllers/blogs"); // ✅ FIXED

const app = express();

app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/blogs", blogsRouter);
app.use("/api/login", require("./controllers/login"));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("connected to MongoDB"))
  .catch((error) =>
    console.error("error connecting to MongoDB:", error.message),
  );

module.exports = app;

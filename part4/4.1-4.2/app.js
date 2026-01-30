const express = require("express");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
const BlogsRouter = require("./controllers/blogs");

const app = express();

app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://cathishk:X07hzrWGzKvwZeXp@strawhats.ra8ei.mongodb.net/bloglist?appName=StrawHats",
  )
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.error("error connecting to MongoDB:", error.message);
  });

app.use("/api/blogs", BlogsRouter);

module.exports=app;

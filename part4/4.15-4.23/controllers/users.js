const usersRouter = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user");

usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    url: 1,
  });

  res.json(users);
});

usersRouter.post("/", async (req, res) => {
  const { username, name, password } = req.body;

  if (!password || password.length < 3 || !username) {
    return res.status(400).json({
      error: "username and password must be at least 3 characters long",
    });
  }
const passwordHash = bcrypt.hashSync(password, 10);


  const user = new User({
    username,
    name,
    passwordHash,
    blogs: [],
  });

  const savedUser = await user.save();
  res.status(201).json(savedUser);
});

module.exports = usersRouter;

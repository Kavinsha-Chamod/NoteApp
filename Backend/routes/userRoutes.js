const express = require("express");
const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const tokenKey = process.env.TOKEN_SECRET;

const userRouter = express.Router();

userRouter.get("/", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong", status: 0 });
  }
});

userRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      console.error(err);
      return res.status(500).send({ message: "Error hashing password", status: 0 });
    }
    try {
      let user = new UserModel({ name, email, password: hash });
      await user.save();
      res.status(200).send({ message: "User registered successfully", status: 1 });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error saving user", status: 0 });
    }
  });
});


userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let data = await UserModel.find({ email });
    if (data.length > 0) {
      let token = jwt.sign({ userId: data[0]._id },tokenKey, { expiresIn: "30m" });
      bcrypt.compare(password, data[0].password, function (err, result) {
        if (err)
          return res.send({ message: "Something went wrong" + err, status: 0 });
        if (result) {
          res.send({ message: "Login success", token: token, status: 1 });
        } else {
          res.send({ message: "Password is incorrect", status: 0 });
        }
      });
    } else return res.send({ message: "User not found", status: 0 });
  } catch (error) {
    res.send({ message: error.message, status: 0 });
  }
});

module.exports = userRouter;

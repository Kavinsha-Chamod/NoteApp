const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticator = require("../middlewares/authenticator");
const NoteModel = require("../models/NoteModel");

const noteRouter = express.Router();
noteRouter.use(authenticator);

noteRouter.get("/", async (req, res) => {
  try {
    const notes = await NoteModel.find({ user: req.users.userId });
    res.send({ status: 1, message: "Success", data: notes });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong", status: 0 });
  }
});

noteRouter.post("/create", async (req, res) => {
  try {
    const { title, body } = req.body;
    const user = req.users.userId;

    let note = new NoteModel({ title, body, user });
    await note.save();
    res.send({ message: "Note created successfully", status: 1 });
  } catch (error) {
    res.send({ message: error.message, status: 0 });
  }
});

noteRouter.patch("/", async (req, res) => {
  let { id } = req.headers;
  try {
    await NoteModel.findByIdAndUpdate({ _id: id }, req.body);
    res.send({ message: "Note updated successfully", status: 1 });
  } catch (error) {
    res.send({ message: error.message, status: 0 });
  }
});

noteRouter.delete("/", async (req, res) => {
  let { id } = req.headers;
  try {
    await NoteModel.findByIdAndDelete({ _id: id });
    res.send({ message: "Note deleted", status: 1 });
  } catch (error) {
    res.send({ message: error.message, status: 0 });
  }
});

module.exports = noteRouter;

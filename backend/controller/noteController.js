const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Note = require("../model/NoteModel");
const User = require("../model/UserModel");

// create Note
const createNote = async (req, res, next) => {
  try {
    const { User_Id, Catogory, Note_Title, Note_Text } = req.body;
    console.log(User_Id, Catogory, Note_Title, Note_Text);

    const userExist = await User.findOne({ _id: User_Id });
    if (!userExist) return res.status(402).send("User does not exist...");

    const note = await Note.create({
      User_Id,
      Catogory,
      Note_Title,
      Note_Text,
    });

    res.status(200).json({ note });

    if (!note) return res.status(401).json("Problem creating a note");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//! get a specific users Notes
const getUserNotes = async (req, res) => {
  try {
    const { User_Id } = req.body;
    if (!mongoose.Types.ObjectId.isValid(User_Id)) {
      return res.status(404).json({ error: "No such User" });
    }

    const notes = await Note.find({ User_Id }).sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// get a Single Note
const getSingleNote = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such Note" });
    }

    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json("no such Note");
    }

    res.status(200).json(note);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// update Note
const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { Catogory, Note_Title, Note_Text } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "no such note to update..." });
    }

    const note = await Note.findById({ _id: id });

    // !! check the user

    const noteDetails = {
      Catogory,
      Note_Title,
      Note_Text,
    };

    const updatedNote = await Note.findByIdAndUpdate({ _id: id }, noteDetails);

    if (updatedNote) {
      res.status(200).json(updatedNote);
    }

    if (!note) {
      return res.status(400).json({ error: "no such a note to update" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// delete Note
const deleteNote = async (req, res) => {
  try {
    const { User_Id } = req.body;
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "No such Note" });
    }

    const note = await Note.findById({ _id: id });

    if (User_Id !== note.User_Id.toHexString()) {
      return res
        .status(400)
        .json({ error: "you are not authorized to delete the note" });
    }

    const deletedNote = await Note.findByIdAndDelete({ _id: id });

    if (!deletedNote) {
      return res.status(400).json("no such note to delete");
    }

    res.status(200).json(deletedNote);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({});

    if (!notes) {
      return res.status(404).json("no such Notes...");
    }

    res.status(200).json(notes);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createNote,
  getUserNotes,
  getSingleNote,
  updateNote,
  deleteNote,
  getAllNotes,
};

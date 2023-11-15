const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema(
  {
    User_Id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    Catogory: { type: String, required: true },
    Note_Title: {
      type: String,
      required: true,
    },
    Note_Text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Note", NoteSchema);

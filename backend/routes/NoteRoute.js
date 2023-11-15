const express = require("express");
const {
  createNote,
  getUserNotes,
  getSingleNote,
  updateNote,
  deleteNote,
  getAllNotes,
} = require("../controller/noteController");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createNote);
router.get("/", authMiddleware, getUserNotes);
router.get("/:id", getSingleNote);
router.put("/:id", updateNote);
router.delete("/:id", authMiddleware, deleteNote);

// router.get("/getallnotes", getAllNotes);

module.exports = router;

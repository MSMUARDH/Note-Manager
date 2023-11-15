const express = require("express");
const router = express.Router();

const {
  registerUser,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  loginUser,
} = require("../controller/userController");

const authMiddleware = require("../middleware/authMiddleware");

router.get("/", getAllUsers);
router.post("/", registerUser);
router.post("/login", loginUser);
router.delete("/:id", deleteUser);
router.get("/get-user-by-id", authMiddleware, getUser);
router.put("/:id", updateUser);

module.exports = router;

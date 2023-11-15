const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../model/UserModel");

const createToken = (_id) => {
  const jwtSecretKey = process.env.ACCESS_TOKEN_SECRET;
  return jwt.sign({ _id }, jwtSecretKey, { expiresIn: "3d" });
};

// create User
const registerUser = async (req, res) => {
  try {
    const { First_name, Last_name, Email, Password } = req.body;

    let emptyFields = [];

    if (!First_name) {
      emptyFields.push("firstname");
    }

    if (!Last_name) {
      emptyFields.push("lastname");
    }
    if (!Email) {
      emptyFields.push("email");
    }

    if (!Password) {
      emptyFields.push("password");
    }

    if (emptyFields.length > 0) {
      return res
        .status(400)
        .json({ error: "All fields are required..", emptyFields });
    }

    if (Email) {
      console.log("Email here");
    }

    const hashedPassword = await bcrypt.hash(Password, 10);

    const userDetails = {
      First_name,
      Last_name,
      Email,
      Password: hashedPassword,
    };

    const userExist = await User.findOne({ Email: Email });
    if (userExist) return res.status(402).send("User already exists..");

    const user = await User.create(userDetails);
    const token = createToken(user._id);

    res.status(200).json({ _id: user._id, Email });

    if (!user) return res.status(401).json("Problem creating a user");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//! Login User
const loginUser = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    const userExist = await User.findOne({ Email: Email });

    if (!userExist)
      return res
        .status(400)
        .json({ message: "user needs to register first ", success: false });

    const isValid = await bcrypt.compare(Password, userExist.Password);

    if (userExist && !isValid)
      return res
        .status(400)
        .json({ message: "Password is incorrect", success: false });

    if (isValid) {
      // const user = { _id: userExist._id };
      // const token = createToken(user._id);
      const _id = userExist._id;
      const token = createToken(_id);

      res.status(200).send({
        message: "Login successful",
        success: true,
        token: token,
      });
    } else {
      res
        .status(400)
        .json({ message: "Email or password is incorrect", success: false });
    }
  } catch (err) {
    res.status(500).json({ message: err.message, success: false });
  }
};

// get all employees
const getAllUsers = async (req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });
  res.status(200).json(users);
};

// get a Single Employee
const getUser = async (req, res) => {
  const { User_Id } = req.body;

  if (!mongoose.Types.ObjectId.isValid(User_Id)) {
    return res.status(404).json({ error: "No such User" });
  }

  const user = await User.findById(User_Id);

  if (!user) {
    return res.status(404).json("no such User");
  }

  return res.status(200).json({ success: true, data: user.First_name });
};

// update employee
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { First_name, Last_name, Email, Password } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "no such user" });
  }

  const hashedPassword = await bcrypt.hash(Password, 10);

  const userDetails = {
    First_name,
    Last_name,
    Email,
    Password: hashedPassword,
  };

  const user = await User.findByIdAndUpdate({ _id: id }, userDetails);

  if (!user) {
    return res.status(400).json({ error: "no such a user to update" });
  }

  res.status(200).json(user);
};

// /delete employee

const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such User" });
  }

  const user = await User.findByIdAndDelete({ _id: id });

  if (!user) {
    return res.status(400).json("no such user to delete");
  }

  res.status(200).json(user);
};

module.exports = {
  registerUser,
  getAllUsers,
  getUser,
  deleteUser,
  updateUser,
  loginUser,
};

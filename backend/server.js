require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");

const validator = require("validator");

const userRoutes = require("./routes/UserRoute");
const noteRoutes = require("./routes/NoteRoute");

//express app
const app = express();

//middleware
app.use(express.json());

// Enable CORS for requests from http://localhost:3000
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

//routes
app.use("/api/user", userRoutes);
app.use("/api/note", noteRoutes);

const port = process.env.PORT || 5000;

mongoose
  .connect(process.env.URI)
  .then(() =>
    app.listen(port, () => {
      console.log("MongoDB connected success....");
      console.log(`app is listening on port ${port}.....`);
    })
  )
  .catch((err) => console.error("Could not connect to MongoDB", err));





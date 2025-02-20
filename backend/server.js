// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const bodyParser = require("body-parser");

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // Connect to MongoDB
// mongoose.connect("mongodb://127.0.0.1:27017/jobPortal", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // User Schema
// const UserSchema = new mongoose.Schema({
//   email: String,
//   password: String,
// });

// const User = mongoose.model("User", UserSchema);

// // Register Route
// app.post("/register", async (req, res) => {
//   const { email, password } = req.body;
//   const userExists = await User.findOne({ email });

//   if (userExists) {
//     return res.status(400).json({ message: "User already exists" });
//   }

//   const newUser = new User({ email, password });
//   await newUser.save();
//   res.status(201).json({ message: "User registered successfully" });
// });

// // Login Route
// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email, password });

//   if (!user) {
//     return res.status(400).json({ message: "Invalid credentials" });
//   }

//   res.status(200).json({ message: "Login successful" });
// });

// // Start server
// app.listen(5000, () => console.log("Server running on port 5000"));


const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/jobPortal", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const UserSchema = new mongoose.Schema({
    email: String,
    password: String
});
const User = mongoose.model("User", UserSchema);

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });

    if (user) {
        res.json({ message: "Login successful" });
    } else {
        res.status(401).json({ message: "Invalid email or password" });
    }
});

app.post("/login-success", (req, res) => {
    console.log("Login successful:", req.body.email);
    res.json({ message: "Login event logged successfully" });
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});

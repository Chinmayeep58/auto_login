require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const puppeteer = require("puppeteer");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// **Connect to MongoDB**
mongoose.connect("mongodb://127.0.0.1:27017/jobPortal", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// **User Schema**
const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
});
const User = mongoose.model("User", UserSchema);

// **Naukri Login API**
app.post("/naukri-login", async (req, res) => {
  const { email, password } = req.body;

  // **Check if user exists**
  let user = await User.findOne({ email });

  if (!user) {
    console.log("User not found. Registering user...");
    user = new User({ email, password });
    await user.save();
  } else {
    console.log("User already registered. Proceeding to login...");
  }

  // **Automate Naukri login using Puppeteer**
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    await page.goto("https://www.naukri.com/nlogin/login", { waitUntil: "networkidle2" });

    // **Enter Email**
    await page.waitForSelector("#usernameField");
    await page.type("#usernameField", email, { delay: 50 });

    // **Enter Password**
    await page.waitForSelector("#passwordField");
    await page.type("#passwordField", password, { delay: 50 });

    // **Click Login Button**
    await page.click('button[type="submit"]');
    await new Promise(resolve => setTimeout(resolve, 5000));
 // Wait for login processing

    // **Check if login was successful**
    const loginError = await page.$(".error-msg"); // Check for error message
    if (loginError) {
      res.json({ message: "❌ Login Failed: Invalid Credentials" });
    } else {
      res.json({ message: "✅ Connection Successful! Logged into Naukri." });
    }
  } catch (error) {
    console.error("Naukri Login Error:", error);
    res.json({ message: "❌ Naukri Login Failed: " + error.message });
  } finally {
    await browser.close();
  }
});

// **Start Server**
app.listen(5000, () => console.log("🚀 Server running on port 5000"));

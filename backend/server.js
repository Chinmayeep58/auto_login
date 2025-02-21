// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const puppeteer = require("puppeteer");

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // **Connect to MongoDB**
// mongoose.connect("mongodb://127.0.0.1:27017/jobPortal", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// // **User Schema**
// const UserSchema = new mongoose.Schema({
//   email: String,
//   password: String,
// });
// const User = mongoose.model("User", UserSchema);

// // **Naukri Login API**
// app.post("/naukri-login", async (req, res) => {
//   const { email, password } = req.body;

//   // **Check if user exists**
//   let user = await User.findOne({ email });

//   if (!user) {
//     console.log("User not found. Registering user...");
//     user = new User({ email, password });
//     await user.save();
//   } else {
//     console.log("User already registered. Proceeding to login...");
//   }

//   // **Automate Naukri login using Puppeteer**
//   const browser = await puppeteer.launch({ headless: false });
//   const page = await browser.newPage();

//   try {
//     await page.goto("https://www.naukri.com/nlogin/login", { waitUntil: "networkidle2" });

//     // **Enter Email**
//     await page.waitForSelector("#usernameField");
//     await page.type("#usernameField", email, { delay: 50 });

//     // **Enter Password**
//     await page.waitForSelector("#passwordField");
//     await page.type("#passwordField", password, { delay: 50 });

//     // **Click Login Button**
//     await page.click('button[type="submit"]');
//     await new Promise(resolve => setTimeout(resolve, 5000));
//  // Wait for login processing

//     // **Check if login was successful**
//     const loginError = await page.$(".error-msg"); // Check for error message
//     if (loginError) {
//       res.json({ message: "❌ Login Failed: Invalid Credentials" });
//     } else {
//       res.json({ message: "✅ Connection Successful! Logged into Naukri." });
//     }
//   } catch (error) {
//     console.error("Naukri Login Error:", error);
//     res.json({ message: "❌ Naukri Login Failed: " + error.message });
//   } finally {
//     await browser.close();
//   }
// });

// // **Start Server**
// app.listen(5000, () => console.log("🚀 Server running on port 5000"));


require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const puppeteer = require("puppeteer");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// **Connect to Local MongoDB**
mongoose.connect("mongodb://127.0.0.1:27017/jobPortal", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to local MongoDB"))
.catch((err) => console.error("MongoDB Connection Error:", err));

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
    await page.waitForSelector("#usernameField", { timeout: 5000 });
    await page.type("#usernameField", email, { delay: 50 });

    // **Enter Password**
    await page.waitForSelector("#passwordField", { timeout: 5000 });
    await page.type("#passwordField", password, { delay: 50 });

    // **Click Login Button**
    await page.click('button[type="submit"]');

    // **Wait for either success or failure**
    const navigationResult = await Promise.race([
      page.waitForSelector(".error-msg", { timeout: 8000 }).then(() => "error"), // Login failed
      page.waitForSelector(".nI-gNb-drawer__icon", { timeout: 8000 }).then(() => "success") // Dashboard loaded
    ]);

    if (navigationResult === "error") {
      res.json({ message: "Login Failed: Invalid Credentials" });
    } else if (navigationResult === "success") {
      res.json({ message: "Connection Successful! Logged into Naukri." });
    } else {
      res.json({ message: "Login Failed: Unable to determine login status." });
    }
  } catch (error) {
    console.error("Naukri Login Error:", error);
    res.json({ message: "Naukri Login Failed: " + error.message });
  } finally {
    await browser.close();
  }
});

// **Start Server**
app.listen(5000, () => console.log("Server running on port 5000"));

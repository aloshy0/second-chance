const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { connectToDatabase } = require("../db");

const router = express.Router();
const SECRET = "mysecretkey";

/* Register */
router.post("/register", async (req, res) => {
  try {
    const db = await connectToDatabase();

    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.collection("users").insertOne({
      email,
      password: hashedPassword
    });

    res.json({ message: "User registered", result });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* Login */
router.post("/login", async (req, res) => {
  try {
    const db = await connectToDatabase();

    const { email, password } = req.body;

    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ email: user.email }, SECRET);

    res.json({ message: "Login successful", token });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* Update user info */
router.put("/update", async (req, res) => {
  try {
    const db = await connectToDatabase();

    const { email, newEmail } = req.body;

    const result = await db.collection("users").updateOne(
      { email },
      { $set: { email: newEmail } }
    );

    res.json({ message: "User updated", result });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
const express = require("express");
const { connectToDatabase } = require("../db");

const router = express.Router();

/* Search items by category */
router.get("/", async (req, res) => {
  try {
    const db = await connectToDatabase();

    const category = req.query.category;

    const items = await db
      .collection("items")
      .find({ category: category })
      .toArray();

    res.json(items);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
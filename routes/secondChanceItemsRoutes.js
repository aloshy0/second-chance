const express = require("express");
const multer = require("multer");
const { ObjectId } = require("mongodb");
const { connectToDatabase } = require("../db");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

/* POST - upload item with file */
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const db = await connectToDatabase();

    const item = {
      name: req.body.name,
      category: req.body.category,
      price: req.body.price,
      file: req.file ? req.file.filename : null
    };

    const result = await db.collection("items").insertOne(item);
    res.json(result);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* GET - all items */
router.get("/", async (req, res) => {
  try {
    const db = await connectToDatabase();
    const items = await db.collection("items").find().toArray();
    res.json(items);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* GET - item by id */
router.get("/:id", async (req, res) => {
  try {
    const db = await connectToDatabase();

    const item = await db
      .collection("items")
      .findOne({ _id: new ObjectId(req.params.id) });

    res.json(item);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* DELETE item */
router.delete("/:id", async (req, res) => {
  try {
    const db = await connectToDatabase();

    await db
      .collection("items")
      .deleteOne({ _id: new ObjectId(req.params.id) });

    res.json({ message: "Item deleted" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
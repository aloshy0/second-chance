const express = require("express");

const itemsRoutes = require("./routes/secondChanceItemsRoutes");
const searchRoutes = require("./routes/searchRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(express.json());
app.use(express.static("public"));

/* routes */

app.use("/api/secondchance/items", itemsRoutes);
app.use("/api/secondchance/search", searchRoutes);
app.use("/api/auth", authRoutes);

/* basic landing route */

app.get("/", (req, res) => {
  res.send("Second Chance API running");
});

module.exports = app;
const express = require("express");

const itemsRoutes = require("./routes/secondChanceItemsRoutes");
const searchRoutes = require("./routes/searchRoutes");

const app = express();

app.use(express.json());

/* routes */

app.use("/api/secondchance/items", itemsRoutes);

app.use("/api/secondchance/search", searchRoutes);

/* basic landing route */

app.get("/", (req, res) => {
  res.send("Second Chance API running");
});

module.exports = app;
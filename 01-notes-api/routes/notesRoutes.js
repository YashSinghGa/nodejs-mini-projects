const fs = require("fs");
const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  const notes = JSON.parse(fs.readFileSync("./data/notes.json", "utf-8"));

  res.status(200).json({
    status: "success",
    results: notes.length,
    data: notes,
  });
});

module.exports = router;

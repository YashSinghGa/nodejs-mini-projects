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
// GET Note By ID
router.get("/:id", (req, res) => {
  const notes = JSON.parse(fs.readFileSync("./data/notes.json", "utf-8"));

  const id = Number(req.params.id);

  const note = notes.find((el) => el.id === id);

  if (!note) {
    return res.status(404).json({
      status: "fail",
      message: "Note not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: note,
  });
});

module.exports = router;

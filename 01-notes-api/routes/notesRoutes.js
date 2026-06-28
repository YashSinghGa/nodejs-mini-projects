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

// Create New Note
router.post("/", (req, res) => {
  const notes = JSON.parse(fs.readFileSync("./data/notes.json", "utf-8"));

  const newNote = {
    id: notes.length > 0 ? notes[notes.length - 1].id + 1 : 1,
    title: req.body.title,
    content: req.body.content,
  };

  notes.push(newNote);

  fs.writeFileSync("./data/notes.json", JSON.stringify(notes, null, 2));

  res.status(201).json({
    status: "success",
    data: newNote,
  });
});
module.exports = router;

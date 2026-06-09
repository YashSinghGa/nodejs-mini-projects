const fs = require("fs");
const express = require("express");

const app = express();

// Middleware
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.send("Notes API is running");
});

// Get All Notes
app.get("/notes", (req, res) => {
  const notes = JSON.parse(fs.readFileSync("./data/notes.json", "utf-8"));

  res.status(200).json({
    status: "success",
    results: notes.length,
    data: notes,
  });
});

// Get Note By ID
app.get("/notes/:id", (req, res) => {
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
app.post("/notes", (req, res) => {
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

//
app.patch("/notes/:id", (req, res) => {
  const notes = JSON.parse(fs.readFileSync("./data/notes.json", "utf-8"));

  const id = Number(req.params.id);

  const noteIndex = notes.findIndex((el) => el.id === id);

  if (noteIndex === -1) {
    return res.status(404).json({
      status: "fail",
      message: "Note not found",
    });
  }

  notes[noteIndex] = {
    ...notes[noteIndex],
    ...req.body,
  };

  fs.writeFileSync("./data/notes.json", JSON.stringify(notes, null, 2));

  res.status(200).json({
    status: "success",
    data: notes[noteIndex],
  });
});

// Delete Note
app.delete("/notes/:id", (req, res) => {
  const notes = JSON.parse(fs.readFileSync("./data/notes.json", "utf-8"));
  console.log("GET NOTE BY ID ROUTE HIT");
  const id = Number(req.params.id);

  const noteExists = notes.find((el) => el.id === id);

  if (!noteExists) {
    return res.status(404).json({
      status: "fail",
      message: "Note not found",
    });
  }

  const filteredNotes = notes.filter((el) => el.id !== id);

  fs.writeFileSync("./data/notes.json", JSON.stringify(filteredNotes, null, 2));

  res.status(200).json({
    status: "success",
    message: "Note deleted successfully",
  });
});

// 404 Route
app.all("/*splat", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server`,
  });
});

// Server
app.listen(8000, () => {
  console.log("Server running on port 8000");
});

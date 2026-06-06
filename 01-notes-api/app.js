const fs = require("fs");
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Notes API is running");
});

app.get("/notes", (req, res) => {
  const notes = JSON.parse(fs.readFileSync("./data/notes.json", "utf-8"));

  res.status(200).json({
    status: "success",
    results: notes.length,
    data: notes,
  });
});

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

app.all("*", (req, res) => {
  res.status(404).json({
    status: "fail",
    message: `Can't find ${req.originalUrl} on this server`,
  });
});

app.listen(8000, () => {
  console.log("Server running on port 8000");
});

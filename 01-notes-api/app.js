const fs = require("fs");
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Notes API is running");
});

app.get("/notes", (req, res) => {
  const notes = JSON.parse(fs.readFileSync("./data/notes.json", "utf-8"));

  res.json({
    status: "success",
    results: notes.length,
    data: notes,
  });
});

app.listen(8000, () => {
  console.log("Server running on port 8000");
});

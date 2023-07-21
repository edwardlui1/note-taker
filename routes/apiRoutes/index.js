const router = require('express').Router();
const { createNewNote, updateDb } = require("../../lib/notes");
const { v4: uuidv4 } = require('uuid');
const notesData = require("../../db/db.json");

router.get("/notes", (req, res) => {
  res.json(notesData);
});

router.post("/notes", (req, res) => {
  req.body.id = uuidv4();
  const notes = JSON.parse(JSON.stringify(notesData)); 
  const newNote = createNewNote(req.body, notes);
  res.json(newNote);
});

router.delete("/notes/:id", (req, res) => {
  const params = req.params.id;
  const notes = JSON.parse(JSON.stringify(notesData)); 
  updateDb(params, notes);
  res.json({ message: 'Note deleted successfully.' });
});

module.exports = router;

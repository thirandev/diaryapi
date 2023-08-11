const express = require("express");
const { addNote, getNotes, getNoteByID, updateNoteByID, deleteNoteByID } = require('../controllers/noteController')

const router = express.Router();

router.post('/addNote', addNote);

router.get('/notes', getNotes);

router.get('/notes/:id', getNoteByID);

router.put('/notes/:id', updateNoteByID);

router.delete('/notes/:id', deleteNoteByID);

module.exports = router;
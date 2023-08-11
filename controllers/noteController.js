const Note = require('../models/notesModel')
const asyncHandler = require('express-async-handler')

// Add new note
const addNote = asyncHandler(async (req, res) => {
    try {
        const note = await Note.create(req.body);
        res.status(200).json({ status: "success", productDetails: note });

    } catch (error) {
        res.status(500);
        throw new Error(error.message)
    }
});

// Get all notes
const getNotes = asyncHandler(async (res) => {
    try {
        const notes = await Note.find({});
        res.status(200).json(notes);
    } catch (error) {
        res.status(500);
        throw new Error(error.message)
    }
});

// Get notes by ID
const getNoteByID = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findById(id);
        if (!note) {
            res.status(400);
            throw new Error(`cannot find any product with ID ${id}`)
        }
        res.status(200).json(note);
    } catch (error) {
        res.status(500);
        throw new Error(error.message)
    }
});

// Update notes by ID
const updateNoteByID = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findByIdAndUpdate(id, req.body);
        // we cannot find any product in database.
        if (!note) {
            res.status(400);
            throw new Error(`cannot find any product with ID ${id}`)
        }
        const updatedNote = await await Note.findById(id);
        res.status(200).json({ message: "success", updateNote: updatedNote });
    } catch (error) {
        res.status(500);
        throw new Error(error.message)
    }
});

// Delete note by ID
const deleteNoteByID = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findByIdAndDelete(id);
        if (!note) {
            res.status(400);
            throw new Error(`cannot find any product with ID ${id}`)
        }
        res.status(200).json({ message: "success", deletedNote: note });
    } catch (error) {
        res.status(500);
        throw new Error(error.message)
    }
});

module.exports = {
    addNote,
    getNotes,
    getNoteByID,
    updateNoteByID,
    deleteNoteByID,
}

const express = require("express");
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const Note = require('./models/notesModel');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/addNote', async (req, res) => {
    try {
        const note = await Note.create(req.body);
        res.status(200).json({ status: "success", productDetails: note });

    } catch (error) {
        console.log("Something is OFF!", error.message);
        res.status(500).json({ message: error.message });
    }
});

app.get('/notes', async (req, res) => {
    try {
        const notes = await Note.find({});
        res.status(200).json(notes);
    } catch (error) {
        console.log("Something is OFF!", error.message);
        res.status(500).json({ message: error.message });
    }
});

app.get('/notes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findById(id);
        if (!note) {
            return res.status(404).json({ message: `cannot find any product with ID ${id}` });
        }
        res.status(200).json(note);
    } catch (error) {
        console.log("Something is OFF!", error.message);
        res.status(500).json({ message: error.message });
    }
});

app.put('/notes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findByIdAndUpdate(id, req.body);
        // we cannot find any product in database.
        if (!note) {
            return res.status(404).json({ message: `cannot find any product with ID ${id}` });
        }
        const updatedNote = await await Note.findById(id);
        res.status(200).json({ message: "success", updateNote: updatedNote });
    } catch (error) {
        console.log("Something is OFF!", error.message);
        res.status(500).json({ message: error.message });
    }
});

app.delete('/notes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const note = await Note.findByIdAndDelete(id);
        if (!note) {
            return res.status(404).json({ message: `cannot find any product with ID ${id}` });
        }
        res.status(200).json({ message: "success", deletedNote: note });
    } catch (error) {
        console.log("Something is OFF!", error.message);
        res.status(500).json({ message: error.message });
    }
});



mongoose.set("strictQuery", false);
mongoose.connect('mongodb+srv://admin:famousfive@cluster0.r4qzxg7.mongodb.net/Diary-API?retryWrites=true&w=majority')
    .then(() => {
        console.log('Connected to MongoDB!');
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`);
        })
    })
    .catch((error) => {
        console.log(error);
    });
require('dotenv').config()
const express = require("express");
var cors = require('cors');
const mongoose = require('mongoose');
const noteRoute = require('./routes/noteRoute');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 3000;
const FRONTEND = process.env.FRONTEND;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', noteRoute);


app.get('/', () => {
})

app.use(errorMiddleware);

mongoose.set("strictQuery", false);
mongoose.connect(MONGO_URL)
    .then(() => {
        console.log('Connected to MongoDB!');
        app.listen(PORT, () => {
            console.log(`Example app listening on port ${PORT}`);
        })
    })
    .catch((error) => {
        console.log(error);
    });
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const exerciseRouter = require('./routes/exercise');
const userRouter = require('./routes/user');

require('dotenv').config()

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
}).on('error', error => console.log('Error connecting to MongoDB:', error));

app.use('/exercises', exerciseRouter);
app.use('/users', userRouter);


app.listen(port, () =>{
    console.log(`Server is running at port: ${port}`);
})

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const UserRoutes = require('./router/userRouter');
const mailRouter = require('./router/mailRouter');
app.use('/user', UserRoutes);
app.use('/mail', mailRouter);


const mongoURI = process.env.Mongo_URI;
mongoose.connect(mongoURI);
const db = mongoose.connection;
db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});


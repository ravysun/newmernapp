const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/postgoals', require('./routes/postgoalRoute'));
app.use('/api/postusers', require('./routes/postuserRoute'));

app.use(errorHandler);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes')
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true,
}));

mongoose.connect(process.env.DATABASE_URL, () => console.log('database connected'));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.use('/', userRoutes);

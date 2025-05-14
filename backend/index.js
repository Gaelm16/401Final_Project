const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = 4000;

// app.use(cors());
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));


const connectToMongo = async () => {
    try {
        mongoose.set('strictQuery', false);
        mongoose.connect(process.env.DATABASE_URL);
        console.log('Mongo connected');
    }
    catch(error) {
        console.log(error);
        process.exit();
    }
}

connectToMongo();

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.use('/', userRoutes);

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/users', userRoutes);


mongoose.connect(process.env.DATABASE_URL, () => console.log('database connected'));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
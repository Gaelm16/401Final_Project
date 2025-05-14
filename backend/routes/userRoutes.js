const express = require('express');
const {login, signUp, signOut, getLoggedIn} = require('../controllers/userController');
const router = express.Router();

router.post('/login', login);
router.post('/signup', signUp);
router.get('/logout', signOut);
router.get('/loggedIn', getLoggedIn);


module.exports = router
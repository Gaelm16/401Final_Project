const express = require('express');
const {login, singnup} = require('../controllers/userController');
const router = express.Router();

router.get('/', getUsers);
router.post('/', addUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

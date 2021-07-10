const express = require('express');
const router = express.Router();

const { runValidation } = require('../../validator');

const { userSignInValidation } = require('../../validator/user');

const { login } = require('../../controllers/auth');

router.post('/login', userSignInValidation, runValidation, login);


module.exports = router;
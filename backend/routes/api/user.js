const express = require('express');
const router = express.Router();

const { requireSignin } = require('../../controllers/auth');
const { show, update, picture } = require('../../controllers/user');

router.get('/:id', requireSignin, show);
router.put('/:id', requireSignin, update);
router.get('/profile-pic/:id', picture);

module.exports = router;

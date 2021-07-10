const { check } = require('express-validator');

exports.userSignInValidation = [
  check('email')
      .isEmail()
      .withMessage('Email must be valid'),
  check('password')
      .isLength({ min: 4 })
      .withMessage('Password must be at least 6 characters long')
];
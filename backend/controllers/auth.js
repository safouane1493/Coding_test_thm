const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const { authenticateUser } = require('../services/user');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authenticateUser(email, password);
    const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.cookie('token', token, { expiresIn: '1d' });
    user.token = token;
    return res.status(200).json(user)
  } catch (err) {
    res.status(401).json({ message: 'wrong credentials' });
  }
}

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET, algorithms: ['HS256']
});
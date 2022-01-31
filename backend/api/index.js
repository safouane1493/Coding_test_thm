const express = require('express');
const db = require('../sql/db');

const router = express.Router();
// 
const getLastProfile = async (req, res) => {
  const query = 'SELECT first_name , last_name, country, city, email, phone_number,email_notif, sms_notif, picture, picture_name FROM users';
  try {
    const { rows } = await db.query(query);
    if (rows[rows.length-1]) {
      return res.send(rows[rows.length-1]);
    }
  } catch (err) {
    return res.status(400).json({ message: 'Profile not found' });
  }
};
router.get('/profile', getLastProfile);

const insertProfile = async (req, res) => {
    const {name, lastName, country, city, email, phone, emailNotif, smsNotif, picture, pictureName} = req.query;
    console.log('lastName',lastName)
    const query = `INSERT INTO users (first_name, last_name, country, city, email, phone_number,sms_notif, email_notif, picture, picture_name) VALUES ('${name}','${lastName}','${country}','${city}','${email}','${phone}',${smsNotif},${emailNotif},'${picture}','${pictureName}')`;
    try {
        const response = await db.query(query);
        return response.rowCount;
      } catch (error) {
        return res.status(400).json({ message: 'erreur' });
      }

}
router.post('/profile', insertProfile);
module.exports = router;

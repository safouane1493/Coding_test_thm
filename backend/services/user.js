const { query } = require('express-validator');
const shajs = require('sha.js');
const db = require('../sql/db');

const SECRET = process.env.SECRET || 'test-dev-secret';
/**
 * Generate hash password
 * Generate online: https://emn178.github.io/online-tools/sha256.html
 * @param {string} email
 * @param {string} password
 */
const hashPassword = (email, password) => shajs('sha256').update(`${email}${password}${SECRET}`).digest('hex');

const authenticateUser = async (email, password) => {
  const hash = hashPassword(email, password);
  const queryText = {
    text: ` SELECT s.id, s.email, s.first_name as firstName, s.last_name as lastName, s.country, s.city, s.phone_number as phoneNumber, s.email_alert as emailAlert, s.sms_alert as smsAlert
              FROM users s
              WHERE email = $1 AND password = $2`,
    values: [email, hash],
  };
  try {
    const { rows } = await db.query(queryText);
    if (rows[0]) {
      const user = rows[0];
      return user;
    }
    throw (new Error('Bad credentials'));
  } catch (error) {
    throw (new Error('Bad credentials'));
  }
};

const listUsers = async (params = {}) => {
  const queryText = { text: `SELECT s.* from users s` };
  try {
    const { rows } = await db.query(queryText);
    if (rows[0]) {
      return rows;
    }
    throw (new Error('Not Found'));
  } catch (error) {
    throw (new Error('Not Found'));
  }
}

const getUserById = async (id) => {
  const queryText = {
    text: ` SELECT s.id, s.email, s.first_name as firstName, s.last_name as lastName, s.country, s.city, s.phone_number as phoneNumber, s.email_alert as emailAlert, s.sms_alert as smsAlert
    FROM users s
    WHERE id = $1`,
    values: [id],
  };
  try {
    const { rows } = await db.query(queryText);
    if (rows[0]) {
      return rows[0];
    }
    throw (new Error('Not Found'));
  } catch (error) {
    throw (new Error('Not Found'));
  }
}
const updateUser = async (data) => {
  let updateFieldArr = [];
  let updateFieldData = [];

  let index = 1;
  for (let key in data) {
    const field = `${key} = $${index}`;
    updateFieldArr.push(field);
    updateFieldData.push(data[key]);
    index++;
  }

  const fields = updateFieldArr.join(', ');

  let text = `UPDATE users SET ${fields} WHERE id = $${index}`;
  updateFieldData.push(data.id);
  let queryText = { text, values: updateFieldData };

  try {
    const resp = await db.query(queryText);
    return resp.rowCount;
  } catch (error) {
    console.log(error.stack);
    return 0;
  }

}

const getUserProfilePicture = async (id) => {
  const queryText = {
    text: `SELECT s.profile_picture as profilePicture, s.profile_picture_content_type as profilePictureContentType FROM users s WHERE id = $1`,
    values: [id]
  };
  try {
    const { rows } = await db.query(queryText);
    if (rows[0]) {
      return rows[0];
    }
    throw (new Error('Not Found'));
  } catch (error) {
    throw (new Error('Not Found'));
  }
}

module.exports = {
  authenticateUser,
  hashPassword,
  listUsers,
  getUserById,
  updateUser,
  getUserProfilePicture
};

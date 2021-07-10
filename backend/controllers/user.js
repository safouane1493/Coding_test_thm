const formidable = require('formidable');
const fs = require('fs');

const { getUserById, updateUser, getUserProfilePicture } = require('../services/user');
const { checkEmail } = require('../utils');

exports.update = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    if (user) {
      let form = new formidable.IncomingForm();
      form.keepExtensions = true;
      form.parse(req, async (err, fields, files) => {
        if (err) {
          return res.status(400).json({
            message: 'Profile could not upload'
          });
        }

        const { email, firstname, lastname, phonenumber, city, country, emailalert, smsalert } = fields;

        if (!email || !checkEmail(email)) {
          return res.status(401).json({
            message: 'Invalid Email'
          });
        }

        const updateData = {
          email: email,
          first_name: firstname ? firstname : null,
          last_name: lastname ? lastname : null,
          phone_number: phonenumber ? phonenumber : null,
          city: city ? city : null,
          country: country ? country : null,
          email_alert: emailalert === '1' ? 1 : 0,
          sms_alert: smsalert === '1' ? 1 : 0,
          id: user.id
        };
        
        if (files.profile) {
          if (files.profile.size > 10000000) {
            return res.status(400).json({
              error: 'Profile should be less then 1mb in size'
            });
          }
          updateData.profile_picture = fs.readFileSync(files.profile.path);
          updateData.profile_picture_content_type = files.profile.type;
        }

        const updated = await updateUser(updateData);
        return res.json({ updated });

      });
    } else {
      return res.status(400).json({ message: err });
    }
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err });
  }
}

exports.picture = async (req, res) => {
  try {
    const user = await getUserProfilePicture(req.params.id);
    if (user.profilepicture) {
      res.set('Content-Type',  user.profilepicturecontenttype);
      return res.send(user.profilepicture);
    }
    else {
      return res.status(404).json({ message: 'Not Found' });
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({ message: 'Not Found' });
  }
}

exports.show = async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    return res.send(user);
  } catch (err) {
    return res.status(400).json({ message: 'Not Found' });
  }
}
